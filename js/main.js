/* ============================================================
   SWDL Drugstore — interactive behaviour
   Auto-playing hero slider, rotating testimonials, product
   filters, mini cart, mobile nav and toast notifications.
   ============================================================ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Dynamic copyright year ---------- */
  document.querySelectorAll(".js-year").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---------- Mobile navigation ---------- */
  var navToggle = document.getElementById("navToggle");
  var siteNav = document.getElementById("siteNav");
  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      siteNav.classList.toggle("open");
      navToggle.textContent = siteNav.classList.contains("open") ? "✕" : "☰";
    });
  }

  /* ---------- Toast ---------- */
  var toastEl = document.getElementById("toast");
  var toastTimer = null;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove("show");
    }, 2600);
  }

  /* ---------- Auto-playing hero slider ----------
     Markup contract:
     <section data-slider data-interval="4500">
       <div class="hero-slide is-active">…</div> …
       <div class="hero-dots"></div>
       <button class="hero-arrow prev">‹</button>
       <button class="hero-arrow next">›</button>
     </section> */
  document.querySelectorAll("[data-slider]").forEach(function (slider) {
    var slides = Array.prototype.slice.call(slider.querySelectorAll(".hero-slide"));
    var dotsWrap = slider.querySelector(".hero-dots");
    var interval = parseInt(slider.getAttribute("data-interval") || "4500", 10);
    var index = 0;
    var timer = null;

    if (slides.length < 2) return;

    /* build dots */
    var dots = slides.map(function (_, i) {
      var d = document.createElement("button");
      d.className = "hero-dot" + (i === 0 ? " is-active" : "");
      d.setAttribute("aria-label", "Go to slide " + (i + 1));
      d.addEventListener("click", function () {
        go(i);
        restart();
      });
      if (dotsWrap) dotsWrap.appendChild(d);
      return d;
    });

    function go(i) {
      slides[index].classList.remove("is-active");
      dots[index].classList.remove("is-active");
      index = (i + slides.length) % slides.length;
      slides[index].classList.add("is-active");
      dots[index].classList.add("is-active");
    }

    function next() { go(index + 1); }
    function prev() { go(index - 1); }

    function start() {
      if (reduceMotion) return;
      stop();
      timer = setInterval(next, interval);
    }
    function stop() {
      if (timer) clearInterval(timer);
      timer = null;
    }
    function restart() {
      if (timer) start();
    }

    var nextBtn = slider.querySelector(".hero-arrow.next");
    var prevBtn = slider.querySelector(".hero-arrow.prev");
    if (nextBtn) nextBtn.addEventListener("click", function () { next(); restart(); });
    if (prevBtn) prevBtn.addEventListener("click", function () { prev(); restart(); });

    /* pause while the pointer is over the slider */
    slider.addEventListener("mouseenter", stop);
    slider.addEventListener("mouseleave", start);

    start();
  });

  /* ---------- Auto-rotating testimonials ----------
     Markup: <div data-rotate data-interval="5000"> children .testi-item */
  document.querySelectorAll("[data-rotate]").forEach(function (box) {
    var items = Array.prototype.slice.call(box.querySelectorAll(".testi-item"));
    if (items.length < 2) return;
    var i = 0;
    if (!reduceMotion) {
      setInterval(function () {
        items[i].classList.remove("is-active");
        i = (i + 1) % items.length;
        items[i].classList.add("is-active");
      }, parseInt(box.getAttribute("data-interval") || "5000", 10));
    }
  });

  /* ---------- Product category filter ---------- */
  var filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      var cat = btn.getAttribute("data-filter");
      document.querySelectorAll(".product-card").forEach(function (card) {
        var show = cat === "all" || card.getAttribute("data-category") === cat;
        card.style.display = show ? "" : "none";
      });
    });
  });

  /* ---------- Mini cart ---------- */
  var cartCount = 0;
  var cartCountEl = document.getElementById("cartCount");
  document.querySelectorAll(".add-to-cart").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      cartCount += 1;
      if (cartCountEl) cartCountEl.textContent = String(cartCount);
      var name = btn.getAttribute("data-name") || "Item";
      toast("🛒 " + name + " added to your cart");
    });
  });
  var cartBtn = document.getElementById("cartBtn");
  if (cartBtn) {
    cartBtn.addEventListener("click", function (e) {
      e.preventDefault();
      toast(cartCount === 0
        ? "Your cart is empty — add some products!"
        : "You have " + cartCount + " item" + (cartCount > 1 ? "s" : "") + " in your cart.");
    });
  }

  /* ---------- Contact form (demo submit) ---------- */
  var contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      toast("✅ Thank you! Your message has been sent to SWDL.");
      contactForm.reset();
    });
  }

  /* ---------- Newsletter (demo submit) ---------- */
  document.querySelectorAll(".newsletter-form").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      toast("💌 Subscribed! Watch your inbox for SWDL offers.");
      form.reset();
    });
  });
})();
