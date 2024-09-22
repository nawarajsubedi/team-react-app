import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// import { saveContent, updateContent } from '../services/PlayerService';

import './note-content-editor.css'

interface NoteContentEditorProps {
    initialContent: string;
}

const NoteContentEditor: React.FC<NoteContentEditorProps> = ({ initialContent }) => {
    const { id } = useParams<{ id?: string }>();
    const noteId = id ? Number(id) : undefined;
    const [content, setContent] = useState<string>(initialContent);
    const [isSavingContent, setIsSavingContent] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        setContent(initialContent);
    }, [initialContent]);

    const handleSaveContent = useCallback(async () => {
        setIsSavingContent(true);
        // try {
        //     let result;
        //     if (!noteId) {
        //         result = await saveContent(content);
        //         if (result && result.id) {
        //             navigate(`/console/note-editor/${result.id}`);
        //         }
        //     } else {
        //         await updateContent(content, noteId);
        //         console.log('Content saved successfully!');
        //         navigate(`/console/note-editor/${noteId}`);
        //     }
        // } catch (error) {
        //     console.error('Error saving content:', error);
        // } finally {
        //     setIsSavingContent(false);
        // }
    }, [content, noteId, navigate]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (content) {
                handleSaveContent();
            }
        }, 2000);

        return () => clearTimeout(timeoutId);
    }, [content, handleSaveContent]);

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    return (
        <div>
            <textarea
                value={content}
                onChange={handleContentChange}
                placeholder="Start typing your note..."
                className="note-textarea"
            />
            <div>{isSavingContent ? 'Saving content...' : 'Content saved.'}</div>
        </div>
    );
};

export default NoteContentEditor;
