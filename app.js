import mongoose from 'mongoose';
import config from './config/conf.js';
import server from './server.js';

mongoose
	.connect(config.CONNECTION_STRING)
	.then(() => server.run())
	.catch(err => console.log(`Failed to connect. Error: ${err}`));