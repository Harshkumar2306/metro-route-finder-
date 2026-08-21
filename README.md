# 🚇 Delhi Metro Route Finder — HKRC Classic Transit Edition

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white)](https://metro-route-finder-beige.vercel.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Harshkumar2306/metro-route-finder-)
[![C++](https://img.shields.io/badge/C%2B%2B-14%2F17-00599C?style=for-the-badge&logo=c%2B%2B)](https://isocpp.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**[🔗 Open Live Application](https://metro-route-finder-beige.vercel.app/)**

*HKRC CLASSIC TRANSIT SYSTEM • SINCE 2024*

</div>

---

## 📖 About The Project

**Delhi Metro Route Finder** is a transit journey planner and network graph pathfinder built with a classic retro aesthetic. Originally conceived as a C++ graph theory project, it has been elevated into a full-fledged, multi-device web application with an interactive schematic SVG map, real-time fare calculator, tourist heritage explorer, virtual **HarshPay** wallet system, and an in-browser retro C++ CLI terminal emulator.

---

## 🌟 Key Features

### 🗺️ 1. Interactive Delhi Metro Schematic Map (SVG)
- **Multi-Line Visualization**: Includes the **Blue Line**, **Yellow Line**, **Red Line**, **Green Line**, **Violet Line**, and the high-speed **Airport Express (Orange Line)**.
- **Pan & Zoom Controls**: Smooth multi-touch pinch-to-zoom, drag-to-pan, and desktop zoom button controls.
- **Interactive Nodes**: Click any station on the map to automatically set it as Origin or Destination.
- **Dynamic Route Glow**: Highlights the exact calculated route with animated glowing lines and station markers.

### 🧭 2. Smart Pathfinding Engine
- **Graph Traversal Algorithms**:
  - **Breadth-First Search (BFS)**: Computes the shortest travel time and minimum station hops in $\mathcal{O}(V + E)$ time complexity.
  - **Interchange Penalty Routing (Dijkstra)**: Optimized traversal that minimizes physical line switches for passenger convenience.
- **Detailed Journey Breakdown**: Displays boarding lines, interchange junctions, station counts, and estimated travel time.

### 💰 3. Dynamic Fare Engine
- Calculates standard token fares according to official DMRC distance slabs.
- **HarshPay Discount**: Automated 10% discount for smart card holders.
- **Off-Peak / Weekend Rebates**: Automatic 20% discount detection based on system clock time.

### 🏛️ 4. Delhi Tourist & Heritage Guide (`tourplace.txt`)
- Explores 20+ historical monuments and tourist hotspots (India Gate, Red Fort, Qutub Minar, Akshardham, Lotus Temple, Connaught Place, Bangla Sahib, Rashtrapati Bhavan, etc.).
- 1-click **"Plan Route →"** shortcut to calculate directions directly to any landmark's nearest metro station.

### 💳 5. ⚡ HarshPay Transit Wallet (`paisa.txt`)
- Interactive digital smart card with live balance indicator.
- Instant wallet recharge simulation with balance persistence and local database tracking.

### 📟 6. Retro C++ Terminal Console
- An authentic, in-browser CRT console simulator reproducing the exact command-line menu interface from the original C++ backend:
  1. Route between two stations
  2. Nearest metro station to tourist places
  3. HarshPay wallet recharge

---

## 🌐 Live Deployment

The web application is deployed and hosted on **Vercel**:
👉 **[https://metro-route-finder-beige.vercel.app/](https://metro-route-finder-beige.vercel.app/)**

---

## 💻 Running Locally

### Option A: Web Application
No build steps or package managers required. Simply clone and run with any local HTTP server:

```bash
# Clone the repository
git clone https://github.com/Harshkumar2306/metro-route-finder-.git
cd metro-route-finder-

# Start a local server (Python)
python3 -m http.server 8080

# Or using Node
npx serve .
```
Visit `http://localhost:8080` in your web browser.

---

### Option B: Original C++ Command Line Program
Compile and execute the native C++ engine directly:

```bash
# Compile using Makefile
make

# Or compile directly with g++ / clang++
clang++ -std=c++14 -O2 metro.cpp -o metro

# Run the executable
./metro
```

---

## 📂 Project Structure

```text
metro-route-finder/
├── index.html         # Main dashboard, interactive UI, and SVG layout
├── style.css          # Classic transit styling, dark theme, and responsive flex frame
├── app.js             # UI controller, map event handlers, and terminal simulator
├── router.js          # Graph data structure (MetroGraph, BFS, Dijkstra, Fare logic)
├── data.js            # Metro station coordinates, line sequences, and tourist data
├── metro.cpp          # Original C++ source code with BFS pathfinding
├── Makefile           # Multi-platform C++ compilation script
├── list.txt           # Master station list
├── blueline.txt       # Blue Line station sequence
├── bluext.txt         # Blue Line extension sequence
├── yellowline.txt     # Yellow Line station sequence
├── redline.txt        # Red Line station sequence
├── greenline.txt      # Green Line station sequence
├── violetline.txt     # Violet Line station sequence
├── orangeline.txt     # Airport Express Line station sequence
├── tourplace.txt      # Tourist destinations and nearest stations
├── paisa.txt          # HarshPay wallet records
└── README.md          # Comprehensive project documentation
```

---

## 🧠 Algorithmic Foundation

- **Graph Model**: Represented as an undirected graph $G = (V, E)$, where vertices $V$ represent metro stations and edges $E$ represent direct tracks between adjacent stations.
- **Shortest Path**: Standard unweighted BFS guarantees the optimal hop-count path in $\mathcal{O}(|V| + |E|)$.
- **Transfer Optimization**: Incorporates edge weights penalizing line transitions to calculate minimum-interchange paths.

---

## 👨‍💻 Author

**Harsh Kumar**
- GitHub: [@Harshkumar2306](https://github.com/Harshkumar2306)
- Repository: [metro-route-finder-](https://github.com/Harshkumar2306/metro-route-finder-)
- Live Website: [metro-route-finder-beige.vercel.app](https://metro-route-finder-beige.vercel.app/)

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).
