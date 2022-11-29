import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SocketContext } from "../context/socket";
import { IToken } from "../models/token";
import { relativePercentage } from "../utils/mathTool";

import '../styles/bookmark.css';

interface Props {
    item: IToken;
    index: number;
}

export const BookmarkRow = ({ item, index }: Props) => {
    const socket = useContext(SocketContext);
    const [price, setPrice] = useState<number>(0);

    useEffect(() => {
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
            <li key={index} className="bookmark-row">
                <div>
                    <Link to={`../tokenDetail/${item.isin}`} className="bookmark-row_name">
                        {item.name} <span className="bookmark-row_symbol">( {item.isin} )</span>
                    </Link>
                </div>
                <div>{price}</div>
                <div>{item.closingPrice}</div>
                <div>{relativePercentage(price, item.closingPrice)}</div>
            </li>
        </>
    );
}