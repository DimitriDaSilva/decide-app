import { apiEndpoints } from "@/entities/apiEndpoints";
import { useMutation } from "@tanstack/react-query";

type LoginDto = {
  email: string;
  password: string;
};

type LoginBody = {
  body: LoginDto;
};

const login = async ({ body }: LoginBody) => {
  console.log(import.meta.env.VITE_API_BASE_URL);
  return await fetch(
    import.meta.env.VITE_API_BASE_URL + apiEndpoints.auth.login,
    {
      body: JSON.stringify(body),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const useLoginMutation = () => {
  return useMutation(async ({ body }: LoginBody) => login({ body }));
};

export { useLoginMutation };
