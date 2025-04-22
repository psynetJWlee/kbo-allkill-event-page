
import React from 'react';

const Index = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-white">
      <div className="w-[353px] mx-auto">
        {/* 1. Event Title Section */}
        <section className="h-[382px] w-full bg-[#0072A7] flex items-center justify-center relative">
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
            src="https://file.notion.so/f/f/be7923ea-7295-4bae-81fe-374b30bc08e7/43c0d002-c34b-4959-bc1b-a8284ad96b6f/14_1_emoticon_3.gif?table=block&id=1dc1fb14-0fbe-805c-960c-dd787453dff9&spaceId=be7923ea-7295-4bae-81fe-374b30bc08e7&expirationTimestamp=1745323200000&signature=DnYgj3g2c85sNevBG2EDC6Bx2zqJ9lBsx0peHA-Sr3M&downloadName=14_1_emoticon+3.gif"
            alt="Event Emoticon"
            className="absolute left-[58px] top-0 w-[238px] h-[238px]"
          />
        </section>

        {/* 2. Today's Winners Section */}
        <section className="h-[777px] w-full bg-[#004B70] relative">
          <img 
            src="/lovable-uploads/2b49ee10-7baf-4d97-bde0-342af5344c35.png" 
            alt="오늘의 당첨자"
            className="absolute left-[2px] top-[18px]"
          />
          <p className="absolute left-1/2 transform -translate-x-1/2 top-[36px] text-[20px] text-white font-bold">
            총 20명
          </p>
        </section>

        {/* 3. KBO Team Selection Section */}
        <section className="h-[912px] w-full bg-white">
        </section>

        {/* 4. My Prize Section */}
        <section className="h-[576px] w-full bg-white">
        </section>

        {/* 5. Prize Ranking Section */}
        <section className="h-[1028px] w-full bg-white">
        </section>

        {/* 6. Event Description Section */}
        <section className="h-[363px] w-full bg-white">
        </section>
      </div>
    </div>
  );
};

export default Index;

