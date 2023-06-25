import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import UploadForm from "./components/UploadForm";

const photos = [
  "https://picsum.photos/id/1001/200/200",
  "https://picsum.photos/id/1002/200/200",
  "https://picsum.photos/id/1003/200/200",
  "https://picsum.photos/id/1004/200/200",
  "https://picsum.photos/id/1005/200/200",
  "https://picsum.photos/id/1006/200/200",
  "https://picsum.photos/id/237/200/200",
  "https://picsum.photos/200/200",
];

function App() {
  const [count, setCount] = useState();
  const [inputs, setInput] = useState({ title: null, file: null, path: null });
  const [items, setItems] = useState(photos);
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
    setItems([inputs.path, ...items]);
  };

  const toggle = () => collapse(!isCollapsed);

  useEffect(() => {
    setCount(`You have ${items.length} image${items.length > 1 ? "s" : ""}`);
  }, [items]);

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
          isVisible={isCollapsed}
          onChange={handleOnChange}
          onSubmit={handleOnSubmit}
        />

        {count}
        <h1>Gallery</h1>
        <div className="row">
          {items.map((photo) => (
            <Card key={photo} src={photo} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
