"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////

const constructComponent = (countryName) => {
	const request = fetch(`https://restcountries.com/v3.1/name/${countryName}`);

	request
		.then((response) => {
			return response.json();
		})
		.then((responseJSON) => {
			const [data] = responseJSON;
			console.log(data);

			const currencyName = Object.keys(data.currencies)[0];
			const languageNameKey = Object.keys(data.languages)[0];

			const languageName = data.languages[`${languageNameKey}`];

			// console.log(languageName);

			const html = `<article class="country">
		                  <img class="country__img" src="${data.flags.svg}" />
		                  <div class="country__data">
		                    <h3 class="country__name">${data.name.official}</h3>
		                    <h4 class="country__region">${data.region}</h4>
		                    <p class="country__row"><span>👫</span>${(
								data.population / 1000000
							).toFixed(1)}m</p>
		                    <p class="country__row"><span>🗣️</span> ${languageName}</p>
		                    <p class="country__row"><span>💰</span>${currencyName}</p>
		                  </div>
		                </article>`;
			countriesContainer.insertAdjacentHTML("beforeend", html);
			countriesContainer.style.opacity = 1;
		})
		.catch((err) => {
			console.error("custome err" + err);
		});
};

constructComponent("portugal");
constructComponent("usa");
constructComponent("pakistan");
