# AI-Based-route-optimization

# 🚚 AI-Powered Last-Mile Delivery Optimizer

An internal logistics tool for optimizing last-mile deliveries with dynamic routing, live GPS tracking, sustainability insights, and offline capabilities — built for large-scale retailers like Walmart.

---

## ✨ Project Overview

Retailers face major last-mile delivery delays and costs during high-demand periods like festivals, strikes, or peak hours. Our AI-powered dashboard helps operations managers:

- Dynamically optimize delivery routes
- Monitor live GPS locations of agents
- Toggle emergency and festival-specific delivery modes
- Operate offline in unstable network regions
- Track fuel, cost, and CO₂ savings
- Use a built-in AI chatbot for quick queries

> 💡 Even saving ₹10 per delivery = ₹1 Cr/month at Walmart-scale logistics.

---

## 🔧 Key Features

### 🧠 AI Optimization
- Scores delivery risks based on location, time, and congestion
- Assigns severity levels to orders

### 📦 Smart Delivery Consolidation
- Groups nearby deliveries for improved efficiency
- Displays calculated savings and route rationale

### 🚨 Emergency & Festival Modes
- One-click toggles to reprioritize zones during crises or special events
- Easily extendable for Rain, Peak Hour, Partner Priority, etc.

### 🛰️ Live GPS Tracking (Browser-based)
- Real-time agent tracking without requiring mobile apps
- Uses HTML5 Geolocation API

### ⏱ ETA & Delay Alerts
- Real-time ETA countdown for each order
- Badges showing delay risk levels

### 🌱 Sustainability Cards
- Tracks fuel, CO₂, and cost savings
- Promotes environmentally friendly routing

### 🤖 AI Chatbot
- React-based assistant
- Supports commands like:
  - `Show risky orders`
  - `Toggle festival mode`

### 📴 Offline Mode
- Operates via localStorage when internet is down
- Seamless experience for rural or low-connectivity regions

### 📱 Delivery Agent Companion View
- Mobile-responsive interface for delivery personnel
- Syncs tasks with main dashboard

---

## 🧩 Architecture

### 🔌 Plug-and-Play Design
- Works with REST APIs and Supabase
- Easily extensible via modular functions like `applyEmergencyMode()`
- No vendor lock-in

### 📈 Scalable & Upgradeable
- Handles 1,000s of deliveries/hour
- Add new cities or partners via config (no code rewrite)
- ML-ready architecture for future predictive optimization

---

## 🛠 Tech Stack

| Layer       | Tech                      |
|-------------|---------------------------|
| Frontend    | React + Tailwind CSS      |
| Backend     | Supabase (PostgreSQL + REST API) |
| Hosting     | Vercel (Netlify/AWS/GCP compatible) |
| Geolocation | HTML5 Browser GPS         |
| AI Logic    | Rule-based (ML-ready)     |

---

## 🚀 Getting Started

### 🖥️ Installation

```bash
git clone https://github.com/Shailaja-poojari/ai-last-mile-delivery-optimizer.git
cd ai-last-mile-delivery-optimizer
npm install
npm start
