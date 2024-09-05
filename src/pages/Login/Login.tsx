import { yupResolver } from "@hookform/resolvers/yup";
import Button from "components/Button";
import TextInput from "components/TextInput";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { validationSchema } from "./validation";
import { useAuthStore } from "store/useAuthStore";
import { useTranslation } from "react-i18next";
import { routeVariables } from "routes/routeVariables";
import { useThemeStore } from "store/useThemeStore";
import { FC } from "react";

const Login: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { theme } = useThemeStore();
  const { login, isFetching: loading } = useAuthStore((state) => ({
    login: state.login,
    isFetching: state.isFetching,
  }));

  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    await login(data.email, data.password);
    if (useAuthStore.getState().isAuthenticated) {
      navigate(routeVariables.home);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-sidebar">
      <div className="flex p-4 bg-mainSection text-text rounded-xl md:w-[850px] w-[300px]">
        <div className="md:block hidden p-4 w-1/2 h-[450px] rounded-lg bg-[url('../public/images/hero.jpg')] bg-cover bg-no-repeat bg-center">
          <img src="/images/logo.png" className="w-52" />
          <h1 className="text-3xl text-white">Tailor {t("dashboard")}</h1>
        </div>
        <div className="flex flex-col justify-center items-center gap-4 md:w-1/2 w-full">
          <img
            src={theme === "dark" ? "/images/logo.png" : "/images/logo-black.png"}
            className="w-52 md:hidden block my-4"
          />
          <h1 className="text-text mb-5 md:mb-0 text-xl">{t("loginToDash")}</h1>
          <div className="flex flex-col gap-4 md:w-4/5 w-full">
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <TextInput name="email" placeholder="Enter your email" size="full" />
                <TextInput
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  size="full"
                />
                <Button type="submit" variant="primary" loading={loading} isFullSize>
                  {t("login")}
                </Button>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
