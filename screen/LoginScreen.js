import AuthContent from '../components/Auth/AuthContens'
import { useContext, useState  } from 'react';
import LoadingOverlay from '../components/ui/LodingOverlay';
import { login } from '../util/auth';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';


function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);
  
    async function LoginHandler({ email, password }) { 
      setIsAuthenticating(true);
      try{
        const token = await login(email,password)
        authCtx.authenticate(token)
      }catch(error){
        Alert.alert('Aunthication faild!','Could not log you in. Please check your credentials or try again later!')
      }
      setIsAuthenticating(false);
    }
  
    if (isAuthenticating) {
      return <LoadingOverlay message="Logging you in..." />;
    }  
  return <AuthContent isLogin onAuthenticate={LoginHandler} />;
}

export default LoginScreen;