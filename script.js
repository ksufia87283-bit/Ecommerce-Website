/* ==========================================================================
   SK MAISON — script.js
   Sections: Data | Utilities | Render | Filters/Sort/Search | Cart |
             Wishlist | Quick View | Auth | Nav/Menu/Search UI | Theme |
             Scroll FX | Counters | Testimonials | Newsletter | Toasts | Init
   ========================================================================== */

/* ==========================================================================
   1. PRODUCT DATA
   ========================================================================== */
const IMG = (id, w = 600) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

const POOLS = {
  Sarees:   ['1610030181087-c1a35ce76de8','1583391733956-6c78276477e2','1585386959984-a4155224a1ad','1617627143750-d86bc21e42bb','1617196034796-73dfa7b1fd82','1622470953794-aa9c70b0fb9d','1610030181087-c1a35ce76de8','1583391733956-6c78276477e2','1585386959984-a4155224a1ad','1617627143750-d86bc21e42bb'],
  Hoodies:  ['1521572163474-6864f9cf17ab','1556905055-8f358a7a47b2','1620799140408-edc6dcb6d633','1509942774463-acf339cf87d5','1556821840-3a63f95609a7','1591195853828-11db59a44f6b','1521572163474-6864f9cf17ab','1556905055-8f358a7a47b2','1620799140408-edc6dcb6d633','1509942774463-acf339cf87d5'],
  Pants:    ['1524253482453-3fed8d2fe12b','1473966968600-fa801b869a1a','1552902865-b72c031ac5ea','1516257984-b1b4d707412e','1594633312681-425c7b97ccd1','1541099649105-f69ad21f3246','1524253482453-3fed8d2fe12b','1473966968600-fa801b869a1a','1552902865-b72c031ac5ea','1516257984-b1b4d707412e'],
  Dresses:  ['1503341960582-b45751874cf0','1490481651871-ab68de25d43d','1566174053879-31528523f8ae','1595777457583-95e059d581b8','1583391733982-8d3a3a992e4d','1495385794356-15371f348c31','1503341960582-b45751874cf0','1490481651871-ab68de25d43d','1566174053879-31528523f8ae','1595777457583-95e059d581b8'],
  'T-Shirts':['1596755094514-f87e34085b2c','1521572267360-ee0c2909d518','1503341504253-dff4815485f1','1576566588028-4147f3842f27','1562157873-818bc0726f68','1503341504253-dff4815485f1','1596755094514-f87e34085b2c','1521572267360-ee0c2909d518','1576566588028-4147f3842f27','1562157873-818bc0726f68'],
  Shirts:   ['1602810318383-e386cc2a3ccf','1596755094514-f87e34085b2c','1594938298603-c8148c4dae35','1489987707025-afc232f7ea0f','1550246140-29f40b909e5a','1602810318383-e386cc2a3ccf','1594938298603-c8148c4dae35','1489987707025-afc232f7ea0f','1550246140-29f40b909e5a','1602810318383-e386cc2a3ccf'],
  Jeans:    ['1441986300917-64674bd600d8','1542272604-787c3835535d','1475178626620-a4d074967452','1541099649105-f69ad21f3246','1584370848010-d7fe6bc767ec','1541099649105-f69ad21f3246','1441986300917-64674bd600d8','1542272604-787c3835535d','1475178626620-a4d074967452','1584370848010-d7fe6bc767ec'],
  Jackets:  ['1591047139829-d91aecb6caea','1551028719-00167b16eac5','1544923408-75c5cef46f14','1520975916090-3105956dac38','1548126032-079a0fb0099d','1591047139829-d91aecb6caea','1551028719-00167b16eac5','1544923408-75c5cef46f14','1520975916090-3105956dac38','1548126032-079a0fb0099d'],
  Kurtis:   ['1617196034796-73dfa7b1fd82','1622470953794-aa9c70b0fb9d','1610030181087-c1a35ce76de8','1585386959984-a4155224a1ad','1583391733956-6c78276477e2','1617627143750-d86bc21e42bb','1617196034796-73dfa7b1fd82','1622470953794-aa9c70b0fb9d','1610030181087-c1a35ce76de8','1585386959984-a4155224a1ad'],
  Shoes:    ['1509631179647-0177331693ae','1595950653106-6c9ebd614d3a','1560769629-975ec94e6a86','1543163521-1bf539c55dd2','1525966222134-fcfa99b8ae77','1595950653106-6c9ebd614d3a','1509631179647-0177331693ae','1560769629-975ec94e6a86','1543163521-1bf539c55dd2','1525966222134-fcfa99b8ae77']
};

