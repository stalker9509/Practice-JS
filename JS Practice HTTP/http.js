const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const API_KEY = '06c9b41810e379a14f5596fa50c8f01c'; // Замените на ваш реальный API ключ
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';

app.use(express.json());

const checkApiKey = (req, res, next) => {
    const apiKey = req.query.appid || req.headers['x-api-key'];
    if (!apiKey || apiKey !== API_KEY) {
        return res.status(401).json({
            cod: 401,
            message: "Unauthorized. Invalid API key."
        });
    }
    next();
};

let requestCount = 0;
const rateLimiter = (req, res, next) => {
    requestCount++;
    if (requestCount > 5) {
        return res.status(429).json({
            cod: 429,
            message: "Too Many Requests. Key quota exceeded. Please wait before retrying or extend your quota."
        });
    }
    next();
};

app.get('/weather', checkApiKey, rateLimiter, async (req, res) => {
    try {
        const { lat, lon, q } = req.query;
        if (!lat || !lon) {
            return res.status(400).json({
                cod: 400,
                message: "Bad Request. Missing required parameters.",
                parameters: ['lat', 'lon']
            });
        }

        const response = await axios.get(`${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        res.status(200).json(response.data);
    } catch (error) {
        if (error.response) {
            const { status, data } = error.response;
            if (status === 404) {
                res.status(404).json({
                    cod: 404,
                    message: "Not Found. Data for requested parameters does not exist."
                });
            } else if (status >= 500) {
                res.status(status).json({
                    cod: status,
                    message: "Unexpected Error. Please contact support with details of your request."
                });
            } else {
                res.status(status).json(data);
            }
        } else {
            res.status(500).json({
                cod: 500,
                message: "Internal Server Error. Please contact support."
            });
        }
    }
});

app.get('/bad-request', (req, res) => {
    res.status(400).json({
        cod: 400,
        message: "Bad Request. Missing or incorrect parameters.",
        parameters: ['city']
    });
});

app.use((req, res) => {
    res.status(404).json({
        cod: 404,
        message: "Not Found. The requested resource does not exist."
    });
});

app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).json({
        cod: 500,
        message: "Unexpected Error. Please contact support with details of your request."
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});