"use client";
import { MockTrend } from "@/__test__/MockData";
import { useEffect, useState } from "react";
import TrendItem from "./TrendItem";

const Mock_Data = MockTrend;
interface SidebarTrendProps {
  sidebar?: boolean;
}
const SidebarTrendList = ({ sidebar }: SidebarTrendProps) => {
  return (
    <>
      <article
        className={`flex flex-col ${
          sidebar ? `bg-hoverProfile` : `bg-white`
        } rounded-lg`}
      >
        <div className="h-12 py-3 px-4 text-[21.5px] font-bold">
          Trends for you
        </div>
        {Mock_Data?.map((data, idx) => (
          <TrendItem key={`${idx}+ ${data.category}`} {...data} />
        ))}
      </article>
    </>
  );
};

export default SidebarTrendList;
