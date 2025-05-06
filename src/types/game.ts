
export interface TeamType {
  name: string;
  logo: string;
  votes: number;
  winner?: boolean;
}

export interface GameType {
  id: number;
  homeTeam: TeamType;
  awayTeam: TeamType;
  time: string;
  status: string;
  homeScore?: number;
  awayScore?: number;
  correct?: boolean;
}
