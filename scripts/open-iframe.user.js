// ==UserScript==
// @name        Open iframe
// @namespace   https://github.com/CyrusYip/userscripts
// @match       *://*/*
// @grant       GM.openInTab
// @grant       GM.registerMenuCommand
// @version     1.0.0
// @author      Cyrus Yip
// @description Open the iframe element in a new tab.
// ==/UserScript==
'use strict';

const openIframe = function () {
  const url = document.querySelector('iframe').src
  GM.openInTab(url)
}
GM.registerMenuCommand('Open iframe', openIframe)