/**
 * ==========================================================================
 * ALHA - Luxury Fragrances (Abbottabad, Pakistan)
 * Master Client-Side JavaScript
 * ==========================================================================
 */

// Selected size state for cards on page: { [productId]: sizeMl }
const cardSelectedSizes = {};

// Cart state in localStorage
let cart = [];

// Current filter state for Full Collection
let activeFilters = {
  gender: 'All',
  category: 'All',
  search: '',
  sort: 'featured'
};

// Current active product in Detail Modal
let activeModalProduct = null;
let activeModalSize = null;
let activeModalQty = 1;

/* ==========================================================================
   Initialization
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  loadCartFromStorage();
  initNavbarScroll();
  initMobileMenu();
  renderFeaturedSection();
  renderCollectionSection();
  renderReviewsSection();
  setupFilterListeners();
  setupCartEvents();
  setupModalEvents();
  setupContactForm();
  updateWhatsAppLinks();
});

/* ==========================================================================
   WhatsApp Link Utilities
   ========================================================================== */
function getCleanWhatsAppNumber() {
  let num = (typeof WHATSAPP_NUMBER !== 'undefined' ? WHATSAPP_NUMBER : '923265676991').replace(/[^0-9]/g, '');
  if (num.startsWith('0')) {
    num = '92' + num.slice(1);
  }
  return num;
}

function updateWhatsAppLinks() {
  const cleanPhone = getCleanWhatsAppNumber();
  const defaultMsg = encodeURIComponent("Hello ALHA, I am contacting you from your website regarding your luxury perfume collection.");
  const waUrl = `https://wa.me/${cleanPhone}?text=${defaultMsg}`;
  
  const floatingBtn = document.getElementById('floatingWhatsAppBtn');
  if (floatingBtn) floatingBtn.href = waUrl;

  const navWaBtn = document.getElementById('navWhatsAppBtn');
  if (navWaBtn) navWaBtn.href = waUrl;

  const contactWaBtn = document.getElementById('contactDirectWaBtn');
  if (contactWaBtn) contactWaBtn.href = waUrl;

  const footerWaBtn = document.getElementById('footerOrderWaBtn');
  if (footerWaBtn) footerWaBtn.href = waUrl;

  const footerSocialWa = document.getElementById('footerSocialWaBtn');
  if (footerSocialWa) footerSocialWa.href = waUrl;
}

/**
 * Format currency in Pakistani Rupees
 */
function formatPKR(amount) {
  return `Rs. ${amount.toLocaleString('en-PK')}`;
}

/* ==========================================================================
   Navbar & Mobile Menu
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-active');
    const icon = menuBtn.querySelector('i');
    if (icon) {
      icon.className = navLinks.classList.contains('mobile-active') 
        ? 'ri-close-line' 
        : 'ri-menu-3-line';
    }
  });

  // Close menu when clicking nav link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-active');
      const icon = menuBtn.querySelector('i');
      if (icon) icon.className = 'ri-menu-3-line';
    });
  });
}

/* ==========================================================================
   Featured Products Section
   ========================================================================== */
function renderFeaturedSection() {
  const container = document.getElementById('featuredGrid');
  if (!container) return;

  const featured = PRODUCTS.filter(p => p.isFeatured).slice(0, 4);
  container.innerHTML = featured.map(p => createProductCardHtml(p, 'featured')).join('');
  attachCardEventListeners(container);
}

/* ==========================================================================
   Full Collection Section (With Filters & Sort)
   ========================================================================== */
