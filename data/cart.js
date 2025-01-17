export let cart=JSON.parse(localStorage.getItem('cart')) // parse convert string to disired data type 

if(!cart){
  cart=[{
  productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2, //shock
  deliveryOptionsId: '1'
},{
  productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity: 1,  //basketball
  deliveryOptionsId: '2'
}];
}
function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart))
}

export let cartnum={
  num:0,
} || localStorage.setItem('cartnum',JSON.stringify(cartnum));
// console.log(cartnum)

export function addtocart(productId){  
  let matchingItem ;
      // console.log(cart,'lol'); // why this showed me anyhting here , when it is empty ,
      cart.forEach((item) => {  
        // console.log(item.productId);
        if (productId === item.productId) {
          matchingItem = item;
        }
      })
      // console.log(matchingItem);  // why undifined 
      if (matchingItem) {
        matchingItem.quantity += 1; // add 
      } else {
        cart.push({
          productId: productId,
          quantity: 1,
          deliveryOptionsId:'1'
        });
      }

      saveToStorage();
}



export function removeFromCart(productId){
  const newCart =[];

  let deleteitem=0;

  cart.forEach((cartItem)=>{
    if(cartItem.productId === productId){
      deleteitem+=cartItem.quantity;
    }
    else {
      newCart.push(cartItem);
    }
  });
   
  console.log(deleteitem);
  
  // console.log(cartnum);
  // console.log(typeof());
    // console.log( + typeof(deleteitem))

    console.log(JSON.parse(localStorage.getItem('cartnum')) + "get");
    console.log(deleteitem+"di")
    

 
  cartnum.num=JSON.parse(localStorage.getItem('cartnum'))-deleteitem;
  console.log(cartnum.num+'cn')

  localStorage.setItem('cartnum',JSON.stringify(cartnum.num));

  cart=newCart;

  saveToStorage();
};


export function updatedeliveryOption(productId,deliveryOptionsId){

  let matchingItem ;
      
      cart.forEach((item) => {  
        if (productId === item.productId) {
          matchingItem = item;
        }
      })

      matchingItem.deliveryOptionsId= deliveryOptionsId;
      // console.log(deliveryOptionsId);
      saveToStorage();

}

