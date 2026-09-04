// --- FULL WORKING main.js ---

const PRODUCTS_STORAGE_KEY = 'aduriteProducts';
const CART_STORAGE_KEY = 'aduriteCart';

// Sample product data
const products = [
    { id: 1, name: "Digital Design Template", price: 19.99, description: "Premium design template for professional use", image: "assets/images/placeholder.jpg", category: "design" },
    { id: 2, name: "Software License Key", price: 29.99, description: "Full license for professional software", image: "assets/images/placeholder.jpg", category: "software" },
    { id: 3, name: "E-book Collection", price: 9.99, description: "Comprehensive guide for digital creators", image: "assets/images/placeholder.jpg", category: "guides" },
    { id: 4, name: "UI/UX Design Kit", price: 24.99, description: "Complete design system for modern interfaces", image: "assets/images/placeholder.jpg", category: "design" },
    { id: 5, name: "Marketing Analytics Dashboard", price: 39.99, description: "Professional analytics dashboard for marketers", image: "assets/images/placeholder.jpg", category: "design" },
    { id: 6, name: "Business Strategy Guide", price: 14.99, description: "Complete guide for business development", image: "assets/images/placeholder.jpg", category: "guides" }
];

let cart = [];

// --- LOCAL STORAGE HANDLING ---
function loadCart() {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    if (cartData) {
        try {
            cart = JSON.parse(cartData);
        } catch (e) {
            console.error('Failed to parse cart:', e);
            cart = [];
        }
    } else {
        cart = [];
    }
}

function saveCart() {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
        console.error('Failed to save cart:', e);
    }
}

// --- PRODUCT DISPLAY ---
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

// --- CART MANAGEMENT ---
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
        saveCart(); // Save to localStorage
        updateCartCount();
        showNotification(`${product.name} added to cart!`);
    }
}

function removeFromCart(productId) {
    const index = cart.findIndex(item => item.product.id === productId);
    if (index !== -1) {
        cart.splice(index, 1);
        saveCart();
        updateCartCount();
        renderCart();
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
    
    // Ensure we have the container
    if (cartItemsContainer) {
        // Clear previous content
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            if (subtotalEl) subtotalEl.textContent = '$0.00';
            if (totalEl) totalEl.textContent = '$0.00';
            return;
        }
        
        let subtotal = 0;
        
        // Add each item to the cart
        cart.forEach(item => {
            const itemTotal = item.product.price * item.quantity;
            subtotal += itemTotal;

            const cartItemDiv = document.createElement('div');
            cartItemDiv.className = 'cart-item';
            cartItemDiv.innerHTML = `
                <p>${item.product.name} (x${item.quantity})</p>
                <p>$${itemTotal.toFixed(2)}</p>
                <button class="remove-btn" data-id="${item.product.id}">✕</button>
            `;
            cartItemsContainer.appendChild(cartItemDiv);
        });

        if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
        if (totalEl) totalEl.textContent = `$${subtotal.toFixed(2)}`;
    }
}

// --- SEARCH FUNCTIONALITY ---
function searchProducts(query) {
    if (!query.trim()) {
        displayProducts(products);
        return;
    }
    
    const filtered = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );
    displayProducts(filtered);
}

// --- FILTERING LOGIC ---
function filterProducts(category) {
    const filtered = category === 'all' 
        ? products 
        : products.filter(p => p.category === category);
    displayProducts(filtered);
}

// --- NAVIGATION SETUP ---
document.addEventListener('DOMContentLoaded', () => {
    loadCart(); // Load cart data from storage on startup
    updateCartCount();
    
    // Setup search functionality
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchProducts(this.value);
        });
    }
    
    // Event listeners setup
    document.addEventListener('click', (e) => {
        if (e.target.closest('.add-to-cart-btn')) {
            const productId = parseInt(e.target.closest('.add-to-cart-btn').dataset.id);
            addToCart(productId);
        }
        
        if (e.target.closest('.remove-btn')) {
            const productId = parseInt(e.target.closest('.remove-btn').dataset.id);
            removeFromCart(productId);
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
    
    // Initialize with all products
    displayProducts(products);
    
    // Setup filter buttons
    setTimeout(() => {
        setupFilterButtons();
    }, 100);
});

// --- FILTER BUTTONS ---
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                filterProducts(filter);
            });
        });
    }
}

// --- Notification System ---
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 1000;
        animation: slideIn 0.3s;
        transition: opacity 0.3s;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
    
    // Add slideIn animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
        }
    `;
    document.head.appendChild(style);
}

// --- Initialize everything ---
document.addEventListener('DOMContentLoaded', () => {
    // Make sure cart count is updated on all pages
    updateCartCount();
    
    // Ensure search works on all pages
    if (document.getElementById('search-input')) {
        document.getElementById('search-input').addEventListener('input', function() {
            searchProducts(this.value);
        });
    }
    
    // Handle product detail page initialization
    if (document.querySelector('.product-title')) {
        updateCartCount();
        renderCart();
    }
});

// --- Thumbnail Handling ---
function setupThumbnailClicks() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            this.classList.add('active');
            
            // Update main image (in a real implementation, you'd change the src)
            const mainImage = document.getElementById('main-image');
            if (mainImage) {
                mainImage.src = this.src;
            }
        });
    });
}

// --- Page-specific initialization ---
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart on all pages
    updateCartCount();
    
    // Handle product detail page specifically
    const productPage = document.querySelector('.product-detail-section');
    if (productPage) {
        renderCart();
    }
});
