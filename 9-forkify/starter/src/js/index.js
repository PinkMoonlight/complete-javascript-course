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
import * as searchView from './views/searchView';
import {elements} from './views/base';

/** Global state of the app 
 * - Search object
 * - current recipe object
 * - shipping list object
 * -liked recipes 
 * */
const state = {};

const controlSearch = async () => {
    // 1. Get query from view
    const query = searchView.getInput();
    console.log(query);

    if (query) {
        // 2. New Search object and add to state
        state.search = new Search(query); 

        //3. prepare UI results
        searchView.clearInput();
        searchView.clearResults();

        //4. search for recipies 
         await state.search.getResults();

        //5. render results on UI
        searchView.renderResults(state.search.result);
    };
};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

