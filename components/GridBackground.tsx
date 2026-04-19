import { cn } from "@/lib/utils";

export function GridBackground({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 pointer-events-none w-full h-full", className)}>
      <div 
        className="absolute inset-0 bg-transparent"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          // Mask out the bottom so it fades nicely!
          maskImage: 'radial-gradient(ellipse at 50% 10%, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 10%, black 20%, transparent 80%)'
        }}
      />
    </div>
  );
}
