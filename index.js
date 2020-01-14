function delay(e){return new Promise(t=>{setTimeout(t,e)})}function constrain(e,t,n){return e<t?t:e>n?n:e}function map(e,t,n,a,c){const o=(c-a)*((constrain(e,t,n)-t)*n);return Math.floor(a+o)}function randomCharacter(){return String.fromCharCode(map(Math.random(),0,1,33,127))}function shuffleArray(e){const t=e.slice(),n=[];for(let a=0;a<e.length;a+=1){const e=Math.floor(Math.random()*t.length),a=t[e];n.push(a),t.splice(e,1)}return n}function scramblifyText(e,t){return new Promise(function(n){const a=[];let c=[];for(let t=0;t<e.innerText.length;t+=1)c.push(e.innerText.charAt(t));a.push(c.slice());let o=[];for(let e=0;e<c.length;e+=1)o.push(e);let r=shuffleArray(o);for(let e=0;e<r.length;e+=1)c[r[e]]=randomCharacter(),a.push(c.slice());if(c.length>t.length)for(;c.length>t.length;){const e=map(Math.random(),0,1,0,c.length);c.splice(e,1)}else if(c.length<t.length)for(;c.length<t.length;){const e=map(Math.random(),0,1,0,c.length),t=c.slice(0,e),n=c.slice(e);t.push(""),c=t.concat(n)}o=[];for(let e=0;e<t.length;e+=1)o.push(e);r=shuffleArray(o);for(let e=0;e<r.length;e+=1)c[r[e]]=t.charAt(r[e]),a.push(c.slice());const l=setInterval(function(){if(0===a.length)clearInterval(l),n();else{const t=a.shift();e.innerText=t.join("")}},50)})}function createDiv(e,t){const n=document.createElement("div");return n.className=e,n.innerHTML=t,n}function createParagraph(e,t){const n=document.createElement("p");return n.className=e,n.innerHTML=t,n}function createImage(e,t){const n=document.createElement("img");return n.className=e,n.src=t,n}!function(){var e,t=0;function n([e,t]){const n=document.getElementById("content-body");n.innerHTML="",n.append(e),t.forEach(function(e){e()})}document.getElementById("about-link").onclick=function(){t=1,e="rotate45",n(function(){document.getElementById("content-title").textContent="About";const e=document.createElement("div");e.id="content-about",e.append(createParagraph("about","My name is Collin.")),e.append(createImage("about","https://render.bitstrips.com/v2/cpanel/042c5481-28ec-4d85-8f58-1e8f2376bfc6-6ee700c0-dbce-4c12-96ea-427fe7f14c96-v1.png?transparent=1&palette=1")),e.append(createParagraph("about","I'm a human.")),e.append(createParagraph("about","Most days my favorite color is <span class='green'>green</span>.")),e.append(createDiv("about-changer",createParagraph("about","I like <span id='about-likes'>technology</span>!").outerHTML));const n=[];return n.push(async function(){const e=["technology","nature","peanut butter","green","cats","dogs","JavaScript","symmetry","music","vague interests","chocolate","tea","beer","documentaries"];let n=0;for(;1===t;){const t=e.map((e,t)=>t);t.splice(n,1);const a=e[n=t[map(Math.random(),0,1,0,t.length)]];await scramblifyText(document.getElementById("about-likes"),a),await delay(500)}}),[e,n]}()),document.getElementById("overlay-c").className=e+"-open",document.getElementById("overlay-d").className=e+"-open"},document.getElementById("projects-link").onclick=function(){t=2,e="rotate-45",n(function(){document.getElementById("content-title").textContent="Projects";const e=document.createElement("div");e.id="content-projects";const t=createDiv("projects-featured","<h2>Featured Projects</h2>");return e.append(t),[e,[]]}()),document.getElementById("overlay-c").className=e+"-open",document.getElementById("overlay-d").className=e+"-open"},document.getElementById("contact-link").onclick=function(){t=3,e="rotate135",n(function(){document.getElementById("content-title").textContent="Contact";const e=document.createElement("div");return e.id="content-contact",e.append(createParagraph("contact","email: <a href='mailto:cgduncan7@gmail.com'>cgduncan7@gmail.com</a>")),e.append(createParagraph("contact","github: <a href='https://github.com/cgduncan7'>@cgduncan7</a>")),e.append(createParagraph("contact","location: Netherlands")),[e,[]]}()),document.getElementById("overlay-c").className=e+"-open",document.getElementById("overlay-d").className=e+"-open"},document.getElementById("home-link").onclick=function(){t=0,document.getElementById("overlay-c").className="close-"+e,document.getElementById("overlay-d").className="close-"+e}}();