'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  fetch('/fortune')
    .then((response) => response.text())
    .then((fortuneData) => {
      document.querySelector('#fortune-text').innerHTML = fortuneData;
    });
}

document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  // const url = '/weather.json';
  const zipcode = document.querySelector('#zipcode-field').value;
  const url = `/weather.json?${zipcode}`;

  fetch(url)
    .then((response) => response.json())
    .then((forecastData) => {
      let forecast = forecastData['forecast']
      document.querySelector('#weather-info').innerText = forecast;
    });
}

document.querySelector('#weather-form').addEventListener('submit', showWeather);

// PART 3: ORDER MELONS

function checkOrderError(orderCode, orderStatusDiv) {
  if (orderCode === 'ERROR') {
    orderStatusDiv.classList.add("order-error");
  } else {
    orderStatusDiv.classList.remove("order-error");
  }
};


function orderMelons(evt) {
  evt.preventDefault();

  const formInputs = {
    qty: document.querySelector('#qty-field').value,
    melon_type: document.querySelector('#melon-type-field').value,
  };

  fetch('order-melons.json', {
    method: 'POST',
    body: JSON.stringify(formInputs),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((orderStatus) => {
      let orderCode = orderStatus['code'];
      let orderStatusDiv = document.querySelector('#order-status');
      orderStatusDiv.innerText = orderStatus['msg'];
      checkOrderError(orderCode, orderStatusDiv);
      // if (orderCode === 'ERROR') {
      //   orderStatusDiv.classList.add("order-error")
      // } else {
      //   orderStatusDiv.classList.remove("order-error")
      // }
    }
    )
};


document.querySelector('#order-form').addEventListener('submit', orderMelons);


const button = document.querySelector('#get-dog-image');
const DOG_URL = 'https://dog.ceo/api/breeds/image/random';

button.addEventListener('click', () => {

  fetch(DOG_URL)
    .then((response) => response.json())
    .then((dogImageData) => {
      const dogImage = dogImageData['message'];

      document.querySelector('#dog-photo').innerHTML = `<img src=${dogImage}>`;
    });
});
