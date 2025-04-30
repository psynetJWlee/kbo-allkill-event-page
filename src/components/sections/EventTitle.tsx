
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
        src="https://lh3.googleusercontent.com/fife/ALs6j_E5wX2_cNh1s8dGMf23Rx8Vs_IoBgpvRUi_viumxMh-9hCfZuQ-N737T1zf2TJyeqokjzPnkOZSwJ8QPq348IHuEvkviqef4Ivi230U2mwEAqTuOnNtpE5Jcs7t7gcLZHSW3xV95mStFgWutX9SFlRhVUFDXRkfkmmLRBBLk_DFW7PO5i2Rzy0H_LySumE35TubM-fOx-BLkn9z4YQCvyGamxywqDsL8EbMyUPYF5hg-6yIQuyo5tMA8RPxLSjbMw5i-Xe37TGNbNVG3beZGbTkCGgvwVS7Ob3zXn5k02b3BBtlbAgmuTNE1Rvfo0547E8SdLbbQgJbB5q6iuIDfifOjiPs1Z3l2wpIso9AEiSO2rlmOfmgAdFFsc7Q1aUR11QjsVk39j4flv2wMkdGrOHhIN6kuxIen_CVjCKis-D-d5QgvSIc6pitiy3l6I_YFJe2vSQ3t_D1_P4t09r_292a6m6Lq8pat3gMrTGpgTTe0Y_xNiNa2tEpuyVyanYO4x5no6GlNIoRA8bDL7coKgRh_yvKoGzPk5GpNJ3TjtpJUuA09UTcUIANXRC23xBPs4HHlrCI800CK3Mw3ltEvp9Dff48OnjIQdtbOytnn0aRp_ko6VjOqJ8mQsOvo40LNY5CBn5frby92mW-KhouL5F6CeItq0vUQbnRNjNfho0Wx-VZh6VmLm4mpszZbdNmkmV1FXUtHnv1fGfXzdBZPby80mo6KlEz__c2I9I5iKE8DVFSsW8F5-cB2_kA44atXJgSNA2y0jDTQf9GuzawynxXmJ-rkMKrJDBiwT8-goOJBmLXt9Viel4IfqDjAwvCnl_vPXhe-uqhFK3sCBioOjgWZFTITmfOwNXT2dYFWj8vXj3j30UuDlQRr1VF1QW-k326zZxGF36tmqAb5UQlQ91aEGKw1_1rNw-BnvYgTG-wRJVWIg1vd9a65sRs1V6guogEu3K-ZL8EeZDzBoLNw5aHykSzWZVQfnXdGmV1OXQRv3PK6uyJuuQdMy1YP-BGxbwaN4fgnnjJBp4USl1vJ8XdGuaIBAxjWbVkI1lXBRVJpUDrnh76L0vMnU2BT0ShS0l-_ibFXQhaN7KTAMXZWmGuPeLtMXpzRKSWYv9UOlEkF9f3-A2-5eIFjLs_yOqS_lWniX8Q2i3_muSy2fqUCetWtspIcqSt3U9rw17mSOkQjTc4FW1KSgf4w7a-MOB_mt1jRPwVFeqwoZkvH_-jWXz0liLYt72RamVnC4AVwuNOumqc-t7qsozEgyfzEFqAH8k6worDQJKWkVD2M2-r9gyMBk0DcLJxbQOOthg_Dl8qIB7POzbAfL4oZQaEjnCozRj3JNcF7idbke1g4z2LfNl6S0FboZIFFNYlWGCbMIpZwijDx-o1j7LusLtVBY__6-NjA6fyHFCQvss6doto3jtDmWJB-yB0_I_gQXLhVwY36toFfowNyocW4MepkmXxEzPMVTxkwDZhKtswl_DBsq6tLG7ZrtTu48CXS0ORfCyo0jwohrvzmgkwFPkIOAVk9W5Ph7JcT7b7Fs7QZDoVHzSZ4b8w6bvzrhWUsE4mxylrppJQP5kxPpbROw1DMZN_46QnLOstOOVLSYkpvdVi76yY=w1920-h911?auditContext=forDisplay"
        alt="Event Emoticon"
        className="absolute left-[58px] top-0 w-[238px] h-[238px]"
      />
    </section>
  );
};
