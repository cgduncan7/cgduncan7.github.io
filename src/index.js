(function() {
  // let state = 0;
  let rotateDeg;

  function getAboutContents() {
    const title = document.getElementById("content-title");
    title.textContent = "About";

    const body = document.createElement("div");
    body.id = "content-about";
    body.innerHTML = "My name is Collin.<br/><br/>";
    body.innerHTML += "I'm a human.<br/><br/>";
    body.innerHTML += "I like technology.<br/><br/>";
    body.innerHTML += "Most days my favorite color is <span class='green'>green</span>.<br/><br/>";

    return [ body ];
  }

  function getProjectsContents() {
    const title = document.getElementById("content-title");
    title.textContent = "Projects";

    const body = document.createElement("div");
    body.id = "content-about";
    body.innerHTML = "My name is Collin.<br/><br/>";
    body.innerHTML += "I'm a human.<br/><br/>";
    body.innerHTML += "I like technology.<br/><br/>";
    body.innerHTML += "Most days my favorite color is <span class='green'>green</span>.<br/><br/>";

    return [ body ];
  }

  function getContactContents() {
    const title = document.getElementById("content-title");
    title.textContent = "Contact";

    const body = document.createElement("div");
    body.id = "content-about";
    body.innerHTML = "My name is Collin.<br/><br/>";
    body.innerHTML += "I'm a human.<br/><br/>";
    body.innerHTML += "I like technology.<br/><br/>";
    body.innerHTML += "Most days my favorite color is <span class='green'>green</span>.<br/><br/>";

    return [ body ];
  }

  function setContents(contents) {
    const contentBody = document.getElementById("content-body");
    contentBody.innerHTML = "";
    contents.forEach(function(c) { contentBody.append(c); });
  }

  function setup() {
    document.getElementById("about-link").onclick = function() {
      // state = 1;
      rotateDeg = "rotate45";
      setContents(getAboutContents());
      document.getElementById("overlay-c").className = rotateDeg + "-open";
      document.getElementById("overlay-d").className = rotateDeg + "-open";
    };
    document.getElementById("projects-link").onclick = function() {
      // state = 2;
      rotateDeg = "rotate-45";
      setContents(getProjectsContents());
      document.getElementById("overlay-c").className = rotateDeg + "-open";
      document.getElementById("overlay-d").className = rotateDeg + "-open";
    };
    document.getElementById("contact-link").onclick = function() {
      // state = 3;
      rotateDeg = "rotate135";
      setContents(getContactContents());
      document.getElementById("overlay-c").className = rotateDeg + "-open";
      document.getElementById("overlay-d").className = rotateDeg + "-open";
    };
    document.getElementById("home-link").onclick = function() {
      // state = 0;
      document.getElementById("overlay-c").className = "close-" + rotateDeg;
      document.getElementById("overlay-d").className = "close-" + rotateDeg;
    };
  }

  setup();
}());