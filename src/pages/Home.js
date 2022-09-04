import QuoteList from "../components/quotes/QuoteList";
import DUMMY_QUOTES from "../store/dummy-data";

export default function Home() {
  return (
    <>
      <h1>Welcome!</h1>
      <QuoteList quotes={DUMMY_QUOTES} />
    </>
  );
}
