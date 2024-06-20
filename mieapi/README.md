
# mieapi
A npm package to simplify API interactions with WebChart Electronich Health records

`mieapi` is an npm package that simplifies interactions with APIs by managing sessions and handling GET and PUT requests. It also includes robust logging capabilities for debugging and monitoring.

## Features

- **Session Management**: Automatically initializes and maintains sessions with the API, handling authentication and cookies.
- **GET and PUT Requests**: Provides simple methods to perform GET and PUT requests to API endpoints.
- **Logging**: Utilizes Winston and Logtail for efficient and structured logging, aiding in debugging and monitoring.
- **Configurable**: Allows configuration of API base URL, username, and password through a dedicated config file.

## Installation

Install the package using npm:

```sh
npm install mieapi
```

## Package Structure

The package structure is as follows:

```
mieapi/
├── src/
│   ├── apis/
│   │   ├── ApiService.js
│   │   └── index.js
│   ├── config/
│   │   └── apiConfig.js
│   ├── core/
│   │   └── baseApi.js
│   ├── logging/
│   │   └── logger.js
│   └── index.js
├── package.json
└── README.md
```

## Configuration

Before using the package, configure your API credentials in `src/config/apiConfig.js`:

```javascript
// src/config/apiConfig.js
export const BASE_URL = 'https://api.example.com';
export const USERNAME = 'your-username';
export const PASSWORD = 'your-password';
```

## Usage

### Importing ApiService

Import the `ApiService` from the package:

```javascript
import { apiService } from 'mieapi';
```
### ApiService Methods

#### getApi

Fetches data from a specified API endpoint using a GET request.

```javascript
async getApi(apiName, options, callback)
```
- **Parameters:**
  - `apiName` (string): The name of the API endpoint.
  - `options` (String): String of Options to be passed with the request.
  - `callback` (function): Callback function to handle the response or error.

### Making GET Requests


Fetch data from an API endpoint using the `getApi` method:

```javascript
apiService.getApi('exampleApi', LIKE_pat_id=something&limit=5, (error, response) => {
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Response:', response);
    }
});
```

- `getApi` accepts the API name, an options object (for query parameters), and a callback function to handle the response.

#### putApi

Sends data to a specified API endpoint using a PUT request.

```javascript
async putApi(apiName, json, callback)
```

- **Parameters:**
  - `apiName` (string): The name of the API endpoint.
  - `json` (object): JSON object to be sent in the request body.
  - `callback` (function): Callback function to handle the response or error.

### Making PUT Requests

Send data to an API endpoint using the `putApi` method:

```javascript
apiService.putApi('exampleApi', { key: 'value' }, (error, response) => {
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Response:', response);
    }
});
```

- `putApi` accepts the API name, a JSON object (for the request body), and a callback function to handle the response.

## BaseApi Methods

### initializeSession

Initializes a session by logging in and storing the session cookie. Replace {sessionId} field in line 'cookie': `wc_miehr_${this.sessionId}_session_id=${this.cookie}` with your sessionId to initialize cookie.

```javascript
async initializeSession()
```

- **Example:**
  ```javascript
  await apiService.initializeSession();
  ```
  - **Example:**
  ```javascript
  'cookie': `wc_miehr_anshulmie_session_id=${this.cookie}`
  ```



### Logging

The package includes a logger for efficient and structured logging:

```javascript
import logger from 'mieapi/logging/logger';

logger.info('This is an info message');
logger.error('This is an error message');
```

## API Documentation

For detailed documentation on all available methods and their parameters, please refer to the [API Reference](https://github.com/abroa01/mie-webChartApi).

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss any changes or improvements.

## License

This project is licensed under the Medical Informatics Engineering (MIE)