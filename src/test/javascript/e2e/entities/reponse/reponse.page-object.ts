import { element, by, ElementFinder } from 'protractor';

export class ReponseComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-reponse div table .btn-danger'));
  title = element.all(by.css('jhi-reponse div h2#page-heading span')).first();
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

export class ReponseUpdatePage {
  pageTitle = element(by.id('jhi-reponse-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  enoncedelaReponseInput = element(by.id('field_enoncedelaReponse'));
  veriteInput = element(by.id('field_verite'));

  questionSelect = element(by.id('field_question'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setEnoncedelaReponseInput(enoncedelaReponse: string): Promise<void> {
    await this.enoncedelaReponseInput.sendKeys(enoncedelaReponse);
  }

  async getEnoncedelaReponseInput(): Promise<string> {
    return await this.enoncedelaReponseInput.getAttribute('value');
  }

  getVeriteInput(): ElementFinder {
    return this.veriteInput;
  }

  async questionSelectLastOption(): Promise<void> {
    await this.questionSelect.all(by.tagName('option')).last().click();
  }

  async questionSelectOption(option: string): Promise<void> {
    await this.questionSelect.sendKeys(option);
  }

  getQuestionSelect(): ElementFinder {
    return this.questionSelect;
  }

  async getQuestionSelectedOption(): Promise<string> {
    return await this.questionSelect.element(by.css('option:checked')).getText();
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

export class ReponseDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-reponse-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-reponse'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
