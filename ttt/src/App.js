import { useState } from "react";
import './App.css';
import Login from './components/login';
import SignUp from './components/signup';
import { StreamChat} from "stream-chat";
import {Chat} from "stream-chat-react";
import Cookies from "universal-cookie";
import JoinGame from "./components/JoinGame";


function App() {
  const api_key = "vvav5cnjvu9t";
  const cookies = new Cookies();
  const client = StreamChat.getInstance(api_key);
  const token = cookies.get("token");
  const [isAuth, setisAuth] = useState(false);
  
  const logOut = () => {
    cookies.remove("token");
      cookies.remove("userId");
      cookies.remove("username");
      cookies.remove("firstName");
      cookies.remove("lastName");
      cookies.remove("hashedPassword");
      client.disconnectUser();
      setisAuth(false);
  }

  if (token) {
    client.connectUser({
      id: cookies.get("userId"),
      name: cookies.get("username"),
      firstName: cookies.get("firstName"),
      lastName: cookies.get("lastName"),
      hashedPassword: cookies.get("hashedPassword"),
    },
    token
    ).then((user) => {
      setisAuth(true);
    });
  }
  return (
    <div className="App">
    {isAuth ? (
      <Chat client={client}>
      <JoinGame />
      <button onClick={logOut}>logout</button>
      </Chat>
    ) : (
      <>
      <SignUp setisAuth={setisAuth} />
      <Login setisAuth={setisAuth} />
      </>
      )}
    </div>
  );
}

export default App;
