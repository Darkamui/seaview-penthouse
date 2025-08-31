import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-card py-12 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <Image
          src="/images/logo-crop.png"
          alt="The Sea View Penthouse"
          width={240}
          height={240}
          className="mx-auto mb-4"
        />
        <p className="text-sm text-muted-foreground">
          © 2025 J-Web. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
