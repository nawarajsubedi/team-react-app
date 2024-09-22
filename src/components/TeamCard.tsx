import { Player } from "../common/types/Player";
import { TeamMember } from "../common/types/TeamPlayer";

interface TeamCardProps {
    teamName: string; // Team name
    players: TeamMember[];
}

const TeamCard: React.FC<TeamCardProps> = ({ teamName, players }) => {
    return (
        <div className="mb-4">
            <div className="card">
                <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">{teamName}</h5>
                </div>
                <div className="card-body">
                    {players.length > 0 ? (
                        <ul className="list-group list-group-flush">
                            {players.map((player) => (
                                <li key={player.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <span>{player.name}</span>
                                    <div>
                                        <span className="badge bg-primary me-2">{player.skill_level}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center">No players in this team.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeamCard;
