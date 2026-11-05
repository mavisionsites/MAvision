// Clickjacking guard: GitHub Pages cannot send frame headers, so refuse to render inside another site's frame.
if(window.top!==window.self){try{if(top.location.origin!==location.origin)throw 0}catch(e){document.documentElement.style.display="none";try{top.location.href=location.href}catch(e2){}}}
// Each language is its own page (/, /en/, /es/) with the text already in the HTML; see build.js.
const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s),WA="5531972014324",L={"pt-BR":"pt",en:"en",es:"es"}[document.documentElement.lang]||"pt";
const lgO=o=>{$("#lg").classList.toggle("o",o);$("#lg>button").setAttribute("aria-expanded",o)},nvO=o=>{$("#nv").classList.toggle("o",o);$("#mb").setAttribute("aria-expanded",o)};
$("#lg>button").onclick=()=>lgO(!$("#lg").classList.contains("o"));
document.addEventListener("click",e=>{if(!e.target.closest("#lg"))lgO(false);if(e.target.closest("nav a"))nvO(false)});
$("#mb").onclick=()=>nvO(!$("#nv").classList.contains("o"));
$("#pv").onclick=()=>$("#dg").showModal();
// Brazilian mask only on the PT page; EN/ES accept international numbers (+, digits, spaces, dashes)
const tel=()=>$("#w").value.replace(/\D/g,"").length,telOk=()=>L=="pt"?tel()>=10:tel()>=7&&tel()<=15;
if(L!="pt")$("#w").addEventListener("input",e=>{e.target.value=e.target.value.replace(/[^\d+\-() ]/g,"").replace(/(?!^)\+/g,"").slice(0,20)});
else $("#w").addEventListener("input",e=>{const d=e.target.value.replace(/\D/g,"").slice(0,11);let o="";if(d.length)o="("+d.slice(0,2);if(d.length>2)o+=") "+d.slice(2,3);if(d.length>3)o+=" "+d.slice(3,7);if(d.length>7)o+="-"+d.slice(7);e.target.value=o});
$("#fm").addEventListener("submit",e=>{e.preventDefault();const f=$("#fm"),v=id=>$("#"+id).value.trim(),rs=$("#rs");
if(!v("n")||!telOk()||!$("#m").checkValidity()||!v("m")||!v("x")){rs.textContent=T[L].bad;rs.style.color="#c0262d";return}
rs.style.color="";rs.textContent=T[L].resp;
const ln=[T[L].wam,"","*"+T[L].ln+":* "+v("n"),"*"+T[L].le+":* "+(v("e")||"-"),"*WhatsApp:* "+v("w"),"*E-mail:* "+v("m"),"","*"+T[L].lx+"*",v("x")];
window.open("https://wa.me/"+WA+"?text="+ln.map(s=>encodeURIComponent(s)).join("%0A"),"_blank","noopener,noreferrer");f.reset()});
(function(){const c=$("#sq");if(matchMedia("(prefers-reduced-motion:reduce)").matches)return;
setInterval(()=>{if(document.hidden)return;const cols=Math.ceil(c.clientWidth/64),rows=Math.ceil(c.clientHeight*.7/64),i=document.createElement("i");i.style.left=Math.floor(Math.random()*cols)*64+"px";i.style.top=Math.floor(Math.random()*rows)*64+"px";i.onanimationend=()=>i.remove();c.appendChild(i)},380)})();

document.documentElement.classList.add("js");
function cnt(el){const n=+el.dataset.n,s=el.dataset.s||"",t0=performance.now();(function f(t){const k=Math.min((t-t0)/1800,1);el.textContent=Math.round(1+(n-1)*(1-Math.pow(1-k,3)))+s;if(k<1)requestAnimationFrame(f)})(t0)}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;e.target.classList.add("in");io.unobserve(e.target);if(e.target.dataset.n)cnt(e.target)}),{threshold:.2});
$$(".rv,.ti,[data-n]").forEach((e,i)=>{e.style.setProperty("--d",(i%4)*.12+"s");io.observe(e)});
const tp=$("#tp"),tl=$(".tl");
function sc(){tp.classList.toggle("s",scrollY>600);const r=tl.getBoundingClientRect();tl.style.setProperty("--pg",Math.max(0,Math.min(1,(innerHeight*.6-r.top)/r.height)))}
addEventListener("scroll",sc,{passive:true});sc();
tp.onclick=()=>scrollTo({top:0,behavior:"smooth"});
$$(".sv article").forEach(a=>a.addEventListener("pointermove",e=>{const r=a.getBoundingClientRect();a.style.setProperty("--mx",e.clientX-r.left+"px");a.style.setProperty("--my",e.clientY-r.top+"px")}));

(function(){const c=$("#cmp"),r=$("#cr");let u=false;const set=v=>{c.style.setProperty("--x",v+"%");r.value=v};
r.addEventListener("pointerdown",()=>u=true);r.addEventListener("input",()=>{u=true;set(r.value)});
if(matchMedia("(prefers-reduced-motion:reduce)").matches)return;
const o=new IntersectionObserver(e=>{if(!e[0].isIntersecting)return;o.disconnect();const t0=performance.now();(function f(t){if(u)return;const k=(t-t0)/2800;if(k>=1){set(50);return}set(Math.round(50+30*Math.sin(k*Math.PI*2)*(1-k)));requestAnimationFrame(f)})(t0)},{threshold:.6});o.observe(c)})();
(function(){const d=$("#ex"),f=$("#exf");const op=a=>{const u=a.dataset.ex;f.src=u;$("#exu").textContent="mavision · "+u.replace(/^.*exemplos\//,"exemplo/");$("#exo").href=u;d.showModal();document.body.style.overflow="hidden"};
$$(".sv .ex").forEach(a=>{a.onclick=()=>op(a);a.onkeydown=e=>{if(e.key=="Enter"||e.key==" "){e.preventDefault();op(a)}}});
const cl=()=>d.close();$("#exc").onclick=cl;d.addEventListener("click",e=>{if(e.target==d)cl()});d.addEventListener("close",()=>{f.src="about:blank";document.body.style.overflow=""})})();