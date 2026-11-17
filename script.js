// Clickjacking guard: refuse to render inside another site's frame.
if(window.top!==window.self){try{if(top.location.origin!==location.origin)throw 0}catch(e){document.documentElement.style.display="none";try{top.location.href=location.href}catch(e2){}}}
// Each language is its own page (/, /en/, /es/) with the text already in the HTML; see build.js.
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],WA="5531993688271",L={"pt-BR":"pt",en:"en",es:"es"}[document.documentElement.lang]||"pt",t=T[L],RM=matchMedia("(prefers-reduced-motion:reduce)").matches,FINE=matchMedia("(pointer:fine)").matches,SEEN=document.documentElement.classList.contains("seen");

// EN and ES serve both regions: euros for visitors in Europe, dollars for the Americas
(function(){let z="";try{z=Intl.DateTimeFormat().resolvedOptions().timeZone||""}catch(e){}const p=$("#price");if(L=="en"&&z.startsWith("Europe/"))p.textContent="€150";if(L=="es"&&z.startsWith("America/"))p.textContent="US$ 150"})();

// opening: the violet square leaves after its animation (shown once per visit, see boot.js)
setTimeout(()=>$("#intro").classList.add("done"),RM||SEEN?0:2000);

// top bar: language menu, phone menu, privacy policy
const lgO=o=>{$("#lg").classList.toggle("o",o);$("#lg>button").setAttribute("aria-expanded",o)},nvO=o=>{$("#mp").classList.toggle("o",o);$("#mb").setAttribute("aria-expanded",o)};
$("#lg>button").onclick=()=>lgO(!$("#lg").classList.contains("o"));
$("#mb").onclick=()=>nvO(!$("#mp").classList.contains("o"));$("#mpc").onclick=()=>nvO(false);
document.addEventListener("click",e=>{if(!e.target.closest("#lg"))lgO(false);if(e.target.closest("#mp a")||!e.target.closest(".bar"))nvO(false)});
document.addEventListener("keydown",e=>{if(e.key=="Escape"){lgO(false);nvO(false)}});
$("#pvb").onclick=()=>$("#dg").showModal();

// reveal: parts rise and come into focus as they arrive
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{rootMargin:"0px 0px -8% 0px"});
$$(".rv").forEach((el,i)=>{if(el.closest(".hero"))el.style.transitionDelay=(RM?0:(SEEN?.1:1.1)+i*.08)+"s";io.observe(el)});
setTimeout(()=>$$(".hero .rv").forEach(el=>el.style.transitionDelay=""),3000);

// hero: the visitor's business name runs through the five steps
(function(){const biz=$("#biz"),slug=$("#slug"),dom=$("#dom"),stx=$("#stx"),want=$("#want"),nodes=$$(".node");
  const plain=s=>s.normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
  let timer,k=0;
  function run(){clearTimeout(timer);k=0;nodes.forEach(n=>n.classList.remove("on"));stx.textContent=t.zBuild;
    const tick=()=>{nodes.forEach(n=>{if(+n.dataset.k<=k)n.classList.add("on")});
      if(k>=3){stx.textContent=t.zOn;if(!RM)timer=setTimeout(run,3800);return}
      k++;timer=setTimeout(tick,RM?0:900)};
    timer=setTimeout(tick,RM?0:500)}
  function paint(){const name=biz.value.trim().replace(/\s+/g," "),s=plain(name);
    slug.textContent=(s||t.zSlug).slice(0,28);dom.textContent=s?s.replace(/-/g,"").slice(0,22)+t.zTld:t.zDom;
    want.href="https://wa.me/"+WA+"?text="+encodeURIComponent(t.lvm+(name||"…"))}
  let deb;biz.addEventListener("input",()=>{paint();clearTimeout(deb);deb=setTimeout(run,250)});
  $("#pipe").addEventListener("submit",e=>{e.preventDefault();want.click()});
  paint();setTimeout(run,RM?0:(SEEN?400:1600))})();

// about: the words light up as the violet field crosses the screen
const words=$("#words"),field=$("#field");
words.innerHTML=words.textContent.trim().split(/\s+/).map(w=>"<span>"+w.replace(/&/g,"&amp;").replace(/</g,"&lt;")+"</span>").join(" ");
const ws=$$("#words span");
function lightWords(){const r=field.getBoundingClientRect(),vh=innerHeight,p=RM?1:Math.min(1,Math.max(0,(vh*.85-r.top)/(r.height+vh*.2))),n=Math.round(p*ws.length*1.15);ws.forEach((w,i)=>w.classList.toggle("on",i<n))}

