"use client";

import { Input, Button } from "@heroui/react";
import { Search, X } from "lucide-react";

type Props = {
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  className?: string;
};

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search characters by name",
  className,
}: Props) {
  return (
    <div className={className}>
      <Input
        aria-label="Search characters by name"
        value={value}
        onValueChange={onChange}
        placeholder={placeholder}
        variant="bordered"
        size="lg"
        startContent={
          <Search className="h-4 w-4 text-foreground/60" aria-hidden />
        }
        endContent={
          value ? (
            <Button
              isIconOnly
              variant="light"
              size="sm"
              onPress={() => onChange("")}
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </Button>
          ) : null
        }
        classNames={{
          inputWrapper: "bg-content-2",
        }}
      />
    </div>
  );
}
