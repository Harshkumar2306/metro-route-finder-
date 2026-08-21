// ==========================================================================
// DELHI METRO ROUTE FINDER - APP CONTROLLER
// ==========================================================================

import { LINES, STATION_COORDINATES, TOURIST_PLACES, INITIAL_SMART_CARDS } from './data.js';
import { metroGraph } from './router.js';

// Application State
const state = {
  activeTab: 'route-tab',
  originStation: '',
  destStation: '',
  routeMode: 'shortest',
  currentRoute: null,
  smartCards: [...INITIAL_SMART_CARDS],
  selectedCardId: 100001,
  mapZoom: 1,
  mapPan: { x: 0, y: 0 },
  isPanning: false,
  startPan: { x: 0, y: 0 },
  // Terminal state machine
  termState: 'MENU', // 'MENU', 'ROUTE_SRC', 'ROUTE_DEST', 'TOUR_INPUT', 'RECHARGE_ID', 'RECHARGE_AMT'
  termBuffer: {}
};

// DOM Elements
const elements = {
  // Tabs
  navTabs: document.querySelectorAll('.nav-tab'),
  tabPanes: document.querySelectorAll('.tab-pane'),
  // Route Controls
  originSelect: document.getElementById('origin-select'),
  destSelect: document.getElementById('dest-select'),
  swapBtn: document.getElementById('swap-btn'),
  findRouteBtn: document.getElementById('find-route-btn'),
  resetRouteBtn: document.getElementById('reset-route-btn'),
  modeRadios: document.querySelectorAll('input[name="route-mode"]'),
  quickChips: document.querySelectorAll('.quick-chip'),
  // Route Results
  resultCard: document.getElementById('route-result-container'),
  resTime: document.getElementById('res-time'),
  resStations: document.getElementById('res-stations'),
  resInterchanges: document.getElementById('res-interchanges'),
  resDistance: document.getElementById('res-distance'),
  resTokenFare: document.getElementById('res-token-fare'),
  resCardFare: document.getElementById('res-card-fare'),
  resOffpeakFare: document.getElementById('res-offpeak-fare'),
  itinerarySteps: document.getElementById('itinerary-steps'),
  // SVG Map
  svg: document.getElementById('metro-svg'),
  linesLayer: document.getElementById('svg-lines-layer'),
  routeLayer: document.getElementById('svg-route-layer'),
  stationsLayer: document.getElementById('svg-stations-layer'),
  zoomInBtn: document.getElementById('zoom-in-btn'),
  zoomOutBtn: document.getElementById('zoom-out-btn'),
  zoomResetBtn: document.getElementById('zoom-reset-btn'),
  mapContainer: document.getElementById('map-container'),
  // Tourist Guide
  touristGrid: document.getElementById('tourist-grid'),
  touristSearchInput: document.getElementById('tourist-search-input'),
  // Smart Card
  cardBalDisplay: document.getElementById('card-balance-display'),
  cardHolderName: document.getElementById('card-holder-name'),
  cardIdDisplay: document.getElementById('card-id-display'),
  cardsListTable: document.getElementById('cards-list-table'),
  rechargeForm: document.getElementById('recharge-form'),
  rechargeCardId: document.getElementById('recharge-card-id'),
  rechargeAmt: document.getElementById('recharge-amount'),
  rechargeMsg: document.getElementById('recharge-message'),
  quickAmtBtns: document.querySelectorAll('.quick-amt-btn'),
  // Terminal
  terminalScreen: document.getElementById('terminal-screen'),
  terminalOutput: document.getElementById('terminal-output'),
  terminalInput: document.getElementById('terminal-input'),
  termClearBtn: document.getElementById('term-clear-btn')
};

// ==========================================================================
// INITIALIZATION
// ==========================================================================
function init() {
  initClock();
  initTabs();
  populateStationSelects();
  renderSvgMap();
  initMapInteractions();
  initRouteFinder();
  renderTouristPlaces();
  initTouristSearch();
  initSmartCard();
  initTerminal();
}

// Clock & Time
function initClock() {
  const timeEl = document.getElementById('current-time');
  const updateTime = () => {
    const now = new Date();
    if (timeEl) {
      timeEl.textContent = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' IST';
    }
  };
  updateTime();
  setInterval(updateTime, 1000);
}

