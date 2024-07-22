import { Customer } from "@/app/config/Models/customer";
import { Contact } from "@/app/config/Models/contact";

export async function customer(proc){

	try{

		const data1 = await Contact.create({
			name: proc.name,
			email: proc.email,
			number: proc.number,
			city: proc.city,
			description: proc.description
		});

		const data2 = await Customer.create({
			_id: data1._id,
			name: proc.projname,
			category: proc.cat,
			timeline: proc.timeline,
			budget: proc.budget,
			file: proc.file
		})

		return (data1 , data2)

	}catch(error)
	{
		return 
	}
}