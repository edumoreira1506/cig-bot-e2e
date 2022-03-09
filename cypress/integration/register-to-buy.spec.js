import { breederFactory, userFactory } from '@cig-platform/factories';

/* eslint-disable cypress/no-unnecessary-waiting */
it('From register to buy a poultry', () => {
  const user = userFactory({ password: Cypress.env('PASSWORD')  });
  const breeder = breederFactory();

  cy.visit(`${Cypress.env('MARKETPLACE_URL')}/login`);
  cy.contains('Registre-se').click();
  cy.wait(1000);

  cy.get('input[name="user-email"]').type(user.email);
  cy.get('input[name="user-password"]').type(user.password);
  cy.get('input[name="user-confirm-password"]').type(user.password);
  cy.get('input[name="user-name"]').type(user.name);
  cy.contains('Próximo').click();

  cy.get('input[name="breeder-name"]').type(breeder.name);
  cy.get('input[name="breeder-code"]').type(breeder.code);
  cy.contains('Cadastrar').click();
  cy.wait(1000);

  cy.get('input[name="email"]').type(user.email);
  cy.get('input[name="password"]').type(user.password);
  cy.contains('Entrar').click();
});
