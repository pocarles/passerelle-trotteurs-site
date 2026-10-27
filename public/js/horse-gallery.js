// Photo galleries on horse profiles. Kept as a static file so it follows the
// same CSP-safe loading path as the site's navigation script.
(function () {
  document.querySelectorAll("[data-horse-gallery]").forEach(function (gallery) {
    var slides = Array.from(gallery.querySelectorAll("[data-gallery-slide]"));
    var dots = Array.from(gallery.querySelectorAll("[data-gallery-dot]"));
    var current = gallery.querySelector("[data-gallery-current]");
    var previous = gallery.querySelector("[data-gallery-prev]");
    var next = gallery.querySelector("[data-gallery-next]");

    if (!slides.length) return;

    var activeIndex = 0;

    function adaptFrame(slide, slideIndex) {
      var image = slide.querySelector("img");
      if (!image) return;

      function applyImageRatio() {
        if (slideIndex !== activeIndex || !image.naturalWidth || !image.naturalHeight) return;

        gallery.style.setProperty(
          "--gallery-ratio",
          image.naturalWidth + " / " + image.naturalHeight
        );
        gallery.setAttribute(
          "data-gallery-orientation",
          image.naturalHeight > image.naturalWidth ? "portrait" : "landscape"
        );
      }

      if (image.complete) applyImageRatio();
      else image.addEventListener("load", applyImageRatio, { once: true });
    }

    function show(index) {
      activeIndex = (index + slides.length) % slides.length;

      slides.forEach(function (slide, slideIndex) {
        var isActive = slideIndex === activeIndex;
        slide.hidden = !isActive;
        slide.setAttribute("aria-hidden", isActive ? "false" : "true");
      });

      dots.forEach(function (dot, dotIndex) {
        dot.setAttribute("aria-current", dotIndex === activeIndex ? "true" : "false");
      });

      if (current) current.textContent = String(activeIndex + 1);
      adaptFrame(slides[activeIndex], activeIndex);
    }

    if (previous && next) {
      previous.addEventListener("click", function () {
        show(activeIndex - 1);
      });
      next.addEventListener("click", function () {
        show(activeIndex + 1);
      });
    }
    dots.forEach(function (dot, index) {
      dot.addEventListener("click", function () {
        show(index);
      });
    });

    show(0);
  });
})();
