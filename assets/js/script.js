L.mapquest.key = "4JE8n3QyoprYfpwIHorXiugDcOsYQNLv";
var map;
var directions;
var routeActive = false;
var startLocation;
var endLocation;
var resultBtn = $("#one-btn-results");
var form1El = $("#form1");
var homePageEl = $(".home-page");
var resultsPageEl = $(".results-page");
var learnMorePageEl = $(".learn-more");
var mapPageEl = $(".map-page");
var resultGoBackBtn = $("#result-go-back");
var learnMoreBackBtn = $("#learn-more-back");
var threeGetDir = $(".three-get-dir");
var mapBackBtn = $("#map-back");
//------home page ids
var addressInput = $("#one-input-address");
var radiusInput = $("#one-input-radius");
var foodInput = $("#one-input-food");
var homeMsg = $("#home-msg");
var inputAlert = $(".custom-message");
var inputAlert2 = $(".custom-message-2");
var inputAlert3 = $(".custom-message-3");
var closeAlertbtn = $(".close-alert");
var rating = $("#stars");
var price = $("#price");
var address = $("#address");
var recentRating = $(".3-recent-rating");
var ratingOne = $("#rating1");
var ratingTwo = $("#rating2");
var ratingThree = $("#rating3");
var learnMoreName = $("#lmName");
var lmReview1 = $("#lm-1");
var lmReview2 = $("#lm-2");
var lmReview3 = $("#lm-3");
var lmReview4 = $("#lm-4");
var learnMoreBtn = $(".continue-btn-lm");
var historyEl = $("#pick-history");
var dataArray = [];
var rawData = [];
var data1 = [];
var startAddress = $("#start-address");
var restAddress = $("#rest-address");

var options = {
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer cpIZVMVOeEQWNK3YQtqsptY8MgVpErO4syU6mpNzUmDE26gJwG34Z6GVQHXpl-mg_v0ZneUmCS3qtJPVNB6n9r-lXzl9CsVAtIgyiqW-Wkb5z9ZAQRtrrq_qE_khZXYx",
  },
};

function toResultPage() {
  console.log("works");
  handleHomeForm();
}

function BacktoHome() {
  homePageEl.removeClass("hidden");
  resultsPageEl.addClass("hidden");
}

function toLearnMorePage() {
  resultsPageEl.addClass("hidden");
  learnMorePageEl.removeClass("hidden");
}

function backToResults() {
  resultsPageEl.removeClass("hidden");
  learnMorePageEl.addClass("hidden");
}

function MapstoResults() {
  resultsPageEl.removeClass("hidden");
  mapPageEl.addClass("hidden");
}

function toMapsPageFromResults1() {
  var restData = JSON.parse(localStorage.getItem(data1));
  data1.push(restData);
  resultsPageEl.addClass("hidden");
  mapPageEl.removeClass("hidden");
  $(restAddress).val(data1[0].businesses[0].location.display_address.join(","));
}

function toMapsPageFromResults2() {
  var restData = JSON.parse(localStorage.getItem(data1));
  data1.push(restData);
  resultsPageEl.addClass("hidden");
  mapPageEl.removeClass("hidden");
  $(restAddress).val(data1[0].businesses[1].location.display_address.join(","));
}

function toMapsPageFromResults3() {
  var restData = JSON.parse(localStorage.getItem(data1));
  data1.push(restData);
  resultsPageEl.addClass("hidden");
  mapPageEl.removeClass("hidden");
  $(restAddress).val(data1[0].businesses[2].location.display_address.join(","));
}

function toMapsPageFromResults4() {
  var restData = JSON.parse(localStorage.getItem(data1));
  data1.push(restData);
  resultsPageEl.addClass("hidden");
  mapPageEl.removeClass("hidden");
  $(restAddress).val(data1[0].businesses[3].location.display_address.join(","));
}

function toMapsPageFromLearnMore(event) {
  learnMorePageEl.addClass("hidden");
  mapPageEl.removeClass("hidden");
  restAddress.val(
    $(event.target)
      .siblings("div")
      .children(".3-address")
      .children("span")
      .text()
  );
}

