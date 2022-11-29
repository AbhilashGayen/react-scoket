import { useEffect, useState } from "react";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { Token_List } from "../data/dataProvider";
import { ENV } from "../environment/evnironment";
import { IToken } from "../models/token";

import '../styles/styles.css';

interface Props {
  addBookmark: (token: IToken) => void;
  removBookmark: (token: IToken) => void;
  bookmarkedIds: { [key: string]: boolean }
}

export const TypeAhead = ({ addBookmark, removBookmark, bookmarkedIds }: Props) => {
  const [inputText, setInputText] = useState<string>("");
  const [suggestions, setSuggestions] = useState<IToken[]>([]);

  useEffect(() => {
    if (!inputText) {
      setSuggestions([]);
      return;
    };

    if (ENV.isProd) {
      const getData = setTimeout(() => {
        fetch(`${ENV.baseAPI}/instrument/tokens?name=${inputText}`)
          .then(response => response.json())
          .then((data: IToken[]) => {
            setSuggestions(data)
          });
      }, 1000);
      return () => { clearTimeout(getData); };
    }

    if (!ENV.isProd) {
      const data = Token_List.filter(x => x.isin.toLowerCase().includes(inputText.toLowerCase()));
      setSuggestions(data);
    }

  }, [inputText])

  const renderSuggestions = () => {
    return (
      <>
        {suggestions.length
          ? (
            <ul className="tt-dropdown-menu">
              {suggestions.map((item, i) =>
                <li key={i} className="tt-suggestion">
                  <div>{item.isin}</div>
                  <div>{item.name}</div>
                  <div>{item.priceVariationPercentage}</div>
                  <div>{item.lastTradePrice}</div>
                  <div className="pull-right">
                    {
                      bookmarkedIds[item.isin]
                        ? <BsFillBookmarkFill className="icon-button" onClick={() => removBookmark(item)} />
                        : <BsBookmark className="icon-button" onClick={() => addBookmark(item)} />
                    }
                  </div>
                </li>
              )}
            </ul>)
          : null
        }
      </>
    );
  }

  return (
    <>
      <input className="typeahead" onChange={e => setInputText(e.target.value)} placeholder="Search symbol" type="text" />
      {renderSuggestions()}
    </>
  );
}