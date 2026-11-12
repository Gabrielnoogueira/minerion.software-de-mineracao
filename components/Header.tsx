import Image from "next/image";

export default function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center px-6 py-4">
        <Image
          src="/minerion-logo-footer.png"
          alt="Minerion"
          width={134}
          height={33}
          priority
        />
      </div>
    </header>
  );
}
