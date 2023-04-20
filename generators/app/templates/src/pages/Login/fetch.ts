import Axios from "@/config/axios";
import { FetchResult } from "@/utils/data";
import { LoginParam } from "./data";

export const fetchLogin = async (
  param: LoginParam
): Promise<FetchResult<string>> => await Axios.post("/users/login", param);
