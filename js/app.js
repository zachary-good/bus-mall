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


function Product(name, image){
  this.name = name;
  this.image = image;
  this. timesShown = 0;
  this.votes = 0;
}


Product.allProducts = [];


Product.prototype.renderSingleProduct = function(img, p){
  img.src = this.image;
  p.textContent = this.name;
  this.timesShown++;
}


function randomProducts(){
  let leftIndex = Math.floor(Math.random() * Product.allProducts.length);

  leftProduct = Product.allProducts[leftIndex];

  let rightIndex;

  while(rightIndex === undefined || rightIndex === leftIndex){
    rightIndex = Math.floor(Math.random() * Product.allProducts.length);
  }

  rightProduct = Product.allProducts[rightIndex];

  let centerIndex;

  while(centerIndex === undefined || centerIndex === leftIndex || centerIndex === rightIndex){
    centerIndex = Math.floor(Math.random() * Product.allProducts.length);
  }

  centerProduct = Product.allProducts[centerIndex];

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

      //here is where I think we should add a button 'view results' to display the results. 
      //it should be a function that displays the button after the rounds have reached zero.
      //it will add an event listener for the clicking of the button
      //the even listener function will call render results.
      renderResults();
    }
    randomProducts();
  }
}


function renderResults(){
  const ulElem = document.getElementById('productClicks');
  ulElem.innerHTML = '';

  for(let product of Product.allProducts){
    const liElem = document.createElement('li');
    liElem.textContent = `${product.name}: ${product.votes}`;
    ulElem.appendChild(liElem);
  }
}


allProductsSectionElem.addEventListener('click', clickHandler);


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

randomProducts();