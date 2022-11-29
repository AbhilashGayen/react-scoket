import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../context/socket";
import { ITokenDetail } from "../models/token";
import { relativePercentage } from "../utils/mathTool";

import { ENV } from "../environment/evnironment";
import "../styles/tokenDetails.css";
import { Token_Detail } from "../data/dataProvider";

export const TokenDetail = () => {
    const socket = useContext(SocketContext);
    const [price, setPrice] = useState<number>(0);
    const [item, setItem] = useState<ITokenDetail>();

    const { isin } = useParams();

    useEffect(() => {
        if (ENV.isProd) {
            const getData = setTimeout(() => {
                fetch(`${ENV.baseAPI}/instrument/tokens?isin=${isin}`)
                    .then(response => response.json())
                    .then((data: ITokenDetail) => {
                        setItem(data)
                    });
            }, 1000);
            return () => { clearTimeout(getData); };
        }

        if (!ENV.isProd) {
            Token_Detail.isin === isin ? setItem(Token_Detail) : setItem(undefined);
        }
    }, [isin])

    useEffect(() => {
        if (!item) return;

        const channel = `${item.name}-${item.isin}`
        let data: number[] = [];

        const flush = () => {
            for (const value of data) {
                setPrice(value);
            }
            data = [];
        };
        let timer = setInterval(flush, 500);

        socket.subscribe(channel, (price: number) => {
            data.push(price);
        })

        return () => {
            clearInterval(timer);
            socket.unsubscribe(channel);
            flush();
        };
    }, [price, socket, item]);

    return (
        <>
            {item
                ? (
                    <div className="token-card" key={isin}>
                        <div className="token-card-section full-column">
                            <h4>Name</h4>
                            <span className="token-card-section_name">
                                {item.name}
                            </span>
                            <span className="token-card-section_symbol">
                                {item.isin}
                            </span>
                        </div>
                        <div className="token-card-section half-column_A">
                            <h4>Last Trade Price</h4>
                            <span className="token-card-section_price">
                                {price}
                            </span>
                            <span className="token-card-section_percentage">
                                ({relativePercentage(price, item.closingPrice)}%)
                            </span>
                        </div>
                        <div className="token-card-section half-column_B">
                            <h4>Closing Price</h4>
                            <span className="token-card-section_price">
                                {item.closingPrice}
                            </span>
                            <span className="token-card-section_percentage">
                                ({item.closingPriceVariation}%)
                            </span>
                        </div>
                        <div className="token-card-section full-column">
                            <h4>Top Bids</h4>
                            <div className="bid-row" key="bid_row_header">
                                <span className="bid-quantity">
                                    <label>Ask Quantity</label>
                                </span>
                                <span className="bid-price">
                                    <label>Ask Price</label>
                                </span>
                                <span className="bid-quantity">
                                    <label>Bid Quantity</label>
                                </span>
                                <span className="bid-price">
                                    <label>Bid Price</label>
                                </span>
                            </div>
                            {
                                item.queue.map((value, i) =>
                                    <div className="bid-row" key={i}>
                                        <div className="bid-quantity">
                                            {value.askQuantity}
                                        </div>
                                        <div className="bid-price">
                                            {value.askPrice}
                                        </div>
                                        <div className="bid-quantity">
                                            {value.bidQuantity}
                                        </div>
                                        <div className="bid-price">
                                            {value.bidPrice}
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                ) : <span>Token not found. {!ENV.isProd ? "Works only for isin LSK in dev" : ""}</span>}
        </>

    );
}