// Navigation Tabs
function initTabs() {
  elements.navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');
      switchTab(targetTab);
    });
  });
}

function switchTab(tabId) {
  state.activeTab = tabId;
  elements.navTabs.forEach(t => {
    if (t.getAttribute('data-tab') === tabId) t.classList.add('active');
    else t.classList.remove('active');
  });

  elements.tabPanes.forEach(pane => {
    if (pane.id === tabId) pane.classList.add('active');
    else pane.classList.remove('active');
  });

  if (tabId === 'terminal-tab') {
    elements.terminalInput?.focus();
  }
}

// Station Selects
function populateStationSelects() {
  const allStations = Array.from(metroGraph.stations).sort();
  
  [elements.originSelect, elements.destSelect].forEach(select => {
    if (!select) return;
    select.innerHTML = '<option value="">-- Choose Metro Station --</option>';
    allStations.forEach(station => {
      const opt = document.createElement('option');
      opt.value = station;
      opt.textContent = station;
      select.appendChild(opt);
    });
  });
}

// ==========================================================================
// SVG MAP RENDERING & INTERACTIONS
// ==========================================================================
function renderSvgMap() {
  if (!elements.linesLayer || !elements.stationsLayer) return;

  elements.linesLayer.innerHTML = '';
  elements.stationsLayer.innerHTML = '';

  const tooltip = document.getElementById('map-tooltip');
  const container = elements.mapContainer;

  // Compute lines for each station to detect interchanges
  const stationLinesMap = new Map();
  Object.values(LINES).forEach(line => {
    line.stations.forEach(st => {
      if (!stationLinesMap.has(st)) stationLinesMap.set(st, []);
      stationLinesMap.get(st).push(line);
    });
  });

  // 1. Draw Lines
  Object.values(LINES).forEach(line => {
    const points = [];
    line.stations.forEach(st => {
      const coord = STATION_COORDINATES[st];
      if (coord) points.push(`${coord.x},${coord.y}`);
    });

    if (points.length > 1) {
      const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
      polyline.setAttribute('points', points.join(' '));
      polyline.setAttribute('stroke', line.color);
      polyline.setAttribute('stroke-width', '6');
      polyline.setAttribute('class', 'svg-metro-line');
      polyline.setAttribute('id', `line-path-${line.id}`);
      elements.linesLayer.appendChild(polyline);
    }
  });

  // 2. Draw Stations
  Object.entries(STATION_COORDINATES).forEach(([name, coord]) => {
    const lines = stationLinesMap.get(name) || [];
    const isInterchange = lines.length > 1;

    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', `svg-station-node ${isInterchange ? 'is-interchange' : ''}`);
    g.setAttribute('data-station', name);
    g.setAttribute('transform', `translate(${coord.x}, ${coord.y})`);

    // Circle Marker
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('r', isInterchange ? '5.5' : '4');
    circle.setAttribute('fill', '#ffffff');
    circle.setAttribute('stroke', isInterchange ? '#f59e0b' : '#1e293b');
    circle.setAttribute('stroke-width', isInterchange ? '2.5' : '1.5');
    g.appendChild(circle);

    // Smart Label Orientation:
    // Angle horizontal line stations (Red, Green, Blue) at -38deg to eliminate overlap completely
    const isVerticalYellow = coord.x === 850 && coord.y <= 1000;
    const isBottomCurve = coord.y > 1000;
    
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    if (isVerticalYellow) {
      // Alternate left & right on Yellow line for crystal clarity
      const isLeft = (coord.y % 56 < 28);
      if (isLeft) {
        text.setAttribute('x', '-10');
        text.setAttribute('y', '3.5');
        text.setAttribute('text-anchor', 'end');
      } else {
        text.setAttribute('x', '10');
        text.setAttribute('y', '3.5');
        text.setAttribute('text-anchor', 'start');
      }
    } else if (isBottomCurve) {
      text.setAttribute('x', '0');
      text.setAttribute('y', '16');
      text.setAttribute('text-anchor', 'middle');
    } else {
      // Diagonal angled labels (classic transit map design)
      text.setAttribute('transform', 'rotate(-38) translate(8, -1)');
      text.setAttribute('text-anchor', 'start');
    }
    
    text.textContent = name;
    g.appendChild(text);

    // Hover Tooltip events
    g.addEventListener('mouseenter', (e) => {
      if (!tooltip) return;
      const lineBadges = lines.map(l => 
        `<span class="tooltip-line-badge" style="background:${l.color}">${l.name}</span>`
      ).join('');

      tooltip.innerHTML = `
        <span class="tooltip-st-name">${name}</span>
        <div class="tooltip-lines">${lineBadges}</div>
        <div class="tooltip-action">${isInterchange ? '🔄 Interchange Station &bull; ' : ''}Click to Select</div>
      `;
      tooltip.classList.remove('hidden');
    });

    g.addEventListener('mousemove', (e) => {
      if (!tooltip || !container) return;
      const rect = container.getBoundingClientRect();
      tooltip.style.left = `${e.clientX - rect.left}px`;
      tooltip.style.top = `${e.clientY - rect.top}px`;
    });

    g.addEventListener('mouseleave', () => {
      if (tooltip) tooltip.classList.add('hidden');
    });

    // Click handler: Set Origin or Destination
    g.addEventListener('click', (e) => {
      e.stopPropagation();
      handleStationNodeClick(name);
    });

    elements.stationsLayer.appendChild(g);
  });
}

