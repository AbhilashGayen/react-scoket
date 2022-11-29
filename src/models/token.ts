export interface IToken {
    name: string,
    isin: string,
    lastTradePrice: number,
    priceVariationPercentage: number,
    closingPriceVariation: number,
    closingPrice: number,
    price?: number
}

export interface ITokenDetail extends IToken {
    id: number;
    queue: {
        askPrice: number;
        askQuantity: number;
        bidNumber: number;
        bidPrice: number;
        bidQuantity: number;
        symbolId: number;
        rowPlace: number;
    }[]
}