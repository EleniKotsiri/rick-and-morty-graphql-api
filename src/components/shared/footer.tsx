import { Divider } from "@heroui/react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Divider />
      <footer className="container px-3 sm:px-5 w-full mx-auto mt-auto bg-background">
        <div className="text-center sm:text-start">
          <div className="py-5 text-sm text-muted-foreground">
            Copyright © {currentYear} Eleni Kotsiri
          </div>
        </div>
      </footer>
    </>
  );
}
