import { async } from 'regenerator-runtime';
import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import RecipeView from './views/recipeView.js';
import SearchView from './views/searchView.js';
import resultView from './views/resultView.js';
import BookmarksView from './views/bookmarksView.js';
import PaginationView from './views/paginationView.js';
import AddRecipeView from './views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import bookmarksView from './views/bookmarksView.js';

// if(module.hot){
//   module.hot.accept();
// }

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

const controlRecipes = async function(){
  try{
    const id = window.location.hash.slice(1);
    if(!id) return;
    
    RecipeView.renderSpinner();
    
    //mark selected recipe
    resultView.update(model.getSearchResultsPage());

    BookmarksView.update(model.state.bookmarks);
    
    //1) Loading Recipe
    await model.loadRecipe(id); //Beacuse async function
    //2) Renderimg Recipe
    RecipeView.render(model.state.recipe);

  }catch(err){
      RecipeView.renderError();
  }
}

const controlSearchResult = async function(){
  try{
    resultView.renderSpinner();

    //1) get search query
    query = SearchView.getQuery();
    if(!query) return;

    //2) load search result

    await model.loadSearchResult(query);

    //3) render result
    // resultView.render(model.state.search.result);
    resultView.render(model.getSearchResultsPage());

    //4) render pages
    PaginationView.render(model.state.search);
  }catch(err){
      resultView.renderError();
  }
}

const controlPagination = function(goToPage){
  try{
    //1) render NEW result
    resultView.render(model.getSearchResultsPage(goToPage));

    //2) render NEW pages
    PaginationView.render(model.state.search);

  }catch(err){
    console.log(err);
  }
}

const controlServings = function(newServings){
  try{
    //Update the recipe servings (in state)
    model.updateServings(newServings);

    //Update the recipe view
    // RecipeView.render(model.state.recipe);
    RecipeView.update(model.state.recipe);

  }catch(err){
    console.log(err);
  }
}

const controlAddBookmark = function(){
  //add or delete recipe view
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  //update view
  RecipeView.update(model.state.recipe);

  //render bookMarks
  bookmarksView.render(model.state.bookmarks);
}

const controlBookmarks = function(){
  bookmarksView.render(model.state.bookmarks);
}

const controlAddRecipe = async function(newRecipe){
  try{
    //show loading spinner
    AddRecipeView.renderSpinner();

    //upload new recipe
    await model.uploadRecipe(newRecipe);

    //render recipe
    RecipeView.render(model.state.recipe);

    //success message
    AddRecipeView.renderMessage();

    //render bookmark view
    BookmarksView.render(model.state.bookmarks);

    //change id in url 
    window.history.pushState(null,'',`#${model.state.recipe.id}`);

    //colse form window
    setTimeout(function(){
      AddRecipeView.toggleWindow();
    },MODAL_CLOSE_SEC * 1000);
  }catch(err){
    console.error(err);
    AddRecipeView.renderError(err.message);
  }
  
}

const init = function(){
  bookmarksView.addHandlerRender(controlBookmarks);
  RecipeView.addHandlerRender(controlRecipes);
  RecipeView.addHandlerUpdateServings(controlServings);
  RecipeView.addHandlerAddBookmark(controlAddBookmark);
  SearchView.addHandlerSearch(controlSearchResult);
  PaginationView.addHandlerClick(controlPagination);
  AddRecipeView.addHandlerUpload(controlAddRecipe);
}
init();



