import mongoose from 'mongoose';

const autoSchema = new mongoose.Schema(
    {
        model: { type: String, minLength: 1 },
        manufacturer: { type: String, minLength: 1 },
		releaseYear: { type: Number, min: 1900, max: 2050 },
		engineCapacity: Number,
		price: { type: Number, required: true },
		color: { type: String, required: true },
		pictureURL: String,
		description: String
	},
	{ versionKey: false, collection: 'autos' }
);

const Auto = mongoose.model('Auto', autoSchema);

export default Auto;