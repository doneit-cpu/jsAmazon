

export let  cart=JSON.parse(localStorage.getItem('cart')) // parse convert string to disired data type 

if(!cart){
[{
  productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2,
},{
  productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity: 1,
}];
}
function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart))
}

export function addtocart(productId){  
  let matchingItem ;
      // console.log(cart,'lol'); // why this showed me anyhting here , when it is empty ,
      cart.forEach((item) => {  
        // console.log(item.productId);
        if (productId === item.productId) {
          matchingItem = item;
        }
      })
      console.log(matchingItem);  // why undifined 
      if (matchingItem) {
        matchingItem.quantity += 1;
      } else {
        cart.push({
          productId: productId,
          quantity: 1,
        });
      }

      saveToStorage();
}



export function removeFromCart(productId){
  const newCart =[];


  cart.forEach((cartItem)=>{
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    };
  });

  cart=newCart;

  saveToStorage();
};


