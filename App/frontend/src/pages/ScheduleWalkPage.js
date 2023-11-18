import React from 'react';
import { useDispatch } from 'react-redux';
import ScheduleWalkForm from '../components/ScheduleWalkForm';
import { createWalk } from '../features/walksSlice';

function ScheduleWalkPage() {
  const dispatch = useDispatch();

  const handleSubmit = (walkDetails) => {
    dispatch(createWalk(walkDetails));
  };

  return (
    <div>
      <ScheduleWalkForm onSubmit={handleSubmit} />
    </div>
  );
}

export default ScheduleWalkPage;
