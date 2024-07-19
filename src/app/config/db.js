import mongoose from "mongoose"

export const connectionSrt = "mongodb+srv://user1211:aroobazaman@cluster0.zfmckuh.mongodb.net/softwareCompany?retryWrites=true&w=majority&appName=Cluster0"

export const db = await mongoose.connect(connectionSrt)