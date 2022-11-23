import Auto from '../models/auto.js';

export const readAll = (req, res, next) => {
    Auto.find()
    .then(result => {
        req.autos = result;
        next();
    })
    .catch(err => {
        console.log(`fail`);
        return res.status(500).send('Error');
    });
};

export const create = (req, res, next) => {
    Auto.create(req.body).then(next());
}

export const readById = (req, res, next) => {
    const id = req.params.id;
    Auto.findById(id)
		.then(result => {
			req.car = result;
			next();
		})
		.catch(err => {
			console.log(`failed to get car: ${err}`);
			return res.status(500).send('error, try again later');
		});
};

export const deleteById = (req, res, next) => {
	const id = req.params.id;
	Auto.findByIdAndDelete(id)
		.then(next())
		.catch(err => {
			console.log(`failed to remove car: ${err}`);
			return res.status(500).send('error, try again later');
		});
};

export const updateById = (req, res, next) => {
	const id = req.params.id;
	Auto.findByIdAndUpdate(id, req.body)
		.then(next())
		.catch(err => {
			console.log(`failed to edit car: ${err}`);
			return res.status(500).send('error, try again later');
		});
};