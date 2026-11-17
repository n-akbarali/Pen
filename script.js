const themeToggleBtn = document.getElementById("themeToggleBtn");

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", function () {
    const isPaper = document.body.classList.toggle("theme-paper");
    const icon = themeToggleBtn.querySelector("i");

    if (icon) {
      if (isPaper) {
        icon.className = "fa-solid fa-moon";
      } else {
        icon.className = "fa-solid fa-sun";
      }
    }
  });
}

const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinksBox = document.getElementById("navLinks");

if (mobileMenuBtn && navLinksBox) {
  mobileMenuBtn.addEventListener("click", function () {
    navLinksBox.classList.toggle("open");
  });
}

const filterButtons = document.querySelectorAll(".filter-btn");
const collectionCards = document.querySelectorAll(".collection-card");
const penCards = document.querySelectorAll(".pen-card");

const filterBanner = document.getElementById("filterBanner");
const filterBannerText = document.getElementById("filterBannerText");
const resetFilterBtn = document.getElementById("resetFilterBtn");
const catalogSection = document.getElementById("katalog");

function clearActiveButtons() {
  for (let i = 0; i < filterButtons.length; i++) {
    filterButtons[i].classList.remove("active");
  }
  for (let i = 0; i < collectionCards.length; i++) {
    collectionCards[i].classList.remove("active");
  }
}

for (let i = 0; i < filterButtons.length; i++) {
  filterButtons[i].addEventListener("click", function () {
    const selectedCategory = filterButtons[i].getAttribute("data-category");

    clearActiveButtons();
    filterButtons[i].classList.add("active");

    let count = 0;

    for (let j = 0; j < penCards.length; j++) {
      const pen = penCards[j];

      if (selectedCategory === "all") {
        pen.style.display = "block";
        count = count + 1;
      } else if (pen.classList.contains(selectedCategory)) {
        pen.style.display = "block";
        count = count + 1;
      } else {
        pen.style.display = "none";
      }
    }

    if (filterBanner && filterBannerText) {
      if (selectedCategory === "all") {
        filterBanner.hidden = true;
      } else {
        filterBanner.hidden = false;
        filterBannerText.textContent = "Tanlangan turkum: " + filterButtons[i].textContent + " (" + count + " ta model)";
      }
    }

    if (filterButtons[i].getAttribute("data-scroll") === "true" && catalogSection) {
      catalogSection.scrollIntoView({ behavior: "smooth" });
    }
  });
}

for (let i = 0; i < collectionCards.length; i++) {
  collectionCards[i].addEventListener("click", function () {
    const selectedCategory = collectionCards[i].getAttribute("data-category");
    const collectionName = collectionCards[i].getAttribute("data-collection-name");

    clearActiveButtons();
    collectionCards[i].classList.add("active");

    let count = 0;

    for (let j = 0; j < penCards.length; j++) {
      const pen = penCards[j];

      if (pen.classList.contains(selectedCategory)) {
        pen.style.display = "block";
        count = count + 1;
      } else {
        pen.style.display = "none";
      }
    }

    if (filterBanner && filterBannerText) {
      filterBanner.hidden = false;
      filterBannerText.textContent = "Kolleksiya: " + collectionName + " — " + count + " ta model";
    }

    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: "smooth" });
    }
  });
}

if (resetFilterBtn) {
  resetFilterBtn.addEventListener("click", function () {
    clearActiveButtons();
    if (filterButtons.length > 0) {
      filterButtons[0].classList.add("active");
    }

    for (let i = 0; i < penCards.length; i++) {
      penCards[i].style.display = "block";
    }

    if (filterBanner) {
      filterBanner.hidden = true;
    }

    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
      searchInput.value = "";
    }
  });
}

const searchInput = document.getElementById("searchInput");

if (searchInput) {
  searchInput.addEventListener("input", function () {
    const query = searchInput.value.toLowerCase().trim();

    for (let i = 0; i < penCards.length; i++) {
      const pen = penCards[i];
      const title = pen.querySelector(".pen-title").textContent.toLowerCase();
      const subtitle = pen.querySelector(".pen-subtitle").textContent.toLowerCase();

      if (title.indexOf(query) !== -1 || subtitle.indexOf(query) !== -1) {
        pen.style.display = "block";
      } else {
        pen.style.display = "none";
      }
    }
  });
}

