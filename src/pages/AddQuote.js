import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from "../hooks/use-http";
import { addQuote as addNewQuote } from "../lib/api";

export default function AddQuote() {
  const http = useHttp(addNewQuote, false);
  const history = useHistory();

  useEffect(() => {
    if (http.status === "completed") {
      history.push("/home");
    }
  }, [http.status, history]);

  const addQuote = (quote) => {
    http.sendRequest(quote);
  };

  return (
    <>
      <h1>Add a quote</h1>
      <QuoteForm isLoading={http.status === "pending"} onAddQuote={addQuote} />
    </>
  );
}