function renderCollectionSection() {
  const container = document.getElementById('collectionGrid');
  const countEl = document.getElementById('collectionCount');
  if (!container) return;

  let list = [...PRODUCTS];

  // Gender filter
  if (activeFilters.gender !== 'All') {
    list = list.filter(p => p.gender.toLowerCase() === activeFilters.gender.toLowerCase() || p.gender.toLowerCase() === 'unisex');
  }

  // Category filter
  if (activeFilters.category !== 'All') {
    list = list.filter(p => p.category.toLowerCase() === activeFilters.category.toLowerCase());
  }

  // Search filter
  if (activeFilters.search.trim()) {
    const term = activeFilters.search.toLowerCase();
    list = list.filter(p => 
      p.name.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term) ||
      p.notes.top.toLowerCase().includes(term) ||
      p.notes.heart.toLowerCase().includes(term) ||
      p.notes.base.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term)
    );
  }

  // Sorting
  switch (activeFilters.sort) {
    case 'price-asc':
      list.sort((a, b) => a.sizes[0].price - b.sizes[0].price);
      break;
    case 'price-desc':
      list.sort((a, b) => b.sizes[0].price - a.sizes[0].price);
      break;
    case 'rating':
      list.sort((a, b) => b.rating - a.rating);
      break;
    case 'name-asc':
      list.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      // 'featured' / default order
      break;
  }

  if (countEl) {
    countEl.textContent = `Showing ${list.length} of ${PRODUCTS.length} Fragrances`;
  }

  if (list.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-state-icon"><i class="ri-flask-line"></i></div>
        <h3 class="empty-state-title">No Fragrances Found</h3>
        <p class="empty-state-text">No perfumes match your selected filters. Try clearing filters or searching for different notes.</p>
        <button class="btn btn-primary" onclick="resetFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(p => createProductCardHtml(p, 'collection')).join('');
  attachCardEventListeners(container);
}

function resetFilters() {
  activeFilters.gender = 'All';
  activeFilters.category = 'All';
  activeFilters.search = '';
  activeFilters.sort = 'featured';

  const searchInput = document.getElementById('collectionSearch');
  if (searchInput) searchInput.value = '';

  const sortSelect = document.getElementById('collectionSort');
  if (sortSelect) sortSelect.value = 'featured';

  document.querySelectorAll('.filter-gender-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.gender === 'All');
  });

  document.querySelectorAll('.filter-category-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === 'All');
  });

  renderCollectionSection();
}

/* ==========================================================================
   Product Card HTML & Interactivity
   ========================================================================== */
function createProductCardHtml(product, prefix) {
  // Default to 50ml if available, or first size
  const defaultSizeObj = product.sizes.find(s => s.ml === 50) || product.sizes[0];
  const selectedSizeMl = cardSelectedSizes[product.id] || defaultSizeObj.ml;
  const currentSizeObj = product.sizes.find(s => s.ml === selectedSizeMl) || defaultSizeObj;
  cardSelectedSizes[product.id] = currentSizeObj.ml;

  const badgeHtml = product.badge 
    ? `<span class="product-badge ${product.badge.toLowerCase().includes('best') ? 'bestseller' : ''}">${product.badge}</span>` 
    : '';

  const sizePillsHtml = product.sizes.map(s => `
    <button type="button" 
      class="size-pill ${s.ml === currentSizeObj.ml ? 'active' : ''}" 
      data-product-id="${product.id}" 
      data-ml="${s.ml}" 
      data-price="${s.price}">
      ${s.ml}ml
    </button>
  `).join('');

  return `
    <article class="product-card" data-id="${product.id}">
      <div class="product-image-wrap" onclick="openProductModal(${product.id}, ${currentSizeObj.ml})">
        ${badgeHtml}
        <span class="product-gender-tag">${product.gender}</span>
        <img src="assets/images/${product.image}" 
             alt="${product.name} - Luxury Perfume by ALHA Abbottabad" 
             loading="lazy" 
             onerror="this.src='https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80'">
        <div class="quick-view-overlay">
          <button class="btn-quick-view">Quick View & Notes</button>
        </div>
      </div>

      <div class="product-body">
        <span class="product-category">${product.category} Fragrance</span>
        <h3 class="product-name" onclick="openProductModal(${product.id}, ${currentSizeObj.ml})">${product.name}</h3>

        <div class="product-notes-preview">
          <strong>Key Notes:</strong> ${product.notes.heart} • ${product.notes.base}
        </div>

        <div class="product-sizes-label">Select Bottle Size:</div>
        <div class="product-sizes-wrap">
          ${sizePillsHtml}
        </div>

        <div class="product-card-footer">
          <div class="product-price-row">
            <span class="price-tag" id="price-display-${prefix}-${product.id}">${formatPKR(currentSizeObj.price)}</span>
            <span class="price-unit">COD Available</span>
          </div>

          <div class="product-actions-dual">
            <button class="btn btn-primary btn-card-cart" onclick="handleCardAddToCart(${product.id})">
              <i class="ri-shopping-bag-line"></i> Add To Bag
            </button>
            <button class="btn btn-whatsapp btn-card-whatsapp" onclick="handleCardDirectWhatsApp(${product.id})">
              <i class="ri-whatsapp-line"></i> Order
            </button>
          </div>
        </div>
      </div>
    </article>
  `;
}

