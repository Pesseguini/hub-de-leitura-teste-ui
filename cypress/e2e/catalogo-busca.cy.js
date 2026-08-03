/// <>reference types="cypress" />
import catalogo from "../fixtures/dados.json"
describe('Funcionalidade: Busca no Catálogo de Livros', () => {
    beforeEach(() => {
        cy.visit('/catalog.html');

    });
    it('Deve fazer a busca do livro 1984 com sucesso', () => {
        cy.get('#search-input').type('1984')
        cy.get('.card > .card-body').should('contain', '1984')

    
    });
    it.only('Deve fazer a busca de um livro do arquivo de massa de dados', () => {
        cy.get('#search-input').type(catalogo[3].livro)
        cy.get('.card > .card-body').should('contain', catalogo[3].livro)
    });
});
