/**
 * COFFEE WAGERA - APPLICATION LOGIC
 * Dynamic Menu, Locations Directory, Audio Player, Testimonials Carousel & E-Store Cart
 */

// ==========================================
// 1. MENU DATABASE
// ==========================================
const MENU_DATA = [
  // Hot Beverages
  {
    id: 1,
    name: "Spanish Latte",
    category: "hot",
    price: 680,
    desc: "Signature espresso with textured condensed milk and velvety microfoam.",
    badge: "Bestseller",
    image: "https://coffeewagera.com/wp-content/uploads/2024/04/Home-Menu-Image-One.jpg"
  },
  {
    id: 2,
    name: "Hazelnut Cocochino",
    category: "hot",
    price: 720,
    desc: "A rich combination of double espresso, coconut cream, hazelnut drizzle, and hot steamed milk.",
    badge: "Signature",
    image: "https://coffeewagera.com/wp-content/uploads/2024/04/Home-Menu-Image-One.jpg"
  },
  {
    id: 3,
    name: "Classic Cappuccino",
    category: "hot",
    price: 590,
    desc: "Expertly pulled double shot of locally roasted Arabica beans with dense velvety foam.",
    badge: "Classic",
    image: "https://coffeewagera.com/wp-content/uploads/2024/04/Home-Menu-Image-One.jpg"
  },
  {
    id: 4,
    name: "Caramel Macchiato",
    category: "hot",
    price: 650,
    desc: "Freshly steamed milk with vanilla-flavored syrup marked with espresso and topped with caramel drizzle.",
    badge: "Popular",
    image: "https://coffeewagera.com/wp-content/uploads/2024/04/Home-Menu-Image-One.jpg"
  },
  {
    id: 5,
    name: "Americano / Long Black",
    category: "hot",
    price: 490,
    desc: "Espresso shots topped with hot water create a light layer of crema and rich nuanced flavor.",
    badge: "Pure",
    image: "https://coffeewagera.com/wp-content/uploads/2024/04/Home-Menu-Image-One.jpg"
  },

  // Cold Beverages
  {
    id: 6,
    name: "Iced Caramel Frappe",
    category: "cold",
    price: 740,
    desc: "Blended espresso, rich caramel syrup, crushed ice, topped with whipped cream and caramel swirl.",
    badge: "Favorite",
    image: "https://coffeewagera.com/wp-content/uploads/2024/04/Home-Menu-Image-Three.jpg"
  },
  {
    id: 7,
    name: "Cold Brew On Tap",
    category: "cold",
    price: 620,
    desc: "Slow steeped for 18 hours in cold filtered water for super smooth, low-acid, bold refreshment.",
    badge: "Craft",
    image: "https://coffeewagera.com/wp-content/uploads/2024/04/Home-Menu-Image-Three.jpg"
  },
  {
    id: 8,
    name: "Iced Spanish Latte",
    category: "cold",
    price: 690,
    desc: "Chilled sweetened condensed milk, bold espresso shots, poured over crystal ice.",
    badge: "Bestseller",
    image: "https://coffeewagera.com/wp-content/uploads/2024/04/Home-Menu-Image-Three.jpg"
  },
  {
    id: 9,
    name: "Vanilla Frappe Cooler",
    category: "cold",
    price: 710,
    desc: "Smooth creamy vanilla blended with ice and milk, garnished with white chocolate chips.",
    badge: "Refreshing",
    image: "https://coffeewagera.com/wp-content/uploads/2024/04/Home-Menu-Image-Three.jpg"
  },

  // Savories & Snacks
  {
    id: 10,
    name: "Smoked Chicken Croissant",
    category: "savories",
    price: 550,
    desc: "Flaky all-butter French croissant filled with seasoned smoked chicken, cheddar, and crisp lettuce.",
    badge: "Hot Snack",
    image: "https://coffeewagera.com/wp-content/uploads/2024/04/Home-Menu-Image-Five.jpg"
  },
  {
    id: 11,
    name: "Spinach & Cheese Quiche",
    category: "savories",
    price: 480,
    desc: "Homemade artisanal tart crust loaded with sauteed greens, cream, and melted mozzarella.",
    badge: "Vegetarian",
    image: "https://coffeewagera.com/wp-content/uploads/2024/04/Home-Menu-Image-Five.jpg"
  },
  {
    id: 12,
    name: "Roast Beef Panini",
    category: "savories",
    price: 650,
    desc: "Tender seasoned beef strips with caramelized onions and dijon mustard on toasted sourdough.",
    badge: "Gourmet",
    image: "https://coffeewagera.com/wp-content/uploads/2024/04/Home-Menu-Image-Five.jpg"
  },

  // Desserts
  {
    id: 13,
    name: "Fudge Brownie with Walnuts",
    category: "desserts",
    price: 420,
    desc: "Soft, fudgy, decadent Belgian chocolate brownie baked fresh by local home-chefs.",
    badge: "Must Try",
    image: "https://coffeewagera.com/wp-content/uploads/2024/04/Dessert.jpg"
  },
  {
    id: 14,
    name: "Lotus Biscoff Cheesecake",
    category: "desserts",
    price: 580,
    desc: "Silky Philadelphia cream cheese base topped with spiced caramelized Lotus biscoff spread.",
    badge: "Decadent",
    image: "https://coffeewagera.com/wp-content/uploads/2024/04/Dessert.jpg"
  },
  {
    id: 15,
    name: "Red Velvet Cupcake",
    category: "desserts",
    price: 360,
    desc: "Moist red velvet sponge crowned with cream cheese frosting and sweet sprinkles.",
    badge: "Sweet",
    image: "https://coffeewagera.com/wp-content/uploads/2024/04/Dessert.jpg"
  },

  // Beans & Merch (eStore)
  {
    id: 16,
    name: "CW Signature Espresso Roast (250g)",
    category: "beans",
    price: 1850,
    desc: "100% Specialty Arabica beans fresh from local roasters. Notes of dark chocolate, almond, and berry.",
    badge: "Whole Bean",
    image: "https://coffeewagera.com/wp-content/uploads/2024/04/Home-Image-eStore.jpg"
  },
  {
    id: 17,
    name: "Original CW Pour-Over Dripper",
    category: "beans",
    price: 2400,
    desc: "Ergonomic ceramic dripper engineered for optimal extraction rate and crisp tasting notes.",
    badge: "Equipment",
    image: "https://coffeewagera.com/wp-content/uploads/2024/04/Home-Image-eStore.jpg"
  },
  {
    id: 18,
    name: "CW Eco Reusable Stainless Mug",
    category: "beans",
    price: 1950,
    desc: "Vacuum insulated double-walled travel mug that keeps coffee piping hot for 6 hours.",
    badge: "Eco Merch",
    image: "https://coffeewagera.com/wp-content/uploads/2024/04/Home-Image-eStore.jpg"
  }
];