function attachCardEventListeners(container) {
  // Listen for size pill switches
  container.querySelectorAll('.size-pill').forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.stopPropagation();
      const pId = parseInt(pill.dataset.productId);
      const ml = parseInt(pill.dataset.ml);
      const price = parseInt(pill.dataset.price);

      cardSelectedSizes[pId] = ml;

      // Update active pills in this card
      const card = pill.closest('.product-card');
      card.querySelectorAll('.size-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      // Update displayed price in this card
      const priceDisplay = card.querySelector('.price-tag');
      if (priceDisplay) {
        priceDisplay.textContent = formatPKR(price);
      }
    });
  });
}

function handleCardAddToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const sizeMl = cardSelectedSizes[productId] || product.sizes[0].ml;
  addToCart(productId, sizeMl, 1);
}

function handleCardDirectWhatsApp(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const sizeMl = cardSelectedSizes[productId] || product.sizes[0].ml;
  const sizeObj = product.sizes.find(s => s.ml === sizeMl) || product.sizes[0];

  const cleanPhone = getCleanWhatsAppNumber();
  const message = `Hello ALHA, I want to order:
1x ${product.name} (${sizeObj.ml}ml) - ${formatPKR(sizeObj.price)}
Total: ${formatPKR(sizeObj.price)}
Name: ___  Address: ___  City: Abbottabad
Payment: Cash on Delivery`;

  const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

/* ==========================================================================
   Filter & Search Event Listeners
   ========================================================================== */
function setupFilterListeners() {
  // Gender buttons
  document.querySelectorAll('.filter-gender-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-gender-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilters.gender = btn.dataset.gender;
      renderCollectionSection();
    });
  });

  // Category buttons
  document.querySelectorAll('.filter-category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-category-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilters.category = btn.dataset.category;
      renderCollectionSection();
    });
  });

  // Search input with debounce
  const searchInput = document.getElementById('collectionSearch');
  if (searchInput) {
    let timeout = null;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        activeFilters.search = e.target.value;
        renderCollectionSection();
      }, 250);
    });
  }

  // Sort dropdown
  const sortSelect = document.getElementById('collectionSort');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      activeFilters.sort = e.target.value;
      renderCollectionSection();
    });
  }
}

/* ==========================================================================
   Product Detail Modal
   ========================================================================== */
function setupModalEvents() {
  const modalOverlay = document.getElementById('productModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  if (!modalOverlay) return;

  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeModal());
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closeCart();
    }
  });

  // Quantity controls inside modal
  const qtyMinus = document.getElementById('modalQtyMinus');
  const qtyPlus = document.getElementById('modalQtyPlus');
  const qtyDisplay = document.getElementById('modalQtyDisplay');

  if (qtyMinus && qtyPlus && qtyDisplay) {
    qtyMinus.addEventListener('click', () => {
      if (activeModalQty > 1) {
        activeModalQty--;
        qtyDisplay.textContent = activeModalQty;
        updateModalPrice();
      }
    });
    qtyPlus.addEventListener('click', () => {
      activeModalQty++;
      qtyDisplay.textContent = activeModalQty;
      updateModalPrice();
    });
  }

  // Modal Add to Cart
  const modalAddCartBtn = document.getElementById('modalAddToCartBtn');
  if (modalAddCartBtn) {
    modalAddCartBtn.addEventListener('click', () => {
      if (!activeModalProduct || !activeModalSize) return;
      addToCart(activeModalProduct.id, activeModalSize.ml, activeModalQty);
      closeModal();
    });
  }

  // Modal Direct WhatsApp Order
  const modalOrderWaBtn = document.getElementById('modalOrderWhatsAppBtn');
  if (modalOrderWaBtn) {
    modalOrderWaBtn.addEventListener('click', () => {
      if (!activeModalProduct || !activeModalSize) return;
      const total = activeModalSize.price * activeModalQty;
      const cleanPhone = getCleanWhatsAppNumber();
      const message = `Hello ALHA, I want to order:
${activeModalQty}x ${activeModalProduct.name} (${activeModalSize.ml}ml) - ${formatPKR(total)}
Total: ${formatPKR(total)}
Name: ___  Address: ___  City: Abbottabad
Payment: Cash on Delivery`;

      const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
      closeModal();
    });
  }
}

