export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40">
      <div className="skeleton aspect-[4/3] w-full" />
      <div className="flex flex-col gap-3 p-4">
        <div className="skeleton h-3 w-24 rounded-full" />
        <div className="skeleton h-4 w-4/5 rounded-full" />
        <div className="skeleton h-3 w-full rounded-full" />
        <div className="flex items-center justify-between pt-2">
          <div className="skeleton h-5 w-16 rounded-full" />
          <div className="skeleton h-8 w-24 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
