import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ReponseComponentsPage, ReponseDeleteDialog, ReponseUpdatePage } from './reponse.page-object';

const expect = chai.expect;

describe('Reponse e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let reponseComponentsPage: ReponseComponentsPage;
  let reponseUpdatePage: ReponseUpdatePage;
  let reponseDeleteDialog: ReponseDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Reponses', async () => {
    await navBarPage.goToEntity('reponse');
    reponseComponentsPage = new ReponseComponentsPage();
    await browser.wait(ec.visibilityOf(reponseComponentsPage.title), 5000);
    expect(await reponseComponentsPage.getTitle()).to.eq('Reponses');
    await browser.wait(ec.or(ec.visibilityOf(reponseComponentsPage.entities), ec.visibilityOf(reponseComponentsPage.noResult)), 1000);
  });

  it('should load create Reponse page', async () => {
    await reponseComponentsPage.clickOnCreateButton();
    reponseUpdatePage = new ReponseUpdatePage();
    expect(await reponseUpdatePage.getPageTitle()).to.eq('Create or edit a Reponse');
    await reponseUpdatePage.cancel();
  });

  it('should create and save Reponses', async () => {
    const nbButtonsBeforeCreate = await reponseComponentsPage.countDeleteButtons();

    await reponseComponentsPage.clickOnCreateButton();

    await promise.all([reponseUpdatePage.setEnoncedelaReponseInput('enoncedelaReponse'), reponseUpdatePage.questionSelectLastOption()]);

    expect(await reponseUpdatePage.getEnoncedelaReponseInput()).to.eq(
      'enoncedelaReponse',
      'Expected EnoncedelaReponse value to be equals to enoncedelaReponse'
    );
    const selectedVerite = reponseUpdatePage.getVeriteInput();
    if (await selectedVerite.isSelected()) {
      await reponseUpdatePage.getVeriteInput().click();
      expect(await reponseUpdatePage.getVeriteInput().isSelected(), 'Expected verite not to be selected').to.be.false;
    } else {
      await reponseUpdatePage.getVeriteInput().click();
      expect(await reponseUpdatePage.getVeriteInput().isSelected(), 'Expected verite to be selected').to.be.true;
    }

    await reponseUpdatePage.save();
    expect(await reponseUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await reponseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Reponse', async () => {
    const nbButtonsBeforeDelete = await reponseComponentsPage.countDeleteButtons();
    await reponseComponentsPage.clickOnLastDeleteButton();

    reponseDeleteDialog = new ReponseDeleteDialog();
    expect(await reponseDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Reponse?');
    await reponseDeleteDialog.clickOnConfirmButton();

    expect(await reponseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
