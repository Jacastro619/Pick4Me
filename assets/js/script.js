window.onload = function () {
  L.mapquest.key = "4JE8n3QyoprYfpwIHorXiugDcOsYQNLv";

  var map = L.mapquest.map("map", {
    center: [39.368279, -98.964844],
    layers: L.mapquest.tileLayer("map"),
    zoom: 4,
  });
};
