import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16">
      <div className="w-full max-w-md border border-white/10 bg-black/20 px-6 py-10 text-center backdrop-blur-sm">
        <p className="text-xs uppercase tracking-[0.3em] text-white/45">404</p>
        <h1 className="mt-4 text-2xl font-medium tracking-[-0.03em] text-white sm:text-3xl">
          This page does not exist.
        </h1>
        <Link
          href="/"
          className="mt-8 inline-flex text-sm text-white/60 transition-colors hover:text-white"
        >
          Back home
        </Link>
      </div>
    </main>
  );
}