const NAMES = {
  Sarees:   ['Kanjeevaram Silk Saree','Banarasi Zari Saree','Chiffon Draped Saree','Georgette Party Saree','Cotton Handloom Saree','Organza Embroidered Saree','Linen Weave Saree','Tussar Silk Saree','Velvet Border Saree','Printed Crepe Saree'],
  Hoodies:  ['Onyx Pullover Hoodie','Heritage Zip Hoodie','Oversized Fleece Hoodie','Cropped Comfort Hoodie','Gold-Stitch Hoodie','Heavyweight Cotton Hoodie','Minimal Logo Hoodie','Sherpa-Lined Hoodie','Tonal Grey Hoodie','Boxy Street Hoodie'],
  Pants:    ['Tailored Wide-Leg Pants','Pleated Trousers','Relaxed Chino Pants','Straight Cotton Pants','Linen Drawstring Pants','Cargo Utility Pants','High-Waist Palazzo','Slim Formal Trousers','Corduroy Trousers','Stretch Ankle Pants'],
  Dresses:  ['Silk Slip Dress','Draped Wrap Dress','Pleated Midi Dress','Off-Shoulder Evening Dress','Linen Sundress','Velvet Cocktail Dress','A-Line Day Dress','Satin Column Gown','Floral Wrap Dress','Ruched Bodycon Dress'],
  'T-Shirts':['Essential Crew Tee','Ribbed Muscle Tee','Oversized Graphic Tee','Pima Cotton Tee','Boxy Crop Tee','Long-Sleeve Layer Tee','Washed Vintage Tee','Striped Sailor Tee','Pocket Detail Tee','Heavyweight Tee'],
  Shirts:   ['Oxford Button-Down','Linen Resort Shirt','Silk Printed Shirt','Classic Poplin Shirt','Flannel Check Shirt','Denim Western Shirt','Satin Evening Shirt','Cuban Collar Shirt','Chambray Work Shirt','Striped Formal Shirt'],
  Jeans:    ['Slim Fit Dark Denim','Relaxed Straight Jeans','High-Rise Skinny Jeans','Vintage Wash Jeans','Wide-Leg Denim','Distressed Boyfriend Jeans','Bootcut Denim','Cropped Ankle Jeans','Black Coated Denim','Stretch Skinny Jeans'],
  Jackets:  ['Tailored Wool Blazer','Quilted Puffer Jacket','Leather Biker Jacket','Denim Trucker Jacket','Bomber Jacket','Trench Coat','Utility Field Jacket','Shearling Aviator Jacket','Cropped Moto Jacket','Overcoat Wool Coat'],
  Kurtis:   ['Anarkali Kurti Set','Straight-Cut Kurti','A-Line Printed Kurti','Embroidered Kurti','Chikankari Kurti','High-Low Kurti','Angrakha Style Kurti','Cotton Casual Kurti','Silk Festive Kurti','Layered Kurti Set'],
  Shoes:    ['Classic Leather Sneakers','Chunky Sole Sneakers','Suede Chelsea Boots','Minimal Court Shoes','Running Performance Shoes','Canvas Low-Tops','Platform Heels','Woven Loafers','Ankle Combat Boots','Strappy Sandals']
};

const CAT_HERO_IMG = {
  Sarees:'1610030181087-c1a35ce76de8', Hoodies:'1521572163474-6864f9cf17ab', Pants:'1524253482453-3fed8d2fe12b',
  Dresses:'1490481651871-ab68de25d43d', 'T-Shirts':'1596755094514-f87e34085b2c', Shirts:'1602810318383-e386cc2a3ccf',
  Jeans:'1441986300917-64674bd600d8', Jackets:'1591047139829-d91aecb6caea', Kurtis:'1617196034796-73dfa7b1fd82', Shoes:'1509631179647-0177331693ae'
};

const CATEGORIES = Object.keys(NAMES);
const GENDER_MAP = { Sarees:'Women', Dresses:'Women', Kurtis:'Women', Hoodies:'Unisex', Pants:'Unisex', 'T-Shirts':'Unisex', Shirts:'Men', Jeans:'Unisex', Jackets:'Unisex', Shoes:'Unisex' };

function seededRand(seed){ const x = Math.sin(seed) * 10000; return x - Math.floor(x); }

let PRODUCTS = [];
(function buildProducts(){
  let id = 1;
  CATEGORIES.forEach((cat, ci) => {
    for(let i = 0; i < 10; i++){
      const seed = ci * 37 + i * 7 + 3;
      const base = 24 + Math.floor(seededRand(seed) * 150);
      const hasDiscount = seededRand(seed + 1) > 0.35;
      const discountPct = hasDiscount ? (10 + Math.floor(seededRand(seed + 2) * 45)) : 0;
      const oldPrice = hasDiscount ? Math.round(base / (1 - discountPct / 100)) : null;
      const rating = Math.round((3.5 + seededRand(seed + 3) * 1.5) * 10) / 10;
      const reviews = 8 + Math.floor(seededRand(seed + 4) * 480);
      const daysAgo = Math.floor(seededRand(seed + 5) * 240);
      const gender = GENDER_MAP[cat] === 'Unisex' ? (seededRand(seed + 6) > 0.5 ? 'Women' : 'Men') : GENDER_MAP[cat];
      const inStock = seededRand(seed + 7) > 0.08;
      PRODUCTS.push({
        id: id++,
        name: NAMES[cat][i],
        category: cat,
        gender,
        price: base,
        oldPrice,
        discount: discountPct,
        rating,
        reviews,
        img: IMG(POOLS[cat][i], 500),
        imgLarge: IMG(POOLS[cat][i], 900),
        popularity: reviews * rating,
        daysAgo,
        inStock
      });
    }
  });
})();

