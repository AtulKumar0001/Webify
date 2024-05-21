import BlurPage from "@/components/global/blur-page";
import React from "react";

type Props = {};

const automation = (props: Props) => {
  return (
    <BlurPage>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white">
        <div className="text-3xl font-bold mb-2">Work In Progress</div>
        <div className="text-xl">AI Bots</div>
      </div>
    </BlurPage>
  );
};

export default automation;
