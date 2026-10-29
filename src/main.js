const app = document.querySelector("#app");

app.textContent = "Loading NASA's picture...";

fetch("https://science.nasa.gov/wp-json/wp/v2/apod-basic?page=1&per_page=1")
    .then(response => {
        if (!response.ok) {
            throw new Error("Could not load NASA's APOD.");
        }
        return response.json();
    })
    .then(data => {
        console.log("NASA response:", data);

        const apod = data[0];

        if (!apod) {
            throw new Error("No picture was returned.");
        }

        const imageUrl = apod.hdurl || apod.url;

        console.log("Image URL:", imageUrl);

        if (imageUrl) {
            const backgroundImage = new Image();

            backgroundImage.onload = () => {
                document.body.style.backgroundImage =
                    `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("${imageUrl}")`;
            };

            backgroundImage.onerror = () => {
                console.error("NASA background image failed to load:", imageUrl);
            };

            backgroundImage.src = imageUrl;
        }

        app.innerHTML = `
            <h1>${apod.title}</h1>
            <a href="${apod.permalink || apod.url}" target="_blank" rel="noopener noreferrer">
                View on NASA
            </a>
        `;

        document.querySelector("#about-info").innerHTML = `
            <p class="about-status">TRANSMISSION RECEIVED</p>
            <h3>${apod.title}</h3>
            <p>${apod.explanation}</p>
            <a href="${apod.permalink || apod.url}" target="_blank" rel="noopener noreferrer">
                [ READ FULL TRANSMISSION ↗ ]
            </a>
        `;
    })
    .catch(error => {
        console.error("APOD error:", error);
        app.textContent = "Error loading NASA's picture: " + error.message;
    });
