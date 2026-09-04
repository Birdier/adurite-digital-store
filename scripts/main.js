// --- ENHANCED main.js with Local Storage Persistence ---

const PRODUCTS_STORAGE_KEY = 'aduriteProducts';
const CART_STORAGE_KEY = 'aduriteCart';

// Sample product data (Keep this the same)
const products = [
    { id: 1, name: "Digital Design Template", price: 19.99, description: "Premium design template for professional use", image: "assets/images/placeholder.jpg", category: "design" },
    { id: 2, name: "Software License Key", price: 29.99, description: "Full license for professional software", image: "assets/images/placeholder.jpg", category: "software" },
    { id: 3, name: "E-book Collection", price: 9.99, description: "Comprehensive guide for digital creators", image: "assets/images/placeholder.jpg", category: "guides" },
    { id: 4, name: "UI/UX Design Kit", price: 24.99, description: "Complete design system for modern interfaces", image: "assets/images/placeholder.jpg", category: "design" },
    { id: 5, name: "Marketing Analytics Dashboard", price: 39.99, description: "Professional analytics dashboard for marketers", image: "assets/images/placeholder.jpg", category: "design" },
    { id: 6, name: "Business Strategy Guide", price: 14.99, description: "Complete guide for business development", image: "assets/images/placeholder.jpg", category: "guides" }
];


// --- CORE FUNCTIONS ---

function loadCart() {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    if (cartData) {
        cart = JSON.parse(cartData);
    } else {
        cart = [];
    }
}

function saveCart() {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}


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
        saveCart(); // <-- THIS IS THE KEY STEP!
        updateCartCount();
        showNotification(`${product.name} added to cart!`);
    }
}

function updateCartCount() {
    let totalItems = 0;
    cart.forEach(item => totalItems += item.quantity);
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
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


// --- FILTERING LOGIC (For products.html) ---
function filterProducts(category) {
    const filtered = category === 'all' 
        ? products 
        : products.filter(p => p.category === category);
    displayProducts(filtered);
}


// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    loadCart(); // Load cart data from storage on startup
    displayProducts(); // Load initial products
    updateCartCount();
    
    // Event listeners setup (Keep these the same)
    document.addEventListener('click', (e) => {
        if (e.target.closest('.add-to-cart-btn')) {
            const productId = parseInt(e.target.closest('.add-to-cart-btn').dataset.id);
            addToCart(productId);
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// Function to handle filter button clicks (Needs to be called on products.html load)
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            filterProducts(filter);
        });
    });
});
