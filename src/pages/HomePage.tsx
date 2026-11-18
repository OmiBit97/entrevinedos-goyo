import React from 'react';
import { AwwwardsHomeView } from '../components/awwwards/AwwwardsHomeView';

interface HomePageProps {
  onOpenBooking: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenBooking }) => {
  return <AwwwardsHomeView onOpenBooking={onOpenBooking} />;
};
