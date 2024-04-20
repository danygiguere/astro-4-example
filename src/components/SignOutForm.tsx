import { navigate } from "astro/virtual-modules/transitions-router.js";
import { type FormEvent } from "react";

interface SignOutFormProps {
  locale: string,
  translations: {
    button: string
  };
}

const SignInForm: React.FC<SignOutFormProps> = ({ locale, translations }) => {
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const response = await fetch(`/api/signout`, {
      method: "POST",
      headers: {
        "Accept-Language": locale,
      },
      body: formData,
    });
    if (response.status == 200) {
      navigate(`/${locale}`);
    }
  }

  return (
    <>
      <form onSubmit={submit} method="post" className="inline-block">
        <button className="p-2">{translations.button}</button>
      </form>
    </>
  );
};

export default SignInForm;