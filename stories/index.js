import React, { Fragment } from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import "index.scss";
import DayListItem from "components/DayListItem";
import Button from "components/Button";
import DayList from "components/DayList";
import InterviewerList from "components/InterviewerList";
import InterviewerListItem from "components/InterviewerListItem";
import Appointment from "components/Appointments/index";
import Header from "components/Appointments/Header";
import Empty from "components/Appointments/Empty";
import Show from "components/Appointments/Show";
import Confirm from "components/Appointments/Confirm";
import Status from "components/Appointments/Status";
import Error from "components/Appointments/Error";
import Form from "components/Appointments/Form";

//================================================================================================================================================================

storiesOf("Button", module)
	.addParameters({
		backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
	})
	.add("Base", () => <Button>Base</Button>)
	.add("Confirm", () => <Button confirm>Confirm</Button>)
	.add("Danger", () => <Button danger>Cancel</Button>)
	.add("Clickable", () => (
		<Button onClick={action("button-clicked")}>Clickable</Button>
	))
	.add("Disabled", () => (
		<Button disabled onClick={action("button-clicked")}>
			Disabled
		</Button>
	));

//================================================================================================================================================================

storiesOf("DayListItem", module) //Initiates Storybook and registers our DayListItem component
	.addParameters({
		backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
	}) // Provides the default background color for our component
	.add("Unselected", () => <DayListItem name="Monday" spots={5} />) // To define our stories, we call add() once for each of our test states to generate a story
	.add("Selected", () => <DayListItem name="Monday" spots={5} selected />)
	.add("Full", () => <DayListItem name="Monday" spots={0} />)
	.add("Clickable", () => (
		<DayListItem name="Tuesday" setDay={action("setDay")} spots={5} /> // action() allows us to create a callback that appears in the actions panel when clicked
	));

//================================================================================================================================================================

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

storiesOf("DayList", module)
	.addParameters({
		backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
	})
	.add("Monday", () => (
		<DayList days={days} day={"Monday"} setDay={action("setDay")} />
	))
	.add("Tuesday", () => (
		<DayList days={days} day={"Tuesday"} setDay={action("setDay")} />
	));

//================================================================================================================================================================

const interviewer = {
	id: 1,
	name: "Sylvia Palmer",
	avatar: "https://i.imgur.com/LpaY82x.png"
};

storiesOf("InterviewerListItem", module)
	.addParameters({
		backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
	})
	.add("Unselected", () => (
		<InterviewerListItem
			id={interviewer.id}
			name={interviewer.name}
			avatar={interviewer.avatar}
		/>
	))
	.add("Selected", () => (
		<InterviewerListItem
			id={interviewer.id}
			name={interviewer.name}
			avatar={interviewer.avatar}
			selected
		/>
	))
	.add("Clickable", () => (
		<InterviewerListItem
			id={interviewer.id}
			name={interviewer.name}
			avatar={interviewer.avatar}
			setInterviewer={event => action("setInterviewer")(interviewer.id)}
		/>
	));

//================================================================================================================================================================

const interviewers = [
	{ id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
	{ id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
	{ id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
	{ id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
	{ id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];

storiesOf("InterviewerList", module)
	.addParameters({
		backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
	})
	.add("Initial", () => (
		<InterviewerList
			interviewers={interviewers}
			setInterviewer={event => action("setInterviewer")(interviewer.id)}
		/>
	))
	.add("Preselected", () => (
		<InterviewerList
			interviewers={interviewers}
			value={1}
			setInterviewer={event => action("setInterviewer")(interviewer.id)}
		/>
	));

//================================================================================================================================================================

const appointments = {};

storiesOf("Appointment", module)
	.addParameters({
		backgrounds: [{ name: "white", value: "#fff", default: true }]
	})
	.add("Appointment", () => <Appointment />)
	.add("Appointment with Time", () => <Appointment time="12pm" />)
	.add("Header", () => <Header time="12pm" />)
	.add("Empty", () => (
		<Empty onAdd={event => action("onAdd")(Appointment.id)} />
	))
	.add("Edit", () => (
		<Form
			name={"Ali"}
			interviewers={interviewers}
			interviewer={3}
			onSave={event => action("onSave")(Appointment.id)}
			onCancel={event => action("onCancel")(Appointment.id)}
		/>
	))
	.add("Create", () => (
		<Form
			interviewers={interviewers}
			onSave={(name, interviewer) => action("onSave")(name, interviewer)}
			onCancel={event => action("onCancel")(Appointment.id)}
			setInterviewer={event => action("setInterviewer")(interviewer.id)}
		/>
	))
	.add("Appointment Empty", () => (
		<Fragment>
    <Appointment
      id={1}
      time="12pm"
      interview={{ student: "Lydia Miller-Jones", interviewer }}
    />
    <Appointment id="last" time="1pm" />
  </Fragment>
	));

//================================================================================================================================================================

storiesOf("Show", module)
	.addParameters({})
	.add("Show", () => (
		<Show
			student={"Lydia Miller Jones"}
			interviewer={interviewer}
			onEdit={event => action("onEdit")(Appointment.id)}
			onDelete={event => action("onDelete")(Appointment.id)}
		/>
	));

//================================================================================================================================================================

storiesOf("Confirm", module)
	.addParameters({})
	.add("Confirm", () => (
		<Confirm
			message={"Delete the Appointment?"}
			onConfirm={event => action("onConfirm")(Appointment.id)}
			onCancel={event => action("onCancel")(Appointment.id)}
		/>
	));

//================================================================================================================================================================

storiesOf("Status", module)
	.addParameters({})
	.add("Status", () => <Status message={"Deleting"} />);

//================================================================================================================================================================

storiesOf("Error", module)
	.addParameters({})
	.add("Error", () => (
		<Error
			message={"Could not delete Appointment."}
			onClose={event => action("onClose")(Appointment.id)}
		/>
	));
