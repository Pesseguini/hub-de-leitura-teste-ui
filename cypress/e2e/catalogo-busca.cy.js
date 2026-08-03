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
    it('Deve fazer a busca de um livro do arquivo de massa de dados', () => {
        cy.get('#search-input').type(catalogo[0].livro)
        cy.get('.card > .card-body').should('contain', catalogo[0].livro)
    });

    it('Deve fazer a busca de um livro usando o fixture', () => {
        cy.fixture('dados').then((cat) => {
            cy.get('#search-input').type(cat[0].livro)
            cy.get('.card > .card-body').should('contain', cat[0].livro)

        })
    });
    it.only('Deve validar todos os itens da Lista', () => {
        cy.fixture('dados').then((cat) => {
            cat.forEach(item => {
                cy.get('#search-input').clear().type(item.livro)
                cy.get('.card > .card-body').should('contain', item.livro)
            })
        });
        
            })
});
