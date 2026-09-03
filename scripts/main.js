// Sample product data
const products = [
    {
        id: 1,
        name: "Digital Design Template",
        price: 19.99,
        description: "Premium design template for professional use",
        image: "assets/images/placeholder.jpg",
        category: "design"
    },
    {
        id: 2,
        name: "Software License Key",
        price: 29.99,
        description: "Full license for professional software",
        image: "assets/images/placeholder.jpg",
        category: "software"
    },
    {
        id: 3,
        name: "E-book Collection",
        price: 9.99,
        description: "Comprehensive guide for digital creators",
        image: "assets/images/placeholder.jpg",
        category: "guides"
    },
    {
        id: 4,
        name: "UI/UX Design Kit",
        price: 24.99,
        description: "Complete design system for modern interfaces",
        image: "assets/images/placeholder.jpg",
        category: "design"
    },
    {
        id: 5,
        name: "Marketing Analytics Dashboard",
        price: 39.99,
        description: "Professional analytics dashboard for marketers",
        image: "assets/images/placeholder.jpg",
        category: "design"
    },
    {
        id: 6,
        name: "Business Strategy Guide",
        price: 14.99,
        description: "Complete guide for business development",
        image: "assets/images/placeholder.jpg",
        category: "guides"
    }
];

// Cart functionality
let cart = [];

// DOM Elements
const productGrid = document.getElementById('productGrid');
const cartCount = document.querySelector('.cart-count');

// Initialize the website
document.addEventListener('DOMContentLoaded', () => {
    // Different initialization based on page
    if (document.getElementById('productGrid')) {
        displayProducts();
    }
    
    updateCartCount();
    
    // Add event listeners for cart functionality
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
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Mobile menu toggle
    setupMobileMenu();
});

// Setup mobile menu
function setupMobileMenu() {
    const nav = document.querySelector('.nav');
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '☰';
    menuToggle.style.display = 'none';
    menuToggle.style.cursor = 'pointer';
    menuToggle.style.fontSize = '1.5rem';
    menuToggle.style.padding = '0.5rem';
    
    document.querySelector('.header').insertBefore(menuToggle, document.querySelector('.nav'));
    
    // Media query for mobile menu
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    
    function handleMobileMenu(e) {
        if (e.matches) {
            menuToggle.style.display = 'block';
            menuToggle.addEventListener('click', function() {
                nav.classList.toggle('mobile-active');
            });
        } else {
            menuToggle.style.display = 'none';
            nav.classList.remove('mobile-active');
        }
    }
    
    handleMobileMenu(mobileQuery);
    mobileQuery.addListener(handleMobileMenu);
}

// Display products
function displayProducts() {
    if (!productGrid) return;
    
    productGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">$${product.price}</p>
            <button class="btn add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
        `;
        productGrid.appendChild(productCard);
    });
}

// Add to cart function
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCartCount();
        showNotification(`${product.name} added to cart!`);
    }
}

// Update cart count
function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cart.length;
    }
}

// Show notification
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

// Filter functionality for products page
document.addEventListener('DOMContentLoaded', function() {
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
});

function filterProducts(category) {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) return;
    
    // This would filter products in a real implementation
    // For now, we'll just show all products
    displayProducts();
}

// Enhanced mobile functionality
document.addEventListener('DOMContentLoaded', function() {
    // Handle window resize for responsive design
    window.addEventListener('resize', function() {
        // Adjust layout based on screen size
        if (window.innerWidth > 768) {
            document.querySelector('.nav').classList.remove('mobile-active');
        }
    });
    
    // Touch event support for mobile
    if ('ontouchstart' in window) {
        document.addEventListener('touchstart', function(e) {
            // Handle touch events for mobile
        }, { passive: true });
    }
});
