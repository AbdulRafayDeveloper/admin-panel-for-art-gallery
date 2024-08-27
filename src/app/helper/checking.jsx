import jwt from "jsonwebtoken";
import { Employees } from "../config/Models/employees";

const JWT_SECRET = "SecurityInsure";

async function verifyTokenAndRole(req) {
  const token = req.headers.get("authorization")?.split(" ")[1];

  if (!token) {
    return {
      status: 401,
      message: "No token provided",
      data: null,
    };
  }

  let decoded;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return {
        status: 401,
        message: "Token has expired",
        data: null,
      };
    } else {
      return {
        status: 403,
        message: "Invalid token",
        data: null,
      };
    }
  }
  const employee = await Employees.findById(decoded.id);
  if (employee) {
    if (employee.role !== "admin") {
      return {
        status: 403,
        message: "Admin role required",
        data: null,
      };
    }
  } else {
    return {
      status: 403,
      message: "Invalid access",
      data: null,
    };
  }
  return {
    status: 200,
    message: "Access granted",
    data: decoded,
  };
}

export default verifyTokenAndRole;
