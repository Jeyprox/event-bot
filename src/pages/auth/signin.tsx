import { signIn } from "next-auth/client";

const SignIn = () => {
  return (
    <>
      <button onClick={() => signIn()}>Sign in with asd</button>
    </>
  );
};

export default SignIn;