const cartBadge = document.getElementById("cartBadge");
const cartTotalAmount = document.getElementById("cartTotalAmount");
const cartItemsList = document.getElementById("cartItemsList");

function updateCartSummary() {
  let totalCount = 0;
  let totalPrice = 0;
  let listText = "";

  for (let i = 0; i < penCards.length; i++) {
    const pen = penCards[i];
    const qtyEl = pen.querySelector(".qty-val");
    const qty = Number(qtyEl.textContent);
    const price = Number(pen.getAttribute("data-price"));
    const title = pen.querySelector(".pen-title").textContent;

    if (qty > 0) {
      totalCount = totalCount + qty;
      totalPrice = totalPrice + (price * qty);
      listText = listText + title + " — " + qty + " dona (" + (price * qty).toLocaleString("ru-RU") + " so'm)\n";
    }
  }

  if (cartBadge) {
    cartBadge.textContent = totalCount;
  }

  if (cartTotalAmount) {
    cartTotalAmount.textContent = totalPrice.toLocaleString("ru-RU") + " so'm";
  }

  if (cartItemsList) {
    if (totalCount === 0) {
      cartItemsList.textContent = "Savatchangiz hozircha bo'sh";
    } else {
      cartItemsList.textContent = listText;
    }
  }
}

for (let i = 0; i < penCards.length; i++) {
  const pen = penCards[i];
  const addBtn = pen.querySelector(".btn-add-cart");
  const stepper = pen.querySelector(".qty-stepper");
  const plusBtn = pen.querySelector(".btn-plus");
  const minusBtn = pen.querySelector(".btn-minus");
  const qtyVal = pen.querySelector(".qty-val");

  if (addBtn && stepper && qtyVal) {
    addBtn.addEventListener("click", function () {
      qtyVal.textContent = 1;
      addBtn.style.display = "none";
      stepper.style.display = "flex";
      updateCartSummary();
    });
  }

  if (plusBtn && qtyVal) {
    plusBtn.addEventListener("click", function () {
      let currentQty = Number(qtyVal.textContent);
      currentQty = currentQty + 1;
      qtyVal.textContent = currentQty;
      updateCartSummary();
    });
  }

  if (minusBtn && qtyVal && addBtn && stepper) {
    minusBtn.addEventListener("click", function () {
      let currentQty = Number(qtyVal.textContent);

      if (currentQty > 1) {
        currentQty = currentQty - 1;
        qtyVal.textContent = currentQty;
      } else {
        qtyVal.textContent = 0;
        stepper.style.display = "none";
        addBtn.style.display = "inline-flex";
      }

      updateCartSummary();
    });
  }
}

const cartDrawer = document.getElementById("cartDrawer");
const openCartBtn = document.getElementById("openCartBtn");
const closeCartBtn = document.getElementById("closeCartBtn");
const checkoutBtn = document.getElementById("checkoutBtn");
const toastBox = document.getElementById("toastBox");
const toastText = document.getElementById("toastText");
let toastTimer = null;

function showToast(message) {
  if (toastBox && toastText) {
    toastText.textContent = message;
    toastBox.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastBox.classList.remove("show");
    }, 3000);
  }
}

if (openCartBtn && cartDrawer) {
  openCartBtn.addEventListener("click", function () {
    cartDrawer.classList.add("open");
  });
}

if (closeCartBtn && cartDrawer) {
  closeCartBtn.addEventListener("click", function () {
    cartDrawer.classList.remove("open");
  });
}

