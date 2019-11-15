export default class Likes {
    constructor() {
        this.likes = []
    }

    addLike(id, title, author, img) {
        const like = { id, title, author, img };
        this.likes.push(like);

        // Persist data in localStorage
        this.persistData();

        return like;
    }

    removeLike(id) {
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1); //mutates original array and removes the item
        /*this.likes.forEach((el, index) => {
            if (el.id === id) {
                this.likes.splice(index, 1);
            }
        }); */

        // Persist data in localStorage
        this.persistData();
    }

    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1; // findIndex will return -1 if no el passes the test
    }

    getNumLikes() {
        return this.likes.length;
    }

    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('likes'));

        // Restoring lieks from the local storage
        if (storage) this.likes = storage;

    }
};