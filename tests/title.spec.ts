import { test, expect } from '@playwright/test';

test.describe('Sauce Demo - título da página', () => {
  test('Deve abrir a página inicial e validar que o título contém "Swag Labs"', async ({ page }) => {
    // Navega para a aplicação
    await page.goto('https://www.saucedemo.com');

    // Valida que o título da página contém o texto esperado
    await expect(page).toHaveTitle(/Swag Labs/);
  });
});
