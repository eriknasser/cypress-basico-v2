Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Erik')
    cy.get('#lastName').type('Nasser')
    cy.get('#email').type('erik@gmail.com')
    cy.get('#phone').type('67992099238')
    cy.get('#open-text-area').type('Parmera')

    cy.get('button[type=submit]').click()

    cy.get('.success').should('be.visible')

})