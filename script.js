// Clickjacking guard: refuse to render inside another site's frame.
if(window.top!==window.self){try{if(top.location.origin!==location.origin)throw 0}catch(e){document.documentElement.style.display="none";try{top.location.href=location.href}catch(e2){}}}
// Each language is its own page (/, /en/, /es/) with the text already in the HTML; see build.js.
const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s),WA="5531993688271",L={"pt-BR":"pt",en:"en",es:"es"}[document.documentElement.lang]||"pt",RM=matchMedia("(prefers-reduced-motion:reduce)").matches,FINE=matchMedia("(pointer:fine)").matches;

// EN and ES serve both regions: euros for visitors in Europe, dollars for the Americas
(function(){let z="";try{z=Intl.DateTimeFormat().resolvedOptions().timeZone||""}catch(e){}const p=$("#price");if(L=="en"&&z.startsWith("Europe/"))p.textContent="€150";if(L=="es"&&z.startsWith("America/"))p.textContent="US$ 150"})();

// top bar: language menu, mobile menu
const lgO=o=>{$("#lg").classList.toggle("o",o);$("#lg>button").setAttribute("aria-expanded",o)},nvO=o=>{$("#nv").classList.toggle("o",o);$("#mb").setAttribute("aria-expanded",o)};
$("#lg>button").onclick=()=>lgO(!$("#lg").classList.contains("o"));
$("#mb").onclick=()=>nvO(!$("#nv").classList.contains("o"));
document.addEventListener("click",e=>{if(!e.target.closest("#lg"))lgO(false);if(e.target.closest("#nv a")||!e.target.closest(".bar"))nvO(false)});
document.addEventListener("keydown",e=>{if(e.key=="Escape"){lgO(false);nvO(false)}});
$("#pvb").onclick=()=>$("#dg").showModal();

// the live builder: the visitor's business name and colour build their site in the hero
(function(){const inp=$("#lvn"),mock=$("#mock"),phone=$(".m-phone"),btn=$("#lvb"),def=$(".lvname").textContent;
  const defH=($(".lvh")||{}).textContent||"",plain=s=>s.normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"");
  const setC=c=>{mock.style.setProperty("--bc",c);phone.style.setProperty("--bc",c)};
  const show=n=>{$$(".lvname").forEach(e=>e.textContent=n||def);$$(".lvh").forEach(e=>e.textContent=n||defH);const ini=((n||def).match(/[A-Za-zÀ-ÿ0-9]/)||["S"])[0].toUpperCase();$("#lvini").textContent=ini;$$(".lvini2").forEach(e=>e.textContent=ini);$("#lvurl").textContent=plain(n||def).slice(0,24)};
  function paint(){const n=inp.value.trim().replace(/\s+/g," ");show(n);btn.href="https://wa.me/"+WA+"?text="+encodeURIComponent(T[L].lvm+(n||"…"))}
  inp.addEventListener("input",paint);
  $$("input[name=lvc]").forEach(r=>r.addEventListener("change",()=>setC(r.value)));
  $("#live").addEventListener("submit",e=>{e.preventDefault();btn.click()});
  // a short demo so first-time visitors see that it reacts; it stops as soon as they interact
  if(!RM){const demo=T[L].lvp.replace(/^[^:]*:\s*/,""),cols=[...$$("input[name=lvc]")];let i=0,stop=false;
    const halt=()=>{stop=true};inp.addEventListener("focus",halt);cols.forEach(c=>c.addEventListener("change",halt));
    setTimeout(function type(){if(stop||inp.value)return;show(demo.slice(0,++i));if(i<demo.length)setTimeout(type,65);
      else setTimeout(()=>{if(stop)return;setC("#f97316");setTimeout(()=>{if(stop)return;setC("#10b981");setTimeout(()=>{if(stop)return;setC(cols.find(c=>c.checked).value);paint()},1800)},1800)},900)},1900)}
  paint()})();

// one motion language: parts of each group rise in turn as they arrive (only what starts below the fold)
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;e.target.classList.remove("pre");io.unobserve(e.target);e.target.querySelectorAll("[data-n]").forEach(cnt)}),{threshold:.12,rootMargin:"0px 0px -6% 0px"});
function cnt(el){if(RM)return;const n=+el.dataset.n,s=el.dataset.s||"",t0=performance.now();(function f(t){const k=Math.min((t-t0)/1500,1);el.textContent=Math.round(n*(1-Math.pow(1-k,3)))+s;if(k<1)requestAnimationFrame(f)})(t0)}
if(!RM)$$(".r").forEach(el=>{if(el.getBoundingClientRect().top>innerHeight*.92){const sib=[...el.parentElement.children].filter(c=>c.classList.contains("r"));el.style.setProperty("--d",Math.min(sib.indexOf(el),5)*.08+"s");el.classList.add("pre");io.observe(el)}});

// cards: a soft light follows the pointer
if(FINE&&!RM)$$(".card").forEach(c=>c.addEventListener("pointermove",e=>{const r=c.getBoundingClientRect();c.style.setProperty("--mx",e.clientX-r.left+"px");c.style.setProperty("--my",e.clientY-r.top+"px")}));

