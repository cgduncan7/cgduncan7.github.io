// #region utils
/**
 * returns a promise that resolves after ms milliseconds
 * @param {number} ms 
 */
function delay(ms) {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
}

/**
 * constrains v between n and x
 * @param {number} v value to constrain
 * @param {number} n minimum value
 * @param {number} x maximum value
 */
function constrain(v, n, x) {
  return (v < n ? n : (v > x ? x : v));
}

/**
 * maps value from range [vmin, vmax] to range [mmin, mmax)
 * @param {number} value value to map
 * @param {number} vmin minimum number value can be
 * @param {number} vmax maximum number value can be
 * @param {number} mmin minimum number mapped value can be (inclusive)
 * @param {number} mmax maximum number mapped value can be (exclusive)
 */
function map(value, vmin, vmax, mmin, mmax) {
  const v = constrain(value, vmin, vmax);
  const r = (v - vmin) * vmax;
  const d = (mmax - mmin) * r;
  return Math.floor(mmin + d);
}

/**
 * returns a random character
 */
function randomCharacter() {
  return String.fromCharCode(map(Math.random(), 0, 1, 33, 127));
}

/**
 * returns a copy of array which has had its contents shuffled
 * @param {array} array array to shuffle
 */
function shuffleArray(array) {
  const arrayCopy = array.slice();
  const shuffled = [];
  for (let i = 0; i < array.length; i += 1) {
    const r = Math.floor(Math.random() * arrayCopy.length);
    const i = arrayCopy[r];
    shuffled.push(i);
    arrayCopy.splice(r, 1);
  }
  return shuffled;
}

/**
 * scrambles text by creating an array of steps to take which:
 * 1- replaces all beginning characters with random characters
 * 2- removes/adds characters to match endText length
 * 3- replaces random characters with characters from end text
 * 4- returns a promise that resolves once endText has been achieved
 * @param {DOMNode} element element with text to shuffle
 * @param {string} endText what element's innerText should end up being
 */
function scramblifyText(element, endText) {
  return new Promise(function(res) {
    const steps = [];
    let startTextArray = [];
    for (let i = 0; i < element.innerText.length; i += 1) {
      startTextArray.push(element.innerText.charAt(i));
    }
    steps.push(startTextArray.slice());
    let indices = [];
    for (let i = 0; i < startTextArray.length; i += 1) { indices.push(i); }
    let shuffledIndices = shuffleArray(indices);

    for (let i = 0; i < shuffledIndices.length; i += 1) {
      startTextArray[shuffledIndices[i]] = randomCharacter();
      steps.push(startTextArray.slice());
    }

    if (startTextArray.length > endText.length) {
      while (startTextArray.length > endText.length) {
        const r = map(Math.random(), 0, 1, 0, startTextArray.length);
        startTextArray.splice(r, 1);
      }
    } else if (startTextArray.length < endText.length) {
      while (startTextArray.length < endText.length) {
        const r = map(Math.random(), 0, 1, 0, startTextArray.length);
        const b = startTextArray.slice(0, r);
        const e = startTextArray.slice(r);
        b.push("");
        startTextArray = b.concat(e);
      }
    }

    indices = [];
    for (let i = 0; i < endText.length; i += 1) { indices.push(i); }
    shuffledIndices = shuffleArray(indices);
    for (let i = 0; i < shuffledIndices.length; i += 1) {
      startTextArray[shuffledIndices[i]] = endText.charAt(shuffledIndices[i]);
      steps.push(startTextArray.slice());
    }
      
    const interval = setInterval(
      function() {
        if (steps.length === 0) {
          clearInterval(interval);
          res();
        } else {
          const step = steps.shift();
          element.innerText = step.join("");
        }
      },
      50
    );
  });
}

/**
 * returns <div class={className}>{ innerHTML }</div>
 * @param {string} className class of div
 * @param {string} innerHTML innerHTML of div to create
 */
function createDiv(className, innerHTML) {
  const div = document.createElement("div");
  div.className = className;
  div.innerHTML = innerHTML;
  return div;
}

/**
 * returns <p class={className}>{ innerHTML }</p>
 * @param {string} className class of p
 * @param {string} innerHTML innerHTML of paragraph
 */
function createParagraph(className, innerHTML) {
  const p = document.createElement("p");
  p.className = className;
  p.innerHTML = innerHTML;
  return p;
}

/**
 * returns <img class={className} src={src} />
 * @param {string} className class of p
 * @param {string} innerHTML innerHTML of paragraph
 */
function createImage(className, src) {
  const img = document.createElement("img");
  img.className = className;
  img.src = src;
  return img;
}

