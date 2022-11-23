import path from "path";
import bodyParser from 'body-parser';
import express from 'express';
import config from './config/conf.js';
import router from './routes/routes.js';
import ejsMate from 'ejs-mate';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { default as connectMongoDBSession} from 'connect-mongodb-session';
const MongoDBStore = connectMongoDBSession(session);

const app = express();
const __dirname = path.resolve();
app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);
app.set('port', 3000);

const run = () => {
	app.use(express.json());
	app.use(cookieParser(config.SECRET_KEY));
	app.use(bodyParser.json());
	app.use(
		bodyParser.urlencoded({
			extended: true
		})
	);
	app.use(session({
		secret: config.SECRET_KEY,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 // 1 day
		},
		store: new MongoDBStore({
			uri: config.CONNECTION_STRING,
			collection: 'sessions',
			databaseName: 'showcase'
		}),
		resave: true,
		saveUninitialized: true
	}));
	app.use(router);
	app.use(express.static(path.resolve(__dirname, "views"))); 
	app.listen(config.PORT, console.log(`http://localhost:${config.PORT}`));
};

export default { run };