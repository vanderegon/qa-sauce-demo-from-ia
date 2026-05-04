import { test, expect } from './fixtures';

test.describe('Login - SauceDemo', () => {
  test('login com standard_user redireciona para inventory', async ({ loginPage, inventoryPage }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.expectLoaded();
  });

  test('login com locked_out_user mostra mensagem de bloqueio', async ({ loginPage }) => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    await loginPage.expectLoginError(/locked out/i);
  });

  test('login com senha errada mostra erro', async ({ loginPage }) => {
    await loginPage.login('standard_user', 'senha_invalida');
    await loginPage.expectLoginError(/Username and password do not match/i);
  });

  test('login sem usuário mostra erro de campo obrigatório', async ({ loginPage }) => {
    await loginPage.login('', '');
    await loginPage.expectLoginError(/Username is required/i);
  });
});
