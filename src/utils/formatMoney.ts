export default function formatMoney(amount: any) {
  if (amount >= 1000000000) {
    return (amount / 1000000000).toFixed(2) + " tỷ";
  } else if (amount >= 1000000) {
    return (amount / 1000000).toFixed(0) + " triệu";
  } else {
    
  }
}
