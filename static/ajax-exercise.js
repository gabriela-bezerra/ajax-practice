'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  fetch('/fortune')
    .then((response) => response.text())
    .then((fortuneData) => {
      document.querySelector('#fortune-text').innerText = fortuneData;
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
      if (orderCode === 'ERROR') {
        orderStatusDiv.classList.add("order-error")
      }
    });
}
document.querySelector('#order-form').addEventListener('submit', orderMelons);

const button = document.querySelector('#get-dog-image');

button.addEventListener('click', () => {
  const url = 'https://dog.ceo/api/breeds/image/random';

  fetch(url)
    .then((response) => response.json())
    .then((dogImageData) => {
      const dogImage = dogImageData['message'];
      // document.querySelector('#dog-image')
      //   .insertAdjacentHTML('beforeend', `<div><img src=${dogImage}></div>`)
      document.querySelector('#dog-photo').innerHTML = `<img src=${dogImage}>`;
    });
});
