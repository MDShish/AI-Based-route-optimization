// Application data and state
let map;
let markersLayer;
let routesLayer;
let orders = [];
let isOptimized = false;

// Sample data from the provided JSON
const sampleOrdersData = [
    {
        "id": "WM001",
        "address": "Koramangala 5th Block, Bangalore",
        "lat": 12.9352,
        "lng": 77.6245,
        "priority": "High",
        "deliveryWindow": "10:00-12:00",
        "customerName": "Rajesh Kumar",
        "phone": "+91-9876543210",
        "instructions": "Call before delivery",
        "estimatedFuel": 25,
        "distance": 8.5,
        "originalETA": "11:30 AM",
        "optimizedETA": "11:15 AM"
    },
    {
        "id": "WM002", 
        "address": "Indiranagar 100 Feet Road, Bangalore",
        "lat": 12.9719,
        "lng": 77.6412,
        "priority": "Medium",
        "deliveryWindow": "14:00-16:00", 
        "customerName": "Priya Sharma",
        "phone": "+91-9876543211",
        "instructions": "Ring doorbell twice",
        "estimatedFuel": 30,
        "distance": 12.2,
        "originalETA": "2:45 PM",
        "optimizedETA": "2:30 PM"
    },
    {
        "id": "WM003",
        "address": "Whitefield Tech Park, Bangalore", 
        "lat": 12.9698,
        "lng": 77.7500,
        "priority": "Low",
        "deliveryWindow": "16:00-18:00",
        "customerName": "Amit Patel",
        "phone": "+91-9876543212", 
        "instructions": "Office delivery - Reception",
        "estimatedFuel": 45,
        "distance": 18.7,
        "originalETA": "5:20 PM",
        "optimizedETA": "4:55 PM"
    },
    {
        "id": "WM004",
        "address": "Jayanagar 4th Block, Bangalore",
        "lat": 12.9237,
        "lng": 77.5946,
        "priority": "High",
        "deliveryWindow": "09:00-11:00",
        "customerName": "Sunita Reddy", 
        "phone": "+91-9876543213",
        "instructions": "Apartment B-304",
        "estimatedFuel": 20,
        "distance": 6.8,
        "originalETA": "10:45 AM",
        "optimizedETA": "10:25 AM"
    },
    {
        "id": "WM005",
        "address": "Electronic City Phase 1, Bangalore",
        "lat": 12.8456,
        "lng": 77.6603,
        "priority": "Medium",
        "deliveryWindow": "13:00-15:00",
        "customerName": "Vikram Singh",
        "phone": "+91-9876543214",
        "instructions": "Security will guide",
        "estimatedFuel": 35,
        "distance": 15.3,
        "originalETA": "2:15 PM", 
        "optimizedETA": "1:50 PM"
    },
    {
        "id": "WM006",
        "address": "HSR Layout Sector 2, Bangalore",
        "lat": 12.9116,
        "lng": 77.6350,
        "priority": "High",
        "deliveryWindow": "11:00-13:00",
        "customerName": "Meera Nair",
        "phone": "+91-9876543215",
        "instructions": "Ground floor house",
        "estimatedFuel": 22,
        "distance": 7.9,
        "originalETA": "12:30 PM",
        "optimizedETA": "12:10 PM"
    },
    {
        "id": "WM007",
        "address": "Marathahalli Bridge, Bangalore", 
        "lat": 12.9592,
        "lng": 77.6974,
        "priority": "Low",
        "deliveryWindow": "15:00-17:00",
        "customerName": "Karthik Rao",
        "phone": "+91-9876543216",
        "instructions": "Near Innovative Multiplex",
        "estimatedFuel": 28,
        "distance": 11.4,
        "originalETA": "4:10 PM",
        "optimizedETA": "3:45 PM"
    },
    {
        "id": "WM008",
        "address": "RT Nagar Main Road, Bangalore",
        "lat": 13.0157,
        "lng": 77.5960,
        "priority": "Medium", 
        "deliveryWindow": "10:00-12:00",
        "customerName": "Deepa Iyer",
        "phone": "+91-9876543217",
        "instructions": "Blue gate house",
        "estimatedFuel": 32,
        "distance": 13.6,
        "originalETA": "11:50 AM",
        "optimizedETA": "11:20 AM"
    },
    {
        "id": "WM009",
        "address": "Banashankari 2nd Stage, Bangalore",
        "lat": 12.9200,
        "lng": 77.5600,
        "priority": "High",
        "deliveryWindow": "12:00-14:00", 
        "customerName": "Ravi Krishnan",
        "phone": "+91-9876543218",
        "instructions": "Opposite to temple",
        "estimatedFuel": 26,
        "distance": 9.7,
        "originalETA": "1:25 PM",
        "optimizedETA": "1:05 PM"
    },
    {
        "id": "WM010",
        "address": "Malleswaram 15th Cross, Bangalore",
        "lat": 13.0031,
        "lng": 77.5737,
        "priority": "Low",
        "deliveryWindow": "17:00-19:00",
        "customerName": "Ananya Gupta", 
        "phone": "+91-9876543219",
        "instructions": "2nd floor apartment",
        "estimatedFuel": 24,
        "distance": 8.1,
        "originalETA": "6:15 PM",
        "optimizedETA": "5:50 PM"
    }
];

