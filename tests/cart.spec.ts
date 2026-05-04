import { test, expect } from './fixtures';

test.describe('Carrinho - SauceDemo', () => {
  test('adicionar e remover item atualiza badge do carrinho', async ({ authedInventory }) => {
    await authedInventory.expectCartCount(0);
    await authedInventory.addItem('Sauce Labs Backpack');
    await authedInventory.expectCartCount(1);

    await authedInventory.removeButton('Sauce Labs Backpack').click();
    await authedInventory.expectCartCount(0);
  });

  test('adicionar dois itens e abrir carrinho lista os dois', async ({ page, authedInventory }) => {
    await authedInventory.addItem('Sauce Labs Backpack');
    await authedInventory.addItem('Sauce Labs Bike Light');
    await authedInventory.expectCartCount(2);

    await authedInventory.openCart();
    await expect(page).toHaveURL(/cart\.html/);
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(2);
  });
});
