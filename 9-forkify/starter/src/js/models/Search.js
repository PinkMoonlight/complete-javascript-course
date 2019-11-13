import axios from 'axios'; //axios works like fetch but with support for old browsers   

export default class Search {
    constructor(query) {
        this.query = query;
    }
    async getResults() {
        //const key = 'key'; if using a key and would add in as a parameter below like query
        try {
            const res = await  axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);  //ajax call returns a promise
        this.result = res.data.recipes;
        //console.log(this.result);
        } catch (error) {
            alert(error);
        }
    }
}





