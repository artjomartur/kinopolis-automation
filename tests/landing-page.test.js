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
    expect(bodyText).toContain('Christie Digital');
    expect(bodyText).toContain('Samsung Onyx');
    expect(bodyText).toContain('D-BOX Motion');
    expect(bodyText).toContain('IMAX');
    expect(bodyText).toContain('Kinopolis Gruppe');
  });

  it('features authentic Kinopolis locations in footer and highlights', () => {
    const bodyText = $('#main').text();
    expect(bodyText).toContain('MTZ Sulzbach');
    expect(bodyText).toContain('Mathäser München');
    expect(bodyText).toContain('Hamburg HafenCity');
    expect(bodyText).toContain('Darmstadt');
    expect(bodyText).toContain('Hanau');
    expect(bodyText).toContain('Viernheim');
  });

  it('renders official Kinopolis logo and dark variant in footer', () => {
    const logoImgs = $('img[src*="kinopolis-logo"]');
    expect(logoImgs.length).toBeGreaterThanOrEqual(2);
    expect(html).toContain('/assets/images/kinopolis-logo-dark.png');
  });

  it('provides smooth navigation section anchors and working links', () => {
    expect($('#saele').length).toBe(1);
    expect($('#funktionen').length).toBe(1);
    expect($('#standorte').length).toBe(1);
    expect($('a[href="#saele"]').length).toBeGreaterThanOrEqual(1);
    expect($('a[href="#funktionen"]').length).toBeGreaterThanOrEqual(1);
    expect($('a[href="#standorte"]').length).toBeGreaterThanOrEqual(1);
  });

  it('renders authentic portal links in footer', () => {
    expect($('a[href="/tl"]').length).toBeGreaterThanOrEqual(1);
    expect($('a[href="/admin"]').length).toBeGreaterThanOrEqual(1);
    expect($('a[href="/archive.html"]').length).toBeGreaterThanOrEqual(1);
    expect($('a[href="/cinemaxx-archiv.html"]').length).toBeGreaterThanOrEqual(1);
    expect($('a[href="https://www.kinopolis.de/datenschutz"]').length).toBeGreaterThanOrEqual(1);
    expect($('a[href="https://www.kinopolis.de/impressum"]').length).toBeGreaterThanOrEqual(1);
  });

  it('does not contain fake employee testimonials or placeholder quotes', () => {
    const bodyText = $('#main').text();
    expect(bodyText).not.toContain('Tobias Wagner');
    expect(bodyText).not.toContain('Julia Hartmann');
    expect(bodyText).not.toContain('Melanie Krause');
    expect(bodyText).not.toContain('Laura Sommer');
    expect(bodyText).not.toContain('Dennis Richter');
    expect(bodyText).not.toContain('Maximilian Weber');
    expect(bodyText).not.toContain('Christian Wolf');
    expect(bodyText).not.toContain("Our team's productivity has skyrocketed");
  });

  it('ensures primary CTA buttons link to the operational dashboard', () => {
    const dashboardLinks = $('a[href="/dashboard"]');
    expect(dashboardLinks.length).toBeGreaterThan(3);
  });

  it('has authentic Kinopolis OpenGraph and Twitter titles', () => {
    expect($('meta[property="og:title"]').attr('content')).toContain('Kinopolis Automation Suite');
    expect($('meta[name="twitter:title"]').attr('content')).toContain('Kinopolis Automation Suite');
    expect(html).not.toContain('Free SaaS Website Kit');
  });

  it('contains clean unclipped module card labels', () => {
    const bodyText = $('#main').text();
    expect(bodyText).toContain('Foyer & Service');
    expect(bodyText).toContain('Einlass');
    expect(bodyText).toContain('Live');
    expect(bodyText).toContain('Theaterleitung');
    expect(bodyText).toContain('Empfohlen');
    expect(bodyText).toContain('Leitung');
    expect(bodyText).toContain('Schicht');
    expect(bodyText).toContain('Vorführtechnik');
    expect(bodyText).toContain('Technik');
    expect(bodyText).toContain('BWR');
  });

  it('configures modern mobile viewport and web app meta tags', () => {
    const viewport = $('meta[name="viewport"]').attr('content');
    expect(viewport).toContain('width=device-width');
    expect(viewport).toContain('viewport-fit=cover');
    expect($('meta[name="apple-mobile-web-app-capable"]').attr('content')).toBe('yes');
  });

  it('includes mobile responsiveness rules in stylesheet', () => {
    const cssPath = path.resolve(__dirname, '../src/style.css');
    const css = fs.readFileSync(cssPath, 'utf8');
    expect(css).toContain('@media (max-width: 809px)');
    expect(css).toContain('max-width: 100vw');
    expect(css).toContain('overflow-x: hidden');
  });

  it('integrates mobile drawer navigation and CTA button in navbar bundle', () => {
    const navPath = path.resolve(__dirname, '../src/scripts/vendor/chunk-APG5SWKV.mjs');
    const navCode = fs.readFileSync(navPath, 'utf8');
    expect(navCode).toContain('E4pihRaKD-mobile');
    expect(navCode).toContain('Dashboard starten');
  });
});
