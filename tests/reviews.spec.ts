import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const reviewsPath = path.join(__dirname, '..', 'reviews.html');
const stylesPath = path.join(__dirname, '..', 'styles.css');
const googleProfileUrl = 'https://www.google.com/search?client=safari&hs=VxYq&sca_esv=848c9d4d3f0b36ed&hl=en-us&cs=0&output=search&kgmid=/g/11n3pwrn06&q=Jaramillo+Landscape&shem=epsd1,ltae,rimspwouoe&shndl=30&source=sh/x/loc/act/m1/3&kgs=6f6c895befef552f&utm_source=epsd1,ltae,rimspwouoe,sh/x/loc/act/m1/3#sv=CAESzQEKuQEStgEKd0FKaVQ0dExLV085cWQ0SXpUTVZfS0FRYjZKWVdwbWxtVGZjYjBlclFCcFJnSndac2RjYm1VRXdxMXc2SFc3TUJBQXYyMENzeGhsSnEyM19JU196SFpjR1JQem9pQlpDRzVxWVkta2dLeG1sSDdMb2ZhbnRBZ0lNEhdZNENaYXN1Zk9PLTl3UEFQdTYyRG9RMBoiQURzcjlmUkpSUnlzaXV3RkswbjNlLUcxM0VyM3B6UTZiZxIEODA1MRoBMyoAMAA4AUAAGAAgp5CIxw1KAhAB';
const angiReviewsUrl = 'https://www.angi.com/companylist/us/id/meridian/jaramillo-landscape-llc-reviews-1.htm';