const warehouseLocation = {
    lat: 12.9716,
    lng: 77.5946,
    address: "Walmart Distribution Center, Bangalore"
};

const optimizationMetrics = {
    totalOrders: 10,
    originalTotalDistance: 112.4,
    optimizedTotalDistance: 94.7,
    distanceSaved: 17.7,
    fuelSavingsPercent: 15.7,
    timeSavedMinutes: 45,
    costSavingsPerOrder: 10,
    totalMonthlySavings: 100000,
    successRate: 94.5,
    averageDeliveryTime: 25
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    updateDateTime();
    setInterval(updateDateTime, 1000);
    attachEventListeners();
    updateMetrics();
});

// Initialize Leaflet map
function initializeMap() {
    map = L.map('map').setView([warehouseLocation.lat, warehouseLocation.lng], 11);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    markersLayer = L.layerGroup().addTo(map);
    routesLayer = L.layerGroup().addTo(map);
    
    // Add warehouse marker
    addWarehouseMarker();
}

function addWarehouseMarker() {
    const warehouseIcon = L.divIcon({
        className: 'warehouse-marker',
        html: '<div style="background: #8b5cf6; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 0 2px rgba(0,0,0,0.2);"></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });
    
    L.marker([warehouseLocation.lat, warehouseLocation.lng], { icon: warehouseIcon })
        .addTo(markersLayer)
        .bindPopup(`<b>Walmart Distribution Center</b><br>${warehouseLocation.address}`);
}

// Update date and time
function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    document.getElementById('currentDateTime').textContent = now.toLocaleDateString('en-US', options);
}

// Attach event listeners
function attachEventListeners() {
    // Order form submission
    document.getElementById('orderForm').addEventListener('submit', handleOrderSubmit);
    
    // Sample orders loading
    document.getElementById('loadSampleBtn').addEventListener('click', loadSampleOrders);
    
    // Route optimization
    document.getElementById('optimizeBtn').addEventListener('click', optimizeRoutes);
    
    // Control panel changes
    document.getElementById('trafficCondition').addEventListener('change', handleTrafficChange);
    document.getElementById('weatherImpact').addEventListener('change', handleWeatherChange);
    
    // Action buttons
    document.getElementById('reOptimizeBtn').addEventListener('click', reOptimizeRoutes);
    document.getElementById('exportBtn').addEventListener('click', exportReport);
    document.getElementById('simulateRoadblockBtn').addEventListener('click', simulateRoadblock);
    
    // Table sorting
    document.querySelectorAll('.orders-table th[data-sort]').forEach(header => {
        header.addEventListener('click', () => sortTable(header.dataset.sort));
    });
}

// Handle order form submission
function handleOrderSubmit(e) {
    e.preventDefault();
    
    const newOrder = {
        id: document.getElementById('orderId').value,
        address: document.getElementById('customerAddress').value,
        priority: document.getElementById('priority').value,
        deliveryWindow: document.getElementById('deliveryWindow').value,
        instructions: document.getElementById('specialInstructions').value,
        lat: 12.9716 + (Math.random() - 0.5) * 0.1, // Random location near Bangalore
        lng: 77.5946 + (Math.random() - 0.5) * 0.1,
        customerName: "New Customer",
        phone: "+91-9876543220",
        estimatedFuel: Math.floor(Math.random() * 40) + 15,
        distance: Math.floor(Math.random() * 20) + 5,
        originalETA: "TBD",
        optimizedETA: "TBD",
        status: "Pending",
        riskLevel: calculateRiskLevel()
    };
    
    orders.push(newOrder);
    updateOrdersTable();
    updateMap();
    updateMetrics();
    
    showToast('success', 'Order Added', 'New order has been successfully added to the system.');
    e.target.reset();
}

// Load sample orders
function loadSampleOrders() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    
    showLoading();
    
    setTimeout(() => {
        try {
            orders = [...sampleOrdersData.map(order => ({
                ...order,
                status: getRandomStatus(),
                riskLevel: calculateRiskLevel(order.priority, order.distance)
            }))];
            
            updateOrdersTable();
            updateMap();
            updateMetrics();
            
            showToast('success', 'Sample Orders Loaded', `${orders.length} sample orders have been loaded successfully.`);
        } catch (error) {
            console.error('Error loading sample orders:', error);
            showToast('error', 'Error', 'Failed to load sample orders.');
        } finally {
            hideLoading();
        }
    }, 1500);
}

