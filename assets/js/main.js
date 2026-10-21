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

  var heroIndex = document.querySelector(".hero-index");
  if (heroIndex) {
    var statusText = heroIndex.querySelector(".writing-status-text");
    if (statusText) {
      var idleStatus = statusText.textContent;
      var alertStatus = statusText.getAttribute("data-alert") || idleStatus;
      var isHovering = false;
      var isFocused = false;
      var syncStatus = function () {
        statusText.textContent =
          isHovering || isFocused ? alertStatus : idleStatus;
      };

      heroIndex.addEventListener("mouseenter", function () {
        isHovering = true;
        syncStatus();
      });

      heroIndex.addEventListener("mouseleave", function () {
        isHovering = false;
        syncStatus();
      });

      heroIndex.addEventListener("focusin", function () {
        isFocused = true;
        syncStatus();
      });

      heroIndex.addEventListener("focusout", function (event) {
        if (!heroIndex.contains(event.relatedTarget)) {
          isFocused = false;
          syncStatus();
        }
      });
    }
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
