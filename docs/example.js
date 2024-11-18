/* global customElements, HTMLElement */

// this is output from emscripten
import setupExample from './sokol-canvas-example-1154.mjs'

// Here I make a web-component to illustrate usage with shadow-dom:
export class SokolExample extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.canvas = document.createElement('canvas')
    this.canvas.width = 300
    this.canvas.height = 150

    this.shadow.appendChild(this.canvas)
    this.start()
  }

  async start () {
    // I bind it to my own canvas, which cannot be grabbed with document.querySelector
    this.instance = await setupExample({ canvas: this.canvas })
    console.log('instance', this.instance)
    console.log(this.instance.HEAPU8.buffer)
  }
}

customElements.define('sokol-example', SokolExample)