function handleStationNodeClick(stationName) {
  if (!state.originStation || (state.originStation && state.destStation)) {
    state.originStation = stationName;
    state.destStation = '';
    elements.originSelect.value = stationName;
    elements.destSelect.value = '';
    clearRouteResult();
  } else if (state.originStation && !state.destStation) {
    if (state.originStation === stationName) return;
    state.destStation = stationName;
    elements.destSelect.value = stationName;
    executeRouteCalculation();
  }
}

function initMapInteractions() {
  // Zoom Buttons
  elements.zoomInBtn?.addEventListener('click', () => adjustZoom(0.2));
  elements.zoomOutBtn?.addEventListener('click', () => adjustZoom(-0.2));
  elements.zoomResetBtn?.addEventListener('click', resetMapView);

  // Mouse / Pan interaction
  const container = elements.mapContainer;
  if (!container) return;

  container.addEventListener('mousedown', (e) => {
    if (e.target.closest('.svg-station-node')) return;
    state.isPanning = true;
    state.startPan = { x: e.clientX - state.mapPan.x, y: e.clientY - state.mapPan.y };
  });

  window.addEventListener('mousemove', (e) => {
    if (!state.isPanning) return;
    state.mapPan.x = e.clientX - state.startPan.x;
    state.mapPan.y = e.clientY - state.startPan.y;
    applyMapTransform();
  });

  window.addEventListener('mouseup', () => {
    state.isPanning = false;
  });

  // Mobile / Tablet Touch Gestures (Single finger Pan, Two finger Pinch-to-Zoom)
  let initialPinchDistance = null;
  let initialPinchZoom = 1;

  container.addEventListener('touchstart', (e) => {
    if (e.target.closest('.svg-station-node')) return;
    if (e.touches.length === 1) {
      state.isPanning = true;
      state.startPan = { x: e.touches[0].clientX - state.mapPan.x, y: e.touches[0].clientY - state.mapPan.y };
    } else if (e.touches.length === 2) {
      state.isPanning = false;
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      initialPinchDistance = Math.hypot(dx, dy);
      initialPinchZoom = state.mapZoom;
    }
  }, { passive: true });

  container.addEventListener('touchmove', (e) => {
    if (e.touches.length === 1 && state.isPanning) {
      state.mapPan.x = e.touches[0].clientX - state.startPan.x;
      state.mapPan.y = e.touches[0].clientY - state.startPan.y;
      applyMapTransform();
    } else if (e.touches.length === 2 && initialPinchDistance) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const currentDistance = Math.hypot(dx, dy);
      const scale = currentDistance / initialPinchDistance;
      state.mapZoom = Math.min(Math.max(0.5, initialPinchZoom * scale), 3.5);
      applyMapTransform();
    }
  }, { passive: true });

  container.addEventListener('touchend', (e) => {
    if (e.touches.length < 2) initialPinchDistance = null;
    if (e.touches.length === 0) state.isPanning = false;
  }, { passive: true });

  // Mouse wheel zoom
  container.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.1 : -0.1;
    adjustZoom(delta);
  }, { passive: false });
}

