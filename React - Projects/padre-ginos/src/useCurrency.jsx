const intl = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
})
// export default  function useCarrency (price) {
//     return intl.format(price);
// }
export const priceConverter = (price) => intl.format(price);
export default  function useCarrency (price) {
    return priceConverter(price);
}


