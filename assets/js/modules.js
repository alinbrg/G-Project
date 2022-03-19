export function createNewsItem(item, articleList) {
	let newsItem = document.createElement("div");

	newsItem.classList.add("article__item");
	newsItem.innerHTML = `
		<div class="article__img">
			
				<img src="${item.urlToImage}" alt="" />
		
		</div>
		<a href="${item.url}" target="_blank">
			<div class="article__src">
				<div class="article__head">
					<h4>${item.title}</h4>
					<span>${item.publishedAt}</span>
				</div>
				<p>${item.description}</p>
				<div class="article__bottom">
					<span>Source: </span>
					<span>${item.source.name}</span>
				</div>
			</div>
		</a>
	`;

	articleList.append(newsItem);
}
