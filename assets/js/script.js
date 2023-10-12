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

// var pick1 = $("#pick1");
// var pick2 = $("#pick2");
// var pick3 = $("#pick3");
// var pick4 = $("#pick4");

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

var cb1 = $('#cb1');
var cb2 = $('#cb2');
var cb3 = $('#cb3');
var cb4 = $('#cb4');
// console.log(cb1);
// var checkboxes = document.querySelectorAll('input[name="cb"]:checked');

var priceRange = ""

$(cb1).change(function() {
 if ($(this).is(":checked")) {
  priceRange += "1,"
  console.log(priceRange)
 } else {
  priceRange = priceRange.replace(/1,/g, "")
 } 
});

$(cb2).change(function() {
  if ($(this).is(":checked")) {
   priceRange += "2,"
   console.log(priceRange)
  } else {
   priceRange = priceRange.replace(/2,/g, "")
  } 
 });

 $(cb3).change(function() {
  if ($(this).is(":checked")) {
   priceRange += "3,"
   console.log(priceRange)
  } else {
   priceRange = priceRange.replace(/3,/g, "")
  } 
 });

 $(cb4).change(function() {
  if ($(this).is(":checked")) {
   priceRange += "4"
   console.log(priceRange)
  } else {
   priceRange = priceRange.replace(/4/g, "")
  } 
 });
  
  // if (cb1.checked) {
  //   // console.log(true)
  //   priceRange += "1,"
  // } 
  
  // if (cb2.checked) {
  //   priceRange += "2,"
  // }

  // if (cb3.checked) {
  //   priceRange += "3,"
  // }

  // if (cb4.checked) {
  //   priceRange += "4"
  // }

  // console.log(priceRange);

var options = {
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer cpIZVMVOeEQWNK3YQtqsptY8MgVpErO4syU6mpNzUmDE26gJwG34Z6GVQHXpl-mg_v0ZneUmCS3qtJPVNB6n9r-lXzl9CsVAtIgyiqW-Wkb5z9ZAQRtrrq_qE_khZXYx",
  },
};

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
    homePageEl.addClass("hidden");
    resultsPageEl.removeClass("hidden");
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

//   var priceRange = [];

// checkboxes.forEach((checkbox) => {
//   priceRange.push(checkbox.value);
// }); console.log(priceRange);


  var searchUrl = `https://corsproxy.io/?https://api.yelp.com/v3/businesses/search?location=${userAddress}&term=${userFood}&radius=${
    userRadius * 1609
  }&limit=4&price=${priceRange}`;

  fetch(searchUrl, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
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
        // $(`#result-img${i}`).attr("src", (data.businesses[i].image_url));
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
        $(address).text(data.businesses[0].location.display_address.join(","));
        $(rating).text(`${data.businesses[0].rating} ⭐`);
        $(price).text(data.businesses[0].price);
        $(`.custom-card-three`).attr(
          "style",
          `background-image: url(${data.businesses[0].image_url}); background-size: cover;`
        );
      });
      $(lmReview2).on("click", function () {
        reviewUrl = `https://corsproxy.io/?https://api.yelp.com/v3/businesses/${businessesId2}/reviews?sort_by=newest`;
        fetchReviews();
        $(address).text(data.businesses[1].location.display_address.join(","));
        $(rating).text(`${data.businesses[1].rating} ⭐`);
        $(price).text(data.businesses[1].price);
        $(`.custom-card-three`).attr(
          "style",
          `background-image: url(${data.businesses[1].image_url}); background-size: cover;`
        );
      });
      $(lmReview3).on("click", function () {
        reviewUrl = `https://corsproxy.io/?https://api.yelp.com/v3/businesses/${businessesId3}/reviews?sort_by=newest`;
        fetchReviews();
        $(address).text(data.businesses[2].location.display_address.join(","));
        $(rating).text(`${data.businesses[2].rating} ⭐`);
        $(price).text(data.businesses[2].price);
        $(`.custom-card-three`).attr(
          "style",
          `background-image: url(${data.businesses[2].image_url}); background-size: cover;`
        );
      });
      $(lmReview4).on("click", function () {
        reviewUrl = `https://corsproxy.io/?https://api.yelp.com/v3/businesses/${businessesId4}/reviews?sort_by=newest`;
        fetchReviews();
        $(address).text(data.businesses[3].location.display_address.join(","));
        $(rating).text(`${data.businesses[3].rating} ⭐`);
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
    });
}

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