function closeAlert() {
  $(inputAlert).addClass("hidden");
  $(inputAlert2).addClass("hidden");
  $(inputAlert3).addClass("hidden");
}

function displayHomeError(type, message) {
  homeMsg.textContent = message;
  homeMsg.addClass("class", type);
}

function renderHistory() {
  var rawHistoryArray = localStorage.getItem("dataArray");
  var noOverwrite = localStorage.getItem("rawArray");
  if (rawHistoryArray === null) {
    dataArray = [];
  } else {
    dataArray = JSON.parse(rawHistoryArray);
  }
  if (noOverwrite === null) {
    rawData = [];
  } else {
    rawData = JSON.parse(noOverwrite);
  }
}

function refreshHistory() {
  for (let i = 0; i < dataArray.length; i++) {
    var histBtn = $("<button>");
    histBtn.text(dataArray[i]);
    histBtn.attr({
      id: `history-btn${i}`,
      type: "button",
      style: "display: flex; width: 100%; text-align: center;",
      class: "button",
    });
    historyEl.append(histBtn);
  }
}

function showUserInput() {
  var addressUser = localStorage.getItem("userAddress");
  var radiusUser = localStorage.getItem("userRadius");
  var foodUser = localStorage.getItem("userFood");
  if (!addressUser || !radiusUser || !foodUser) {
    return;
  }
}

function handleHomeForm() {
  console.log("clicked - Saving home data to local storage");

  var userAddress = $("#one-input-address").val().trim();
  var userRadius = $("#one-input-radius").val().trim();
  var userFood = $("#one-input-food").val().trim();

  if (!userAddress || !userRadius || !userFood) {
    inputAlert.removeClass("hidden");
  } else {
    localStorage.setItem("userAddress", userAddress);
    localStorage.setItem("userRadius", userRadius);
    localStorage.setItem("UserFood", userFood);
    fetchSearch();
    userAddress = $("#one-input-address").val("");
    userRadius = $("#one-input-radius").val("");
    userFood = $("#one-input-food").val("");
  }
}

