!function(){var t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),r=null;e.setAttribute("disabled","true"),t.addEventListener("click",(function(){r=setInterval((function(){var t;t="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0)),document.body.style.backgroundColor=t}),1e3),t.setAttribute("disabled","true"),e.removeAttribute("disabled")})),e.addEventListener("click",(function(){clearInterval(r),t.removeAttribute("disabled"),e.setAttribute("disabled","true")}))}();
//# sourceMappingURL=01-color-switcher.051c9236.js.map