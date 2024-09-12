
# mieapi

A Node.js package to simplify API interactions with WebChart Electronic Health Records (EHR).

`mieapi` is an npm package that provides an abstraction layer for interacting with WebChart APIs. It simplifies session management, supports GET and PUT requests, and provides robust logging capabilities for debugging and monitoring.

## Features

- **Session Management**: Automatically initializes and maintains sessions with the WebChart API, handling authentication and cookies.
- **GET and PUT Requests**: Provides simple methods to perform GET and PUT requests to API endpoints.
- **Logging**: Utilizes Winston and Logtail for efficient, structured logging, aiding in debugging and monitoring.
- **Configurable**: Allows configuration of API base URL, username, and password via environment variables.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Error Handling](#error-handling)
- [Logging](#logging)
- [Contributing](#contributing)

## Installation

Install the package using npm:

```bash
npm install mieapi
```

## Usage

Import the package in your project:

```javascript
import apiService from 'mieapi';
```

### Making API Calls

Before making any API calls, ensure that you initialize a session with the WebChart EHR system:

#### GET Request

```javascript
const data = await apiService.get('<API Endpoint>', '<Optional Parameters>');
```

#### PUT Request

```javascript
const response = await apiService.put('<API Endpoint>', '<Optional Parameters>', '<JSON Body>');
```

### Session Initialization

You need to initialize a session before making API calls:

```javascript
await apiService.initSession();
```

This establishes a session with WebChart by logging in with the credentials provided in the environment variables.

## Configuration

The package uses environment variables for configuration:

- `API_URL`: WebChart base URL
- `API_USERNAME`: WebChart username
- `API_PASSWORD`: WebChart password
- `PRACTICE`: Practice name for the WebChart account (found in the WebChart URL)

Example `.env` file:

```
API_URL=<your_webchart_url>
API_USERNAME=<your_username>
API_PASSWORD=<your_password>
PRACTICE=<your_practice_name>
```

## Error Handling

The package throws errors for various failure scenarios, such as:

- Session cookie not found
- API endpoint not found
- HTTP errors from the WebChart API

Always wrap API calls in try-catch blocks to handle these errors gracefully:

```javascript
try {
    const data = await apiService.get('<API Endpoint>');
} catch (error) {
    console.error(error);
}
```

## Logging

The package integrates Winston for logging. Logs can be configured to output to the console or sent to Logtail for centralized logging.

Log entries include contextual information such as API names, user handles, and performance metrics.

### Example:

```javascript
import { logger } from './logger.js';

logger.info('Session initialized successfully');
```

## Contributing

Contributions are welcome! Please submit a pull request for any changes.
