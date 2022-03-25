const getCountriesListUrl = "https://restcountries.com/v3.1/all",
	getCountryByName = "https://restcountries.com/v3.1/name/",
	countryList = $(".countries .country-list"),
	searchBar = document.querySelector("#country-search"),
	modal = document.querySelector(".modal");

$(document).ready(function () {
	$.ajax({
		url: getCountriesListUrl,
		method: "get",
		success: function (data) {
			// console.log(data);
			if (data) {
				data.forEach((item) => {
					createCountryBlock(item);
				});
				addListener();
				searchCountry();
			} else {
				console.log("error");
			}
		},
		error: function (error) {
			console.log(error);
		},
	});
});
import { scrollToTop } from "./modules.js";
scrollToTop();
function createCountryBlock(item) {
	const countryItem = document.createElement("div");
	countryItem.classList.add("country-item");
	countryItem.innerHTML = `
    <div class="flex-center-center">
			<a class="item-page-link" data-id="${item.name.official}" href="" target="_blank">
      	<img src="${item.flags.png}" alt="${item.name.official}">
			</a>
    </div>
    
    <h5>${item.name.official}</h5>
  `;
	countryList.append(countryItem);
}

function addListener() {
	const mainPageLinks = document.querySelectorAll(".country-item a");
	mainPageLinks.forEach((aTag) => {
		aTag.addEventListener("click", (e) => {
			e.preventDefault();
			let countryName = aTag.dataset.id;
			// console.log(`${getCountryByName + countryName}`);
			$.ajax({
				url: `${getCountryByName + countryName}`,
				method: "get",
				success: function (data) {
					// console.log(data);
					if (data) {
						addModal(data[0]);
					} else {
						console.log("error");
					}
				},
				error: function (error) {
					console.log(error);
				},
			});
		});
	});
}

function searchCountry() {
	searchBar.addEventListener("keyup", (e) => {
		const searchString = e.target.value.toUpperCase();

		let li = [...document.querySelectorAll(".country-item")];

		for (let i = 0; i < li.length; i++) {
			let a = li[i].getElementsByTagName("h5")[0];
			let txtValue = a.textContent || a.innerText;
			if (txtValue.toUpperCase().indexOf(searchString) > -1) {
				li[i].style.display = "";
			} else {
				li[i].style.display = "none";
			}
		}
	});
}

function addModal(item) {
	modal.classList.add("active");
	const area = modal.querySelector(".area"),
		capital = modal.querySelector(".capital"),
		population = modal.querySelector(".population"),
		flag = modal.querySelector(".flag"),
		coatOfArms = modal.querySelector(".coat-of-arms"),
		region = modal.querySelector(".region"),
		continents = modal.querySelector(".continents"),
		language = modal.querySelector(".language"),
		countryName = modal.querySelector(".country-name h3"),
		timeZones = modal.querySelector(".time-zones"),
		currency = modal.querySelector(".currency"),
		map = modal.querySelector(".map iframe");

	(area.textContent = item.area),
		(capital.textContent = item.capital),
		(population.textContent = item.population),
		(region.textContent = item.region),
		(countryName.textContent = item.name.official),
		(continents.textContent = Object.values(item.continents)),
		(language.textContent = Object.values(item.languages)),
		(timeZones.textContent = Object.values(item.timezones)),
		(currency.textContent = Object.keys(item.currencies)),
		(flag.src = item.flags.png),
		(coatOfArms.src = item.coatOfArms.png),
		(map.textContent = item.name.official + "'s map link"),
		(map.src = `https://maps.google.com/maps?q=${item.latlng[0]},${item.latlng[1]}&hl=en&z=14&output=embed`);
}

document.querySelector(".close").addEventListener("click", () => {
	document.querySelector(".close").closest(".modal").classList.remove("active");
});
