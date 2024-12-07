/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import AppButton from "@/common/components/AppButton";
import AppInput from "@/common/components/AppInput";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { AuthService } from "../../../client-sdk";
import TitleWrapper from "@/common/components/TitleWrapper";
import { RegisterData, RegisterSchema } from "@/common/validate/register";
import { yupResolver } from "@hookform/resolvers/yup";
import { message } from "antd";

export default function RegisterComponent() {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: yupResolver(RegisterSchema),
  });

  const handleRegister = useCallback(
    async (data: RegisterData) => {
      try {
        await AuthService.authControllerRegister(data);
        message.success("Register successfully");
        router.push(`/login`);
      } catch (error: any) {
        message.error(error.message);
      }
    },
    [router]
  );

  const moveToLogin = useCallback(() => {
    router.push(`/login`);
  }, [router]);

  return (
    <form onSubmit={handleSubmit(handleRegister)}>
      <Controller
        control={control}
        name="fullname"
        render={({ field: { value, onChange } }) => (
          <TitleWrapper
            label={"Full Name"}
            error={errors.fullname?.message}
            isRequired
            className="mb-4"
          >
            <AppInput
              placeholder={"Enter your full name"}
              error={errors.fullname?.message}
              value={value}
              onChange={onChange}
            />
          </TitleWrapper>
        )}
      />
      <Controller
        control={control}
        name="username"
        render={({ field: { value, onChange } }) => (
          <TitleWrapper
            label={"User Name"}
            error={errors.username?.message}
            isRequired
            className="mb-4"
          >
            <AppInput
              placeholder={"Enter an user name"}
              error={errors.username?.message}
              value={value}
              onChange={onChange}
            />
          </TitleWrapper>
        )}
      />
      <Controller
        control={control}
        name="phoneNumber"
        render={({ field: { value, onChange } }) => (
          <TitleWrapper
            label={"Phone Number"}
            error={errors.phoneNumber?.message}
            isRequired
            className="mb-4"
          >
            <AppInput
              placeholder={"Enter phone number"}
              error={errors.phoneNumber?.message}
              value={value}
              onChange={onChange}
            />
          </TitleWrapper>
        )}
      />
      <Controller
        control={control}
        name="email"
        render={({ field: { value, onChange } }) => (
          <TitleWrapper
            label={"Email"}
            error={errors.email?.message}
            isRequired
            className="mb-4"
          >
            <AppInput
              placeholder={"abc@example.com"}
              error={errors.email?.message}
              value={value}
              onChange={onChange}
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
            className="mb-4"
            isRequired
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
      <Controller
        control={control}
        name="repassword"
        render={({ field: { value, onChange } }) => (
          <TitleWrapper
            label={"Confirm Password"}
            error={errors.repassword?.message}
            className="mb-4"
            isRequired
          >
            <AppInput
              type="password"
              error={errors.repassword?.message}
              value={value}
              onChange={onChange}
            />
          </TitleWrapper>
        )}
      />
      <AppButton text={"Register"} className="mb-4" htmlType="submit" />
      <div className="flex justify-center items-center">
        <AppButton text={"Back to Login"} type="link" onClick={moveToLogin} />
      </div>
    </form>
  );
}