/* ==========================================================================
   2. STATE
   ========================================================================== */
const state = {
  cart: JSON.parse(localStorage.getItem('sk_cart') || '[]'),
  wishlist: JSON.parse(localStorage.getItem('sk_wishlist') || '[]'),
  filters: { categories: new Set(), genders: new Set(), maxPrice: 300, minRating: 0, inStockOnly: false },
  search: '',
  sort: 'newest',
  visibleCount: 12
};

const fmt = n => `$${n.toFixed(2)}`;
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));
const findProduct = id => PRODUCTS.find(p => p.id === Number(id));

function saveCart(){ localStorage.setItem('sk_cart', JSON.stringify(state.cart)); }
function saveWishlist(){ localStorage.setItem('sk_wishlist', JSON.stringify(state.wishlist)); }

/* ==========================================================================
   3. STAR RATING RENDER
   ========================================================================== */
function starString(rating){
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  let s = '★'.repeat(full);
  if(half) s += '⯨';
  s += '☆'.repeat(5 - full - (half ? 1 : 0));
  return s;
}

/* ==========================================================================
   4. PRODUCT CARD TEMPLATE
   ========================================================================== */
function productCardHTML(p){
  const isFav = state.wishlist.includes(p.id);
  return `
  <div class="product-card" data-id="${p.id}">
    <div class="pc-media">
      ${p.discount ? `<span class="pc-badge">-${p.discount}%</span>` : ''}
      <button class="pc-fav ${isFav ? 'active' : ''}" data-fav="${p.id}" aria-label="Add to wishlist">
        <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.9-10-9.3C.4 8.2 2 4.5 5.6 4c2-.3 3.8.7 4.9 2.3C11.6 4.7 13.4 3.7 15.4 4c3.6.5 5.2 4.2 3.6 7.7C19.5 16.1 12 21 12 21z"/></svg>
      </button>
      <img src="${p.img}" alt="${p.name}" loading="lazy">
      <div class="pc-actions">
        <button data-quickview="${p.id}">Quick View</button>
        <button data-add="${p.id}">Add to Cart</button>
      </div>
    </div>
    <div class="pc-body">
      <span class="pc-cat">${p.category}</span>
      <h3 class="pc-name">${p.name}</h3>
      <div class="pc-rating"><span>${starString(p.rating)}</span><span class="rv">${p.rating} (${p.reviews})</span></div>
      <div class="pc-price-row">
        <span class="pc-price">${fmt(p.price)}</span>
        ${p.oldPrice ? `<span class="pc-old-price">${fmt(p.oldPrice)}</span>` : ''}
      </div>
      ${!p.inStock ? '<span style="font-size:.72rem;color:#c0463f;">Out of stock</span>' : ''}
    </div>
  </div>`;
}

/* ==========================================================================
   5. FILTER / SORT / SEARCH PIPELINE
   ========================================================================== */
