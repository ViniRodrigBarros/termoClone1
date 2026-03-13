import { UserModel, userFromObject } from "../models/user.model";
import client from "../repositories/client";

export const login = async (
  email: string,
  password: string,
): Promise<UserModel> => {
  try {
    const response = await client.post("/auth/login", { email, password });
    // Converte a resposta da API para UserModel
    return userFromObject(response.data);
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
