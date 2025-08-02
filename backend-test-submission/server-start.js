const { startServer } = require('./server/index');
const { setupLogging } = require('./logging-middleware');
const config = require('./config');

const startApplication = async () => {
  try {
    console.log('Starting URL Shortener Application...');
    console.log('Authenticating with Affordmed test server...');
    
    await setupLogging(
      config.email,
      config.name,
      config.rollNo,
      config.accessCode,
      config.clientID,
      config.clientSecret
    );
    
    console.log('Authentication successful! Starting server...');
    
    await startServer();
    
  } catch (error) {
    console.error('Failed to start application:', error.message);
    console.error('Please check your credentials in config.js and try again.');
    process.exit(1);
  }
};

startApplication(); 