const approvedMergedReviewText: Record<string, string> = {
  'Deb Hull': `We hired Jaramillo Landscaping company to come out and replace some sprinkler heads and resod a section of our yard. Alfredo came out and gave us a reasonable bid. He told us approximately how far out he was on projects and gave us an official bid so we could look it over and schedule. Alfredo communicates very well with you on the project and is very good at getting back with you if you have a question about anything. The project was done in a day and turned out great! I would highly recommend this company for your projects. Very good at what he does and would use again! Thanks Alfredo and crew! They were all very easy to work with!`,
  'G. Chang': `Alfredo is amazing! He fixed everything that needed fixing: a broken valve, solenoids, and sprinklers. He is kind, helpful, very fair, and keeps his word. Try him out - you will love him!`,
  'Team Garcia': `I wish I could rate this business more than 5 star's cause Alfredo from Jaramillo Landscape did an amazing work on my backyard. Installed Pavers and built me a fire pit for them family get togethers. Thank You Again!`,
  'Cindy Smith': `Alfredo was so kind at helping us with some sprinklers that weren’t working and he was so good with his communication to come help us at a good price I would 100% recommend him for any of your landscape needs!`,
  'Sharon Eisenbarth': `I am big on customer service, honesty and fairness! This is your man! The world needs more people like Jaramillo! I appreciated his help so much!`,
  'Michelle Vicars': `My project involved moving sprinklers and upgrading emitters, resolving a drainage issue and installing 6 yards of landscape rock. Alfredo is knowledgeable, easy to work with and is devoted to ensuring everything is done on time and Just Right. This company is a delight to work with.`,
  'Kelly Williams': `We appreciate Alfredo and his crew! Our yard looks great, and it was a pleasure working with Jaramillo Landscaping. The communication was great, and we are so pleased with the final product.`,
  'Chandra Schreck': `Worked with Jaramillo Landscape as a supplier for multiple jobs they’ve done. It’s obvious from “behind the scenes” that they really care about the quality of their work. Alfredo was great with his communication with our team. He was diligent in making sure his customers got what they needed on time, and treated our team with kindness and respect.`,
  'Kris M.': `I called to ask for an estimate on sod installation. We discussed what needed to be done and Alfredo scheduled next day for completion. 15min later I got a call from him saying he could do it same day. By the end of the day I had a new front yard. Fast, nice, and efficient.`,
  'Wendy R.': `Alfredo showed up and had great communication. I had a fence installed and thought I only had one puncture in my sprinkler system. Turned out there were four plus a broken sprinkler head. He fixed everything, plus totally reprogrammed my control box. Good hard working dude. Thanks Alfredo. Highly recommend 10 outa 10. Good dude.`,
  'Guenhwyvar W.': `Alfredo was on time got the work done quickly and it was affordable and the end result looks great! He was also very respectful`,
  'Todd F.': `Great experience, was very responsive to be onsite and quickly repair our sprinkler system. Great communication, highly recommend.`,
  'Jose G.': `Did a great job. Spent time walking the job with me and explaining everything.`,
  'Ted F.': `Jaramillo Landscape did an outstanding job redoing our lawn. They laid fresh sod that transformed our yard, and went above and beyond by fixing our sprinkler system too, something we didn’t even expect but really appreciated. Alfredo was fantastic to work with. He was professional from start to finish, explained every step of the process, and was completely transparent about what needed to be done and why. It’s rare to find someone who takes the time to walk you through the work like that. Highly recommend Jaramillo Landscape for anyone needing lawn or sprinkler work. Quality work and great communication all around!`,
  'Ellen D.': `Alfredo did an excellent job of figuring out why our sprinklers kept leaking even when turned off. He knew exactly what needed to be fixed to stop the leaks. We would highly recommend him!`,
  'Sharon H.': `He worked until he knew the problem was solved. Great going Alfredo!`,
  'Kathleen F.': `He was prompt to reply to request and showed up on time. The sprinklers and lines were fixed efficiently. He showed me the repairs and ran the sprinklers to show no leaks. He was professional.`,
  'Marion E.': `Jaramillo was excellent! He did an excellent job. I would hire him again and would recommend him to anyone. Out of three recommened, he got back to me immediately and didn't stop untill all sprinklers were fixed and there were a lot of them. Jaramello Thank you`,
  'Kathy M.': `It was obvious that Alfredo places great importance on his customer relations. From the quick response to the patience in answering questions, as well as his conscientiousness in making sure the job was done right. Thank you again for your help. I will be working with you in the future and referring you to others.`,
  'Bahara S.': `Very good experience very nice person knows what he do. Excellent job.`,
  'Diane C.': `Alfredo was professional, organized, timely and efficient. Our 20+ year old system had multiple issues with wiring and pressure which he quickly diagnosed and fixed quickly so we were up and running again. The bid was fair. If further break downs happen we will be sure to call Jaramillo and Alfredo.`,
  'Robert S.': `Done and finished`,
};

test.beforeEach(async ({ page }) => {
  await page.setContent(await readFile(reviewsPath, 'utf8'));
  await page.addStyleTag({ path: stylesPath });
  await page.locator('[data-animate]').evaluateAll((elements) =>
    elements.forEach((element) => element.classList.add('visible')),
  );
});

test('shows one card for every selected customer review', async ({ page }) => {
  const requiredReviewers = [
    'Team Garcia',
    'Cindy Smith',
    'Sharon Eisenbarth',
    'Michelle Vicars',
    'Kelly Williams',
    'Chandra Schreck',
    'Kris M.',
    'Wendy R.',
    'Guenhwyvar W.',
    'Todd F.',
    'Jose G.',
    'Ted F.',
    'Ellen D.',
    'Sharon H.',
    'Kathleen F.',
    'Marion E.',
    'Kathy M.',
    'Bahara S.',
    'Diane C.',
    'Robert S.',
  ];

  await expect(page.locator('.review-card')).toHaveCount(32);

  for (const reviewer of requiredReviewers) {
    await expect(page.locator('.review-name', { hasText: reviewer })).toHaveCount(1);
  }

  await expect(page.locator('.review-name', { hasText: 'Deb Hull' })).toHaveCount(1);
  await expect(page.locator('.review-name', { hasText: 'Marvin H.' })).toHaveCount(0);
});

test('renders every review as five stars', async ({ page }) => {
  const starRatings = await page.locator('.review-card .review-stars').allTextContents();

  expect(starRatings).toHaveLength(32);
  expect(new Set(starRatings.map((rating) => rating.trim()))).toEqual(new Set(['★★★★★']));
});

