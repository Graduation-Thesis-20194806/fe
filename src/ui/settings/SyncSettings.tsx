/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import BoxContainer from "@/common/components/container/BoxContainer";
import { useBoundStore } from "@/store";
import { useParams, useRouter } from "next/navigation";
import {
  AuthService,
  GithubRepoEntity,
  ProjectsService,
  UsersService,
} from "../../../client-sdk";
import { useQuery } from "@tanstack/react-query";
import {
  Avatar,
  Button,
  Checkbox,
  message,
  Modal,
  Table,
  Tag,
  Typography,
} from "antd";
import { GithubOutlined, LinkOutlined } from "@ant-design/icons";
import TitleWrapper from "@/common/components/TitleWrapper";
import { useState } from "react";
import clsx from "clsx";
const SyncSettings = () => {
  const { project_id } = useParams();
  const { userId } = useBoundStore();
  const [openOrgList, setOpenOrgList] = useState(false);
  const [openRepoList, setOpenRepoList] = useState(false);
  const [repoItems, setRepoItems] = useState<GithubRepoEntity[]>([]);
  const router = useRouter();
  const { data: user } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      if (userId) {
        const res = await UsersService.usersControllerGetMe();
        return res;
      }
      return undefined;
    },
  });
  const { data: project, refetch } = useQuery({
    queryKey: ["project", project_id],
    queryFn: async () => {
      if (project_id) {
        const res = await ProjectsService.projectsControllerGetProject(
          project_id.toString()
        );
        if (res.GithubRepo) setRepoItems(res.GithubRepo);
        return res;
      } else return undefined;
    },
  });
  const { data: githubOrgs } = useQuery({
    queryKey: ["list-github-orgs", project?.githubOrgName],
    queryFn: async () => {
      if (!project) return [];
      if (project.githubOrgName) return [];
      const res = await UsersService.usersControllerGetGithubOrgs();
      return res;
    },
  });

  const { data: githubRepos } = useQuery({
    queryKey: ["list-github-repos", project?.githubOrgName],
    queryFn: async () => {
      if (!project) return [];
      const res = await UsersService.usersControllerGetGithubProjects(
        undefined,
        undefined,
        project.githubOrgName
      );
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
  const onChooseOrganization = async (item: any) => {
    try {
      await ProjectsService.projectsControllerUpdateProject(
        project_id.toString(),
        {
          githubOrgId: item.id,
          githubOrgName: item.login,
        }
      );
      await refetch();
      setOpenOrgList(false);
      message.success("Organization Updated");
    } catch (e) {
      console.log(e);
      message.error("Something wrong");
    }
  };
  const onUpdateRepos = async () => {
    try {
      await ProjectsService.projectsControllerCreateGithubRepo(
        project_id.toString(),
        { repos: repoItems }
      );
      await refetch();
      message.success("Project repositories Updated");
      setOpenRepoList(false);
    } catch (e) {
      console.log(e);
      message.error("Something went wrong");
    }
  };
  return (
    <>
      <BoxContainer title="Synchronization Settings">
        {user?.githubId ? (
          <TitleWrapper label="Organization" className="mb-4">
            {project?.githubOrgName ? (
              <div className="border-[1px] w-fit p-2 rounded-md">
                <Typography.Link
                  href={`https://github.com/${project.githubOrgName}`}
                  target="_blank"
                >
                  {project.githubOrgName}
                </Typography.Link>
              </div>
            ) : (
              <Button
                icon={<GithubOutlined />}
                color="primary"
                variant="solid"
                onClick={() => setOpenOrgList(true)}
              >
                Choose Organization
              </Button>
            )}
          </TitleWrapper>
        ) : (
          <Button icon={<GithubOutlined />} onClick={onRegisterGithub}>
            Register Github Account
          </Button>
        )}
        <TitleWrapper label="Repository">
          {!!project?.GithubRepo?.length && (
            <Table
              columns={[
                {
                  title: `${project.GithubRepo.length} Repositories`,
                  key: "repo",
                  dataIndex: "name",
                },
              ]}
              dataSource={project.GithubRepo}
              pagination={false}
              className="app-table mb-4"
            />
          )}
          <Button
            icon={<GithubOutlined />}
            onClick={() => setOpenRepoList(true)}
          >
            Update
          </Button>
        </TitleWrapper>
      </BoxContainer>

      <Modal
        title="Github Organizations"
        centered
        open={openOrgList}
        footer={false}
        closable
        onClose={() => setOpenOrgList(false)}
        onCancel={() => setOpenOrgList(false)}
        width={500}
      >
        <ul className="flex flex-col gap-2">
          {githubOrgs?.map((item: any, idx: number) => (
            <li
              key={`ORG-${idx}`}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                {item.avatar_url ? (
                  <Avatar src={item.avatar_url} />
                ) : (
                  <Avatar icon={<GithubOutlined />} />
                )}
                <span
                  className="cursor-pointer hover:underline"
                  onClick={() => onChooseOrganization(item)}
                >
                  {item.login}
                </span>
              </div>
              <Typography.Link
                href={`https://github.com/${item.login}`}
                target="_blank"
              >
                <LinkOutlined />
              </Typography.Link>
            </li>
          ))}
        </ul>
      </Modal>
      <Modal
        title="Github Repositories"
        centered
        open={openRepoList}
        closable={false}
        onOk={onUpdateRepos}
        onCancel={() => {
          setOpenRepoList(false);
          setRepoItems(project?.GithubRepo ?? []);
        }}
        width={500}
      >
        <ul className="flex flex-col gap-3">
          {githubRepos?.map((item: any, idx: number) => (
            <li
              key={`REPO-${idx}`}
              className={clsx("flex items-center justify-between pb-2", {
                "border-b-[1px]": idx !== (githubRepos?.length ?? 0),
              })}
            >
              <div>
                <div className="font-bold underline mb-1">
                  <a target="_blank" href={item.html_url}>
                    {item.name}
                  </a>
                </div>
                <div className="text-[0.875rem] text-neutral-800 inline-flex gap-2">
                  <Tag>{item.visibility}</Tag>
                  <Tag>{item.language}</Tag>
                </div>
              </div>
              <Checkbox
                checked={
                  !!repoItems.find((repoItem) => repoItem.githubId === item.id.toString())
                }
                onClick={() => {
                  const res = repoItems.find(
                    (repoItem) => repoItem.githubId === item.id.toString()
                  );
                  if (!res) {
                    setRepoItems([
                      ...repoItems,
                      { githubId: item.id.toString(), name: item.name, owner: item.owner.login },
                    ]);
                  } else {
                    const newItems = repoItems.filter(
                      (repoItem) => repoItem.githubId !== res.githubId
                    );
                    setRepoItems(newItems);
                  }
                }}
              />
            </li>
          ))}
        </ul>
      </Modal>
    </>
  );
};

export default SyncSettings;
