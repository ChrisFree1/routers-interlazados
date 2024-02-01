const routers = document.querySelectorAll('.router');
const routingTableBody = document.querySelector('#routing-table tbody');

let routerMap = new Map();

function disconnectRouters(routerId) {
  const connectedRouterId = routerMap.get(routerId);
  routerMap.delete(routerId);
  routerMap.delete(connectedRouterId);
  updateRoutingTable();
}

function updateRoutingTable() {
  routingTableBody.innerHTML = '';

  routers.forEach(router => {
    const routerId = router.dataset.routerId;
    const isConnected = routerMap.has(routerId);

    const row = document.createElement('tr');
    const routerCell = document.createElement('td');
    const connectedRouterCell = document.createElement('td');

    routerCell.textContent = routerId;
    connectedRouterCell.textContent = routerMap.get(routerId) || ''; // Evitar null o undefined

    row.appendChild(routerCell);
    row.appendChild(connectedRouterCell);

    const disconnectBtnCell = document.createElement('td');
    const disconnectBtn = document.createElement('button');
    disconnectBtn.textContent = 'Desconectar';
    disconnectBtn.className = 'disconnect-btn join-btn';
    disconnectBtn.addEventListener('click', () => disconnectRouters(routerId));
    disconnectBtnCell.appendChild(disconnectBtn);
    row.appendChild(disconnectBtnCell);

    routingTableBody.appendChild(row);

    const statusIndicator = router.querySelector('.status-indicator');
    if (statusIndicator) {
      statusIndicator.style.display = isConnected ? 'block' : 'none';
    }
  });
}

// Ocultar el botón de desconectar y el indicador de estado de routers no conectados
routers.forEach(router => {
  const routerId = router.dataset.routerId;
  const isConnected = routerMap.has(routerId);

  // Ocultar el indicador de estado si existe
  const statusIndicator = router.querySelector('.status-indicator');
  if (statusIndicator) {
    statusIndicator.style.display = isConnected ? 'block' : 'none';
  }

  // Ocultar el botón de desconectar si existe
  const disconnectBtnCellInternal = router.querySelector('.disconnect-btn');
  if (disconnectBtnCellInternal) {
    disconnectBtnCellInternal.style.display = isConnected ? 'block' : 'none';
  }
});

// Manejar el evento de clic en el botón "Join"
routers.forEach(router => {
  const joinBtn = router.querySelector('.join-btn');
  joinBtn.addEventListener('click', () => {
    const routerId = router.dataset.routerId;
    const availableRouters = Array.from(routers).filter(r => !routerMap.has(r.dataset.routerId));

    if (availableRouters.length > 1) {
      const unconnectedRouter = availableRouters.find(r => r !== router);
      const unconnectedRouterId = unconnectedRouter.dataset.routerId;

      routerMap.set(routerId, unconnectedRouterId);
      routerMap.set(unconnectedRouterId, routerId);
      updateRoutingTable();
    } else {
      alert('No hay más routers disponibles para conectar.');
    }
  });
});
