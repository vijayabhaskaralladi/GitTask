const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 120000,
  pageLoadTimeout: 120000,
  requestTimeout: 60000,
  responseTimeout: 60000,
  numTestsKeptInMemory: 10,
  video: true,

  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {

      return require("./cypress/plugins/index.js")(on, config);
    },
    testIsolation: false,
    baseUrl: "https://www.saucedemo.com",
    specPattern: "cypress/e2e/**/*.feature",
    email:'alladi.b@iotaanalytics.com',
    password:'Aspire@web1',
    chromeWebSecurity: false,
    hosts: {
      "*.localhost": "127.0.0.1"
    }
  },

  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
    },
    specPattern: "cypress/e2e/**/*.cy.ts",
  },
});
