import dotenv from 'dotenv';
dotenv.config();

const config = {
    SECRET_KEY: process.env.SECRET_KEY,
	PORT: process.env.PORT,
    CONNECTION_STRING: process.env.CONNECTION_STRING
};

export default config;
