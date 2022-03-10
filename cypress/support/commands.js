/* eslint-disable cypress/no-unnecessary-waiting */

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('aceeptSwal', () => {
  cy.get('.swal2-confirm').click();
});

Cypress.Commands.add('register', ({ user, breeder }) => {
  cy.get('input[name="user-name"]').type(user.name);
  cy.get('input[name="user-email"]').type(user.email);
  cy.get('input[name="user-password"]').type(user.password);
  cy.get('input[name="user-confirm-password"]').type(user.password);
  cy.contains('Próximo').click();

  cy.get('input[name="breeder-name"]').type(breeder.name);
  cy.get('input[name="breeder-code"]').type(breeder.code);
  cy.contains('Cadastrar').click();
  cy.wait(1000);
  cy.aceeptSwal();
});

Cypress.Commands.add('login', ({ email, password }) => {
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.contains('Entrar').click();
  cy.wait(1000);
});

Cypress.Commands.add('fillSwalInput', (value) => {
  cy.get('.swal2-input').type(value);
});

Cypress.Commands.add('logout', () => {
  cy.get('[data-testid="round-image-container"]').click();
  cy.contains('Sair').click();
});

Cypress.Commands.add('openMenu', () => {
  cy.get('[data-testid="sandwich-button"]').click();
});
