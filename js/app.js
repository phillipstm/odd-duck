/* eslint-disable no-unused-vars */
/*
  FILE: oddDuck.js
  DATE: 2022-07-05
  AUTHOR: Code Fellows
  DESCRIPTOION: handle the clicking of products.
*/
'use strict';

/* ****************************************************************************
    GLOBAL VARIABLES
**************************************************************************** */
let productsContainer; // HTML element for products
let resultButton; // a button to show results
let image1; // an image element
let image2; // an image element
let image3; // an image element
let allProductsArray; // an array of product objects
let clicks = 0; // the number of user clicks
let maxClicksAllowed = 25; // the maximum number of clicks
let previousSet = []; //the last product images displayed

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
  console.log('In render()');
  // Get three random products
  let currentSet = [];
  for (let i = 0; i < 3; i++) {
    let index = getRandomProductsIndex();
    while (previousSet.includes(index) || currentSet.includes(index)) {
      index = getRandomProductsIndex();
    }
    currentSet.push(index);
  }
  previousSet = currentSet;
  // let product1 = getRandomProductsIndex();
  // let product2 = getRandomProductsIndex();
  // let product3 = getRandomProductsIndex();
  // // Make sure they are not the same product
  // while (product1 === product2 || product1 === product3) {
  //   product1 = getRandomProductsIndex();
  // }
  // while (product1 === product2 || product2 === product3) {
  //   product1 = getRandomProductsIndex();
  // }
  // Set the image values
  image1.src = allProductsArray[currentSet[0]].src;
  image1.alt = allProductsArray[currentSet[0]].name;
  image2.src = allProductsArray[currentSet[1]].src;
  image2.alt = allProductsArray[currentSet[1]].name;
  image3.src = allProductsArray[currentSet[2]].src;
  image3.alt = allProductsArray[currentSet[2]].name;
  //find previous product set array




  // increment the view counts
  allProductsArray[currentSet[0]].views++;
  allProductsArray[currentSet[1]].views++;
  allProductsArray[currentSet[2]].views++;
  /// update the local storage
  localStorage.setItem('products', JSON.stringify({ 'data': allProductsArray }));
}


/**
 * Display the results of all the clicking.
 */
// function renderResults() {
//   console.log('In renderResults()');
//   let ul = document.querySelector('ul');
//   for (let i = 0; i < allProductsArray.length; i++) {
//     let product = allProductsArray[i];
//     let li = document.createElement('li');
//     li.textContent = `${product.name} had ${product.views} views and was clicked ${product.clicks} times.`;
//     ul.appendChild(li);
//   }
// }


/**
 * Draw a chart with the product data.
 */
function renderChart() {
  console.log('In Render Chart');
  /**
 * Draw a chart with the product data.
 */
  let productName = [];
  let productViews = [];
  let productClicks = [];
  for (let i = 0; i < allProductsArray.length; i++) {
    productName.push(allProductsArray[i].name);
    productViews.push(allProductsArray[i].views);
    productClicks.push(allProductsArray[i].clicks);
  }

  /**
 * Draw a chart with the product data.
 */
  const data = {
    labels: productName,
    datasets: [
      {
        label: 'Likes',
        data: productClicks,
        backgroundColor: ['rgba(0,0,255,0.3)'],
        borderColor: ['rgb(255,99,132)'],
        borderWidth: 1,
      },
      {
        label: 'Views',
        data: productViews,
        backgroundColor: ['rgba(255,159,64,0.2)'],
        borderColor: ['rgb(255,159,64)'],
        borderWidth: 1,
      },
    ],
  };
  // configure the graph
  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  // Get a reference to the Canvas element
  let canvasChart = document.getElementById('myChart');
  // Draw the chart
  // eslint-disable-next-line no-undef
  const myChart = new Chart(canvasChart, config);
}

/* ****************************************************************************
    CONTROL LOGIC
**************************************************************************** */

/**
 * Initialize the global variables, set up needed event handlers, and
 * perform the initial render.
 */

function initialize() {
  console.log('In initialize()');
  // Get initiall references to HTML elements
  productsContainer = document.querySelector('section');
  // resultButton = document.getElementById('viewResultsDiv');
  image1 = document.querySelector('section img:first-child');
  image2 = document.querySelector('section img:nth-child(2)');
  image3 = document.querySelector('section img:nth-child(3)');
  // instantiate products
  let result = localStorage.getItem('products');
  if (result === null) {

    allProductsArray = [];
    allProductsArray.push(new Product('Bag', './images/bag.jpg'));
    allProductsArray.push(new Product('Banana', './images/banana.jpg'));
    allProductsArray.push(new Product('Bathroom', './images/bathroom.jpg'));
    allProductsArray.push(new Product('Boots', './images/boots.jpg'));
    allProductsArray.push(new Product('Breakfast', './images/breakfast.jpg'));
    allProductsArray.push(new Product('Bubblegum', './images/bubblegum.jpg'));
    allProductsArray.push(new Product('Chair', './images/chair.jpg'));
    allProductsArray.push(new Product('Cthulhu', './images/cthulhu.jpg'));
    allProductsArray.push(new Product('Dog-duck', './images/dog-duck.jpg'));
    allProductsArray.push(new Product('Dragon', './images/dragon.jpg'));
    allProductsArray.push(new Product('Pen', './images/pen.jpg'));
    allProductsArray.push(new Product('Pet-sweep', './images/pet-sweep.jpg'));
    allProductsArray.push(new Product('Scissors', './images/scissors.jpg'));
    allProductsArray.push(new Product('Shark', './images/shark.jpg'));
    allProductsArray.push(new Product('Sweep', './images/sweep.png'));
    allProductsArray.push(new Product('Tauntaun', './images/tauntaun.jpg'));
    allProductsArray.push(new Product('Unicorn', './images/unicorn.jpg'));
    allProductsArray.push(new Product('Water-can', './images/water-can.jpg'));
    allProductsArray.push(new Product('Wine-glass', './images/wine-glass.jpg'));
    console.log(JSON.stringify({ 'data': allProductsArray }));
    localStorage.setItem('products', JSON.stringify({ 'data': allProductsArray }));
  } else {
    allProductsArray = JSON.parse(result).data;
  }
  // Set any event handlers
  productsContainer.addEventListener('click', handleProductClick);
  // perform the initial render
  render();

}


/**
* Handles the clicking of a product.
*
* @param {event} evt - the event object
*/
function handleProductClick(evt) {
  console.log(`In handleProductClick() clicks: ${clicks}, maxClicksallowed; ${maxClicksAllowed}`);
  // Test to see if we have clicked an image
  if (evt.target === productsContainer) {
    alert('Please click on an image.');
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
    console.log('Reached Max Clicks');
    // Remove teh event listener
    productsContainer.removeEventListener('click', handleProductClick);
    // Enable the display results button
    // resultButton.addEventListener('click', renderResults);
    // resultButton.className = 'clicks-allowed';
    productsContainer.className = 'no-voting';
    renderChart();
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
