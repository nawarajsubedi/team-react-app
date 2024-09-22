import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// import { saveTitle, updateTitle } from "../services/PlayerService";

import "bootstrap-icons/font/bootstrap-icons.css";
import "./note-title-editor.css";

interface NoteTitleEditorProps {
    title: string;
    id?: string;
}

const NoteTitleEditor: React.FC<NoteTitleEditorProps> = ({
    title: initialTitle,
    id,
}) => {
    const [title, setTitle] = useState<string>(initialTitle);
    const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);
    const [tempTitle, setTempTitle] = useState<string>(initialTitle);
    const [isSavingTitle, setIsSavingTitle] = useState<boolean>(false);
    const navigate = useNavigate(); // Initialize navigate

    const storeTitle = useCallback(async () => {
        setIsSavingTitle(true);
        try {
            // const result = id
            //     ? await updateTitle(tempTitle, Number(id))
            //     : await saveTitle(tempTitle);
            // if (result?.id) {
            //     navigate(`/console/note-editor/${result.id}`); // Redirect to the new note's URL
            // }

            // setTitle(tempTitle);
            console.log("Title saved successfully!");
        } catch (error) {
            console.error("Error saving title:", error);
        } finally {
            setIsSavingTitle(false);
        }
    }, [tempTitle, id]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (tempTitle !== title) {
                storeTitle();
            }
        }, 1500);

        return () => clearTimeout(timeoutId);
    }, [tempTitle, title, storeTitle]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTempTitle(e.target.value);
    };

    const handleTitleClick = () => {
        setIsEditingTitle(true);
        setTempTitle(title);
    };

    const handleTitleBlur = () => {
        setIsEditingTitle(false);
    };

    const handleSaveClick = () => {
        storeTitle();
        setIsEditingTitle(false);
    };

    const handleCancelClick = () => {
        setTempTitle(title);
        setIsEditingTitle(false);
    };

    useEffect(() => {
        setTempTitle(initialTitle);
        setTitle(initialTitle);
    }, [initialTitle]);

    return (
        <div className="note-title-editor">
            {isEditingTitle ? (
                <>
                    <input
                        type="text"
                        value={tempTitle}
                        onChange={handleTitleChange}
                        onBlur={handleTitleBlur}
                        className="note-title-input"
                        autoFocus
                    />
                    <button onClick={handleSaveClick} className="note-title-button save-button">
                        <i className="bi bi-check"></i>
                    </button>
                    <button onClick={handleCancelClick} className="note-title-button cancel-button">
                        <i className="bi bi-trash-fill"></i>
                    </button>
                </>
            ) : (
                <h2 onClick={handleTitleClick} className="note-title">
                    {title}
                </h2>
            )}
            {isSavingTitle && <span className="saving-indicator">Saving...</span>}
        </div>
    );
};

export default NoteTitleEditor;
