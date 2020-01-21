import React from "react";
// import InterviewerListItem from "components/InterviewerListItem";

export default InterviewerList = props => {
	return (
		<li className="interviewers__item">
			<img
				className="interviewers__item-image"
				src="https://i.imgur.com/LpaY82x.png"
				alt="Sylvia Palmer"
			/>
			Sylvia Palmer
			<InterviewerListItem
				id={interviewer.id}
				name={interviewer.name}
				avatar={interviewer.avatar}
				selected={interviewer.name === props.name}
				setInterviewer={props.setInterviewer}
			/>
		</li>
	);
};
