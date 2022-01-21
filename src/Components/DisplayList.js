import { deleteData } from "../store/index";
import { useSelector, useDispatch } from "react-redux";
import { dataActions } from "../store/index";

import "./DisplayList.css";
function DisplayList(props) {
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();
  return (
    <ul className="list_design">
      {items.map((ele) => {
        return (
          <div key={ele.id} className="list__action">
            <li className="list__content">
              <div className="child">
                <p>{ele.title}</p>

                <p>{ele.description}</p>
              </div>
              <div className="gen">
                <p>Its a {ele.genre} movie</p>
              </div>

              <div className="icon">
                <i
                  class="fas fa-trash-alt"
                  onClick={() => {
                    console.log(ele.id);
                    dispatch(deleteData(ele.id));
                    dispatch(dataActions.removeData(ele.id));
                  }}
                ></i>

                <i
                  class="far fa-edit ed"
                  onClick={() => {
                    console.log(ele.id);
                    props.onEdit(ele.id);
                  }}
                ></i>
              </div>
            </li>
          </div>
        );
      })}
    </ul>
  );
}
export default DisplayList;