function fetchSearch() {
  var userAddress = $("#one-input-address").val().trim();
  var userRadius = $("#one-input-radius").val().trim();
  var userFood = $("#one-input-food").val().trim();

  var searchUrl = `https://corsproxy.io/?https://api.yelp.com/v3/businesses/search?location=${userAddress}&term=${userFood}&radius=${
    userRadius * 1609
  }&limit=4`;

  console.log(searchUrl);

  fetch(searchUrl, options)
    .then(function (response) {
      if (!response.ok) {
        $(inputAlert2).removeClass("hidden");
        return Promise.reject(new Error("Response is not okay"));
      }
      return response.json();
    })
    .then(function (data) {
      if (data.businesses.length < 4) {
        $(inputAlert2).removeClass("hidden");
      } else {
        data1.push(data);
        localStorage.setItem("data", JSON.stringify(data1));
        renderHistory();
        if (dataArray.includes(data.businesses[0].name)) {
        } else {
          rawData.push(data.businesses[0]);
          dataArray.push(data.businesses[0].name);
        }
        if (dataArray.length > 4) {
          dataArray.shift();
        }
        if (rawData.length > 4) {
          rawData.shift();
        }
        console.log(rawData[0]);
        localStorage.setItem("rawArray", JSON.stringify(rawData));
        localStorage.setItem("dataArray", JSON.stringify(dataArray));
        refreshHistory();
        homePageEl.addClass("hidden");
        resultsPageEl.removeClass("hidden");
        console.log(data);
        console.log(data.businesses[0].name);
        console.log(
          `Address: ${data.businesses[0].location.display_address.join(", ")}`
        );
        console.log(`Price: ${data.businesses[0].price}`);
        console.log(`This restaurant has ${data.businesses[0].rating} stars`);

        for (let i = 0; i < data.businesses.length; i++) {
          $(`#pick${i}`).text(data.businesses[i].name);
        }

        for (let i = 0; i < data.businesses.length; i++) {
          $(`.custom-card-${i}`).attr(
            "style",
            `background-image: url(${data.businesses[i].image_url}); background-size: cover;`
          );
        }

        var businessesId1 = data.businesses[0].id;
        var businessesId2 = data.businesses[1].id;
        var businessesId3 = data.businesses[2].id;
        var businessesId4 = data.businesses[3].id;

        var reviewUrl;

        $(lmReview1).on("click", function () {
          reviewUrl = `https://corsproxy.io/?https://api.yelp.com/v3/businesses/${businessesId1}/reviews?sort_by=newest`;
          fetchReviews();
          $(address).text(
            data.businesses[0].location.display_address.join(",")
          );
          $(rating).text(`${data.businesses[0].rating} ⭐`);
          $("#3rr").text("Most Recent Star Rating:");
          $(price).text(data.businesses[0].price);
          $(`.custom-card-three`).attr(
            "style",
            `background-image: url(${data.businesses[0].image_url}); background-size: cover;`
          );
        });
        $(lmReview2).on("click", function () {
          reviewUrl = `https://corsproxy.io/?https://api.yelp.com/v3/businesses/${businessesId2}/reviews?sort_by=newest`;
          fetchReviews();
          $(address).text(
            data.businesses[1].location.display_address.join(",")
          );
          $(rating).text(`${data.businesses[1].rating} ⭐`);
          $("#3rr").text("Most Recent Star Rating:");
          $(price).text(data.businesses[1].price);
          $(`.custom-card-three`).attr(
            "style",
            `background-image: url(${data.businesses[1].image_url}); background-size: cover;`
          );
        });
        $(lmReview3).on("click", function () {
          reviewUrl = `https://corsproxy.io/?https://api.yelp.com/v3/businesses/${businessesId3}/reviews?sort_by=newest`;
          fetchReviews();
          $(address).text(
            data.businesses[2].location.display_address.join(",")
          );
          $(rating).text(`${data.businesses[2].rating} ⭐`);
          $("#3rr").text("Most Recent Star Rating:");
          $(price).text(data.businesses[2].price);
          $(`.custom-card-three`).attr(
            "style",
            `background-image: url(${data.businesses[2].image_url}); background-size: cover;`
          );
        });
        $(lmReview4).on("click", function () {
          reviewUrl = `https://corsproxy.io/?https://api.yelp.com/v3/businesses/${businessesId4}/reviews?sort_by=newest`;
          fetchReviews();
          $(address).text(
            data.businesses[3].location.display_address.join(",")
          );
          $(rating).text(`${data.businesses[3].rating} ⭐`);
          $("#3rr").text("Most Recent Star Rating:");
          $(price).text(data.businesses[3].price);
          $(`.custom-card-three`).attr(
            "style",
            `background-image: url(${data.businesses[3].image_url}); background-size: cover;`
          );
        });

        function fetchReviews() {
          fetch(reviewUrl, options)
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              console.log(data);
              console.log("3 most recent star ratings");
              for (var i = 0; i < data.reviews.length; i++) {
                var ratingNum = i + 1;
                console.log(
                  `Rating number ${ratingNum}: ${data.reviews[i].rating} stars by ${data.reviews[i].user.name}`
                );
              }

              $(ratingOne).text(
                `   ${data.reviews[0].rating} star rating by ${data.reviews[0].user.name}`
              );
              $(ratingTwo).text(
                `   ${data.reviews[1].rating} star rating by ${data.reviews[1].user.name}`
              );
              $(ratingThree).text(
                `   ${data.reviews[2].rating} star rating by ${data.reviews[2].user.name}`
              );
            });
        }
        $(learnMoreBtn).on("click", function (event) {
          var restaurantName = $(event.target)
            .parent("div")
            .siblings("div")
            .children("div")
            .children("h1")
            .text();
          $(learnMoreName).text(restaurantName);
        });
      }
    });
}

function historyPick1() {
  resultsPageEl.addClass("hidden");
  learnMorePageEl.removeClass("hidden");
  $(learnMoreName).text(rawData[0].name);
  $(address).text(rawData[0].location.display_address.join(","));
  $(rating).text(`${rawData[0].rating} ⭐`);
  $(price).text(rawData[0].price);
  $(`.custom-card-three`).attr(
    "style",
    `background-image: url(${rawData[0].image_url}); background-size: cover;`
  );
  $("#3rr").text("");
  $(ratingOne).text("");
  $(ratingTwo).text("");
  $(ratingThree).text("");
}

