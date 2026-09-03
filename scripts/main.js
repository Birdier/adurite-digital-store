// Sample product data
const products = [
    {
        id: 1,
        name: "Digital Design Template",
        price: 19.99,
        description: "Premium design template for professional use",
        image: "assets/images/template.jpg",
        category: "Design Templates"
    },
    {
        id: 2,
        name: "Software License Key",
        price: 29.99,
        description: "Full license for professional software",
        image: "assets/images/software.jpg",
        category: "Software Licenses"
    },
    {
        id: 3,
        name: "E-book Collection",
        price: 9.99,
        description: "Comprehensive guide for digital creators",
        image: "assets/images/ebook.jpg",
        category: "E-books & Guides"
    },
    {
        id: 4,
        name: "UI/UX Design Kit",
        price: 24.99,
        description: "Complete design system for modern interfaces",
        image: "assets/images/uxkit.jpg",
        category: "Design Templates"
    },
    {
        id: 5,
        name: "Marketing Analytics Dashboard",
        price: 39.99,
        description: "Professional analytics dashboard for marketers",
        image: "assets/images/analytics.jpg",
        category: "Design Templates"
    },
    {
        id: 6,
        name: "Business Strategy Guide",
        price: 14.99,
        description: "Complete guide for business development",
        image: "assets/images/business.jpg",
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

// GitHub Deployment Instructions
function setupGitHub() {
    // This would be used to guide you through the GitHub setup
    console.log('To deploy to GitHub Pages:');
    console.log('1. Create a new repository on GitHub');
    console.log('2. Push your code to GitHub');
    console.log('3. Enable GitHub Pages in repository settings');
    console.log('4. Set source to "main" branch');
}

// Initialize GitHub setup
setupGitHub();