function adjustZoom(delta) {
  state.mapZoom = Math.min(Math.max(0.6, state.mapZoom + delta), 3.0);
  applyMapTransform();
}

function resetMapView() {
  state.mapZoom = 1;
  state.mapPan = { x: 0, y: 0 };
  applyMapTransform();
}

function applyMapTransform() {
  if (!elements.svg) return;
  elements.svg.style.transform = `translate(${state.mapPan.x}px, ${state.mapPan.y}px) scale(${state.mapZoom})`;
  elements.svg.style.transformOrigin = 'center center';
  elements.svg.style.transition = state.isPanning ? 'none' : 'transform 0.2s ease-out';
}

// ==========================================================================
// ROUTE FINDER LOGIC & PRESENTATION
// ==========================================================================
function initRouteFinder() {
  // Origin / Dest Select changes
  elements.originSelect?.addEventListener('change', (e) => {
    state.originStation = e.target.value;
  });

  elements.destSelect?.addEventListener('change', (e) => {
    state.destStation = e.target.value;
  });

  // Swap button
  elements.swapBtn?.addEventListener('click', () => {
    const temp = state.originStation;
    state.originStation = state.destStation;
    state.destStation = temp;
    elements.originSelect.value = state.originStation;
    elements.destSelect.value = state.destStation;
    if (state.originStation && state.destStation) {
      executeRouteCalculation();
    }
  });

  // Route Mode Radios
  elements.modeRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      state.routeMode = e.target.value;
      if (state.originStation && state.destStation) {
        executeRouteCalculation();
      }
    });
  });

  // Find Route Button
  elements.findRouteBtn?.addEventListener('click', () => {
    executeRouteCalculation();
  });

  // Reset Button
  elements.resetRouteBtn?.addEventListener('click', () => {
    state.originStation = '';
    state.destStation = '';
    elements.originSelect.value = '';
    elements.destSelect.value = '';
    clearRouteResult();
    resetMapView();
  });

  // Quick chips
  elements.quickChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const from = chip.getAttribute('data-from');
      const to = chip.getAttribute('data-to');
      state.originStation = from;
      state.destStation = to;
      elements.originSelect.value = from;
      elements.destSelect.value = to;
      executeRouteCalculation();
    });
  });
}

function executeRouteCalculation() {
  const origin = elements.originSelect.value || state.originStation;
  const dest = elements.destSelect.value || state.destStation;

  if (!origin || !dest) {
    alert('Please select both Origin and Destination stations.');
    return;
  }

  if (origin === dest) {
    alert('Origin and Destination cannot be the same station.');
    return;
  }

  const result = metroGraph.findRoute(origin, dest, state.routeMode);
  if (!result) {
    alert('No route found between selected stations.');
    return;
  }

  state.currentRoute = result;
  renderRouteResult(result);
  highlightRouteOnMap(result);
}

