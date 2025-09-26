"use client";
import { Navbar, NavbarBrand } from "@heroui/react";
import ThemeToggle from "./theme-toggle";

export default function Header() {
  return (
    <header className="w-full">
      <Navbar
        maxWidth="full"
        isBordered
        role="navigation"
        aria-label="Primary"
        className="!px-0"
        classNames={{ base: "!px-0", wrapper: "!px-0" }}
      >
        <div className=" mx-auto container px-3 sm:px-5 flex justify-between items-center py-2 md:py-6">
            <NavbarBrand className="min-w-0">
              <span className="font-semibold max-w-[280px] sm:max-w-none">
                The Rick and Morty API
              </span>
            </NavbarBrand>

          <ThemeToggle />
        </div>
      </Navbar>
    </header>
  );
}
