// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test


///<reference types="Cypress" />

//describe = suíte de testes
//it = caso de teste

    describe('Central de Atendimento ao Cliente TAT', function() {
        
        beforeEach(function() {
            cy.visit('./src/index.html')
        })
    
        it('verifica o título da aplicação', function() {
            cy.title()
              .should('be.equal', 'Central de Atendimento ao Cliente TAT')
            
        })

        it('preenche os campos obrigatórios e envia o formulário', function() {
            cy.get('#firstName').type('Erik')
            cy.get('#lastName').type('Nasser')
            cy.get('#email').type('erik@gmail.com')
            cy.get('#phone').type('67992099238')
            cy.get('#open-text-area').type('Parmera')

            cy.get('button[type=submit]').click()

            cy.get('.success').should('be.visible')
        })

        it('teste de delay', function(){
            const longText = 'Teste, testinho, testão, testito, test, testop, testón, texte, testote, Teste, testinho, testão, testito, test, testop, testón, texte, testote'
            cy.get('#open-text-area').type(longText, {delay:0})
        })

        it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
            cy.get('#firstName').type('Erik')
            cy.get('#lastName').type('Nasser')
            cy.get('#email').type('erik@gmail,com')
            cy.get('#phone').type('67992099238')
            cy.get('#open-text-area').type('Parmera')

            cy.get('button[type=submit]').click()
            
            cy.get('.error').should('be.visible')
        })
        
        it('verifica se número de telefone foi preenchido incorretamente', function() {
            cy.get('#firstName').type('Erik')
            cy.get('#lastName').type('Nasser')
            cy.get('#email').type('erik@gmail,com')
            cy.get('#phone').type('abcdefgh')
            cy.get('#phone').should('be.empty')
            cy.get('#open-text-area').type('Parmera')

            cy.get('button[type=submit]').click()
            
            cy.get('.error').should('be.visible')
        })

        it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
            cy.get('#firstName').type('Erik')
            cy.get('#lastName').type('Nasser')
            cy.get('#email').type('erik@gmail,com')
            cy.get('#phone').should('be.empty')
            cy.get('#open-text-area').type('Parmera')

            cy.get('button[type=submit]').click()
            
            cy.get('.error').should('be.visible')
        })

        it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
            
            cy.get('#firstName').type('Erik').should('have.value', 'Erik')
            cy.get('#firstName').clear().should('be.empty')

            cy.get('#lastName').type('Nasser').should('have.value', 'Nasser')
                               .clear().should('have.value', '')

            cy.get('#email').type('erik@gmail.com').should('have.value', 'erik@gmail.com')
            cy.get('#email').clear().should('be.empty')

            cy.get('#phone').type('67992099238').should('have.value', '67992099238')
            cy.get('#phone').clear().should('be.empty')

            cy.get('#open-text-area').type('Parmera').should('have.value', 'Parmera')
            cy.get('#open-text-area').clear().should('have.value', '')

        })

        it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
            cy.get('button[type=submit]').click()
            
            cy.get('.error').should('be.visible')
        })

        it.only('envia o formuário com sucesso usando um comando customizado', function(){ 
            cy.fillMandatoryFieldsAndSubmit()

        })
    })