"use client";

import { cn } from "@/lib/utils";

interface ScoreRingProps {
  score: number;
  size?: number;
  className?: string;
  label?: string;
}

export function ScoreRing({ score, size = 100, className, label }: ScoreRingProps) {
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - score / 100);

  const color =
    score >= 80
      ? "var(--primary)"
      : score >= 60
        ? "var(--amber)"
        : "var(--destructive)";

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--border)"
          strokeWidth="5"
        />
        {/* Score arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ animation: "score-fill 1s ease-out forwards" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="font-bold tabular-nums leading-none"
          style={{ fontSize: size * 0.28, color }}
        >
          {score}
        </span>
        {label && (
          <span className="text-muted-foreground mt-0.5" style={{ fontSize: size * 0.1 }}>
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