// Optimize routes
function optimizeRoutes() {
    if (orders.length === 0) {
        showToast('warning', 'No Orders', 'Please load orders before optimizing routes.');
        return;
    }
    
    showLoading();
    
    const statusElement = document.getElementById('optimizationStatus');
    statusElement.textContent = 'Optimizing...';
    statusElement.className = 'metric__value status status--warning';
    
    setTimeout(() => {
        try {
            // Simulate AI optimization
            orders = orders.map(order => ({
                ...order,
                optimizedETA: calculateOptimizedETA(order.originalETA),
                status: 'Optimized',
                estimatedFuel: Math.floor(order.estimatedFuel * 0.85) // 15% fuel savings
            }));
            
            isOptimized = true;
            updateOrdersTable();
            updateMap();
            updateMetrics();
            
            statusElement.textContent = 'Optimized';
            statusElement.className = 'metric__value status status--success';
            
            showToast('success', 'Routes Optimized', 'AI has successfully optimized all delivery routes with 15.7% fuel savings.');
        } catch (error) {
            console.error('Error optimizing routes:', error);
            showToast('error', 'Optimization Failed', 'Failed to optimize routes. Please try again.');
            
            statusElement.textContent = 'Error';
            statusElement.className = 'metric__value status status--error';
        } finally {
            hideLoading();
        }
    }, 2000);
}

