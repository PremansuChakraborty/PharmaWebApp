import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import { FaWindowClose, FaArrowAltCircleUp, FaCommentDots } from "react-icons/fa";
import Fab from "@mui/material/Fab";


function PaperComponent(props) {
  const nodeRef = React.useRef(null);
  return (
    <Draggable
      nodeRef={nodeRef}
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
      className='bg-red-900'
    >
      <Paper {...props} ref={nodeRef} className=" w-full md:h-1/2 h-full  rounded-full flex-col" />
    </Draggable>
  );
}

export default function ChatBot() {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState([]);
  const [input, setInput] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setMessages([]);
    setInput('');
  };

  const handleInputMessage = (message) => {
    setMessages((messages) => [...messages, message]);
    setInput("");
  };

  return (
    <React.Fragment>
              <Paper
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            borderRadius: "100%",
          }}
        >
          <Fab color="primary" onClick={()=>handleClickOpen()}>
          <FaCommentDots style={{ color: "whitesmoke" }} />
          </Fab>
        </Paper>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        className="w-full sm:w-1/2 md:w-1/3 mx-auto relative"
      >
        {/* Close Button in Upper Right Corner */}
        <div className="absolute top-2 right-2">
          <button
            onClick={handleClose}
            className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 focus:outline-none"
          >
            <FaWindowClose style={{ fontSize: "12px" }} />
          </button>
        </div>

        <DialogTitle
          className="text-xl font-bold cursor-move bg-slate-400 h-1/6"
          id="draggable-dialog-title"
        >
          ChatBot
        </DialogTitle>
        <DialogContent className="p-6 h-4/6">
          <DialogContentText className="p-3 space-y-2">
            <div>
              {messages.map((message, ind) => {
                return (
                  <div
                    className="bg-blue-300 w-fit my-2 rounded-full p-3 font-bold"
                    key={ind}
                  >
                    {message}
                  </div>
                );
              })}
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div className="flex flex-col sm:flex-row items-center p-1 bg-red-500 rounded-lg w-full">
            {/* Input Field and Button on Single Line */}
            <form className="flex w-full items-center space-x-2 h-1/6">
              <input
                type="text"
                placeholder="Enter query"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleInputMessage(input);
                }}
                className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
              >
                <FaArrowAltCircleUp style={{ fontSize: "18px" }} />
              </button>
            </form>
          </div>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
