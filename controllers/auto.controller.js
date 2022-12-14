import Auto from '../models/auto.js';

const DEFAULT_ERROR = 'Error, try again later';

export const readAll = (req, res, next) => {
	Auto.find()
		.then((result) => {
			req.autos = result;
			next();
		})
		.catch((err) => {
			console.log(`Cars get error: ${err}`);
			return res.status(500).send(DEFAULT_ERROR);
		});
};

export const create = (req, res, next) => {
	Auto.create(req.body)
		.then(() => next())
		.catch((err) => {
			console.log(`Car create error: ${err}`);
			return res.status(500).send(DEFAULT_ERROR);
		});
};

export const readById = (req, res, next) => {
	const id = req.params.id;
	Auto.findById(id)
		.then((result) => {
			req.auto = result;
			next();
		})
		.catch((err) => {
			console.log(`Car get error: ${err}`);
			return res.status(500).send(DEFAULT_ERROR);
		});
};

export const deleteById = (req, res, next) => {
	const id = req.params.id;
	Auto.findByIdAndDelete(id)
		.then(next())
		.catch((err) => {
			console.log(`Car delete error: ${err}`);
			return res.status(500).send(DEFAULT_ERROR);
		});
};

export const updateById = (req, res, next) => {
	const id = req.params.id;
	Auto.findByIdAndUpdate(id, req.data)
		.then(next())
		.catch((err) => {
			console.log(`Car update error: ${err}`);
			return res.status(500).send(DEFAULT_ERROR);
		});
};
