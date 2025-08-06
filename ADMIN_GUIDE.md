# Admin Dashboard Guide - Raj Mohan Grocery Store

## 🔐 Accessing the Admin Dashboard

### Login Credentials
- **Username:** `admin`
- **Password:** `admin123`

### How to Access
1. Navigate to `admin.html` in your browser
2. Enter the credentials above
3. Click "Login"

## 📊 Dashboard Overview

### Statistics Cards
The dashboard shows real-time statistics:
- **Total Orders:** All orders in the system
- **Pending Orders:** Orders with "Placed" status
- **Processing:** Orders being prepared
- **Completed:** Delivered orders

### Order Management Features

#### 1. **View All Orders**
- Complete table of all customer orders
- Shows Order ID, Customer Info, Items, Total, Status, Date, Payment Method
- Click the eye icon (👁️) to view detailed order information

#### 2. **Search Orders**
- Search by Order ID, Customer Name, or Email
- Real-time filtering as you type

#### 3. **Filter Orders**
- **Status Filter:** Filter by order status (Placed, Processing, Shipped, Delivered, Cancelled)
- **Date Filter:** Filter by time period (Today, This Week, This Month, All Time)

#### 4. **Order Details Modal**
When you click the view button, you'll see:
- **Customer Information:** Name, Email, Phone, Address
- **Order Items:** Product images, names, quantities, prices
- **Payment Information:** Method used, total amount
- **Status Management:** Update order status

## 🛠️ Order Status Management

### Available Statuses
1. **Placed** - Order received, waiting to be processed
2. **Processing** - Order is being prepared/packed
3. **Shipped** - Order is out for delivery
4. **Delivered** - Order successfully delivered
5. **Cancelled** - Order cancelled

### How to Update Status
1. Click the edit button (✏️) on any order
2. Select new status from dropdown
3. Click "Update Status"
4. Status is automatically saved

## 📈 Data Export for Production

### Export Orders
1. Use filters to select specific orders (optional)
2. Click "Export Data" button
3. CSV file will download automatically
4. File includes all order details for production planning

### Exported Data Includes
- Order ID
- Customer Name, Email, Phone, Address
- All ordered items with quantities
- Total amount
- Order status
- Payment method
- Order date

## 🔍 Production Workflow

### Daily Production Process
1. **Morning Check:** View pending orders
2. **Filter by Date:** Select "Today" to see today's orders
3. **Export Data:** Download CSV for production team
4. **Update Status:** Mark orders as "Processing" when work begins
5. **Track Progress:** Update to "Shipped" when ready for delivery
6. **Complete Orders:** Mark as "Delivered" when confirmed

### Weekly/Monthly Reports
1. Use date filters to get weekly/monthly data
2. Export filtered data for analysis
3. Review statistics for business insights

## 📱 Mobile Responsive
The admin dashboard works on all devices:
- Desktop: Full functionality
- Tablet: Optimized layout
- Mobile: Touch-friendly interface

## 🔒 Security Features
- Session-based authentication
- Secure logout functionality
- Access control for admin functions

## 🚀 Quick Actions

### View Recent Orders
1. Filter by "Today" or "This Week"
2. Sort by date to see latest orders first

### Find Specific Customer
1. Use search box with customer name or email
2. View all orders from that customer

### Production Planning
1. Filter by "Placed" status
2. Export data for production team
3. Update status as work progresses

### Business Analytics
1. Export monthly data
2. Analyze order patterns
3. Track revenue and customer behavior

## 🆘 Troubleshooting

### Can't Login?
- Verify username: `admin`
- Verify password: `admin123`
- Check browser console for errors

### No Orders Showing?
- Check if customers have placed orders
- Verify localStorage is working
- Refresh the page

### Export Not Working?
- Ensure you have orders to export
- Check browser download settings
- Try refreshing the page

## 📞 Support
For technical support or questions:
- Email: admin@rajmohangrocery.com
- Phone: +91 98765 43210

---

**Note:** This admin dashboard is designed for production management and order tracking. All data is stored locally in the browser for demonstration purposes. In a production environment, this would be connected to a backend database. 