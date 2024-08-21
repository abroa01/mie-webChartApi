
# mieapi
A npm package to simplify API interactions with WebChart Electronich Health records

`mieapi` is an npm package that simplifies interactions with APIs by managing sessions and handling GET and PUT requests. It also includes robust logging capabilities for debugging and monitoring.

## Features

- **Session Management**: Automatically initializes and maintains sessions with the API, handling authentication and cookies.
- **GET and PUT Requests**: Provides simple methods to perform GET and PUT requests to API endpoints.
- **Logging**: Utilizes Winston and Logtail for efficient and structured logging, aiding in debugging and monitoring.
- **Configurable**: Allows configuration of API base URL, username, and password through a dedicated config file.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Error Handling](#error-handling)
- [Logging](#logging)
- [Contributing](#contributing)
- [License](#license)

## Installation

Install the package using npm:

```bash
npm install mieapi
```

## Usage

First, import the package in your JavaScript file:

```javascript
import { apiService, endpoints, logger } from 'mieapi';
```

### Initializing a Session

Before making any API calls, you need to initialize a session:

```javascript
const userHandle = 'your-user-handle';
const username = 'your-username';
const password = 'your-password';

const { success, cookie } = await apiService.initializeSession(userHandle, username, password);

if (success) {
    console.log('Session initialized successfully');
} else {
    console.error('Failed to initialize session');
}
```

### Making API Calls

#### GET Request

```javascript
const apiName = 'patients';
const options = { limit: 10 };

try {
    const result = await apiService.getApi(cookie, apiName, options, userHandle);
    console.log('API response:', result);
} catch (error) {
    console.error('API request failed:', error);
}
```

#### PUT Request

```javascript
const apiName = 'patients';
const data = { /* your data here */ };

try {
    const result = await apiService.putApi(cookie, apiName, data, userHandle);
    console.log('API response:', result);
} catch (error) {
    console.error('API request failed:', error);
}
```

### apiService.initializeSession(userHandle, username, password)

Initializes a session with the WebChart EHR system.

- Parameters:
  - `userHandle` (string): The user handle for the WebChart instance.
  - `username` (string): The username for authentication.
  - `password` (string): The password for authentication.
- Returns: An object with `success` (boolean) and `cookie` (string) properties.

### apiService.getApi(sessionCookie, apiName, options, userHandle, appendUrl)

Performs a GET request to the specified API endpoint.

- Parameters:
  - `sessionCookie` (string): The session cookie obtained from initializeSession.
  - `apiName` (string): The name of the API endpoint (see `endpoints` for available options).
  - `options` (object): Query parameters for the API call.
  - `userHandle` (string): The user handle for the WebChart instance.
  - `appendUrl` (string, optional): Additional URL to append to the request.
- Returns: The API response as a JSON object.

### apiService.putApi(sessionCookie, apiName, json, userHandle)

Performs a PUT request to the specified API endpoint.

- Parameters:
  - `sessionCookie` (string): The session cookie obtained from initializeSession.
  - `apiName` (string): The name of the API endpoint (see `endpoints` for available options).
  - `json` (object): The data to send in the request body.
  - `userHandle` (string): The user handle for the WebChart instance.
- Returns: The API response as a JSON object.

## Configuration

The package uses environment variables for configuration:

- `LOG_LEVEL`: Sets the logging level (default: 'info')
- `LOGTAIL_SOURCE_TOKEN`: Token for Logtail logging service (if used)

## Error Handling

The package throws errors for various scenarios, including:

- No session cookie available
- API endpoint not found
- HTTP errors from the WebChart API

Always wrap API calls in try-catch blocks to handle potential errors.

## Logging

The package uses Winston for logging. Logs are output to the console and can be configured to use Logtail for centralized logging.

Log entries include contextual information such as API names, user handles, and performance metrics.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIE License.
## API Documentation

For detailed documentation on all available methods and their parameters, please refer to the github repo(https://github.com/abroa01/mie-webChartApi).

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss any changes or improvements.

## License

This project is licensed under the Medical Informatics Engineering (MIE)