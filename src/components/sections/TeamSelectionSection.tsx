
import React, { useState, useEffect } from 'react';
import TodayTeamSelection from './TodayTeamSelection';
import YesterdayResults from './YesterdayResults';

const TeamSelectionSection: React.FC = () => {
  const [selected, setSelected] = useState<Record<number, string>>({});
  const [buttonRendered, setButtonRendered] = useState(false);

  // Effect to ensure button is ready for vanilla JS to find
  useEffect(() => {
    // Signal to vanilla JS that React has rendered the button
    const button = document.getElementById('submit-allkill-btn');
    if (button) {
      button.dataset.reactRendered = 'true';
      setButtonRendered(true);
      
      // Create a custom event to notify vanilla JS that React has rendered the button
      const event = new CustomEvent('react-rendered', { detail: { elementId: 'submit-allkill-btn' } });
      document.dispatchEvent(event);
      
      console.log('React: Submit button rendered and event dispatched');
    }
  }, []);

  const handleTeamSelect = (gameId: number, team: 'home' | 'away') => {
    setSelected(prev => ({
      ...prev,
      [gameId]: team
    }));
  };

  return (
    <section id="team-selection-section">
      {/* Today's Team Selection Section */}
      <TodayTeamSelection 
        selected={selected} 
        onTeamSelect={handleTeamSelect} 
        buttonRendered={buttonRendered} 
      />
      
      {/* Yesterday's Result Section */}
      <YesterdayResults />
      
      {/* Placeholder for team selection section when navigating to previous date */}
      <div className="team-selection-placeholder" id="team-selection-placeholder">
        {/* Empty placeholder with same height as the team selection section */}
      </div>
    </section>
  );
};

export default TeamSelectionSection;
