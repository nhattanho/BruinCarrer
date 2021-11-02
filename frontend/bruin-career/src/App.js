/* Adding library */
import React from "react";
import { Route } from "react-router-dom";

/* Adding pages */
import Landing from "./pages/landing/landingPage";
import Home from "./pages/home/home";
import Register from "./pages/register/registerPage";
import Portfolio from "./pages/portfolio/portfolio";
import About from "./pages/about/about";
import Contact from "./components/contact/contact.component";
import AddProject from "./pages/addProject/addProject";
import Engineering from "./pages/categories/engineering/engineering";
import Business from "./pages/categories/business/business";
import Art from "./pages/categories/art/art";
import Science from "./pages/categories/science/science";
import BruinMap from "./pages/map/map";

/* Import Redux */
import store from "./redux/redux";
import { Provider } from "react-redux";

/* Adding components */
import Header from "../src/components/header/header.component";
import Bottom from "../src/components/bottom/bottom.component";

/* Adding css */
import "./App.css";

/* Main here */
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/about" component={About} />
        <Route exact path="/portfolio" component={Portfolio} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/add-project" component={AddProject} />
        <Route exact path="/engineering" component={Engineering} />
        <Route exact path="/business" component={Business} />
        <Route exact path="/art" component={Art} />
        <Route exact path="/science" component={Science} />
        <Route exact path="/map" component={BruinMap} />
        <Bottom />
      </div>
    </Provider>
  );
}

export default App;
