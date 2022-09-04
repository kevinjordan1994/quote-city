import { useHistory } from "react-router-dom";
import QuoteForm from "../components/quotes/QuoteForm";
import DUMMY_QUOTES from "../store/dummy-data";

export default function AddQuote() {
  const history = useHistory();

  const addQuote = (quote) => {
    DUMMY_QUOTES.push(quote);
    history.push("/home");
  };

  return (
    <>
      <h1>Add a quote</h1>
      <QuoteForm onAddQuote={addQuote} />
    </>
  );
}
