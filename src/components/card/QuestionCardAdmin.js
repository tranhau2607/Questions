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
import { CiLocationArrow1 } from "react-icons/ci";

const StyledCard = styled(Card)({
  width: "300px",
  margin: "20px",
  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  borderRadius: "10px",
  border: "1px solid #ccc",
});

const CardFront = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  borderRadius: "10px",
  color: "#072626",
});

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

  return (
    <StyledCard>
      <CardActionArea sx={{ height: "100%" }}>
        <CardFront>
          {role === "admin" && (
            <>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                User: {question.displayName}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {question.question}
              </Typography>
            </>
          )}

          {role === "user" && showAnswer && (
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                overflow: "hidden",
                whiteSpace: "normal",
              }}
            >
              {question.answer}
            </Typography>
          )}

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

          {role === "admin" && !showAnswer && (
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
                <IconButton
                  onClick={handleUpdate}
                  color="primary"
                  disabled={answer.trim() === ""}
                >
                  <Typography variant="body2">
                    <CiLocationArrow1 style={{ fontSize: "1.5rem" }} />
                  </Typography>
                </IconButton>
                <IconButton onClick={() => onDelete(question.id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          )}
        </CardFront>
      </CardActionArea>
    </StyledCard>
  );
};

export default QuestionCardAdmin;
