"use client";

const stats = [
  { value: "20+", label: "Years Experience" },
  { value: "2K+", label: "Happy Clients" },
  { value: "46", label: "Projects Completed" },
  { value: "15", label: "Awards Won" },
];

/**
 * StatsSection — terracotta background counter strip.
 */
export default function StatsSection() {
  return (
    <section className="bg-primary text-primary-foreground py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-primary-foreground/20">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center px-8 py-8 sm:py-0">
              <div className="font-heading text-5xl font-bold leading-tight">
                {stat.value}
              </div>
              <div className="text-primary-foreground/80 text-sm mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
