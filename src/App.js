import React from "react";
import { Switch, Route } from "react-router-dom";
import "./style/App.css";
import HomePage from "./component/common/Home";
import User from './component/user/User';
import AddUser from './component/user/AddUser';
import EditUser from './component/user/EditUser';
import MealList from "./component/meal/MealList";
import MealDetail from "./component/meal/MealDetail";
import Restaurant from "./component/restaurant/Restaurant";
import DetailRestaurant from "./component/restaurant/DetailRestaurant";
import EditRestaurant from "./component/restaurant/EditRestaurant";
import Header from "./component/common/Header";
import Navbar from "./component/common/Navbar";
import AddRestaurant from "./component/restaurant/AddRestaurant";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <Switch className="flex-1">
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/meals">
            <MealList />
          </Route>
          <Route path="/meal/:id">
            <MealDetail />
          </Route>
          <Route path="/restaurants/">
            <Restaurant />
          </Route>
          <Route path="/restaurant/:id">
            <DetailRestaurant />
          </Route>
          <Route path="/restaurant/edit/:_id">
            <EditRestaurant />
          </Route>
          <Route path="/restaurant/add">
            <AddRestaurant />
          </Route>
          <Route exact path='/user'>
            <User />
          </Route>
          <Route exact path='/user/add'>
            <AddUser />
          </Route>
          <Route exact path='/user/edit/:_id'>
            <EditUser />
            </Route>
        </Switch>
      </div>
      <Navbar />
    </div>
  );
}

export default App;
