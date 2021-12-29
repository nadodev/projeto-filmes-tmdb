import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./components/header/";
import Home from "./pages/homes";
import Filme from "./pages/filme";
import Favoritos from "./pages/favoritos";
import Error from "./pages/erro";
import Cart from "./pages/cart";
export default function routes({ cart }) {
  return (
    <BrowserRouter>
      <Header cart={cart} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/filme/:id" component={Filme} />
        <Route exact path="/favoritos" component={Favoritos} />
        <Route exact path="/cart" component={Cart} />
        <Route path="*" component={Error} />
      </Switch>
    </BrowserRouter>
  );
}