// cases: each page scrolls itself while it is on screen
const wio=new IntersectionObserver(es=>es.forEach(e=>e.target.classList.toggle("play",e.isIntersecting)),{threshold:.25});
if(!RM)$$(".wk").forEach(w=>wio.observe(w));

// scroll-linked: the hero site straightens up, the process line fills, the bar gains its backdrop
const tp=$("#tp"),bar=$("#bar"),mock=$("#mock"),phone=$(".m-phone"),tl=$("#tl"),steps=[...$$("#tl li")],links=[...$$("#nv a")],secs=links.map(a=>$(a.getAttribute("href")));
let ticking=false;
function frame(){ticking=false;const y=scrollY,vh=innerHeight;
  bar.classList.toggle("s",y>24);tp.classList.toggle("s",y>600);
  if(!RM&&innerWidth>640){const k=Math.max(0,Math.min(1,y/(vh*.7)));mock.style.setProperty("--rx",(14*(1-k)).toFixed(2)+"deg");mock.style.setProperty("--sc",(.96+.04*k).toFixed(3));phone.style.setProperty("--py",(-60*k).toFixed(1)+"px")}
  const r=tl.getBoundingClientRect(),p=Math.max(0,Math.min(1,(vh*.75-r.top)/(r.height+vh*.25)));tl.style.setProperty("--k",p.toFixed(3));steps.forEach((s,j)=>s.classList.toggle("on",p>=(j+.15)/steps.length||p>=.98));
  let cur=null;secs.forEach(s=>{if(s&&s.getBoundingClientRect().top<vh*.35)cur=s});links.forEach(a=>a.classList.toggle("on",!!cur&&a.getAttribute("href")=="#"+cur.id))}
tp.onclick=()=>scrollTo({top:0,behavior:RM?"auto":"smooth"});
addEventListener("scroll",()=>{if(!ticking){ticking=true;requestAnimationFrame(frame)}},{passive:true});addEventListener("resize",frame);frame();

// before/after slider (a short sweep shows that it moves)
(function(){const c=$("#cmp"),r=$("#cr");let u=false;const set=v=>{c.style.setProperty("--x",v+"%");r.value=v};
  r.addEventListener("pointerdown",()=>u=true);r.addEventListener("input",()=>{u=true;set(r.value)});
  if(RM)return;const o=new IntersectionObserver(e=>{if(!e[0].isIntersecting)return;o.disconnect();const t0=performance.now();(function f(t){if(u)return;const k=(t-t0)/2800;if(k>=1){set(50);return}set(Math.round(50+30*Math.sin(k*Math.PI*2)*(1-k)));requestAnimationFrame(f)})(t0)},{threshold:.6});o.observe(c)})();

// service examples open in an isolated window
(function(){const d=$("#ex"),f=$("#exf");const op=a=>{const u=a.dataset.ex;f.src=u;$("#exu").textContent="mavision · "+u.replace(/^.*exemplos\//,"exemplo/");$("#exo").href=u;d.showModal();document.body.style.overflow="hidden"};
  $$(".ex").forEach(a=>{a.onclick=()=>op(a);a.onkeydown=e=>{if(e.key=="Enter"||e.key==" "){e.preventDefault();op(a)}}});
  const cl=()=>d.close();$("#exc").onclick=cl;d.addEventListener("click",e=>{if(e.target==d)cl()});d.addEventListener("close",()=>{f.src="about:blank";document.body.style.overflow=""})})();

// contact form -> WhatsApp. Brazilian mask on the PT page; EN/ES accept international numbers.
const tel=()=>$("#w").value.replace(/\D/g,"").length,telOk=()=>L=="pt"?tel()>=10:tel()>=7&&tel()<=15;
if(L!="pt")$("#w").addEventListener("input",e=>{e.target.value=e.target.value.replace(/[^\d+\-() ]/g,"").replace(/(?!^)\+/g,"").slice(0,20)});
else $("#w").addEventListener("input",e=>{const d=e.target.value.replace(/\D/g,"").slice(0,11);let o="";if(d.length)o="("+d.slice(0,2);if(d.length>2)o+=") "+d.slice(2,3);if(d.length>3)o+=" "+d.slice(3,7);if(d.length>7)o+="-"+d.slice(7);e.target.value=o});
$("#fm").addEventListener("submit",e=>{e.preventDefault();const f=$("#fm"),v=id=>$("#"+id).value.trim(),rs=$("#rs");
  if(!v("n")||!telOk()||!$("#m").checkValidity()||!v("m")||!v("x")){rs.textContent=T[L].bad;rs.style.color="#ff8a95";return}
  rs.style.color="";rs.textContent=T[L].resp;
  const ln=[T[L].wam,"","*"+T[L].ln+":* "+v("n"),"*"+T[L].le+":* "+(v("e")||"-"),"*WhatsApp:* "+v("w"),"*E-mail:* "+v("m"),"","*"+T[L].lx+"*",v("x")];
  window.open("https://wa.me/"+WA+"?text="+ln.map(s=>encodeURIComponent(s)).join("%0A"),"_blank","noopener,noreferrer");f.reset()});
