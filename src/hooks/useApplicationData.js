import { useEffect, useReducer } from "react";
import Axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
	const { appointments, day, days, id, interview, interviewers, type } = action;
	
	switch (type) {
		case SET_DAY:
			return { ...state, day };

		case SET_APPLICATION_DATA:
			return { ...state, days, appointments, interviewers };

		case SET_INTERVIEW: {
			const appointment = {
				...state.appointments[id],
				interview: interview && { ...interview }
			};
			const appointments = {
				...state.appointments,
				[id]: appointment
			};
			
      return { ...state, appointments }
		}

		default:
			throw new Error(
				`Tried to reduce with unsupported action type: ${action.type}`
			);
	}
}



export default function useApplicationData() {
	const [state, dispatch] = useReducer(reducer, {
		day: "Monday",
		days: [],
		appointments: {},
		interviewers: {}
	});
	console.log('state in useAppData', state);
	const setDay = day => dispatch({ type: SET_DAY, day });

	useEffect(() => {
		const daysP = Axios.get("http://localhost:8001/api/days");
		const appointmentsP = Axios.get("http://localhost:8001/api/appointments");
		const interviewersP = Axios.get("http://localhost:8001/api/interviewers");

		Promise.all([daysP, appointmentsP, interviewersP])
			.then(results_array => {
				const [days, appointments, interviewers] = results_array;
				console.log('results', results_array);
				console.log('days', days);
				dispatch({
					type: SET_APPLICATION_DATA,
					days: days.data,
					appointments: appointments.data,
					interviewers: interviewers.data
				});
			})
			.catch(err => {
				console.error(err);
			});
	}, []);

	function bookInterview(id, interview) {
		const appointment = {
			...state.appointments[id],
			interview: { ...interview }
		};

		const appointments = {
			...state.appointments,
			[id]: appointment
		};
		return Axios.put(`/api/appointments/${id}`, {
			interview
		}).then(function(response) {
			dispatch({
				type: SET_INTERVIEW,
				...state,
				interview,
				appointments
			});
			console.log("trying to return");
		});
	}

	function cancelInterview(id, interview) {
		return Axios.delete(`/api/appointments/${id}`, {
			interview: null
		}).then(function(response) {
			dispatch({
				type: SET_INTERVIEW,
				interview,
				...state
			});
		});
	}

	// function spotsLeft(appointments, day, days){
	// 	const spots
	// }
	console.log('state before return', state);
	return { state, setDay, bookInterview, cancelInterview };
}

