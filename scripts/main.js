// --- ENHANCED main.js (Conceptual Changes) ---

let cart = []; // Now stores { product: {...}, quantity: N }

// --- 1. Product Display Logic (For index.html and products.html) ---
function displayProducts(filteredProducts = products) {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) return;

    productGrid.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button class="btn add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
        `;
        productGrid.appendChild(productCard);
    });
}

// --- 2. Cart Management Logic ---
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const cartItemIndex = cart.findIndex(item => item.product.id === productId);
        
        if (cartItemIndex > -1) {
            // Item exists, increase quantity
            cart[cartItemIndex].quantity += 1;
        } else {
            // New item, add to cart
            cart.push({ product: product, quantity: 1 });
        }
        updateCartCount();
        showNotification(`${product.name} added to cart!`);
    }
}

function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        let totalItems = 0;
        cart.forEach(item => totalItems += item.quantity);
        cartCountElement.textContent = totalItems;
    }
}

function renderCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const subtotalEl = document.getElementById('subtotal');
    const totalEl = document.getElementById('total');
    
    cartItemsContainer.innerHTML = '';
    let subtotal = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        subtotalEl.textContent = '$0.00';
        totalEl.textContent = '$0.00';
        return;
    }

    cart.forEach(item => {
        const itemTotal = item.product.price * item.quantity;
        subtotal += itemTotal;

        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        cartItemDiv.innerHTML = `
            <p>${item.product.name} (x${item.quantity})</p>
            <p>$${itemTotal.toFixed(2)}</p>
        `;
        cartItemsContainer.appendChild(cartItemDiv);
    });

    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    totalEl.textContent = `$${subtotal.toFixed(2)}`;
}


// --- 3. Filtering Logic (For products.html) ---
function filterProducts(category) {
    const filtered = category === 'all' 
        ? products 
        : products.filter(p => p.category === category);
    displayProducts(filtered);
}

// Initialization on Load
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('productGrid')) {
        displayProducts(); // Load all products initially
    }
    renderCart(); // Render cart content on cart page
});
