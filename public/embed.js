(function () {
  function loadTestimonials(boardId, options) {
    const script = document.currentScript;
    const container = document.createElement("div");
    container.id = "testimonial-widget-" + boardId;
    script.parentNode.insertBefore(container, script);

    const iframe = document.createElement("iframe");
    iframe.style.width = "100%";
    iframe.style.height = "0";
    iframe.style.border = "none";
    iframe.style.overflow = "hidden";

    const params = new URLSearchParams(options);
    iframe.src = `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/embed/${boardId}?${params.toString()}`;

    container.appendChild(iframe);

    window.addEventListener(
      "message",
      function (event) {
        if (event.origin !== process.env.NEXT_PUBLIC_BASE_URL) return;
        if (event.data.type === "testimonial-height") {
          iframe.style.height = event.data.height + "px";
        }
      },
      false
    );
  }

  window.TestimonialWidget = { load: loadTestimonials };
})();
