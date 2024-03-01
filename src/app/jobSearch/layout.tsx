import { NextLayout } from "@/types/common";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Job!!",
};
export default function Layout({ children }: NextLayout) {
  return children;
}