// Update orders table
function updateOrdersTable() {
    const tbody = document.getElementById('ordersTableBody');
    
    if (orders.length === 0) {
        tbody.innerHTML = `
            <tr class="empty-state">
                <td colspan="8">
                    <div class="empty-state__content">
                        <i class="fas fa-inbox"></i>
                        <p>No orders loaded. Click "Load Sample Orders" to get started.</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = orders.map(order => `
        <tr>
            <td><strong>${order.id}</strong></td>
            <td>${order.address}</td>
            <td>${isOptimized ? order.optimizedETA : order.originalETA}</td>
            <td><span class="risk-indicator risk-indicator--${order.riskLevel.toLowerCase()}">${order.riskLevel} Risk</span></td>
            <td><span class="priority-indicator priority-indicator--${order.priority.toLowerCase()}">${order.priority}</span></td>
            <td>₹${order.estimatedFuel}</td>
            <td><span class="order-status order-status--${order.status.toLowerCase().replace(' ', '-')}">${order.status}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn action-btn--edit" onclick="editOrder('${order.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn action-btn--delete" onclick="deleteOrder('${order.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
    
    document.getElementById('totalOrders').textContent = orders.length;
}

// Update map with markers and routes
function updateMap() {
    markersLayer.clearLayers();
    routesLayer.clearLayers();
    
    // Add warehouse marker
    addWarehouseMarker();
    
    // Add order markers
    orders.forEach((order, index) => {
        const markerColor = getMarkerColor(order);
        const icon = L.divIcon({
            className: 'delivery-marker',
            html: `<div style="background: ${markerColor}; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 0 1px rgba(0,0,0,0.2);"></div>`,
            iconSize: [16, 16],
            iconAnchor: [8, 8]
        });
        
        const marker = L.marker([order.lat, order.lng], { icon })
            .addTo(markersLayer)
            .bindPopup(`
                <div style="min-width: 200px;">
                    <h4>${order.id}</h4>
                    <p><strong>Customer:</strong> ${order.customerName}</p>
                    <p><strong>Address:</strong> ${order.address}</p>
                    <p><strong>Priority:</strong> ${order.priority}</p>
                    <p><strong>Window:</strong> ${order.deliveryWindow}</p>
                    <p><strong>ETA:</strong> ${isOptimized ? order.optimizedETA : order.originalETA}</p>
                    <p><strong>Fuel Cost:</strong> ₹${order.estimatedFuel}</p>
                    <p><strong>Instructions:</strong> ${order.instructions}</p>
                </div>
            `);
        
        // Add route line if optimized
        if (isOptimized) {
            const routeLine = L.polyline([
                [warehouseLocation.lat, warehouseLocation.lng],
                [order.lat, order.lng]
            ], {
                color: markerColor,
                weight: 3,
                opacity: 0.7,
                dashArray: '5, 10'
            }).addTo(routesLayer);
        }
    });
    
    // Fit map to show all markers
    if (orders.length > 0) {
        const group = new L.featureGroup([...markersLayer.getLayers()]);
        map.fitBounds(group.getBounds().pad(0.1));
    }
}

// Get marker color based on order status and priority
function getMarkerColor(order) {
    if (order.priority === 'High') return '#f97316'; // Orange for high priority
    if (order.riskLevel === 'High') return '#ef4444'; // Red for delay risk
    if (isOptimized) return '#3b82f6'; // Blue for optimized
    return '#22c55e'; // Green for on-time
}

// Update metrics display
function updateMetrics() {
    if (orders.length === 0) {
        // Reset metrics when no orders
        document.getElementById('costSavings').textContent = '₹0';
        document.getElementById('fuelEfficiency').textContent = '0%';
        document.getElementById('avgDeliveryTime').textContent = '0 min';
        document.getElementById('successRate').textContent = '0%';
        document.getElementById('atRiskOrders').textContent = '0';
        document.getElementById('monthlySavings').textContent = '₹0';
        return;
    }
    
    const totalFuelCost = orders.reduce((sum, order) => sum + order.estimatedFuel, 0);
    const originalFuelCost = isOptimized ? Math.floor(totalFuelCost / 0.85) : totalFuelCost;
    const savings = originalFuelCost - totalFuelCost;
    const fuelSavingsPercent = isOptimized ? optimizationMetrics.fuelSavingsPercent : 0;
    const atRiskCount = orders.filter(order => order.riskLevel === 'High').length;
    
    document.getElementById('costSavings').textContent = `₹${savings}`;
    document.getElementById('costSavingsChange').textContent = `+${fuelSavingsPercent.toFixed(1)}%`;
    
    document.getElementById('fuelEfficiency').textContent = `${fuelSavingsPercent.toFixed(1)}%`;
    document.getElementById('fuelChange').textContent = 'saved';
    
    document.getElementById('avgDeliveryTime').textContent = `${optimizationMetrics.averageDeliveryTime} min`;
    document.getElementById('timeChange').textContent = isOptimized ? `-${optimizationMetrics.timeSavedMinutes} min` : '0 min';
    
    document.getElementById('successRate').textContent = `${optimizationMetrics.successRate}%`;
    document.getElementById('successChange').textContent = '+2.5%';
    
    document.getElementById('atRiskOrders').textContent = atRiskCount;
    document.getElementById('riskChange').textContent = 'orders';
    
    document.getElementById('monthlySavings').textContent = `₹${(optimizationMetrics.totalMonthlySavings).toLocaleString()}`;
}

// Utility functions
function calculateRiskLevel(priority = 'Medium', distance = 10) {
    if (priority === 'High' || distance > 15) return 'High';
    if (priority === 'Medium' || distance > 10) return 'Medium';
    return 'Low';
}

function getRandomStatus() {
    const statuses = ['Pending', 'In Transit', 'Delivered'];
    return statuses[Math.floor(Math.random() * statuses.length)];
}

function calculateOptimizedETA(originalETA) {
    // Simulate 15-25 minute improvement for display purposes
    return originalETA.replace(/(\d+):(\d+)/, (match, hour, minute) => {
        const improvement = Math.floor(Math.random() * 10) + 15;
        let newMinute = parseInt(minute) - improvement;
        let newHour = parseInt(hour);
        if (newMinute < 0) {
            newMinute += 60;
            newHour -= 1;
            if (newHour < 1) newHour = 12;
        }
        return `${newHour}:${newMinute.toString().padStart(2, '0')}`;
    });
}

function showLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.classList.remove('hidden');
    }
}

function hideLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.classList.add('hidden');
    }
}

function showToast(type, title, message) {
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    
    const iconMap = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    
    toast.innerHTML = `
        <i class="toast__icon ${iconMap[type]}"></i>
        <div class="toast__content">
            <div class="toast__title">${title}</div>
            <div class="toast__message">${message}</div>
        </div>
    `;
    
    const container = document.getElementById('toastContainer');
    if (container) {
        container.appendChild(toast);
        
        setTimeout(() => {
            if (toast && toast.parentNode) {
                toast.remove();
            }
        }, 5000);
    }
}

