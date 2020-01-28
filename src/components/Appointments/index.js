import React from "react";
import "components/Appointments/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";
import bookInterview from '../Application';


export default function Appointment(props) {
	const EMPTY = "EMPTY";
	const SHOW = "SHOW";
	const EDIT = "EDIT";
	const CREATE = "CREATE";
	const CONFIRM = "CONFIRM";
	const SAVING = "SAVING";
	const DELETING = "DELETING";
	const ERROR_SAVE = "ERROR-SAVE";
	const ERROR_DELETE = "ERROR-DELETE";

	const { mode, transition, back } = useVisualMode(
		props.interview ? SHOW : EMPTY
	);

	function bookInterview(id, interview) {
		// const [ state, setState ] = useState(null)
		console.log(id, interview);
	}
	
	function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
  }

	console.log('props in index', props.interviewers)

	return (
		<article className="appointment">
			<Header time={props.time} />
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === SHOW && (
				<Show
					student={props.interview.student}
					interviewer={props.interview.interviewer}
				/>
			)}
			{mode === CREATE && (
				<Form onCancel={back}  state={props.state} onSave={save} interviewers={props.interviewers}/>
			)}
			
			{/* {mode === EDIT && ()} */}
			{mode === CONFIRM && (
				 <Confirm
				 message="Delete this appointment?"
				//  onConfirm={deleteAppointment}
				 onCancel={() => back()}
			 />
			)}
			{mode === SAVING && (
				<Status
				message="Saving..."
			/>
			)}
			{mode === DELETING && (
				<Status
				message="Deleting"
			/>
			)}
			{mode === ERROR_SAVE && (
				<Error 
				message="Something broke while saving, try again"
				onClose={() => back()}
			/>
			)}
			{mode === ERROR_DELETE && (<Error 
            message="Something broke while deleting, try again"
            onClose={() => back()}
          />)}
		</article>
	);
}
// {props.interview ? (<Show student={props.interview.student} interviewer={props.interview.interviewer}/>) : (<Empty />)}
