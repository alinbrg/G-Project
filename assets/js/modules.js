export function createNewsItem(item, articleList) {
	let newsItem = document.createElement("a");

	newsItem.href = item.url;
	newsItem.target = "_blank";
	newsItem.innerHTML = `
		<div class="article__item">
			<div class="article__img">
					<img src="${item.urlToImage}" alt="" />
			</div>
		
			<div class="article__src">
				<div class="article__head">
					<h4>${item.title}</h4>
					<span>${item.publishedAt}</span>
				</div>
				<p>${item.description ? item.description : ""}</p>
				<div class="article__bottom">
					<span>Source: </span>
					<span>${item.source.name}</span>
				</div>
			</div>
		</div>
	`;
	if (!item.urlToImage) {
		newsItem.querySelector("img").src = "assets/img/news.jpg";
	}
	articleList.append(newsItem);
}

export function scrollToTop() {
	$(".scroll-to-top").click(function () {
		$("html, body").animate({ scrollTop: 0 }, "slow");
		return false;
	});
}
