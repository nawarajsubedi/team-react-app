export class Team {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date | null;

  constructor(data: {
    id: number;
    name: string;
    created_at: string;
    updated_at?: Date | null;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.createdAt = new Date(data.created_at);
    this.updatedAt = data.updated_at ? new Date(data.updated_at) : null;
  }
}
