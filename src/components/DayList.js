import React from "react";

import "components/DayListItem.scss";
import DayListItem from "./DayListItem";


export default function DayList(props) {

	const { 
    days, 
    spotsLeft, 
    appointments 
  } = props
	// const temp = props.days ? props.days : null;
	// // console.log("Inside DayList", temp[0]);
	// temp.map(day => {
	// 	console.log('inside DayList', day.spots);
	// })
	
	const dayList = props.days.map(day => {
		return (
			<DayListItem
				key={day.id}
				name={day.name}
				selected={day.name === props.day}
				setDay={props.setDay}
				spots={spotsLeft(appointments, days, day.name)}
			/>
		);
	});
	return <ul id={dayList}>{dayList}</ul>;
}
