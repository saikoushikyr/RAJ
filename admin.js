// Admin Dashboard JavaScript
class AdminDashboard {
    constructor() {
        this.orders = [];
        this.filteredOrders = [];
        this.isAuthenticated = false;
        this.init();
    }

    init() {
        this.checkAuth();
        this.setupEventListeners();
        this.loadOrders();
    }

    // Admin Authentication
    checkAuth() {
        const adminSession = localStorage.getItem('adminSession');
        if (adminSession) {
            this.isAuthenticated = true;
            this.showDashboard();
        } else {
            this.showLogin();
        }
    }

    authenticate(username, password) {
        // Simple admin credentials (in production, use proper authentication)
        if (username === 'admin' && password === 'admin123') {
            localStorage.setItem('adminSession', 'true');
            this.isAuthenticated = true;
            this.showDashboard();
            this.showNotification('Login successful!', 'success');
            return true;
        } else {
            this.showNotification('Invalid credentials!', 'error');
            return false;
        }
    }

    logout() {
        localStorage.removeItem('adminSession');
        this.isAuthenticated = false;
        this.showLogin();
        this.showNotification('Logged out successfully!', 'success');
    }

    showLogin() {
        document.getElementById('admin-login').style.display = 'block';
        document.getElementById('admin-dashboard').style.display = 'none';
    }

    showDashboard() {
        document.getElementById('admin-login').style.display = 'none';
        document.getElementById('admin-dashboard').style.display = 'block';
        this.loadOrders();
    }

    // Order Management
    loadOrders() {
        this.orders = JSON.parse(localStorage.getItem('orders')) || [];
        this.filteredOrders = [...this.orders];
        this.updateStats();
        this.renderOrders();
    }

    updateStats() {
        const total = this.orders.length;
        const pending = this.orders.filter(order => order.status === 'Placed').length;
        const processing = this.orders.filter(order => order.status === 'Processing').length;
        const completed = this.orders.filter(order => order.status === 'Delivered').length;

        document.getElementById('total-orders').textContent = total;
        document.getElementById('pending-orders').textContent = pending;
        document.getElementById('processing-orders').textContent = processing;
        document.getElementById('completed-orders').textContent = completed;
    }

