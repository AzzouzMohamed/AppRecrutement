import { element, by, ElementFinder } from 'protractor';

export class PosteComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-poste div table .btn-danger'));
  title = element.all(by.css('jhi-poste div h2#page-heading span')).first();
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

export class PosteUpdatePage {
  pageTitle = element(by.id('jhi-poste-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nomDuPosteInput = element(by.id('field_nomDuPoste'));
  descriptionInput = element(by.id('field_description'));

  examinSelect = element(by.id('field_examin'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setNomDuPosteInput(nomDuPoste: string): Promise<void> {
    await this.nomDuPosteInput.sendKeys(nomDuPoste);
  }

  async getNomDuPosteInput(): Promise<string> {
    return await this.nomDuPosteInput.getAttribute('value');
  }

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
  }

  async examinSelectLastOption(): Promise<void> {
    await this.examinSelect.all(by.tagName('option')).last().click();
  }

  async examinSelectOption(option: string): Promise<void> {
    await this.examinSelect.sendKeys(option);
  }

  getExaminSelect(): ElementFinder {
    return this.examinSelect;
  }

  async getExaminSelectedOption(): Promise<string> {
    return await this.examinSelect.element(by.css('option:checked')).getText();
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

export class PosteDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-poste-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-poste'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
