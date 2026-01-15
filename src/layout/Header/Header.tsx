import React from "react";
import { PageHeader } from "@/components/PageHeader";

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return <PageHeader title={title} />;
};
