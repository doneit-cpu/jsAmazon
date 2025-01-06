export function formatCurrency(priceCents,not ){
  const money= priceCents.toString();
  // console.log(money)
  if (money){
    return  (Math.round(priceCents) / 100).toFixed(2);
    }
    
}
export default formatCurrency;  // one default for only one 
