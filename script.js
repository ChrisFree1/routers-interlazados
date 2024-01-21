let connections = [];

function updateRoutingTable() {
 // Clear the routing table
 document.getElementById("routing-table").innerHTML = "";

 // Re-populate the routing table with the current connections
 for (let i = 0; i < connections.length; i++) {
    let row = document.createElement("tr");
    let cell1 = document.createElement("td");
    let cell2 = document.createElement("td");

    cell1.textContent = connections[i].split("-")[0];
    cell2.textContent = connections[i].split("-")[1];

    row.appendChild(cell1);
    row.appendChild(cell2);
    document.getElementById("routing-table").appendChild(row);
 }
}
function connectRouters(router1, router2) {
  // Disconnect routers if already connected
  if (connections.includes(router1 + "-" + router2)) {
    disconnectRouters(router1, router2);
    return;
  }

  // Connect routers
  connections.push(router1 + "-" + router2);
  updateRoutingTable();

  // Add visual connection
  let x1 = document.getElementById(router1).getBoundingClientRect().right;
  let y1 = document.getElementById(router1).getBoundingClientRect().bottom;
  let x2 = document.getElementById(router2).getBoundingClientRect().left;
  let y2 = document.getElementById(router2).getBoundingClientRect().bottom;
  let connection = document.createElement("div");
  connection.className = "connection";
  connection.style.left = x1 + "px";
  connection.style.top = y1 + "px";
  connection.style.width = Math.abs(x2 - x1) + "px";
  connection.style.transformOrigin = "left top";
  if (x2 > x1) {
    connection.style.transform = "rotate(-45deg)";
  } else {
    connection.style.transform = "rotate(45deg)";
  }
  document.body.appendChild(connection);
}

function disconnectRouters(router1, router2) {
  // Disconnect routers
  connections = connections.filter(
    (connection) => connection !== router1 + "-" + router2
  );
  updateRoutingTable();
}
