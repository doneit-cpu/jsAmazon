export const cart=[];

export function addtocart(productId){  
  let matchingItem ;
      console.log(cart,'lol'); // why this showed me anyhting here , when it is empty ,
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
}