import TaskListComponent from "../../../ui/components/TaskListComponent";
import './../../../styles/custom-bootstrap.scss';
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function TasksPage() {
    return (
        <div className="bg-blue-50 h-screen m-5 mt-0 rounded-lg">
        <TaskListComponent/>
        </div>
    );
}