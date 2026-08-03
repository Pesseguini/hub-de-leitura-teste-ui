/// <>reference types="cypress" />
import { faker } from '@faker-js/faker';
import cadastroPage from '../support/pages/cadastro-page.js';

describe('Funcionalidade: Cadastro no Hub de Leiura', () => {

    beforeEach(() => {
        cadastroPage.visitarPaginaCadastro() 
        ///<<Page Object>>  ///cy.visit('register.html'); está sendo substituido pelo page object
    
    });
    it('Deve realizar o cadastro com sucesso, usando função JS', () => {
        let email = `teste${Date.now()}@teste.com`
        let name = `Joãozinho${Date.now()}`
        let telefone = faker.string.numeric(11)
        cy.get('#name').type(name)
        cy.get('#email').type(email)
        cy.get('#phone').type(telefone)
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

    it('Deve preencher cadastro com sucesso- usando custom command', () => {
        let email = `teste${Date.now()}@teste.com`
        let telefone = faker.string.numeric(11)
        cy.preencherCadastro(
            'Lucas Silva',
            email,
            telefone,
            'Teste@123',
            'Teste@123')
        cy.url().should('include', 'dashboard')
    });

    it('Deve fazer cadastro com sucesso Usando Page Objects', () => {
        let email= faker.internet.email()
        let nome = faker.person.fullName()
       cadastroPage.preencherCadastro(nome, email, '(11) 99999-9999', 'Teste@123', 'Teste@123')
        cy.url().should('include', 'dashboard')
        cy.get(cy.get('#user-name').should('contain',nome))
    
});
it('Deve validar mensagem ao tentar cadastrar sem preencher nome', () => {
    let email= faker.internet.email()
cadastroPage.preencherCadastro('',email, '(11) 99999-9999', 'Teste@123', 'Teste@123')
cy.get(':nth-child(1) > .invalid-feedback').should('be.visible')
});
it('Deve validar mensagem de erro ao tentar cadastrar com um email inválido', () => {
    let nome = faker.person.fullName()
    cadastroPage.preencherCadastro(nome,'teste@teste.com',1198939204, 'Teste@123', 'Teste@123')
cy.get('#alert-container').should('be.visible')});

it('Deve Deve permitir cadastrar com um telefone inválido', () => {
    ///Telefone não é um campo obrigatório, então o sistema permite cadastrar com telefone inválido
    let nome = faker.person.fullName()
    let email = faker.internet.email()
    cadastroPage.preencherCadastro(nome,email,'11983959204', 'Teste@123', 'Teste@123')
    ///Comportamento esperado: O sistema deve permitir cadastrar com um telefone inválido, pois o campo não é obrigatório
   
});
it('Deve validar mensagem de erro ao tentar cadastrar com uma senha diferente da confirmação de senha', () => {
    let nome = faker.person.fullName()
    let email = faker.internet.email()
    cadastroPage.preencherCadastro(nome,email,'11983959204', 'Teste@123', 'Teste@1234')
    cy.get(':nth-child(5) > .invalid-feedback').should('be.visible')
    ///Comportamento esperado: O sistema deve exibir a mensagem de erro, caso a senha e a confirmação de senha não sejam iguais
});
it('Deve validar mensagem de senha fraca, caso não cumpra os requesitos mínimos de senha', () => {
    let nome = faker.person.fullName()
    let email = faker.internet.email()
    let telefone = faker.string.numeric(11)
    cadastroPage.preencherCadastro(nome,email,telefone, 'teste', 'teste')
    cy.get('#password-feedback').should('contain', 'Senha fraca')
    ///Comportamento esperado: O sistema deve exibir a mensagem de senha fraca, caso a senha não cumpra os requisitos mínimos de segurança
});
it.only('Deve validar mensagens de erro ao tentar cadastrar sem preencher nome e email', () => {
    let nome = faker.person.fullName()
    let email = faker.internet.email()
    let telefone = faker.string.numeric(11)
    cadastroPage.preencherCadastro('','',telefone, 'Teste@123', 'Teste@123')
    cy.get(':nth-child(1) > .invalid-feedback').should('contain', 'Nome deve ter pelo menos 2 caracteres')
    cy.get('#register-form > :nth-child(2) > .invalid-feedback').should('contain', 'Email válido é obrigatório')
///Comportamento esperado: O sistema deve exibir as mensagens de erro, caso o usuário não preencha os campos obrigatórios
    
});
});

