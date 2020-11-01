import React, { useEffect, useState } from "react";
import Message from "./Message";
import io from "socket.io-client";
import { tokenAxios } from "../../api";

const ENDPOINT = "http://localhost:8000";

export default function ChatBox(props) {
  console.log(props.SOCKET);
  const socket = props.SOCKET;
  const [messageList, setMessageList] = useState([]);

  const [inputMessage, setInputMessage] = useState("");

  //stores the info of user who wants t chat
  const [myDetails, setMyDetails] = useState({});

  const receiver = props.receiver;

  useEffect(() => {
    //details of the logged in user
    tokenAxios.get(`/user/me`)
      .then(response => {
        if (response.status == 200){
          setMyDetails(response.data)
        }
        else
          console.log(response.err)
      })
      .catch(error => {
        console.log(error)
        if (error.message === 'Network Error')
          alert("internet lgwa le garib aadmi")
      })
  }, []);

  useEffect(() => {
    socket.on("Message", (message) => {
      setMessageList((messageList) => [...messageList, message]);
    });
  },[messageList])

  const messages = messageList.map((message) => (
    <Message
      text={message.msg}
      alignment={message.sender == myDetails._id ? "right" : "left"}
    />
  ));

  //handling the change of any input fields
  const handleChange = (event) => {
    setInputMessage(event.target.value);
  };

  const sendMessage = (event) => {

    event.preventDefault();

    const m = {
      msg: inputMessage,
      sender: myDetails._id,
      receiver: receiver,
    };
    messageList.push(m);

    socket.emit("sendMessage", m, () => setInputMessage(""));
  };
  return (
    <div>
      <div className="overflow-auto">{messages}</div>

      <div
        style={{
          position: "fixed",
          width: "100%",
          bottom: 50,
        }}
      >
        <form
          className="d-flex w-25"
          style={{
            position: "fixed",
            right: 50,
          }}
        >
          <input
            onChange={handleChange}
            value={inputMessage}
            className=""
            style={{ width: "75%" }}
          />
          <button onClick={sendMessage} className="btn btn-primary w-25">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
