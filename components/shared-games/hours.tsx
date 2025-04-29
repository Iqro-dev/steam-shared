export interface HoursProps {
  name: string;
  firstPlayerHours: number;
  secondPlayerHours: number;
}

export function Hours({ name, firstPlayerHours, secondPlayerHours }: HoursProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-lg font-semibold">{name}</span>

      <span className="text-sm text-muted">{firstPlayerHours} hours</span>

      <span className="text-sm text-muted">{secondPlayerHours} hours</span>
    </div>
  );
}
