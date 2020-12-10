import auth from '@react-native-firebase/auth';

const getToken = async (user) => {
  if (!user) {
    return '';
  }
  const token = await user.getIdToken();
  return token;
};

export const loginOrRegister = async (email, password) => {
  try {
    const { user } = await auth().signInWithEmailAndPassword(email, password);
    const token = await getToken(user);
    return { user: { email, uid: user.uid, token } };
  } catch ({ message, code }) {
    if (code === 'auth/user-not-found') {
      const { user } = await auth().createUserWithEmailAndPassword(email, password);
      const token = await getToken(user);
      return { user: { email, uid: user.uid, token } };
    }
    return { error: true, message };
  }
};

export const onAuthState = (callback) => auth().onAuthStateChanged(callback);

export const singOut = () => auth().signOut();
