import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { QuestionComponentsPage, QuestionDeleteDialog, QuestionUpdatePage } from './question.page-object';

const expect = chai.expect;

describe('Question e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let questionComponentsPage: QuestionComponentsPage;
  let questionUpdatePage: QuestionUpdatePage;
  let questionDeleteDialog: QuestionDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Questions', async () => {
    await navBarPage.goToEntity('question');
    questionComponentsPage = new QuestionComponentsPage();
    await browser.wait(ec.visibilityOf(questionComponentsPage.title), 5000);
    expect(await questionComponentsPage.getTitle()).to.eq('Questions');
    await browser.wait(ec.or(ec.visibilityOf(questionComponentsPage.entities), ec.visibilityOf(questionComponentsPage.noResult)), 1000);
  });

  it('should load create Question page', async () => {
    await questionComponentsPage.clickOnCreateButton();
    questionUpdatePage = new QuestionUpdatePage();
    expect(await questionUpdatePage.getPageTitle()).to.eq('Create or edit a Question');
    await questionUpdatePage.cancel();
  });

  it('should create and save Questions', async () => {
    const nbButtonsBeforeCreate = await questionComponentsPage.countDeleteButtons();

    await questionComponentsPage.clickOnCreateButton();

    await promise.all([
      questionUpdatePage.setEnonceInput('enonce'),
      questionUpdatePage.setTimingInput('5'),
      questionUpdatePage.niveaudedifficulteSelectLastOption(),
      questionUpdatePage.examinSelectLastOption(),
    ]);

    expect(await questionUpdatePage.getEnonceInput()).to.eq('enonce', 'Expected Enonce value to be equals to enonce');
    expect(await questionUpdatePage.getTimingInput()).to.eq('5', 'Expected timing value to be equals to 5');

    await questionUpdatePage.save();
    expect(await questionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await questionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Question', async () => {
    const nbButtonsBeforeDelete = await questionComponentsPage.countDeleteButtons();
    await questionComponentsPage.clickOnLastDeleteButton();

    questionDeleteDialog = new QuestionDeleteDialog();
    expect(await questionDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Question?');
    await questionDeleteDialog.clickOnConfirmButton();

    expect(await questionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
