import { test, expect } from '@playwright/test';

// Valida que o botão de login está visível na página inicial

test('login button should be visible on the login page', async ({ page }) => {
  await page.goto('/');
  const loginButton = page.locator('[data-test=login-button]');
  await expect(loginButton).toBeVisible();
});
