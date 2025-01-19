import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import './TodoTask.css'
const TodoTask = ({ onChange , task , onDelete , onEdit }) => {
  return (
    <li className="task">
      <div className="task-name">
          <input type="checkbox"  checked={task.done} onChange={onChange} />
         <p className={task.done? "taskDone":""} > {task.name}</p>
      </div>
        <div className="buttons">
            <button  onClick={onEdit} disabled={task.done}  className={task.done? "taskDone": "edit"}>
                <CiEdit/>
            </button>
            <button onClick={onDelete} className="delete">
                <RiDeleteBin6Line/>
            </button>
        </div>
    </li>
  );
}

export default TodoTask;
