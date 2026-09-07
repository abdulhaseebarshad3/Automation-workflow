import Image from "next/image";

const THEME_IMAGE: Record<string, string> = {
  cyan: "/images/thumb-cyan.svg",
  violet: "/images/thumb-violet.svg",
  indigo: "/images/thumb-indigo.svg",
  teal: "/images/thumb-teal.svg",
};

export function ProductThumb({
  image,
  name,
  className = "",
  sizes = "(min-width: 1024px) 320px, 50vw",
}: {
  image: string;
  name: string;
  className?: string;
  sizes?: string;
}) {
  const src = THEME_IMAGE[image] || THEME_IMAGE.cyan;
  return (
    <div className={`relative aspect-[4/3] w-full overflow-hidden bg-slate-950 ${className}`}>
      <Image
        src={src}
        alt={`${name} — n8n and AI automation workflow diagram preview`}
        fill
        sizes={sizes}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
    </div>
  );
}
