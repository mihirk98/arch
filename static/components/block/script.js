class BlockElement extends HTMLElement {
  static get observedAttributes() {
    return ["text"];
  }

  get text() {
    return this.hasAttribute("text");
  }

  set text(val) {
    this.setAttribute("text", val);
  }

  connectedCallback() {
    const color = this.getAttribute("color");

    const divEl = document.createElement("div");
    divEl.setAttribute("class", "block");
    divEl.style.background = color + "8f";
    divEl.style.border = "8px solid " + color;

    let h2El = document.createElement("h2");
    h2El.innerHTML = this.getAttribute("title");

    let p = document.createElement("p");
    p.style.textAlign = "center";

    divEl.append(h2El);
    divEl.append(p);

    this.append(divEl);
  }

  render() {
    let pEl = this.getElementsByTagName("p")[0];
    pEl.innerHTML = this.getAttribute("text");
  }

  attributeChangedCallback() {
    this.render();
  }
}

customElements.define("block-element", BlockElement);
