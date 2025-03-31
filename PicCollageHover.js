function initPicCollageHover(containerSelector) {
  let isScriptActive = false;

  function enableHoverEffects(container) {
    const images = container.querySelectorAll("img");

    images.forEach((img, index) => {
      img.addEventListener("mouseenter", function onMouseEnter() {
        images.forEach((el, i) => {
          if (i < index) {
            el.style.transform = "perspective(9rem) rotateY(5deg)";
            el.style.opacity = "1";
            el.style.zIndex = "1";
            el.style.transition = "transform 0.3s ease-in-out";
          } else if (i > index) {
            el.style.transform = "perspective(9rem) rotateY(-5deg)";
            el.style.opacity = "1";
            el.style.zIndex = "1";
            el.style.transition = "transform 0.3s ease-in-out";
          } else {
            el.style.transform = "scale(1.3)";
            el.style.zIndex = "10";
            el.style.transition = "transform 0.3s ease-in-out";
          }
        });
      });

      img.addEventListener("mouseleave", function onMouseLeave() {
        images.forEach((el) => {
          el.style.transform = "scale(1)";
          el.style.opacity = "1";
        });
      });

      img.dataset.hoverEnabled = "true";
    });

    isScriptActive = true;
  }

  function disableHoverEffects(container) {
    const images = container.querySelectorAll("img");

    images.forEach((el) => {
      el.style.transform = "scale(1)";
      el.style.opacity = "1";
      el.style.zIndex = "1";

      if (el.dataset.hoverEnabled) {
        el.replaceWith(el.cloneNode(true));
        delete el.dataset.hoverEnabled;
      }
    });

    isScriptActive = false;
  }

  function handleHoverEffects() {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    if (window.innerWidth < 900 && isScriptActive) {
      disableHoverEffects(container);
    } else if (window.innerWidth >= 900 && !isScriptActive) {
      enableHoverEffects(container);
    }
  }

  window.addEventListener("load", handleHoverEffects);
  window.addEventListener("resize", handleHoverEffects);
}
