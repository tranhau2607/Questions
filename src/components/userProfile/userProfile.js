import React, { useState, useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import axios from 'axios'
import {
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Divider,
  Container,
  Button,
  Grid,
  CircularProgress
} from '@mui/material'
import './userProfile.css'
const QUESTIONS_PER_PAGE = 10

const UserProfile = () => {
  const [user, setUser] = useState(null)
  const [questionHistory, setQuestionHistory] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [expandedQuestion, setExpandedQuestion] = useState(null)
  useEffect(() => {
    const auth = getAuth()
    const currentUser = auth.currentUser
    console.log('currentUser', currentUser)

    if (currentUser) {
      setUser({
        username: currentUser.displayName || 'Anonymous',
        email: currentUser.email
      })

      //API Test: https://66931ef7c6be000fa079c642.mockapi.io/KhangLPSE161421/Test
      //API Real: https://66938e56c6be000fa07c1307.mockapi.io/question/tamplmse182726
      axios
        .get('https://66931ef7c6be000fa079c642.mockapi.io/KhangLPSE161421/Test')
        .then(response => {
          const questions = response.data
          const userQuestions = questions.filter(
            question => question.uid === currentUser.uid
          )
          const sortedQuestions = userQuestions.sort((a, b) =>
            a.uid.localeCompare(b.uid)
          )
          setQuestionHistory(sortedQuestions)
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching question history:', error)
        })
        .finally(() => {
          setLoading(false);
        })
    }
  }, [])

  const totalPages = Math.ceil(questionHistory.length / QUESTIONS_PER_PAGE)
  const startIndex = (currentPage - 1) * QUESTIONS_PER_PAGE
  const currentQuestions = questionHistory.slice(
    startIndex,
    startIndex + QUESTIONS_PER_PAGE
  )

  const handleExpandQuestion = id => {
    setExpandedQuestion(expandedQuestion === id ? null : id)
  }

  if (loading) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='100vh'
      >
        <CircularProgress color='secondary' />
      </Box>
    )
  }

  if (loading) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='100vh'
      >
        <CircularProgress color='secondary' />
      </Box>
    );
  }

  return (
    <Container maxWidth='lg' sx={{ height: '100vh' }}>
      <Box
        sx={{ margin: '0 auto', p: 3, display: 'flex', flexDirection: 'row' }}
      >
        {user && (
          <>
            <Container>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ mr: 2 }}>{user.username[0]}</Avatar>
                <Typography variant='h5'>{user.username}</Typography>
              </Box>
              <Typography variant='body1' color='textSecondary'>
                {user.email}
              </Typography>
            </Container>

            <Divider sx={{ my: 2 }} />
            <Container
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              >
                <Typography variant='h6' sx={{ mb: 1 }}>
                  Question Post History
                </Typography>
                <List>
                  {currentQuestions.length > 0 ? (
                    currentQuestions.map(question => (
                      <ListItem key={question.id}>
                        <ListItemText
                          primary={
                            <>
                              {expandedQuestion === question.id
                                ? question.question
                                : `${question.question.slice(0, 50)}...`}
                              {question.question.length > 50 && (
                                <Button
                                  onClick={() =>
                                    handleExpandQuestion(question.id)
                                  }
                                  size='small'
                                  sx={{ ml: 1, textTransform: 'none' }}
                                >
                                  {expandedQuestion === question.id
                                    ? 'Show less'
                                    : 'Show more'}
                                </Button>
                              )}
                            </>
                          }
                        />
                      </ListItem>
                    ))
                  ) : (
                    <Typography variant='body2' color='textSecondary'>
                      No questions posted yet.
                    </Typography>
                  )}
                </List>
                <Grid
                  container
                  spacing={2}
                  justifyContent='center'
                  alignItems={'center'}
                >
                  <Grid item>
                    <button
                      variant='contained'
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(prevPage => prevPage - 1)}
                      className='userProfile-button'
                    >
                      Previous
                    </button>
                  </Grid>
                  <Grid item>
                    <Typography variant='body2'>{`Page ${currentPage} of ${totalPages}`}</Typography>
                  </Grid>
                  <Grid item>
                    <button
                      variant='contained'
                      disabled={
                        currentPage === totalPages ||
                        currentQuestions.length === 0
                      }
                      onClick={() => setCurrentPage(prevPage => prevPage + 1)}
                      className='userProfile-button'
                    >
                      Next
                    </button>
                  </Grid>
                </Grid>
              </Box>
              {/* <List>
                {currentQuestions.length > 0 ? (
                  currentQuestions.map(question => (
                    <ListItem key={question.id}>
                      <ListItemText
                        primary={
                          <>
                            {expandedQuestion === question.id
                              ? question.question
                              : `${question.question.slice(0, 50)}...`}
                            {question.question.length > 50 && (
                              <Button
                                onClick={() =>
                                  handleExpandQuestion(question.id)
                                }
                                size='small'
                                sx={{ ml: 1, textTransform: 'none' }}
                              >
                                {expandedQuestion === question.id
                                  ? 'Show less'
                                  : 'Show more'}
                              </Button>
                            )}
                          </>
                        }
                      />
                    </ListItem>
                  ))
                ) : (
                  <Typography variant='body2' color='textSecondary'>
                    No questions posted yet.
                  </Typography>
                )}
              </List>
              <Grid container spacing={2} justifyContent='center' alignItems={'center'}>
                <Grid item>
                  <Button
                    variant='contained'
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prevPage => prevPage - 1)}
                    className='userProfile-button'
                  >
                    Previous
                  </Button>
                </Grid>
                <Grid item>
                  <Typography variant='body2'>{`Page ${currentPage} of ${totalPages}`}</Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant='contained'
                    disabled={
                      currentPage === totalPages ||
                      currentQuestions.length === 0
                    }
                    onClick={() => setCurrentPage(prevPage => prevPage + 1)}
                  className='userProfile-button'
                  >
                    Next
                  </Button>
                </Grid>
              </Grid> */}
            </Container>
          </>
        )}
      </Box>
    </Container>
  )
}

export default UserProfile
