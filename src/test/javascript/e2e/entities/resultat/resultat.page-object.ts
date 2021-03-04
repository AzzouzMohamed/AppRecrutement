import { element, by, ElementFinder } from 'protractor';

export class ResultatComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-resultat div table .btn-danger'));
  title = element.all(by.css('jhi-resultat div h2#page-heading span')).first();
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

export class ResultatUpdatePage {
  pageTitle = element(by.id('jhi-resultat-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  noteInput = element(by.id('field_note'));
  mentionSelect = element(by.id('field_mention'));

  examinSelect = element(by.id('field_examin'));
  candidatSelect = element(by.id('field_candidat'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setNoteInput(note: string): Promise<void> {
    await this.noteInput.sendKeys(note);
  }

  async getNoteInput(): Promise<string> {
    return await this.noteInput.getAttribute('value');
  }

  async setMentionSelect(mention: string): Promise<void> {
    await this.mentionSelect.sendKeys(mention);
  }

  async getMentionSelect(): Promise<string> {
    return await this.mentionSelect.element(by.css('option:checked')).getText();
  }

  async mentionSelectLastOption(): Promise<void> {
    await this.mentionSelect.all(by.tagName('option')).last().click();
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

  async candidatSelectLastOption(): Promise<void> {
    await this.candidatSelect.all(by.tagName('option')).last().click();
  }

  async candidatSelectOption(option: string): Promise<void> {
    await this.candidatSelect.sendKeys(option);
  }

  getCandidatSelect(): ElementFinder {
    return this.candidatSelect;
  }

  async getCandidatSelectedOption(): Promise<string> {
    return await this.candidatSelect.element(by.css('option:checked')).getText();
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

export class ResultatDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-resultat-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-resultat'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