// process: tap a prism to read its step
$("#iso").addEventListener("click",e=>{const b=e.target.closest(".col");if(!b)return;const i=+b.dataset.i;
  $$(".col").forEach(c=>{c.classList.toggle("on",c===b);c.setAttribute("aria-selected",c===b)});
  $("#stepn").textContent="0"+(i+1);$("#stept").textContent=t["r"+(i+1)];$("#stepx").textContent=t["e"+(i+1)]});

// numbers count up when they arrive
const nio=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;nio.unobserve(e.target);const el=e.target,to=+el.dataset.n,t0=performance.now();
  if(RM){el.textContent=to;return}(function f(x){const p=Math.min(1,(x-t0)/1400);el.textContent=Math.round(to*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)})(t0)}),{threshold:.6});
$$("[data-n]").forEach(el=>{if(!RM)el.textContent="0";nio.observe(el)});

// cases: on touch screens each page scrolls itself while it is on screen
if(!FINE&&!RM){const wio=new IntersectionObserver(es=>es.forEach(e=>e.target.classList.toggle("play",e.isIntersecting)),{threshold:.4});$$(".case").forEach(c=>wio.observe(c))}

// before/after slider (a short sweep shows that it moves)
(function(){const c=$("#cmp"),r=$("#cr");let u=false;const set=v=>{c.style.setProperty("--p",v+"%");r.value=v};
  r.addEventListener("pointerdown",()=>u=true);r.addEventListener("input",()=>{u=true;set(r.value)});
  if(RM)return;const o=new IntersectionObserver(e=>{if(!e[0].isIntersecting)return;o.disconnect();const t0=performance.now();(function f(x){if(u)return;const k=(x-t0)/2800;if(k>=1){set(50);return}set(Math.round(50+30*Math.sin(k*Math.PI*2)*(1-k)));requestAnimationFrame(f)})(t0)},{threshold:.6});o.observe(c)})();

