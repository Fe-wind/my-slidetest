import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

describe('New Year Presentation Tests', () => {
  const presentationPath = path.join(__dirname, '../slides/new_year_presentation.marp');
  const jaPath = path.join(__dirname, '../i18n/ja.json');
  const enPath = path.join(__dirname, '../i18n/en.json');

  const presentation = fs.readFileSync(presentationPath, 'utf-8');
  const { data: frontMatter, content } = matter(presentation);
  const ja = JSON.parse(fs.readFileSync(jaPath, 'utf-8'));
  const en = JSON.parse(fs.readFileSync(enPath, 'utf-8'));

  it('should have valid Marp front matter', () => {
    expect(frontMatter.marp).toBe(true);
    expect(frontMatter.theme).toBeDefined();
    expect(frontMatter.paginate).toBeDefined();
  });

  it('should contain all required slides', () => {
    expect(content).toContain(ja.slide1);
    expect(content).toContain(ja.slide2);
    expect(content).toContain(ja.slide3);
    expect(content).toContain(ja.slide4);
    expect(content).toContain(ja.slide5);
    expect(content).toContain(ja.slide6);
  });

  it('should include all required images', () => {
    const requiredImages = [
      'new_year_background.jpg',
      'shishimai.png',
      'kadomatsu.png',
      'kagami_mochi_1.png',
      'kagami_mochi_2.png',
      'kagami_mochi_3.png',
      'otoshidama.png'
    ];

    requiredImages.forEach(image => {
      expect(content).toContain(`assets/images/${image}`);
    });
  });

  it('should have matching translations', () => {
    Object.keys(ja).forEach(key => {
      expect(en[key]).toBeDefined();
    });
  });

  it('should have proper slide transitions', () => {
    const slides = content.split('---').filter(slide => slide.trim());
    expect(slides.length).toBeGreaterThanOrEqual(6);
  });

  it('should have consistent styling', () => {
    expect(content).toContain('style: |');
    expect(content).toContain('background:');
    expect(content).toContain('color:');
  });
});