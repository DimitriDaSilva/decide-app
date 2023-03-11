import { useMutation } from "@tanstack/react-query";

type LoginDto = {
  email: string;
  password: string;
};

type LoginBody = {
  body: LoginDto;
};

const fetchLogin = async ({ body }: LoginBody) => {
  return await fetch("http://localhost:3000/auth/login", {
    body: JSON.stringify(body),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const useLoginMutation = () => {
  return useMutation(async ({ body }: LoginBody) => fetchLogin({ body }));
};

export { useLoginMutation };
