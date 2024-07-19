import mongoose from "mongoose"

const customerModel = new mongoose.Schema({
	_id:String,
	name: String,
	category: String,
	timeline: String,
	budget: String,
	file: String,
},{ timestamps: true })

export const Customer = mongoose.models.customers || mongoose.model('customers', customerModel )