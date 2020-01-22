import React from "react";
import classnames from "classnames/bind";
import interviewerList from "./InterviewerList";


export default function InterviewerListItem(props) {
	const interviewerClass = classnames("interviewers__item", {
		"interviewers__item--selected": props.selected
	});
	console.log(props);
	return (
		<li className={interviewerClass} onClick={() => props.setInterviewer(props.id)}>
			<img
				className="interviewers__item-image"
				src="https://i.imgur.com/LpaY82x.png"
				alt="Sylvia Palmer"
			/>
			{props.selected && props.name}
		</li>
	);
}
