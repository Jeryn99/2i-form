import invalidUser from '../fixtures/invalid_user.json'

describe('Navigate to Web Application', () => {
  it('Visits application page', () => {
    cy.visit('http://localhost:3000/')
    cy.contains('Registration').should("exist")
  })
})


describe('Tests Invalid Data reactions', () => {

  it(`Populates Data for ${invalidUser.first_name} ${invalidUser.last_name}`, () => {
    cy.get('input[id="formGridFirstName"]').type(invalidUser.first_name).should('have.value', invalidUser.first_name);
    cy.get('input[id="formGridLastName"]').type(invalidUser.last_name).should('have.value', invalidUser.last_name);
  });

  it(`Tests invalid age for ${invalidUser.first_name} ${invalidUser.last_name}`, () => {
    cy.get('input[id="formGridAge"]').clear().type(invalidUser.invalid_age).should('have.value', invalidUser.invalid_age);
    cy.get('button[name="submit"]').click()
    cy.contains("Invalid age! (18 - 100)");
    cy.get('input[id="formGridAge"]').clear().type(invalidUser.valid_age).should('have.value', invalidUser.valid_age);
  });

  it(`Tests invalid email for ${invalidUser.first_name} ${invalidUser.last_name}`, () => {
    cy.get('input[id="formGridEmail"]').clear().type(invalidUser.invalid_email).should('have.value', invalidUser.invalid_email);
    cy.get('button[name="submit"]').click()
    cy.contains("Please enter a valid email address!");
    cy.get('input[id="formGridEmail"]').clear().type(invalidUser.valid_email).should('have.value', invalidUser.valid_email);
  });

  it(`Tests invalid phone number for ${invalidUser.first_name} ${invalidUser.last_name}`, () => {
    cy.get('button[name="submit"]').click()
    cy.contains("Please enter a valid phone number!");
    cy.get('input[id="formGridPhone"]').clear().type(invalidUser.phone_number).should('have.value', invalidUser.phone_number);
  });


  
  var invalidAddress = invalidUser.invalid_address.split(",");
  var validAddress = invalidUser.valid_address.split(",");

  it(`Tests invalid postcode for ${invalidUser.first_name} ${invalidUser.last_name}`, () => {

    cy.get('input[id="formGridAddress"]').type(invalidAddress[0] + invalidAddress[1]).should('have.value', invalidAddress[0] + invalidAddress[1]);
    cy.get('input[id="formGridAddress2"]').type(invalidAddress[2].trim()).should('have.value', invalidAddress[2].trim());
    cy.get('input[id="formGridPostcode"]').type(invalidAddress[3].trim()).should('have.value', invalidAddress[3].trim());
    cy.get('select[id="formGridLanguage"]').select(invalidUser.language).should('have.value', invalidUser.language);

    cy.get('button[name="submit"]').click()
    cy.contains("Please enter a valid postcode!");
    cy.get('input[id="formGridPostcode"]').clear().type(validAddress[3].trim()).should('have.value', validAddress[3].trim());

  });

  

});
