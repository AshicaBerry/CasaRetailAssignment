const { expect } = require('@playwright/test');

exports.BasePageHelper = class BasePageHelper {
  constructor(page) {
    this.page = page;
  }
  async checkPageToHaveTitle(title) {
    await expect(this.page).toHaveTitle(title);
  }

  async checkPageToHaveUrl(url) {
    await expect(this.page).toHaveURL(url);
  }

  async checkElementToBeVisible(element) {
    const locator = this.page.locator(element);
    await expect(locator).toBeVisible();
    return locator;
  }
  async clickOnElement(element) {
    const locator = await this.checkElementToBeVisible(element);
    await locator.click();
  }

  async getOnlyTextValueFromField(element) {
    const locator = this.page.locator(element);
    let textValue = await locator.innerText();
    // console.log('textvalue', textValue);
    return textValue;
  }
  async getValueFromField(element) {
    const locator = this.page.locator(element);
    // let textValue = await locator.innerText();
    let textValue = await locator.inputValue();
    console.log('textvalue', textValue);
    return textValue;
  }
  async checkElementToHaveClass(element, expectedClass) {
    const locator = this.page.locator(element);
    await expect(locator).toHaveClass(expectedClass);
  }

  async getAllInnerTexts(element) {
    let textsArray = [];
    const locator = this.page.locator(element);
    textsArray = await locator.allInnerTexts();
    console.log(textsArray);
    return textsArray;
  }
};
