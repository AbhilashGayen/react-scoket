import { useState, useEffect } from "react";
import { BookmarkList } from "../components/bookmarkList";
import { TypeAhead } from "../components/typeAhead";
import { IToken } from "../models/token";

export const BookmarkPage = () => {
    const ls_key = "bookmarkList";
    const value = localStorage.getItem(ls_key);

    const [bookmarkList, setBookmarkList] = useState<IToken[]>([]);
    const [bookmarkedIds, setBookmarkedIds] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        if (!value) return;

        const parsedValue: IToken[] = JSON.parse(value);
        const ids: { [key: string]: boolean } = {};
        parsedValue.forEach(value => {
            ids[value.isin] = true;
        });
        setBookmarkedIds(ids);
        setBookmarkList(parsedValue);
    }, [value]);

    const addBookmark = (token: IToken) => {
        const list = [...bookmarkList, token];
        setBookmarkedIds({ ...bookmarkedIds, [token.isin]: true });
        setBookmarkList(list);
        localStorage.setItem(ls_key, JSON.stringify(list));
    }

    const removeBookmark = (token: IToken) => {
        const list = bookmarkList.filter(b => b.isin !== token.isin);
        delete bookmarkedIds[token.isin];
        setBookmarkList(list);
        localStorage.setItem(ls_key, JSON.stringify(list));
    }

    return (
        <div className="container">
            <TypeAhead addBookmark={addBookmark} removBookmark={removeBookmark} bookmarkedIds={bookmarkedIds} />
            <BookmarkList list={bookmarkList} />
        </div>
    );
}