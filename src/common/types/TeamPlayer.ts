export interface TeamMember {
  id: number;
  name: string;
  skill_level: number;
}

export class TeamPlayer {
  id: number;
  name: string;
  members: TeamMember[];

  constructor(data: { id: number; name: string; members: TeamMember[] }) {
    this.id = data.id;
    this.name = data.name;
    this.members = data.members;
  }
}
