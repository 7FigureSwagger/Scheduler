import React, { useState } from "react";
import classnames from 'classnames/bind';

import 'components/DayListItem.scss';

export default function DayListItem(props) {
  
  const dayClass = classnames('day-list__item', {
    'day-list__item--selected':props.selected,
    'day-list__item--full':props.spots === 0,
    })
  
  const formatSpots = (spots) => {
    switch (props.spots) {
      case 0:
       return ("no spots remaining");
      case 1:
       return ("1 spot remaining");
      case 2:
       return ("2 spots remaining");
      case 3:
       return ("3 spots remaining");
      case 4:
       return ("4 spots remaining");
      case 5:
       return ("5 spots remaining");
    }
   }
  //  console.log(props);
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 >{props.name}</h2>
      <h3 >{formatSpots(props.spots)}</h3>
    </li>
  );
}

