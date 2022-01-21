import { updateData } from "../store/index";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataActions } from "../store/index";
import { sendData } from "../store/index";
import "./AddList.css";
function Addlist(props) {
  const toggle = useSelector((state) => state.toggle);
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const nameHandler = (event) => {
    props.setName(event.target.value);
  };
  const descriptionHandler = (event) => {
    props.setDescription(event.target.value);
  };
  const genreHandler = (event) => {
    props.setGenre(event.target.value);
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    if (!props.name || !props.description || props.genre === "Select Genre") {
      alert("enter valid details");
      return;
    } else if (props.name && props.description && props.genre && !toggle) {
      const data = items.map((ele) => {
        if (ele.id === props.isEditing) {
          const data1 = {
            id: ele.id,
            title: props.name,
            description: props.description,
            genre: props.genre,
          };
          dispatch(updateData(data1));
          return {
            ...ele,
            ...data1,
          };
        }
        return ele;
      });
      dispatch(dataActions.editData(data));
      dispatch(dataActions.manipulateToggle(true));
      props.setName("");
      props.setGenre("Select Genre");
      props.setDescription("");
    } else {
      const movieData = {
        id: Math.random().toString(),
        title: props.name,
        description: props.description,
        genre: props.genre,
      };

      dispatch(sendData(movieData));

      console.log(movieData);
      dispatch(dataActions.addData(movieData));
      props.setName("");
      props.setDescription("");
      props.setGenre("Select Genre");
    }
  };
  return (
    <div id="container">
      <form onSubmit={submitHandler}>
        <label>Enter Movie Name</label>
        <input type="text" onChange={nameHandler} value={props.name} />

        <label>Description</label>
        <input
          type="text"
          onChange={descriptionHandler}
          value={props.description}
        />

        <label>Genre</label>

        <select
          className="genre-style"
          onChange={genreHandler}
          value={props.genre}
        >
          <option>Select Genre</option>
          <option>Comedy</option>
          <option>Thriller</option>
          <option>Action</option>
        </select>

        {toggle && <button>Add Movie</button>}
        {!toggle && <button>Update Movie</button>}
      </form>
    </div>
  );
}
export default Addlist;
