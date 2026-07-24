const axios = require("axios");
const weatherCache = {};
// cache: This creates an object that will hold the latest weather data for each city.

const getWeather = async (req, res) => {

    const city = req.params.city;
    
    try {
        
        const apiKey = process.env.WEATHER_API_KEY;

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response = await axios.get(url, {
            timeout: 5000
            // if the server doesn't answer within 5 seconds, stop waiting and throw an error.
        });

        const weatherData = response.data;

        const formattedWeather = {
            city: weatherData.name,
            country: weatherData.sys.country,
            temperature: weatherData.main.temp,
            feelsLike: weatherData.main.feels_like,
            humidity: weatherData.main.humidity,
            weather: weatherData.weather[0].main,
            description: weatherData.weather[0].description,
            windSpeed: weatherData.wind.speed
        };

        weatherCache[city.toLowerCase()] = formattedWeather;

        return res.status(200).json({
            success: true,
            data: formattedWeather
        });
    } 
    catch (error) {

        const cachedWeather = weatherCache[city.toLowerCase()];

        if (cachedWeather) {

            return res.status(200).json({
                success: true,
                cached: true,
                data: cachedWeather,
                message: "Serving cached data due to an error with the weather service."
            });
        }

        console.error("Weather API Error:", error.message);

        if (error.response && error.response.status === 404) {

            return res.status(404).json({
                success: false,
                message: "City not found."
            });

        }

        if (error.code === "ECONNABORTED") {

            return res.status(504).json({
                success: false,
                message: "The weather service took too long to respond."
            });

        }

        if (error.request) {

            return res.status(503).json({
                success: false,
                message: "Weather service is currently unavailable."
            });

        }

        return res.status(500).json({
            success: false,
            message: "Internal server error."
        }); 
    } 
};

module.exports = {
    getWeather
};