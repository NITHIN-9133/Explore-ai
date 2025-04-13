function search(type) {
    const keyword = document.getElementById("searchInput").value;

    let apiUrl = '';
    switch (type) {
        case 'text':
            // Replace 'YOUR_API_KEY' and 'YOUR_CX' with your actual API key and custom search engine ID
            apiUrl = `https://www.googleapis.com/customsearch/v1?q=${keyword}&key=AIzaSyAJTXsv3vyp9EInCmKsmu5XFlzXzGLpKUA&cx=a35fac259699041af`;
            break;
        case 'image':
            apiUrl = `https://api.unsplash.com/search/photos?page=1&query=${keyword}&client_id=vUkjTJSoTlLqIDqVwQfyefJWL5zb60nisPfBfiwJ9qo`;
            break;
        case 'video':
            apiUrl = `https://www.googleapis.com/youtube/v3/search?q=${keyword}&key=AIzaSyB0G1G6HUB2xkO-vLn-8jSwd_CHn5jRpbk&type=video`;
            break;
        default:
            break;
    }

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const resultsContainer = document.getElementById("results");
            resultsContainer.innerHTML = "";

            switch (type) {
                case 'text':
                    data.items.forEach(item => {
                        const textItem = document.createElement("div");
                        textItem.innerHTML = `<a href="${item.link}" target="_blank">${item.title}</a><p>${item.snippet}</p>`;
                        textItem.classList.add("result-item");
                        resultsContainer.appendChild(textItem);
                    });
                    break;
                case 'image':
                    data.results.forEach(result => {
                        const imageItem = document.createElement("div");
                        const img = document.createElement("img");
                        img.src = result.urls.small;
                        imageItem.appendChild(img);
                        imageItem.classList.add("result-item");
                        resultsContainer.appendChild(imageItem);
                    });
                    break;
                case 'video':
                    data.items.forEach(item => {
                        if (item.id.kind === "youtube#video") {
                            const videoContainer = document.createElement("div");
                            videoContainer.innerHTML = `
                                <iframe width="280" height="160" src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
                            `;
                            videoContainer.classList.add("result-item");
                            resultsContainer.appendChild(videoContainer);
                        }
                    });
                    break;
                default:
                    break;
            }
        })
        .catch(error => console.error(error));
}
