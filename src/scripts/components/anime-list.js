import noImage from "../../images/no-image.jpg";

class AnimeList extends HTMLElement {
  constructor() {
    super();
    this.animeListData = []; 
  }

  /**
   *
   * @param {any} animeListData 
   */
  set animeList(animeListData) {
    // render dipanggil setelah menyiapkan data
    this.animeListData = Array.isArray(animeListData) ? animeListData : [];
    this.render(); 
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="row row-cols-4">
        ${this.animeListData
          .map((anime) => this.renderAnimeCard(anime))
          .join("")}
      </div>
    `;
  }

  
  render() {
    this.innerHTML = `
      <div class="row row-cols-md-4">
        ${this.animeListData
          .map((anime) => this.renderAnimeCard(anime))
          .join("")}
      </div>
    `;
  }

  // menyiapka elemen card tiap data
  renderAnimeCard(animeData) {
    const posterImage = animeData.attributes.posterImage
      ? animeData.attributes.posterImage.small
      : noImage;
    return `
      <div class="col-3 mb-4">
        <div class="card h-100" data-aos="fade-up">
          <img src="${posterImage}" class="card-img-top" alt="${animeData.attributes.canonicalTitle}">
          <div class="card-body">
            <h5 class="card-title fw-bold">${animeData.attributes.canonicalTitle}</h5>
            <p class="card-text bg-light-subtle">Rating: ${animeData.attributes.averageRating}%</p>
          </div>
          <button class="btn btn-primary show-details-button m-auto mb-2" id="${animeData.id}">Lihat Detail</button>
        </div>
      </div>
    `;
  }
}

customElements.define("anime-list", AnimeList);
