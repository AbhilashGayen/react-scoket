import { BookmarkRow } from "./bookmarkRow";
import { IToken } from "../models/token";

import '../styles/bookmark.css';

interface Props {
    list: IToken[];
}

export const BookmarkList = ({ list }: Props) => {

    return (
        <>
            {list.length ? (
                <ul className="bookmark-list">
                    <li key="bookmar_header" className="bookmark-row-header">
                        <div>Name</div>
                        <div>Last Trade Price</div>
                        <div>Closing Price</div>
                        <div>Change %</div>
                    </li>
                    {list.map((item, i) =>
                        <BookmarkRow key={i} index={i} item={item} />
                    )}
                </ul>
            ) : null}

        </>
    );
}