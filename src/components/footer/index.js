import React from 'react'

const Footer = () => {
  let year = new Date().getFullYear();
  return (
    <footer className="bg-black/10 pt-8 pb-4 font-league">
      <div className="max-w-container m-auto text-center text-black/70">
        <p>Copyright ⓒ NoteBox {year}</p>
      </div>
    </footer>
  );
}

export default Footer