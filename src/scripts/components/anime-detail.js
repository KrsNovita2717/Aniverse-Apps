import DataSource from "../data/data-source";
import "./chara-box";

class AnimeDetail extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["id"];
  }

  /**
   * @param {any} id
   */
  set animeId(id) {
    if (this._animeId !== id) {
      this._animeId = id;
      this.fetchAnimeData(this._animeId);
    }
  }

  async connectedCallback() {
    this._animeId = this.getAttribute("id");
    if (this._animeId) {
      try {
        await this.fetchAnimeData(this._animeId);
        await this.fetchGenre(this._animeId);
        this.render();
        const charaBox = this.querySelector("chara-box");
        if (charaBox) {
          charaBox.setAttribute("id", this._animeId);
        } else {
          console.log("chara-box tidak ditemukan.");
        }
      } catch (error) {
        console.error(error);
      }
    }
    // Menambahkan event listener untuk menutup anime-details
    document.addEventListener("click", this.handleDocumentClick.bind(this));
  }

  handleDocumentClick(event) {
    // Menutup elemen jika area di luar diklik
    if (!this.contains(event.target)) {
      this.remove();
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "id" && oldValue !== newValue) {
      this._animeId = newValue;
      this.fetchAnimeData(this._animeId);
    }
  }

  async fetchAnimeData(animeId) {
    try {
      const animeData = await DataSource.getAnimeDetails(animeId);
      this._animeData = animeData;
    } catch (error) {
      throw new Error("Gagal mengambil data anime: " + error.message);
    }
  }

  async fetchGenre(animeId) {
    try {
      const genreData = await DataSource.getGenre(animeId);
      this._genre = genreData || "-";
    } catch (error) {
      console.error("Gagal mengambil data genre:", error);
      this._genre = "-";
    }
  }

  render() {
    if (!this._animeData) {
      this.innerHTML = "<p>Data anime belum diatur.</p>";
      return;
    }

    this.innerHTML = `
      <button class="btn btn-close mt-3" id="back-button" style="background-color: white; right:10%"></button>
      <div class="container">
        <h1 class="text-center fw-bold">Detail Anime</h1>
        <div class="anime-media container text-center">
          <h2 class="fw-bold">${this._animeData.attributes.canonicalTitle}</h2>
          <img src="${this._animeData.attributes.posterImage.original}" alt="${this._animeData.attributes.canonicalTitle}" class="w-50">
          <p>&hearts; Popularity Rank: ${this._animeData.attributes.popularityRank}</p>
          <p>&star; Rating Rank: ${this._animeData.attributes.ratingRank}</p>
        </div>
        <div class="anime-detail container text-capitalize">
          <ul>
            <li><strong>Inggris:</strong> ${this._animeData.attributes.canonicalTitle || "-"}</li>
            <li><strong>Jepang:</strong> ${this._animeData.attributes.titles.ja_jp || "-"}</li>
            <li><strong>Jepang (Romaji):</strong> ${this._animeData.attributes.titles.en_jp || "-"}</li>
            <li><strong>Tipe:</strong> ${this._animeData.attributes.showType || "-"}</li>
            <li><strong>Episode:</strong> ${this._animeData.attributes.episodeCount || "-"}</li>
            <li><strong>Status:</strong> ${this._animeData.attributes.status || "-"}</li>
            <li><strong>Tanggal Tayang:</strong> ${this._animeData.attributes.startDate || "-"} to ${this._animeData.attributes.endDate || "Now"}</li>
            <li><strong>Skor:</strong> ${this._animeData.attributes.ageRating || "-"}</li>
            <li><strong>Durasi:</strong> ${this._animeData.attributes.episodeLength || "-"} Menit</li>
            <li><strong>Genre:</strong> ${this._genre || "-"}</li>
          </ul>
        </div>
        <div class="anime-detail container">
          <h3 class="text-center fw-bold">Summary:</h3>
          <div class="anime-summary border" style="max-height: 300px; overflow-y: scroll;">
            <p class="fw-500">
              ${this._animeData.attributes.synopsis || "-"}
            </p>
          </div>
        </div>
        <div class="anime-section container">
          <h3 class="text-center fw-bold">Karakter:</h3>
          <chara-box></chara-box>
        </div>
        <div class="anime-trailer container text-center">
          <h3 class="text-center fw-bold">Trailer:</h3>
          <iframe src="https://www.youtube.com/embed/${this._animeData.attributes.youtubeVideoId}" frameborder="0" width="420" height="500"></iframe>
        </div>
      </div>
    `;

    // Menambahkan Event Listener untuk button back
    const backButton = this.querySelector("#back-button");
    backButton.addEventListener("click", () => {
      this.remove();
    });
  }
}

customElements.define("anime-detail", AnimeDetail);
