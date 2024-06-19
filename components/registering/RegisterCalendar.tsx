'use client';

import { useState } from 'react';
import { Calendar } from '../ui/calendar';
import { DateRange } from 'react-day-picker';
import Title from '../events/Title';
import { Separator } from '../ui/separator';

function RegisterCalendar() {
  const currentDate = new Date();

  const defaultSelected: DateRange = {
    from: undefined,
    to: undefined,
  };
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);
  const [selected, setSelected] = useState<Date | undefined>(undefined);
  return (
    <>
      <Title text='Select date range' />
      <Calendar
        mode='range'
        defaultMonth={currentDate}
        selected={range}
        onSelect={setRange}
      />
      <Separator />
      <Title text='Select a date' />
      <Calendar
        mode='single'
        defaultMonth={currentDate}
        selected={selected}
        onSelect={setSelected}
      />
    </>
  );
}
export default RegisterCalendar;
