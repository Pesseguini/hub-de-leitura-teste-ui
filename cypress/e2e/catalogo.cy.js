/// <>reference types="cypress" />

describe('Funcionalidade: Catálogo de Livros', () => {

    beforeEach(() => {
        cy.visit('/catalog.html');

    });


    it.skip('Deve clicar no botão de adicional à cesta', () => {

        cy.get(':nth-child(1) > .card > .card-body > .mt-auto > .d-grid > .btn-primary').click()
        cy.get(':nth-child(2) > .nav-link').should('contain', '1')
        cy.get(':nth-child(2) > .card > .card-body > .mt-auto > .d-grid > .btn-primary').click()
        cy.get(':nth-child(2) > .nav-link').should('contain', 2)
        //Comportamento esperado

    });
    it('Deve clicarem todos botões Adicionar à cesta', () => {
        cy.get('.btn-primary').click({ multiple: true })
        cy.get(':nth-child(2) > .nav-link').should('contain', 12)


    });

    it('Deve clicar no primeiro botão Adicionar à cesta', () => {
        cy.get('.btn-primary').first().click()
        cy.get(':nth-child(2) > .nav-link').should('contain', 1)
        //Comportamento esperado
    });

    it('Deve clicar no último botão Adicionar à cesta', () => {
        cy.get('.btn-primary').last().click()
        cy.get(':nth-child(2) > .nav-link').should('contain', 1)
        //Comportamento esperado
    });

    it('Deve clicar no quinto botão adicionar à cesta', () => {
        cy.get('.btn-primary').eq(4).click()

    });

    it('Deve clicar no sétimo botão Adicionar à cesta', () => {
        cy.get('.btn-primary').eq(6).click()
        cy.get('#global-alert-container').should('contain', '"Cem Anos de Solidão" foi adicionado à cesta!')
    });

    it('Deve clicar no nome do livro e direcionar para a tela de checkout', () => {
        cy.contains('A Revolução dos Bichos').click()
        cy.url().should('include', 'book-details')
        cy.get('#add-to-cart-btn').click()
        cy.get('#cart-count').should('contain', 1)
        cy.get('#alert-container').should('contain', 'Livro adicionado à cesta com sucesso!')
    });
});