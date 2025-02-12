import View from './view.js';
import icons from 'url:../../img/icons.svg'; //parcel 2

class AddRecipeView extends View{
    _parentElement = document.querySelector('.upload');
    _overlay = document.querySelector('.overlay');
    _window = document.querySelector('.add-recipe-window');
    _btnOpen = document.querySelector('.nav__btn--add-recipe');
    _btnClose = document.querySelector('.btn--close-modal');
    _errorMessage = 'We Coudl Not Find This Recipe, Please Try One.';
    _messageS = 'Recipe was successfuly uploaded :)';

    constructor(){
        super();
        this._addHandlerShowWindow();
        this._addHandlerHideWindow();
    }

    toggleWindow(){
        this._overlay.classList.toggle('hidden');
        this._window.classList.toggle('hidden');
    }

    _addHandlerShowWindow(){
        this._btnOpen.addEventListener('click',this.toggleWindow.bind(this));
    }

    _addHandlerHideWindow(){
        this._btnClose.addEventListener('click',this.toggleWindow.bind(this));
        this._overlay.addEventListener('click',this.toggleWindow.bind(this));
    }

    addHandlerUpload(handler){
        this._parentElement.addEventListener('submit',function(e){
            e.preventDefault();
            const dataArr = [...new FormData(this)];
            const data = Object.fromEntries(dataArr);
            handler(data);
        });
    }

}

export default new AddRecipeView();//default because single value or object