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
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';

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


 // RECIPE CONTROLLER

const controlRecipe = async () => {
    //Get ID from url
    const id = window.location.hash.replace('#', '');
   

    if (id) {
        // Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        //Hightlight Selected serach item
        if (state.search) searchView.highlightSelected(id);

        // Create new recipe object
        state.recipe = new Recipe(id);


        try {
               // Get recipe data and parse ingredients
        await state.recipe.getRecipe();
        //console.log(state.recipe.ingredients);
        state.recipe.parseIngredients();
        // Calculate servings and time
        state.recipe.calcTime();
        state.recipe.calcServings();
        // Render recipe
        clearLoader();
        recipeView.renderRecipe(
            state.recipe,
            state.likes.isLiked(id));
        } catch (error) {
            alert('Error processing recipe!');
            console.log(error);
        }
      

    }
};



//way to handle multiple events for same function
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));


// SHOPPING LIST CONTROLLER
const controlList = () => {
    // create a new list if there is none yet
    if (!state.list) state.list = new List();

    // add each ingredient to the list and UI
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItems(item);
    });
    // 
};


// Handle delete and update list item events
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        // Update State 
        state.list.deleteItem(id);
        // Update UI
        listView.deleteItem(id);

        // Handle the count update
    } else if (e.target.matches('.shopping__count--value')) {
        if (e.target.value > 0) {
            let newCount = parseFloat(e.target.value, 10); 
            state.list.updateCount(id, newCount); 
        };
    }   
    
    
})

// LIKES LIST CONTROLLER 
const controlLike = () => {
    if (!state.likes) state.likes = new Likes;
    const currentID = state.recipe.id;
    const recipe = state.recipe;

    // User has NOT yet liked current recipe
    if (!state.likes.isLiked(currentID)) {
        // Add like to state
        const newLike = state.likes.addLike(
            currentID, 
            recipe.title, 
            recipe.author, 
            recipe.img)
        //Toggle the like button (update UI)
        likesView.toggleLike(true);
        //Add like to UI list
        likesView.renderLikesMenu(newLike);
        

    // User HAS liked current recipe
    } else {
        // Remove like from the state
        state.likes.removeLike(currentID);
        //Toggle the like button (update UI)
        likesView.toggleLike(false);
        //Remove like from UI list
        likesView.deleteLike(currentID);
    }
    likesView.toggleLikeMenu(state.likes.getNumLikes());
};


// Restore liked recipes on page load 
window.addEventListener('load', () => {
    state.likes = new Likes();

    // Restore Likes
    state.likes.readStorage();

    //Toggle like menu button
    likesView.toggleLikeMenu(state.likes.getNumLikes());

    // Render the existing likes
    state.likes.likes.forEach(like => likesView.renderLikesMenu(like));

});


// Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) { //  * means any child elements of btn-decrease
        // decrease button is clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingIngredients(state.recipe);
        }
        
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        // increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingIngredients(state.recipe);  
        //console.log(state.recipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        //Add ingredients to shopping List
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        controlLike();
    }

});

