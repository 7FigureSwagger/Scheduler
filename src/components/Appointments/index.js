import React, { useState } from "react";
import "components/Appointments/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "../../hooks/useVisualMode"
import cancelInterview from "../Application"
// import bookInterview from '../';


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

  // function reset() {
  //   setName("");
  //   // props.setInterviewer(null);
  // }
	// transition(CONFIRM)

	function edit(){
		console.log('state', props);
		transition(EDIT)
	}

	function confirm(){
		console.log('in confirm mode')
		return(
			transition(CONFIRM)
		)
	}

  function cancel(name, interviewer) {
		const interview = {
			student: name, 
			interviewer
		}
		console.log('trying to cancel', props.id)
		transition(DELETING)
		
		props.cancelInterview(props.id)
		.then(() => transition(EMPTY))
		.catch(err => {
			console.log('gg');
		})
  }

	function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
		};
		
		transition(SAVING);

		props.bookInterview(props.id, interview)
			.then(() => transition(SHOW));
	}

	return (
		<article className="appointment">
			<Header time={props.time} />
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === SHOW && (
				<Show
					student={props.interview.student}
					interviewer={props.interview.interviewer}
					interviewers={props.interviewers}
					onDelete={confirm}
					onEdit={edit}
					// onConfirm={confirm}
					state={props.state}
				/>
			)}
			{mode === CREATE && (
				<Form onCancel={back}  state={props.state} onSave={save} interviewers={props.interviewers}/>
			)}
			
			{mode === EDIT && (
				<Form onCancel={back} name={props.interview.student} interviewer={props.interview.interviewer} state={props.state} onSave={save} interviewers={props.interviewers}/>
				)}

			{mode === CONFIRM && (
				 <Confirm
				 message="Delete this appointment?"
				 onConfirmCancel={() => cancel()}
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
