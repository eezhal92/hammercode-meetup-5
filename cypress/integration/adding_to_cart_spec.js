describe('Adding product to cart', () => {
  it('should able to add product into cart', () => {
    cy.visit('http://localhost:8080');
    cy.get('.cart-link').should('contain', 'Cart $0');

    // Add product 1
    cy.get('[href="/product/product-1"]').click();
    cy.get('.js-add-btn').click();
    cy.get('.cart-link').should('contain', 'Cart $20');

    cy.get('.home-link').click();

    // Add product 3
    cy.get('[href="/product/product-3"]').click();
    cy.get('.js-add-btn').click();
    cy.get('.cart-link').should('contain', 'Cart $70');
  });
});
