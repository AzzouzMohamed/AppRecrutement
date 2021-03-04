import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ExaminComponentsPage, ExaminDeleteDialog, ExaminUpdatePage } from './examin.page-object';

const expect = chai.expect;

describe('Examin e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let examinComponentsPage: ExaminComponentsPage;
  let examinUpdatePage: ExaminUpdatePage;
  let examinDeleteDialog: ExaminDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Examins', async () => {
    await navBarPage.goToEntity('examin');
    examinComponentsPage = new ExaminComponentsPage();
    await browser.wait(ec.visibilityOf(examinComponentsPage.title), 5000);
    expect(await examinComponentsPage.getTitle()).to.eq('Examins');
    await browser.wait(ec.or(ec.visibilityOf(examinComponentsPage.entities), ec.visibilityOf(examinComponentsPage.noResult)), 1000);
  });

  it('should load create Examin page', async () => {
    await examinComponentsPage.clickOnCreateButton();
    examinUpdatePage = new ExaminUpdatePage();
    expect(await examinUpdatePage.getPageTitle()).to.eq('Create or edit a Examin');
    await examinUpdatePage.cancel();
  });

  it('should create and save Examins', async () => {
    const nbButtonsBeforeCreate = await examinComponentsPage.countDeleteButtons();

    await examinComponentsPage.clickOnCreateButton();

    await promise.all([examinUpdatePage.setDomaineDeCompetenceInput('domaineDeCompetence')]);

    expect(await examinUpdatePage.getDomaineDeCompetenceInput()).to.eq(
      'domaineDeCompetence',
      'Expected DomaineDeCompetence value to be equals to domaineDeCompetence'
    );

    await examinUpdatePage.save();
    expect(await examinUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await examinComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Examin', async () => {
    const nbButtonsBeforeDelete = await examinComponentsPage.countDeleteButtons();
    await examinComponentsPage.clickOnLastDeleteButton();

    examinDeleteDialog = new ExaminDeleteDialog();
    expect(await examinDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Examin?');
    await examinDeleteDialog.clickOnConfirmButton();

    expect(await examinComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
