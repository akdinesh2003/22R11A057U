const axios = require('axios');

let authToken = null;
let clientID = null;
let clientSecret = null;

const LOG_API_URL = 'http://20.244.56.144/evaluation-service/logs';
const AUTH_API_URL = 'http://20.244.56.144/evaluation-service/auth';

const validStacks = ['backend', 'frontend'];
const validLevels = ['debug', 'info', 'warn', 'error', 'fatal'];
const validBackendPackages = ['cache', 'controller', 'cron_job', 'db', 'domain', 'handler', 'repository', 'route', 'service'];
const validFrontendPackages = ['api', 'component', 'hook', 'page', 'state', 'style'];
const validSharedPackages = ['auth', 'config', 'middleware', 'utils'];

const getAllValidPackages = () => {
  return [...validBackendPackages, ...validFrontendPackages, ...validSharedPackages];
};

const validateInputs = (stack, level, package, message) => {
  if (!validStacks.includes(stack)) {
    throw new Error(`Invalid stack: ${stack}. Valid values: ${validStacks.join(', ')}`);
  }
  
  if (!validLevels.includes(level)) {
    throw new Error(`Invalid level: ${level}. Valid values: ${validLevels.join(', ')}`);
  }
  
  const allValidPackages = getAllValidPackages();
  if (!allValidPackages.includes(package)) {
    throw new Error(`Invalid package: ${package}. Valid values: ${allValidPackages.join(', ')}`);
  }
  
  if (!message || typeof message !== 'string') {
    throw new Error('Message must be a non-empty string');
  }
};

const authenticate = async (email, name, rollNo, accessCode, clientID, clientSecret) => {
  try {
    const response = await axios.post(AUTH_API_URL, {
      email,
      name,
      rollNo,
      accessCode,
      clientID,
      clientSecret
    });
    
    if (response.data && response.data.access_token) {
      authToken = response.data.access_token;
      return authToken;
    } else {
      throw new Error('Authentication failed: No access token received');
    }
  } catch (error) {
    console.error('Authentication error:', error.response?.data || error.message);
    throw error;
  }
};

const Log = async (stack, level, package, message) => {
  try {
    validateInputs(stack, level, package, message);
    
    if (!authToken) {
      throw new Error('Not authenticated. Please call authenticate() first with your credentials.');
    }
    
    const logData = {
      stack: stack.toLowerCase(),
      level: level.toLowerCase(),
      package: package.toLowerCase(),
      message: message
    };
    
    const response = await axios.post(LOG_API_URL, logData, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.data && response.data.logID) {
      console.log(`Log created successfully with ID: ${response.data.logID}`);
      return response.data;
    } else {
      throw new Error('Log creation failed: No log ID received');
    }
  } catch (error) {
    console.error('Logging error:', error.response?.data || error.message);
    throw error;
  }
};

const setupLogging = (email, name, rollNo, accessCode, clientID, clientSecret) => {
  return authenticate(email, name, rollNo, accessCode, clientID, clientSecret);
};

module.exports = {
  Log,
  setupLogging,
  validStacks,
  validLevels,
  validBackendPackages,
  validFrontendPackages,
  validSharedPackages,
  getAllValidPackages
}; 