import { test, expect } from '@playwright/test';

// Este spec adiciona um hook afterEach que captura um screenshot final de cada teste.
// O screenshot será salvo dentro da pasta de resultados do Playwright (test-results/<run>/...).

test.describe('Sauce Demo - screenshots finais', () => {
  test.afterEach(async ({ page }, testInfo) => {
    // Gera um nome de arquivo seguro a partir do título do teste
    const safeTitle = testInfo.title.replace(/[^a-z0-9-_]/gi, '_');
    const fileName = `screenshot_${safeTitle}.png`;
    // fullPage para capturar a página inteira
    await page.screenshot({ path: testInfo.outputPath(fileName), fullPage: true });
  });

  test('login com usuário válido', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await expect(page).toHaveURL(/.*inventory.html/);
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  test('adicionar item ao carrinho e verificar', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page).toHaveURL(/.*inventory.html/);

    // adiciona o primeiro produto listado
    const firstItem = page.locator('.inventory_item').first();
    await firstItem.locator('button').click();
    await page.locator('.shopping_cart_link').click();

    await expect(page.locator('.cart_item')).toHaveCount(1);
  });
});
