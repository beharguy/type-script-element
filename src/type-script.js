import { transform, availablePresets } from "@babel/standalone";
import React from "react";
import ReactDOM from "react-dom/client";

const template = document.createElement("template");
template.innerHTML = `
  <style>
    :host {
      display: none;
      white-space: pre;
    }
  </style>
  <slot></slot>
`;

class TypeScript extends HTMLElement {
  #mainSlot;
  #code;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.#mainSlot = this.shadowRoot.querySelector("slot");
  }

  connectedCallback() {
    const src = this.getAttribute("src");

    if (!!src) {
      this.fetchSrc(src);
    } else {
      this.#mainSlot.addEventListener("slotchange", this._onSlotChange);
    }
  }

  fetchSrc = (src) => {
    fetch(src)
      .then((res) => res.text())
      .then((code) => this.transplie(code));
  };

  _onSlotChange = () => {
    this.transplie(this.innerHTML.replaceAll("&gt;", ">"));
  };

  transplie = (code) => {
    this.#code = code;
    const transpliedCode = transform(this.#code, {
      presets: [availablePresets["typescript"]],
      filename: "main.ts",
    }).code;
    console.log(transpliedCode);
    const fnc = Function(transpliedCode);

    fnc();
  };
}

export default TypeScript;
