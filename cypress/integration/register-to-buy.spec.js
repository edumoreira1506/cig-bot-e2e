import { breederFactory, poultryFactory, userFactory } from '@cig-platform/factories';

/* eslint-disable cypress/no-unnecessary-waiting */
it('From register to buy a poultry', () => {
  const user = userFactory({ password: Cypress.env('PASSWORD')  });
  const breeder = breederFactory();
  const poultry = poultryFactory({ description: 'Cool description here :D' });

  cy.viewport('iphone-5');
  cy.visit(`${Cypress.env('MARKETPLACE_URL')}/login`);
  cy.contains('Registre-se').click();
  cy.wait(1000);

  cy.register({ user, breeder });

  cy.login({ email: user.email, password: user.password });

  cy.contains('Nova ave').click();
  cy.get('[name="poultry-type"]').select(poultry.type);
  cy.get('[name="poultry-gender"]').select(poultry.gender);
  cy.get('[name="poultry-gender-category"]').select(poultry.genderCategory);
  cy.get('[name="poultry-crest"]').select(poultry.crest);
  cy.get('[name="poultry-dewlap"]').select(poultry.dewlap);
  cy.get('[name="poultry-tail"]').select(poultry.tail);
  cy.get('[name="poultry-name"]').type(poultry.name);
  cy.get('[name="poultry-description"]').type(poultry.description);
  cy.get('[name="poultry-register"]').type(poultry.register);
  cy.get('[name="poultry-birth-date"]').type(poultry.birthDate.toISOString().split('T')[0]);
  cy.contains('Salvar').click();
  cy.aceeptSwal();
  cy.wait(1000);

  cy.get('[data-testid="round"]').last().click();
  cy.wait(1000);
  cy.get('ul li a svg').last().click();
  cy.contains('Anúnciar ave').click();
  cy.fillSwalInput('150');
  cy.aceeptSwal();

  cy.wait(1000);
  cy.aceeptSwal();

  cy.logout();

  const newUser = userFactory();
  const newBreeder = breederFactory();

  cy.contains('Registre-se').click();

  cy.register({ user: newUser, breeder: newBreeder });

  cy.login({ email: newUser.email, password: newUser.password });

  cy.visit(Cypress.env('MARKETPLACE_URL'));

  cy.get('button:nth-child(2)').first().click();
  cy.get('input').type(poultry.name).type('{enter}');
  cy.wait(1000);

  cy.contains(poultry.name).click();
  cy.scrollTo('bottom');
  cy.contains('Fazer proposta').click({ force: true });
  cy.fillSwalInput('3000');
  cy.aceeptSwal();
  cy.fillSwalInput('Bacanudo');
  cy.aceeptSwal();

  cy.wait(1000);
  cy.logout();

  cy.login({ email: user.email, password: user.password });

  cy.openMenu();
  cy.contains('Vendas').click();
  cy.contains(poultry.name).click();
  cy.scrollTo('bottom');
  cy.contains('Confirmar').click();
  cy.aceeptSwal();
  cy.wait(1000);
  cy.aceeptSwal();
  cy.logout();

  cy.login({ email: newUser.email, password: newUser.password });
  cy.openMenu();
  cy.contains('Compras').click();
  cy.contains(poultry.name).click();
  cy.scrollTo('bottom');
  cy.contains('Finalizar').click();
  cy.aceeptSwal();
  cy.wait(1000);
  cy.aceeptSwal();

  cy.openMenu();
  cy.contains('Meu plantel').click();
  cy.contains(poultry.name).click();
});
