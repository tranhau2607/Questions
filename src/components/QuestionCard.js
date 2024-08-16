import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, CardActionArea } from '@mui/material';
import { styled } from '@mui/system';

const CardFront = styled(CardContent)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '200px',
  backgroundColor: '#f5f5f5',
});

const CardBack = styled(CardContent)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '200px',
  backgroundColor: '#e0e0e0',
});

const QuestionCard = ({ question }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Card sx={{ maxWidth: 345, margin: '20px auto' }}>
      <CardActionArea onClick={handleFlip}>
        {isFlipped ? (
          <CardBack>
            <Typography variant="body1" color="text.secondary">
              {question.answer}
            </Typography>
          </CardBack>
        ) : (
          <CardFront>
            <Typography variant="h6" component="div">
              {question.question}
            </Typography>
          </CardFront>
        )}
      </CardActionArea>
    </Card>
  );
};

export default QuestionCard;
