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

const search = new Search('pizza');
console.log(search);
search.getResults();