/**
 * returns <a class={className} href={href}>{ innerHTML }</a>
 * @param {string} className class of a
 * @param {string} href href for a
 * @param {string} innerHTML innerHTML of a
 */
function createAnchor(className, href, innerHTML) {
  const anchor = document.createElement("a");
  anchor.className = className;
  anchor.href = href;
  anchor.innerHTML = innerHTML;
  return anchor;
}
// #endregion

(function() {
  var state = 0;
  var rotateDeg;

  function getAboutContents() {
    const title = document.getElementById("content-title");
    title.textContent = "About";

    const body = document.createElement("div");
    body.id = "content-about";
    body.append(createParagraph("about", "My name is Collin."));
    body.append(createImage("about", "https://render.bitstrips.com/v2/cpanel/042c5481-28ec-4d85-8f58-1e8f2376bfc6-6ee700c0-dbce-4c12-96ea-427fe7f14c96-v1.png?transparent=1&palette=1"));
    body.append(createParagraph("about","I'm a human."));
    body.append(createParagraph("about","Most days my favorite color is <span class='green'>green</span>."));
    body.append(createDiv("about-changer", createParagraph("about", "I like <span id='about-likes'>technology</span>!").outerHTML));

    const functions = [];
    functions.push(async function() {
      const likes = [
        "technology",
        "nature",
        "peanut butter",
        "green",
        "cats",
        "dogs",
        "JavaScript",
        "symmetry",
        "music",
        "vague interests",
        "chocolate",
        "tea",
        "beer",
        "documentaries"
      ];
      let index = 0;
      while (state === 1) {
        const indices = likes.map((_, i) => i);
        indices.splice(index, 1);
        index = indices[map(Math.random(), 0, 1, 0, indices.length)];
        const nextString = likes[index];
        await scramblifyText(document.getElementById("about-likes"), nextString);
        await delay(500);
      }
    });
    return [ body, functions ];
  }

  function getProjectsContents() {
    const title = document.getElementById("content-title");
    title.textContent = "Projects";

    const body = document.createElement("div");
    body.id = "content-projects";

    let innerHTML = "";
    innerHTML += createDiv("project-logo", createImage("project-logo", "assets/projects/liveframe/logo.png").outerHTML).outerHTML;
    innerHTML += createDiv("project-details",
      createDiv("project-title", "<h1>Liveframe</h1>").outerHTML +
      createDiv(
        "project-description",
        createParagraph("project-description-short", "A virtual window frame to share my the sight from my window.").outerHTML
      ).outerHTML
    ).outerHTML;
    const project = createAnchor("project", "https://www.collinduncan.com/liveframe/", innerHTML);
    body.append(project);

    return [ body, [] ];
  }

  function getContactContents() {
    const title = document.getElementById("content-title");
    title.textContent = "Contact";

    const body = document.createElement("div");
    body.id = "content-contact";
    body.append(
      createParagraph(
        "contact",
        "email: <a href='mailto:cgduncan7@gmail.com'>cgduncan7@gmail.com</a>"
      )
    );
    body.append(
      createParagraph(
        "contact",
        "github: <a href='https://github.com/cgduncan7'>@cgduncan7</a>"
      )
    );
    body.append(
      createParagraph(
        "contact",
        "location: Netherlands"
      )
    );

    return [ body, [] ];
  }

  function setContents([body, functions]) {
    const contentBody = document.getElementById("content-body");
    contentBody.innerHTML = "";
    contentBody.append(body);
    functions.forEach(function(f) { f(); });
  }

  function setup() {
    document.getElementById("about-link").onclick = function() {
      state = 1;
      rotateDeg = "rotate45";
      setContents(getAboutContents());
      document.getElementById("overlay-c").className = rotateDeg + "-open";
      document.getElementById("overlay-d").className = rotateDeg + "-open";
    };
    document.getElementById("projects-link").onclick = function() {
      state = 2;
      rotateDeg = "rotate-45";
      setContents(getProjectsContents());
      document.getElementById("overlay-c").className = rotateDeg + "-open";
      document.getElementById("overlay-d").className = rotateDeg + "-open";
    };
    document.getElementById("contact-link").onclick = function() {
      state = 3;
      rotateDeg = "rotate135";
      setContents(getContactContents());
      document.getElementById("overlay-c").className = rotateDeg + "-open";
      document.getElementById("overlay-d").className = rotateDeg + "-open";
    };
    document.getElementById("home-link").onclick = function() {
      state = 0;
      document.getElementById("overlay-c").className = "close-" + rotateDeg;
      document.getElementById("overlay-d").className = "close-" + rotateDeg;
    };
  }

  setup();
}());