// Event handlers
function handleTrafficChange(e) {
    const condition = e.target.value;
    let message = '';
    
    switch (condition) {
        case 'heavy':
            message = 'Heavy traffic detected. Recalculating routes...';
            break;
        case 'emergency':
            message = 'Emergency conditions. Priority routing activated.';
            break;
        default:
            message = 'Normal traffic conditions restored.';
    }
    
    showToast('info', 'Traffic Update', message);
    
    if (orders.length > 0 && isOptimized) {
        setTimeout(() => {
            updateMetrics();
            updateMap();
        }, 1000);
    }
}

function handleWeatherChange(e) {
    const weather = e.target.value;
    let message = '';
    
    switch (weather) {
        case 'rain':
            message = 'Rain detected. Adjusting delivery times for safety.';
            break;
        case 'storm':
            message = 'Storm warning. Some deliveries may be delayed.';
            break;
        default:
            message = 'Clear weather conditions.';
    }
    
    showToast('info', 'Weather Update', message);
}

function reOptimizeRoutes() {
    if (orders.length === 0) {
        showToast('warning', 'No Orders', 'Please load orders before re-optimizing.');
        return;
    }
    
    showToast('info', 'Re-optimization', 'Recalculating optimal routes...');
    optimizeRoutes();
}

function exportReport() {
    if (orders.length === 0) {
        showToast('warning', 'No Data', 'No orders available to export.');
        return;
    }
    
    const reportData = {
        timestamp: new Date().toISOString(),
        totalOrders: orders.length,
        optimizationStatus: isOptimized ? 'Optimized' : 'Not Optimized',
        metrics: {
            fuelSavings: isOptimized ? optimizationMetrics.fuelSavingsPercent : 0,
            costSavings: orders.reduce((sum, order) => sum + order.estimatedFuel, 0),
            averageDeliveryTime: optimizationMetrics.averageDeliveryTime
        },
        orders: orders
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `walmart-delivery-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    showToast('success', 'Report Exported', 'Delivery report has been downloaded successfully.');
}

function simulateRoadblock() {
    if (orders.length === 0) {
        showToast('warning', 'No Routes', 'Load orders first to simulate roadblocks.');
        return;
    }
    
    showToast('warning', 'Roadblock Detected', 'Simulating roadblock and rerouting deliveries...');
    
    setTimeout(() => {
        // Simulate dynamic rerouting
        orders = orders.map(order => ({
            ...order,
            estimatedFuel: order.estimatedFuel + Math.floor(Math.random() * 5) + 2,
            riskLevel: order.riskLevel === 'Low' ? 'Medium' : order.riskLevel
        }));
        
        updateOrdersTable();
        updateMap();
        updateMetrics();
        
        showToast('success', 'Routes Updated', 'Alternative routes calculated successfully.');
    }, 2000);
}

function sortTable(column) {
    // Simple sorting implementation
    if (!orders.length) return;
    
    const isAscending = !sortTable.ascending;
    sortTable.ascending = isAscending;
    
    orders.sort((a, b) => {
        let aVal, bVal;
        
        switch (column) {
            case 'id':
                aVal = a.id;
                bVal = b.id;
                break;
            case 'address':
                aVal = a.address;
                bVal = b.address;
                break;
            case 'eta':
                aVal = a.originalETA;
                bVal = b.originalETA;
                break;
            case 'priority':
                const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
                aVal = priorityOrder[a.priority];
                bVal = priorityOrder[b.priority];
                break;
            case 'fuel':
                aVal = a.estimatedFuel;
                bVal = b.estimatedFuel;
                break;
            default:
                return 0;
        }
        
        if (typeof aVal === 'string') {
            return isAscending ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        }
        
        return isAscending ? aVal - bVal : bVal - aVal;
    });
    
    updateOrdersTable();
    showToast('info', 'Table Sorted', `Orders sorted by ${column} ${isAscending ? 'ascending' : 'descending'}.`);
}

function editOrder(orderId) {
    showToast('info', 'Edit Order', `Edit functionality for order ${orderId} would open here.`);
}

function deleteOrder(orderId) {
    orders = orders.filter(order => order.id !== orderId);
    updateOrdersTable();
    updateMap();
    updateMetrics();
    showToast('success', 'Order Deleted', `Order ${orderId} has been removed from the system.`);
}