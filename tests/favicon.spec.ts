import { test, expect } from '@playwright/test';
import { existsSync } from 'node:fs';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const siteRoot = path.join(__dirname, '..');
const faviconPath = path.join(siteRoot, 'images', 'favicon-64.png');
const appleTouchIconPath = path.join(siteRoot, 'images', 'apple-touch-icon.png');

test('every site page declares the favicon and Apple touch icon', async ({ page }) => {
  const htmlFiles = (await readdir(siteRoot)).filter((file) => file.endsWith('.html'));

  for (const htmlFile of htmlFiles) {
    await page.setContent(await readFile(path.join(siteRoot, htmlFile), 'utf8'));

    await expect(page.locator('link[rel="icon"]'), `${htmlFile} favicon`).toHaveAttribute('href', '/images/favicon-64.png');
    await expect(page.locator('link[rel="icon"]'), `${htmlFile} favicon type`).toHaveAttribute('type', 'image/png');
    await expect(page.locator('link[rel="icon"]'), `${htmlFile} favicon size`).toHaveAttribute('sizes', '64x64');
    await expect(page.locator('link[rel="apple-touch-icon"]'), `${htmlFile} Apple touch icon`).toHaveAttribute('href', '/images/apple-touch-icon.png');
    await expect(page.locator('link[rel="apple-touch-icon"]'), `${htmlFile} Apple touch icon size`).toHaveAttribute('sizes', '180x180');
  }
});

test('favicon assets have the declared PNG dimensions', async () => {
  expect(existsSync(faviconPath), '64px favicon exists').toBe(true);
  expect(existsSync(appleTouchIconPath), 'Apple touch icon exists').toBe(true);

  const favicon = await sharp(faviconPath).metadata();
  const appleTouchIcon = await sharp(appleTouchIconPath).metadata();

  expect(favicon).toMatchObject({ format: 'png', width: 64, height: 64 });
  expect(appleTouchIcon).toMatchObject({ format: 'png', width: 180, height: 180 });
});
