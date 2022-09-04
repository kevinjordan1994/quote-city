import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import DUMMY_QUOTES from "../store/dummy-data";

export default function Quote() {
  const { quoteId } = useParams();
  const quote = DUMMY_QUOTES.find((quote) => quote.id === quoteId);
  const match = useRouteMatch();

  return (
    <>
      {quote ? (
        <>
          <HighlightedQuote quote={quote} />
          <Route path={match.path} exact>
            <div className="centered">
              <Link className="btn--flat" to={`${match.url}/comments`}>
                View Comments
              </Link>
            </div>
          </Route>
          <Route path={`${match.url}/comments`}>
            <Comments id={quote.id} />
          </Route>
        </>
      ) : (
        <p>Sorry, quote not found.</p>
      )}
    </>
  );
}