    renderOrders() {
        const tbody = document.getElementById('orders-tbody');
        if (this.filteredOrders.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="8" class="no-orders">
                        <i class="fas fa-inbox"></i>
                        <p>No orders found</p>
                    </td>
                </tr>
            `;
            return;
        }

        const html = this.filteredOrders.map(order => `
            <tr>
                <td><strong>#${order.id}</strong></td>
                <td>
                    <div class="customer-info">
                        <strong>${order.customerInfo?.name || 'N/A'}</strong>
                        <small>${order.customerInfo?.email || 'N/A'}</small>
                    </div>
                </td>
                <td>${order.items.length} items</td>
                <td><strong>₹${order.total}</strong></td>
                <td>
                    <span class="status-badge ${order.status.toLowerCase()}">
                        ${order.status}
                    </span>
                </td>
                <td>${this.formatDate(order.date)}</td>
                <td>
                    <span class="payment-badge ${order.paymentMethod}">
                        ${order.paymentMethod.toUpperCase()}
                    </span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button onclick="admin.viewOrder(${order.id})" class="btn-small btn-primary">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button onclick="admin.updateStatus(${order.id})" class="btn-small btn-secondary">
                            <i class="fas fa-edit"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');

        tbody.innerHTML = html;
    }

    viewOrder(orderId) {
        const order = this.orders.find(o => o.id === orderId);
        if (!order) return;

        const modalBody = document.getElementById('modal-body');
        modalBody.innerHTML = `
            <div class="order-details">
                <div class="order-header">
                    <h3>Order #${order.id}</h3>
                    <span class="status-badge ${order.status.toLowerCase()}">${order.status}</span>
                </div>
                
                <div class="order-sections">
                    <div class="section">
                        <h4><i class="fas fa-user"></i> Customer Information</h4>
                        <div class="info-grid">
                            <div><strong>Name:</strong> ${order.customerInfo?.name || 'N/A'}</div>
                            <div><strong>Email:</strong> ${order.customerInfo?.email || 'N/A'}</div>
                            <div><strong>Phone:</strong> ${order.customerInfo?.phone || 'N/A'}</div>
                            <div><strong>Address:</strong> ${order.customerInfo?.address || 'N/A'}</div>
                        </div>
                    </div>

                    <div class="section">
                        <h4><i class="fas fa-shopping-bag"></i> Order Items</h4>
                        <div class="items-list">
                            ${order.items.map(item => `
                                <div class="item">
                                    <img src="${item.img}" alt="${item.name}">
                                    <div class="item-details">
                                        <h5>${item.name}</h5>
                                        <p>₹${item.price} x ${item.quantity}</p>
                                    </div>
                                    <div class="item-total">
                                        ₹${item.price * item.quantity}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="section">
                        <h4><i class="fas fa-credit-card"></i> Payment & Order Info</h4>
                        <div class="info-grid">
                            <div><strong>Payment Method:</strong> ${order.paymentMethod.toUpperCase()}</div>
                            <div><strong>Order Date:</strong> ${this.formatDate(order.date)}</div>
                            <div><strong>Total Amount:</strong> ₹${order.total}</div>
                        </div>
                    </div>

                    <div class="section">
                        <h4><i class="fas fa-cog"></i> Status Management</h4>
                        <div class="status-controls">
                            <select id="status-select" onchange="admin.changeOrderStatus(${order.id}, this.value)">
                                <option value="Placed" ${order.status === 'Placed' ? 'selected' : ''}>Placed</option>
                                <option value="Processing" ${order.status === 'Processing' ? 'selected' : ''}>Processing</option>
                                <option value="Shipped" ${order.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
                                <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                                <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                            </select>
                            <button onclick="admin.saveStatus(${order.id})" class="btn btn-primary">
                                Update Status
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('order-modal').style.display = 'block';
    }

    changeOrderStatus(orderId, newStatus) {
        const order = this.orders.find(o => o.id === orderId);
        if (order) {
            order.status = newStatus;
            this.saveOrders();
            this.showNotification(`Order status updated to ${newStatus}`, 'success');
        }
    }

    saveStatus(orderId) {
        const statusSelect = document.getElementById('status-select');
        const newStatus = statusSelect.value;
        this.changeOrderStatus(orderId, newStatus);
        this.loadOrders();
        this.closeModal();
    }

    saveOrders() {
        localStorage.setItem('orders', JSON.stringify(this.orders));
    }

    // Search and Filter
    searchOrders(query) {
        if (!query) {
            this.filteredOrders = [...this.orders];
        } else {
            this.filteredOrders = this.orders.filter(order => 
                order.id.toString().includes(query) ||
                order.customerInfo?.name?.toLowerCase().includes(query.toLowerCase()) ||
                order.customerInfo?.email?.toLowerCase().includes(query.toLowerCase())
            );
        }
        this.renderOrders();
    }

    filterByStatus(status) {
        if (status === 'all') {
            this.filteredOrders = [...this.orders];
        } else {
            this.filteredOrders = this.orders.filter(order => order.status === status);
        }
        this.renderOrders();
    }

    filterByDate(dateFilter) {
        const now = new Date();
        let filtered = [...this.orders];

        switch (dateFilter) {
            case 'today':
                filtered = this.orders.filter(order => {
                    const orderDate = new Date(order.date);
                    return orderDate.toDateString() === now.toDateString();
                });
                break;
            case 'week':
                const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                filtered = this.orders.filter(order => new Date(order.date) >= weekAgo);
                break;
            case 'month':
                const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                filtered = this.orders.filter(order => new Date(order.date) >= monthAgo);
                break;
        }

        this.filteredOrders = filtered;
        this.renderOrders();
    }

    // Data Export
    exportOrders() {
        const data = this.filteredOrders.map(order => ({
            'Order ID': order.id,
            'Customer Name': order.customerInfo?.name || 'N/A',
            'Email': order.customerInfo?.email || 'N/A',
            'Phone': order.customerInfo?.phone || 'N/A',
            'Address': order.customerInfo?.address || 'N/A',
            'Items': order.items.map(item => `${item.name} (${item.quantity})`).join(', '),
            'Total Amount': `₹${order.total}`,
            'Status': order.status,
            'Payment Method': order.paymentMethod,
            'Order Date': this.formatDate(order.date)
        }));

        const csv = this.convertToCSV(data);
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `orders_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);

        this.showNotification('Orders exported successfully!', 'success');
    }

    convertToCSV(data) {
        const headers = Object.keys(data[0]);
        const csvContent = [
            headers.join(','),
            ...data.map(row => headers.map(header => `"${row[header]}"`).join(','))
        ].join('\n');
        return csvContent;
    }

    // Utility Functions
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
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

    closeModal() {
        document.getElementById('order-modal').style.display = 'none';
    }

    setupEventListeners() {
        // Login form
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            this.authenticate(username, password);
        });

        // Search functionality
        document.getElementById('order-search').addEventListener('input', (e) => {
            this.searchOrders(e.target.value);
        });

        // Status filter
        document.getElementById('status-filter').addEventListener('change', (e) => {
            this.filterByStatus(e.target.value);
        });

        // Date filter
        document.getElementById('date-filter').addEventListener('change', (e) => {
            this.filterByDate(e.target.value);
        });

        // Modal close
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('order-modal');
            if (e.target === modal) {
                this.closeModal();
            }
        });
    }
}

// Global functions for HTML onclick handlers
function logout() {
    admin.logout();
}

function refreshOrders() {
    admin.loadOrders();
}

function exportOrders() {
    admin.exportOrders();
}

function closeModal() {
    admin.closeModal();
}

// Initialize admin dashboard
let admin;
document.addEventListener('DOMContentLoaded', () => {
    admin = new AdminDashboard();
}); 