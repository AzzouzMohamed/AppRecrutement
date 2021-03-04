import { element, by, ElementFinder } from 'protractor';

export class CandidatComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-candidat div table .btn-danger'));
  title = element.all(by.css('jhi-candidat div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getText();
  }
}

export class CandidatUpdatePage {
  pageTitle = element(by.id('jhi-candidat-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  fullNameInput = element(by.id('field_fullName'));
  emailInput = element(by.id('field_email'));
  diplomeInput = element(by.id('field_diplome'));
  phoneInput = element(by.id('field_phone'));
  cityInput = element(by.id('field_city'));

  userSelect = element(by.id('field_user'));
  posteSelect = element(by.id('field_poste'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setFullNameInput(fullName: string): Promise<void> {
    await this.fullNameInput.sendKeys(fullName);
  }

  async getFullNameInput(): Promise<string> {
    return await this.fullNameInput.getAttribute('value');
  }

  async setEmailInput(email: string): Promise<void> {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput(): Promise<string> {
    return await this.emailInput.getAttribute('value');
  }

  async setDiplomeInput(diplome: string): Promise<void> {
    await this.diplomeInput.sendKeys(diplome);
  }

  async getDiplomeInput(): Promise<string> {
    return await this.diplomeInput.getAttribute('value');
  }

  async setPhoneInput(phone: string): Promise<void> {
    await this.phoneInput.sendKeys(phone);
  }

  async getPhoneInput(): Promise<string> {
    return await this.phoneInput.getAttribute('value');
  }

  async setCityInput(city: string): Promise<void> {
    await this.cityInput.sendKeys(city);
  }

  async getCityInput(): Promise<string> {
    return await this.cityInput.getAttribute('value');
  }

  async userSelectLastOption(): Promise<void> {
    await this.userSelect.all(by.tagName('option')).last().click();
  }

  async userSelectOption(option: string): Promise<void> {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect(): ElementFinder {
    return this.userSelect;
  }

  async getUserSelectedOption(): Promise<string> {
    return await this.userSelect.element(by.css('option:checked')).getText();
  }

  async posteSelectLastOption(): Promise<void> {
    await this.posteSelect.all(by.tagName('option')).last().click();
  }

  async posteSelectOption(option: string): Promise<void> {
    await this.posteSelect.sendKeys(option);
  }

  getPosteSelect(): ElementFinder {
    return this.posteSelect;
  }

  async getPosteSelectedOption(): Promise<string> {
    return await this.posteSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class CandidatDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-candidat-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-candidat'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
