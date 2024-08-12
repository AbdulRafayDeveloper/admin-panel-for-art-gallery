import mongoose from "mongoose"

const customerModel = new mongoose.Schema({
	contact_id: mongoose.Schema.Types.ObjectId,
	status:String,
	role:String,
	projectsQuoted:{ type: Number, default: 0 }
},{ timestamps: true })

export const Customer = mongoose.models.customers || mongoose.model('customers', customerModel )