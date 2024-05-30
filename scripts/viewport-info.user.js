// ==UserScript==
// @name        Viewport info
// @namespace   https://github.com/CyrusYip/userscripts
// @match       *://*/*
// @grant       GM.registerMenuCommand
// @version     1.0.0
// @author      Cyrus Yip
// @description Show innerWidth and innerHeight, and update them on resize event.
// ==/UserScript==
'use strict';

const showInfo = () => {
  // remove old InfoDiv
  const oldInfoDiv = document.querySelector('div.viewport-screen-info')
  oldInfoDiv?.remove()

  // get info
  const { innerWidth } = window
  const { innerHeight } = window
  console.log(`innerWidth: ${innerWidth}
  innerHeight: ${innerHeight}`)

  // show info
  const infoDiv = document.createElement('div')
  infoDiv.classList.add('viewport-screen-info')
  infoDiv.innerHTML = `
    innerWidth: ${innerWidth}
    <br />
    innerHeight: ${innerHeight}
  `
  infoDiv.style.cssText = `
    position: fixed;
    bottom: 16px;
    right: 16px;

    font-size: 20px;
    background-color: white;
    color: green;
    opacity: 75%;

    z-index: 9999;
    pointer-events: none;
  `
  document.body.appendChild(infoDiv)
}

const detectResize = () => {
  window.addEventListener('resize', () => {
    showInfo()
  })
}

GM.registerMenuCommand('Show innerWidth and innerHeight', () => {
  showInfo()
  detectResize()
})