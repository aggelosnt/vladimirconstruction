document.addEventListener("DOMContentLoaded", function () {
  const langToggle = document.getElementById("langToggle");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("primary-nav-links");

  function closeMenu() {
    if (!menuToggle || !navLinks) return;

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    navLinks.classList.remove("is-open");
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
      navLinks.classList.toggle("is-open", !isOpen);
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });
  }
  
  if (langToggle) {
    langToggle.addEventListener("click", function () {
      const isEnglish = document.body.classList.contains("lang-en");
      if (isEnglish) {
        document.body.classList.remove("lang-en");
        document.body.classList.add("lang-el");
        document.documentElement.lang = 'el';
        document.title = 'Vladimir Constructions | Κατασκευασμένα για να αντέχουν';
        langToggle.textContent = 'EN';
      } else {
        document.body.classList.remove("lang-el");
        document.body.classList.add("lang-en");
        document.documentElement.lang = 'en';
        document.title = 'Vladimir Constructions | Built to Outlast';
        langToggle.textContent = 'EL';
      }
      
      // Update lightbox caption if open during toggle
      if (lb.open && visibleShots().length) {
        show(cur);
      }
    });
  }

  const shots = Array.from(document.querySelectorAll(".shot"));
  const tabs = Array.from(document.querySelectorAll(".tab"));
  const lb = document.getElementById("lb");
  const img = document.getElementById("lbImg");
  const cap = document.getElementById("lbCap");
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");
  const close = document.getElementById("close");

  if (
    !shots.length ||
    !tabs.length ||
    !lb ||
    !img ||
    !cap ||
    !prev ||
    !next ||
    !close
  ) {
    console.error("Vladimir Constructions: required gallery elements were not found.");
    return;
  }

  let cur = 0;

  function visibleShots() {
    return shots.filter((shot) => !shot.hidden);
  }

  function updateFilter(activeTab) {
    tabs.forEach((tab) => {
      tab.setAttribute("aria-pressed", String(tab === activeTab));
    });

    const filter = activeTab.dataset.f;

    shots.forEach((shot) => {
      shot.hidden = filter !== "all" && shot.dataset.c !== filter;
    });
  }

  function show(index) {
    const visible = visibleShots();

    if (!visible.length) return;

    cur = (index + visible.length) % visible.length;

    const shot = visible[cur];
    const image = shot.querySelector(".img");
    const titleContainer = shot.querySelector(".shot-title");

    if (!image || !titleContainer) return;

    img.style.backgroundImage = image.style.backgroundImage;
    
    // Safely extract the title string depending on current language, omitting <em>
    const activeSpanClass = document.body.classList.contains("lang-el") ? ".el" : ".en";
    const activeSpan = titleContainer.querySelector(activeSpanClass);
    
    if (activeSpan) {
      const clone = activeSpan.cloneNode(true);
      const em = clone.querySelector("em");
      if (em) em.remove();
      cap.textContent = clone.textContent.trim();
    }
  }

  // Gallery filters
  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      updateFilter(tab);
    });
  });

  // Open lightbox
  shots.forEach((shot) => {
    shot.addEventListener("click", function () {
      const visible = visibleShots();
      const index = visible.indexOf(shot);

      if (index !== -1) {
        show(index);
        lb.showModal();
      }
    });
  });

  // Previous image
  prev.addEventListener("click", function () {
    show(cur - 1);
  });

  // Next image
  next.addEventListener("click", function () {
    show(cur + 1);
  });

  // Close lightbox
  close.addEventListener("click", function () {
    lb.close();
  });

  // Close when clicking outside the image area
  lb.addEventListener("click", function (event) {
    if (event.target === lb) {
      lb.close();
    }
  });

  // Keyboard controls
  lb.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight") {
      show(cur + 1);
    } else if (event.key === "ArrowLeft") {
      show(cur - 1);
    } else if (event.key === "Escape") {
      lb.close();
    }
  });
});