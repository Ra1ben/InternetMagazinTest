import faker from 'faker';

describe('Internet magazin tests', () => {
  it('Registration', () => {
    cy.visit('https://automationteststore.com/');

    cy.get('#customer_menu_top').click();
    cy.get('button[type="submit"].btn.btn-orange.pull-right[title="Continue"]').click();

    // Your Personal Details

    cy.get('#AccountFrm h4:nth-child(4)')
    .contains('Your Personal Details')
    .should('be.visible');

    const randomFirstName = faker.name.firstName();
    const randomLastName = faker.name.lastName();
    const randomEmail = faker.internet.email();
    const randomTelephone = faker.phone.phoneNumber('050#######');
    const randomFax = faker.phone.phoneNumber('044#######');

    cy.get('#AccountFrm_firstname')
    .type(randomFirstName)
    .should('have.value', randomFirstName);

    Cypress.env('randomFirstName', randomFirstName);

    cy.get('#AccountFrm_lastname')
    .type(randomLastName)
    .should('have.value', randomLastName);

    cy.get('#AccountFrm_email')
    .type(randomEmail)
    .should('have.value', randomEmail);

    cy.get('#AccountFrm_telephone')
    .type(randomTelephone)
    .should('have.value', randomTelephone);

    cy.get('#AccountFrm_fax')
    .type(randomFax)
    .should('have.value', randomFax);

    // Your Address

    cy.get('#AccountFrm h4:nth-child(6)')
    .contains('Your Address')
    .should('be.visible');

    const randomCompanyName = faker.company.companyName();
    const randomCompanyAddress = faker.address.streetAddress();
    const randomCompanyAddress1 = faker.address.streetAddress();
    const randomCity = faker.address.city();
    const randomZipCode = faker.address.zipCode();

    cy.get('#AccountFrm_company')
    .type(randomCompanyName)
    .should('have.value', randomCompanyName);

    cy.get('#AccountFrm_address_1')
    .type(randomCompanyAddress)
    .should('have.value', randomCompanyAddress);

    cy.get('#AccountFrm_address_2')
    .type(randomCompanyAddress1)
    .should('have.value', randomCompanyAddress1);

    cy.get('#AccountFrm_city')
    .type(randomCity)
    .should('have.value', randomCity);

    cy.get('#AccountFrm_zone_id')
    .select('3599')
    .should('have.value', '3599');

    cy.get('#AccountFrm_postcode')
    .type(randomZipCode)
    .should('have.value', randomZipCode);

    // Login Details

    cy.get('#AccountFrm h4:nth-child(8)')
    .contains('Login Details')
    .should('be.visible');

    const randomUserName = faker.internet.userName();
    const randomUserPassword = faker.internet.password();

    Cypress.env('randomUserName', randomUserName);
    Cypress.env('randomUserPassword', randomUserPassword);

    cy.get('#AccountFrm_loginname')
    .type(randomUserName)
    .should('have.value', randomUserName);

    cy.get('#AccountFrm_password')
    .type(randomUserPassword)
    .should('have.value', randomUserPassword);

    cy.get('#AccountFrm_confirm')
    .type(randomUserPassword)
    .should('have.value', randomUserPassword);

    // Newsletter

    cy.get('#AccountFrm h4:nth-child(10)')
    .contains('Newsletter')
    .should('be.visible');

    cy.get('#AccountFrm_newsletter1')
    .first()
    .check()
    .should('be.checked');  

    cy.get('#AccountFrm_agree')
    .check()
    .should('be.checked');

    cy.get('.btn.btn-orange.pull-right.lock-on-click')
    .click();

    cy.get('.maintext')
    .contains(' Your Account Has Been Created!')
    .should('be.visible');
  });

  it('Authorization', () => {
    cy.visit('https://automationteststore.com/');

    cy.get('#customer_menu_top').click();

    const randomUserName = Cypress.env('randomUserName');
    const randomUserPassword = Cypress.env('randomUserPassword');
    const randomFirstName = Cypress.env('randomFirstName');

    cy.get('#loginFrm_loginname')
    .type(randomUserName)
    .should('have.value', randomUserName);

    cy.get('#loginFrm_password')
    .type(randomUserPassword)
    .should('have.value', randomUserPassword);

    cy.get('button[type="submit"].btn.btn-orange.pull-right[title="Login"]').click();

    cy.get('.subtext')
    .contains(randomFirstName)
  });

  it('Placing an order', () => {
    cy.visit('https://automationteststore.com/');

    cy.get('#customer_menu_top').click();

    const randomUserName = Cypress.env('randomUserName');
    const randomUserPassword = Cypress.env('randomUserPassword');
    const randomFirstName = Cypress.env('randomFirstName');

    cy.get('#loginFrm_loginname')
    .type(randomUserName)
    .should('have.value', randomUserName);

    cy.get('#loginFrm_password')
    .type(randomUserPassword)
    .should('have.value', randomUserPassword);

    cy.get('button[type="submit"].btn.btn-orange.pull-right[title="Login"]')
    .click();

    cy.get('.subtext')
    .contains(randomFirstName);

    cy.get('[href="https://automationteststore.com/index.php?rt=product/category&path=65"]')
    .click();

    cy.get('.maintext')
    .contains('Books')
    .should('be.visible');

    cy.get('#maincontainer div div div div div.thumbnails.grid.row.list-inline div:nth-child(4) div.thumbnail div.pricetag.jumbotron a i')
    .click();

    cy.get('#main_menu_top li:nth-child(3) a span')
    .scrollIntoView()
    .click();

    cy.get('tbody :nth-child(2) :nth-child(2) a')
    .contains('Allegiant by Veronica Roth')
    .should('be.visible')

    cy.get('#cart_checkout2')
    .click();

    cy.get('#checkout_btn')
    .click();

    cy.get('.maintext')
    .contains(' Your Order Has Been Processed!')
    .should('be.visible');

    cy.get('.mb40 .btn')
    .click();
  })
});