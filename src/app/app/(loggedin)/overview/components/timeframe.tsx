"use client"

import React from "react";
import { Dropdown, Button, DatePicker } from "antd";
import type { MenuProps } from "antd";
import SVGComponent from "@/app/svgcomponents";
import { useState } from "react";

interface TimeFrameItem {
  key: string;
  label: string;
}

const TimeFrame = () => {
  const [value, setValue] = useState("Last 7 days");
  const { RangePicker } = DatePicker

  const timeFrame: TimeFrameItem[] = [
  { key: "last_7_days", label: "Last 7 days" },
  { key: "last_30_days", label: "Last 30 days" },
  { key: "last_90_days", label: "Last 90 days" },
];

  // handle click event
  const handleMenuClick = (e: { key: string }) => {
  const selected = timeFrame.find((item) => item.key === e.key);
  if (selected) setValue(selected.label);
};



  return (
    <div className="flex items-center justify-end gap-2 w-full text-black">

      <Dropdown
        menu={{ items: timeFrame as MenuProps["items"], onClick: handleMenuClick }}
        trigger={["click"]}
      >
        <Button className="flex items-center justify-end gap-2 cursor-pointer hover:!text-custom-orange hover:!border-custom-orange">
          <span className="text-sm">{value}</span>
          <SVGComponent src="arrowDown" />
        </Button>
      </Dropdown>

      <RangePicker size={'middle'} />

      <Button 
        className="flex items-center justify-end gap-2 cursor-pointer"
      >
        
        <div className="flex items-center gap-1">
          <span className="text-sm">Export</span>
          <SVGComponent src="arrowDown" />
        </div>
      </Button>
    </div>
  );
};

export default TimeFrame;
