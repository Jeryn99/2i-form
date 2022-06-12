import data from '../fixtures/people.json'

function csvJSON(csv) {
  var lines = csv.toString().split("\n");
  var result = [];
  var headers = lines[0].split(",");

  for (var i = 1; i < lines.length; i++) {

    var obj = {};
    var currentline = lines[i].split(",");

    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);
  }
  return JSON.parse(JSON.stringify(result));
}

describe('Navigate to Web Application', () => {
  it('visits application page', () => {
    cy.visit('http://localhost:3000/')
    cy.contains('Form').should("exist")
  })
})



describe('Tests Valid User Input', () => {

  data.forEach(user => {

    it(`Tests Data for ${user.first_name} ${user.last_name}`, () => {
      cy.reload(true)
      cy.get('input[id="formGridFirstName"]').type(user.first_name).should('have.value', user.first_name);
      cy.get('input[id="formGridLastName"]').type(user.last_name).should('have.value', user.last_name);
      cy.get('input[id="formGridAge"]').type(user.age).should('have.value', user.age);
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


      cy.get('button[type="submit"]')
    })
  })

})

