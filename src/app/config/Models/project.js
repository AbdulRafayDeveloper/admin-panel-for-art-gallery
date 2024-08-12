import mongoose from "mongoose"

const projectModel = new mongoose.Schema({
	customerid:mongoose.Schema.Types.ObjectId,
	name: String,
	category: String,
	timeline: String,
	budget: String,
	file: String,
	status:String,
	description: String
},{ timestamps: true })

export const Projects = mongoose.models.projects || mongoose.model('projects', projectModel )