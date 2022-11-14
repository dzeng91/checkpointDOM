/* eslint-disable no-alert */

/**************
 *   SLICE 1
 **************/

function updateCoffeeView(coffeeQty) {
  let coffeeCounter = document.querySelector("#coffee_counter")
  coffeeCounter.innerText = coffeeQty
}


function clickCoffee(data) {
  let coffeeCounter = document.querySelector("#coffee_counter")
  data.coffee++;
  coffeeCounter.innerText = data.coffee;
}

/**************
 *   SLICE 2
 **************/

function unlockProducers(producers, coffeeCount) {
  for (let producer of producers) {
    if (coffeeCount >= (producer.price)/2) {
      producer.unlocked = true
    }
  }
}

function getUnlockedProducers(data) {
  let results = []
  for (let p of data.producers) {
    if (p.unlocked === true) {
      results.push(p)
    }
  }
  return results
}

function makeDisplayNameFromId(id) {
  id = id.replace(/_/g, " ");
  return id.replace(/\w\S*/g, function(txt){
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  })
}

// You shouldn't need to edit this function-- its tests should pass once you've written makeDisplayNameFromId
function makeProducerDiv(producer) {
  const containerDiv = document.createElement('div');
  containerDiv.className = 'producer';
  const displayName = makeDisplayNameFromId(producer.id);
  const currentCost = producer.price;
  const html = `
  <div class="producer-column">
    <div class="producer-title">${displayName}</div>
    <button type="button" id="buy_${producer.id}">Buy</button>
  </div>
  <div class="producer-column">
    <div>Quantity: ${producer.qty}</div>
    <div>Coffee/second: ${producer.cps}</div>
    <div>Cost: ${currentCost} coffee</div>
  </div>
  `;
  containerDiv.innerHTML = html;
  return containerDiv;
}

function deleteAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function renderProducers(data) {
  // your code here
  let producerContainer = document.querySelector("#producer_container")
  for (const producer of data.producers){
    producerContainer.append(makeProducerDiv(producer))
  unlockProducers(data.producers,data.coffee)
  }
  if (unlockProducers(data.producers,data.coffee) == true) {
    producerContainer.append(makeProducerDiv(producer))
  }
}

/**************
 *   SLICE 3
 **************/

function getProducerById(data, producerId) {
  // your code here
  return data.producers.find(producer => producerId === producer.id);
}

function canAffordProducer(data, producerId) {
  // your code here
  if (data.coffee >= getProducerById(data, producerId).price) {
    return true
  }
  else return false
}

function updateCPSView(cps) {
  // your code here
  let cpsIndicator = document.querySelector("#cps")
  cpsIndicator.innerText = cps
}

function updatePrice(oldPrice) {
  // your code here
  return Math.floor(oldPrice * 1.25)
}

function attemptToBuyProducer(data, producerId) {
  if (canAffordProducer(data, producerId)) {
    const producer = getProducerById(data, producerId);
    producer.qty = producer.qty + 1;
    data.coffee = data.coffee - producer.price;
    producer.price = updatePrice(producer.price);
    data.totalCPS = producer.cps - data.totalCPS;
    return true;
  } else return false;
}


function buyButtonClick(event, data) {
  // your code here
  
}

function tick(data) {
  // your code here
}

/*************************
 *  Start your engines!
 *************************/

// You don't need to edit any of the code below
// But it is worth reading so you know what it does!

// So far we've just defined some functions; we haven't actually
// called any of them. Now it's time to get things moving.

// We'll begin with a check to see if we're in a web browser; if we're just running this code in node for purposes of testing, we don't want to 'start the engines'.

// How does this check work? Node gives us access to a global variable /// called `process`, but this variable is undefined in the browser. So,
// we can see if we're in node by checking to see if `process` exists.
if (typeof process === 'undefined') {
  // Get starting data from the window object
  // (This comes from data.js)
  const data = window.data;

  // Add an event listener to the giant coffee emoji
  const bigCoffee = document.getElementById('big_coffee');
  bigCoffee.addEventListener('click', () => clickCoffee(data));

  // Add an event listener to the container that holds all of the producers
  // Pass in the browser event and our data object to the event listener
  const producerContainer = document.getElementById('producer_container');
  producerContainer.addEventListener('click', event => {
    buyButtonClick(event, data);
  });

  // Call the tick function passing in the data object once per second
  setInterval(() => tick(data), 1000);
}
// Meanwhile, if we aren't in a browser and are instead in node
// we'll need to exports the code written here so we can import and
// Don't worry if it's not clear exactly what's going on here;
// We just need this to run the tests in Mocha.
else if (process) {
  module.exports = {
    updateCoffeeView,
    clickCoffee,
    unlockProducers,
    getUnlockedProducers,
    makeDisplayNameFromId,
    makeProducerDiv,
    deleteAllChildNodes,
    renderProducers,
    updateCPSView,
    getProducerById,
    canAffordProducer,
    updatePrice,
    attemptToBuyProducer,
    // buyButtonClick,
    // tick
  };
}
