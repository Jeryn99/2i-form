import data from '../fixtures/people.json'

function csvJSON(csv){
  var lines=csv.toString().split("\n");
  var result = [];
  var headers=lines[0].split(",");

  for(var i=1;i<lines.length;i++){

      var obj = {};
      var currentline=lines[i].split(",");

      for(var j=0;j<headers.length;j++){
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

  data.forEach(item => {
    console.log(item)
    it(`Tests Data for ${item.first_name} ${item.last_name}`, () => {
      cy.get('input[id="formGridFirstName"]').type(item.first_name);
      cy.get('input[id="formGridLastName"]').type(item.last_name);
      cy.get('input[id="formGridAge"]').type(item.age);
      cy.get('input[id="formGridEmail"]').type(item.email);
      cy.get('input[id="formGridPhone"]').type(item.phone_number);

      
      cy.get('button[type="submit"]').click()
    })
  })

})

