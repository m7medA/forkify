import View from "./view.js";

class SearchView{
    _parentElement = document.querySelector('.search');

    getQuery(){
        return this._parentElement.querySelector('.search__field').value;
    }

    _clearInput(){
        this._parentElement.querySelector('.search__field').value = '';
    }

    addHandlerSearch(handler){
        this._parentElement.addEventListener('submit',function(e){// use submit not button because this is form and when clilc on button or click enter will submit
            e.preventDefault();
            handler();
            this._clearInput();
        }.bind(this));
    }
}

export default new SearchView();