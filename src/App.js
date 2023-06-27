import { useEffect, useState, useReducer } from "react";
import "./App.css";
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import UploadForm from "./components/UploadForm";

const photos = [];
const initialState = {
  items: photos,
  count: photos.length,
  inputs: { title: null, file: null, path: null },
  isCollapsed: false,
};
function reducer(state, action) {
  switch (action.type) {
    case "setItems":
      return {
        ...state,
        items: [action.payload.path, ...state.items],
      };

    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [count, setCount] = useState();
  const [inputs, setInput] = useState({ title: null, file: null, path: null });
  // const [items, setItems] = useState(photos);
  const [isCollapsed, collapse] = useState(false);

  const handleOnChange = (e) => {
    if (e.target.name === "file") {
      setInput({
        ...inputs,
        file: e.target.files[0],
        path: URL.createObjectURL(e.target.files[0]),
      });
    } else {
      setInput({ title: e.target.value });
    }
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    // setItems([inputs.path, ...items]);
    dispatch({ type: "setItems", payload: { path: inputs.path } });
    setInput({ title: null, file: null, path: null });
    collapse(false);
  };

  const toggle = () => collapse(!isCollapsed);

  // useEffect(() => {
  //   console.log(state);
  // }, []);

  useEffect(() => {
    setCount(
      `You have ${state.items.length} image${state.items.length > 1 ? "s" : ""}`
    );
  }, [state]);

  return (
    <>
      <Navbar />
      <div className="container text-center mt-5">
        {/* <button
          className="btn btn-warning mx-3"
          onClick={() =>
            setItems(["https://picsum.photos/seed/picsum/200/200", ...items])
          }
        >
          +Add
        </button> */}
        <button className="btn btn-success float-end" onClick={toggle}>
          {isCollapsed ? "Close" : "+Add"}
        </button>
        <div className="clearfix mb-4"></div>
        <UploadForm
          inputs={inputs}
          isVisible={isCollapsed}
          onChange={handleOnChange}
          onSubmit={handleOnSubmit}
        />

        {count}
        <h1>Gallery</h1>
        <div className="row">
          {state.items.map((photo) => (
            <Card key={photo} src={photo} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
