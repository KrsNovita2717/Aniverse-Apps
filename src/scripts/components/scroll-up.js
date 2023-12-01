class ScrollUpButton extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.render();
      this.setupEventListener();
    }
  
    render() {
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 999;
          }
  
          button {
            background-color: #1b2f75;
            color: #fff;
            border: none;
            padding: 30px;
            cursor: pointer;
            border-radius: 999px;
            outline: none;
          }
  
          button:hover {
            background-color: #0056b3;
          }
  
          button:active {
            background-color: #003380;
          }
  
          button::before {
            content: "\\2191";
            font-size: 18px;
          }
        </style>
        <button id="scroll-up-button"></button>
      `;
    }
  
    setupEventListener() {
      const scrollButton = this.shadowRoot.getElementById("scroll-up-button");
      scrollButton.addEventListener("click", () => this.scrollToTop());
    }
  
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
  
  customElements.define("scroll-up", ScrollUpButton);
  