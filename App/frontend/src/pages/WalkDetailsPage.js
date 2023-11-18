import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWalks } from '../features/walksSlice';
import WalkDetailsComponent from '../components/WalkDetailsComponent';

function WalkDetailsPage() {
  const dispatch = useDispatch();
  const { walkId } = useParams();
  const walk = useSelector((state) => state.walks.walks.find(w => w.id === walkId));

  useEffect(() => {
    if (!walk) {
      dispatch(fetchWalks());
    }
  }, [dispatch, walkId, walk]);

  return (
    <div>
      {walk ? <WalkDetailsComponent walk={walk} /> : <p>Loading walk details...</p>}
    </div>
  );
}

export default WalkDetailsPage;
