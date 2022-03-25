let topHeadlinesUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=a094f869549b4b41a8fdb313ba2baaf9`,
	articleList = document.querySelector(".articles__list");

import { createNewsItem, scrollToTop } from "./modules.js";
$.ajax({
	url: topHeadlinesUrl,
	method: "get",
	success: function (data) {
		// console.log(data);
		if (data.status == "ok") {
			let articles = data.articles;
			// console.log(articles);
			articles.forEach((element) => {
				createNewsItem(element, articleList);
			});
		} else {
			console.log("error");
		}
	},
	error: function (error) {
		console.log(error);
	},
});

scrollToTop();
