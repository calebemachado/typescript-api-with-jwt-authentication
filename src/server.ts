import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';

import './database';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(routes);

app.listen(3333, () => {
	console.log('Server stated on port 3333');
});
