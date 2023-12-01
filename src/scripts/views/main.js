import DataSource from "../data/data-source";
import "bootstrap";
import "../components/anime-list";
import "../components/search-bar";
import "../components/genres-selector";
import "../components/slider-trending";

const main = () => {
  let offsetNow = 0;
  let offsetNext = 20;
  let isLoading = false;
  let isSearching = false;
  let selectedGenre = "all";
  let keyword = "";

  // Mendapatkan elemen anime-list, genre-selector, search-input, dan tombol close
  let animeListElement = document.querySelector("anime-list");
  const genreSelector = document.querySelector("genre-selector");
  const searchInput = document.getElementById("searchTitle");
  const closeButton = document.getElementById("closeButton");

  // Fungsi untuk memuat data anime berdasarkan halaman dan genre
  const loadAnimeData = async (page, genre) => {
    try {
      const animeData = await DataSource.getAnime(page, genre);

      if (animeListElement.animeListData.length > 0) {
        animeListElement.animeListData = [
          ...animeListElement.animeListData,
          ...animeData,
        ];
      } else {
        animeListElement.animeListData = animeData;
      }
      animeListElement.render();
    } catch (error) {
      console.error("Gagal mengambil data anime:", error);
    } finally {
      isLoading = false;
    }
  };

  // Fungsi untuk mencari anime berdasarkan halaman dan kata kunci
  const searchAnime = async (page, keyword) => {
    try {
      const animeData = await DataSource.searchAnime(page, keyword);

      if (animeListElement.animeListData.length > 0) {
        animeListElement.animeListData = [
          ...animeListElement.animeListData,
          ...animeData,
        ];
      } else {
        animeListElement.animeListData = animeData;
      }
      animeListElement.render();
    } catch (error) {
      console.error("Gagal mengambil data anime:", error);
    } finally {
      isLoading = false;
    }
  };

  // Event listener untuk input pencarian
  searchInput.addEventListener("input", () => {
    if (searchInput.value) {
      closeButton.style.display = "block";
      keyword = searchInput.value;
      if (keyword) {
        isSearching = true;
        offsetNow = 0;
        animeListElement.animeListData = [];
        animeListElement.innerHTML = "";
        searchAnime(offsetNow, keyword);
      }
    } else {
      closeButton.style.display = "none";
    }
  });

  // Event listener untuk tombol close pada pencarian
  closeButton.addEventListener("click", () => {
    searchInput.value = "";
    closeButton.style.display = "none";
    isSearching = false;
    offsetNow = 0;
    animeListElement.animeListData = [];
    loadAnimeData(offsetNow, selectedGenre);
  });

  // Event listener untuk perubahan genre pada genre-selector
  genreSelector.addEventListener("change", (event) => {
    selectedGenre = event.target.value;
    animeListElement.animeListData = [];
    animeListElement.innerHTML = "";
    offsetNow = 0;
    offsetNext = offsetNow + 20;
    loadAnimeData(offsetNow, selectedGenre);
    scrollTop();
  });

  // Event listener untuk menampilkan detail anime saat tombol ditekan
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("show-details-button")) {
      const animeId = event.target.getAttribute("id");
      showAnimeDetails(animeId);
    }
  });

  // Fungsi untuk menampilkan detail anime
  function showAnimeDetails(animeId) {
    const animeDetailsContainer = document.createElement("anime-detail");
    animeDetailsContainer.setAttribute("id", animeId);
    animeDetailsContainer.classList.add("show");
    const headerElement = document.querySelector("header");

    headerElement.insertAdjacentElement("afterend", animeDetailsContainer);
  }

  // Event listener untuk memuat lebih banyak data saat scroll ke bawah
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollY + windowHeight >= documentHeight - 800 && !isLoading) {
      isLoading = true;
      offsetNow = offsetNext;
      offsetNext = offsetNow + 20;
      if (isSearching) {
        searchAnime(offsetNow, keyword);
      } else {
        loadAnimeData(offsetNow, selectedGenre);
      }
    }
  });

  // Event listener untuk scroll ke atas sebelum memuat ulang atau keluar dari halaman
  window.addEventListener("beforeunload", () => {
    scrollTop();
  });

  // Fungsi untuk scroll jendela ke atas
  function scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // Memuat data anime saat halaman pertama kali dimuat
  loadAnimeData(offsetNow, selectedGenre);
};

export default main;
