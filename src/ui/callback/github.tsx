"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { AuthService } from "../../../client-sdk";
import { message } from "antd";

const GithubCallBackContainer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  useEffect(() => {
    if (code) {
      AuthService.authControllerGithubCallback(code)
        .catch(() => {
          message.error("Something wrong");
        })
        .finally(() => {
          router.push("/profile");
        });
    }
  }, [code, router]);
  return <></>;
};
export default GithubCallBackContainer;
