import React, { useEffect, useState } from "react";
import { generateBalancedTeams } from "../services/TeamService";
import "./team-generation.css";
import TeamCard from "../components/TeamCard";
import { TeamPlayer } from "../common/types/TeamPlayer";

const TeamGeneration: React.FC = () => {
    const [teamIds, SetTeamIds] = useState<number[]>([]);
    const [generatedTeams, setGeneratedTeams] = React.useState<TeamPlayer[]>([]);
    const [teamName, setTeamName] = React.useState<string>("");

    useEffect(() => {
        const decodeBase64 = (base64: string): number[] => {
            const decodedString = decodeURIComponent(atob(base64));
            return decodedString.split(",").map((str) => Number(str))
        };

        const url = window.location.href;
        const parts = url.split("/");
        const base64Part = parts[parts.length - 1];
        const teamNamePart = parts[parts.length - 2];

        try {
            const numbersArray = decodeBase64(base64Part);
            setTeamName(decodeURIComponent(teamNamePart))
            SetTeamIds(numbersArray);
        } catch (error) {
            console.error("Error decoding Base64:", error);
        }
    }, []);

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await generateBalancedTeams(teamIds);
                setGeneratedTeams(data);
            } catch (error) {
                console.error("Error fetching teams:", error);
            }
        };
        getData();
    }, [teamIds]);

    return (
        <div className="team-generation">
            {generatedTeams.length > 0 && (
                <div className="card generated-team-card">
                    <div className="card-body">
                        <h2>{teamName}</h2>
                        <div className="generated-teams mt-5">
                            <div className="row">
                                {generatedTeams.map((teamPair, index) => (
                                    <div key={index} className="col-md-6 col-lg-4 mb-4">
                                        <TeamCard
                                            teamName={`Team ${String.fromCharCode(65 + index)}`}
                                            players={teamPair.members}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeamGeneration;
