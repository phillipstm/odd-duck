/*
  FILE: oddDuck.js
  DATE: 2022-07-05
  AUTHOR: Code Fellows
  DESCRIPTOION: handle the clicking of products.
*/
"use strict";

/* ****************************************************************************
    GLOBAL VARIABLES
**************************************************************************** */
var productsContainer; // HTML element for products
var resultButton; // a button to show results
var image1; // an image element
var image2; // an image element
var image3; // an image element
var allProductsArray; // an array of product objects
var clicks = 0; // the number of user clicks
var maxClicksAllowed = 25; // the maximum number of clicks


/* ****************************************************************************
    Products OBJECTS (Data/Model Objects)
**************************************************************************** */

/**
 * Constructor for Product objects.
 *
 * @param {string} name - the name of the products
 * @param {string} src - path and file name for an image of the product.
 */
 function Product(name, src) {
  this.name = name;
  this.src = src;
  this.views = 0;
  this.clicks = 0;
}


/* ****************************************************************************
    VIEW LOGIC
**************************************************************************** */


/**
 * Draw three random products on the page.
 */
 function render() {
  console.log(`In render()`);
  // Get two random goats
  let product1 = getRandomProductsIndex();
  let product2 = getRandomProductsIndex();
  let product3 = getRandomProductsIndex();
  // Make sure they are not the same product
  while (product1 === product2 || product1 === product3){
    product1 = getRandomProductsIndex();   
  }
  while (product1 === product2 || product2 === product3){
    product1 = getRandomProductsIndex();
  }
  // Set the image values
  image1.src = allProductsArray[product1].src;
  image1.alt = allProductsArray[product1].name;
  image2.src = allProductsArray[product2].src;
  image2.alt = allProductsArray[product2].name;
  image3.src = allProductsArray[product3].src;
  image3.alt = allProductsArray[product3].name;
  // increment the view counts
  allProductsArray[product1].views++;
  allProductsArray[product2].views++;
  allProductsArray[product3].views++;
}


/**
 * Display the results of all the clicking.
 */
 function renderResults() {
  console.log(`In renderResults()`);
  let ul = document.querySelector("ul");
  for (let i = 0; i < allProductsArray.length; i++) {
    let product = allProductsArray[i];
    let li = document.createElement("li");
    li.textContent = `${product.name} had ${product.views} views and was clicked ${product.clicks} times.`;
    ul.appendChild(li);
  }
}



/* ****************************************************************************
    CONTROL LOGIC
**************************************************************************** */

/**
 * Initialize the global variables, set up needed event handlers, and
 * perform the initial render.
 */

 function initialize() {
  console.log(`In initialize()`);
  // Get initiall references to HTML elements
  productsContainer = document.querySelector("section");
  resultButton = document.querySelector("section + div");
  image1 = document.querySelector("section img:first-child");
  image2 = document.querySelector("section img:nth-child(2)");
  image3 = document.querySelector("section img:nth-child(3)")
  // instantiate products
  allProductsArray = [];
  allProductsArray.push(new Product("Bag", "./images/bag.jpg"));
  allProductsArray.push(new Product("Banana", "./images/banana.jpg"));
  allProductsArray.push(new Product("Bathroom", "./images/bathroom.jpg"));
  allProductsArray.push(new Product("Boots", "./images/boots.jpg"));
  allProductsArray.push(new Product("Breakfast", "./images/breakfast.jpg"));
  allProductsArray.push(new Product("Bubblegum", "./images/bubblegum.jpg"));
  allProductsArray.push(new Product("Chair", "./images/chair.jpg"));
  allProductsArray.push(new Product("Cthulhu", "./images/cthulhu.jpg"));
  allProductsArray.push(new Product("Dog-duck", "./images/dog-duck.jpg"));
  allProductsArray.push(new Product("Dragon", "./images/dragon.jpg"));
  allProductsArray.push(new Product("Pen", "./images/pen.jpg"));
  allProductsArray.push(new Product("Pet-sweep", "./images/pet-sweep.jpg"));
  allProductsArray.push(new Product("Scissors", "./images/scissors.jpg"));
  allProductsArray.push(new Product("Shark", "./images/shark.jpg"));
  allProductsArray.push(new Product("Sweep", "./images/sweep.jpg"));
  allProductsArray.push(new Product("Tauntaun", "./images/tauntaun.jpg"));
  allProductsArray.push(new Product("Unicorn", "./images/unicorn.jpg"));
  allProductsArray.push(new Product("Water-can", "./images/water-can.jpg"));
  allProductsArray.push(new Product("Wine-glass", "./images/wine-glass.jpg"));

  // Set any event handlers
  productsContainer.addEventListener("click", handleProductClick);
  // perform the initial render
  render();

 }


 /**
 * Handles the clicking of a product.
 *
 * @param {event} evt - the event object
 */
  function handleProductClick(evt) {
    console.log(`In handleProductClick()`);
    // Test to see if we have clicked an image
    if (evt.target === productsContainer) {
      alert("Please click on an image.");
    }
    clicks++;
  // We don't know which random product was clicked, so loop through them
  // to see if any match the event target
  let clickProduct = evt.target.alt;
  for (let i = 0; i < allProductsArray.length; i++) {
    if (clickProduct === allProductsArray[i].name) {
      allProductsArray[i].clicks++;
      break;
    }

  }   

  // See if we have made it to the maximum number of clicks
  if (clicks === maxClicksAllowed) {
  // Remove teh event listener
  productsContainer.removeEventListener("click", handleProductClick);
  // Enable the display results button
  resultButton.addEventListener("click", renderResults);
  resultButton.className = "clicks-allowed";
  productsContainer.className = "no-voting";
} else {
  render();
}
}

/**
 * Returns a random index from the allProductsArray
 *
 * @returns {number} - an index from the array
 */
 function getRandomProductsIndex() {
  return Math.floor(Math.random() * allProductsArray.length);
}
