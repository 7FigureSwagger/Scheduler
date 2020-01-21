import React from "react";
import classnames from 'classnames';

import 'components/DayListItem.scss';

export default function DayListItem(props) {
  
  const dayClass = classnames('dayClass', {
    'day-list__item--selected':props.selected,
    'day-list__item--full':props.spots === 0,
    })
  
  const spotsLeft = (spots) => {
    switch (props.spots) {
      case 0:
       return ("no spots remaining");
      case 1:
       return ("1 spot remaining");
      case 2:
       return ("2 spots remaining");
    }
   }

  return (
    <li onClick={() => props.setDay(props.name)}>
      <h2 className={dayClass}>{props.name}</h2>
      <h3 className={dayClass}>{spotsLeft()}</h3>
    </li>
  );
}

