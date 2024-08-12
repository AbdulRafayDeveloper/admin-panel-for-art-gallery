import mongoose from "mongoose"

const contactModel = new mongoose.Schema({
	name: String,
	email: String,
	number: String,
	city: String,
	country:String,
	role:String,
	times: { type: Number, default: 1, required:true }
})

export const Contact = mongoose.models.contacts || mongoose.model('contacts', contactModel )