function historyPick2() {
  resultsPageEl.addClass("hidden");
  learnMorePageEl.removeClass("hidden");
  $(learnMoreName).text(rawData[1].name);
  $(address).text(rawData[1].location.display_address.join(","));
  $(rating).text(`${rawData[1].rating} ⭐`);
  $(price).text(rawData[1].price);
  $(`.custom-card-three`).attr(
    "style",
    `background-image: url(${rawData[1].image_url}); background-size: cover;`
  );
  $("#3rr").text("");
  $(ratingOne).text("");
  $(ratingTwo).text("");
  $(ratingThree).text("");
}

function historyPick3() {
  resultsPageEl.addClass("hidden");
  learnMorePageEl.removeClass("hidden");
  $(learnMoreName).text(rawData[2].name);
  $(address).text(rawData[2].location.display_address.join(","));
  $(rating).text(`${rawData[2].rating} ⭐`);
  $(price).text(rawData[2].price);
  $(`.custom-card-three`).attr(
    "style",
    `background-image: url(${rawData[2].image_url}); background-size: cover;`
  );
  $("#3rr").text("");
  $(ratingOne).text("");
  $(ratingTwo).text("");
  $(ratingThree).text("");
}

function historyPick4() {
  resultsPageEl.addClass("hidden");
  learnMorePageEl.removeClass("hidden");
  $(learnMoreName).text(rawData[3].name);
  $(address).text(rawData[3].location.display_address.join(","));
  $(rating).text(`${rawData[3].rating} ⭐`);
  $(price).text(rawData[3].price);
  $(`.custom-card-three`).attr(
    "style",
    `background-image: url(${rawData[3].image_url}); background-size: cover;`
  );
  $("#3rr").text("");
  $(ratingOne).text("");
  $(ratingTwo).text("");
  $(ratingThree).text("");
}

function clearRoute() {
  $("#map").remove();
  routeActive = false;
}

function initializeMap() {
  if (!routeActive) {
    startLocation = $(startAddress).val();
    endLocation = $(restAddress).val();

    var routeUrl = `https://www.mapquestapi.com/directions/v2/route?key=4JE8n3QyoprYfpwIHorXiugDcOsYQNLv&from=${startLocation}&to=${endLocation}&outFormat=json&ambiguities=ignore&routeType=fastest&doReverseGeocode=false&enhancedNarrative=false&avoidTimedConditions=false`;

    fetch(routeUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.info.statuscode !== 402) {
          routeActive = true;
          var createMapEl = $("<div>");
          createMapEl.attr({
            id: "map",
            style: "width: 900px; height: 530px;",
          });
          $("#map-container").append(createMapEl);
          console.log(data);
          map = L.mapquest.map("map", {
            center: [39.368279, -98.964844],
            layers: L.mapquest.tileLayer("map"),
            zoom: 4,
          });
          map.addControl(L.mapquest.control());
          directions = L.mapquest.directions();
          directions.route({
            start: startLocation,
            end: endLocation,
          });
        } else {
          $(inputAlert3).removeClass("hidden");
        }
      });
  }
}

$(resultBtn).on("click", toResultPage);
$(closeAlertbtn).on("click", closeAlert);
$(document).on("click", ".continue-btn-lm", toLearnMorePage);
$(document).on("click", ".three-get-dir", toMapsPageFromLearnMore);
$(resultGoBackBtn).on("click", BacktoHome);
$(learnMoreBackBtn).on("click", backToResults);
$(mapBackBtn).on("click", MapstoResults);
$(document).on("click", "#history-btn0", historyPick1);
$(document).on("click", "#history-btn1", historyPick2);
$(document).on("click", "#history-btn2", historyPick3);
$(document).on("click", "#history-btn3", historyPick4);
$("#pm-1").on("click", toMapsPageFromResults1);
$("#pm-2").on("click", toMapsPageFromResults2);
$("#pm-3").on("click", toMapsPageFromResults3);
$("#pm-4").on("click", toMapsPageFromResults4);
$("#show-route-btn").on("click", initializeMap);
$("#clear-route-btn").on("click", clearRoute);
