import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

describe('New Year Presentation Tests', () => {
  const presentationPath = path.join(__dirname, '../slides/new_year_presentation.marp');
  const jaPath = path.join(__dirname, '../i18n/ja.json');
  const enPath = path.join(__dirname, '../i18n/en.json');
  
  let presentationContent: string;
  let jaTranslations: any;
  let enTranslations: any;

  beforeAll(() => {
    presentationContent = fs.readFileSync(presentationPath, 'utf-8');
    jaTranslations = JSON.parse(fs.readFileSync(jaPath, 'utf-8'));
    enTranslations = JSON.parse(fs.readFileSync(enPath, 'utf-8'));
  });

  test('presentation file exists and has valid Marp frontmatter', () => {
    const { data } = matter(presentationContent);
    expect(data.marp).toBe(true);
    expect(data.theme).toBeDefined();
    expect(data.paginate).toBeDefined();
  });

  test('presentation includes all required slides', () => {
    expect(presentationContent).toContain(jaTranslations.title);
    expect(presentationContent).toContain(jaTranslations.slide1);
    expect(presentationContent).toContain(jaTranslations.slide2);
    expect(presentationContent).toContain(jaTranslations.slide3);
    expect(presentationContent).toContain(jaTranslations.slide4);
    expect(presentationContent).toContain(jaTranslations.slide5);
    expect(presentationContent).toContain(jaTranslations.slide6);
  });

  test('all required images are referenced', () => {
    const requiredImages = [
      'new_year_background.jpg',
      'shishimai.png',
      'kadomatsu.png',
      'kagami_mochi.png',
      'otoshidama.png'
    ];

    requiredImages.forEach(image => {
      expect(presentationContent).toContain(image);
    });
  });

  test('translations are complete and matching', () => {
    const jaKeys = Object.keys(jaTranslations);
    const enKeys = Object.keys(enTranslations);

    expect(jaKeys).toEqual(enKeys);
    expect(jaKeys.length).toBeGreaterThan(0);
  });

  test('presentation has proper styling', () => {
    expect(presentationContent).toContain('style:');
    expect(presentationContent).toContain('background:');
    expect(presentationContent).toContain('color:');
  });

  test('header and footer are present', () => {
    expect(presentationContent).toContain('header:');
    expect(presentationContent).toContain('footer:');
  });
});