import React, {useState, useEffect} from 'react';
import Axios from 'axios';

export default function useApplicationData(props){
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })
  
	
  const setDay = (day) => setState(prev => ({ ...prev, day }));


	useEffect(() => {
		const daysP = Axios.get("http://localhost:8001/api/days");
		const appointmentsP = Axios.get("http://localhost:8001/api/appointments");
		const interviewersP = Axios.get("http://localhost:8001/api/interviewers");

		Promise.all([daysP, appointmentsP, interviewersP])
			.then(results_array => {
				const [days, appointments, interviewers] = results_array;
				setState({
					days: days.data,
					appointments: appointments.data,
					interviewers: interviewers.data
				});
			})
			.catch(err => {
				console.error(err);
			});
  }, []);
  
  function bookInterview(id, interview, callback) {
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
      setState({
        ...state,
				appointments
			});
			console.log("trying to return");
		});
	}
  
	function cancelInterview(id, interview) {
    return Axios.delete(`/api/appointments/${id}`, {
      interview: null
		})
    .then(function(response) {
      setState({
        ...state
      });
    })
	}
  return { state, setDay, bookInterview, cancelInterview };
}
