export class Player {
  id: number;
  name: string;
  skill_level: number;
  createdAt: Date;
  updatedAt: Date | null;

  constructor(data: {
    id: number;
    name: string;
    skill_level: number;
    created_at: string;
    updated_at?: Date | null;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.skill_level = data.skill_level;
    this.createdAt = new Date(data.created_at);
    this.updatedAt = data.updated_at ? new Date(data.updated_at) : null;
  }
}
