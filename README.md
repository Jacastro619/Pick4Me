# Pick4Me

![Screenshot of the applicaiton](./assets/images/README-Screenshot.png)

## Technology Used

| Technology Used     |                                                           Resource URL                                                           |
| ------------------- | :------------------------------------------------------------------------------------------------------------------------------: |
| HTML                |              [https://developer.mozilla.org/en-US/docs/Web/HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)              |
| CSS                 |               [https://developer.mozilla.org/en-US/docs/Web/CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)               |
| JavaScript          |        [https://developer.mozilla.org/en-US/docs/Web/JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)        |
| Bulma CSS Framework |                                [https://bulma.io/documentation/](https://bulma.io/documentation/)                                |
| jQuery              |                                        [https://api.jquery.com/](https://api.jquery.com/)                                        |
| Yelp API            |                               [https://docs.developer.yelp.com/](https://docs.developer.yelp.com/)                               |
| Mapquest API        |                   [https://developer.mapquest.com/documentation](https://developer.mapquest.com/documentation)                   |
| Mapquest.js SDK     | [https://developer.mapquest.com/documentation/mapquest-js/v1.3/](https://developer.mapquest.com/documentation/mapquest-js/v1.3/) |
| Git                 |                                           [https://git-scm.com/](https://git-scm.com/)                                           |

## Description

[Visit the Deployed Site](https://jacastro619.github.io/Pick4Me/)

Introducing our restaurant discovery app Pick4Me! This your one-stop solution for finding the perfect dining experience. With this app, you can input an address, set the desired radius, and specify the type of cuisine you're craving. The app then performs a real-time search, curating a list of four restaurants that match your criteria. Each result provides key information at a glance, but the magic happens when you click on the "Learn More" button. This gives you access to in-depth details about the restaurant, including recent ratings, address, and price. And if you've found the place you want to try, simply hit the "Pick Me!" button, and you will be directed to the direction page where you enter your starting address. This will provide you a route from your current location or any address you choose. Enjoy the convenience of finding your new favorite dining spot and getting there hassle-free with our restaurant discovery app!

## Usage

**Home Page Input**: When the app initially loads you will be met with our input form (image 1a.) where you will enter the requested information (address, max radius, and food catagory). Once the information is filled out simply click on "Show me the Results" and you will be directed to the next page with the results.

![Screenshot of home page form](./assets/images/Home%20Page%20Input%20screenshot.JPG)

---

**Result Cards**: Once you've been directed from the home page, you will see a series of result cards (image 1b.) with the top being the 1st pick. On the result card you will see the number pick and the name of the restaurant. On the bottom right, you will also see two buttons "Learn More" and "Pick Me". Click on "Learn More" to be directed to the Learn more page where you will see more details about the restaurant. If you wish to go directly to the directions page to get a route from your a location of your choice, you may click on "Pick Me" where you can get a route to the restaurant.

![Screenshot of result cards](./assets/images/Result%20card%20screenshot.JPG)

## Highlighted Features

**Restaurant Review Search**

This application utilizes the Yelp API to get the best local content and user reviews.  The Yelp API allowed us to filter the searches and retrieve the business name, address, price, star rating, and the most recent star ratings.

![Screenshot of Review Page](./assets/images/Feature-Review%20screenshot.png)

**Interactive Map:**

This application utilizes MapQuest API and intergrates with Leaflet.js. 

MapQuest.js allows for interative maps, geocoding, directions and traffic. This allowed us to create a custom Route Page which displays to the user, a general route to take.

![Screenshot of MapQuest interative map](./assets/images/Feature-Map%20screenshot.png)


**1st Pick History:**
 
 This application utilizes the users local Storage to save the 1st pick shown for each search initiated. It also does not duplicate a 1st pick result.  This allows the user to quickly select a previous search that was more fitting.
 
 ![Screenshot of History buttons](./assets/images/Feature-History%20screenshot.png)

 We used JavaScript to pull the  information from local storage and create the History display.

 ![Screenshot of History saved to Local storage](./assets/images/Feature-LocalStorage%20screenshot.png)


## Learning Points

## Authors Info
Jorge Castro
- [Portfolio](https://jacastro619.github.io/my-portfolio/)
- [LinkedIn](https://www.linkedin.com/in/jorge-castro-2a9545177/)
- [GitHub](https://github.com/Jacastro619)

Andy Zurek
- [Portfolio](https://azurek17.github.io/zurek-portfolio/)
- [LinkedIn](https://www.linkedin.com/in/andy-zurek-374bb9291/)
- [GitHub](https://github.com/AZurek17)

Ezekiel Jamolin
- [Portfolio](https://ezekiel186.github.io/portfolio/)
- [LinkedIn](https://www.linkedin.com/in/ezekiel-jamolin-747150291/)
- [GitHub](https://github.com/Ezekiel186)