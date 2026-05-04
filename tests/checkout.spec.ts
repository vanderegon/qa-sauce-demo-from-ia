import { test, expect } from './fixtures';
import { CartPage, CheckoutPage } from './pages/cart.page';

test.describe('Checkout - SauceDemo', () => {
  test('fluxo completo de compra de um item', async ({ page, authedInventory }) => {
    await authedInventory.addItem('Sauce Labs Backpack');
    await authedInventory.expectCartCount(1);
    await authedInventory.openCart();

    const cart = new CartPage(page);
    await cart.expectLoaded();
    await cart.expectItemCount(1);
    await cart.checkout();

    const checkout = new CheckoutPage(page);
    await checkout.fillInformation('Vander', 'QA', '01310');
    await checkout.finish();
    await checkout.expectOrderComplete();
  });

  test('checkout sem preencher CEP mostra erro', async ({ page, authedInventory }) => {
    await authedInventory.addItem('Sauce Labs Bike Light');
    await authedInventory.openCart();
    await new CartPage(page).checkout();

    const checkout = new CheckoutPage(page);
    await checkout.firstName.fill('Vander');
    await checkout.lastName.fill('QA');
    await checkout.continueButton.click();

    await expect(page.locator('[data-test="error"]')).toContainText(/Postal Code is required/i);
  });
});
