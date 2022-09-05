import { useEffect } from "react";
import QuoteList from "../components/quotes/QuoteList";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";

export default function Home() {
  const {
    sendRequest: fetchQuotes,
    data: loadedQuotes,
    status,
    error,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    fetchQuotes();
  }, [fetchQuotes]);

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

  if (status === "completed" && loadedQuotes.length === 0) {
    return <NoQuotesFound />;
  }

  return (
    <>
      <QuoteList quotes={loadedQuotes} />
    </>
  );
}