function openProductModal(productId, sizeMl = null) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  activeModalProduct = product;
  const defaultSize = product.sizes.find(s => s.ml === sizeMl) || product.sizes[0];
  activeModalSize = defaultSize;
  activeModalQty = 1;

  const modal = document.getElementById('productModal');
  const imgEl = document.getElementById('modalImage');
  const nameEl = document.getElementById('modalTitle');
  const taglineEl = document.getElementById('modalTagline');
  const descEl = document.getElementById('modalDesc');
  const genderEl = document.getElementById('modalGender');
  const categoryEl = document.getElementById('modalCategory');
  const topNotesEl = document.getElementById('modalTopNotes');
  const heartNotesEl = document.getElementById('modalHeartNotes');
  const baseNotesEl = document.getElementById('modalBaseNotes');
  const sizesWrap = document.getElementById('modalSizesWrap');
  const qtyDisplay = document.getElementById('modalQtyDisplay');

  if (imgEl) {
    imgEl.src = `assets/images/${product.image}`;
    imgEl.alt = `${product.name} Perfume`;
  }
  if (nameEl) nameEl.textContent = product.name;
  if (taglineEl) taglineEl.textContent = product.tagline;
  if (descEl) descEl.textContent = product.description;
  if (genderEl) genderEl.textContent = product.gender;
  if (categoryEl) categoryEl.textContent = `${product.category} Scent`;
  if (topNotesEl) topNotesEl.textContent = product.notes.top;
  if (heartNotesEl) heartNotesEl.textContent = product.notes.heart;
  if (baseNotesEl) baseNotesEl.textContent = product.notes.base;
  if (qtyDisplay) qtyDisplay.textContent = '1';

  // Render sizes
  if (sizesWrap) {
    sizesWrap.innerHTML = product.sizes.map(s => `
      <button type="button" 
        class="size-pill ${s.ml === activeModalSize.ml ? 'active' : ''}" 
        data-ml="${s.ml}">
        ${s.ml}ml
      </button>
    `).join('');

    sizesWrap.querySelectorAll('.size-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const ml = parseInt(pill.dataset.ml);
        activeModalSize = product.sizes.find(s => s.ml === ml);
        sizesWrap.querySelectorAll('.size-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        updateModalPrice();
      });
    });
  }

  updateModalPrice();
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function updateModalPrice() {
  const priceEl = document.getElementById('modalPrice');
  if (priceEl && activeModalSize) {
    const total = activeModalSize.price * activeModalQty;
    priceEl.textContent = formatPKR(total);
  }
}

function closeModal() {
  const modal = document.getElementById('productModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* ==========================================================================
   Slide-Over Cart Drawer & WhatsApp Order Generator
   ========================================================================== */
function setupCartEvents() {
  const cartBtn = document.getElementById('navCartBtn');
  const cartOverlay = document.getElementById('cartOverlay');
  const closeCartBtn = document.getElementById('cartCloseBtn');
  const waOrderBtn = document.getElementById('cartPlaceOrderWaBtn');

  if (cartBtn) {
    cartBtn.addEventListener('click', () => openCart());
  }
  if (closeCartBtn) {
    closeCartBtn.addEventListener('click', () => closeCart());
  }
  if (cartOverlay) {
    cartOverlay.addEventListener('click', (e) => {
      if (e.target === cartOverlay) closeCart();
    });
  }

  // City selector inside cart updates delivery fee
  const citySelect = document.getElementById('cartCitySelect');
  if (citySelect) {
    citySelect.addEventListener('change', () => renderCartDrawer());
  }

  // Master WhatsApp Order Button from Cart
  if (waOrderBtn) {
    waOrderBtn.addEventListener('click', () => {
      handleCartWhatsAppOrder();
    });
  }
}

function openCart() {
  renderCartDrawer();
  const overlay = document.getElementById('cartOverlay');
  const drawer = document.getElementById('cartDrawer');
  if (overlay && drawer) {
    overlay.classList.add('active');
    drawer.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeCart() {
  const overlay = document.getElementById('cartOverlay');
  const drawer = document.getElementById('cartDrawer');
  if (overlay && drawer) {
    overlay.classList.remove('active');
    drawer.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem('alha_luxury_cart');
    if (saved) cart = JSON.parse(saved);
  } catch (err) {
    console.warn('Could not read cart from localStorage', err);
    cart = [];
  }
  updateCartBadge();
}

function saveCartToStorage() {
  try {
    localStorage.setItem('alha_luxury_cart', JSON.stringify(cart));
  } catch (err) {
    console.warn('Could not save cart', err);
  }
  updateCartBadge();
}

function updateCartBadge() {
  const badges = document.querySelectorAll('.cart-count-badge');
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  badges.forEach(b => {
    b.textContent = totalItems;
  });
}

function addToCart(productId, sizeMl, quantity = 1) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const sizeObj = product.sizes.find(s => s.ml === sizeMl) || product.sizes[0];

  const existingIndex = cart.findIndex(item => item.id === productId && item.sizeMl === sizeObj.ml);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      sizeMl: sizeObj.ml,
      price: sizeObj.price,
      image: product.image,
      quantity: quantity
    });
  }

  saveCartToStorage();
  showToast(`Added ${quantity}x ${product.name} (${sizeObj.ml}ml) to your bag`);
  openCart();
}

