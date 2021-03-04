import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CandidatComponentsPage, CandidatDeleteDialog, CandidatUpdatePage } from './candidat.page-object';

const expect = chai.expect;

describe('Candidat e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let candidatComponentsPage: CandidatComponentsPage;
  let candidatUpdatePage: CandidatUpdatePage;
  let candidatDeleteDialog: CandidatDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Candidats', async () => {
    await navBarPage.goToEntity('candidat');
    candidatComponentsPage = new CandidatComponentsPage();
    await browser.wait(ec.visibilityOf(candidatComponentsPage.title), 5000);
    expect(await candidatComponentsPage.getTitle()).to.eq('Candidats');
    await browser.wait(ec.or(ec.visibilityOf(candidatComponentsPage.entities), ec.visibilityOf(candidatComponentsPage.noResult)), 1000);
  });

  it('should load create Candidat page', async () => {
    await candidatComponentsPage.clickOnCreateButton();
    candidatUpdatePage = new CandidatUpdatePage();
    expect(await candidatUpdatePage.getPageTitle()).to.eq('Create or edit a Candidat');
    await candidatUpdatePage.cancel();
  });

  it('should create and save Candidats', async () => {
    const nbButtonsBeforeCreate = await candidatComponentsPage.countDeleteButtons();

    await candidatComponentsPage.clickOnCreateButton();

    await promise.all([
      candidatUpdatePage.setFullNameInput('fullName'),
      candidatUpdatePage.setEmailInput('fL@FI^.7jXL'),
      candidatUpdatePage.setDiplomeInput('diplome'),
      candidatUpdatePage.setPhoneInput('phone'),
      candidatUpdatePage.setCityInput('city'),
      candidatUpdatePage.userSelectLastOption(),
      candidatUpdatePage.posteSelectLastOption(),
    ]);

    expect(await candidatUpdatePage.getFullNameInput()).to.eq('fullName', 'Expected FullName value to be equals to fullName');
    expect(await candidatUpdatePage.getEmailInput()).to.eq('fL@FI^.7jXL', 'Expected Email value to be equals to fL@FI^.7jXL');
    expect(await candidatUpdatePage.getDiplomeInput()).to.eq('diplome', 'Expected Diplome value to be equals to diplome');
    expect(await candidatUpdatePage.getPhoneInput()).to.eq('phone', 'Expected Phone value to be equals to phone');
    expect(await candidatUpdatePage.getCityInput()).to.eq('city', 'Expected City value to be equals to city');

    await candidatUpdatePage.save();
    expect(await candidatUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await candidatComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Candidat', async () => {
    const nbButtonsBeforeDelete = await candidatComponentsPage.countDeleteButtons();
    await candidatComponentsPage.clickOnLastDeleteButton();

    candidatDeleteDialog = new CandidatDeleteDialog();
    expect(await candidatDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Candidat?');
    await candidatDeleteDialog.clickOnConfirmButton();

    expect(await candidatComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
