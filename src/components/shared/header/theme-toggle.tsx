"use client";
import { useTheme } from "next-themes";
import { useState, useEffect, useMemo } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { SunIcon, MoonIcon, SunMoon } from "lucide-react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();
  const current = (theme ?? "system") as "system" | "light" | "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  const triggerIcon = useMemo(() => {
    const effective = current === "system" ? systemTheme : current;
    switch (effective) {
      case "dark":
        return <MoonIcon size={14} />;
      case "light":
        return <SunIcon size={14} />;
      default:
        return <SunMoon size={14} />;
    }
  }, [current, systemTheme]);

  if (!mounted) return null;

  return (
    <Dropdown>
      <DropdownTrigger asChild>
        <Button
          isIconOnly
          variant="ghost"
          aria-label="Change theme"
          className="focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          {theme === "system" ? (
            <SunMoon />
          ) : theme === "dark" ? (
            <MoonIcon />
          ) : (
            <SunIcon />
          )}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Theme"
        selectionMode="single"
        disallowEmptySelection
        selectedKeys={new Set([current])}
        onSelectionChange={(keys) => {
          const value = Array.from(keys)[0] as "system" | "light" | "dark";
          setTheme(value);
        }}
      >
        <DropdownItem key="system" startContent={<SunMoon size={14} />}>
          System
        </DropdownItem>
        <DropdownItem key="light" startContent={<SunIcon size={14} />}>
          Light
        </DropdownItem>
        <DropdownItem key="dark" startContent={<MoonIcon size={14} />}>
          Dark
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
