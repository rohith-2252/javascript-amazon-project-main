const cart = {
    cartItems:undefined,
    loadFromStorage(){
        this.cartItems = JSON.parse(localStorage.getItem('cart-oop'));
      
        if(!this.cartItems){
          this.cartItems = [{
            productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity:2,
            deliveryOptionId:'1'
          },{
            productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity:2,
            deliveryOptionId:'1'
          }];
        }
      },

      saveToStorage() {
        localStorage.setItem('cart-oop', JSON.stringify(this.cartItems));
      },

      addToCart(productId,noOfItems) {
        let matchingItem;
      
        this.cartItems.forEach((cartItem) => {
          if(productId === cartItem.productId){
            matchingItem = cartItem;
          }
        });
        if(matchingItem){
          matchingItem.quantity+=Number(noOfItems);
        }
        else{
          this.cartItems.push({
            productId:productId,
            quantity:Number(noOfItems),
            deliveryOptionId: '1'
          });
        }
        this.saveToStorage();
        document.querySelector('.js-cart-quantity').innerHTML=totalQuantity();
      },

      removeFromCart (productId){
        const newCart = [];
    
        this.cartItems.forEach((cartItem) => {
          if(cartItem.productId !== productId){
            newCart.push(cartItem);
          }
        });
        this.cartItems = newCart;
        this.saveToStorage();
      },

      totalQuantity (){
        let totalQuantity=0;
        this.cartItems.forEach((cartItem) =>{
            totalQuantity+=cartItem.quantity;
        });
        return totalQuantity;
      },

      updateDeliveryOption(productId,deliveryOptionId) {
        let matchingItem;
      
        this.cartItems.forEach((cartItem) => {
          if(productId === cartItem.productId){
            matchingItem = cartItem;
          }
        });
        
        matchingItem.deliveryOptionId=deliveryOptionId;
    
        this.saveToStorage();
      }
      
};

cart.loadFromStorage();

console.log(cart);

