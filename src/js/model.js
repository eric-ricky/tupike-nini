import { stat } from 'fs';
import { async } from 'regenerator-runtime';

export const state = {
  meal: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: 9,
  },
};

export const loadMeal = async function (id) {
  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await res.json();
    const meal = data.meals[0];
    state.meal = {
      id: meal.idMeal,
      title: meal.strMeal,
      imgURL: meal.strMealThumb,
      vid: meal.strYoutube,
    };
    console.log(state.meal, meal);
  } catch (error) {
    console.log(error);
  }
};

export const loadSearchResults = async function (ingridient) {
  try {
    state.search.query = ingridient;
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingridient}`
    );
    const searchResults = await res.json();

    state.search.results = searchResults.meals.map(meal => {
      return {
        id: meal.idMeal,
        title: meal.strMeal,
        imgURL: meal.strMealThumb,
      };
    });
    state.search.page = 1;
  } catch (error) {
    console.log(`🍕🍕 ${error}`);
    throw error;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};
