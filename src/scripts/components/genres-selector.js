import genresData from "../data/genres";

class GenreSelector extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
      <style>
        .genres-list {
          display: flex;
          flex-wrap: wrap;
        }

        .form-check-label {
          margin-right: 10px;
        }

        @media screen and (max-width: 768px) {
          .genres-list {
            flex-direction: column;
          }

          .form-check-label {
            margin-right: 0;
            margin-bottom: 5px;
          }
        }
      </style>
      <div class="genres-list form-check col">
        <div class="card p-lg-4">
          <h3 class="fw-bold">Genre:-</h3>
          <div class="row mx-2 p-3" id="genreList">
          </div>
        </div>
      </div>
    `;

    this.loadGenres();
  }

  async loadGenres() {
    try {
      const genres = genresData;
      const genreList = document.getElementById("genreList");
      const allRadio = document.createElement("div");
      allRadio.innerHTML = `
        <div class="col">
        <input class="form-check-input" type="radio" name="genre" id="genreAll" value="all" checked>
        <label class="form-check-label" for="genreAll">
          All
        </label>
        </div>
      `;
      genreList.appendChild(allRadio);
      genres.forEach((genre) => {
        const radio = document.createElement("div");
        radio.innerHTML = `
          <div class="col">
          <input class="form-check-input" type="radio" name="genre" id="${genre.slug}" value="${genre.slug}">
          <label class="form-check-label" for="${genre.slug}">
          ${genre.name}
          </label>
          </div>
        `;
        genreList.appendChild(radio);
      });
    } catch (error) {
      console.error("Terjadi kesalahan saat memuat genre:", error);
    }
  }
}

customElements.define("genre-selector", GenreSelector);