if (checkoutBtn) {
  checkoutBtn.addEventListener("click", function () {
    const totalItems = Number(cartBadge.textContent);

    if (totalItems === 0) {
      showToast("Avval savatchaga model qo'shing!");
    } else {
      for (let i = 0; i < penCards.length; i++) {
        const pen = penCards[i];
        const addBtn = pen.querySelector(".btn-add-cart");
        const stepper = pen.querySelector(".qty-stepper");
        const qtyVal = pen.querySelector(".qty-val");

        if (qtyVal) {
          qtyVal.textContent = 0;
        }
        if (stepper) {
          stepper.style.display = "none";
        }
        if (addBtn) {
          addBtn.style.display = "inline-flex";
        }
      }

      updateCartSummary();

      if (cartDrawer) {
        cartDrawer.classList.remove("open");
      }

      showToast("Buyurtmangiz qabul qilindi! Tez orada bog'lanamiz.");
    }
  });
}

const newsletterInput = document.getElementById("newsletterInput");
const newsletterBtn = document.getElementById("newsletterBtn");

if (newsletterBtn && newsletterInput) {
  newsletterBtn.addEventListener("click", function () {
    const email = newsletterInput.value.trim();

    if (email === "" || email.indexOf("@") === -1) {
      showToast("Iltimos, to'g'ri email manzilini kiriting!");
    } else {
      newsletterInput.value = "";
      showToast("FAKER yangiliklariga muvaffaqiyatli obuna bo'ldingiz!");
    }
  });
}

const quickModal = document.getElementById("quickModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const quickViewButtons = document.querySelectorAll(".btn-quick-view");

for (let i = 0; i < quickViewButtons.length; i++) {
  quickViewButtons[i].addEventListener("click", function () {
    const card = penCards[i];
    if (quickModal && card) {
      document.getElementById("modalTitle").textContent = card.querySelector(".pen-title").textContent;
      document.getElementById("modalSubtitle").textContent = card.querySelector(".pen-subtitle").textContent;
      document.getElementById("modalMaterial").textContent = card.getAttribute("data-material");
      document.getElementById("modalNib").textContent = card.getAttribute("data-nib");
      document.getElementById("modalPrice").textContent = card.querySelector(".price-now").textContent;
      document.getElementById("modalDesc").textContent = card.getAttribute("data-desc");
      quickModal.classList.add("open");
    }
  });
}

if (closeModalBtn && quickModal) {
  closeModalBtn.addEventListener("click", function () {
    quickModal.classList.remove("open");
  });
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    if (quickModal) {
      quickModal.classList.remove("open");
    }
    if (cartDrawer) {
      cartDrawer.classList.remove("open");
    }
    if (navLinksBox) {
      navLinksBox.classList.remove("open");
    }
  }
});

const reviewSlides = document.querySelectorAll(".review-slide");
const reviewDots = document.querySelectorAll(".review-dot");
let currentSlide = 0;

function showSlide(index) {
  if (index >= reviewSlides.length) {
    currentSlide = 0;
  } else if (index < 0) {
    currentSlide = reviewSlides.length - 1;
  } else {
    currentSlide = index;
  }

  for (let i = 0; i < reviewSlides.length; i++) {
    if (i === currentSlide) {
      reviewSlides[i].classList.add("active");
    } else {
      reviewSlides[i].classList.remove("active");
    }
  }

  for (let i = 0; i < reviewDots.length; i++) {
    if (i === currentSlide) {
      reviewDots[i].classList.add("active");
    } else {
      reviewDots[i].classList.remove("active");
    }
  }
}

if (reviewSlides.length > 0) {
  setInterval(function () {
    showSlide(currentSlide + 1);
  }, 10000);

  for (let i = 0; i < reviewDots.length; i++) {
    reviewDots[i].addEventListener("click", function () {
      showSlide(i);
    });
  }
}

const navLinks = document.querySelectorAll(".nav-link");

for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", function () {
    if (navLinksBox) {
      navLinksBox.classList.remove("open");
    }
  });
}

window.addEventListener("scroll", function () {
  const scrollPosition = window.scrollY + 180;
  const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;

  for (let i = 0; i < navLinks.length; i++) {
    const link = navLinks[i];
    const sectionId = link.getAttribute("data-section");
    const section = document.getElementById(sectionId);

    if (isBottom && i === navLinks.length - 1) {
      link.classList.add("active");
    } else if (isBottom) {
      link.classList.remove("active");
    } else if (section) {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    }
  }
});