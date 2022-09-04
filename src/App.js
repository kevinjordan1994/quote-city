import { Route, Redirect, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Quote from "./pages/Quote";
import AddQuote from "./pages/AddQuote";
import NavBar from "./components/navigation/NavBar";
import style from "./components/layout/Layout.module.css";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <NavBar />
      <main className={style.main}>
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/quote/:quoteId">
            <Quote />
          </Route>
          <Route path="/add-quote">
            <AddQuote />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
