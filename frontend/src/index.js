import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import RecipeDetails from './components/Recipes/RecipeDetails'
import RecipeList from './components/Recipes/RecipeList'
import NavigationBar from './components/Navbar/NavigationBar'
import Login from './components/Auth/Login'
import AddRecipe from './components/Recipes/AddRecipe'
import IngredientsList from './components/Ingredients/IngredientsList'
import AddIngredient from './components/Ingredients/AddIngredient'
import Register from './components/Auth/Register'
import Home from './components/Home'

const routing = (
  <Router>
    <NavigationBar/>
    <App />
    <Switch>
      <Route exact path="/" component={Home}>
      </Route>
      <Route exact path="/recipes" component={RecipeList}>
      </Route>
      <Route exact path="/add" component={AddRecipe}>
      </Route>
      <Route exact path="/addIngredient" component={AddIngredient}>
      </Route>
      <Route path="/recipe/:recipeID" component={RecipeDetails}>
      </Route>
      <Route path="/login" component={Login}>
      </Route>
      <Route path="/signup" component={Register}>
      </Route>
      <Route path="/ingredients" component={IngredientsList}>
      </Route>
    </Switch>
  </Router>
);



ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