function renderRouteResult(res) {
  elements.resultCard.classList.remove('hidden');

  // Stats
  elements.resTime.textContent = `${res.estimatedTimeMinutes} min`;
  elements.resStations.textContent = res.stationCount;
  elements.resInterchanges.textContent = res.interchangeCount;
  elements.resDistance.textContent = `${res.distanceKm} km`;

  // Fare
  elements.resTokenFare.textContent = `₹${res.fare.token}`;
  elements.resCardFare.textContent = `₹${res.fare.smartCard}`;
  elements.resOffpeakFare.textContent = `₹${res.fare.offPeak}`;

  // Itinerary
  elements.itinerarySteps.innerHTML = '';
  res.segments.forEach((seg, sIdx) => {
    const isFirstSegment = sIdx === 0;
    const isLastSegment = sIdx === res.segments.length - 1;

    // Interchange announcement banner
    if (!isFirstSegment) {
      const interchangeDiv = document.createElement('div');
      interchangeDiv.className = 'itin-interchange-banner';
      interchangeDiv.innerHTML = `⇄ Transfer to <strong>${seg.line.name}</strong> towards <em>${seg.stations[seg.stations.length - 1]}</em>`;
      elements.itinerarySteps.appendChild(interchangeDiv);
    }

    // Stations in segment
    seg.stations.forEach((st, stIdx) => {
      // Avoid duplicate station on interchange junction
      if (!isFirstSegment && stIdx === 0) return;

      const stepDiv = document.createElement('div');
      stepDiv.className = 'itin-step';

      const isBoarding = isFirstSegment && stIdx === 0;
      const isDestination = isLastSegment && stIdx === seg.stations.length - 1;

      stepDiv.innerHTML = `
        <div class="itin-icon-col">
          <div class="itin-bullet" style="background: ${seg.line.color}"></div>
          ${!isDestination ? `<div class="itin-line-bar" style="background: ${seg.line.color}"></div>` : ''}
        </div>
        <div class="itin-details">
          <div class="itin-station-name">${st}</div>
          <div class="itin-action">
            ${isBoarding ? `Board <strong>${seg.line.name}</strong>` : (isDestination ? `🏁 Destination Arrival` : `Passing station`)}
          </div>
        </div>
      `;
      elements.itinerarySteps.appendChild(stepDiv);
    });
  });
}

function highlightRouteOnMap(route) {
  if (!elements.routeLayer || !elements.stationsLayer) return;

  // Clear previous route
  elements.routeLayer.innerHTML = '';

  // Dim lines
  document.querySelectorAll('.svg-metro-line').forEach(el => el.classList.add('dimmed'));

  // Reset station highlights
  document.querySelectorAll('.svg-station-node').forEach(node => node.classList.remove('active-route'));

  // Build route polyline
  const routePoints = [];
  route.path.forEach(stName => {
    const coord = STATION_COORDINATES[stName];
    if (coord) {
      routePoints.push(`${coord.x},${coord.y}`);
      const nodeEl = document.querySelector(`.svg-station-node[data-station="${stName}"]`);
      if (nodeEl) nodeEl.classList.add('active-route');
    }
  });

  if (routePoints.length > 1) {
    const highlightPath = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    highlightPath.setAttribute('points', routePoints.join(' '));
    highlightPath.setAttribute('class', 'svg-route-highlight');
    elements.routeLayer.appendChild(highlightPath);
  }
}

function clearRouteResult() {
  elements.resultCard.classList.add('hidden');
  elements.routeLayer.innerHTML = '';
  document.querySelectorAll('.svg-metro-line').forEach(el => el.classList.remove('dimmed'));
  document.querySelectorAll('.svg-station-node').forEach(node => node.classList.remove('active-route'));
}

// ==========================================================================
// TAB 2: TOURIST GUIDE
// ==========================================================================
function renderTouristPlaces(filter = '') {
  if (!elements.touristGrid) return;
  elements.touristGrid.innerHTML = '';

  const q = filter.toLowerCase().trim();
  const filtered = TOURIST_PLACES.filter(p => 
    p.name.toLowerCase().includes(q) || 
    p.station.toLowerCase().includes(q) || 
    p.tag.toLowerCase().includes(q)
  );

  filtered.forEach(place => {
    const card = document.createElement('div');
    card.className = 'tourist-card';
    card.innerHTML = `
      <div class="tourist-card-top">
        <span class="tourist-icon">${place.icon}</span>
        <span class="tourist-tag">${place.tag}</span>
      </div>
      <h3>${place.name}</h3>
      <p>${place.desc}</p>
      <div class="tourist-card-bottom">
        <div class="nearest-st-info">
          <span class="nearest-st-label">Nearest Station</span>
          <span class="nearest-st-name">🚇 ${place.station}</span>
        </div>
        <button class="tourist-route-btn" data-station="${place.station}">
          Plan Route →
        </button>
      </div>
    `;

    // Button click
    card.querySelector('.tourist-route-btn').addEventListener('click', () => {
      routeToTouristStation(place.station);
    });

    elements.touristGrid.appendChild(card);
  });
}

function initTouristSearch() {
  elements.touristSearchInput?.addEventListener('input', (e) => {
    renderTouristPlaces(e.target.value);
  });
}

