describe('Removing product from cart', () => {
  it('should able to remove product from cart', () => {
    cy.visit('http://localhost:8080');
    cy.get('.cart-link').should('contain', 'Cart $0');

    // Add product 1
    cy.get('[href="/product/product-1"]').click();
    cy.get('.js-add-btn').click();
    cy.get('.cart-link').should('contain', 'Cart $20');

    // Remove product 1
    cy.get('.cart-link').click();
    cy.get('.js-remove-btn[data-product-id="product-1"]').click();
    cy.get('.cart-link').should('contain', 'Cart $0');
  });
});
