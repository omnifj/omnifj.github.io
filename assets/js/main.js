(function () {
  var navbar = document.getElementById("navbar");
  var progressBar = document.getElementById("progress-bar");
  var backToTop = document.getElementById("back-to-top");
  var menuToggle = document.getElementById("menu-toggle");
  var navLinks = document.getElementById("nav-links");

  window.addEventListener(
    "scroll",
    function () {
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      var scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      var progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

      progressBar.style.width = progress + "%";
      navbar.classList.toggle("scrolled", scrollTop > 10);
      backToTop.classList.toggle("visible", scrollTop > 400);
    },
    { passive: true }
  );

  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  var heroWord = document.getElementById("hero-word");
  if (heroWord) {
    var reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    var words = (heroWord.getAttribute("data-words") || "")
      .split("|")
      .filter(Boolean);

    if (!reduceMotion && words.length > 1) {
      var wordIndex = 0;
      setInterval(function () {
        heroWord.classList.add("swap-out");
        setTimeout(function () {
          wordIndex = (wordIndex + 1) % words.length;
          heroWord.textContent = words[wordIndex];
          heroWord.classList.remove("swap-out");
          heroWord.classList.add("swap-in");
          setTimeout(function () {
            heroWord.classList.remove("swap-in");
          }, 450);
        }, 330);
      }, 2800);
    }
  }
})();
