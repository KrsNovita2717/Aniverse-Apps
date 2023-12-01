class FooterElement extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.render();
    }
  
    render() {
      this.innerHTML = `
        <style>
          :host {
            display: flex;
            justify-content: space-between;
            background-color: #000722;
            color: white;
          }
        </style>
        <div class="footer header">
          <h3 class="fw-bold">About Us</h3>
          <p>AniVerse is your ultimate destination for all things anime. We are passionate about bringing
          you the latest updates, reviews, and recommendations from the anime universe.</p>
        </div>
        <div class="text-center">
          <p>&copy; 2023 AniVerse. All rights reserved.</p>
        </div>
      `;
    }
  }
  
  customElements.define("custom-footer", FooterElement);
  