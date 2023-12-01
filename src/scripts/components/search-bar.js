class SearchBar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <style>
        .input-group {
          position: relative;
          max-width: 100%;
        }
        
        .clear-input-button {
          font-size: 3rem;
          top: 50%;
          transform: translateY(-50%);
          appearance: none;
          border: none;
          border-radius: 50%;
          margin: auto;
          top: 50%;
          right: 5%;
          padding: 0;
          cursor: pointer;
          display: none;
        }

        .input-group .btn {
          z-index: 5;
          position: absolute;
        }
      </style>
      <div class="input-group mb-3">
        <input class="form-control clear-input" placeholder="Tuliskan Judul Anime" id="searchTitle">
        <button class="btn clear-input-button" type="button" id="closeButton" style="display: none;">&times;</button>
      </div>
    `;
  }
}

customElements.define("search-bar", SearchBar);
