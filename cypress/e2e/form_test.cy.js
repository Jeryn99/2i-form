import data from '../fixtures/people.json'

describe('Navigate to Web Application', () => {
  it('visits application page', () => {
    cy.visit('http://localhost:3000/')
    cy.contains('Form').should("exist")
  })
})



describe('Tests Valid User Input', () => {

  data.forEach(item => {
    console.log(item)
    it(`Tests Data for ${item.firstName} ${item.lastName}`, () => {
      cy.get('input[id="formGridFirstName"]').type(item.firstName);
      cy.get('input[id="formGridLastName"]').type(item.lastName);
      cy.get('input[id="formGridEmail"]').type(item.email);
      
      cy.get('button[type="submit"]').click()
    })
  })

})

