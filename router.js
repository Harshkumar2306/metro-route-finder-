// Classic Metro Route Finder - Router & Graph Engine
import { LINES } from './data.js';

export class MetroGraph {
  constructor() {
    this.adj = new Map();
    this.stations = new Set();
    this.edgeLines = new Map(); // key: "stationA->stationB" => Line object
    this.buildGraph();
  }

  addVertex(station) {
    if (!this.adj.has(station)) {
      this.adj.set(station, []);
      this.stations.add(station);
    }
  }

  addEdge(u, v, line) {
    this.addVertex(u);
    this.addVertex(v);
    this.adj.get(u).push({ node: v, line: line });
    this.adj.get(v).push({ node: u, line: line });
    this.edgeLines.set(`${u}---${v}`, line);
    this.edgeLines.set(`${v}---${u}`, line);
  }

  buildGraph() {
    Object.values(LINES).forEach(line => {
      const stList = line.stations;
      for (let i = 0; i < stList.length - 1; i++) {
        this.addEdge(stList[i], stList[i + 1], line);
      }
    });
  }

  getEdgeLine(u, v) {
    return this.edgeLines.get(`${u}---${v}`) || null;
  }

  // Classic BFS matching original metro.cpp algorithm + enhanced transfer detection
  findRoute(src, dest, mode = 'shortest') {
    if (!this.stations.has(src) || !this.stations.has(dest)) {
      return null;
    }

    if (src === dest) {
      return {
        path: [src],
        stationCount: 1,
        interchanges: [],
        interchangeCount: 0,
        distanceKm: 0,
        estimatedTimeMinutes: 0,
        fare: { token: 0, smartCard: 0, offPeak: 0 },
        segments: []
      };
    }

    // Dijkstra algorithm
    // If mode === 'min_interchange', add weight penalty to line changes
    const distances = new Map();
    const previous = new Map();
    const previousLine = new Map();
    const visited = new Set();
    
    // Priority queue simulation
    const pq = []; // { node, dist, currentLine }
    
    for (const st of this.stations) {
      distances.set(st, Infinity);
      previous.set(st, null);
      previousLine.set(st, null);
    }

    distances.set(src, 0);
    pq.push({ node: src, dist: 0, currentLine: null });

    while (pq.length > 0) {
      // Sort by dist asc
      pq.sort((a, b) => a.dist - b.dist);
      const { node: u, currentLine: currLine } = pq.shift();

      if (visited.has(u)) continue;
      visited.add(u);

      if (u === dest) break;

      const neighbors = this.adj.get(u) || [];
      for (const edge of neighbors) {
        const v = edge.node;
        const line = edge.line;
        
        let cost = 1; // 1 station hop
        if (mode === 'min_interchange') {
          // If changing line, add a heavy penalty so pathfinder prefers staying on same line
          if (currLine && currLine.id !== line.id) {
            cost += 5; // transfer penalty
          }
        }

        const alt = distances.get(u) + cost;
        if (alt < distances.get(v)) {
          distances.set(v, alt);
          previous.set(v, u);
          previousLine.set(v, line);
          pq.push({ node: v, dist: alt, currentLine: line });
        }
      }
    }

    // Reconstruct path
    const path = [];
    let curr = dest;
    while (curr !== null) {
      path.unshift(curr);
      curr = previous.get(curr);
    }

    if (path.length === 0 || path[0] !== src) {
      return null;
    }

    // Analyze line changes and segments
    const segments = [];
    const interchanges = [];
    let currentSegment = null;

    for (let i = 0; i < path.length - 1; i++) {
      const u = path[i];
      const v = path[i + 1];
      const line = this.getEdgeLine(u, v);

      if (!currentSegment || currentSegment.line.id !== line.id) {
        if (currentSegment) {
          interchanges.push({
            at: u,
            fromLine: currentSegment.line,
            toLine: line
          });
        }
        currentSegment = {
          line: line,
          stations: [u, v]
        };
        segments.push(currentSegment);
      } else {
        currentSegment.stations.push(v);
      }
    }

    const stationCount = path.length;
    const interchangeCount = interchanges.length;
    const distanceKm = Math.round((stationCount - 1) * 1.3 * 10) / 10;
    const estimatedTimeMinutes = (stationCount - 1) * 2 + interchangeCount * 4;

    // DMRC standard fare slab calculation
    let tokenFare = 10;
    if (distanceKm <= 2) tokenFare = 10;
    else if (distanceKm <= 5) tokenFare = 20;
    else if (distanceKm <= 12) tokenFare = 30;
    else if (distanceKm <= 21) tokenFare = 40;
    else if (distanceKm <= 32) tokenFare = 50;
    else tokenFare = 60;

    const smartCardFare = Math.round(tokenFare * 0.9);
    const offPeakFare = Math.round(tokenFare * 0.8);

    return {
      path,
      stationCount,
      interchanges,
      interchangeCount,
      distanceKm,
      estimatedTimeMinutes,
      fare: {
        token: tokenFare,
        smartCard: smartCardFare,
        offPeak: offPeakFare
      },
      segments
    };
  }
}

export const metroGraph = new MetroGraph();
