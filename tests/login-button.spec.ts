import { test, expect } from '@playwright/test';

// Testa se o botão de login executa o login com credenciais válidas
// e redireciona para a página de inventário

test('login-button: deve executar login com sucesso', async ({ page }) => {
  await page.goto('/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page).toHaveURL(/inventory.html/);
});
