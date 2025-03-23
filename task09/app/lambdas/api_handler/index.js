exports.handler = async (event) => {

    const path = event?.requestContext?.http?.path || '';
    const method = event?.requestContext?.http?.method || '';


    if (path === '/weather' && method === 'GET') {
        try {
            const url = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m';


            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            return {
                statusCode: 200,
                body: JSON.stringify(data),
                headers: { "content-type": "application/json" },
                isBase64Encoded: false
            };
        } catch (error) {
            console.error('Error fetching forecast:', error);
            return {
                statusCode: 500,
                body: JSON.stringify({ error: error.toString() }),
                headers: { "content-type": "application/json" },
                isBase64Encoded: false
            };
        }
    } else {

        const errorBody = {
            statusCode: 400,
            message: `Bad request syntax or unsupported method. Request path: ${path}. HTTP method: ${method}`
        };
        return {
            statusCode: 400,
            body: JSON.stringify(errorBody),
            headers: { "content-type": "application/json" },
            isBase64Encoded: false
        };
    }
};
