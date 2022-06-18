import data from '../fixtures/people.json'

describe('Navigate to Web Application', () => {
  it('Visits application page', () => {
    cy.visit('http://localhost:3000/')
    cy.contains('Registration').should("exist")
  })
})


describe('Tests Valid User Input', () => {

  // Takes in people.json and cycles through each defitinition of a person and creates a test.
  data.forEach(user => {

    it(`Tests Data for ${user.first_name} ${user.last_name}`, () => {

      // Throughout this test, users input will be typed into it's corresponding field and then the field will be validated by cypress
      // to ensure that the typed value has been typed correctly and to ensure that the field actually took the value.
      cy.get('input[id="formGridFirstName"]').type(user.first_name).should('have.value', user.first_name); 
      cy.get('input[id="formGridLastName"]').type(user.last_name).should('have.value', user.last_name);
      cy.get('input[id="formGridAge"]').clear().type(user.age).should('have.value', user.age); 
      cy.get('input[id="formGridEmail"]').type(user.email).should('have.value', user.email); 
      cy.get('input[id="formGridPhone"]').type(user.phone_number).should('have.value', user.phone_number); 

      // Since the address value is stored as '123, Fake Street, Midlothian, EH8 4UL', each section of the address can be broken into smaller pieces. 
      //This allows for typing each piece into it's corresponding form.
      var address = user.address.split(",");

      // Address input. Sanitised of spaces by using trim().
      // 0 - House Number
      // 1 - Street name
      // 2 - County
      // 3 - Postcode
      cy.get('input[id="formGridAddress"]').type(address[0] + address[1]).should('have.value', address[0] + address[1]);
      cy.get('input[id="formGridAddress2"]').type(address[2].trim()).should('have.value', address[2].trim());
      cy.get('input[id="formGridPostcode"]').type(address[3].trim()).should('have.value', address[3].trim());
    
      cy.get('select[id="formGridLanguage"]').select(user.language).should('have.value', user.language);

      // Since the web application changes based on whether the user has a car or a van, we must first check which the user has.
      // Then we update the select to reflect the result so that the user can select the relevant model of vehicle. 
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

