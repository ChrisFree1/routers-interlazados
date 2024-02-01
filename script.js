const routers = document.querySelectorAll('.router');
const routingTableBody = document.querySelector('#routing-table tbody');

let routerMap = new Map();

function updateRoutingTable() {
  routingTableBody.innerHTML = '';

  routerMap.forEach((connectedRouterId, routerId) => {
    const row = document.createElement('tr');
    const routerCell = document.createElement('td');
    const connectedRouterCell = document.createElement('td');

    routerCell.textContent = routerId;
    connectedRouterCell.textContent = connectedRouterId;

    row.appendChild(routerCell);
    row.appendChild(connectedRouterCell);
    routingTableBody.appendChild(row);
  });
}

routers.forEach(router => {
  const joinBtn = router.querySelector('.join-btn');

  joinBtn.addEventListener('click', () => {
    const routerId = router.dataset.routerId;
    const availableRouters = Array.from(routers).filter(r => !routerMap.has(r.dataset.routerId));

    if (availableRouters.length) {
      const unconnectedRouter = availableRouters[0];
      const unconnectedRouterId = unconnectedRouter.dataset.routerId;

      routerMap.set(routerId, unconnectedRouterId);
      routerMap.set(unconnectedRouterId, routerId);
      updateRoutingTable();
    } else {
      alert('No more routers available to connect.');
    }
  });
});