function getFilteredProducts(){
  let list = PRODUCTS.filter(p => {
    if(state.filters.categories.size && !state.filters.categories.has(p.category)) return false;
    if(state.filters.genders.size && !state.filters.genders.has(p.gender)) return false;
    if(p.price > state.filters.maxPrice) return false;
    if(p.rating < state.filters.minRating) return false;
    if(state.filters.inStockOnly && !p.inStock) return false;
    if(state.search){
      const q = state.search.toLowerCase();
      if(!p.name.toLowerCase().includes(q) && !p.category.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  switch(state.sort){
    case 'price-low': list.sort((a,b) => a.price - b.price); break;
    case 'price-high': list.sort((a,b) => b.price - a.price); break;
    case 'popular': list.sort((a,b) => b.popularity - a.popularity); break;
    default: list.sort((a,b) => a.daysAgo - b.daysAgo);
  }
  return list;
}

function renderShopGrid(){
  const list = getFilteredProducts();
  const grid = $('#productGrid');
  const visible = list.slice(0, state.visibleCount);
  grid.innerHTML = visible.length ? visible.map(productCardHTML).join('') :
    `<p style="grid-column:1/-1;text-align:center;color:var(--text-soft);padding:40px 0;">No products match your filters. Try adjusting them.</p>`;
  $('#resultsCount').textContent = `${list.length} product${list.length !== 1 ? 's' : ''}`;
  $('#loadMoreBtn').style.display = state.visibleCount < list.length ? 'inline-flex' : 'none';
  observeReveal();
}

/* ==========================================================================
   6. FILTER SIDEBAR BUILD
   ========================================================================== */
function buildFilterSidebar(){
  $('#filterCategory').innerHTML = CATEGORIES.map(c =>
    `<label><input type="checkbox" class="cat-check" value="${c}"><span>${c} <span style="color:var(--text-soft)">(${PRODUCTS.filter(p=>p.category===c).length})</span></span></label>`
  ).join('');

  $('#filterRating').innerHTML = [4,3,2].map(r =>
    `<label><input type="radio" name="rating" class="rating-check" value="${r}"><span>${'★'.repeat(r)}${'☆'.repeat(5-r)} & up</span></label>`
  ).join('') + `<label><input type="radio" name="rating" class="rating-check" value="0" checked><span>All Ratings</span></label>`;

  $$('.cat-check').forEach(cb => cb.addEventListener('change', () => {
    cb.checked ? state.filters.categories.add(cb.value) : state.filters.categories.delete(cb.value);
    state.visibleCount = 12; renderShopGrid();
  }));
  $$('.gender-check').forEach(cb => cb.addEventListener('change', () => {
    cb.checked ? state.filters.genders.add(cb.value) : state.filters.genders.delete(cb.value);
    state.visibleCount = 12; renderShopGrid();
  }));
  $$('.rating-check').forEach(rb => rb.addEventListener('change', () => {
    state.filters.minRating = Number(rb.value); state.visibleCount = 12; renderShopGrid();
  }));
  $('#priceRange').addEventListener('input', e => {
    state.filters.maxPrice = Number(e.target.value);
    $('#priceRangeVal').textContent = e.target.value;
    state.visibleCount = 12; renderShopGrid();
  });
  $('#inStockOnly').addEventListener('change', e => {
    state.filters.inStockOnly = e.target.checked; state.visibleCount = 12; renderShopGrid();
  });
  $('#clearFilters').addEventListener('click', () => {
    state.filters = { categories: new Set(), genders: new Set(), maxPrice: 300, minRating: 0, inStockOnly: false };
    $$('.cat-check, .gender-check').forEach(cb => cb.checked = false);
    $('#inStockOnly').checked = false;
    $('input[name=rating][value="0"]').checked = true;
    $('#priceRange').value = 300; $('#priceRangeVal').textContent = 300;
    state.visibleCount = 12; renderShopGrid();
    showToast('Filters cleared');
  });
  $('#sortSelect').addEventListener('change', e => { state.sort = e.target.value; renderShopGrid(); });
  $('#loadMoreBtn').addEventListener('click', () => { state.visibleCount += 12; renderShopGrid(); });
}

/* ==========================================================================
   7. CATEGORY GRID + NEW ARRIVALS + BEST SELLERS
   ========================================================================== */
function renderCategoryGrid(){
  $('#catGrid').innerHTML = CATEGORIES.map(c => `
    <div class="cat-card reveal" data-cat-link="${c}">
      <img src="${IMG(CAT_HERO_IMG[c], 500)}" alt="${c}">
      <span class="cat-label">${c}</span>
    </div>`).join('');
  $$('[data-cat-link]').forEach(el => el.addEventListener('click', e => {
    e.preventDefault();
    const cat = el.getAttribute('data-cat-link');
    state.filters.categories = new Set([cat]);
    buildFilterSidebar();
    $(`.cat-check[value="${cat}"]`).checked = true;
    renderShopGrid();
    document.getElementById('shop').scrollIntoView({ behavior:'smooth' });
  }));
}

function renderNewArrivals(){
  const list = [...PRODUCTS].sort((a,b) => a.daysAgo - b.daysAgo).slice(0, 12);
  $('#newArrivalsScroll').innerHTML = list.map(productCardHTML).join('');
}

function renderBestSellers(){
  const list = [...PRODUCTS].sort((a,b) => b.popularity - a.popularity).slice(0, 8);
  $('#bestSellersGrid').innerHTML = list.map(productCardHTML).join('');
}

/* delegate add-to-cart / fav / quickview clicks across whole document */
document.addEventListener('click', e => {
  const addBtn = e.target.closest('[data-add]');
  const favBtn = e.target.closest('[data-fav]');
  const qvBtn = e.target.closest('[data-quickview]');
  const card = e.target.closest('.product-card');

  if(addBtn){ addToCart(Number(addBtn.dataset.add)); }
  else if(favBtn){ toggleWishlist(Number(favBtn.dataset.fav)); }
  else if(qvBtn){ openQuickView(Number(qvBtn.dataset.quickview)); }
  else if(card && !e.target.closest('button')){ openQuickView(Number(card.dataset.id)); }
});

/* ==========================================================================
   8. CART LOGIC
   ========================================================================== */
function addToCart(id, qty = 1){
  const product = findProduct(id);
  if(!product.inStock){ showToast('This item is currently out of stock', 'error'); return; }
  const existing = state.cart.find(i => i.id === id);
  if(existing) existing.qty += qty; else state.cart.push({ id, qty });
  saveCart(); renderCartUI(); showToast(`${product.name} added to bag`);
  pulseIcon('#cartToggle');
}
function removeFromCart(id){ state.cart = state.cart.filter(i => i.id !== id); saveCart(); renderCartUI(); }
function changeQty(id, delta){
  const item = state.cart.find(i => i.id === id);
  if(!item) return;
  item.qty += delta;
  if(item.qty <= 0) removeFromCart(id); else { saveCart(); renderCartUI(); }
}
function emptyCart(){ state.cart = []; saveCart(); renderCartUI(); showToast('Bag emptied'); }

function renderCartUI(){
  const items = state.cart.map(i => ({ ...i, product: findProduct(i.id) })).filter(i => i.product);
  const count = items.reduce((s,i) => s + i.qty, 0);
  $('#cartBadge').textContent = count;
  $('#cartCountLabel').textContent = `(${count})`;

  const wrap = $('#cartItems');
  const summary = $('#cartSummary');
  const empty = $('#cartEmptyState');

  if(!items.length){
    wrap.style.display = 'none'; summary.style.display = 'none'; empty.style.display = 'flex';
    return;
  }
  wrap.style.display = 'block'; summary.style.display = 'flex'; empty.style.display = 'none';

  wrap.innerHTML = items.map(i => `
    <div class="cart-item" data-id="${i.id}">
      <img src="${i.product.img}" alt="${i.product.name}">
      <div class="cart-item-info">
        <span class="ci-cat">${i.product.category}</span>
        <span class="ci-name">${i.product.name}</span>
        <div class="ci-qty-row">
          <button class="qty-btn" data-dec="${i.id}">−</button>
          <span>${i.qty}</span>
          <button class="qty-btn" data-inc="${i.id}">+</button>
        </div>
        <button class="ci-remove" data-remove="${i.id}">Remove</button>
      </div>
      <span class="ci-price">${fmt(i.product.price * i.qty)}</span>
    </div>`).join('');

  const subtotal = items.reduce((s,i) => s + i.product.price * i.qty, 0);
  const tax = subtotal * 0.08;
  const shipping = subtotal > 120 || subtotal === 0 ? 0 : 9.99;
  $('#cartSubtotal').textContent = fmt(subtotal);
  $('#cartTax').textContent = fmt(tax);
  $('#cartShipping').textContent = shipping === 0 ? 'Free' : fmt(shipping);
  $('#cartTotal').textContent = fmt(subtotal + tax + shipping);
}

document.addEventListener('click', e => {
  const inc = e.target.closest('[data-inc]'); const dec = e.target.closest('[data-dec]'); const rem = e.target.closest('[data-remove]');
  if(inc) changeQty(Number(inc.dataset.inc), 1);
  if(dec) changeQty(Number(dec.dataset.dec), -1);
  if(rem) removeFromCart(Number(rem.dataset.remove));
});

/* ==========================================================================
   9. WISHLIST LOGIC
   ========================================================================== */
function toggleWishlist(id){
  const product = findProduct(id);
  const idx = state.wishlist.indexOf(id);
  if(idx > -1){ state.wishlist.splice(idx,1); showToast(`Removed from wishlist`); }
  else { state.wishlist.push(id); showToast(`${product.name} added to wishlist`); pulseIcon('#wishlistToggle'); }
  saveWishlist();
  $$(`[data-fav="${id}"]`).forEach(btn => btn.classList.toggle('active', state.wishlist.includes(id)));
  renderWishlistUI();
}
function renderWishlistUI(){
  $('#wishlistBadge').textContent = state.wishlist.length;
  $('#wishlistCountLabel').textContent = `(${state.wishlist.length})`;
  const wrap = $('#wishlistItems'); const empty = $('#wishlistEmptyState');
  if(!state.wishlist.length){ wrap.style.display='none'; empty.style.display='flex'; return; }
  wrap.style.display='block'; empty.style.display='none';
  wrap.innerHTML = state.wishlist.map(id => {
    const p = findProduct(id);
    return `<div class="cart-item" data-id="${p.id}">
      <img src="${p.img}" alt="${p.name}">
      <div class="cart-item-info">
        <span class="ci-cat">${p.category}</span>
        <span class="ci-name">${p.name}</span>
        <button class="ci-remove" data-add="${p.id}" style="text-decoration:none;color:var(--gold-deep);">Move to Bag</button>
        <button class="ci-remove" data-fav="${p.id}">Remove</button>
      </div>
      <span class="ci-price">${fmt(p.price)}</span>
    </div>`;
  }).join('');
}

/* ==========================================================================
   10. QUICK VIEW MODAL
   ========================================================================== */
function openQuickView(id){
  const p = findProduct(id);
  $('#qvBody').innerHTML = `
    <div class="qv-media"><img src="${p.imgLarge}" alt="${p.name}"></div>
    <div class="qv-info">
      <span class="pc-cat">${p.category} · ${p.gender}</span>
      <h2>${p.name}</h2>
      <div class="pc-rating"><span>${starString(p.rating)}</span><span class="rv">${p.rating} (${p.reviews} reviews)</span></div>
      <div class="pc-price-row"><span class="pc-price" style="font-size:1.3rem;">${fmt(p.price)}</span>${p.oldPrice ? `<span class="pc-old-price">${fmt(p.oldPrice)}</span><span class="pc-badge" style="position:static;">-${p.discount}%</span>` : ''}</div>
      <p class="qv-desc">Crafted from premium materials with meticulous attention to detail, this piece from our ${p.category.toLowerCase()} edit pairs timeless silhouette with modern comfort. ${p.inStock ? 'Ships within 2-4 business days.' : 'Currently out of stock — join the waitlist.'}</p>
      <div class="qv-qty">
        <button class="qty-btn" id="qvDec">−</button>
        <span id="qvQty">1</span>
        <button class="qty-btn" id="qvInc">+</button>
      </div>
      <div class="qv-actions">
        <button class="btn-gold" id="qvAddBtn" ${!p.inStock ? 'disabled style="opacity:.5;"' : ''}>Add to Cart</button>
        <button class="btn-outline" id="qvFavBtn" style="color:var(--text);border-color:var(--text);">${state.wishlist.includes(p.id) ? 'In Wishlist ♥' : 'Wishlist'}</button>
      </div>
    </div>`;
  let qty = 1;
  $('#qvInc').addEventListener('click', () => { qty++; $('#qvQty').textContent = qty; });
  $('#qvDec').addEventListener('click', () => { if(qty>1){ qty--; $('#qvQty').textContent = qty; } });
  $('#qvAddBtn').addEventListener('click', () => { addToCart(p.id, qty); });
  $('#qvFavBtn').addEventListener('click', () => { toggleWishlist(p.id); $('#qvFavBtn').textContent = state.wishlist.includes(p.id) ? 'In Wishlist ♥' : 'Wishlist'; });
  openModal('quickViewModal');
}

/* ==========================================================================
   11. MODAL OPEN/CLOSE HELPERS
   ========================================================================== */
function openModal(id){ $(`#${id}`).classList.add('show'); document.body.style.overflow='hidden'; }
function closeModal(id){ $(`#${id}`).classList.remove('show'); document.body.style.overflow=''; }
$$('.modal-close').forEach(btn => btn.addEventListener('click', () => closeModal(btn.dataset.close)));
$$('.modal-overlay').forEach(ov => ov.addEventListener('click', e => { if(e.target === ov) closeModal(ov.id); }));

$('#loginOpenBtn').addEventListener('click', () => openModal('loginModal'));
$('#signupOpenBtn').addEventListener('click', () => openModal('signupModal'));
$('#switchToSignup').addEventListener('click', e => { e.preventDefault(); closeModal('loginModal'); openModal('signupModal'); });
$('#switchToLogin').addEventListener('click', e => { e.preventDefault(); closeModal('signupModal'); openModal('loginModal'); });
$('#forgotPasswordLink').addEventListener('click', e => { e.preventDefault(); showToast('Password reset link sent (demo)'); });
$('#cartEmptyShopBtn').addEventListener('click', () => closeCartDrawer());
$('#wishlistEmptyShopBtn').addEventListener('click', () => closeWishlistDrawer());

/* ==========================================================================
   12. AUTH VALIDATION
   ========================================================================== */
function setError(fieldId, msg){ const el = $(`#${fieldId}Error`); if(el) el.textContent = msg || ''; const input = $(`#${fieldId}`); if(input) input.classList.toggle('invalid', !!msg); }
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

$('#loginForm').addEventListener('submit', e => {
  e.preventDefault();
  let ok = true;
  const email = $('#loginEmail').value.trim(); const pass = $('#loginPassword').value;
  if(!emailRe.test(email)){ setError('loginEmail','Please enter a valid email address'); ok = false; } else setError('loginEmail','');
  if(pass.length < 6){ setError('loginPassword','Password must be at least 6 characters'); ok = false; } else setError('loginPassword','');
  if(!ok) return;
  showToast(`Welcome back, ${email.split('@')[0]}!`);
  closeModal('loginModal'); e.target.reset();
});

$('#signupForm').addEventListener('submit', e => {
  e.preventDefault();
  let ok = true;
  const name = $('#signupName').value.trim();
  const email = $('#signupEmail').value.trim();
  const phone = $('#signupPhone').value.trim();
  const pass = $('#signupPassword').value;
  const confirm = $('#signupConfirm').value;
  const terms = $('#signupTerms').checked;

  if(name.length < 2){ setError('signupName','Please enter your full name'); ok=false; } else setError('signupName','');
  if(!emailRe.test(email)){ setError('signupEmail','Please enter a valid email address'); ok=false; } else setError('signupEmail','');
  if(phone.replace(/\D/g,'').length < 7){ setError('signupPhone','Please enter a valid phone number'); ok=false; } else setError('signupPhone','');
  if(pass.length < 6){ setError('signupPassword','Password must be at least 6 characters'); ok=false; } else setError('signupPassword','');
  if(confirm !== pass || !confirm){ setError('signupConfirm','Passwords do not match'); ok=false; } else setError('signupConfirm','');
  if(!terms){ setError('signupTerms','You must agree to continue'); ok=false; } else setError('signupTerms','');
  if(!ok) return;

  showToast(`Account created — welcome, ${name.split(' ')[0]}!`);
  closeModal('signupModal'); e.target.reset();
});

/* ==========================================================================
   13. NAV / MOBILE MENU / SEARCH / SHRINK
   ========================================================================== */
const navbar = $('#navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('shrink', window.scrollY > 40);
  toggleScrollTop();
  parallaxHero();
}, { passive:true });

$('#hamburgerBtn').addEventListener('click', () => {
  $('#hamburgerBtn').classList.toggle('active');
  $('#navLinks').classList.toggle('open');
});
$$('.nav-link').forEach(link => link.addEventListener('click', () => {
  $$('.nav-link').forEach(l => l.classList.remove('active'));
  link.classList.add('active');
  $('#hamburgerBtn').classList.remove('active');
  $('#navLinks').classList.remove('open');
}));

$('#searchToggle').addEventListener('click', () => {
  $('#searchPanel').classList.toggle('open');
  if($('#searchPanel').classList.contains('open')) setTimeout(() => $('#searchInput').focus(), 300);
});
$('#searchClose').addEventListener('click', () => $('#searchPanel').classList.remove('open'));

$('#searchInput').addEventListener('input', e => {
  const q = e.target.value.trim();
  state.search = q;
  if(q.length){
    const matches = PRODUCTS.filter(p => p.name.toLowerCase().includes(q.toLowerCase()) || p.category.toLowerCase().includes(q.toLowerCase())).slice(0,5);
    $('#searchSuggestions').innerHTML = matches.length ? matches.map(p => `<div class="sugg-item" data-goto="${p.id}"><span>${p.name}</span><span class="sp">${fmt(p.price)}</span></div>`).join('') : `<div class="sugg-item">No results for "${q}"</div>`;
  } else { $('#searchSuggestions').innerHTML = ''; }
  state.visibleCount = 12; renderShopGrid();
});
$('#searchSuggestions').addEventListener('click', e => {
  const item = e.target.closest('[data-goto]');
  if(item){ $('#searchPanel').classList.remove('open'); openQuickView(Number(item.dataset.goto)); }
});

/* ==========================================================================
   14. CART / WISHLIST DRAWERS
   ========================================================================== */
const cartDrawer = $('#cartDrawer'), wishlistDrawer = $('#wishlistDrawer'), overlay = $('#cartOverlay');
function openCartDrawer(){ cartDrawer.classList.add('open'); overlay.classList.add('show'); }
function closeCartDrawer(){ cartDrawer.classList.remove('open'); overlay.classList.remove('show'); }
function openWishlistDrawer(){ wishlistDrawer.classList.add('open'); overlay.classList.add('show'); }
function closeWishlistDrawer(){ wishlistDrawer.classList.remove('open'); overlay.classList.remove('show'); }

$('#cartToggle').addEventListener('click', openCartDrawer);
$('#cartCloseBtn').addEventListener('click', closeCartDrawer);
$('#wishlistToggle').addEventListener('click', openWishlistDrawer);
$('#wishlistCloseBtn').addEventListener('click', closeWishlistDrawer);
overlay.addEventListener('click', () => { closeCartDrawer(); closeWishlistDrawer(); });
$('#emptyCartBtn').addEventListener('click', emptyCart);
$('#checkoutBtn').addEventListener('click', () => {
  if(!state.cart.length){ showToast('Your bag is empty', 'error'); return; }
  showToast('Redirecting to secure checkout... (demo)');
});

/* ==========================================================================
   15. THEME TOGGLE
   ========================================================================== */
const themeToggle = $('#themeToggle');
function applyTheme(theme){
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('sk_theme', theme);
}
applyTheme(localStorage.getItem('sk_theme') || 'light');
themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

/* ==========================================================================
   16. SCROLL TO TOP
   ========================================================================== */
function toggleScrollTop(){ $('#scrollTopBtn').classList.toggle('show', window.scrollY > 500); }
$('#scrollTopBtn').addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));

/* ==========================================================================
   17. REVEAL ON SCROLL
   ========================================================================== */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add('in-view'); revealObserver.unobserve(entry.target); } });
}, { threshold:0.12 });
function observeReveal(){ $$('.reveal:not(.in-view)').forEach(el => revealObserver.observe(el)); }

