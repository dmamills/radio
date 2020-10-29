import React from 'react';
import cn from 'classnames';
import { uppercase, textCenter } from '../../styles';

import NoScheduleBlocks from './NoScheduleBlocks';
import ScheduleBlocks from './ScheduleBlocks';

const DayOfWeek = ({ dayOfWeek, onEdit }) => {
  return (<div>
    <h2 className={cn(uppercase, textCenter)}>{dayOfWeek.day}</h2>
    {dayOfWeek.blocks.length > 0 ? <ScheduleBlocks onEdit={onEdit} blocks={dayOfWeek.blocks}/> : <NoScheduleBlocks /> }
  </div>);
}

export default DayOfWeek;