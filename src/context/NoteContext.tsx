import {ReactNode, createContext, useCallback, useContext, useState } from "react";

//Create custom React Context for notes

type NoteContextType = {
    notes: string[];
    addNote: (note: string) => void;
    clearNotes: () => void;
}

//creates context object
const NoteContext = createContext<NoteContextType | undefined>(undefined);

//provider; manages state & provides methods for context
const NoteProvider = ({children}: {children: ReactNode})=> {
    const [notes, setNotes] = useState<string[]>([]);

    //useCallback() allows us to reuse addNote() instead of being recreated(w diff reference) in useEffect
    const addNote = useCallback((note: string)  => {
        setNotes(prevNotes => [...prevNotes, note]);
    }, [])

    const clearNotes = () => {
        setNotes([]);
    }

    return (
        <NoteContext.Provider value={{notes, addNote, clearNotes}}>
            {children}
        </NoteContext.Provider>
    )
}

const useNotes = () => {
    const context = useContext(NoteContext);


    if (context === undefined) {
        throw new Error('useNotes must be used inside a message provider')
    }
    return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export {NoteProvider, useNotes}