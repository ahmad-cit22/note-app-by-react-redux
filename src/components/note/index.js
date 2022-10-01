import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CheckIcon from "@mui/icons-material/Check";
import WarningIcon from "@mui/icons-material/Warning";
import CloseIcon from "@mui/icons-material/Close";
import { getDatabase, ref, remove, update } from "firebase/database";
import { useDispatch } from "react-redux";
import { changeState } from "../../features/noteApp/changeSlice";

const Note = ({ nTitle, nBody, nID }) => {
  const dispatch = useDispatch();
  const db = getDatabase();

  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");
  const [errMSg, setErrMSg] = useState("");

  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpandedDel, setIsExpandedDel] = useState(false);
  const handleTitle = (e) => {
    setNoteTitle(e.target.value);
    setErrMSg("");
  };

  const handleBody = (e) => {
    setNoteBody(e.target.value);
    setErrMSg("");
  };

  const expandNote = () => {
    setIsExpanded(true);
    setNoteTitle(nTitle);
    setNoteBody(nBody);
  };

  const handleDeleteModal = () => {
    setIsExpandedDel(true);
  };

  const handleDelete = (id) => {
    const notesDelRef = ref(db, "notes/" + id);

    remove(notesDelRef).then(() => {
      dispatch(changeState());
    });
    setIsExpandedDel(false);
    setIsExpanded(false);
  };

  const handleEdit = (id) => {
    if (noteTitle == "") {
      setErrMSg(`You must give a title for your note!`);
    } else if (noteTitle.length > 45) {
      setErrMSg(`The title must not exceed 45 characters!`);
    } else if (noteBody == "") {
      setErrMSg(`Your note can't be empty!`);
    } else {
      const notesEditRef = ref(db, "notes/" + id);
      update(notesEditRef, {
        noteTitle: noteTitle,
        noteBody: noteBody,
      }).then(() => {
        dispatch(changeState());
        setNoteTitle("");
        setNoteBody("");
      });
      setIsExpanded(false);
    }
  };

  const handleEditCancel = () => {
    setIsExpanded(false);
    setErrMSg("");
  };

  // const closeEditModal = () => {
  //   setIsExpanded(false);
  // };

  return (
    // note container starts
    <div
      className={`${
        isExpanded
          ? "fixed top-0 left-0 h-full w-full bg-black/20 flex justify-center items-center z-10 backdrop-blur-sm transition linear delay-0"
          : "w-[23.5%]"
      }`}
    >
      <div
        className={`${
          isExpanded
            ? "absolute min-h-[45%] min-w-[800px] px-7 animate-[popUp_.2s_ease_backwards_1]"
            : "w-full relative pl-5 pr-6 animate-[popDown_.2s_ease_1] min-h-[228px]"
        } text-blackish bg-white rounded-xl shadow-md pt-6 pb-14 break-words transition linear delay-0`}
      >
        {isExpanded ? (
          <>
            {/* note edit field starts */}
            <input
              className={
                "text-2xl pb-5 pt-1 px-4 linear duration-300 font-semibold w-full outline-none"
              }
              defaultValue={nTitle}
              placeholder={"Update title here"}
              onChange={handleTitle}
            />
            <textarea
              className={
                "text-[22px] px-4 outline-none border-none rounded-b-2xl resize-none w-full text-justify"
              }
              rows={noteBody.length > 500 ? 14 : 5}
              defaultValue={nBody}
              placeholder={"Update note here"}
              onChange={handleBody}
            />

            {/* error message */}
            {errMSg != "" && (
              <p className="text-xl ml-4 text-[red] animate-[popUpY_.2s_ease_1]">
                {errMSg}
              </p>
            )}
            {/* error message */}

            {/* note edit field ends */}
          </>
        ) : (
          <>
            {/* note display field starts */}
            <p
              className={`${
                isExpanded ? "text-2xl pb-3" : "text-xl pb-2"
              } linear duration-300 font-semibold`}
            >
              {nTitle}
            </p>
            <p
              className={`${
                isExpanded ? "text-xl" : "text-lg"
              } linear duration-300 text-justify`}
            >
              {nBody.length <= 110 ? nBody : `${nBody.slice(0, 110)}...`}
            </p>
            {/* note display field ends */}
          </>
        )}

        {/* Delete button */}
        <button
          className={`${
            isExpanded
              ? "right-[118px] w-[34px] h-[34px]"
              : "right-[52px] w-[30px] h-[30px]"
          } absolute bottom-[5.5%] rounded-full flex items-center justify-center shadow-lg bg-[#e3e3e3] hover:bg-[#d5d5d5] cursor-pointer linear duration-300`}
          onClick={handleDeleteModal}
        >
          <DeleteIcon
            className="text-white"
            sx={{
              fontSize: `${isExpanded ? "20px" : "16px"}`,
              color: "red",
            }}
          />
        </button>
        {/* Delete button */}

        {isExpanded ? (
          <>
            {/* edit field close button */}
            <button
              className={`${
                isExpanded
                  ? "w-[34px] h-[34px] right-[73px] "
                  : "w-[30px] h-[30px] right-[50px] "
              } absolute bottom-[5.5%] rounded-full flex items-center justify-center shadow-lg bg-[#e3e3e3] hover:bg-[#d5d5d5] cursor-pointer linear duration-300`}
              onClick={handleEditCancel}
            >
              <CloseIcon
                sx={{
                  fontSize: `${isExpanded ? "20px" : "16px"}`,
                  color: "black",
                }}
              />
            </button>
            {/* edit field close button */}

            {/* edit confirm button */}
            <button
              className={`${
                isExpanded
                  ? "w-[34px] h-[34px] right-[28px]"
                  : "w-[30px] h-[30px] right-[10px]"
              } absolute bottom-[5.5%] rounded-full flex items-center justify-center shadow-lg bg-[#e3e3e3] hover:bg-[#d5d5d5] cursor-pointer linear duration-300`}
              onClick={() => handleEdit(nID)}
            >
              <CheckIcon
                className="text-white"
                sx={{
                  fontSize: `${isExpanded ? "20px" : "16px"}`,
                  fontWeight: "bold",
                  color: "green",
                }}
              />
            </button>
            {/* edit confirm button */}
          </>
        ) : (
          <>
            {/* edit field open button */}
            <button
              className="absolute bottom-[5.5%] right-[13px] w-[30px] h-[30px] rounded-full flex items-center justify-center shadow-lg bg-[#e9ab00] hover:bg-[#f0c241] hover:text-[#e2e2e2] cursor-pointer linear duration-300"
              onClick={expandNote}
            >
              <ArrowForwardIosIcon
                className="text-white"
                sx={{ fontSize: "16px", fontWeight: "bold" }}
              />
            </button>
            {/* edit field open button */}
          </>
        )}
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
                }}
              />{" "}
              Are you sure to delete this note?
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
              onClick={() => handleDelete(nID)}
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
    </div>
  );
};

export default Note;
