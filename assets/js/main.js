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
})();
