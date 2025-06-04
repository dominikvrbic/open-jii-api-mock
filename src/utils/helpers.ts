import { v4 as uuidv4 } from "uuid";

export const formatResponse = (data: any, message: string = "Success") => {
  return {
    status: "success",
    message,
    data,
  };
};

export const generateUniqueId = () => {
  return uuidv4();
};

export const handleError = (error: any) => {
  return {
    status: "error",
    message: error.message || "An unexpected error occurred",
  };
};
