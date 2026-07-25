// Mobile navigation toggle. Kept as a static file rather than an Astro
// component script so the Content-Security-Policy can forbid inline scripts.
(function () {
  var burger = document.querySelector(".burger");
  var panel = document.getElementById("m-nav");
  if (!burger || !panel) return;
  burger.addEventListener("click", function () {
    var open = burger.getAttribute("aria-expanded") === "true";
    burger.setAttribute("aria-expanded", String(!open));
    panel.hidden = open;
  });
})();
