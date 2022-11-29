import { ITokenDetail } from "../models/token"

export const Token_List = [{
    name: 'LISK', // string,
    isin: 'LSK', // string,
    lastTradePrice: 87.00, //  number
    priceVariationPercentage: 0.1, // or -0.1 number
    closingPriceVariation: 0.6, // number
    closingPrice: 86.00,
},
{
    name: 'Bitcoin', // string,
    isin: 'BTC', // string,
    lastTradePrice: 287.00, //  number
    priceVariationPercentage: 0.4, // or -0.1 number
    closingPriceVariation: 0.7, // number
    closingPrice: 285.00,
}]


export const Token_Detail: ITokenDetail = {
    name: 'LISK', // string 
    id: 1, // number
    isin: 'LSK', // string 
    lastTradePrice: 87.00, // number
    priceVariationPercentage: 0.1, //, or -0.1  number
    closingPriceVariation: 0.6, // number
    closingPrice: 86.00, // number
    queue: [{
        askPrice: 85.00, // number
        askQuantity: 0.47367, // number
        bidNumber: 1003, // number
        bidPrice: 86.00, // number
        bidQuantity: 50.00001, // number
        symbolId: 1, // number 
        rowPlace: 1, // number
    },
    {
        askPrice: 85.00, // number
        askQuantity: 0.47367, // number
        bidNumber: 1003, // number
        bidPrice: 86.00, // number
        bidQuantity: 50.00001, // number
        symbolId: 1, // number 
        rowPlace: 1, // number
    }]

}