import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
import bookInterview from '../Application';
// import save from "index";

export default function Form({
	onSave,
	onCancel,
	...props
}) 
{
	const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
	// console.log('looking for save data', props);

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
					<Button danger onClick={onCancel}>
						Cancel
					</Button>
					<Button confirm onClick={() => onSave(name, interviewer)}>
						Save
					</Button>
				</section>
			</section>
		</main>
	);
}