function routeToTouristStation(targetStation) {
  switchTab('route-tab');
  state.destStation = targetStation;
  elements.destSelect.value = targetStation;
  if (!state.originStation) {
    state.originStation = 'Rajiv Chowk'; // Default iconic origin
    elements.originSelect.value = 'Rajiv Chowk';
  }
  executeRouteCalculation();
}

// ==========================================================================
// TAB 3: SMART CARD (PAISA) RECHARGE SIMULATOR
// ==========================================================================
function initSmartCard() {
  renderSmartCardsTable();
  updateCardPreview(state.selectedCardId);

  // Quick amount buttons
  elements.quickAmtBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const amt = btn.getAttribute('data-amt');
      if (elements.rechargeAmt) elements.rechargeAmt.value = amt;
    });
  });

  // Recharge Form Submit
  elements.rechargeForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = parseInt(elements.rechargeCardId.value, 10);
    const amount = parseInt(elements.rechargeAmt.value, 10);

    if (isNaN(id) || isNaN(amount) || amount <= 0) {
      showRechargeMessage('Please enter valid Card ID and positive amount.', false);
      return;
    }

    const card = state.smartCards.find(c => c.id === id);
    if (!card) {
      showRechargeMessage(`HarshPay Wallet ID ${id} not found in the system (paisa.txt).`, false);
      return;
    }

    // Update balance
    card.balance += amount;
    state.selectedCardId = id;
    updateCardPreview(id);
    renderSmartCardsTable();

    showRechargeMessage(`⚡ HarshPay recharge of ₹${amount} successful! New Balance: ₹${card.balance}`, true);
  });
}

function updateCardPreview(cardId) {
  const card = state.smartCards.find(c => c.id === cardId) || state.smartCards[0];
  if (!card) return;

  if (elements.cardBalDisplay) elements.cardBalDisplay.textContent = `₹${card.balance}.00`;
  if (elements.cardHolderName) elements.cardHolderName.textContent = card.holder;
  if (elements.cardIdDisplay) elements.cardIdDisplay.textContent = `HARSHPAY #${card.id}`;
  if (elements.rechargeCardId) elements.rechargeCardId.value = card.id;
}

function renderSmartCardsTable() {
  if (!elements.cardsListTable) return;
  elements.cardsListTable.innerHTML = '';

  state.smartCards.forEach(c => {
    const row = document.createElement('div');
    row.className = 'card-record-row';
    row.innerHTML = `
      <div class="card-record-info">
        <span class="card-record-id">⚡ HarshPay ID: ${c.id}</span>
        <span class="card-record-holder">${c.holder}</span>
      </div>
      <div class="card-record-bal">₹${c.balance}</div>
    `;

    row.addEventListener('click', () => {
      state.selectedCardId = c.id;
      updateCardPreview(c.id);
    });

    elements.cardsListTable.appendChild(row);
  });
}

function showRechargeMessage(msg, isSuccess) {
  if (!elements.rechargeMsg) return;
  elements.rechargeMsg.textContent = msg;
  elements.rechargeMsg.className = `recharge-alert ${isSuccess ? 'success' : 'error'}`;
  elements.rechargeMsg.classList.remove('hidden');

  setTimeout(() => {
    elements.rechargeMsg?.classList.add('hidden');
  }, 4000);
}

// ==========================================================================
// TAB 4: RETRO C++ TERMINAL EMULATOR
// ==========================================================================
function initTerminal() {
  printMenu();

  elements.terminalInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = elements.terminalInput.value.trim();
      elements.terminalInput.value = '';
      handleTerminalCommand(val);
    }
  });

  elements.termClearBtn?.addEventListener('click', () => {
    if (elements.terminalOutput) elements.terminalOutput.innerHTML = '';
    printMenu();
  });
}

function printTermLine(text, color = '#4ade80') {
  if (!elements.terminalOutput) return;
  const p = document.createElement('div');
  p.style.color = color;
  p.innerHTML = text.replace(/\n/g, '<br>').replace(/ /g, '&nbsp;');
  elements.terminalOutput.appendChild(p);
  elements.terminalScreen.scrollTop = elements.terminalScreen.scrollHeight;
}

