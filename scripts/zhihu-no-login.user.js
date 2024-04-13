// ==UserScript==
// @name         zhihu-no-login
// @namespace    https://github.com/CyrusYip/userscripts
// @match        *://www.zhihu.com/signin*
// @version      1.2
// @author       Cyrus Yip
// @description  Redirect login page of zhihu.com to explore page so that you can browse Zhihu without logging in.
// @description:zh-CN 将知乎登陆页面跳转到发现页面，这样不用登陆也能看知乎。
// @icon         https://static.zhihu.com/heifetz/favicon.ico
// @run-at       document-start
// ==/UserScript==
'use strict';
window.open("https://www.zhihu.com/explore", "_self")