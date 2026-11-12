import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';

describe('Landing Page Copy & Structure', () => {
  const htmlPath = path.resolve(__dirname, '../src/index.html');
  const html = fs.readFileSync(htmlPath, 'utf8');
  const $ = cheerio.load(html);

  it('has authentic Kinopolis title and meta description', () => {
    expect($('title').text()).toContain('Kinopolis Automation Suite');
    expect($('meta[name="description"]').attr('content')).toContain('Kinopolis Standorte');
  });

  it('contains the German Kinopolis headline and hero copy', () => {
    const text = $('#main').text();
    expect(text).toContain('Die smarte Schaltzentrale für dein Filmtheater');
    expect(text).toContain('Echtzeit-Saalstatus');
    expect(text).toContain('Hamburg HafenCity bis München Mathäser');
  });

  it('does not contain generic Framer SaaS kit template placeholders', () => {
    const forbiddenPlaceholders = [
      'Pathway to productivity',
      'Free SaaS Website Kit',
      'Acme Corp',
      'Echo Valley',
      'Streamlined for easy management',
      'A more effective way to track progress',
      'Up to 5 project members',
      'Up to 50 project members',
      'Unlimited project members',
      'Jamie Teller',
      '@jamietechguru00',
      'Alex Rivera',
      '@alexinnovates',
      'Morgan Lee',
      '@morganleewhiz',
      'Taylor Kim',
      '@taykimm',
      'Sign up for free today'
    ];

    const bodyText = $('#main').text();
    for (const placeholder of forbiddenPlaceholders) {
      expect(bodyText).not.toContain(placeholder);
    }
  });

  it('features authentic cinema tech partners in the logo strip', () => {
    const bodyText = $('#main').text();
    expect(bodyText).toContain('Dolby Atmos');
    expect(bodyText).toContain('Barco Laser');
    expect(bodyText).toContain('Christie 4K');
    expect(bodyText).toContain('Kinopolis Gruppe');
  });

  it('features authentic Kinopolis locations in footer and testimonials', () => {
    const bodyText = $('#main').text();
    expect(bodyText).toContain('Sulzbach MTZ');
    expect(bodyText).toContain('Mathäser München');
    expect(bodyText).toContain('Hamburg HafenCity');
    expect(bodyText).toContain('Darmstadt');
    expect(bodyText).toContain('Koblenz');
  });

  it('ensures primary CTA buttons link to the operational dashboard', () => {
    const dashboardLinks = $('a[href="/dashboard"]');
    expect(dashboardLinks.length).toBeGreaterThan(3);
  });
});
