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

  /* ================ 
   Testimonials
  =================== */
  $(".testimonial-slider").slick({
    autoplay: true,
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
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
 class="overflow-hidden relative col-span-3 group hover:shadow-md">
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
   Countdown Timer
  =================== */
$(function () {
  const deadline = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).getTime(); // 3 days from now

  const x = setInterval(function () {
    const now = new Date().getTime();
    const distance = deadline - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    $("#days").text(days < 10 ? "0" + days : days);
    $("#hours").text(hours < 10 ? "0" + hours : hours);
    $("#minutes").text(minutes < 10 ? "0" + minutes : minutes);
    $("#seconds").text(seconds < 10 ? "0" + seconds : seconds);

    if (distance < 0) {
      clearInterval(x);
      $("#countdown").html(
        '<h2 class="text-2xl font-bold">Ưu Đãi Đã Kết Thúc!</h2>'
      );
    }
  }, 1000);
});

/* ================ 
   FAQ Accordion
  =================== */
$(function () {
  $(".faq-btn").click(function () {
    $(this).next(".faq-content").slideToggle(300);
    $(this).find(".icon").toggleClass("rotate-180");
    $(".faq-btn").not(this).next(".faq-content").slideUp(300);
    $(".faq-btn").not(this).find(".icon").removeClass("rotate-180");
  });
});

/* ================ 
   Back to Top
  =================== */
$(function () {
  const backToTopBtn = $("#backToTop");

  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      backToTopBtn.removeClass("hidden").addClass("block");
    } else {
      backToTopBtn.removeClass("block").addClass("hidden");
    }
  });

  backToTopBtn.click(function () {
    $("html, body").animate({ scrollTop: 0 }, 800);
    return false;
  });
});

/* ================ 
   Cookie Consent
  =================== */
$(function () {
  const cookieConsent = $("#cookieConsent");
  const acceptBtn = $("#acceptCookie");
  const declineBtn = $("#declineCookie");

  if (!localStorage.getItem("cookieConsent")) {
    setTimeout(() => {
      cookieConsent.removeClass("translate-y-full");
    }, 2000);
  }

  acceptBtn.click(function () {
    localStorage.setItem("cookieConsent", "accepted");
    cookieConsent.addClass("translate-y-full");
    showToast("Bạn đã chấp nhận cookie.", "success");
  });

  declineBtn.click(function () {
    localStorage.setItem("cookieConsent", "declined");
    cookieConsent.addClass("translate-y-full");
    showToast("Bạn đã từ chối cookie.", "info");
  });
});

/* ================ 
   Toast Notification
  =================== */
function showToast(message, type = "info") {
  const icon =
    type === "success"
      ? '<i class="fas fa-check-circle"></i>'
      : '<i class="fas fa-info-circle"></i>';
  const color = type === "success" ? "bg-green-500" : "bg-blue-500";

  const toast = $(`
    <div class="flex items-center gap-3 px-6 py-4 text-white rounded-lg shadow-lg transform transition-all duration-300 translate-x-full ${color}">
      ${icon}
      <span>${message}</span>
    </div>
  `);

  $("#toast-container").append(toast);

  // Animate in
  setTimeout(() => {
    toast.removeClass("translate-x-full");
  }, 100);

  // Remove after 3 seconds
  setTimeout(() => {
    toast.addClass("translate-x-full");
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

/* ================ 
   Dark Mode Toggle
  =================== */
$(function () {
  const toggleBtn = $("#darkModeToggle");
  const html = $("html");
  const icon = toggleBtn.find("i");

  // Check valid
  if (localStorage.getItem("theme") === "dark") {
    html.addClass("dark");
    icon.removeClass("fa-moon").addClass("fa-sun");
  }

  toggleBtn.click(function () {
    if (html.hasClass("dark")) {
      html.removeClass("dark");
      localStorage.setItem("theme", "light");
      icon.removeClass("fa-sun").addClass("fa-moon");
    } else {
      html.addClass("dark");
      localStorage.setItem("theme", "dark");
      icon.removeClass("fa-moon").addClass("fa-sun");
    }
  });
});