// ==========================================
// 2. LOCATIONS DATABASE
// ==========================================
const LOCATIONS_DATA = [
  {
    id: 1,
    name: "CW Clifton",
    city: "Karachi",
    address: "Shop 1, Plot 14-C, Lane 4, Shahbaz Commercial, Phase 6, DHA, Karachi",
    hours: "8:00 AM - 1:00 AM",
    perks: ["Free High-Speed WiFi", "Free Drinking Water", "Laptop Charging Outlets", "Air Conditioned"]
  },
  {
    id: 2,
    name: "CW Dolmen Mall Clifton",
    city: "Karachi",
    address: "2nd Floor Food Court, Dolmen Mall Clifton, Marine Drive, Karachi",
    hours: "11:00 AM - 12:00 AM",
    perks: ["Mall Ambience", "Free Water", "Takeaway Express", "Credit Cards Accepted"]
  },
  {
    id: 3,
    name: "CW LuckyOne Mall",
    city: "Karachi",
    address: "Ground Floor, LuckyOne Mall, Rashid Minhas Road, Federal B Area, Karachi",
    hours: "11:00 AM - 12:00 AM",
    perks: ["Mall Access", "Quick Bites", "Free Water", "Spacious Seating"]
  },
  {
    id: 4,
    name: "CW 5 Star Chowrangi",
    city: "Karachi",
    address: "Block G, North Nazimabad, Near 5 Star Chowrangi, Karachi",
    hours: "9:00 AM - 1:00 AM",
    perks: ["Student Friendly", "Dedicated Co-Working Desk", "High-Speed WiFi", "Free Water"]
  },
  {
    id: 5,
    name: "CW Maskan Chowrangi",
    city: "Karachi",
    address: "Plot B-14, Block 7, Gulshan-e-Iqbal, Near Maskan, Karachi",
    hours: "8:30 AM - 1:30 AM",
    perks: ["Free High-Speed WiFi", "Quiet Zone", "Outdoor Patio", "Free Water"]
  },
  {
    id: 6,
    name: "CW Midway Commercial",
    city: "Karachi",
    address: "Plot 24-B, Midway Commercial, Bahria Town, Karachi",
    hours: "9:00 AM - 12:00 AM",
    perks: ["Peaceful Ambiance", "Work Pods", "Free Water", "WiFi"]
  },
  {
    id: 7,
    name: "CW Badar Commercial",
    city: "Karachi",
    address: "26th Street, Badar Commercial Area, Phase 5 DHA, Karachi",
    hours: "8:00 AM - 12:00 AM",
    perks: ["Artisan Espresso", "Co-Working Friendly", "Free Water", "Power Sockets"]
  },
  {
    id: 8,
    name: "CW Kala Pul",
    city: "Karachi",
    address: "Near CBM/IoBM Corridor, Korangi Road, Karachi",
    hours: "8:00 AM - 11:00 PM",
    perks: ["Student Hub", "Affordable Snacks", "Free High-Speed WiFi", "Free Water"]
  },
  {
    id: 9,
    name: "CW i-8 Markaz",
    city: "Islamabad",
    address: "Shop 4, Executive Complex, Main i-8 Markaz, Islamabad",
    hours: "8:30 AM - 12:30 AM",
    perks: ["Scenic Capital Vibe", "Tech Remote Workers Hub", "Free High-Speed WiFi", "Free Water"]
  },
  {
    id: 10,
    name: "CW Bahria Town",
    city: "Lahore",
    address: "Com 23, Sector C Commercial, Bahria Town, Lahore",
    hours: "9:00 AM - 1:00 AM",
    perks: ["Spacious Lounge", "Co-Working Desks", "Free Filtered Water", "High-Speed WiFi"]
  },
  {
    id: 11,
    name: "CW Auto Bhan / Boulevard",
    city: "Hyderabad",
    address: "Main Auto Bhan Road, Near Boulevard Mall, Hyderabad",
    hours: "10:00 AM - 12:00 AM",
    perks: ["Cozy Seating", "Free Drinking Water", "Fast WiFi", "Dedicated Meeting Corner"]
  }
];

