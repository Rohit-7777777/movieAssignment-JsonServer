import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchingData } from "./store/index";
import { dataActions } from "./store/index";
import Addlist from "./Components/AddList";
import DisplayList from "./Components/DisplayList";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("Select Genre");
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);
  const [isEditing, setIsEditing] = useState(null);
  useEffect(() => {
    dispatch(fetchingData());
  }, [dispatch]);

  //updating items
  const editHandler = (id) => {
    const data = items.find((ele) => {
      return ele.id === id;
    });
    setName(data.title);
    setDescription(data.description);
    setGenre(data.genre);
    dispatch(dataActions.manipulateToggle(false));
    setIsEditing(id);
  };
  return (
    <div className="main">
      <Addlist
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
        genre={genre}
        setGenre={setGenre}
        isEditing={isEditing}
      />
      <DisplayList onEdit={editHandler} />
    </div>
  );
}

export default App;
