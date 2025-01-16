"use client";
import { useBoundStore } from "@/store";
import { Avatar, Button, message, Typography, Upload } from "antd";
import { AuthService, UpdateUserDto, UsersService } from "../../../client-sdk";
import { useQuery } from "@tanstack/react-query";
import TitleWrapper from "@/common/components/TitleWrapper";
import { GithubOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import AppInput from "@/common/components/AppInput";
import { getS3Link } from "@/common/helpers/link";
const { Title } = Typography;
const MyProfileContainer = () => {
  const { userId } = useBoundStore();
  const router = useRouter();
  const { control, reset } = useForm<UpdateUserDto>();
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
      router.push(res);
    } catch (e) {
      console.log(e);
      message.error("Something wrong");
    }
  };
  useEffect(() => {
    reset(user);
  }, [user]);
  return (
    <div className="w-full max-w-[1200px] mx-auto py-8">
      <Title>My Profile</Title>
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex flex-col gap-3 items-center">
          {user?.avatar ? (
            <Avatar src={getS3Link(user.avatar)} size={100} />
          ) : (
            <Avatar icon={<UserOutlined />} size={100} />
          )}
          <Upload accept="image/*">
            <Button>Update Avatar</Button>
          </Upload>
        </div>
        <TitleWrapper label="Github account">
          {user?.githubId ? (
            <div className="flex items-center gap-3">
              <span>{`${user.githubUsername} (${user.githubId})`}</span>
              <Button icon={<GithubOutlined />} onClick={onRegisterGithub}>
                Change
              </Button>
            </div>
          ) : (
            <Button icon={<GithubOutlined />} onClick={onRegisterGithub}>
              Register Github Account
            </Button>
          )}
        </TitleWrapper>
      </div>
      <form>
        <div className="flex flex-col gap-4">
          <TitleWrapper label="Username">
            <Controller
              control={control}
              name="username"
              render={({ field: { value, onChange } }) => (
                <AppInput disabled value={value} onChange={onChange} />
              )}
            />
          </TitleWrapper>
          <TitleWrapper label="Email">
            <Controller
              control={control}
              name="email"
              render={({ field: { value, onChange } }) => (
                <AppInput disabled value={value} onChange={onChange} />
              )}
            />
          </TitleWrapper>
          <TitleWrapper label="Phone number">
            <Controller
              control={control}
              name="phoneNumber"
              render={({ field: { value, onChange } }) => (
                <AppInput value={value} onChange={onChange} />
              )}
            />
          </TitleWrapper>
          <TitleWrapper label="Address">
            <Controller
              control={control}
              name="address"
              render={({ field: { value, onChange } }) => (
                <AppInput value={value} onChange={onChange} />
              )}
            />
          </TitleWrapper>
          <TitleWrapper label="Fullname">
            <Controller
              control={control}
              name="fullname"
              render={({ field: { value, onChange } }) => (
                <AppInput value={value} onChange={onChange} />
              )}
            />
          </TitleWrapper>
          <Button type="primary" variant="solid" className="w-[200px]">
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MyProfileContainer;
