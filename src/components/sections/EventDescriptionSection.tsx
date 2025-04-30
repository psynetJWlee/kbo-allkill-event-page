
import React from 'react';

export const EventDescriptionSection: React.FC = () => {
  return (
    <section className="bg-[#00283F]">
      {/* 1. 상금 지급 안내 제목 */}
      <div className="flex items-center gap-2 mb-[15px]">
        <div className="flex justify-center items-center bg-gray-400/30 w-[24px] h-[24px] rounded-full">
          <span className="text-[13px] text-white font-bold">i</span>
        </div>
        <h3 className="text-[13px] text-white font-medium">상금 지급 안내</h3>
      </div>

      {/* 2. 설명 상세 리스트 */}
      <ul className="list-disc pl-[20px] mb-[25px]">
        <li className="text-[12px] text-white mb-[8px] leading-[1.4]">
          누적 금액이 3만원 이상일 경우 지급신청이 가능
        </li>
        <li className="text-[12px] text-white mb-[8px] leading-[1.4]">
          당첨자 세금신고를 위해 신분증 사본 제출 필요
        </li>
        <li className="text-[12px] text-white mb-[8px] leading-[1.4]">
          상금지급 후 개인정보 즉시 파기
        </li>
        <li className="text-[12px] text-white mb-[8px] leading-[1.4]">
          5만원 초과 시 제세공과금 (22%) 선공제 후 지급
        </li>
        <li className="text-[12px] text-white mb-[8px] leading-[1.4]">
          다중계정은 당첨자 정보 확인 후 당첨 취소 될 수 있음
        </li>
        <li className="text-[12px] text-white mb-[8px] leading-[1.4]">
          당첨자명과 예금주명 불일치 시 당첨금 지급 불가
        </li>
      </ul>

      {/* 3. LIVE 스코어 다운 받기 버튼 */}
      <a 
        href="https://home.psynet.co.kr/livescore" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex justify-center items-center h-[87px] bg-[#1A5F7A] text-[25px] text-white text-opacity-90 hover:bg-[#1d6e8c] transition-colors"
      >
        LIVE 스코어<br />다운 받기
      </a>
    </section>
  );
};
