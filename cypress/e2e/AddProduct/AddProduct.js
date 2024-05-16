import {Given,Then,And} from  'cypress-cucumber-preprocessor/steps';
Cypress.on("uncaught:exception", (e, runnable) => {
    console.log("error", e);
    console.log("runnable", runnable);
        return false;
});


Given('Login to Saucelab with {string} and {string}',(username,password)=>{
    cy.visit('/',{failOnStatusCode: false});
    cy.on("fail", (err, runnable) => {
        console.log(err.message);
        return false;
    });
    cy.get('#user-name').type(username);
    cy.get('#password').type(password);
    cy.get('#login-button').click();

    Cypress.on("uncaught:exception", (e, runnable) => {
        return false;
    });
});

Then('Verify Add and Remove Products to Cart',()=>{
    cy.get('.inventory_item button').eq(0).should('have.text','Add to cart');
    cy.get('.inventory_item button').eq(0).click();
    cy.get('.inventory_item button').eq(0).should('have.text','Remove');

    let totalItems = 1;
    cy.get('span.shopping_cart_badge').then(($totalCartItems)=>{
        expect($totalCartItems).to.have.text(totalItems.toString());
    });
    cy.get('span.shopping_cart_badge').click();
    cy.get('.cart_item_label button').contains('Remove').click();

    cy.get('#continue-shopping').click();
    cy.get('.inventory_item button').eq(0).should('have.text','Add to cart');
})


Then('Add  Products to Cart and checkout',()=>{
    const count = 3;
    cy.fixture('TestData.json').then((data)=>{
        let i = 0;
        for (let productInfo in data) {
            cy.get('.inventory_item .inventory_item_label a div').eq(i).then(($itemTitle) => {
                expect(data[productInfo].productName).to.be.eq($itemTitle.text());
            })

            cy.get('.inventory_item .pricebar [data-test="inventory-item-price"]').eq(i).then(($itemPrice) => {
                expect(data[productInfo].price).to.be.eq($itemPrice.text());
            })

            cy.get('.inventory_item button').eq(i).should('have.text', 'Add to cart');
            cy.get('.inventory_item button').eq(i).click();
            cy.get('.inventory_item button').eq(i).should('have.text', 'Remove');
            i++;
        }
    })


    cy.get('span.shopping_cart_badge').then(($totalCartItems)=>{
        expect($totalCartItems).to.have.text(count.toString());
    });

    cy.get('span.shopping_cart_badge').click();

    cy.fixture('TestData.json').then((data)=>{
        let j = 0;
        for (let productInfo in data) {
            cy.get('.cart_item_label .inventory_item_name').eq(j).then(($cartItem)=>{
                expect(data[productInfo].productName).to.be.eq($cartItem.text());
            })

            cy.get('.cart_item_label [data-test="inventory-item-price"]').eq(j).then(($cartPrice)=>{
                expect(data[productInfo].price).to.be.eq($cartPrice.text());
            })
            j++;
        }
    });

    cy.contains('button','Checkout').click();
});

And('Checkout for {string} and {string} and {string}',(firstName,lastName,zipCode)=>{
    cy.get('#first-name').type(firstName);
    cy.get('#last-name').type(lastName);
    cy.get('#postal-code').type(zipCode);
    cy.get('#continue').click();

    cy.fixture('TestData.json').then((data)=>{
        let i = 0;
        for (let productInfo in data) {
            cy.get('.cart_item_label .inventory_item_name').eq(i).then(($cartItem)=>{
              expect(data[productInfo].productName).to.be.eq($cartItem.text());
            })

            cy.get('.cart_item_label [data-test="inventory-item-price"]').eq(i).then(($cartPrice)=>{
             expect(data[productInfo].price).to.be.eq($cartPrice.text());
            })
            i++;
        }
    })

    cy.get('#finish').click();
    cy.contains('h2','Thank you for your order!').should('be.visible');
    cy.contains('button','Back Home').click();
    cy.wait(1000);
});

And('Logout SauceLab',()=>{
    cy.contains('button','Open Menu').click();
    cy.contains('a','Logout').click();
})




