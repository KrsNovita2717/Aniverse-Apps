import axios from "axios";

const baseUrl = "https://kitsu.io/api/edge";

class DataSource {
  // Mendapatkan anime-anime yang sedang trending
  static async getTrending() {
    try {
      const response = await axios.get(`${baseUrl}/trending/anime`);

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Permintaan ke API gagal.");
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      throw error;
    }
  }

  // Mendapatkan detail anime berdasarkan ID
  static async getAnimeDetails(animeId) {
    try {
      const url = `${baseUrl}/anime/${animeId}`;
      const response = await axios.get(url);

      if (response.status === 200) {
        return response.data.data;
      } else {
        throw ("Permintaan ke API gagal.");
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      throw error;
    }
  }

  // Mencari anime berdasarkan kata kunci
  static async searchAnime(pageOffset, keyword) {
    try {
      const encodedKeyword = encodeURIComponent(keyword);
      let apiUrl = `${baseUrl}/anime?filter[text]=${encodedKeyword}&page[limit]=20&page[offset]=${pageOffset}`;
      const response = await axios.get(apiUrl);

      if (response.status !== 200) {
        throw new Error("Permintaan ke API gagal.");
      }
      return response.data.data;
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      throw error;
    }
  }

  // Mendapatkan daftar anime berdasarkan genre
  static async getAnime(pageOffset, genre) {
    try {
      let apiUrl = `${baseUrl}/anime?page[limit]=20&page[offset]=${pageOffset}&sort=popularityRank`;

      if (genre !== "all") {
        apiUrl += `&filter[categories]=${genre}`;
      }
      const response = await axios.get(apiUrl);
      if (response.status !== 200) {
        throw new Error("Permintaan ke API gagal.");
      }
      return response.data.data;
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      throw error;
    }
  }

  // Mendapatkan karakter-karakter dari suatu anime
  static async getCharacters(animeId, pageUrl = null) {
    try {
      const url = pageUrl || `${baseUrl}/anime/${animeId}/anime-characters`;
      const response = await axios.get(url);

      if (response.status === 200) {
        const data = response.data;

        if (data.links && data.links.next) {
          const nextPageCharacters = await this.getCharacters(
            animeId,
            data.links.next
          );
          const characters = data.data.concat(nextPageCharacters);
          return characters;
        } else {
          return data.data;
        }
      } else {
        throw new Error("Permintaan ke API gagal.");
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      return [];
    }
  }

  // Mendapatkan detail lengkap karakter-karakter dari suatu anime
  static async getAllCharacterDetails(animeId) {
    try {
      const allCharacters = await this.getCharacters(animeId);
      const charaDetails = await Promise.all(
        allCharacters.map(async (character) => {
          const detail = await this.getCharaDetails(character.id);
          return detail;
        })
      );

      return charaDetails;
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      return [];
    }
  }

  // Mendapatkan detail karakter berdasarkan ID
  static async getCharaDetails(id) {
    try {
      const response = await axios.get(
        `${baseUrl}/anime-characters/${id}/character`
      );

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Permintaan ke API gagal.");
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      throw error;
    }
  }

  // Mendapatkan genre-genre dari suatu anime
  static async getGenre(animeId) {
    try {
      const response = await axios.get(`${baseUrl}/anime/${animeId}/genres`);

      if (response.status === 200) {
        const genres = response.data.data.map((item) => item.attributes.name);
        return genres;
      } else {
        throw new Error("Permintaan ke API gagal.");
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      throw error;
    }
  }
}

export default DataSource;
