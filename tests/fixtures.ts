import { test as base, expect, type Page, type TestInfo } from '@playwright/test';
import fs from 'fs';
import path from 'path';

export { expect };

// Extend the base test if you need custom fixtures (kept empty here)
export const test = base.extend<{}>({});

// Captura um screenshot final em cada teste e anexa ao Test Report
test.afterEach(async ({ page }: { page: Page }, testInfo: TestInfo) => {
  try {
    // captura screenshot como buffer (full page)
    const screenshot = await page.screenshot({ fullPage: true });

    // anexa ao relatório do Playwright (visível em html report)
    await testInfo.attach('final-screenshot', {
      body: screenshot,
      contentType: 'image/png',
    });

    // opcional: também salva em disco para inspeção local
    const sanitizedTitle = testInfo.title.replace(/[^a-z0-9-_]/gi, '_').slice(0, 200);
    const dir = path.join('test-results', 'screenshots');
    fs.mkdirSync(dir, { recursive: true });
    const filename = `${sanitizedTitle}-${testInfo.workerIndex}-retry${testInfo.retry}.png`;
    const filePath = path.join(dir, filename);
    fs.writeFileSync(filePath, screenshot);
  } catch (error) {
    // não falha o teste se o screenshot não puder ser tirado
    // apenas registra para diagnóstico
    // eslint-disable-next-line no-console
    console.error('Erro ao capturar screenshot no afterEach:', error);
  }
});
