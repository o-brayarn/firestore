import { useContext, useEffect, useMemo } from "react";
import "./App.css";
import Card from "./components/Card";
import Layout from "./components/Layout";
import { Context } from "./context";
import app from "./lib/firebase.config";

/* const photos = [];
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
        count: state.items.length + 1,
        inputs: { title: null, file: null, path: null },
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
*/
function App() {
  const { state } = useContext(Context);

  // const toggle = () => collapse(!isCollapsed);
  const count = useMemo(() => {
    return `You have ${state.items.length} image${
      state.items.length > 1 ? "s" : ""
    }`;
  }, [state.items]);

  useEffect(() => {
    app();
  }, []);

  return (
    <>
      <Layout>
        {count}
        <h1 className="text-center">Gallery</h1>
        <div className="row">
          {state.items.map((item, index) => (
            <Card key={index} {...item} />
          ))}
        </div>
      </Layout>
    </>
  );
}

export default App;
