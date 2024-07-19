import mongoose from "mongoose"

const contactModel = new mongoose.Schema({
	name: String,
	email: String,
	number: String,
	city: String,
	description: String
},{ timestamps: true })

export const Contact = mongoose.models.contacts || mongoose.model('contacts', contactModel )