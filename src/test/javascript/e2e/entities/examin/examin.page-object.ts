import { element, by, ElementFinder } from 'protractor';

export class ExaminComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-examin div table .btn-danger'));
  title = element.all(by.css('jhi-examin div h2#page-heading span')).first();
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

export class ExaminUpdatePage {
  pageTitle = element(by.id('jhi-examin-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  domaineDeCompetenceInput = element(by.id('field_domaineDeCompetence'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setDomaineDeCompetenceInput(domaineDeCompetence: string): Promise<void> {
    await this.domaineDeCompetenceInput.sendKeys(domaineDeCompetence);
  }

  async getDomaineDeCompetenceInput(): Promise<string> {
    return await this.domaineDeCompetenceInput.getAttribute('value');
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

export class ExaminDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-examin-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-examin'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
