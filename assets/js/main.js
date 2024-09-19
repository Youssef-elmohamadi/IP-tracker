let ip = document.querySelector(".info .address p");
let locationIp = document.querySelector(".info .location p");
let timeZone = document.querySelector(".info .time-zone p");
let isp = document.querySelector(".info .isp p");
console.log(ip);
let map;
let marker;
function initMap(lat = 51.505, lon = -0.09) {
  map = L.map("map").setView([lat, lon], 13);
  //   L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  //     maxZoom: 19,
  //     attribution:
  //       '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  //   }).addTo(map);
  googleStreets = L.tileLayer(
    "http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}",
    {
      maxZoom: 20,
      subdomains: ["mt0", "mt1", "mt2", "mt3"],
    }
  );
  googleStreets.addTo(map);
}

function updateMap(lat, lon) {
  map.setView([lat, lon], 13);
  if (marker) {
    marker.setLatLng([lat, lon]);
  } else {
    marker = L.marker([lat, lon]).addTo(map);
  }
  marker.bindPopup(`Location: [${lat}, ${lon}]`).openPopup();
}

function searchIp() {
  let ip = document.querySelector(".search input").value;
  fetch(`https://ip-api.com/json/${ip}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "fail") {
        alert("The site was not found for this IP");
      } else {
        updateMap(data.lat, data.lon);
        updateInfo(data);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function updateInfo(data) {
  ip.innerHTML = `${data.query}`;
  locationIp.innerHTML = `${data.city}`;
  timeZone.innerHTML = `${data.timezone}`;
  isp.innerHTML = `${data.isp}`;
}

window.onload = () => {
  initMap();
};
