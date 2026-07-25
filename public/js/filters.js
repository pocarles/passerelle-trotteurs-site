// Client-side filtering for the horse listing. Progressive: with JS disabled
// every horse stays visible, which is the correct fallback for a listing.
(function () {
  var chips = document.querySelectorAll(".chip[data-filter]");
  var grid = document.getElementById("horse-grid");
  var none = document.getElementById("horse-none");
  if (!chips.length || !grid) return;
  var items = grid.querySelectorAll(".grid__item");

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var want = chip.getAttribute("data-filter");
      chips.forEach(function (c) { c.classList.toggle("is-on", c === chip); });
      var shown = 0;
      items.forEach(function (item) {
        var match = want === "tous" || item.getAttribute("data-statut") === want;
        item.hidden = !match;
        if (match) shown++;
      });
      if (none) none.hidden = shown > 0;
    });
  });
})();
