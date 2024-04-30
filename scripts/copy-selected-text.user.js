// ==UserScript==
// @name        Copy selected text
// @namespace   https://github.com/CyrusYip/userscripts
// @match       *://*/*
// @grant       GM.registerMenuCommand
// @grant       GM.setClipboard
// @version     1.0.0
// @author      Cyrus Yip
// @description Some websites forbid copying or append additional copyright info. This script copies selected text as long as you can select text.
// ==/UserScript==
'use strict';

const copy = () => {
  const selectedText = window.getSelection().toString()
  GM.setClipboard(selectedText)
}
GM.registerMenuCommand('Copy selected text', copy)