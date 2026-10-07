async function getWeather() {

    // Get city name from input
    const city = document.getElementById("cityInput").value;

    // Check if input is empty
    if (city === "") {
        document.getElementById("message").innerText =
            "Please enter a city name";

        return;
    }

    try {

        // Step 1: Find latitude and longitude of city
        const locationResponse = await fetch(
            "https://geocoding-api.open-meteo.com/v1/search?name="
            + city
            + "&count=1&language=en&format=json"
        );

        const locationData = await locationResponse.json();

        // Check if city exists
        if (!locationData.results) {

            document.getElementById("message").innerText =
                "City not found";

            return;
        }

        const location = locationData.results[0];

        const latitude = location.latitude;
        const longitude = location.longitude;

        // Step 2: Get weather data
        const weatherResponse = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude="
            + latitude
            + "&longitude="
            + longitude
            + "&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m"
            + "&timezone=auto"
        );

        const weatherData = await weatherResponse.json();

        // Step 3: Get current weather
        const currentWeather = weatherData.current;

        // Step 4: Display data on webpage
        document.getElementById("cityName").innerText =
            location.name + ", " + location.country;

        document.getElementById("temperature").innerText =
            "Temperature: " + currentWeather.temperature_2m + " °C";

        document.getElementById("humidity").innerText =
            "Humidity: " + currentWeather.relative_humidity_2m + " %";

        document.getElementById("wind").innerText =
            "Wind Speed: " + currentWeather.wind_speed_10m + " km/h";

        document.getElementById("weather").innerText =
            "Weather Code: " + currentWeather.weather_code;

        document.getElementById("message").innerText = "";

    } catch (error) {

        document.getElementById("message").innerText =
            "Something went wrong. Please try again.";

        console.log(error);
    }
}