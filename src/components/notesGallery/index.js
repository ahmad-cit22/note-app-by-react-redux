import React, { useEffect, useState } from "react";
import Note from "../note";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningIcon from "@mui/icons-material/Warning";
import CloseIcon from "@mui/icons-material/Close";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { changeState } from "../../features/noteApp/changeSlice";

const NotesGallery = () => {
  const [isExpandedDel, setIsExpandedDel] = useState(false);

  const change = useSelector((state) => state.changeDetector.value);

  const dispatch = useDispatch();

  const db = getDatabase();
  const notesRef = ref(db, "notes");

  // const [change, setChange] = useState(true);
  const [notesArr, setNotesArr] = useState([]);

  useEffect(() => {
    let arr = [];
    onValue(notesRef, (snapshot) => {
      snapshot.forEach((item) => {
        let noteInfo = {
          noteID: item.key,
          note_title: item.val().noteTitle,
          note_body: item.val().noteBody,
        };
        arr.push(noteInfo);
      });
      setNotesArr(arr);
    });
  }, [change]);

  const handleDeleteAll = () => {
    const notesDelRef = ref(db, "notes/");

    remove(notesDelRef).then(() => {
      dispatch(changeState());
    });
    setIsExpandedDel(false);
  };

  const handleDeleteAllModal = () => {
    setIsExpandedDel(true);
  };

  return (
    <section className="bg-black/10 py-8 min-h-[70vh] font-league">
      <div className="max-w-container m-auto flex mb-6">
        <PlaylistAddCheckIcon
          className="text-white"
          sx={{
            fontSize: "54px",
            color: "#ebaf09",
          }}
        />
        <h3 className="text-[#ebaf09] text-3xl font-semibold ml-2 mt-2.5">
          Saved Notes
        </h3>
        {/* delete all button */}
        <button
          className={
            "right-[8%] w-[38px] h-[38px] absolute top-[32.6%] rounded-full flex items-center justify-center shadow-lg bg-[#fff] hover:bg-[#d5d5d5] cursor-pointer linear duration-300"
          }
          onClick={handleDeleteAllModal}
        >
          <DeleteIcon
            className="text-white"
            sx={{
              fontSize: "20px",
              color: "red",
            }}
          />
        </button>
        {/* delete all button */}
      </div>

      <div className="max-w-container m-auto flex flex-wrap gap-5">
        {notesArr.map((item) => (
          <Note
            nTitle={item.note_title}
            nBody={item.note_body}
            nID={item.noteID}
          />
        ))}
      </div>

      {/* delete warning modal starts */}
      {isExpandedDel && (
        <div
          className={
            "fixed top-0 left-0 h-[120vh] w-full bg-black/20 flex justify-center items-center z-10 backdrop-blur-sm transition linear delay-0"
          }
        >
          <div
            className={
              "w-[35%] fixed h-[15%] mb-48 animate-[popUp_.1s_ease_backwards_1] text-blackish bg-white rounded-xl shadow-md pt-5 px-5 pb-14 break-words"
            }
          >
            <p className={"text-2xl pb-3 linear duration-300 font-semibold"}>
              <WarningIcon
                className="text-primary mb-2"
                sx={{
                  fontSize: "33px",
                  // color: 'red',
                }}
              />{" "}
              Are you sure to <span className="text-[red]">delete all</span> the
              notes?
            </p>

            {/* cancel delete button */}
            <button
              className={
                "right-[60px] w-[34px] h-[34px] absolute bottom-[8%] rounded-full flex items-center justify-center shadow-lg bg-[#e3e3e3] hover:bg-[#d5d5d5] cursor-pointer linear duration-300"
              }
              onClick={() => setIsExpandedDel(false)}
            >
              <CloseIcon
                className="text-white"
                sx={{
                  fontSize: "20px",
                  color: "green",
                }}
              />
            </button>
            {/* cancel delete button */}

            {/* confirm delete button */}
            <button
              className={
                "right-[16px] w-[34px] h-[34px] absolute bottom-[8%] rounded-full flex items-center justify-center shadow-lg bg-[#e3e3e3] hover:bg-[#d5d5d5] cursor-pointer linear duration-300"
              }
              onClick={() => handleDeleteAll()}
            >
              <DeleteIcon
                className="text-white"
                sx={{
                  fontSize: "20px",
                  color: "red",
                }}
              />
            </button>
            {/* confirm delete button */}
          </div>
        </div>
      )}
      {/* delete warning modal ends */}
    </section>
  );
};

export default NotesGallery;
