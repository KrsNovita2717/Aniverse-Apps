import DataSource from "../data/data-source";
import "bootstrap";
import "../components/anime-detail";
import { Carousel } from "bootstrap";
import "popper.js";

class SliderTrending extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  async render() {
    try {
      const trendingAnime = await DataSource.getTrending();
      const data = trendingAnime.data;

      let carouselHTML = `
        <style>
          #mySlider {
            margin-top: 4.1em;
            padding: 0;
          }
          .carousel-item img {
            height: 400px;
            object-fit: cover;
            width: 100%;
          }
          .carousel-caption button {
            background-color: rgba(0, 0, 0, 0.5);
            color: #fff;
            border: none;
            padding: 10px 20px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .carousel-caption h5 {
            font-weight: 700;
            padding: auto;
          }

          .carousel-caption button:hover {
            background-color: #0056b3;
          }

          .carousel-caption button:active {
            background-color: #003380;
          }
        </style>
        <div id="mySlider" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-indicators">
      `;

      data.forEach((anime, index) => {
        const isActive = index === 0 ? "active" : "";
        carouselHTML += `
          <button type="button" data-bs-target="#mySlider" data-bs-slide-to="${index}" class="${isActive}"
            aria-current="${isActive ? "true" : "false"}" aria-label="Slide ${
          index + 1
        }"></button>
        `;
      });

      carouselHTML += `
          </div>
          <div class="carousel-inner">
      `;

      data.forEach((anime, index) => {
        const isActive = index === 0 ? "active" : "";
        carouselHTML += `
          <div class="carousel-item ${isActive}">
            <img src="${
              anime.attributes.coverImage
                ? anime.attributes.coverImage.small
                : anime.attributes.posterImage.original
            }" class="d-block w-100" alt="${anime.attributes.canonicalTitle}">
            <div class="carousel-caption d-none d-md-block">
              <button class="btn btn-primary show-details-button" id="${anime.id}">
                <h5>${anime.attributes.canonicalTitle}</h5>
              </button>
            </div>
          </div>
        `;
      });

      carouselHTML += `
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#mySlider" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#mySlider" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      `;

      this.innerHTML = carouselHTML;
      this.initCarousel();
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  }

  initCarousel() {
    const mySlider = this.querySelector("#mySlider");
    const clickedButtons = this.querySelectorAll(".show-details-button");

    clickedButtons.forEach((button) => {
      const id = button.getAttribute("id"); 

      button.addEventListener("click", (_event) => {
        this.showAnimeDetails(id);
      });
    });

    new Carousel(mySlider, {
      interval: 1000,
    });
  }

  showAnimeDetails(animeId) {
    const animeDetailsContainer = document.createElement("anime-detail");
    animeDetailsContainer.setAttribute("id", animeId);
    const headerElement = document.querySelector("header");
    animeDetailsContainer.classList.add("show");

    headerElement.insertAdjacentElement("afterend", animeDetailsContainer);
  }
}

customElements.define("slider-trending", SliderTrending);