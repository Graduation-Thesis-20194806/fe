"use client";
import { useBoundStore } from "@/store";
import { Button, message, Typography } from "antd";
import { AuthService, UsersService } from "../../../client-sdk";
import { useQuery } from "@tanstack/react-query";
import TitleWrapper from "@/common/components/TitleWrapper";
import { GithubOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
const { Title } = Typography;
const MyProfileContainer = () => {
  const { userId } = useBoundStore();
  const router = useRouter()
  const { data: user } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const res = await UsersService.usersControllerGetMe();
      return res;
    },
  });
  const onRegisterGithub = async () => {
    try {
      const res = await AuthService.authControllerGithubLogin();
      router.push(res)
    } catch (e) {
      console.log(e);
      message.error("Something wrong");
    }
  };
  return (
    <div className="w-full max-w-[1200px] mx-auto py-8">
      <Title>My Project</Title>
      <TitleWrapper label="Github account">
        {user?.githubId ? (
          <div className="flex items-center gap-3"><span>{`${user.githubUsername} (${user.githubId})`}</span><Button icon={<GithubOutlined/>} onClick={onRegisterGithub}>Change</Button></div>
        ) : (
          <Button icon={<GithubOutlined />} onClick={onRegisterGithub}>Register Github Account</Button>
        )}
      </TitleWrapper>
    </div>
  );
};

export default MyProfileContainer;
