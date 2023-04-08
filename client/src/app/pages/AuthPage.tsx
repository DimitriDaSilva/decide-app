import { useNavigate, useParams } from 'react-router-dom';

import { ReactComponent as ColorLogo } from '@/assets/logos/logo-color.svg';
import { useLoginMutation } from '@/entities/auth/api/useLoginMutation';
import { useSignUpMutation } from '@/entities/auth/api/useSignupMutation';
import { AuthDto, AuthResponseDto } from '@/entities/auth/types';

import { routePaths } from '../routePaths';
import { Input } from '../components/forms/Input';
import { Page } from '../components/layout/Page';
import { setAccessTokenCookie } from '../../utils/auth';

interface AuthFormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

interface AuthFormElement extends HTMLFormElement {
  readonly elements: AuthFormElements;
}

const labels = {
  login: {
    header: 'Log in to the Decide app',
    ctaButton: 'Log in',
  },
  signup: {
    header: 'Create your Decide account',
    ctaButton: 'Sign up',
  },
};

type AuthMode = {
  authMode: 'login' | 'signup';
};

const AuthPage = () => {
  const { mutateAsync: login } = useLoginMutation();
  const { mutateAsync: signup } = useSignUpMutation();
  const navigate = useNavigate();
  const { authMode } = useParams<AuthMode>();

  const handleOnSubmit = async (e: React.FormEvent<AuthFormElement>) => {
    e.preventDefault();

    const target = e.currentTarget.elements;

    const body = {
      email: target.email.value,
      password: target.password.value,
    } as AuthDto;

    let data: AuthResponseDto;

    if (authMode === 'login') {
      data = await login({ body });
    } else {
      data = await signup({ body });
    }

    setAccessTokenCookie(data.access_token);
    navigate(routePaths.tables);
  };

  if (!authMode) {
    navigate(routePaths.pageNotFound);
    return null;
  }

  return (
    <Page className="fixed w-full h-full bg-gradient-to-b from-darkBg via-darkBg to-third justify-center gap-y-10">
      <ColorLogo />

      <p>{labels[authMode].header}</p>

      <form className="flex flex-col gap-y-6 w-72" onSubmit={handleOnSubmit}>
        <Input
          label="Email"
          id="email"
          type="email"
          placeholder="Enter your email address"
        />
        <Input
          label="Password"
          id="password"
          type="password"
          placeholder="Enter your password"
        />

        <button
          type="submit"
          className="mt-5 rounded-sm bg-primary px-5 py-4 placeholder-gray-base focus:outline focus:outline-primary outline-offset-1"
        >
          {labels[authMode].ctaButton}
        </button>
      </form>
    </Page>
  );
};

export { AuthPage };
