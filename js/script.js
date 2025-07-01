document.addEventListener("DOMContentLoaded", () => {
  // ===== PRODUCTS =====
  const products = [
    {
      name: "Coral One-Piece",
      price: "$79",
      description:
        "A flattering one-piece designed for confidence and comfort. Crafted with sustainable materials and a timeless cut.",
      image: "./image/Maillot de bain une pièce bandeau L'Estival - Jaune soleil _ L.png",
    },
    {
      name: "INTI Reversible Bikini",
      price: "$79",
      description:
        "Reversible bikini offering two chic looks in one. Sustainably made for sea-lovers.",
      image: "./image/INTI REVERSIBLE BIKINI - XS _ XL.png",
    },
    {
      name: "Chain-detail Swimsuit",
      price: "$79",
      description: "Glamorous and bold, this gold-tone piece makes a confident statement.",
      image: "./image/Chain-detail swimsuit in gold - Same _ Mytheresa.png",
    },
  ];

  const productList = document.getElementById("product-list");

  products.forEach((product) => {
    const col = document.createElement("div");
    col.className = "col-md-4";
    col.innerHTML = `
      <div class="product-card position-relative overflow-hidden">
        <div class="product-image-wrapper">
          <img src="${product.image}" alt="${product.name}" class="img-fluid" />
          <div class="product-overlay d-flex justify-content-center align-items-center">
            <button title="like" class="btn btn-light me-2"><i class="bi bi-heart"></i></button>
            <button 
              class="btn btn-dark view-more-btn" 
              data-name="${product.name}" 
              data-price="${product.price}" 
              data-description="${product.description}" 
              data-image="${product.image}">
              View More
            </button>
          </div>
        </div>
        <div class="product-info text-center mt-3">
          <h5 class="product-title mb-1">${product.name}</h5>
          <p class="product-price">${product.price}</p>
        </div>
      </div>
    `;
    productList.appendChild(col);
  });

  // ===== CART LOGIC =====
  let cartCount = 0;
  const cartItems = [];

  function addToCart() {
    const selectedSize = document.querySelector('input[name="size"]:checked')?.id.replace("size", "") || "M";
    const name = document.querySelector("#productModal h4").textContent;
    const price = document.querySelector("#productModal .text-light").textContent;
    const image = document.querySelector("#productModal .col-8 img").src;

    cartCount++;
    document.getElementById("cart-count").textContent = cartCount;

    cartItems.push({ name, price, size: selectedSize, image });

    const modal = bootstrap.Modal.getInstance(document.getElementById("productModal"));
    modal.hide();

    updateCartDropdown();
  }

  function updateCartDropdown() {
    const cartDropdown = document.getElementById("cart-dropdown");
    cartDropdown.innerHTML = cartItems
      .map(
        (item) => `
      <div class="d-flex align-items-center mb-2">
        <img src="${item.image}" alt="" style="width: 40px; height: 40px; object-fit: cover; border-radius: 6px; margin-right: 10px;">
        <div>
          <strong>${item.name}</strong><br>
          <small>${item.price} | Size: ${item.size}</small>
        </div>
      </div>
    `
      )
      .join("");
  }

  let lastScrollY = 0;

  function toggleCart() {
    const overlay = document.getElementById("cart-overlay");
    const isOpen = overlay.classList.contains("show");

    if (isOpen) {
      overlay.classList.remove("show");
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, lastScrollY);
    } else {
      lastScrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${lastScrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      overlay.classList.add("show");
      updateCartPanel();
    }
  }

  function updateCartPanel() {
    const cartContent = document.getElementById("cart-content");
    cartContent.innerHTML = cartItems
      .map(
        (item) => `
      <div class="d-flex align-items-center mb-3">
        <img src="${item.image}" alt="" class="me-3" style="width: 50px; height: 50px; object-fit: cover; border-radius: 6px;">
        <div>
          <div><strong>${item.name}</strong></div>
          <small>${item.price} | Size: ${item.size}</small>
        </div>
      </div>
    `
      )
      .join("");
  }

  document.getElementById("close-cart")?.addEventListener("click", () => {
    document.getElementById("cart-overlay").classList.remove("show");
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    document.body.style.overflow = "";
    window.scrollTo(0, lastScrollY);
  });

  window.toggleCart = toggleCart; // make global for nav link onclick

  // ===== MODAL VIEW MORE BUTTONS =====
  const viewMoreButtons = document.querySelectorAll(".view-more-btn");
  viewMoreButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const { name, price, description, image } = button.dataset;

      document.querySelector("#productModal h4").textContent = name;
      document.querySelector("#productModal .text-light").textContent = price;
      document.querySelector("#productModal p:not(.text-light)").textContent = description;

      const mainImg = document.querySelector("#productModal .col-8 img");
      const thumbs = document.querySelectorAll("#productModal .col-4 img");
      mainImg.src = image;
      thumbs.forEach((img) => (img.src = image));

      const modal = new bootstrap.Modal(document.getElementById("productModal"));
      modal.show();
    });
  });

  // ===== NAV BRAND FADE ON SCROLL =====
  const heroBrand = document.querySelector(".hero-brand");
  const navBrand = document.getElementById("nav-brand");
  const heroSection = document.getElementById("hero");

  window.addEventListener("scroll", () => {
    if (window.scrollY > heroSection.offsetHeight - 100) {
      navBrand.style.opacity = "1";
      navBrand.style.pointerEvents = "auto";
      heroBrand.style.opacity = "0";
    } else {
      navBrand.style.opacity = "0";
      navBrand.style.pointerEvents = "none";
      heroBrand.style.opacity = "1";
    }
  });

  // ===== REVIEWS DYNAMIC RENDERING & CAROUSEL =====
  const reviewsData = [
    {
      author: "Emily R.",
      rating: 5,
      content: "Love these swimsuits! The quality is amazing and they fit perfectly.",
      date: "June 10, 2025",
    },
    {
      author: "Sophie M.",
      rating: 4,
      content: "Beautiful designs and very comfortable. Would definitely recommend!",
      date: "June 12, 2025",
    },
    {
      author: "Lara K.",
      rating: 5,
      content: "Great customer service and fast shipping. The reversible bikini is my favorite!",
      date: "June 15, 2025",
    },
  ];

  const reviewsContainer = document.getElementById("reviews-container");
  reviewsData.forEach((review, index) => {
    const reviewEl = document.createElement("div");
    reviewEl.classList.add("review-item");
    reviewEl.style.display = index === 0 ? "block" : "none";
    const stars = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);
    reviewEl.innerHTML = `
      <blockquote class="blockquote text-center text-white p-4">
        <p class="mb-3" style="font-size: 1.1rem;">"${review.content}"</p>
        <footer class="blockquote-footer text-white-50">${review.author}, <cite title="Date">${review.date}</cite></footer>
        <div class="star-rating mt-2" style="color: #f4c150; font-size: 1.2rem;">${stars}</div>
      </blockquote>
    `;
    reviewsContainer.appendChild(reviewEl);
  });

  const reviews = document.querySelectorAll(".review-item");
  const prevBtn = document.getElementById("prevReview");
  const nextBtn = document.getElementById("nextReview");
  let currentReview = 0;

  function showReview(index) {
    reviews.forEach((review, i) => {
      review.style.display = i === index ? "block" : "none";
    });
  }

  prevBtn.addEventListener("click", () => {
    currentReview = (currentReview - 1 + reviews.length) % reviews.length;
    showReview(currentReview);
  });

  nextBtn.addEventListener("click", () => {
    currentReview = (currentReview + 1) % reviews.length;
    showReview(currentReview);
  });

  // Initialize first review display
  showReview(currentReview);

  // Expose addToCart globally for modal button
  window.addToCart = addToCart;
});
