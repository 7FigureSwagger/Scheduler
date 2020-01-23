import React, { useState } from "react";
import DayList from "components/DayList";
import InterviewerList from "components/InterviewerList";
import "components/Application.scss";
import Appointment from "./Appointments";

const appointment = [
	{
		id: 1,
		time: "12pm"
	},
	{
		id: 2,
		time: "1pm",
		interview: {
			student: "Lydia Miller-Jones",
			interviewer: {
				id: 1,
				name: "Sylvia Palmer",
				avatar: "https://i.imgur.com/LpaY82x.png"
			}
		}
	},
	{
		id: 3,
		time: "2pm",
		interview: {
			student: "David",
			interviewer: {
				id: 5,
				name: "Sven Jones",
				avatar: "https://i.imgur.com/twYrpay.jpg"
			}
		}
	},
	{
		id: 4,
		time: "3pm",
		interview: {
			student: "Jun",
			interviewer: {
				id: 4,
				name: "Cohana Roy",
				avatar: "https://i.imgur.com/FK8V841.jpg"
			}
		}
	}
];

const days = [
	{
		id: 1,
		name: "Monday",
		spots: 2
	},
	{
		id: 2,
		name: "Tuesday",
		spots: 5
	},
	{
		id: 3,
		name: "Wednesday",
		spots: 0
	}
];

export default function Application(props) {
	const [day, setDay] = useState("Monday");

	const schedule = appointment.map(app => {
		return (
			<>
				<Appointment key={app.id} {...app} />
			</>
		);
	});

	return (
		<main className="layout">
			<section className="sidebar">
				<img
					className="sidebar--centered"
					src="images/logo.png"
					alt="Interview Scheduler"
				/>
				<hr className="sidebar__separator sidebar--centered" />
				<nav className="sidebar__menu">
					<DayList days={days} day={day} setDay={setDay} />
				</nav>
				<img
					className="sidebar__lhl sidebar--centered"
					src="images/lhl.png"
					alt="Lighthouse Labs"
				/>
			</section>
			<section className="schedule">
				{schedule}
				<Appointment key="last" time="5pm" />
			</section>
		</main>
	);
}