/* ==========================================================================
   18. ANIMATED COUNTERS
   ========================================================================== */
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const el = entry.target; const target = Number(el.dataset.target); let cur = 0;
      const step = Math.max(1, Math.ceil(target / 60));
      const t = setInterval(() => { cur += step; if(cur >= target){ cur = target; clearInterval(t); } el.textContent = cur; }, 25);
      counterObserver.unobserve(el);
    }
  });
}, { threshold:0.4 });
$$('.stat-num').forEach(el => counterObserver.observe(el));

/* ==========================================================================
   19. HERO PARALLAX + CROSSFADE
   ========================================================================== */
const heroImgs = $$('.hero-img'); let heroIdx = 0;
setInterval(() => {
  heroImgs[heroIdx].classList.remove('active');
  heroIdx = (heroIdx + 1) % heroImgs.length;
  heroImgs[heroIdx].classList.add('active');
}, 5500);
function parallaxHero(){
  const hero = $('.hero'); if(!hero) return;
  const rect = hero.getBoundingClientRect();
  if(rect.bottom < 0 || rect.top > window.innerHeight) return;
  const offset = window.scrollY * 0.25;
  $('.hero-content').style.transform = `translateY(${offset * 0.4}px)`;
}

/* ==========================================================================
   20. TESTIMONIALS SLIDER
   ========================================================================== */
