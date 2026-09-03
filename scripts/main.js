// Sample product data
const products = [
    {
        id: 1,
        name: "Digital Design Template",
        price: 19.99,
        description: "Premium design template for professional use",
        image: "assets/images/placeholder.jpg",
        category: "Design Templates"
    },
    {
        id: 2,
        name: "Software License Key",
        price: 29.99,
        description: "Full license for professional software",
        image: "assets/images/placeholder.jpg",
        category: "Software Licenses"
    },
    {
        id: 3,
        name: "E-book Collection",
        price: 9.99,
        description: "Comprehensive guide for digital creators",
        image: "assets/images/placeholder.jpg",
        category: "E-books & Guides"
    },
    {
        id: 4,
        name: "UI/UX Design Kit",
        price: 24.99,
        description: "Complete design system for modern interfaces",
        image: "assets/images/placeholder.jpg",
        category: "Design Templates"
    },
    {
        id: 5,
        name: "Marketing Analytics Dashboard",
        price: 39.99,
        description: "Professional analytics dashboard for marketers",
        image: "assets/images/placeholder.jpg",
        category: "Design Templates"
    },
    {
        id: 6,
        name: "Business Strategy Guide",
        price: 14.99,
        description: "Complete guide for business development",
        image: "assets/images/placeholder.jpg",
        category: "E-books & Guides"
    }
];

// Cart functionality
let cart = [];

// DOM Elements
const productGrid = document.getElementById('productGrid');
const cartCount = document.querySelector('.cart-count');

// Initialize the website
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
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
});

// Display products
function displayProducts() {
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
    cartCount.textContent = cart.length;
}

// Show notification
function showNotification(message) {
    // Simple notification - in a real app you'd use a better notification system
    alert(message);
}

// Scroll to top on page load
window.addEventListener('load', function() {
    window.scrollTo(0, 0);
});
