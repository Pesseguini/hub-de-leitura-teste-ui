/// <>reference types="cypress" />
import { faker } from '@faker-js/faker'

describe('Funcionalidade: Cadastro no Hub de Leiura', () => {

    beforeEach(() => {
        cy.visit('register.html');
    });
    it('Deve realizar o cadastro com sucesso, usando função JS', () => {
        let email = `teste${Date.now()}@teste.com`
        let name = `Joãozinho${Date.now()}`
        cy.get('#name').type(name)
        cy.get('#email').type(email)
        cy.get('#phone').type('(11) 99999-9999')
        cy.get('#password').type('Teste2345')
        cy.get('#confirm-password').type('Teste2345')
        cy.get('#terms-agreement').check()
        cy.get('#register-btn').click()
        //Comportamento esperado
        cy.url().should('include', 'dashboard.html')
    });

    it('Deve realizar o cadastro com sucesso, usando Faker', () => {

        let email = faker.internet.email()
        let name = faker.person.fullName()
        cy.get('#name').type(name)
        cy.get('#email').type(email)
        cy.get('#phone').type('(11) 99999-9999')
        cy.get('#password').type('Teste2345')
        cy.get('#confirm-password').type('Teste2345')
        cy.get('#terms-agreement').check()
        cy.get('#register-btn').click()
        //Comportamento esperado
        cy.url().should('include', 'dashboard.html')
        cy.get('#user-name').should('contain', name)
    });



});



