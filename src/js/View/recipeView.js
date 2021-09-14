class RecipeView {
  _parentEl = document.querySelector('.modal');
  _overlay = document.querySelector('.overlay');

  _data;

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();

    this._parentEl.querySelector('.modal--inner').innerHTML = '';
    this._parentEl
      .querySelector('.modal--inner')
      .insertAdjacentHTML('afterbegin', markup);

    this._openModal();

    // adding close handler
    this._parentEl
      .querySelector('.btn--close-modal')
      .addEventListener('click', this._closeModal.bind(this));
  }

  _openModal() {
    this._overlay.classList.remove('hidden');
    this._parentEl.classList.remove('hidden');
  }

  _closeModal() {
    this._overlay.classList.add('hidden');
    this._parentEl.classList.add('hidden');
  }

  _generateMarkup() {
    return `
         <img width="100" src="${this._data.imgURL}" alt="food1" />
        <h2 class="modal__header">
            ${this._data.title} <br />
        </h2>
        <a target="_blank" href="${this._data.vid}">Watch How to cook</a>
    `;
  }
}

export default new RecipeView();
