import React from "react";
import classnames from 'classnames/bind';
import 'components/DayListItem.scss';

export default function DayListItem(props) {
  const dayClass = classnames('day-list__item', {
    'day-list__item--selected':props.selected,
    'day-list__item--full':props.spots === 0,
    })
  
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 >{props.name}</h2>
      <h3 >{(props.spots ? (props.spots === 1 ? '1 spot ' : props.spots + ' spots ') : 'no spots ') + 'remaining'}</h3>
    </li>
  );
}

