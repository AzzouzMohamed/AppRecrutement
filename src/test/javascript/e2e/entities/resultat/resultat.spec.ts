import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ResultatComponentsPage, ResultatDeleteDialog, ResultatUpdatePage } from './resultat.page-object';

const expect = chai.expect;

describe('Resultat e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let resultatComponentsPage: ResultatComponentsPage;
  let resultatUpdatePage: ResultatUpdatePage;
  let resultatDeleteDialog: ResultatDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Resultats', async () => {
    await navBarPage.goToEntity('resultat');
    resultatComponentsPage = new ResultatComponentsPage();
    await browser.wait(ec.visibilityOf(resultatComponentsPage.title), 5000);
    expect(await resultatComponentsPage.getTitle()).to.eq('Resultats');
    await browser.wait(ec.or(ec.visibilityOf(resultatComponentsPage.entities), ec.visibilityOf(resultatComponentsPage.noResult)), 1000);
  });

  it('should load create Resultat page', async () => {
    await resultatComponentsPage.clickOnCreateButton();
    resultatUpdatePage = new ResultatUpdatePage();
    expect(await resultatUpdatePage.getPageTitle()).to.eq('Create or edit a Resultat');
    await resultatUpdatePage.cancel();
  });

  it('should create and save Resultats', async () => {
    const nbButtonsBeforeCreate = await resultatComponentsPage.countDeleteButtons();

    await resultatComponentsPage.clickOnCreateButton();

    await promise.all([
      resultatUpdatePage.setNoteInput('5'),
      resultatUpdatePage.mentionSelectLastOption(),
      resultatUpdatePage.examinSelectLastOption(),
      resultatUpdatePage.candidatSelectLastOption(),
    ]);

    expect(await resultatUpdatePage.getNoteInput()).to.eq('5', 'Expected note value to be equals to 5');

    await resultatUpdatePage.save();
    expect(await resultatUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await resultatComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Resultat', async () => {
    const nbButtonsBeforeDelete = await resultatComponentsPage.countDeleteButtons();
    await resultatComponentsPage.clickOnLastDeleteButton();

    resultatDeleteDialog = new ResultatDeleteDialog();
    expect(await resultatDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Resultat?');
    await resultatDeleteDialog.clickOnConfirmButton();

    expect(await resultatComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
