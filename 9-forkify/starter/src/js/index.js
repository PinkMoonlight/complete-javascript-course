// Global app controller
/*
import string from './models/Search'; //for default 

import {add, multiply, ID} from './views/searchView';
//OR
import {add as a, multiply as m, ID} from './views/searchView'; //renames variables
console.log(`Using imported functions ${a(ID, 2)} and ${m(3, 5)} and ${string}`);
// OR
import * as searchView from './views/searchView'; //imports everything
console.log(`Using imported functions ${searchView.add(searchView.ID, 2)} and ${searchView.multiply(3, 5)} and ${string}`);
*/

import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import {elements, renderLoader, clearLoader} from './views/base';

/** Global state of the app 
 * - Search object
 * - current recipe object
 * - shopping list object
 * - liked recipes 
 * */
const state = {};

/**
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
    // 1. Get query from view
    const query = searchView.getInput();
    //console.log(query);

    if (query) {
        // 2. New Search object and add to state
        state.search = new Search(query); 
        
        //3. prepare UI results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try { 
            //4. search for recipies 
            await state.search.getResults();

            //5. render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);           
        } catch (error) {
            alert('Something went wront with the search...');
            clearLoader();
        }

    };
};


elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

/*
//TESTING
window.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});
*/

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10); //base 10 means 1 - 10 (2 would be binary 0 or 1)
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});

/**
 * RECIPE CONTROLLER
 * 
 /* 
 USED FOR INITIAL TESTING
 const r = new Recipe(47746);
r.getRecipe();
console.log(r);
*/

const controlRecipe = async () => {
    //Get ID from url
    const id = window.location.hash.replace('#', '');
    console.log(id);

    if (id) {
        // Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        //Hightlight Selected serach item
        if (state.search) searchView.highlightSelected(id);

        // Create new recipe object
        state.recipe = new Recipe(id);

        //TESTING
        //window.r = state.recipe;

        try {
               // Get recipe data and parse ingredients
        await state.recipe.getRecipe();
        console.log(state.recipe.ingredients);
        state.recipe.parseIngredients();
        // Calculate servings and time
        state.recipe.calcTime();
        state.recipe.calcServings();
        // Render recipe
        clearLoader();
        recipeView.renderRecipe(state.recipe);
        console.log(state.recipe);
        } catch (error) {
            alert('Error processing recipe!');
            console.log(error);
        }
      

    }
};



//way to handle multiple events for same function
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) { //  * means any child elements of btn-decrease
        // decrease button is clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
        }
        
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        // increase button is clicked
    }   state.recipe.updateServings('inc');
    console.log(state.recipe);
    });
