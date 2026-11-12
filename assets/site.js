(function(){
var d=document,rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
function $(s,c){return (c||d).querySelector(s)}function $$(s,c){return [].slice.call((c||d).querySelectorAll(s))}
var hd=$('#hd'),tb=$('#totop'),tle=$('#tl'),tli=tle?[].slice.call(tle.children):[];
function tl(){if(!tle)return;var r=tle.getBoundingClientRect(),c=innerHeight*.65,p=Math.max(0,Math.min(1,(c-r.top)/r.height));tle.style.setProperty('--p',p.toFixed(3));tli.forEach(function(li){li.classList.toggle('lit',li.getBoundingClientRect().top<c)})}
function onScroll(){var y=scrollY,mx=d.documentElement.scrollHeight-innerHeight;hd.classList.toggle('sh',y>10);if(y>140)hd.classList.add('sm');else if(y<40)hd.classList.remove('sm');hd.style.setProperty('--sp',mx>0?Math.min(1,y/mx).toFixed(4):'0');if(tb)tb.classList.toggle('show',y>innerHeight*.8);tl()}
addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll);onScroll();
var mb=$('#mb'),mn=$('#mnav');function menu(o){mn.classList.toggle('open',o);mb.setAttribute('aria-expanded',o?'true':'false');d.body.style.overflow=o?'hidden':''}
mb.addEventListener('click',function(){menu(!mn.classList.contains('open'))});addEventListener('keydown',function(e){if(e.key==='Escape'&&mn.classList.contains('open'))menu(false)});
if(tb)tb.addEventListener('click',function(){scrollTo({top:0,behavior:rm?'auto':'smooth'})});
// counters
var cs=$$('[data-to]');function count(el){var to=+el.dataset.to,t0=0;function f(t){if(!t0)t0=t;var k=Math.min(1,(t-t0)/1600);el.textContent=Math.round(to*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(f)}requestAnimationFrame(f)}
if(!rm&&'IntersectionObserver' in window){cs.forEach(function(c){c.textContent='0'});var co=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){count(e.target);co.unobserve(e.target)}})},{threshold:.5});cs.forEach(function(c){co.observe(c)})}
// work filters + lightbox
var wk=$$('.wk'),fb=$$('.filters button');
function filt(f){var i=0;fb.forEach(function(x){x.setAttribute('aria-pressed',x.dataset.f===f?'true':'false')});wk.forEach(function(w){var s=f==='all'||w.dataset.cat===f;w.hidden=!s;w.classList.remove('pop');if(s){w.classList.add('in');void w.offsetWidth;w.style.animationDelay=(i++*.04)+'s';w.classList.add('pop')}})}
fb.forEach(function(b){b.addEventListener('click',function(){filt(b.dataset.f)})});
var h=location.hash.replace('#','');if(h&&fb.some(function(b){return b.dataset.f===h}))filt(h);
var pz=$('#pz');
if(pz){var pzlast=null;function pzopen(e){if(e)e.preventDefault();pzlast=d.activeElement;pz.classList.add('open');d.body.style.overflow='hidden';setTimeout(function(){$('.pzx',pz).focus()},60)}
function pzclose(){pz.classList.remove('open');d.body.style.overflow='';if(pzlast)pzlast.focus()}
$$('.pclip,#pzo').forEach(function(el){el.addEventListener('click',pzopen)});
$('.pzx',pz).addEventListener('click',pzclose);pz.addEventListener('click',function(e){if(e.target===pz)pzclose()});
addEventListener('keydown',function(e){if(e.key==='Escape'&&pz.classList.contains('open'))pzclose()})}
var lb=$('#lb');
if(lb){var li=$('#lb-img'),lt=$('#lb-t'),ls=$('#lb-s'),lc=$('#lb-c'),cur=0,last=null;
function vis(){return wk.filter(function(w){return !w.hidden})}function pad(n){return (n<10?'0':'')+n}
function show(w){var v=vis();cur=v.indexOf(w);li.src=w.dataset.src;li.alt=w.dataset.t;lt.textContent=w.dataset.t;ls.textContent=w.dataset.s;lc.textContent=pad(cur+1)+' / '+pad(v.length)}
function open(w){last=w;show(w);lb.classList.add('open');d.body.style.overflow='hidden';$('.x',lb).focus()}
function close(){lb.classList.remove('open');d.body.style.overflow='';if(last)last.focus()}
function step(n){var v=vis();show(v[(cur+n+v.length)%v.length])}
wk.forEach(function(w){w.addEventListener('click',function(){open(w)})});
$('.x',lb).addEventListener('click',close);$('.pv',lb).addEventListener('click',function(){step(-1)});$('.nx',lb).addEventListener('click',function(){step(1)});
lb.addEventListener('click',function(e){if(e.target===lb||e.target.tagName==='FIGURE')close()});
addEventListener('keydown',function(e){if(!lb.classList.contains('open'))return;if(e.key==='Escape')close();if(e.key==='ArrowRight')step(1);if(e.key==='ArrowLeft')step(-1)});
var tx=null;lb.addEventListener('touchstart',function(e){tx=e.touches[0].clientX},{passive:true});lb.addEventListener('touchend',function(e){if(tx===null)return;var dx=e.changedTouches[0].clientX-tx;if(Math.abs(dx)>50)step(dx<0?1:-1);tx=null})}
// contact form
var fm=$('#form');if(fm){var th=$('.thanks',fm),sel=$('#f-t');if(location.hash==='#audit'&&sel)sel.value='audit';if(location.search.indexOf('sent=1')>-1)th.classList.add('show');
if(d.body.classList.contains('is-preview'))fm.addEventListener('submit',function(e){e.preventDefault();th.classList.add('show')})}
$$('[data-year]').forEach(function(e){e.textContent=new Date().getFullYear()});
// tilt + glare on cards (mouse only)
if(!rm&&matchMedia('(hover:hover) and (pointer:fine)').matches){$$('[data-tilt]').forEach(function(c){if(c.dataset.tilt==='glare'){var g=d.createElement('span');g.className='glare';g.setAttribute('aria-hidden','true');c.appendChild(g)}
c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;c.style.transition='transform .12s linear,box-shadow .5s';c.style.transform='perspective(900px) rotateX('+((.5-y)*4).toFixed(2)+'deg) rotateY('+((x-.5)*5).toFixed(2)+'deg) translateY(-6px)';c.style.setProperty('--mx',(x*100).toFixed(1)+'%');c.style.setProperty('--my',(y*100).toFixed(1)+'%')});
c.addEventListener('pointerleave',function(){c.style.transition='transform .7s cubic-bezier(.2,.7,.1,1),box-shadow .5s';c.style.transform=''})})}
// reveal
var els=$$('.rv');if(rm||!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});return}
var ro=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');ro.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px',threshold:.06});els.forEach(function(e){ro.observe(e)});
})();
