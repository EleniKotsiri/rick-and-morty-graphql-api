import { Divider } from "@heroui/react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Divider />
      <footer className="container w-full mx-auto mt-auto bg-background">
        <div className="text-center px-3 sm:px-5 sm:text-start">
          <div className="py-5 text-sm text-muted-foreground">
            Copyright © {currentYear} Eleni Kotsiri
          </div>
        </div>
      </footer>
    </>
  );
}