function updateCartItemQty(index, delta) {
  if (!cart[index]) return;
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  saveCartToStorage();
  renderCartDrawer();
}

function removeCartItem(index) {
  if (!cart[index]) return;
  const removedName = cart[index].name;
  cart.splice(index, 1);
  saveCartToStorage();
  renderCartDrawer();
  showToast(`Removed ${removedName} from bag`);
}

function renderCartDrawer() {
  const listEl = document.getElementById('cartItemsList');
  const subtotalEl = document.getElementById('cartSubtotal');
  const shippingEl = document.getElementById('cartShippingFee');
  const totalEl = document.getElementById('cartGrandTotal');
  const shippingBarEl = document.getElementById('cartFreeShippingProgress');
  const citySelect = document.getElementById('cartCitySelect');

  if (!listEl) return;

  if (cart.length === 0) {
    listEl.innerHTML = `
      <div class="cart-empty-msg">
        <div class="cart-empty-icon"><i class="ri-shopping-bag-2-line"></i></div>
        <p style="font-size: 1.1rem; color: #fff; margin-bottom: 0.5rem; font-family: var(--font-serif);">Your Fragrance Bag is Empty</p>
        <p>Explore our Abbottabad artisanal collection and add your favorite scents.</p>
        <button class="btn btn-outline btn-sm" style="margin-top: 1.2rem;" onclick="closeCart(); document.getElementById('collection').scrollIntoView({behavior: 'smooth'})">
          Discover Scents
        </button>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = 'Rs. 0';
    if (shippingEl) shippingEl.textContent = 'Rs. 0';
    if (totalEl) totalEl.textContent = 'Rs. 0';
    if (shippingBarEl) shippingBarEl.textContent = `Free nationwide shipping on orders over ${formatPKR(STORE_CONFIG.freeDeliveryThreshold)}`;
    return;
  }

  listEl.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
      <img src="assets/images/${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=200&q=80'">
      <div class="cart-item-details">
        <h4 class="cart-item-name">${item.name}</h4>
        <span class="cart-item-size">${item.sizeMl}ml Eau de Parfum</span>
        <span class="cart-item-price">${formatPKR(item.price * item.quantity)}</span>
        <div class="cart-qty-ctrl">
          <button class="btn-qty" onclick="updateCartItemQty(${index}, -1)" title="Decrease">-</button>
          <span class="cart-qty-num">${item.quantity}</span>
          <button class="btn-qty" onclick="updateCartItemQty(${index}, 1)" title="Increase">+</button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeCartItem(${index})" title="Remove item">
        <i class="ri-delete-bin-line"></i>
      </button>
    </div>
  `).join('');

  // Calculations
  const subtotal = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  const selectedCity = citySelect ? citySelect.value : 'Abbottabad';
  
  let shippingFee = 0;
  if (subtotal < STORE_CONFIG.freeDeliveryThreshold) {
    shippingFee = (selectedCity === 'Abbottabad') ? STORE_CONFIG.shippingAbbottabad.fee : STORE_CONFIG.shippingNationwide.fee;
  }

  const grandTotal = subtotal + shippingFee;

  if (subtotalEl) subtotalEl.textContent = formatPKR(subtotal);
  if (shippingEl) {
    shippingEl.textContent = (shippingFee === 0) 
      ? 'FREE (Complimentary)' 
      : `${formatPKR(shippingFee)} (${selectedCity === 'Abbottabad' ? 'Local' : 'Courier'})`;
  }
  if (totalEl) totalEl.textContent = formatPKR(grandTotal);

  if (shippingBarEl) {
    if (subtotal >= STORE_CONFIG.freeDeliveryThreshold) {
      shippingBarEl.innerHTML = `<i class="ri-checkbox-circle-fill" style="color: #25d366;"></i> <strong>Congratulations!</strong> You qualify for <strong>FREE Delivery</strong> across Pakistan.`;
    } else {
      const remaining = STORE_CONFIG.freeDeliveryThreshold - subtotal;
      shippingBarEl.innerHTML = `Add <strong>${formatPKR(remaining)}</strong> more to get <strong>FREE Express Shipping</strong>!`;
    }
  }
}

