import { Container } from "@material-ui/core";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import PostDetails from "./components/PostDetails/PostDetails";
import { useState } from "react";

function App() {

  const [user] = useState<any>(
    JSON.parse(localStorage.getItem("profile") || "{}")
  );

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/posts" />} />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />\
          <Route path="/posts/:id" component={PostDetails} />
          <Route
            path="/auth"
            exact
            component={() =>
              !user.result ? <Auth /> : <Redirect to="/posts" />
            }
          />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
