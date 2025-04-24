
export type Team = {
  id: string;
  name: string;
  logo: string;
  voteCount: number;
};

export type GameStatus = "투표중" | "종료" | "경기중";

export type Game = {
  id: number;
  homeTeam: Team;
  awayTeam: Team;
  status: GameStatus;
  time?: string;
  score?: string;
};
