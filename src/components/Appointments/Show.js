import React, {useState} from "react";
import bookInterview from '../Application';
import InterviewerList from 'components/InterviewerList'
import InterviewerListItem from "components/InterviewerListItem";


export default function Show(props) {
	const [interviewer, setInterviewer] = useState(props.interviewer || null);
	// console.log('show props', props);
	return (
		<main className="appointment__card appointment__card--show">
			<section className="appointment__card-left">
				<h2 className="text--regular">{props.student}</h2>
				<section className="interviewer">
					{/* <h4 className="text--light">Interviewer</h4> */}
					<h3 className="text--regular">
					<InterviewerList
					interviewers={props.interviewers}
					value={interviewer}
          onChange={id => setInterviewer(id)}
				/>
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

