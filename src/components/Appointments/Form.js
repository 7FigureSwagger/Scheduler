import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
import bookInterview from '../Application';

export default function Form(props) {
	const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  function reset() {
    setName("");
    // props.setInterviewer(null);
  }

  function cancel() {
    reset();
    props.onCancel();
  }

  function save() {
    console.log('tried to save', name, interviewer);
    // setName(name);
    // setInterviewer(interviewer);
    props.onSave(name, interviewer);
	}
	
	console.log('props', props)
	// console.log('props', interviewer)

	return (
		<main className="appointment__card appointment__card--create">
			<section className="appointment__card-left">
				<form autoComplete="off" onSubmit={event => event.preventDefault()}>
					<input
						className="appointment__create-input text--semi-bold"
						name='name'
            type="text"
            value={name}
            placeholder="Enter Student Name"
            onChange={event => setName(event.target.value)}
					
					/>
				</form>
				<InterviewerList
					interviewers={props.interviewers}
					value={interviewer}
          onChange={id => setInterviewer(id)}
				/>
			</section>
			<section className="appointment__card-right">
				<section className="appointment__actions">
					<Button danger onClick={cancel}>
						Cancel
					</Button>
					<Button confirm onClick={save}>
						Save
					</Button>
				</section>
			</section>
		</main>
	);
}
