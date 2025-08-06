// Raj Mohan Grocery Store - Main Application
class GroceryStore {
    constructor() {
        this.cart = this.getCart();
        this.products = this.getProducts();
        this.init();
    }

    init() {
        this.updateCartCount();
        this.setupEventListeners();
        this.renderCartItems();
        this.renderProducts();
        this.renderCheckoutItems();
        this.renderPopularProducts();
    }

    getProducts() {
        return [
            { id: 1, name: "Tomato 1kg", price: 30, category: "vegetables", img: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=300&h=300&fit=crop", stock: 50 },
            { id: 2, name: "Potato 1kg", price: 25, category: "vegetables", img: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&h=300&fit=crop", stock: 75 },
            { id: 3, name: "Onion 1kg", price: 40, category: "vegetables", img: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&h=300&fit=crop", stock: 60 },
            { id: 4, name: "Carrot 1kg", price: 45, category: "vegetables", img: "https://images.unsplash.com/photo-1447175008436-1701707d0aa3?w=300&h=300&fit=crop", stock: 40 },
            { id: 5, name: "Apple 1kg", price: 120, category: "fruits", img: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=300&fit=crop", stock: 30 },
            { id: 6, name: "Orange 1kg", price: 85, category: "fruits", img: "https://images.unsplash.com/photo-1547514701-42782101795e?w=300&h=300&fit=crop", stock: 45 },
            { id: 7, name: "Banana 1dozen", price: 50, category: "fruits", img: "https://images.unsplash.com/photo-1528825871115-3581a5387919?w=300&h=300&fit=crop", stock: 80 },
            { id: 8, name: "Grapes 1kg", price: 75, category: "fruits", img: "https://images.unsplash.com/photo-1518843875459-f738682238a6?w=300&h=300&fit=crop", stock: 25 },
            { id: 9, name: "Rice 5kg", price: 285, category: "grains", img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop", stock: 20 },
            { id: 10, name: "Wheat Flour 5kg", price: 260, category: "grains", img: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=300&fit=crop", stock: 15 },
            { id: 11, name: "Sugar 1kg", price: 45, category: "essentials", img: "https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=300&h=300&fit=crop", stock: 100 },
            { id: 12, name: "Salt 1kg", price: 20, category: "essentials", img: "https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=300&h=300&fit=crop", stock: 120 },
            { id: 13, name: "Milk 1L", price: 55, category: "dairy", img: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=300&fit=crop", stock: 50 },
            { id: 14, name: "Curd 500ml", price: 30, category: "dairy", img: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=300&fit=crop", stock: 40 },
            { id: 15, name: "Oil 1L", price: 130, category: "essentials", img: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=300&fit=crop", stock: 35 },
            { id: 16, name: "Tea 250g", price: 80, category: "beverages", img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&h=300&fit=crop", stock: 60 },
            { id: 17, name: "Coffee 200g", price: 110, category: "beverages", img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=300&fit=crop", stock: 45 },
            { id: 18, name: "Bread", price: 28, category: "bakery", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop", stock: 70 },
            { id: 19, name: "Eggs 12pc", price: 70, category: "dairy", img: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=300&h=300&fit=crop", stock: 90 },
            { id: 20, name: "Paneer 200g", price: 85, category: "dairy", img: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=300&fit=crop", stock: 25 }
        ];
    }

    getCart() {
        return JSON.parse(localStorage.getItem('cart')) || [];
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                img: product.img,
                quantity: 1
            });
        }

        this.saveCart();
        this.updateCartCount();
        this.showNotification('Product added to cart!');
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCount();
        this.renderCartItems();
        this.showNotification('Product removed from cart!');
    }

    updateQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = parseInt(quantity);
                this.saveCart();
                this.updateCartCount();
                this.renderCartItems();
            }
        }
    }

    updateCartCount() {
        const cartCount = this.cart.reduce((total, item) => total + item.quantity, 0);
        document.querySelectorAll('#cart-total').forEach(el => {
            el.textContent = cartCount;
        });
    }

    getCartTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    renderProducts() {
        const productContainer = document.querySelector('.product-list');
        if (!productContainer) return;

        const html = this.products.map(product => `
            <div class="product-card" data-category="${product.category}">
                <div class="product-image">
                    <img src="${product.img}" alt="${product.name}" loading="lazy">
                    <div class="product-overlay">
                        <button class="add-to-cart-btn" onclick="store.addToCart(${product.id})">
                            <i class="fas fa-shopping-cart"></i> Add to Cart
                        </button>
                    </div>
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="price">₹${product.price}</p>
                    <p class="stock">In Stock: ${product.stock}</p>
                    <span class="category-badge">${product.category}</span>
                </div>
            </div>
        `).join('');

        productContainer.innerHTML = html;
    }

    renderCartItems() {
        const cartContainer = document.getElementById('cart-items');
        if (!cartContainer) return;

        if (this.cart.length === 0) {
            cartContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>Your cart is empty</h3>
                    <p>Add some products to get started!</p>
                    <a href="products.html" class="btn">Continue Shopping</a>
                </div>
            `;
            return;
        }

        const html = this.cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.img}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p class="price">₹${item.price}</p>
                </div>
                <div class="cart-item-quantity">
                    <button onclick="store.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <input type="number" value="${item.quantity}" min="1" 
                           onchange="store.updateQuantity(${item.id}, this.value)">
                    <button onclick="store.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                <div class="cart-item-total">
                    <p>₹${item.price * item.quantity}</p>
                </div>
                <div class="cart-item-actions">
                    <button class="remove-btn" onclick="store.removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');

        const totalHtml = `
            <div class="cart-summary">
                <div class="cart-total">
                    <h3>Total: ₹${this.getCartTotal()}</h3>
                </div>
                <div class="cart-actions">
                    <a href="products.html" class="btn btn-secondary">Continue Shopping</a>
                    <a href="checkout.html" class="btn btn-primary">Proceed to Checkout</a>
                </div>
            </div>
        `;

        cartContainer.innerHTML = html + totalHtml;
    }

    placeOrder() {
        console.log('Place order called, cart:', this.cart);
        if (this.cart.length === 0) {
            this.showNotification('Your cart is empty!', 'error');
            return;
        }

        // Validate customer form
        const customerForm = document.getElementById('customer-form');
        if (customerForm && !customerForm.checkValidity()) {
            customerForm.reportValidity();
            this.showNotification('Please fill in all required fields!', 'error');
            return;
        }

        // Get customer information
        const customerInfo = {
            name: document.getElementById('name')?.value || 'Customer',
            email: document.getElementById('email')?.value || 'customer@example.com',
            phone: document.getElementById('phone')?.value || '+91 1234567890',
            address: document.getElementById('address')?.value || 'Sample Address'
        };

        // Get payment method
        const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value || 'cod';

        const order = {
            id: Date.now(),
            items: [...this.cart],
            total: this.getCartTotal(),
            status: 'Placed',
            date: new Date().toISOString(),
            customerInfo: customerInfo,
            paymentMethod: paymentMethod
        };

        // Save order to localStorage
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));

        // Clear cart
        this.cart = [];
        this.saveCart();
        this.updateCartCount();

        // Show success notification
        this.showNotification('Order placed successfully!', 'success');

        // Redirect to success page after a short delay
        setTimeout(() => {
            window.location.href = 'success.html';
        }, 1500);
    }

    renderCheckoutItems() {
        const checkoutContainer = document.getElementById('checkout-items');
        const checkoutTotal = document.getElementById('checkout-total');
        
        if (!checkoutContainer) return;

        if (this.cart.length === 0) {
            checkoutContainer.innerHTML = '<p>No items in cart</p>';
            return;
        }

        const html = this.cart.map(item => `
            <div class="checkout-item">
                <div class="checkout-item-image">
                    <img src="${item.img}" alt="${item.name}">
                </div>
                <div class="checkout-item-details">
                    <h4>${item.name}</h4>
                    <p>₹${item.price} x ${item.quantity}</p>
                </div>
                <div class="checkout-item-total">
                    <p>₹${item.price * item.quantity}</p>
                </div>
            </div>
        `).join('');

        checkoutContainer.innerHTML = html;
        
        if (checkoutTotal) {
            checkoutTotal.textContent = this.getCartTotal();
        }
    }

    renderPopularProducts() {
        const popularContainer = document.getElementById('popular-products');
        if (!popularContainer) return;

        // Show first 6 products as popular
        const popularProducts = this.products.slice(0, 6);
        
        const html = popularProducts.map(product => `
            <div class="product-card" data-category="${product.category}">
                <div class="product-image">
                    <img src="${product.img}" alt="${product.name}" loading="lazy">
                    <div class="product-overlay">
                        <button class="add-to-cart-btn" onclick="store.addToCart(${product.id})">
                            <i class="fas fa-shopping-cart"></i> Add to Cart
                        </button>
                    </div>
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="price">₹${product.price}</p>
                    <p class="stock">In Stock: ${product.stock}</p>
                    <span class="category-badge">${product.category}</span>
                </div>
            </div>
        `).join('');

        popularContainer.innerHTML = html;
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterProducts(e.target.value);
            });
        }

        // Category filter
        const categoryFilter = document.getElementById('category-filter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                this.filterByCategory(e.target.value);
            });
        }
    }

    filterProducts(searchTerm) {
        const products = document.querySelectorAll('.product-card');
        products.forEach(product => {
            const name = product.querySelector('h3').textContent.toLowerCase();
            if (name.includes(searchTerm.toLowerCase())) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }

    filterByCategory(category) {
        const products = document.querySelectorAll('.product-card');
        products.forEach(product => {
            if (category === 'all' || product.dataset.category === category) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check' : 'exclamation-triangle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Initialize the store when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.store = new GroceryStore();
}); 