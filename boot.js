// Runs before the first paint so the opening animations start from their first frame (no flash).
document.documentElement.classList.add("js");
// The violet opening plays once per visit; later pages in the same visit skip it.
try{if(sessionStorage.getItem("mvi"))document.documentElement.classList.add("seen");sessionStorage.setItem("mvi","1")}catch(e){}
// Web fonts load without holding up the first paint (text shows in the fallback font for a moment).
(function(){var p=document.getElementById("gf");if(!p)return;var l=document.createElement("link");l.rel="stylesheet";l.href=p.href;document.head.appendChild(l)})();
