"use client";

import React from "react";
import { useConfigureProviders } from "../hooks/context";

interface ProviderCardProps {
  logo: string;
  name: string;
  service: string;
  status: "active" | "pending" | "error";
  successRate?: string;
  volume: string;
  providerId?: string;
  id?: number;
  existingCredentials?: Record<string, string>;
  actionButton: {
    label: string;
    variant: "configure" | "activate" | "fix";
  };
}

const ProviderCard: React.FC<ProviderCardProps> = ({
  logo,
  name,
  service,
  status,
  successRate,
  volume,
  providerId,
  id,
  existingCredentials,
  actionButton,
}) => {
  const { openModal } = useConfigureProviders();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "error":
      case "revoked":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getActionButtonStyle = (variant: string) => {
    switch (variant) {
      case "configure":
        return "bg-gradient-to-br from-[#1a4d70] via-[#165aa0] to-[#0a2b90] hover:from-[#10618c]";
      case "activate":
        return "bg-yellow-600 text-white hover:bg-yellow-700";
      case "fix":
        return "bg-red-600 text-white hover:bg-red-700";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  const handleActionClick = () => {
    if (actionButton.variant === "configure") {
      openModal({
        name,
        service,
        status,
        successRate,
        volume,
        providerId,
        id,
        existingCredentials,
        isNew: false,
      });
    } else if (actionButton.variant === "activate") {
      console.log("Activate clicked");
    } else if (actionButton.variant === "fix") {
      openModal({
        name,
        service,
        status,
        successRate,
        volume,
        providerId,
        id,
        existingCredentials,
        isNew: false,
      });
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 gap-4 transition-shadow flex flex-col items-between justify-center">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start space-x-3">
          <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-white font-semibold">
            {logo}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{name}</h3>
            <p className="text-sm text-gray-600">{service}</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <div
            className={`w-2 h-2 rounded-full ${getStatusColor(status)}`}
          ></div>
          <span
            className={`text-sm font-medium capitalize ${
              status === "active"
                ? "text-green-600"
                : status === "pending"
                ? "text-yellow-600"
                : "text-red-600"
            } `}
          >
            {status}
          </span>
        </div>
      </div>

      <div className="space-y-3 ">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Success Rate</span>
          <span
            className={`text-sm font-medium ${
              successRate > "50" ? "text-green-600" : "text-red-600"
            }`}
          >
            {successRate || 0}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Last 30 Days Volume</span>
          <span className="text-sm font-medium text-black">{volume || 0}</span>
        </div>
      </div>

      <div className="flex items-center justify-center w-full">
        <button
          onClick={handleActionClick}
          className={`
     hover:via-[#2c6ec1] hover:to-[#1239b5]
    text-white w-full px-4 py-2 cursor-pointer rounded-lg text-sm font-medium
    flex items-center justify-center space-x-2
    ${getActionButtonStyle(actionButton.variant)}
  `}
        >
          <span className="text-white">{actionButton.label}</span>
        </button>
      </div>
    </div>
  );
};

export default ProviderCard;
