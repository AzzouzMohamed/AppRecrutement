import { element, by, ElementFinder } from 'protractor';

export class QuestionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-question div table .btn-danger'));
  title = element.all(by.css('jhi-question div h2#page-heading span')).first();
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

export class QuestionUpdatePage {
  pageTitle = element(by.id('jhi-question-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  enonceInput = element(by.id('field_enonce'));
  timingInput = element(by.id('field_timing'));
  niveaudedifficulteSelect = element(by.id('field_niveaudedifficulte'));

  examinSelect = element(by.id('field_examin'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setEnonceInput(enonce: string): Promise<void> {
    await this.enonceInput.sendKeys(enonce);
  }

  async getEnonceInput(): Promise<string> {
    return await this.enonceInput.getAttribute('value');
  }

  async setTimingInput(timing: string): Promise<void> {
    await this.timingInput.sendKeys(timing);
  }

  async getTimingInput(): Promise<string> {
    return await this.timingInput.getAttribute('value');
  }

  async setNiveaudedifficulteSelect(niveaudedifficulte: string): Promise<void> {
    await this.niveaudedifficulteSelect.sendKeys(niveaudedifficulte);
  }

  async getNiveaudedifficulteSelect(): Promise<string> {
    return await this.niveaudedifficulteSelect.element(by.css('option:checked')).getText();
  }

  async niveaudedifficulteSelectLastOption(): Promise<void> {
    await this.niveaudedifficulteSelect.all(by.tagName('option')).last().click();
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

export class QuestionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-question-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-question'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
