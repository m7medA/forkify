import icons from 'url:../../img/icons.svg';

export default class View{
    _data;

    /**
     * Render the received object to the DOM.
     * 
     * @param {Object|Object[]} data - The data to be rendered (e.g. recipe).
     * @param {boolean} [render=true] - If false, create markup string instead of rendering to the DOM.
     * @returns {undefined|string} - If render=false, returns the markup string.
     * @this {Object} View instance
     * @author Mo7med Ayman.
     * @todo Finish Implementaion.
    */
    render(data, render=true){
        if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
        this._data = data;
        const markup = this._generateMarkup();

        if(!render) return markup;

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin',markup);
    }

    /**
     * Update the DOM with new data without re-rendering the entire view.
     * 
     * @param {Object|Object[]} data - The new data to be rendered.
     * @this {Object} View instance
    */
    update(data){
        this._data = data;
        const newMarkup = this._generateMarkup();
        
        const newDom = document.createRange().createContextualFragment(newMarkup);
        const newElements = Array.from(newDom.querySelectorAll('*'));
        const curElements = Array.from(this._parentElement.querySelectorAll('*'));
        
        
        newElements.forEach((newEl,i) => {
            const curEl = curElements[i];
            //Update Change Text
            if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== ""){
                curEl.textContent = newEl.textContent;
            }

            //Update Change attribute
            if(!newEl.isEqualNode(curEl)){
                Array.from(newEl.attributes).forEach(attr => {
                    curEl.setAttribute(attr.name,attr.value);
                });
            }
        });
    }
    
    /**
     * Clear the parent element's inner HTML.
     * 
     * @this {Object} View instance
     */
    _clear(){
        this._parentElement.innerHTML = '';
    }
    
    /**
     * Render a loading spinner to the DOM.
     * 
     * @this {Object} View instance
     */
    renderSpinner(){
        const markup = `
    <div class="spinner">
        <svg>
    <use href="${icons}#icon-loader"></use>
        </svg>
    </div> 
        `
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin',markup);
    }
    
    /**
     * Render an error message to the DOM.
     * 
     * @param {string} [message=this._errorMessage] - The error message to be rendered.
     * @this {Object} View instance
     */
    renderError(message = this._errorMessage){
        const markup = `
            <div class="error">
                <div>
            <svg>
                <use href="${icons}#icon-alert-triangle"></use>
            </svg>
                </div>
                <p>${message}</p>
            </div>
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin',markup);
    }
    
    /**
     * Render a success message to the DOM.
     * 
     * @param {string} [message=this._messageS] - The success message to be rendered.
     * @this {Object} View instance
     */
    renderMessage(message = this._messageS){
        const markup = `
    <div class="message">
        <div>
    <svg>
        <use href="${icons}#icon-smile"></use>
    </svg>
        </div>
        <p>${message}</p>
    </div>
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin',markup);
    }
}