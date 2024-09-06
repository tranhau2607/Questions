import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import QuestionCard from "../components/card/QuestionCard";
import QuestionCardAdmin from "../components/card/QuestionCardAdmin";
import QuestionForm from "../components/card/QuestionForm";
import { Button, Box, CircularProgress } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "./HomePage.css";

const HomePage = () => {
  const [questions, setQuestions] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const role = sessionStorage.getItem("role");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      console.log("currentUser", currentUser);
    } else {
      console.log("No user is currently logged in.");
    }

    axios
      .get(
        "https://66938e56c6be000fa07c1307.mockapi.io/question/tamplmse182726"
      )
      .then((response) => {
        setQuestions(response.data);
        setLoading(false);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleAddQuestion = (question) => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      const newQuestion = {
        ...question,
        uid: currentUser.uid,
        displayName: currentUser.displayName || "Name",
      };

      axios
        .post(
          "https://66938e56c6be000fa07c1307.mockapi.io/question/tamplmse182726",
          newQuestion
        )
        .then((response) => setQuestions([...questions, response.data]))
        .catch((error) => console.error("Error posting question:", error));
    } else {
      console.error("No user is currently logged in.");
    }
  };

  const handleUpdateQuestion = (id, updatedQuestion) => {
    axios
      .put(
        `https://66938e56c6be000fa07c1307.mockapi.io/question/tamplmse182726/${id}`,
        updatedQuestion
      )
      .then((response) =>
        setQuestions(questions.map((q) => (q.id === id ? response.data : q)))
      );
  };

  const handleDeleteQuestion = (id) => {
    axios
      .delete(
        `https://66938e56c6be000fa07c1307.mockapi.io/question/tamplmse182726/${id}`
      )
      .then(() => setQuestions(questions.filter((q) => q.id !== id)));
    toast.success("Deleted successfully");
  };

  const checkLogin = () => {
    if (role === "admin") {
      return questions.map((q) => (
        <QuestionCardAdmin
          key={q.id}
          question={q}
          onUpdate={handleUpdateQuestion}
          onDelete={handleDeleteQuestion}
        />
      ));
    }

    return questions.map((q) => (
      <QuestionCard
        key={q.id}
        question={q}
        handleUpdateQuestion={handleUpdateQuestion}
        handleDeleteQuestion={handleDeleteQuestion}
      />
    ));
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  return (
    <div className="gradient-background">
      {role === "user" && (
        <Box display="flex" justifyContent="center" marginBottom="20px">
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenPopup}
            sx={{
              padding: "10px 20px",
              color: "black",
              fontSize: "14px",
              fontWeight: "bold",
              borderRadius: "30px",
              backgroundColor: "#ffffff",
              "&:hover": {
                background: "linear-gradient(135deg, #dadaff, #ffd8e5)",
              },
            }}
          >
            Ask Questions
          </Button>
        </Box>
      )}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {checkLogin()}
      </div>
      <QuestionForm
        open={isPopupOpen}
        handleClose={handleClosePopup}
        handleAddQuestion={handleAddQuestion}
      />
      <ToastContainer />
    </div>
  );
};

export default HomePage;
