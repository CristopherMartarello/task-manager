import { useState } from "react";
import Header from "./Header";

const Tasks = () => {
  const [messages, setMessages] = useState(["Hello World", "2", "3", "4"]);
  const [inputValue, setInputValue] = useState("Digite o nome da tarefa");

  const handleButtonClick = () => {
    setMessages([...messages, inputValue]);
  };

  return (
    <div>
      <Header>
        <h1>Add Tasks</h1>
      </Header>
      <input
        className="input"
        type="text"
        placeholder="Create your task"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button className="button" onClick={handleButtonClick}>
        Add task
      </button>

      <Header>
        <h1>My Tasks</h1>
      </Header>
      <div>
        <ul>
          {messages.map((message) => (
            <li key={message}>{message}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Tasks;
