import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  TextField,
  Box,
  CardActionArea,
} from "@mui/material";
import { styled } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";

const StyledCard = styled(Card)({
  width: "300px",
  margin: "20px",
  boxShadow: "none",
  borderRadius: "10px",
});
const CardFace = styled(CardContent)({
  position: "absolute",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backfaceVisibility: "hidden", // Hide the back face when the front is visible
  backgroundColor: "#f5f5f5",
  border: "1px solid #ccc",
  borderRadius: "10px",
  boxShadow: "none",
});
const CardFront = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  backgroundColor: "#f5f5f5",
  border: "1px solid #ccc",
  borderRadius: "10px",
  padding: "16px",
  boxShadow: "none",
});
const CardBack = styled(CardFace)({
  backgroundColor: "#e0e0e0",
  transform: "rotateY(180deg)", // Rotate the back face to align it correctly
});

const CardInner = styled("div")(({ isFlipped }) => ({
  position: "relative",
  width: "100%",
  height: "100%",
  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
  transformStyle: "preserve-3d",
  transition: "transform 0.6s ease-in-out",
  borderRadius: "10px",
}));
const QuestionCardAdmin = ({ question, onUpdate, onDelete }) => {
  const [answer, setAnswer] = useState(question.answer || "");
  const [showAnswer, setShowAnswer] = useState(!!question.answer);
  const role = sessionStorage.getItem("role");

  const handleUpdate = () => {
    onUpdate(question.id, { ...question, answer });
    setShowAnswer(true);
    toast.success("Answered successfully");
  };

  useEffect(() => {
    setAnswer(question.answer || "");
    setShowAnswer(!!question.answer);
  }, [question.answer]);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  return (
    <StyledCard>
      <CardActionArea onClick={handleFlip} sx={{ height: "100%" }}>
        <CardInner isFlipped={isFlipped}>
          <CardFront>
            <Typography variant="h6" component="div" gutterBottom>
              {question.question}
            </Typography>

            {/*Hiển thị câu trả lời bên user*/}
            {role !== "admin" && showAnswer && (
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  overflow: "hidden",
                  whiteSpace: "normal",
                }}
              >
                Admin: {question.answer}
              </Typography>
            )}
            {/*Hiển thị câu trả lời bên admin*/}
            {role === "admin" && showAnswer && (
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  overflow: "hidden",
                  whiteSpace: "normal",
                }}
              >
                Admin: {answer}
              </Typography>
            )}
            {role === "admin" && (
              <Box>
                <TextField
                  label="Answer"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  marginTop="5px"
                >
                  <IconButton onClick={handleUpdate} color="primary">
                    <Typography variant="body2">Reply</Typography>
                  </IconButton>
                  <IconButton
                    onClick={() => onDelete(question.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            )}
          </CardFront>
          <CardBack>
            <Typography variant="body1" color="text.secondary">
              {question.answer}
            </Typography>
          </CardBack>
        </CardInner>
      </CardActionArea>
    </StyledCard>
  );
};

export default QuestionCardAdmin;
