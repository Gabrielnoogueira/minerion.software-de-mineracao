import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-grey/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center px-6 py-4">
        <Image
          src="/minerion-logo.png"
          alt="Minerion"
          width={140}
          height={48}
          priority
        />
      </div>
    </header>
  );
}
