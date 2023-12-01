import logo from "../../images/logo.png";

class AppsBar extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowDOM.innerHTML = `
      <style>
        :host {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 999;
          background-color: rgb(0, 7, 34, 85%);
          color: white;
          display: flex;
          align-items: center;
        }

        img {
          max-width: 4em;
          height: auto;
        }

        h1 {
          font-size: 28px;
          margin: 0;
          font-weight: bolder;
        }

        h1 span {
          color: #330099;
        }

        .title {
          display: flex;
          flex-direction: row;
        }

        .subtitle {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-left: 1em;
        }

        h2 {
          font-size: 16px;
          margin: 0;
        }
      </style>
      <div class="title">
        <img src="${logo}" alt="AniVerse" title="AniVerse" class="mr-2">
        <div class="subtitle">
          <h1>Ani<span>Verse</span></h1>
          <h2>Your Gateway to the Anime Universe</h2>
        </div>
      </div>
    `;
  }
}

customElements.define("app-bar", AppsBar);
