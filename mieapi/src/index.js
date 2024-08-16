import { ApiService } from '../src/apis/ApiService'
import { endpoints } from '../src/config/apiConfig';
import logger from '../src/logging/logger';

//single instance of ApiService
const apiService = new ApiService();

export {
  apiService,
  endpoints,
  logger
};

// export for backwards compatibility
export default {
  apiService,
  endpoints,
  logger
};