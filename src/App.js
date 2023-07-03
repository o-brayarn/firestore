import { useContext, useEffect, useMemo } from "react";
import "./App.css";
import Card from "./components/Card";
import Layout from "./components/Layout";
import { Context } from "./context";
import app from "./lib/firebase.config";

function App() {
  const { state } = useContext(Context);

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
