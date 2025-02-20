// ==UserScript==
// @name        pdf.js downloader
// @namespace   https://github.com/CyrusYip/userscripts
// @match       *://*/*
// @grant       GM.registerMenuCommand
// @version     1.0.0
// @author      Cyrus Yip
// @description Download the PDF file from the pdf.js viewer.
// ==/UserScript==
'use strict';

const download = function () {
  document.querySelector('#download').click()
}

GM.registerMenuCommand('Download PDF', download)