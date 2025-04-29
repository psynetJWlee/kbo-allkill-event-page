
export interface TeamType {
  name: string;
  logo: string;
  votes: number;
}

export interface GameType {
  id: number;
  homeTeam: TeamType;
  awayTeam: TeamType;
  time: string;
  status: string;
}
