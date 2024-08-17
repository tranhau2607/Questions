import React, { useEffect, useState } from "react";
import axios from "axios";
import QuestionCard from "../components/QuestionCard";

const HomePage = () => {
  const [questions, setQuestions] = useState([]);
  const role = localStorage.getItem("role");

  useEffect(() => {
    axios
      .get(
        "https://66938e56c6be000fa07c1307.mockapi.io/question/tamplmse182726"
      )
      .then((response) => setQuestions(response.data));
  }, []);

  const handleAddQuestion = (question) => {
    axios
      .post(
        "https://66938e56c6be000fa07c1307.mockapi.io/question/tamplmse182726",
        question
      )
      .then((response) => setQuestions([...questions, response.data]));
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
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Q&A</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {questions.map((q) => (
          <QuestionCard key={q.id} question={q} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
