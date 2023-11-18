import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { fetchWalks } from '../features/walksSlice';

export default function CalendarComponent({ onEventClick }) {
  const dispatch = useDispatch();
  const { walks } = useSelector(state => state.walks);

  useEffect(() => {
    dispatch(fetchWalks());
  }, [dispatch]);

  // Transform walks data to FullCalendar's event format
  const calendarEvents = walks.map(walk => ({
    title: `Walk with ${walk.dogName}`,
    start: walk.startTime,
    end: walk.endTime,
    allDay: false,
    extendedProps: {
      walkId: walk.id
    }
  }));

  return (
    <div sx={{ padding: 2 }}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={calendarEvents}
        dateClick={onEventClick}
      />
    </div>
  );
}