// ==========================================
// 3. CART STATE MANAGEMENT
// ==========================================
let cart = [];

function loadCart() {
  const saved = localStorage.getItem('cw_cart');
  if (saved) {
    try {
      cart = JSON.parse(saved);
    } catch (e) {
      cart = [];
    }
  }
  updateCartUI();
}

function saveCart() {
  localStorage.setItem('cw_cart', JSON.stringify(cart));
  updateCartUI();
}

function addToCart(productId) {
  const product = MENU_DATA.find(item => item.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  showToast(`Added "${product.name}" to basket!`);
  openCart();
}

function updateQuantity(productId, delta) {
  const item = cart.find(item => item.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.id !== productId);
  }

  saveCart();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  showToast("Item removed from basket");
}

function updateCartUI() {
  const countBadge = document.getElementById('cartBadgeCount');
  const cartList = document.getElementById('cartItemsList');
  const totalPriceElem = document.getElementById('cartTotalPrice');
  const footerElem = document.getElementById('cartFooter');

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (countBadge) {
    countBadge.textContent = totalCount;
  }

  if (totalPriceElem) {
    totalPriceElem.textContent = `PKR ${totalPrice.toLocaleString()}`;
  }

  if (!cartList) return;

  if (cart.length === 0) {
    cartList.innerHTML = `
      <div class="cart-empty-message">
        <i class="fa-solid fa-mug-saucer"></i>
        <h4>Your basket is empty</h4>
        <p>Explore our menu and add your favorite coffees & treats!</p>
      </div>
    `;
    if (footerElem) footerElem.style.display = 'none';
  } else {
    if (footerElem) footerElem.style.display = 'block';
    cartList.innerHTML = cart.map(item => `
      <div class="cart-item-row">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">PKR ${item.price.toLocaleString()}</div>
          <div class="cart-qty-ctrl">
            <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
            <span class="qty-val">${item.quantity}</span>
            <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
          </div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="Remove item">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    `).join('');
  }
}