// service examples open in an isolated window
(function(){const d=$("#ex"),f=$("#exf");const op=a=>{const u=a.dataset.ex;f.src=u;$("#exu").textContent="mavision · "+u.replace(/^.*exemplos\//,"exemplo/");$("#exo").href=u;d.showModal();document.body.style.overflow="hidden"};
  $$(".ex").forEach(a=>{a.onclick=()=>op(a);a.onkeydown=e=>{if(e.key=="Enter"||e.key==" "){e.preventDefault();op(a)}}});
  const cl=()=>d.close();$("#exc").onclick=cl;d.addEventListener("click",e=>{if(e.target==d)cl()});d.addEventListener("close",()=>{f.src="about:blank";document.body.style.overflow=""})})();

// contact form -> WhatsApp. Brazilian mask on the PT page; EN/ES accept international numbers.
const tel=()=>$("#w").value.replace(/\D/g,"").length,telOk=()=>L=="pt"?tel()>=10:tel()>=7&&tel()<=15;
if(L!="pt")$("#w").addEventListener("input",e=>{e.target.value=e.target.value.replace(/[^\d+\-() ]/g,"").replace(/(?!^)\+/g,"").slice(0,20)});
else $("#w").addEventListener("input",e=>{const d=e.target.value.replace(/\D/g,"").slice(0,11);let o="";if(d.length)o="("+d.slice(0,2);if(d.length>2)o+=") "+d.slice(2,3);if(d.length>3)o+=" "+d.slice(3,7);if(d.length>7)o+="-"+d.slice(7);e.target.value=o});
$("#fm").addEventListener("submit",e=>{e.preventDefault();const f=$("#fm"),v=id=>$("#"+id).value.trim(),rs=$("#rs");
  if(!v("n")||!telOk()||!v("x")){rs.textContent=t.zBad;rs.classList.add("err");return}
  rs.classList.remove("err");rs.textContent=t.resp;
  const ln=[t.wam,"","*"+t.ln+":* "+v("n"),"*WhatsApp:* "+v("w"),"","*"+t.lx+"*",v("x")];
  window.open("https://wa.me/"+WA+"?text="+ln.map(s=>encodeURIComponent(s)).join("%0A"),"_blank","noopener,noreferrer");f.reset()});

// scroll: bar backdrop, back-to-top, active link, the about words
const tp=$("#tp"),bar=$("#bar"),links=$$("#nv a,#mp nav a"),secs=[...new Set(links.map(a=>a.getAttribute("href")))].map(h=>$(h)).filter(Boolean),cv=$("#ribbon");
function frame(){const y=scrollY,vh=innerHeight;bar.classList.toggle("s",y>20);tp.classList.toggle("s",y>600);lightWords();
  let cur=null;secs.forEach(s=>{if(s.getBoundingClientRect().top<vh*.4)cur=s.id});links.forEach(a=>a.classList.toggle("on",a.getAttribute("href")=="#"+cur));
  cv.style.opacity=1-Math.min(1,y/(vh*.9))*.62}
tp.onclick=()=>scrollTo({top:0,behavior:RM?"auto":"smooth"});
let ticking=false;addEventListener("scroll",()=>{if(!ticking){ticking=true;requestAnimationFrame(()=>{frame();ticking=false;if(RM)draw(0)})}},{passive:true});

// ---------- the ribbon: the line of the M, drawn as light ----------
const cx=cv.getContext("2d");let W,H,mx=0,my=0,tmx=0,tmy=0;
function size(){const dpr=Math.min(devicePixelRatio||1,1.25);W=innerWidth;H=innerHeight;cv.width=W*dpr;cv.height=H*dpr;cx.setTransform(dpr,0,0,dpr,0,0);if(RM)draw(0)}
addEventListener("resize",()=>{size();frame()});
if(FINE)addEventListener("pointermove",e=>{tmx=e.clientX/W-.5;tmy=e.clientY/H-.5},{passive:true});
const N=innerWidth<700?40:70,SEG=72;
function draw(ms){const tt=ms*.001;mx+=(tmx-mx)*.04;my+=(tmy-my)*.04;
  const maxS=document.documentElement.scrollHeight-H,p=maxS>0?scrollY/maxS:0,mob=W<900,Lr=Math.hypot(W,H)*.62;
  cx.clearRect(0,0,W,H);cx.globalCompositeOperation="lighter";
  // the knot sits low between the copy and the card in the hero, then drifts as the page scrolls
  const kx=(mob?.55:.5)+Math.sin(p*6.5)*.22+mx*.04,ky=(mob?.72:.8)-Math.sin(p*4.2)*.3+my*.04;
  const rot=-1.05+Math.sin(p*5.5)*.55+Math.sin(tt*.12)*.05,dx=Math.cos(rot),dy=Math.sin(rot),nx=-dy,ny=dx;
  const g=cx.createRadialGradient(kx*W,ky*H,0,kx*W,ky*H,Lr*.45);g.addColorStop(0,"rgba(150,120,255,.22)");g.addColorStop(.4,"rgba(110,80,255,.07)");g.addColorStop(1,"rgba(110,80,255,0)");
  cx.fillStyle=g;cx.fillRect(0,0,W,H);
  for(let i=0;i<N;i++){const s=i/(N-1)-.5,ph=i*.41,core=1-Math.min(1,Math.abs(s)*2),hue=262-(s+.5)*80;
    cx.strokeStyle=`hsla(${hue},100%,${60+core*18}%,${.08+core*core*.42})`;cx.lineWidth=.6+core*1.1;cx.beginPath();
    for(let j=0;j<=SEG;j++){const u=j/SEG*2-1,au=Math.abs(u);
      const fan=Lr*(.02+1.7*Math.pow(au,1.15))*(u>0?1:.6);   // pinched at the knot, opening up and out
      const tw=Math.cos(u*1.9+tt*.28+s*.6);                     // one slow twist, like the ribbon of the M
      const across=s*fan*(.62+.38*tw)+Math.sin(u*3.2+tt*.5+ph)*46*au*au+u*u*Lr*.22,along=u*Lr;
      const x=kx*W+along*dx+across*nx,y=ky*H+along*dy+across*ny;j?cx.lineTo(x,y):cx.moveTo(x,y)}
    cx.stroke()}
  const c2=cx.createRadialGradient(kx*W,ky*H,0,kx*W,ky*H,90);c2.addColorStop(0,"rgba(220,210,255,.35)");c2.addColorStop(1,"rgba(160,140,255,0)");
  cx.fillStyle=c2;cx.fillRect(kx*W-90,ky*H-90,180,180);cx.globalCompositeOperation="source-over"}
size();frame();
// animate only while the tab is visible; reduced motion gets one still frame
if(!RM){let on=true;document.addEventListener("visibilitychange",()=>{on=!document.hidden;if(on)requestAnimationFrame(loop)});function loop(ms){if(!on)return;draw(ms);requestAnimationFrame(loop)}requestAnimationFrame(loop)}
