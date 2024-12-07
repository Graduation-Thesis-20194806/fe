"use client";
import AppLogo from "@/common/components/AppLogo";
import { getStorage } from "@/common/helpers/storage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getStorage("token", "local");
    if (token) {
      router.push(`/`);
    }
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, [router]);

  return loading ? (
    <></>
  ) : (
    <>
      <div
        className="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-no-repeat flex justify-end items-center z-10"
        style={{ backgroundImage: "url('images/background.png')" }}
      >
        <div className="md:backdrop-blur-[18px] h-full w-full md:w-1/2 flex justify-center items-center px-7">
          <div className="w-full md:w-[388px] rounded-lg p-5 bg-white shadow">
            <AppLogo fontSize={40} className="mb-4" />
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