const TESTIMONIALS = [
  { name:'Amara Whitfield', role:'Verified Buyer', img:'1494790108377-be9c29b29330', rating:5, quote:'The tailoring is impeccable — every piece feels like it was made just for me. SK has become my go-to for anything special.' },
  { name:'Devon Marsh', role:'Verified Buyer', img:'1500648767791-00dcc994a43e', rating:5, quote:'Fast shipping, gorgeous packaging, and the hoodie quality is unmatched. Worth every penny.' },
  { name:'Priya Nair', role:'Verified Buyer', img:'1544005313-94ddf0286df2', rating:4, quote:'Beautiful saree collection with real craftsmanship. Customer support was wonderful when I needed a size exchange.' },
  { name:'Lucas Bennett', role:'Verified Buyer', img:'1507003211169-0a1dd7228f2d', rating:5, quote:'I have never owned a jacket this well constructed. The gold detailing makes it feel genuinely luxury.' },
  { name:'Sofia Delgado', role:'Verified Buyer', img:'1508214751196-bcfd4ca60f91', rating:5, quote:'SK dresses fit true to size and photograph beautifully. My whole closet is slowly becoming SK.' }
];
let testiIdx = 0;
function renderTestimonials(){
  $('#testiTrack').innerHTML = `<div class="testi-track-inner" id="testiInner">${TESTIMONIALS.map(t => `
    <div class="testi-card">
      <img src="${IMG(t.img,160)}" alt="${t.name}">
      <div class="stars">${'★'.repeat(t.rating)}${'☆'.repeat(5-t.rating)}</div>
      <p class="quote">"${t.quote}"</p>
      <p class="name">${t.name}</p>
      <p class="role">${t.role}</p>
    </div>`).join('')}</div>`;
  $('#testiDots').innerHTML = TESTIMONIALS.map((_,i) => `<span data-dot="${i}" class="${i===0?'active':''}"></span>`).join('');
  updateTestiPos();
}
function updateTestiPos(){
  const inner = $('#testiInner'); if(!inner) return;
  inner.style.transform = `translateX(-${testiIdx * 100}%)`;
  $$('#testiDots span').forEach((d,i) => d.classList.toggle('active', i===testiIdx));
}
$('#testiPrev').addEventListener('click', () => { testiIdx = (testiIdx - 1 + TESTIMONIALS.length) % TESTIMONIALS.length; updateTestiPos(); });
$('#testiNext').addEventListener('click', () => { testiIdx = (testiIdx + 1) % TESTIMONIALS.length; updateTestiPos(); });
$('#testiDots').addEventListener('click', e => { const dot = e.target.closest('[data-dot]'); if(dot){ testiIdx = Number(dot.dataset.dot); updateTestiPos(); } });
setInterval(() => { testiIdx = (testiIdx + 1) % TESTIMONIALS.length; updateTestiPos(); }, 7000);

/* ==========================================================================
   21. NEWSLETTER
   ========================================================================== */
$('#newsletterForm').addEventListener('submit', e => {
  e.preventDefault();
  const email = $('#newsletterEmail').value.trim();
  if(!emailRe.test(email)){ showToast('Please enter a valid email address', 'error'); return; }
  showToast('You are on the list — welcome to the inner circle');
  e.target.reset();
});

/* ==========================================================================
   22. TOASTS
   ========================================================================== */
function showToast(message, type = 'success'){
  const container = $('#toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  if(type === 'error') toast.style.borderLeftColor = '#d0463f';
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => { toast.classList.add('out'); setTimeout(() => toast.remove(), 350); }, 3200);
}
function pulseIcon(sel){ const el = $(sel); if(!el) return; el.style.transform='scale(1.25)'; setTimeout(()=> el.style.transform='', 220); }

/* ==========================================================================
   23. INIT
   ========================================================================== */
document.getElementById('year').textContent = new Date().getFullYear();
buildFilterSidebar();
renderCategoryGrid();
renderNewArrivals();
renderShopGrid();
renderBestSellers();
renderTestimonials();
renderCartUI();
renderWishlistUI();
observeReveal();