test('displays a five-star overall rating', async ({ page }) => {
  await expect(page.locator('.rating-score')).toHaveText('5.0');
});

test('keeps the aggregate rating label platform-neutral', async ({ page }) => {
  await expect(page.locator('.rating-label')).toHaveText('out of 5 — customer reviews');
});

test('opens the correct external Google and Angi review profiles safely', async ({ page }) => {
  const googleLink = page.getByRole('link', { name: 'Look at the Google profile' });
  const angiLink = page.getByRole('link', { name: 'Angi.com reviews' });

  await expect(googleLink).toBeVisible();
  await expect(googleLink).toHaveAttribute('href', googleProfileUrl);
  await expect(angiLink).toBeVisible();
  await expect(angiLink).toHaveAttribute('href', angiReviewsUrl);

  for (const link of [googleLink, angiLink]) {
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', /\bnoopener\b/);
    await expect(link).toHaveAttribute('rel', /\bnoreferrer\b/);
  }
});

test('keeps review profile links inside a narrow viewport with a visible keyboard focus ring', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await expect(page.locator('.rating-overview')).toHaveCSS('opacity', '1');
  const links = page.locator('.review-source-link');

  for (const link of await links.all()) {
    const box = await link.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(320);
  }

  const googleLink = page.getByRole('link', { name: 'Look at the Google profile' });
  await googleLink.focus();
  await expect(googleLink).toBeFocused();
  expect(await googleLink.evaluate((element) => getComputedStyle(element).outlineColor)).toBe('rgb(45, 80, 22)');
  expect(await googleLink.evaluate((element) => getComputedStyle(element).outlineWidth)).toBe('3px');
});

test('shows visible hover feedback on review profile links', async ({ page }) => {
  await page.addStyleTag({ content: '.review-source-link { transition: none !important; }' });
  const googleLink = page.getByRole('link', { name: 'Look at the Google profile' });
  await googleLink.hover();

  await expect(googleLink).toHaveCSS('background-color', 'rgb(245, 240, 232)');
  await expect(googleLink).not.toHaveCSS('box-shadow', 'none');
});

test('does not display dates or prices in review cards', async ({ page }) => {
  const cardContent = (await page.locator('.review-card').allTextContents()).join('\n');
  const cardMetadata = (await page.locator('.review-meta').allTextContents()).join('\n');

  expect(cardContent).not.toMatch(/\b\d{1,2}\/\d{1,2}\/\d{4}\b/);
  expect(cardMetadata).not.toMatch(/\b\d+\s+(?:hours?|days?|weeks?|months?|years?)\s+ago\b/i);
  expect(cardContent).not.toMatch(/\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4}\b/i);
  expect(cardContent).not.toMatch(/\$\s?\d/);
});

test('renders the approved complete text for every merged review', async ({ page }) => {
  const renderedReviews = await page.locator('.review-card').evaluateAll((cards) =>
    Object.fromEntries(cards.map((card) => {
      const name = card.querySelector('.review-name')?.textContent?.trim() ?? '';
      const quotedText = card.querySelector('.review-text')?.textContent?.trim() ?? '';
      return [name, quotedText.replace(/^"|"$/g, '')];
    })),
  );

  for (const [reviewer, approvedText] of Object.entries(approvedMergedReviewText)) {
    expect(renderedReviews[reviewer], `${reviewer}'s review text`).toBe(approvedText);
  }
});

test('contains no duplicate review text or owner responses', async ({ page }) => {
  const reviewTexts = await page.locator('.review-text').allTextContents();
  const normalizedTexts = reviewTexts.map((text) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim(),
  );

  expect(new Set(normalizedTexts).size).toBe(normalizedTexts.length);

  const cardContent = (await page.locator('.review-card').allTextContents()).join('\n');
  expect(cardContent).not.toContain('Jaramillo Landscape (owner)');
  expect(cardContent).not.toContain('The Jaramillo Landscaping Team');
});
