let searchWord = "",
	newsQUrl = "",
	newsHUrl = "",
	selectCountry = "",
	selectCategory = "",
	selectForms = document.querySelectorAll("form.headline-form"),
	qForm = document.querySelector(".word-form"),
	q = document.querySelector("#q"),
	articleList = document.querySelector(".articles__list");

import { createNewsItem, scrollToTop } from "./modules.js";

q.addEventListener("input", () => {
	searchWord = q.value;
});

selectForms.forEach((form) => {
	listenFormSelect(form);
});
scrollToTop();
function listenFormSelect(form) {
	form.addEventListener("change", (e) => {
		q.value = null;
		e.preventDefault();
		if (form.classList.contains("headlines-form-category")) {
			// console.log("category", );
			selectCategory = e.target.value;
			newsHUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${selectCategory}&apiKey=a094f869549b4b41a8fdb313ba2baaf9`;
		}
		if (form.classList.contains("headlines-form-country")) {
			// console.log("country");
			selectCountry = e.target.value;
			newsHUrl = `https://newsapi.org/v2/top-headlines?country=${selectCountry}&apiKey=a094f869549b4b41a8fdb313ba2baaf9`;
		}
		$.ajax({
			url: newsHUrl,
			method: "get",
			success: function (data) {
				// console.log(data);
				if (data.status == "ok") {
					let articles = data.articles;
					// console.log(articles);
					clearResults(articleList);
					if (articles.length == 0) {
						// console.log("no results");
						noResults(articleList);
					} else {
						clearResults(articleList);
						articles.forEach((element, index) => {
							createNewsItem(element, articleList);
						});
					}
				} else {
					console.log("error");
				}
			},
			error: function (error) {
				console.log(error);
			},
		});
	});
}

qForm.addEventListener("submit", (e) => {
	e.preventDefault();
	// console.log("q", searchWord);
	newsQUrl = `https://newsapi.org/v2/everything?q=${searchWord}&apiKey=a094f869549b4b41a8fdb313ba2baaf9`;

	$.ajax({
		url: newsQUrl,
		method: "get",
		success: function (data) {
			// console.log(data);
			if (data.status == "ok") {
				let articles = data.articles;
				console.log(articles);
				clearResults(articleList);
				if (articles.length == 0) {
					noResults(articleList);
				} else {
					clearResults(articleList);
					articles.forEach((element) => {
						createNewsItem(element, articleList);
					});
				}
			} else {
				console.log("error");
			}
		},
		error: function (error) {
			console.log(error);
		},
	});
});

function clearResults(articleList) {
	let oldArticles = articleList.querySelectorAll("a, div");
	oldArticles.forEach((element) => {
		element.remove();
	});
}

function noResults(articleList) {
	let noResultBlock = document.createElement("div");
	noResultBlock.textContent = "No Result";
	articleList.append(noResultBlock);
}
