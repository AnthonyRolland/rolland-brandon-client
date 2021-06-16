import React from "react";
import { Switch, Route } from "react-router-dom";
import "./style/App.css";
import HomePage from "./component/common/Home";
import UserPage from "./component/user/UserPage";
import ProfilPage from "./component/common/ProfilPage";
import MealList from "./component/meal/MealList";
import MealDetail from "./component/meal/MealDetail";
import RestaurantList from "./component/restaurant/RestaurantList";
import RestaurantDetail from "./component/restaurant/RestaurantDetail";
import Header from "./component/common/Header";
import Navbar from "./component/common/Navbar";
import RestaurantCreate from "./component/restaurant/RestaurantCreate";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <Switch className="flex-1">
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/me">
            <ProfilPage />
          </Route>
          <Route path="/user/:id">
            <UserPage />
          </Route>
          <Route path="/meals">
            <MealList />
          </Route>
          <Route path="/meal/:id">
            <MealDetail />
          </Route>
          <Route path="/restaurants/">
            <RestaurantList />
          </Route>
          <Route path="/restaurant/:id">
            <RestaurantDetail />
          </Route>
          <Route path="/new-restaurant">
            <RestaurantCreate />
          </Route>
        </Switch>
      </div>
      <Navbar />
    </div>
  );
}

export default App;
