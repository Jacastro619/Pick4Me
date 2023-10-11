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
var closeAlertbtn = $(".close-alert");

function closeAlert() {
  $(inputAlert).addClass("hidden");
}

function displayHomeError(type, message) {
  homeMsg.textContent = message;
  homeMsg.addClass("class", type);
}

function showUserInput() {
  var addressUser = localStorage.getItem("userAddress");
  var radiusUser = localStorage.getItem("userRadius");
  var foodUser = localStorage.getItem("userFood");
  if (!addressUser || !radiusUser || foodUser) {
    return;
  }
}

function handleHomeForm(event) {
  console.log("clicked - Saving home data to local storage");
  //event.preventDefault();

  var userAddress = $('input[name="one-input-address"]').val();
  var userRadius = $('input[name="one-input-radius"]').val();
  var userFood = $('input[name="one-input-food"]').val();

  if (!userAddress || !userRadius || !userFood) {
    inputAlert.removeClass("hidden");
  } else {
    homePageEl.addClass("hidden");
    resultsPageEl.removeClass("hidden");
  }

  localStorage.setItem("userAddress", userAddress);
  localStorage.setItem("userRadius", userRadius);
  localStorage.setItem("UserFood", userFood);
  showUserInput();
}

// var options = {
//   headers: {
//     accept: "application/json",
//     Authorization:
//       "Bearer cpIZVMVOeEQWNK3YQtqsptY8MgVpErO4syU6mpNzUmDE26gJwG34Z6GVQHXpl-mg_v0ZneUmCS3qtJPVNB6n9r-lXzl9CsVAtIgyiqW-Wkb5z9ZAQRtrrq_qE_khZXYx",
//   },
// };

// var searchUrl =
//   "https://corsproxy.io/?https://api.yelp.com/v3/businesses/search?location=93720&term=thia&radius=16000&limit=10";

// fetch(searchUrl, options)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//     console.log(data.businesses[0].name);
//     console.log(
//       `Address: ${data.businesses[0].location.display_address.join(", ")}`
//     );
//     console.log(`Price: ${data.businesses[0].price}`);
//     console.log(`This restaurant has ${data.businesses[0].rating} stars`);

//     var reviewUrl = `https://corsproxy.io/?https://api.yelp.com/v3/businesses/${data.businesses[0].id}/reviews?sort_by=newest`;

//     fetch(reviewUrl, options)
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (data) {
//         console.log(data);
//         console.log("3 most recent star ratings");
//         for (var i = 0; i < data.reviews.length; i++) {
//           var ratingNum = i + 1;
//           console.log(
//             `Rating number ${ratingNum}: ${data.reviews[i].rating} stars by ${data.reviews[i].user.name}`
//           );
//         }
//       });
//   });

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

function toMapsPageFromResults() {
  resultsPageEl.addClass("hidden");
  mapPageEl.removeClass("hidden");

  setTimeout(function () {
    L.mapquest.key = "4JE8n3QyoprYfpwIHorXiugDcOsYQNLv";

    var map = L.mapquest.map("map", {
      center: [39.368279, -98.964844],
      layers: L.mapquest.tileLayer("map"),
      zoom: 4,
    });
  }, 250);
}

function toMapsPageFromLearnMore() {
  learnMorePageEl.addClass("hidden");
  mapPageEl.removeClass("hidden");
  setTimeout(function () {
    L.mapquest.key = "4JE8n3QyoprYfpwIHorXiugDcOsYQNLv";

    var map = L.mapquest.map("map", {
      center: [39.368279, -98.964844],
      layers: L.mapquest.tileLayer("map"),
      zoom: 4,
    });
  }, 250);
}

$(resultBtn).on("click", toResultPage);
$(closeAlertbtn).on("click", closeAlert);
$(document).on("click", ".continue-btn-lm", toLearnMorePage);
$(document).on("click", ".continue-btn-d", toMapsPageFromResults);
$(document).on("click", ".three-get-dir", toMapsPageFromLearnMore);
$(resultGoBackBtn).on("click", BacktoHome);
$(learnMoreBackBtn).on("click", backToResults);
$(mapBackBtn).on("click", MapstoResults);
