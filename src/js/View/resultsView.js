import icons from 'url:../../img/icons.svg';

class ResultsView {
  _parentEl = document.querySelector('.results');
  _data;
  _errorMessage = 'We could not find any meals for your query. Try another one';

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentEl.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
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
    this._parentEl.innerHTML = '';
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkup() {
    return `
    ${this._data
      .map(meal => {
        return `
      <div class="col-md-4">
        <div class="inner">
          <div class="image">
            <img width="100" src="https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80" alt="food1" />
          </div>
  
          <div class="content">
            <h4 class="title">${meal.title}</h4>
            <p data-id="${meal.id}" class="btn">Get Recipe</p>
          </div>
        </div>
      </div>
      `;
      })
      .join('')}    
    `;
  }

  addHandlerClick(handler) {
    let id;
    this._parentEl.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('click', function (e) {
        id = e.target.dataset.id;
        console.log(id);
        handler(id);
      });
    });
  }
}

export default new ResultsView();
