import { ChangeEvent, useState } from "react";
import { useNotes } from "../context/NoteContext";
import toast, { Toaster } from "react-hot-toast";

const notify = () => toast.success('note added!', {
  style: {
    border: '1px solid #2e3192',
    padding: '16px',
    color: '#2e3192',
  },
  iconTheme: {
    primary: '#19b5ff',
    secondary: '#FFFAEE',
  },
});

export default function Notes() {
  const { notes, clearNotes, addNote } = useNotes();
  const [newNote, setNewNote] = useState("");

  const noteChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewNote(event.target.value);
  };

  const addNoteToList = () => {
    addNote(newNote);
    notify();
  };

  return (
    <div>
      <div className="flex flex-col gap-2 mb-5 p-2 border-b">
        <label className='text-2xl text-[#2e3192]'>Notes</label>
        <input
          placeholder='add a note..'
          className='border border-[#2e3192] rounded-lg p-2 w-full'
          value={newNote}
          onChange={noteChange}
        />
        <button onClick={addNoteToList} className="btn">Add Note</button>
        <Toaster position="bottom-center"
          reverseOrder={false} />
      </div>
      <div className="flex gap-3">
        <button className="btn" onClick={clearNotes}>
          Clear Notes
        </button>
      </div>
      {notes.map((n, i) => (
        <div key={i} className="my-2">{n}</div>
      ))}
    </div>
  );
}