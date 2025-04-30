
import React, { useEffect, useRef } from 'react';
import { startAnimation, createConfetti, createStar } from '../../utils/animationUtils';
import '../../styles/animations.css';

export const EventTitle: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Only run on the client side
    if (typeof window !== 'undefined' && sectionRef.current) {
      const container = sectionRef.current;
      
      // Initial animation
      for (let i = 0; i < 30; i++) {
        createConfetti(container);
      }
      
      for (let i = 0; i < 15; i++) {
        createStar(container);
      }
      
      // Continuous animation
      let animationInterval: number;
      const startContinuousAnimation = () => {
        let counter = 0;
        animationInterval = window.setInterval(() => {
          createConfetti(container);
          counter++;
          if (counter % 2 === 0) {
            createStar(container);
          }
        }, 300);
      };
      
      startContinuousAnimation();
      
      // Cleanup interval on unmount
      return () => {
        window.clearInterval(animationInterval);
      };
    }
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="h-[382px] w-full bg-[#0072A7] flex items-center justify-center relative overflow-hidden"
    >
      <img 
        src="/lovable-uploads/238a9ac4-eb4e-4505-a699-a85abc7f50c4.png" 
        alt="LIVE Score Logo"
        className="absolute top-[6px] left-[7px] z-20"
      />
      <img 
        src="/lovable-uploads/c80cf187-d9ab-4ccd-a210-ab2049d9a23a.png" 
        alt="KBO 올킬 이벤트"
        className="absolute top-[106px] left-1/2 transform -translate-x-1/2 z-10"
      />
      <img 
        src="https://file.notion.so/f/f/be7923ea-7295-4bae-81fe-374b30bc08e7/43c0d002-c34b-4959-bc1b-a8284ad96b6f/14_1_emoticon_3.gif?table=block&id=1e41fb14-0fbe-8060-acac-f733ff862aeb&spaceId=be7923ea-7295-4bae-81fe-374b30bc08e7&expirationTimestamp=1745913600000&signature=0MVBEBglA7e9yEsmCqL72r1S3cDlxQ6fRi5qBrJKttg&downloadName=14_1_emoticon+3.gif"
        alt="Event Emoticon"
        className="absolute left-[58px] top-0 w-[238px] h-[238px]"
      />
    </section>
  );
};
