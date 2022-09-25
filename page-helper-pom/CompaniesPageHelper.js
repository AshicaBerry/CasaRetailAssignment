const { BasePageHelper } = require('../page-helper-pom/BasePageHelper');
const { expect } = require('@playwright/test');

exports.CompaniesPageHelper = class CompaniesPageHelper {
  constructor(page) {
    this.page = page;
    this.pendingTab = '#tooltip-target-ember1018';
    this.rejectedTab = '#tooltip-target-ember1020';
    this.liveTab = '#ember1021';
    this.statusDropdown =
      'div.c-beta-dropdown button.c-beta-button.c-beta-button--secondary.c-beta-button--normal.c-beta-button--icon-after.c-beta-dropdown-search__button.c-collection-list-header__segment-selector > span.c-beta-button__text';
    this.itemInsideStatusDropdown =
      'button.c-beta-dropdown-search__item-button';
    this.pendingInsideStatusDropdown = 'text=Pending check';
    this.selectedItemInsideStatusDropdown =
      'button.c-beta-dropdown-search__item-button.c-beta-dropdown-search__item-button--selected span.c-beta-dropdown-search__item-text';
    this.itemCountForValuesInStatusDropdown = 'div.c-beta-paginator__count';
    this.nextButton = 'div.c-beta-paginator__right';
    this.tableRows = 'table.c-table-frame > tbody.l-table-frame-body tr';
    this.firstRowInTable =
      'table.c-table-frame > tbody.l-table-frame-body tr:nth-child(1)';
    this.BasePageHelper = new BasePageHelper(page);
  }
  async goToCompaniesPage() {
    await this.page.goto(
      'https://app.forestadmin.com/Live%20Demo/Production/Operations/data/806052/index',
      {
        waitUntil: 'networkidle0',
      },
    );
  }
  async checkCompaniesPageUrl() {
    await this.BasePageHelper.checkPageToHaveUrl(
      'https://app.forestadmin.com/Live%20Demo/Production/Operations/data/806052/index',
    );
  }
  async clickOnPendingTab() {
    await this.BasePageHelper.clickOnElement(this.pendingTab);
    await this.BasePageHelper.checkPageToHaveUrl(
      'https://app.forestadmin.com/Live%20Demo/Production/Operations/data/806051/index?segmentId=70016',
    );
  }
  async assertTabNameAndFilterValue(tab) {
    let element;
    switch (tab) {
      case 'Pending':
        element = this.pendingTab;
        break;
      case 'Rejected':
        element = this.rejectedTab;
        break;
      case 'Live':
        element = this.liveTab;
        break;
      default:
        element = this.pendingTab;
    }
    let tabName = await this.BasePageHelper.getOnlyTextValueFromField(element);
    let filterValue = await this.BasePageHelper.getOnlyTextValueFromField(
      this.statusDropdown,
    );
    expect(tabName).toEqual(filterValue);
    return tabName;
  }
  async clickOnRejectedTab() {
    await this.BasePageHelper.clickOnElement(this.rejectedTab);
    await this.BasePageHelper.checkPageToHaveUrl(
      'https://app.forestadmin.com/Live%20Demo/Production/Operations/data/806051/index?segmentId=70015',
    );
  }
  async clickOnLiveTab() {
    await this.BasePageHelper.clickOnElement(this.liveTab);
    await this.BasePageHelper.checkPageToHaveUrl(
      'https://app.forestadmin.com/Live%20Demo/Production/Operations/data/806051/index?segmentId=70014',
    );
  }

  async clickOnStatusDropdown() {
    await this.BasePageHelper.clickOnElement(this.statusDropdown);
  }

  async assertFilterSelectedValueToHaveClass() {
    let valueInsideStatusDropdown = await this.BasePageHelper.getOnlyTextValueFromField(
      this.selectedItemInsideStatusDropdown,
    );
    return valueInsideStatusDropdown;
  }
  async filterAllElements() {
    let itemCount = await this.BasePageHelper.getOnlyTextValueFromField(
      this.itemCountForValuesInStatusDropdown,
    );
    let number = itemCount.split(' ').pop();
    console.log(itemCount);
    console.log(number);
    // For time being value 3 is given
    for (let i = 0; i < 3; i += 1) {
      if (i > 0) {
        await this.BasePageHelper.clickOnElement(this.nextButton, {
          visible: true,
          waitUntil: 'domcontentloaded',
        });
        await this.page.waitForLoadState('networkidle');
      }
      const rows = await this.page.locator(this.tableRows, {
        visible: true,
        waitUntil: 'domcontentloaded',
      });
      await this.BasePageHelper.checkElementToBeVisible(this.firstRowInTable);
      const count = await rows.count();
      console.log('count::', count);
      //   expect(count).toEqual(10);
      expect(rows).toHaveCount(10);
      for (let j = 0; j < count; ++j)
        console.log(await rows.nth(j).textContent());
    }
  }
};
