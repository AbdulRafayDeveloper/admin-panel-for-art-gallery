import mongoose from "mongoose"

const messagesModel = new mongoose.Schema({
	contact_id: mongoose.Schema.Types.ObjectId,
	description: String,
},{ timestamps: true })

export const Messages = mongoose.models.messages || mongoose.model('messages', messagesModel )