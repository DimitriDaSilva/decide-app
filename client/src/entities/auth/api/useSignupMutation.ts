import { apiEndpoints } from "@/entities/apiEndpoints";
import { useMutation } from "@tanstack/react-query";
import { AuthDto } from "../types";

type SignUpBody = {
  body: AuthDto;
};

const signUp = async ({ body }: SignUpBody) => {
  console.log(import.meta.env.VITE_API_BASE_URL);
  return await fetch(
    import.meta.env.VITE_API_BASE_URL + apiEndpoints.auth.signup,
    {
      body: JSON.stringify(body),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const useSignUpMutation = () => {
  return useMutation(async ({ body }: SignUpBody) => signUp({ body }));
};

export { useSignUpMutation };
