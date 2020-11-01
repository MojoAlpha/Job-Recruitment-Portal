import React, { useEffect, useState } from "react";
import Message from "./Message";
import io from "socket.io-client";
import { tokenAxios } from "../../api";

const ENDPOINT = "http://localhost:8000";
let socket;

export default function ChatBox(props) {
  console.log(ENDPOINT);
  const [messageList, setMessageList] = useState([]);

  const [inputMessage, setInputMessage] = useState("");

  //stores the info of user who wants t chat
  const [myDetails, setMyDetails] = useState({});

  const receiver = props.receiver;

  useEffect(() => {
    //details of the logged in user
    socket = io(ENDPOINT);

    tokenAxios
      .get(`/${"user"}/me`)
      .then((response) => {
        if (response.status == 200) {
          setMyDetails(response.data);

          const newUser = { _id: response.data._id, name: response.data.name };

          console.log(newUser);
          socket.emit("addConnection", newUser, (error) => {
            if (error) {
              alert(error);
            }
          });
        } else if (response.status == 401) {
          //todo:it means token is expired run logout function
        } else console.log(response.err);
      })
      .catch((error) => console.log(error));

    socket.on("Message", (message) => {
      setMessageList((messageList) => [...messageList, message]);
    });
  }, []);

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
