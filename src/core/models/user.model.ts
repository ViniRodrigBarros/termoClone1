export interface UserModel {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Converte UserModel para JSON
export const userToJson = (user: UserModel): string => {
  return JSON.stringify({
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password,
  });
};

// Cria UserModel a partir de JSON
export const userFromJson = (json: string): UserModel => {
  const data = JSON.parse(json);
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    password: data.password,
  };
};

// Cria UserModel a partir de objeto (útil para respostas de API)
export const userFromObject = (data: any): UserModel => {
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    password: data.password,
  };
};

// Converte UserModel para objeto (útil para enviar para API)
export const userToObject = (user: UserModel): Record<string, any> => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password,
  };
};
