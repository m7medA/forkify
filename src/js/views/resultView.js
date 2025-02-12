import View from './view.js';
import PreviewView from './previewView.js';
import icons from 'url:../../img/icons.svg'; //parcel 2

class ResultsView extends View{
    _parentElement = document.querySelector('.results');
    _errorMessage = 'We Coudl Not Find This Recipe, Please Try One.';
    _messageS = '';

    _generateMarkup(){
            return this._data.map(result => PreviewView.render(result,false)).join('');
        }

}

export default new ResultsView();//default because single value or object