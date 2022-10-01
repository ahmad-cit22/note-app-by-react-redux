import React from "react";
import EventNoteIcon from "@mui/icons-material/EventNote";

const Header = () => {
  return (
    <header className="bg-primary pt-8 pb-6 text-white font-league">
      <div className="max-w-container m-auto">
        <h1 className="text-4xl font-bold">
          {" "}
          <EventNoteIcon fontSize="large" className="mb-2" /> NoteBox
        </h1>
      </div>
    </header>
  );
};

export default Header;
