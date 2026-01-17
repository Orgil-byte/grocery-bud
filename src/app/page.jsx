"use client";
import { useState } from "react";

export default function Main() {
  return (
    <div>
      <Page />
    </div>
  );
}

const Page = () => {
  return (
    <div className="min-h-75 w-full flex items-end justify-center">
      <Container />
    </div>
  );
};

const Container = () => {
  const [line, setLine] = useState(false);
  const [input, setInput] = useState("");
  const [renderInput, setRenderInput] = useState([]);

  const add = (e) => {
    e.preventDefault();
    if (input === "") {
      window.alert("add task");
      return;
    }

    const task = {
      id: Date.now(),
      text: input,
      isComplete: false,
    };
    setRenderInput([...renderInput, task]);
    setInput("");
  };

  const getInput = (e) => {
    return setInput(e.target.value);
  };

  const toggleComplete = (id) => {
    setRenderInput(
      renderInput.map((item) =>
        item.id === id ? { ...item, isComplete: !item.isComplete } : item
      )
    );
  };
  const deleteItem = (id) => {
    setRenderInput(renderInput.filter((item) => item.id !== id));
  };

  return (
    <div className="p-8 w-120 min-h-43.5 flex flex-col items-center shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <h1 className="text-[25px] text-gray-900 tracking-wider mb-6">
        Grocery Bud
      </h1>
      <div className="flex mb-6">
        <input
          value={input}
          onChange={getInput}
          className="w-79 h-7.25 py-1.5 px-12 rounded-l-sm border border-gray-200"
        />
        <button
          onClick={add}
          className="w-25 h-7.25 text-[13.3px] py-1.5 px-3 text-white bg-[#06b6d4] rounded-r-sm tracking-wider shadow-2xs hover:bg-[#0e7490] transition-all delay-100 duration-300 ease-in-out cursor-pointer"
        >
          Add Item
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {renderInput.map((item) => (
          <UserInput
            line={line}
            setLine={setLine}
            item={item}
            text={item.text}
            key={item.id}
            id={item.id}
            toggleComplete={toggleComplete}
            deleteItem={deleteItem}
          />
        ))}
      </div>
    </div>
  );
};

const UserInput = ({ toggleComplete, id, item, text, deleteItem }) => {
  return (
    <div className="w-full h-5 flex items-center gap-4">
      <input
        onChange={() => toggleComplete(id)}
        checked={item.isComplete}
        type="checkbox"
        className="w-3.25 h-3.25 rounded-xs border border-gray-500 cursor-pointer"
      />
      <p
        className={`w-[322.31px] text-gray-900 text-[16px] ${
          item.isComplete ? `line-through` : ``
        }`}
      >
        {text}
      </p>
      <button
        onClick={() => deleteItem(id)}
        className="text-[12px] py-px px-1 bg-[#222222] text-white rounded-sm tracking-widest hover:bg-[#0e7490] transition-all duration-300 delay-100 ease-in-out cursor-pointer"
      >
        Delete
      </button>
    </div>
  );
};
