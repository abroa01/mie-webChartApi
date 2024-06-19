Sure, let's improve the documentation by adding more detailed explanations, examples, and better formatting to make it more user-friendly and comprehensive. Here's an enhanced version of the `README.md`:

```markdown
# mieapi

`mieapi` is an npm package that simplifies interactions with APIs by managing sessions, and handling GET and PUT requests. It also includes robust logging for debugging and monitoring.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
  - [Importing ApiService](#importing-apiservice)
  - [ApiService Methods](#apiservice-methods)
    - [getApi](#getapi)
    - [putApi](#putapi)
    - [getEndpoints](#getendpoints)
- [BaseApi Methods](#baseapi-methods)
  - [initializeSession](#initializesession)
  - [getRequest](#getrequest)
  - [putRequest](#putrequest)
- [Logging](#logging)
- [Example Usage](#example-usage)
- [Running Tests](#running-tests)
- [Package Structure](#package-structure)
- [License](#license)
- [Author](#author)
- [Contributing](#contributing)

## Installation

To install the `mieapi` package, run:
```sh
npm install mieapi
```

## Configuration

Before using the package, configure your API credentials in the `src/config/apiConfig.js` file.

```javascript
// src/config/apiConfig.js
export const BASE_URL = 'https://api.example.com';
export const USERNAME = 'your-username';
export const PASSWORD = 'your-password';

```

## Usage

### Importing ApiService

First, import the `ApiService` from the package:

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
  - `options` (object): Options to be passed with the request.
  - `callback` (function): Callback function to handle the response or error.

- **Example:**
  ```javascript
  apiService.getApi('exampleApi', { param1: 'value1' }, (error, response) => {
      if (error) {
          console.error('Error:', error);
      } else {
          console.log('Response:', response);
      }
  });
  ```

#### putApi

Sends data to a specified API endpoint using a PUT request.

```javascript
async putApi(apiName, json, callback)
```

- **Parameters:**
  - `apiName` (string): The name of the API endpoint.
  - `json` (object): JSON object to be sent in the request body.
  - `callback` (function): Callback function to handle the response or error.

- **Example:**
  ```javascript
  apiService.putApi('exampleApi', { key: 'value' }, (error, response) => {
      if (error) {
          console.error('Error:', error);
      } else {
          console.log('Response:', response);
      }
  });
  ```

#### getEndpoints

Retrieves the endpoint URL for a given API name.

```javascript
getEndpoints(apiName)
```

- **Parameters:**
  - `apiName` (string): The name of the API endpoint.

- **Returns:**
  - `string`: The URL of the API endpoint.

- **Example:**
  ```javascript
  const endpoint = apiService.getEndpoints('exampleApi');
  console.log(endpoint); // Output: http://example.com/api/endpoint
  ```

## BaseApi Methods

### initializeSession

Initializes a session by logging in and storing the session cookie.

```javascript
async initializeSession()
```

- **Example:**
  ```javascript
  await apiService.initializeSession();
  ```

### getRequest

Performs a GET request.

```javascript
async getRequest(method, endpoint, options, callback)
```

- **Parameters:**
  - `method` (string): HTTP method (should be 'GET').
  - `endpoint` (string): The API endpoint.
  - `options` (object): Options to be passed with the request.
  - `callback` (function): Callback function to handle the response or error.

- **Example:**
  ```javascript
  apiService.getRequest('GET', 'http://example.com/api/endpoint', { param: 'value' }, (error, response) => {
      if (error) {
          console.error('Error:', error);
      } else {
          console.log('Response:', response);
      }
  });
  ```

### putRequest

Performs a PUT request.

```javascript
async putRequest(method, json, endpoint, callback)
```

- **Parameters:**
  - `method` (string): HTTP method (should be 'PUT').
  - `json` (object): JSON object to be sent in the request body.
  - `endpoint` (string): The API endpoint.
  - `callback` (function): Callback function to handle the response or error.

- **Example:**
  ```javascript
  apiService.putRequest('PUT', { key: 'value' }, 'http://example.com/api/endpoint', (error, response) => {
      if (error) {
          console.error('Error:', error);
      } else {
          console.log('Response:', response);
      }
  });
  ```

## Logging

The package uses `winston` and `logtail` for efficient and structured logging.

#### Example

```javascript
import logger from './logging/logger.js';

logger.info('This is an info message');
logger.error('This is an error message');
```

## Example Usage

```javascript
import { apiService } from 'mieapi';

apiService.getApi('exampleApi', { param: 'value' }, (error, response) => {
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Response:', response);
    }
});

apiService.putApi('exampleApi', { key: 'value' }, (error, response) => {
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Response:', response);
    }
});
```

## Running Tests

To run tests, use:

```sh
npm test
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


## Author

Anshul Abrol

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss any changes.

---

```

This version includes a table of contents for easy navigation, more detailed explanations of methods and parameters, and additional examples to demonstrate usage. It aims to be more user-friendly and comprehensive, helping developers understand how to use the `mieapi` package effectively. If you have any additional requirements or need further customization, let me know!