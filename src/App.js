import { Route, Switch } from "react-router";
import Home from "./components/Home/Home";
import View from "./components/View/View";

function App() {
  return (
    <Switch>
      <Route path="/:id" component={View} />
      <Route path="/" exact component={Home} />
    </Switch>
  );
}

export default App;
