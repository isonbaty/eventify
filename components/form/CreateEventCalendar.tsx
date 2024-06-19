'use client';
import { Calendar } from '@/components/ui/calendar';
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { DayPicker } from 'react-day-picker';

type CalendarInputProps = {
  defaultValue?: Date | undefined;
};

function CreateEventCalendar({ defaultValue }: CalendarInputProps) {
  const currentDate = new Date();
  const [dateFrom, setDateFrom] = useState<Date | undefined>(currentDate);

  return (
    <>
      <h3 className='text-xl font-semibold capitalize mb-4'>
        Select Event start date
      </h3>
      <input type='hidden' name='dateFrom' value={dateFrom?.toISOString()} />
      <Calendar
        mode='single'
        selected={dateFrom}
        onSelect={setDateFrom}
        className='rounded-md border'
      />
    </>
  );
}
export default CreateEventCalendar;
