import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PosteComponentsPage, PosteDeleteDialog, PosteUpdatePage } from './poste.page-object';

const expect = chai.expect;

describe('Poste e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let posteComponentsPage: PosteComponentsPage;
  let posteUpdatePage: PosteUpdatePage;
  let posteDeleteDialog: PosteDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Postes', async () => {
    await navBarPage.goToEntity('poste');
    posteComponentsPage = new PosteComponentsPage();
    await browser.wait(ec.visibilityOf(posteComponentsPage.title), 5000);
    expect(await posteComponentsPage.getTitle()).to.eq('Postes');
    await browser.wait(ec.or(ec.visibilityOf(posteComponentsPage.entities), ec.visibilityOf(posteComponentsPage.noResult)), 1000);
  });

  it('should load create Poste page', async () => {
    await posteComponentsPage.clickOnCreateButton();
    posteUpdatePage = new PosteUpdatePage();
    expect(await posteUpdatePage.getPageTitle()).to.eq('Create or edit a Poste');
    await posteUpdatePage.cancel();
  });

  it('should create and save Postes', async () => {
    const nbButtonsBeforeCreate = await posteComponentsPage.countDeleteButtons();

    await posteComponentsPage.clickOnCreateButton();

    await promise.all([
      posteUpdatePage.setNomDuPosteInput('nomDuPoste'),
      posteUpdatePage.setDescriptionInput('description'),
      // posteUpdatePage.examinSelectLastOption(),
    ]);

    expect(await posteUpdatePage.getNomDuPosteInput()).to.eq('nomDuPoste', 'Expected NomDuPoste value to be equals to nomDuPoste');
    expect(await posteUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');

    await posteUpdatePage.save();
    expect(await posteUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await posteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Poste', async () => {
    const nbButtonsBeforeDelete = await posteComponentsPage.countDeleteButtons();
    await posteComponentsPage.clickOnLastDeleteButton();

    posteDeleteDialog = new PosteDeleteDialog();
    expect(await posteDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Poste?');
    await posteDeleteDialog.clickOnConfirmButton();

    expect(await posteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
