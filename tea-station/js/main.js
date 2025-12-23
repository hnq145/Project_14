import { partnerLogos, productList, partnerLogoBasePath } from "./data.js";

/* ================ 
    Nav
  =================== */
$(function () {
  // hide show nav
  $(".navbar").hidescroll();

  // mobile dropdown menu
  const toggleBtn = $("#toggle_btn");
  const dropdownMenu = $(".dropdown-menu");

  toggleBtn.click(() => {
    dropdownMenu.toggleClass("open");
  });
});

/* ================ 
    Partner Logos
  =================== */
$(function () {
  const container = document.getElementById("partner-logo-list");

  for (let i = 0; i < 2; i++) {
    partnerLogos.forEach((logo) => {
      const img = document.createElement("img");
      img.src = partnerLogoBasePath + logo.fileName;
      img.alt = logo.alt;
      img.classList.add("logo-ticker-image");
      container.appendChild(img);
    });
  }
});

/* ================ 
    Products
  =================== */
$(function () {
  // thêm activeTab vào li đầu tiên
  $("li:first").addClass("activeTab");

  // đổi màu activeTab
  $("li").on("click", function () {
    $("li").removeClass("activeTab");
    $('div[id="products-tabs"] ul .r-tabs-state-active').addClass("activeTab");
  });

  $("#products-tabs").responsiveTabs({
    animation: "slide",
  });
});

/* ================ 
   Best Sellers
  =================== */
$(function () {
  $(".slider").slick({
    autoplay: true,
    dots: true,
  });
});

/* ================ 
 Stats
  =================== */
$(function () {
  const counterUp = window.counterUp.default;

  const callback = (entries) => {
    entries.forEach((entry) => {
      const el = entry.target;
      if (entry.isIntersecting && !el.classList.contains("is-visible")) {
        counterUp(el, {
          duration: 2000,
          delay: 16,
        });
        el.classList.add("is-visible");
      }
    });
  };

  const IO = new IntersectionObserver(callback, { threshold: 1 });

  const el = document
    .querySelectorAll(".counter")
    .forEach((node) => IO.observe(node));
});

/* ================ 
  Tất Cả Sản Phẩm
  =================== */
$(function () {
  productList.map((product) => {
    $("#product-items--container").append(`
      <div data-filterable data-filter-category=${product.category}
 class="relative col-span-3 overflow-hidden group hover:shadow-md">
                <div class="portfolio-item">
                  <div>
                    <img
                      src=${product.img}
                      alt="product-img"
                    />

                    <div class="product-item-overlay">
                      <div class="product-details">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
      `);
  });

  $.fn.filterjitsu();

  // xử lý active tab
  function getAllUrlParam(url) {
    url = url || window.location.href;

    const param = {};

    const queryString = url.split("?")[1];

    if (!queryString) {
      return param;
    }

    const [key, value] = queryString.split("=");

    if (key) {
      param[key] = value ? value : "";
    }

    return param;
  }

  const urlParam = getAllUrlParam();

  $("#allProduct-filters a").removeClass("activeFilter");

  const category = urlParam["filter-category"];

  switch (category) {
    case "whitetea":
      $("#f-whitetea").addClass("activeFilter");
      break;
    case "blacktea":
      $("#f-blacktea").addClass("activeFilter");
      break;
    case "oolong":
      $("#f-oolong").addClass("activeFilter");
      break;
    case "matcha":
      $("#f-matcha").addClass("activeFilter");
      break;
    default:
      $("#f-all").addClass("activeFilter");
      break;
  }
});

/* ================ 
  AOS Animation
  =================== */
$(function () {
  AOS.init();

  // You can also pass an optional settings object
  // below listed default settings
  AOS.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
    initClassName: "aos-init", // class applied after initialization
    animatedClassName: "aos-animate", // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 100, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 700, // values from 0 to 3000, with step 50ms
    easing: "ease-in-out", // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: true, // whether elements should animate out while scrolling past them
    anchorPlacement: "center-bottom", // defines which position of the element regarding to window should trigger the animation
  });
});

/* ================ 
  Particles JS
  =================== */
$(function () {
  if (document.getElementById("particles-js")) {
    particlesJS("particles-js", {
      particles: {
        number: { value: 30, density: { enable: true, value_area: 800 } },
        color: { value: "#10b981" }, // Emerald-500 tea leaf color
        shape: {
          type: "circle", // approximate tea leaf or drop
          stroke: { width: 0, color: "#000000" },
          polygon: { nb_sides: 5 },
        },
        opacity: {
          value: 0.3,
          random: true,
          anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
        },
        size: {
          value: 6,
          random: true,
          anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
        },
        line_linked: {
          enable: false,
        },
        move: {
          enable: true,
          speed: 2,
          direction: "bottom-right", // Falling leaf effect
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: { enable: false, rotateX: 600, rotateY: 1200 },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "repulse" },
          onclick: { enable: true, mode: "push" },
          resize: true,
        },
        modes: {
          repulse: { distance: 100, duration: 0.4 },
          push: { particles_nb: 4 },
        },
      },
      retina_detect: true,
    });
  }
});

/* ================ 
  Preloader
  =================== */
$(window).on("load", function () {
  const preloader = $("#preloader");
  if (preloader.length) {
    preloader.css("opacity", "0");
    setTimeout(() => {
      preloader.remove();
    }, 500);
  }
});

/* ================ 
  Scroll To Top
  =================== */
$(function () {
  const scrollToTopBtn = $("#scrollToTop");

  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 300) {
      scrollToTopBtn.addClass("show-scroll");
    } else {
      scrollToTopBtn.removeClass("show-scroll");
    }
  });

  scrollToTopBtn.click(function () {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
  });
});

/* ================ 
  Toast Notification
  =================== */
function showToast(message) {
  // Remove existing toast if any
  $(".toast").remove();

  // Create toast element
  const toast = $(`
    <div class="toast">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      <span>${message}</span>
    </div>
  `);

  $("body").append(toast);

  // Show
  setTimeout(() => toast.addClass("show"), 100);

  // Hide after 3s
  setTimeout(() => {
    toast.removeClass("show");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Add simple interactivity to Buy buttons
$(function () {
  $(".btn").on("click", function (e) {
    // If it's a real link, let it go (unless it's just #)
    const href = $(this).attr("href");
    if (href === "#" || href.startsWith("#")) {
      // e.preventDefault(); // Uncomment if we don't want to jump
    }

    // Only show toast for "Add to Cart" or similar if they existed,
    // but here we can generic "Action"
    if ($(this).text().trim().toLowerCase().includes("sản phẩm")) {
      // Maybe not spam toast on navigation
    }
  });

  // Example: Add click event to Feature Cards
  $(".feature-card").on("click", function () {
    // showToast("Tính năng này rất tuyệt vời!");
  });
});
