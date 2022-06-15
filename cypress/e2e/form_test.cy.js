import data from '../fixtures/people.json'
import invalidUser from '../fixtures/invalid_user.json'

describe('Navigate to Web Application', () => {
  it('Visits application page', () => {
    cy.visit('http://localhost:3000/')
    cy.contains('Registration').should("exist")
  })
})


describe('Tests Valid User Input', () => {

  data.forEach(user => {

    it(`Tests Data for ${user.first_name} ${user.last_name}`, () => {
      // cy.reload(true)
      cy.get('input[id="formGridFirstName"]').type(user.first_name).should('have.value', user.first_name);
      cy.get('input[id="formGridLastName"]').type(user.last_name).should('have.value', user.last_name);
      cy.get('input[id="formGridAge"]').clear().type(user.age).should('have.value', user.age);
      cy.get('input[id="formGridEmail"]').type(user.email).should('have.value', user.email);
      cy.get('input[id="formGridPhone"]').type(user.phone_number).should('have.value', user.phone_number);

      var address = user.address.split(",");

      cy.get('input[id="formGridAddress"]').type(address[0] + address[1]).should('have.value', address[0] + address[1]);
      cy.get('input[id="formGridAddress2"]').type(address[2].trim()).should('have.value', address[2].trim());
      cy.get('input[id="formGridPostcode"]').type(address[3].trim()).should('have.value', address[3].trim());
      cy.get('select[id="formGridLanguage"]').select(user.language).should('have.value', user.language);

      var isCarUser = user.hasOwnProperty('car');
      cy.get('select[id="formGridType"]').select(isCarUser ? "Car" : "Van");
      cy.get('select[id="formGridVehicle"]').select(isCarUser ? user.car : user.van);
      cy.contains(isCarUser ? "Car Model" : "Van Model").should("exist")
      cy.contains(isCarUser ? "Van Model" : "Car Model").should("not.exist")

      cy.get('button[name="submit"]').click()

      cy.contains('Successfully Registered').should("exist")
      cy.get('button[name="close"]').click()

    })
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

});
