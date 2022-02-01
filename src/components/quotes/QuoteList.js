import { Fragment } from "react";
import { useHistory, useLocation } from "react-router-dom";

import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

const QuoteSort = (Quote, ascending) => {
  return Quote.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};
const QuoteList = (props) => {
  const history = useHistory();
  const Location = useLocation();

  const queryParams = new URLSearchParams(Location.search);

  const isSortAscending = queryParams.get("sort") === "asc";

  const SortedQuotes = QuoteSort(props.quotes, isSortAscending);

  const sortingChangeHahdler = () => {
    history.push({
      pathname: Location.pathname,
      search: `?sort=${(isSortAscending ? "desc" : "asc")}`,
    });
  };

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={sortingChangeHahdler}>
          Sort {isSortAscending ? "Descending" : "Ascending"}
        </button>
      </div>
      <ul className={classes.list}>
        {SortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
