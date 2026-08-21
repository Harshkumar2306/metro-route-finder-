# 🚇 Delhi Metro Route Finder — Classic Edition

[![C++](https://img.shields.io/badge/C%2B%2B-14%2F17-00599C?style=for-the-badge&logo=c%2B%2B)](https://isocpp.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/)
[![HTML5](https://img.shields.io/badge/HTML5-Classic-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://html.spec.whatwg.org/)
[![CSS3](https://img.shields.io/badge/CSS3-Modern_Transit-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> **"My First C++ Project" — Elevated with a Classic Delhi Metro Interactive Web Frontend, Route Pathfinder, Smart Card Simulator, and Retro CLI.**

Developed by **[Harsh Kumar](https://github.com/Harshkumar2306)**.

---

## 🌟 Overview & Features

**Delhi Metro Route Finder** is a transit journey planner and network graph explorer designed for the Delhi Metro (DMRC) system. It combines the nostalgic charm of the original C++ terminal application with a modern, interactive web frontend.

### ✨ Key Features

1. **🗺️ Interactive Delhi Metro Schematic Map (SVG)**:
   - Complete multi-line network: **Blue Line**, **Yellow Line**, **Red Line**, **Green Line**, **Violet Line**, and **Airport Express (Orange Line)**.
   - Interactive zoom & pan controls, station hover tooltips, and clickable station nodes to set origin/destination.
   - Glowing animated route highlight showing the exact travel path and station stops.

2. **🧭 Smart Route Engine & Navigation**:
   - Computes path using **Breadth-First Search (BFS)** and **Dijkstra** graph traversal.
   - Support for **Shortest Travel Time** and **Minimum Line Interchanges** routing modes.
   - Detailed step-by-step itinerary with boarding lines, transfer instructions, and destination arrival notes.

3. **💰 Accurate DMRC Fare Calculator**:
   - Real-time calculation based on official DMRC distance slabs.
   - **Regular Token Fare**
   - **⚡ HarshPay Fare (10% Discount)**
   - **Off-Peak & Weekend Fare (20% Discount)**

4. **🏛️ Tourist Destinations Guide (`tourplace.txt`)**:
   - Curated list of 20+ iconic Delhi landmarks (India Gate, Red Fort, Qutub Minar, Akshardham, Lotus Temple, Connaught Place, Bangla Sahib, etc.).
   - Displays description, heritage tags, and nearest metro station with a 1-click **"Plan Route"** button.

5. **💳 ⚡ HarshPay Transit Wallet & Paisa Simulator (`paisa.txt`)**:
   - Holographic virtual **HarshPay Transit Card** with live balance display and cardholder info.
   - Instant recharge simulation with balance persistence and transaction logging.

6. **📟 Retro C++ Terminal Emulator**:
   - In-browser interactive console that simulates the nostalgic original C++ CLI experience (`1. Route`, `2. Tourist place`, `3. HarshPay recharge`).

---

## 🚀 Quick Start

### 1. Run the Classic Web Interface
No dependencies or build steps required! Simply open `index.html` in your browser or run a local HTTP server:

```bash
# Option A: Run with Python
python3 -m http.server 8000

# Option B: Run with Node npx
npx serve .

# Option C: Open directly in your browser
open index.html
```

Visit `http://localhost:8000` in your browser.

---

### 2. Compile & Run the Original C++ CLI

Compile on macOS / Linux / Windows using `make` or `g++`:

```bash
# Using Makefile
make

# Or compiling directly with g++ / clang++
clang++ -std=c++14 -O2 metro.cpp -o metro

# Run the C++ CLI application
./metro
```

#### CLI Interactive Menu:
```text
1. To Route between two stations
2. To check nearest metro station to a tourist place
3. To Recharge your Smart Card
```

---

## 🏗️ Project Architecture & Data Structure

```text
metro-route-finder/
├── index.html         # Classic Delhi Metro Web UI & Interactive Kiosk
├── style.css          # Modern transit stylesheet & retro CRT console styling
├── app.js             # Frontend controller, SVG renderer, and event handlers
├── router.js          # Graph data structure (BFS / Dijkstra) & fare engine
├── data.js            # Metro lines, stations, SVG coordinates, tourist spots
├── metro.cpp          # Original C++ source code with BFS pathfinding
├── Makefile           # Multi-platform build configuration
├── list.txt           # Master station list
├── blueline.txt       # Blue Line station sequence
├── bluext.txt         # Blue Line Vaishali extension sequence
├── yellowline.txt     # Yellow Line station sequence
├── redline.txt        # Red Line station sequence
├── greenline.txt      # Green Line station sequence
├── violetline.txt     # Violet Line station sequence
├── orangeline.txt     # Airport Express Line station sequence
├── tourplace.txt      # Tourist destinations and nearest stations
├── paisa.txt          # Smart Card balances database
└── README.md          # Project documentation
```

---

## 🧠 Algorithms & Graph Theory

- **Graph Representation**: Represented as an Adjacency List where each vertex is a metro station and each undirected edge represents a direct rail connection with associated line color data.
- **Shortest Path (BFS / Dijkstra)**: Unweighted BFS finds the minimum station hops between any two arbitrary stations in \(O(V + E)\) time.
- **Transfer Penalty Routing**: A weighted Dijkstra implementation adds a transfer penalty weight when changing between line colors, finding routes that minimize physical line interchanges.

---

## 👨‍💻 Author

**Harsh Kumar**
- GitHub: [@Harshkumar2306](https://github.com/Harshkumar2306)
- Repository: [metro-route-finder-](https://github.com/Harshkumar2306/metro-route-finder-)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE). Feel free to explore, learn, and build upon it!
