// ==UserScript==
// @name        Viewport info
// @namespace   https://github.com/CyrusYip/userscripts
// @match       *://*/*
// @grant       GM.setValue
// @grant       GM.getValue
// @grant       GM.registerMenuCommand
// @version     2.3.0
// @author      Cyrus Yip
// @description Show innerWidth, innerHeight, and devicePixelRatio. Update them on resize event.
// ==/UserScript==

'use strict';

const showInfo = () => {
  // get info
  const { innerWidth, innerHeight, devicePixelRatio } = window
  //   const info = `innerWidth: ${innerWidth}
  // innerHeight: ${innerHeight}
  // devicePixelRatio: ${devicePixelRatio}`
  //   console.log(info)

  // show info
  const infoDiv = document.createElement('div')
  infoDiv.classList.add('viewport-screen-info')
  infoDiv.innerHTML = `${innerWidth} × ${innerHeight} (${devicePixelRatio})`
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

const removeInfo = () => {
  const infoDiv = document.querySelector('div.viewport-screen-info')
  infoDiv?.remove()
}

const refreshInfo = () => {
  removeInfo()
  showInfo()
}

const detectResize = () => {
  window.addEventListener('resize', refreshInfo)
}

const removeDetectResize = () => {
  window.removeEventListener('resize', refreshInfo)
}

const activate = () => {
  refreshInfo()
  detectResize()
}

const deactivate = () => {
  removeInfo()
  removeDetectResize()
}

const loadConfig = async () => {
  const autoShow = await GM.getValue('autoShow', false)
  if (autoShow) { activate() }
}

const registerCommands = () => {
  GM.registerMenuCommand('Show viewport info', activate)
  GM.registerMenuCommand('Remove viewport info', deactivate)
  GM.registerMenuCommand('Automatically show viewport info', () => {
    GM.setValue('autoShow', true); activate()
  })
  GM.registerMenuCommand("Dont't automatically show viewport info", () => {
    GM.setValue('autoShow', false); deactivate()
  })
}

loadConfig()
registerCommands()