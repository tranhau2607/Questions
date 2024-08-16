export const getCustomErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'This email is already in use. Please try another one.';
      case 'auth/invalid-email':
        return 'The email address is not valid.';
      case 'auth/weak-password':
        return 'The password is too weak. Please enter a stronger password.';
      case 'auth/missing-password':
        return 'Please enter a password.';
      case 'auth/invalid-credential':
        return 'Email or password is incorrect.';
      default:
        return 'An error occurred during registration. Please try again.';
    }
  };
  