import { test as base, expect } from '@playwright/test';
import { LoginPage } from './pages/login.page';
import { InventoryPage } from './pages/inventory.page';

type Fixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  authedInventory: InventoryPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    const lp = new LoginPage(page);
    await lp.goto();
    await use(lp);
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  authedInventory: async ({ page }, use) => {
    const lp = new LoginPage(page);
    await lp.goto();
    await lp.login('standard_user', 'secret_sauce');
    const inv = new InventoryPage(page);
    await inv.expectLoaded();
    await use(inv);
  },
});

export { expect };
