// ==UserScript==
// @name        Viewport info
// @namespace   https://github.com/CyrusYip/userscripts
// @match       *://*/*
// @grant       GM.setValue
// @grant       GM.getValue
// @grant       GM.registerMenuCommand
// @version     1.4.0
// @author      Cyrus Yip
// @description Show innerWidth, innerHeight, and devicePixelRatio. Update them on resize event.
// ==/UserScript==

'use strict';

const removeInfo = () => {
  // remove old InfoDiv
  const oldInfoDiv = document.querySelector('div.viewport-screen-info')
  oldInfoDiv?.remove()
}

const showInfo = () => {
  // get info
  const { innerWidth, innerHeight, devicePixelRatio } = window
  const info = `innerWidth: ${innerWidth}
innerHeight: ${innerHeight}
devicePixelRatio: ${devicePixelRatio}`
  console.log(info)

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

const loadConfig = async () => {
  const autoShow = await GM.getValue('autoShow', false)
  if (autoShow) {
    showInfo()
    detectResize()
    GM.registerMenuCommand('Disable autoShow', () => {
      GM.setValue('autoShow', false)
      window.location.reload()
    })
  } else {
    GM.registerMenuCommand('Enable autoShow', () => {
      GM.setValue('autoShow', true)
      window.location.reload()
    })
  }

  GM.registerMenuCommand('Show viewport info', () => {
    showInfo()
    detectResize()
  })

  GM.registerMenuCommand('Remove viewport info', () => {
    removeInfo()
    removeDetectResize()
  })
}

loadConfig()