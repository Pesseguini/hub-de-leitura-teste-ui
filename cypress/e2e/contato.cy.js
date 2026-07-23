describe('Funcionalidade: Contato', () => {

  beforeEach(() => {cy.visit('/index.html')  });


  it('Deve preencher formulário de contato com sucesso', () => {

    
    cy.get('[name="name"]').type('Lucas')
    cy.get('[name="email"]').type('lucas@email.com')
    cy.get('[name="subject"]').select('Dúvidas Gerais')
    cy.get('[name="message"]').type('Hello, I have a suggestion for your website.')
    cy.get('#btn-submit').click()
    //Resultado esperado
    cy.contains('Contato enviado com sucesso').should('exist')
  });

  it('Deve validar mensagem de erro ao enviar sem preencher nome', () => {
    
    cy.get('[name="name"]').clear()
    cy.get('[name="email"]').type('lucas@email.com')
    cy.get('[name="subject"]').select('Dúvidas Gerais')
    cy.get('[name="message"]').type('Hello, I have a suggestion for your website.')
    cy.get('#btn-submit').click()
    cy.get('#alert-container').should('contain', 'Por favor, preencha o campo Nome')
  });

  it('Deve validar mensagem de erro ao enviar sem preencher email', () => {
    
    cy.get('[name="name"]').type('Lucas')
    cy.get('[name="email"]').clear()
    cy.get('[name="subject"]').select('Dúvidas Gerais')
    cy.get('[name="message"]').type('Hello, I have a suggestion for your website.')
    cy.get('#btn-submit').click()
    cy.get('#alert-container').should('contain', 'Por favor, preencha o campo E-mail')
    //Resultado esperado
  })

  it('Deve validar mensagem de erro ao enviar sem selecionar o assunto', () => {
    
    cy.get('[name="name"]').type('Lucas')
    cy.get('[name="email"]').type('lucas@email.com')
    cy.get('[name="message"]').type('Hello, I have a suggestion for your website.')
    cy.get('#btn-submit').click()
    cy.get('#alert-container').should('contain', 'Por favor, selecione o Assunto')
    //Resultado esperado

  })

  it('Deve validar a mensagem de erro ao enviar sem preencher a mensagem', () => {
    
    cy.get('[name="name"]').type('Lucas')
    cy.get('[name="email"]').type('lucas@email.com')
    cy.get('[name="subject"]').select('Dúvidas Gerais')
    cy.get('#btn-submit').click()
    cy.get('#alert-container').should('contain', 'Por favor, escreva sua Mensagem')
    //Resultado esperado
  })


});
