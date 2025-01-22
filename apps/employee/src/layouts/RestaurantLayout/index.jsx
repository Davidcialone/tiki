import React from 'react';
import GravelSection from './GravelSection';
import HerbSection from './HerbSection';
import InsideSection from './InsideSection';
import TerraceSection from './TerraceSection';
import './styles/RestaurantLayout.css';

const RestaurantLayout = () => {
  return (
    <div className="restaurant-layout">
      <InsideSection />
      <TerraceSection />
      <HerbSection />
      <GravelSection />
    </div>
  );
};

export default RestaurantLayout;
