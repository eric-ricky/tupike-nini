import * as model from './model.js';
import resultsView from './View/resultsView.js';
import recipeView from './View/recipeView.js';
import searchView from './View/searchView.js';
import paginationView from './View/paginationView.js';

const controlMeals = async function (id) {
  try {
    // 2. load meal recipe
    await model.loadMeal(id);

    // 3. Render popup with recipe
    recipeView.render(model.state.meal);
  } catch (error) {
    console.log(error);
  }
};

const controlSearchResults = async function () {
  try {
    // 1. Render Spinner
    resultsView.renderSpinner();

    // 2. Get Search term
    const ingridient = searchView.getQuery();
    if (!ingridient) return;

    console.log(ingridient);

    // 3. Load serch results
    await model.loadSearchResults(ingridient);

    // 2. Render search results
    if (model.state.search.results.length === 0) return;

    console.log(model.getSearchResultsPage());
    resultsView.render(model.getSearchResultsPage());

    // 3. initial pagination
    paginationView.render(model.state.search);

    // 4. add click handler to each meal
    resultsView.addHandlerClick(controlMeals);
  } catch (error) {
    console.log(`🍕🍕🍕🍕 ${error}`);

    resultsView.renderError();
  }
};

const controlPagination = function (gotoPage) {
  // 1. render nextpage results
  resultsView.render(model.getSearchResultsPage(gotoPage));

  // 2. render new pagination btn
  paginationView.render(model.state.search);

  // 3. add new click handler to each meal
  resultsView.addHandlerClick(controlMeals);
};

const init = function () {
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
