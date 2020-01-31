import React, {useState} from "react";
import bookInterview from '../Application';
import InterviewerList from 'components/InterviewerList'
import InterviewerListItem from "components/InterviewerListItem";
import { getInterviewersForDay } from "helpers/selectors";


export default function Show(props) {
	console.log('inside show', props.interviewers)
	// const [interviewer, setInterviewer] = useState(props.interviewer || null);
	// console.log('show props SHOW mode', props);
	console.log("whhyyyy  ", props.interviewer);
	return (
		<main className="appointment__card appointment__card--show">
			<section className="appointment__card-left">
				<h2 className="text--regular">{props.student}</h2>
				<section className="interviewer">
					<h4 className="text--light">Interviewer</h4>
					<h3 className="text--regular">{props.interviewer && props.interviewer.name}
					{/* <InterviewerList
					interviewers={props.interviewers}
					interview={props.interview}
					value={interviewer}
          onChange={id => setInterviewer(id)}
				/> */}
					</h3>
				</section>
			</section>
			<section className="appointment__card-right">
				<section className="appointment__actions">
					<img
						className="appointment__actions-button"
						src="images/edit.png"
            alt="Edit"
            onClick={props.onEdit}
					/>
					<img
						className="appointment__actions-button"
						src="images/trash.png"
            alt="Delete"
            onClick={props.onDelete}
					/>
				</section>
			</section>
		</main>
	);
}

