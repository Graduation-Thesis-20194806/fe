'use client';
import AppButton from "@/common/components/AppButton";
import AppInput from "@/common/components/AppInput";
import { message } from "antd";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { AuthService } from "../../../client-sdk";
import { useRouter } from "next/navigation";
import { setStorage } from "@/common/helpers/storage";
import TitleWrapper from "@/common/components/TitleWrapper";
import { LoginData, LoginSchema } from "@/common/validate/login";
import { yupResolver } from "@hookform/resolvers/yup";

export default function LoginComponent() {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: yupResolver(LoginSchema),
  });

  const handleLogin = useCallback(
    async ({ email, password }: LoginData) => {
      try {
        const res = await AuthService.authControllerLogin({
          email,
          password,
        });
        const storage = "local";
        setStorage("token", res.accessToken, storage);
        setStorage("refresh_token", res.refreshToken, storage);
        setStorage("user", JSON.stringify(res.user), storage);
        message.success("Login successfully");
        router.push(`/`);
      } catch (e) {
        console.log(e);
        message.error("There are something wrong");
      }
    },
    [router]
  );

  const moveToRegister = useCallback(() => {
    router.push(`/register`);
  }, [router]);

  const moveToForgotPassword = useCallback(() => {
    router.push(`/forgot-password`);
  }, [router]);

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <Controller
        control={control}
        name="email"
        render={({ field: { value, onChange } }) => (
          <TitleWrapper label={"Email"} error={errors.email?.message}>
            <AppInput
              placeholder={"abc@example.com"}
              error={errors.email?.message}
              value={value}
              onChange={onChange}
              className="mb-4"
            />
          </TitleWrapper>
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { value, onChange } }) => (
          <TitleWrapper
            label={"Password"}
            error={errors.password?.message}
          >
            <AppInput
              type="password"
              error={errors.password?.message}
              value={value}
              onChange={onChange}
            />
          </TitleWrapper>
        )}
      />
      <AppButton
        text={"Forgot password?"}
        type="link"
        onClick={moveToForgotPassword}
      />
      <AppButton type="primary" text={"Login"} className="mb-4 block" htmlType="submit"/>
      <div className="flex justify-center items-center">
        <p className="text-center text-sm font-normal text-[#475467] mr-1">
          {"Create new account"}
        </p>
        <AppButton text={"Sign up"} type="link" onClick={moveToRegister} />
      </div>
    </form>
  );
}
