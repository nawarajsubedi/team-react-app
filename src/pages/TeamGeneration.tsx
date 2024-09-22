import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { fetchTeams, generateBalancedTeams } from '../services/TeamService'; // Adjust your import as needed
import './team-generation.css';
import TeamCard from '../components/TeamCard';
import { TeamPlayer } from '../common/types/TeamPlayer';
import { Team } from '../common/types/Team';


interface TeamGenerationFormValues {
    teamName: string;
    selectedTeams: number[];
}

const TeamGeneration: React.FC = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<TeamGenerationFormValues>({
        defaultValues: {
            teamName: '',
            selectedTeams: [],
        },
    });

    const [teams, setTeams] = React.useState<Team[]>([]);
    const [generatedTeams, setGeneratedTeams] = React.useState<TeamPlayer[]>([]);
    const [publicLink, setPublicLink] = React.useState<string>('');
    const [formTeamName, setFormTeamName] = React.useState<string>(''); // State to hold the form team name

    useEffect(() => {
        const getTeams = async () => {
            try {
                const data: Team[] = await fetchTeams();
                setTeams(data);
            } catch (error) {
                console.error('Error fetching teams:', error);
            }
        };
        getTeams();
    }, []);

    const encodeToBase64 = (input: string): string => {
        return encodeURIComponent(btoa(input));
    };


    const generateTeams: SubmitHandler<TeamGenerationFormValues> = async (data) => {
        const { teamName, selectedTeams } = data;

        try {
            setFormTeamName(teamName)
            const pairs = await generateBalancedTeams(selectedTeams);
            setGeneratedTeams(pairs);
            setPublicLink(`${window.location.origin}/teams/${encodeURIComponent(teamName)}/${encodeToBase64(selectedTeams.join(","))}`);
        } catch (error) {
            console.error('Error generating teams:', error);
        }
    };

    return (
        <div className="team-generation">
            <div className="team-generation-section">
                <h1>Team Generation</h1>
                <form onSubmit={handleSubmit(generateTeams)}>
                    <input
                        type="text"
                        placeholder="Enter team formation name (e.g., 'Friday Futsal')"
                        {...register('teamName', { required: 'Team formation name is required' })}
                    />
                    {errors.teamName && <p className="error-message">{errors.teamName.message}</p>}

                    <div className="team-selection">
                        <h2>Select Teams</h2>
                        {teams.map((team) => (
                            <div key={team.id} className="team-checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        value={team.id}
                                        {...register('selectedTeams', {
                                            required: 'At least two teams must be selected',
                                            validate: (value) => value.length >= 2 || 'At least two teams must be selected'
                                        })}
                                    />
                                    {team.name}
                                </label>
                            </div>
                        ))}
                    </div>
                    {errors.selectedTeams && <p className="error-message">{errors.selectedTeams.message}</p>}

                    <button type="submit">Generate Teams</button>
                </form>
            </div>

            {generatedTeams.length > 0 && (
                <div className="card generated-team-card">
                    <div className="card-header">
                        Generated Teams
                    </div>
                    <div className="card-body">
                        <h2>{formTeamName}</h2>
                        <div className="generated-teams mt-5">
                            <div className="row">
                                {generatedTeams.map((teamPair, index) => (
                                    <div key={index} className="col-md-6 col-lg-4 mb-4">
                                        <TeamCard
                                            teamName={`Team ${String.fromCharCode(65 + index)}`} // Generates Team A, B, C, etc.
                                            players={teamPair.members} // Flatten members from each team
                                        />
                                    </div>
                                ))}
                            </div>
                            <p className="text-center">
                                Share this link: <a href={publicLink}>{publicLink}</a>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeamGeneration;
