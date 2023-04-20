import Axios from "@/config/axios";

export const fetchUser = async (): Promise<void> =>
  await Axios.get("/users", {});

export const fetchCreateUser = async (): Promise<void> =>
  await Axios.post("/createUser", {});

export const fetchSTStoken = async (): Promise<void> =>
  await Axios.post("/getSTStoken", {});