function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
}

function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
}

function checkoutSimulate() {
  if (cart.length === 0) return;
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  alert(`Thank you for ordering with Coffee Wagera!\n\nOrder Total: PKR ${total.toLocaleString()}\nYour order will be prepared fresh at your closest CW branch.`);
  cart = [];
  saveCart();
  closeCart();
}

// ==========================================
// 4. RENDER MENU ITEMS
// ==========================================
function renderMenu(category = 'all') {
  const grid = document.getElementById('menuItemsGrid');
  if (!grid) return;

  const filtered = category === 'all' 
    ? MENU_DATA 
    : MENU_DATA.filter(item => item.category === category);

  grid.innerHTML = filtered.map(item => `
    <div class="menu-item-card">
      <div class="menu-item-thumb">
        <img src="${item.image}" alt="${item.name}" loading="lazy" />
        <span class="menu-item-badge">${item.badge}</span>
      </div>
      <div class="menu-item-info">
        <h3 class="menu-item-title">${item.name}</h3>
        <p class="menu-item-desc">${item.desc}</p>
        <div class="menu-item-footer">
          <span class="menu-item-price">PKR ${item.price.toLocaleString()}</span>
          <button class="btn btn-primary btn-sm" onclick="addToCart(${item.id})">
            <i class="fa-solid fa-plus"></i> Add
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function filterMenuCategory(cat) {
  const buttons = document.querySelectorAll('.menu-filter-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  
  const activeBtn = Array.from(buttons).find(b => b.textContent.toLowerCase().includes(cat.toLowerCase()) || (cat === 'all' && b.textContent.includes('All')));
  if (activeBtn) activeBtn.classList.add('active');

  renderMenu(cat);
}

// ==========================================
// 5. RENDER LOCATIONS
// ==========================================
function renderLocations(cityFilter = 'all') {
  const grid = document.getElementById('locationsGrid');
  if (!grid) return;

  const filtered = cityFilter === 'all' 
    ? LOCATIONS_DATA 
    : LOCATIONS_DATA.filter(loc => loc.city.toLowerCase() === cityFilter.toLowerCase());

  grid.innerHTML = filtered.map(loc => `
    <div class="location-card">
      <div class="location-header">
        <h3 class="location-name">${loc.name}</h3>
        <span class="location-city-tag">${loc.city}</span>
      </div>
      <div class="location-address">
        <i class="fa-solid fa-location-dot"></i>
        <span>${loc.address}</span>
      </div>
      <div class="location-perks">
        ${loc.perks.map(perk => `
          <span class="perk-tag"><i class="fa-solid fa-check"></i> ${perk}</span>
        `).join('')}
      </div>
      <div class="location-footer">
        <span><i class="fa-regular fa-clock"></i> ${loc.hours}</span>
        <a href="https://maps.google.com/?q=${encodeURIComponent(loc.name + ' ' + loc.address)}" target="_blank" rel="noopener" style="color: var(--accent); font-weight: 600;">
          Directions <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
      </div>
    </div>
  `).join('');
}

function filterLocations(city) {
  const buttons = document.querySelectorAll('.city-btn');
  buttons.forEach(btn => btn.classList.remove('active'));

  const activeBtn = Array.from(buttons).find(b => b.textContent.toLowerCase().includes(city.toLowerCase()));
  if (activeBtn) activeBtn.classList.add('active');

  renderLocations(city);
}

// ==========================================
// 6. AUDIO PLAYER ("GREETING FROM MUSH!")
// ==========================================
function setupAudioPlayer() {
  const btn = document.getElementById('mushAudioBtn');
  const audio = document.getElementById('mushAudio');
  const icon = document.getElementById('audioIcon');
  const statusText = document.getElementById('audioStatusText');

  if (!btn || !audio) return;

  btn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().then(() => {
        btn.classList.add('playing');
        icon.className = 'fa-solid fa-pause';
        statusText.textContent = "Listening to Mush...";
      }).catch(err => {
        console.warn("Audio autoplay policy:", err);
      });
    } else {
      audio.pause();
      btn.classList.remove('playing');
      icon.className = 'fa-solid fa-play';
      statusText.textContent = "Greeting from Mush!";
    }
  });

  audio.addEventListener('ended', () => {
    btn.classList.remove('playing');
    icon.className = 'fa-solid fa-play';
    statusText.textContent = "Greeting from Mush!";
  });
}

// ==========================================
// 7. TESTIMONIALS CAROUSEL SLIDER
// ==========================================
let currentSlide = 0;
const totalSlides = 5;
let autoSlideInterval = null;

function updateCarousel() {
  const track = document.getElementById('testimonialTrack');
  const dots = document.querySelectorAll('.carousel-indicators .dot');
  if (!track) return;

  track.style.transform = `translateX(-${currentSlide * 100}%)`;

  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

function goToSlide(index) {
  currentSlide = index;
  updateCarousel();
  resetAutoSlide();
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateCarousel();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateCarousel();
}

function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 7000);
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

// ==========================================
// 8. MODAL WINDOWS & TOAST NOTIFICATIONS
// ==========================================
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = 'auto';
  }
}

function handleFranchiseSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('applicantName').value;
  const city = document.getElementById('targetCity').value;

  closeModal('franchiseModal');
  showToast(`Thank you ${name}! Franchise inquiry for ${city} submitted.`);
  e.target.reset();
}

function enrollBarista() {
  closeModal('baristaModal');
  showToast("Interest registered! Our Head Barista will contact you via WhatsApp.");
}

function showToast(message) {
  const toast = document.getElementById('toastNotice');
  const toastMsg = document.getElementById('toastMsg');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

// ==========================================
// 9. NAVBAR SCROLL & MOBILE DRAWER
// ==========================================
function setupNavigation() {
  const header = document.getElementById('siteHeader');
  const hamburger = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const cartBtn = document.getElementById('openCartBtn');

  // Header scroll detection
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('open')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
      }
    });

    // Mobile dropdown toggle
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      const link = item.querySelector('.nav-link');
      const drop = item.querySelector('.dropdown-menu');
      if (link && drop) {
        link.addEventListener('click', (e) => {
          if (window.innerWidth <= 1024) {
            e.preventDefault();
            drop.classList.toggle('mobile-open');
          }
        });
      }
    });
  }

  // Open cart button
  if (cartBtn) {
    cartBtn.addEventListener('click', openCart);
  }

  // Carousel buttons
  const nextBtn = document.getElementById('nextSlideBtn');
  const prevBtn = document.getElementById('prevSlideBtn');
  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });
}

// ==========================================
// 10. INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupAudioPlayer();
  renderMenu('all');
  renderLocations('all');
  loadCart();
  startAutoSlide();
});
