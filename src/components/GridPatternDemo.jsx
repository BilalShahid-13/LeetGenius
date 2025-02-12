import { cn } from "../lib/utils";
import { GridPattern } from "./magicui/grid-pattern";

export function GridPatternDemo({ children }) {
  return (
    <div className="fixed h-screen flex  w-full flex-col items-center justify-center  rounded-lg border bg-background">
      <GridPattern
        squares={[
          [4, 4],
          [5, 1],
          [8, 2],
          [5, 3],
          [5, 5],
          [10, 10],
          [12, 15],
          [15, 10],
          [10, 15],
          [15, 10],
          [10, 15],
          [15, 10],
        ]}
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
        )}
      />
      {children}
    </div>
  );
}
