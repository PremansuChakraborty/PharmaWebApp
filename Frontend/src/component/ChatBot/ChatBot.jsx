import React, { useState, useRef, useEffect } from "react";
import {
  FaCommentDots,
  FaArrowAltCircleUp,
  FaWindowClose,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import axios from "axios";
import Draggable from "react-draggable";

function PaperComponent(props) {
  const nodeRef = React.useRef(null);
  return (
    <Draggable nodeRef={nodeRef} handle="#draggable-dialog-title">
      <Paper
        {...props}
        ref={nodeRef}
        style={{
          borderRadius: "12px",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
        }}
      />
    </Draggable>
  );
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const chatContentRef = useRef(null); // Reference to chat content for scrolling

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setMessages([]);
    setInput("");
  };

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "user", text: message },
    ]);
    setInput("");
    setShowQuickReplies(false); // Close quick replies dropdown

    try {
      const response = await axios.post("/api/v1/chatbot/response", {
        question: message,
      });
      const botReply =
        response.data.answer || "Sorry, I couldn't understand that.";
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "bot", text: botReply },
      ]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "bot", text: "There was an error. Please try again later." },
      ]);
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the chat content whenever messages update
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [messages]);

  const predefinedResponses = [
    "How can I book a doctor consultation?",
    "How can I track my order?",
    "How can I cancel my order?",
    "What medicines are available for cold?",
    "How can I speak to customer support?",
    "What are the payment methods available?",
  ];

  return (
    <>
      {/* Floating Chat Button */}
      <div
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 1000,
        }}
      >
        <Button
          onClick={handleClickOpen}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            boxShadow: "0px 4px 8px rgba(0,0,0,0.3)",
          }}
        >
          <FaCommentDots size={30} />
        </Button>
      </div>

      {/* Chat Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        PaperComponent={PaperComponent}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          margin: 0,
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", height: "70vh" }}
        >
          {/* Close Button */}
          <div
            style={{
              position: "absolute",
              top: 8,
              right: 8,
            }}
          >
            <button
              onClick={handleClose}
              style={{
                border: "none",
                backgroundColor: "transparent",
                color: "red",
                cursor: "pointer",
              }}
            >
              <FaWindowClose size={20} />
            </button>
          </div>

          {/* Chat Header */}
          <DialogTitle
            id="draggable-dialog-title"
            style={{
              cursor: "move",
              backgroundColor: "#4CAF50",
              color: "white",
              textAlign: "center",
              fontSize: "1.25rem",
              padding: "12px",
            }}
          >
            Welcome to Pharma ChatBot
          </DialogTitle>

          {/* Chat Content */}
          <DialogContent
            ref={chatContentRef} // Attach ref to chat content for scrolling
            style={{
              flex: 1,
              overflowY: "auto",
              backgroundColor: "#f9f9f9",
              padding: "16px",
            }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "10px",
                  textAlign: message.type === "user" ? "right" : "left",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    padding: "8px 12px",
                    borderRadius: "12px",
                    backgroundColor:
                      message.type === "user" ? "#4CAF50" : "#ddd",
                    color: message.type === "user" ? "white" : "black",
                    maxWidth: "80%",
                    wordWrap: "break-word",
                  }}
                >
                  {message.text}
                </span>
              </div>
            ))}
          </DialogContent>

          {/* Predefined Quick Replies Dropdown */}
          <DialogActions
            style={{
              padding: "8px 16px",
              borderTop: "1px solid #ddd",
              backgroundColor: "#f9f9f9",
              flexDirection: "column",
            }}
          >
            <div style={{ width: "100%", textAlign: "center" }}>
              <Button
                variant="outlined"
                onClick={() => setShowQuickReplies((prev) => !prev)}
                style={{
                  width: "100%",
                  borderColor: "#4CAF50",
                  color: "#4CAF50",
                  marginBottom: "8px",
                }}
              >
                {showQuickReplies ? (
                  <>
                    Hide Quick Messages{" "}
                    <FaChevronUp style={{ marginLeft: "8px" }} />
                  </>
                ) : (
                  <>
                    Show Quick Messages{" "}
                    <FaChevronDown style={{ marginLeft: "8px" }} />
                  </>
                )}
              </Button>
            </div>
            {showQuickReplies && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  justifyContent: "center",
                }}
              >
                {predefinedResponses.map((response, index) => (
                  <Button
                    key={index}
                    variant="outlined"
                    color="primary"
                    onClick={() => handleSendMessage(response)}
                    style={{
                      margin: "4px",
                      borderColor: "#4CAF50",
                      color: "#4CAF50",
                    }}
                  >
                    {response}
                  </Button>
                ))}
              </div>
            )}
          </DialogActions>

          {/* Input Section */}
          <DialogActions
            style={{
              padding: "8px 16px",
              borderTop: "1px solid #ddd",
              backgroundColor: "#f9f9f9",
            }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(input);
              }}
              style={{ display: "flex", width: "100%" }}
            >
              <TextField
                fullWidth
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                variant="outlined"
                size="small"
                style={{ marginRight: "10px" }}
              />
              <Button
                type="submit"
                style={{
                  backgroundColor: "#4CAF50",
                  color: "white",
                  minWidth: "48px",
                }}
              >
                <FaArrowAltCircleUp />
              </Button>
            </form>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
}