function printMenu() {
  state.termState = 'MENU';
  printTermLine(`
1.To Route between two stations
2.To check nearest metro station to a tourist place
3.To Recharge your HarshPay Wallet
Enter choice (1-3):`, '#38bdf8');
}

function handleTerminalCommand(cmd) {
  printTermLine(`metro> ${cmd}`, '#ffffff');

  switch (state.termState) {
    case 'MENU':
      if (cmd === '1') {
        state.termState = 'ROUTE_SRC';
        printTermLine('Enter station 1 (Source):', '#facc15');
      } else if (cmd === '2') {
        state.termState = 'TOUR_INPUT';
        printTermLine('Enter a place name (e.g. India Gate, Red Fort):', '#facc15');
      } else if (cmd === '3') {
        state.termState = 'RECHARGE_ID';
        printTermLine('=== HarshPay Wallet Recharge ===\nEnter your HarshPay ID:', '#facc15');
      } else {
        printTermLine('Invalid choice. Please enter 1, 2, or 3.', '#ef4444');
        printMenu();
      }
      break;

    case 'ROUTE_SRC':
      if (!metroGraph.stations.has(cmd)) {
        printTermLine(`Station "${cmd}" not found. Try e.g. Rajiv Chowk, Airport, Rithala:`, '#ef4444');
        return;
      }
      state.termBuffer.src = cmd;
      state.termState = 'ROUTE_DEST';
      printTermLine('Enter station 2 (Destination):', '#facc15');
      break;

    case 'ROUTE_DEST':
      if (!metroGraph.stations.has(cmd)) {
        printTermLine(`Station "${cmd}" not found. Try e.g. Chandni Chowk, HUDA City Centre:`, '#ef4444');
        return;
      }
      state.termBuffer.dest = cmd;
      // Execute BFS
      const res = metroGraph.findRoute(state.termBuffer.src, state.termBuffer.dest);
      if (res) {
        let routeOutput = '\n--- ROUTE CALCULATED (BFS) ---\n';
        res.path.forEach((st, idx) => {
          routeOutput += `[${idx + 1}] ${st}\n`;
        });
        routeOutput += `\nNo of stations = ${res.stationCount}\n`;
        routeOutput += `No of interchange stations = ${res.interchangeCount}\n`;
        routeOutput += `Estimated fare = Rs.${res.fare.token} (HarshPay: Rs.${res.fare.smartCard})\n`;
        printTermLine(routeOutput, '#4ade80');
      }
      printMenu();
      break;

    case 'TOUR_INPUT':
      const place = TOURIST_PLACES.find(p => p.name.toLowerCase().includes(cmd.toLowerCase()));
      if (place) {
        printTermLine(`Nearest Metro Station for "${place.name}" is:\n--> ${place.station}\n`, '#4ade80');
      } else {
        printTermLine(`Place "${cmd}" not found in tourplace.txt.\n`, '#ef4444');
      }
      printMenu();
      break;

    case 'RECHARGE_ID':
      const cardId = parseInt(cmd, 10);
      const card = state.smartCards.find(c => c.id === cardId);
      if (!card) {
        printTermLine(`Error: HarshPay ID ${cmd} not found in the system.`, '#ef4444');
        printMenu();
        return;
      }
      state.termBuffer.card = card;
      state.termState = 'RECHARGE_AMT';
      printTermLine('Enter recharge amount:', '#facc15');
      break;

    case 'RECHARGE_AMT':
      const amt = parseInt(cmd, 10);
      if (isNaN(amt) || amt <= 0) {
        printTermLine('Invalid amount. Recharge cancelled.', '#ef4444');
      } else {
        state.termBuffer.card.balance += amt;
        printTermLine(`\nHarshPay recharge successful!\nHarshPay ID: ${state.termBuffer.card.id}\nRecharge Amount: Rs.${amt}\nNew Balance: Rs.${state.termBuffer.card.balance}\n`, '#4ade80');
        renderSmartCardsTable();
        updateCardPreview(state.termBuffer.card.id);
      }
      printMenu();
      break;
  }
}

// Start application
document.addEventListener('DOMContentLoaded', init);