/**
 * Handle Complete Order on WhatsApp with Pre-filled formatted message
 */
function handleCartWhatsAppOrder() {
  if (cart.length === 0) {
    showToast('Your fragrance bag is empty.');
    return;
  }

  const nameInput = document.getElementById('cartCustomerName');
  const addressInput = document.getElementById('cartCustomerAddress');
  const citySelect = document.getElementById('cartCitySelect');

  const customerName = nameInput && nameInput.value.trim() ? nameInput.value.trim() : '___';
  const customerAddress = addressInput && addressInput.value.trim() ? addressInput.value.trim() : '___';
  const customerCity = citySelect ? citySelect.value : 'Abbottabad';

  const subtotal = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  let shippingFee = 0;
  if (subtotal < STORE_CONFIG.freeDeliveryThreshold) {
    shippingFee = (customerCity === 'Abbottabad') ? STORE_CONFIG.shippingAbbottabad.fee : STORE_CONFIG.shippingNationwide.fee;
  }
  const grandTotal = subtotal + shippingFee;

  // Build items text lines
  const itemLines = cart.map(i => `${i.quantity}x ${i.name} (${i.sizeMl}ml) - ${formatPKR(i.price * i.quantity)}`).join('\n');

  // Exact requested format from user specification
  const message = `Hello ALHA, I want to order:
${itemLines}
Subtotal: ${formatPKR(subtotal)}
Delivery: ${shippingFee === 0 ? 'FREE' : formatPKR(shippingFee)}
Total: ${formatPKR(grandTotal)}
Name: ${customerName}
Address: ${customerAddress}
City: ${customerCity}
Payment: Cash on Delivery`;

  const cleanPhone = getCleanWhatsAppNumber();
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  window.open(waUrl, '_blank');
}

/* ==========================================================================
   Reviews Section Rendering
   ========================================================================== */
function renderReviewsSection() {
  const container = document.getElementById('reviewsGrid');
  if (!container) return;

  container.innerHTML = REVIEWS.map(r => `
    <div class="review-card">
      <div class="review-rating">
        ${Array(r.rating).fill('<i class="ri-star-fill"></i>').join('')}
      </div>
      <p class="review-quote">"${r.comment}"</p>
      <div class="review-author">
        <div class="author-info">
          <strong>${r.name}</strong>
          <span><i class="ri-map-pin-line"></i> ${r.city}</span>
        </div>
        <span class="review-perfume-tag">${r.perfume}</span>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   Contact Form Handler
   ========================================================================== */
function setupContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName').value;
    const phone = document.getElementById('contactPhone').value;
    const message = document.getElementById('contactMessage').value;

    const cleanPhone = getCleanWhatsAppNumber();
    const waText = `Hello ALHA Perfumes,
Customer Inquiry from Website:
Name: ${name}
Phone: ${phone}
Message: ${message}`;

    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(waText)}`;
    window.open(url, '_blank');
    showToast('Inquiry forwarded to WhatsApp support!');
    form.reset();
  });
}

/* ==========================================================================
   Toast Notification Helper
   ========================================================================== */
function showToast(message) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <i class="ri-sparkling-fill toast-icon"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(15px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}
