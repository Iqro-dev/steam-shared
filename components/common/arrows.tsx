import { MoveLeft, MoveRight } from "lucide-react";

export function Arrows() {
  return (
    <div className="flex flex-col justify-center items-center px-2">
      <MoveRight size={48} strokeWidth={3} />

      <MoveLeft size={48} strokeWidth={3} />
    </div>
  );
}
