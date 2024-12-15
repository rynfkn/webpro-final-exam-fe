"use client";
import NavLink from "@/components/atoms/navbar/NavLink";
import { useEffect, useState } from "react";

type PanelLink = {
  href: string;
  label: string;
};

const panelLinks: PanelLink[] = [
  {
    href: "/dashboard",
    label: "Personal",
  },
  {
    href: "/dashboard/communal",
    label: "Communal",
  },
];

export default function Navbar() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRole(localStorage.getItem("role"));
    }
  }, []);

  const isAdmin = role === "Admin";

  return (
    <header className="sticky z-50 top-0 flex items-center w-full h-16 gap-4 border-b bg-background">
      <nav className="container hidden md:flex justify-between">
        <div className="flex flex-row items-center font-medium gap-5 text-sm mx-10">
        {panelLinks.map((link) => {

          if (link.label === "Communal" && !isAdmin) {
            return null;
          }

          return (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          );
        })}
        </div>
      </nav>
    </header>
  );
}
