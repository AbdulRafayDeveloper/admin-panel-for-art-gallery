import { Customer } from "@/app/config/Models/customer";
import { Contact } from "@/app/config/Models/contact";
import { Projects } from "@/app/config/Models/project";

export async function customer(proc) {
  try {
    const existingContact = await Contact.findOne({ email: proc.email });
    if (existingContact) {
      let customerData = await Customer.findOne({
        contact_id: existingContact._id,
      });
      if (customerData) {
        await Customer.findByIdAndUpdate(customerData._id, {
          $inc: { projectsQuoted: 1 },
        });
      } else {
        customerData = await Customer.create({
          contact_id: existingContact._id,
          status: proc.status,
          role: proc.role,
          projectsQuoted: 1,
        });
      }
      const projectData = await Projects.create({
        customerid: customerData._id,
        name: proc.projname,
        category: proc.cat,
        timeline: proc.timeline,
        budget: proc.budget,
        file: proc.file,
        status: proc.status,
        description: proc.description,
      });

      return { existingContact, customerData, projectData };
    } else {
      const newContact = await Contact.create({
        name: proc.name,
        email: proc.email,
        number: proc.number,
        city: proc.city,
        country: proc.country,
        role: proc.role,
      });

      const newCustomer = await Customer.create({
        contact_id: newContact._id,
        status: proc.status,
        role: proc.role,
        projectsQuoted: 1,
      });
      const projectData = await Projects.create({
        customerid: newCustomer._id,
        name: proc.projname,
        category: proc.cat,
        timeline: proc.timeline,
        budget: proc.budget,
        file: proc.file,
        status: proc.status,
        description: proc.description,
      });
      return { newContact, newCustomer, projectData };
    }
  } catch (error) {
    console.error("Error in customer function:", error);
    throw error;
  }
}
