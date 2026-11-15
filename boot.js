// Runs before the first paint so the opening animations start from their first frame (no flash).
document.documentElement.classList.add("js");
// Web fonts load without holding up the first paint (text shows in the fallback font for a moment).
(function(){var p=document.getElementById("gf");if(!p)return;var l=document.createElement("link");l.rel="stylesheet";l.href=p.href;document.head.appendChild(l)})();
