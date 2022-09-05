import { useEffect } from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";

export default function Quote() {
  const { quoteId } = useParams();
  const {
    sendRequest: fetchSingleQuote,
    status,
    error,
    data: loadedQuote,
  } = useHttp(getSingleQuote, true);
  const match = useRouteMatch();

  useEffect(() => {
    fetchSingleQuote(quoteId);
  }, [fetchSingleQuote, quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (!loadedQuote.text) {
    return <p className="centered focused">Quote not found</p>;
  }

  return (
    <>
      <HighlightedQuote quote={loadedQuote} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            View Comments
          </Link>
        </div>
      </Route>
      <Route path={`/quote/:quoteId/comments`}>
        <Comments id={loadedQuote.id} />
      </Route>
    </>
  );
}
