document.querySelector("#app").innerHTML = "<p>Loading...</p>";

fetch("https://science.nasa.gov/wp-json/wp/v2/apod-basic?page=1&per_page=1")
  .then(response => response.json())
  .then(data => {
    const apod = data[0]; // newest APOD

    let media = "";

    if (apod.media_type === "image") {
      media = `${apod.hdurl || apod.url}`;
      document.body.style.backgroundImage =
        `url('${apod.hdurl || apod.url}')`;
    }

    document.querySelector("#app").innerHTML = `
      ${media}
      <h1>${apod.title}</h1>
      <p>${apod.explanation}</p>
      ${apod.permalink}
        View on NASA
      </a>
    `;
  })
  .catch(err => {
    document.querySelector("#app").innerHTML =
      `<p>Error: ${err.message}</p>`;
  });