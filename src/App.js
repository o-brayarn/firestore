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
const handleOnChange = (state, e) => {
  if (e.target.name === "file") {
    return {
      ...state.inputs,
      file: e.target.files[0],
      path: URL.createObjectURL(e.target.files[0]),
    };
  } else {
    return { ...state.inputs, title: e.target.value };
  }
};
function reducer(state, action) {
  switch (action.type) {
    case "setItems":
      return {
        ...state,
        items: [state.inputs, ...state.items],
      };
    case "setInput":
      return {
        ...state,
        inputs: handleOnChange(state, action.payload.value),
      };
    case "collapse":
      return {
        ...state,
        isCollapsed: action.payload.bool,
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [count, setCount] = useState();

  const toggle = (bool) => dispatch({ type: "collapse", payload: { bool } });
  const handleOnChange = (e) =>
    dispatch({ type: "setInput", payload: { value: e } });
  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "setItems" });
    // collapse(false);
    toggle(!state.isCollapsed);
  };

  // const toggle = () => collapse(!isCollapsed);

  useEffect(() => {
    setCount(
      `You have ${state.items.length} image${state.items.length > 1 ? "s" : ""}`
    );
  }, [state.items]);

  return (
    <>
      <Navbar />
      <div className="container text-center mt-5">
        <button
          className="btn btn-success float-end"
          onClick={() => toggle(!state.isCollapsed)}
        >
          {state.isCollapsed ? "Close" : "+Add"}
        </button>
        <div className="clearfix mb-4"></div>
        <UploadForm
          inputs={state.inputs}
          isVisible={state.isCollapsed}
          onChange={handleOnChange}
          onSubmit={handleOnSubmit}
        />

        {count}
        <h1>Gallery</h1>
        <div className="row">
          {state.items.map((photo) => (
            <Card key={photo} src={photo.path} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
