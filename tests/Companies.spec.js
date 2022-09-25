const { test, expect } = require('@playwright/test');
const {
  CompaniesPageHelper,
} = require('../page-helper-pom/CompaniesPageHelper');
let CompaniesPage;

test.describe('Companies Page Functionality', () => {
  test.beforeEach(async ({ page }) => {
    CompaniesPage = new CompaniesPageHelper(page);
  });
  test('View Pending companies, Assert the status inside dropdown, Filter table row elements', async () => {
    await CompaniesPage.goToCompaniesPage();
    await CompaniesPage.checkCompaniesPageUrl();
    await CompaniesPage.clickOnPendingTab();
    let tabName = await CompaniesPage.assertTabNameAndFilterValue('Pending');
    console.log('TabName::', tabName);
    await CompaniesPage.clickOnStatusDropdown();
    let selectedValueInsideDropdown = await CompaniesPage.assertFilterSelectedValueToHaveClass();
    expect(tabName).toEqual(selectedValueInsideDropdown);
    console.log('Status Inside Dropdown::', selectedValueInsideDropdown);
    await CompaniesPage.filterAllElements();
  });

  test('View Rejected companies, Assert the status inside dropdown, Filter table row elements', async () => {
    await CompaniesPage.goToCompaniesPage();
    await CompaniesPage.checkCompaniesPageUrl();
    await CompaniesPage.clickOnRejectedTab();
    let tabName = await CompaniesPage.assertTabNameAndFilterValue('Rejected');
    console.log('TabName::', tabName);
    await CompaniesPage.clickOnStatusDropdown();
    let selectedValueInsideDropdown = await CompaniesPage.assertFilterSelectedValueToHaveClass();
    expect(tabName).toEqual(selectedValueInsideDropdown);
    console.log('Status Inside Dropdown::', selectedValueInsideDropdown);
    await CompaniesPage.filterAllElements();
  });

  test('View Live companies, Assert the status inside dropdown, Filter table row elements', async () => {
    await CompaniesPage.goToCompaniesPage();
    await CompaniesPage.checkCompaniesPageUrl();
    await CompaniesPage.clickOnLiveTab();
    let tabName = await CompaniesPage.assertTabNameAndFilterValue('Live');
    console.log('TabName::', tabName);
    await CompaniesPage.clickOnStatusDropdown();
    let selectedValueInsideDropdown = await CompaniesPage.assertFilterSelectedValueToHaveClass();
    expect(tabName).toEqual(selectedValueInsideDropdown);
    console.log('Status Inside Dropdown::', selectedValueInsideDropdown);
    await CompaniesPage.filterAllElements();
  });
});
