
const Index = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-white">
      <div className="w-[353px] mx-auto">
        {/* 1. Event Title Section */}
        <section className="h-[382px] w-full bg-white flex items-center justify-center relative">
          <img 
            src="/lovable-uploads/85ed9ad3-9c97-4322-9410-b661d4cafb48.png" 
            alt="KBO 올킬 이벤트"
            className="w-full h-full object-contain"
          />
          <img 
            src="https://file.notion.so/f/f/be7923ea-7295-4bae-81fe-374b30bc08e7/43c0d002-c34b-4959-bc1b-a8284ad96b6f/14_1_emoticon_3.gif?table=block&id=1dc1fb14-0fbe-805c-960c-dd787453dff9&spaceId=be7923ea-7295-4bae-81fe-374b30bc08e7&expirationTimestamp=1745323200000&signature=DnYgj3g2c85sNevBG2EDC6Bx2zqJ9lBsx0peHA-Sr3M&downloadName=14_1_emoticon+3.gif"
            alt="Event Emoticon"
            className="absolute left-[58px] top-0"
          />
        </section>

        {/* 2. Today's Winners Section */}
        <section className="h-[777px] w-full bg-white">
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

