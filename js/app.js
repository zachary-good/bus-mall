'use strict';

let rounds = 25;
let centerProduct = null;
let rightProduct = null;
let leftProduct = null;


const leftProductImgElem = document.getElementById('leftProductImg');
const leftProductPElem = document.getElementById('leftProductP');
const centerProductImgElem = document.getElementById('centerProductImg');
const centerProductPElem = document.getElementById('centerProductP');
const rightProductImgElem = document.getElementById('rightProductImg');
const rightProductPElem = document.getElementById('rightProductP');
const allProductsSectionElem = document.getElementById('allProducts');
const resultsElem = document.getElementById('resultsElem');
const buttonElem = document.getElementById('buttonElem');


function Product(name, image, timesShown = 0, votes = 0){
  this.name = name;
  this.image = image;
  this.timesShown = timesShown;
  this.votes = votes;
}


Product.allProducts = [];


Product.prototype.renderSingleProduct = function(img, p){
  img.src = this.image;
  p.textContent = this.name;
  this.timesShown++;
}



function randomProducts(){
const unavailableProducts = [leftProduct, rightProduct, centerProduct];

  while(unavailableProducts.includes(leftProduct)){
  let leftIndex = Math.floor(Math.random() * Product.allProducts.length);
  leftProduct = Product.allProducts[leftIndex];
  }

  unavailableProducts.push(leftProduct);
  //let rightIndex;

  while(unavailableProducts.includes(rightProduct)){
    let rightIndex = Math.floor(Math.random() * Product.allProducts.length);
    rightProduct = Product.allProducts[rightIndex];
  }
  
  unavailableProducts.push(rightProduct);
  //let centerIndex;

  while(unavailableProducts.includes(centerProduct)){
    let centerIndex = Math.floor(Math.random() * Product.allProducts.length);
    centerProduct = Product.allProducts[centerIndex];
  }

  

  renderThreeProducts(leftProduct, centerProduct, rightProduct);
}


function renderThreeProducts(leftProduct, centerProduct, rightProduct){
  leftProduct.renderSingleProduct(leftProductImgElem, leftProductPElem);
  centerProduct.renderSingleProduct(centerProductImgElem, centerProductPElem);
  rightProduct.renderSingleProduct(rightProductImgElem, rightProductPElem);
}


function clickHandler(event){
  console.log(event.target);

  if(event.target === leftProductImgElem || event.target === centerProductImgElem || event.target === rightProductImgElem){
    rounds--;

    if(event.target === leftProductImgElem){
      leftProduct.votes++;
    }
    if(event.target === centerProductImgElem){
      centerProduct.votes++;
    }
    if(event.target === rightProductImgElem){
      rightProduct.votes++;
    }
    if(rounds === 0){
      allProductsSectionElem.removeEventListener('click', clickHandler);
      alert('Survey complete! Thank you!')
      return;
      //here is where I think we should add a button 'view results' to display the results. 
      //it should be a function that displays the button after the rounds have reached zero.
      //it will add an event listener for the clicking of the button
      //the even listener function will call render results.
      
    }
    randomProducts();
  }
}

function resultsClickHandler(event){
  if(event.target === buttonElem && rounds === 0){
    renderResults();
  }
  
  else{
    alert('Please finish the survey!');
  }
}

function renderResults(){
  const ulElem = document.getElementById('productClicks');
  ulElem.innerHTML = '';

  for(let product of Product.allProducts){
    const liElem = document.createElement('li');
    liElem.textContent = `${product.name} had ${product.votes} votes, and was seen ${product.timesShown} times.`;
    ulElem.appendChild(liElem);
  }
  renderChart();
  storeProducts();
}

function renderChart(){
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ['Bag', 'Banana', 'Bathroom', 'Boots', 'Breakfast', 'Bubblegum','Chair','Cthulhu','Dog-duck','Dragon','Pen','Pet-sweep','Scissors','Shark','Sweep','Tauntaun','Unicorn','Water-can','Wine-glass'],
          datasets: [{
              label: '# of Votes',
              data: [Product.allProducts[0].votes,Product.allProducts[1].votes,Product.allProducts[2].votes,Product.allProducts[3].votes,Product.allProducts[4].votes,Product.allProducts[5].votes,Product.allProducts[6].votes,Product.allProducts[7].votes,Product.allProducts[8].votes,Product.allProducts[9].votes,Product.allProducts[10].votes,Product.allProducts[11].votes,Product.allProducts[12].votes,Product.allProducts[13].votes,Product.allProducts[14].votes,Product.allProducts[15].votes,Product.allProducts[16].votes,Product.allProducts[17].votes,Product.allProducts[18].votes],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
}

function getProductsFromStorage(){
  const stringifiedProducts = localStorage.getItem('products');
  if(stringifiedProducts){
    const parsedProducts = JSON.parse(stringifiedProducts);
    console.log(parsedProducts);
    for(let product of parsedProducts){
      const myProduct = new Product(product.name, product.image, product.timesShown, product.votes);
      Product.allProducts.push(myProduct);
    }
  }
  
}

function storeProducts(){
  const stringifiedProducts = JSON.stringify(Product.allProducts);
  localStorage.setItem('products', stringifiedProducts)
}

allProductsSectionElem.addEventListener('click', clickHandler);
resultsElem.addEventListener('click', resultsClickHandler)


if(localStorage.getItem('products')){
  getProductsFromStorage();
}
else{
Product.allProducts.push(new Product('Bag', './img/bag.jpg'));
Product.allProducts.push(new Product('Banana', './img/banana.jpg'));
Product.allProducts.push(new Product('Bathroom', './img/bathroom.jpg'));
Product.allProducts.push(new Product('Boots', './img/boots.jpg'));
Product.allProducts.push(new Product('Breakfast', './img/breakfast.jpg'));
Product.allProducts.push(new Product('Bubblegum', './img/bubblegum.jpg'));
Product.allProducts.push(new Product('Chair', './img/chair.jpg'));
Product.allProducts.push(new Product('Cthulhu', './img/cthulhu.jpg'));
Product.allProducts.push(new Product('Dog-duck', './img/dog-duck.jpg'));
Product.allProducts.push(new Product('Dragon', './img/dragon.jpg'));
Product.allProducts.push(new Product('Pen', './img/pen.jpg'));
Product.allProducts.push(new Product('Pet-sweep', './img/pet-sweep.jpg'));
Product.allProducts.push(new Product('Scissors', './img/scissors.jpg'));
Product.allProducts.push(new Product('Shark', './img/shark.jpg'));
Product.allProducts.push(new Product('Sweep', './img/sweep.png'));
Product.allProducts.push(new Product('Tauntaun', './img/tauntaun.jpg'));
Product.allProducts.push(new Product('Unicorn', './img/unicorn.jpg'));
Product.allProducts.push(new Product('Water-can', './img/water-can.jpg'));
Product.allProducts.push(new Product('Wine-glass', './img/wine-glass.jpg'));
}

randomProducts();