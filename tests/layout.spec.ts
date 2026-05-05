import { test, expect } from '@playwright/test';

// Testes de layout para o site https://www.saucedemo.com
// Valida presença de elementos importantes e checa centralização/responsividade básica

test.describe('Layout - Swag Labs', () => {
  test('login page - elementos visíveis e centralização (desktop e mobile)', async ({ page }) => {
    await page.goto('/');

    // Elementos básicos da tela de login
    const title = page.getByText('Swag Labs');
    const username = page.locator('#user-name');
    const password = page.locator('#password');
    const loginBtn = page.locator('#login-button');

    await expect(title).toBeVisible();
    await expect(username).toBeVisible();
    await expect(password).toBeVisible();
    await expect(loginBtn).toBeVisible();

    // Verifica que o campo de username está aproximadamente centralizado horizontalmente na viewport (desktop)
    const usernameBox = await username.boundingBox();
    const innerWidth = await page.evaluate(() => window.innerWidth);
    expect(usernameBox).not.toBeNull();
    if (usernameBox) {
      const usernameCenterX = usernameBox.x + usernameBox.width / 2;
      // permite até 100px de diferença do centro da tela para cobrir variações visuais
      expect(Math.abs(usernameCenterX - innerWidth / 2)).toBeLessThan(100);
    }

    // Troca para viewport móvel e valida que os elementos continuam visíveis (responsividade básica)
    await page.setViewportSize({ width: 375, height: 812 });
    await expect(title).toBeVisible();
    await expect(username).toBeVisible();
    await expect(password).toBeVisible();
    await expect(loginBtn).toBeVisible();
  });

  test('inventory page - layout após login', async ({ page }) => {
    await page.goto('/');

    // Realiza login com usuário padrão
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // Verifica título/header e lista de produtos
    const header = page.getByText('Swag Labs');
    const inventoryItems = page.locator('.inventory_item');

    await expect(header).toBeVisible();
    await expect(inventoryItems.first()).toBeVisible();

    // Deve existir ao menos um item no inventário
    const count = await inventoryItems.count();
    expect(count).toBeGreaterThan(0);

    // Valida que as imagens dos itens possuem tamanho razoável (sanidade do layout)
    const firstImage = page.locator('.inventory_item img').first();
    const box = await firstImage.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      expect(box.width).toBeGreaterThan(20);
      expect(box.height).toBeGreaterThan(20);
    }
  });
});
