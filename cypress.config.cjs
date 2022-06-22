/* eslint-disable no-console */
const { defineConfig } = require('cypress')

const fs = require('fs')
const papa = require('papaparse')
const path = require('path')

module.exports = defineConfig({
  fixturesFolder: false,
  e2e: {
    supportFile: false,

    async setupNodeEvents(on, config) {
      const filename = path.join(__dirname, 'cypress/fixtures/people.csv')
      console.log('loading file', filename)
      console.log(fs.readFileSync(filename));
      var data = papa.parse(fs.readFileSync(filename, 'utf8'));

      let newData1 = [];

      for (let index = 1; index < data.data.length; index++) {
        const user = data.data[index];

        let jsonEntry = {
          first_name: user[0],
          last_name: user[1],
          email: user[2],
          age: user[3],
          address: sanatizeAddress(user[4]),
          car: user[5],
          language: user[6],
          phone_number: user[7]
        }
        newData1.push(jsonEntry)
      }

      config.env.usersList = newData1

      return config
    },
  },
})


function sanatizeAddress(address){
    return address.replace("stirling", "stirling,").replace('123', '123,');
}