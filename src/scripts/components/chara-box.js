import DataSource from "../data/data-source";
import noProfile from "../../images/no-profile.jpg";

class CharaBox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          overflow-y: scroll;
          height: 300px;
          border: 1px solid #ccc;
          margin: 2em;
        }
        .chara-item {
          display: flex;
          align-items: center;
          padding: 8px;
          border-bottom: 1px solid #ddd;
        }
        img {
          border-radius: 50%;
          width: 64px;
          height: 64px;
          object-fit: cover;
          margin-right: 10px;
        }
      </style>
      <div id="content"></div>
    `;

    this.contentElement = this.shadowRoot.querySelector("#content");
    this._animeId = null;
  }

  // Mengambil data karakter saat atribut "id" berubah
  static get observedAttributes() {
    return ["id"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "id" && oldValue !== newValue) {
      this._animeId = newValue;
      this.fetchCharacterData();
    }
  }

  /**
   * Setter untuk properti id
   * @param {any} id
   */
  set animeId(id) {
    if (this._animeId !== id) {
      this._animeId = id;
      this.fetchCharacterData();
    }
  }

  /**
   * Setter untuk properti characters
   * @param {any} items
   */
  set characters(items) {
    this._characters = items;
    this.render();
  }

  // Mengambil data karakter berdasarkan ID anime
  async fetchCharacterData() {
    if (this._animeId) {
      try {
        const charactersData = await DataSource.getAllCharacterDetails(this._animeId);
        this._characters = charactersData;
        this.render();
      } catch (error) {
        console.error("Gagal mengambil data karakter:", error);
      }
    }
  }

  // Render data karakter
  render() {
    const contentElement = this.shadowRoot.querySelector("#content");
    contentElement.innerHTML = "";

    if (!this._characters || this._characters.length === 0) {
      contentElement.textContent = "Hmm, sepertinya belum ada apapun disini.";
    }

    this._characters.forEach((character) => {
      const charaItem = document.createElement("div");
      charaItem.classList.add("chara-item");

      const charaImage = document.createElement("img");
      charaImage.src = character.data.attributes?.image?.original || noProfile;
      charaImage.alt = character.data.attributes?.name || "Nama Tidak Tersedia";

      const charaName = document.createElement("h3");
      charaName.textContent = character.data.attributes?.canonicalName || "Nama Tidak Tersedia";

      charaItem.appendChild(charaImage);
      charaItem.appendChild(charaName);

      contentElement.appendChild(charaItem);
    });
  }
}

customElements.define("chara-box", CharaBox);
