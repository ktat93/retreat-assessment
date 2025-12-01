type ResultsInfoProps = {
  showing: number;
  total: number;
  isLoading: boolean;
};

export function ResultsInfo({ showing, total, isLoading }: ResultsInfoProps) {
  return (
    <div className="text-muted-foreground mb-4 flex items-center gap-2 text-sm">
      <span>
        Showing {showing} of {total} venues
      </span>
      {isLoading && <span className="text-primary">(Loading...)</span>}
    </div>
  );
}
