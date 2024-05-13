// ==UserScript==
// @name        Open userscript API docs
// @namespace   https://github.com/CyrusYip/userscripts
// @match       *://*/*
// @grant       GM.openInTab
// @grant       GM.registerMenuCommand
// @version     1.0.0
// @author      Cyrus Yip
// @description Open API documentation of common userscript managers (Greasemonkey, Tampermonkey and Violentmonkey).
// ==/UserScript==
'use strict';

const docsList = [
  "https://wiki.greasespot.net/Greasemonkey_Manual:API",
  "https://www.tampermonkey.net/documentation.php?locale=en",
  "https://violentmonkey.github.io/api/gm/",
]
const openDocs = () => {
  docsList.forEach(link => GM.openInTab(link))
}
GM.registerMenuCommand('Open userscript API docs', openDocs)