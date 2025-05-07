// src/components/sections/TeamSelectionSection.tsx

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { GameType } from "@/types/game";
import GameItem from '@/components/GameItem';
import GameResultItem from '@/components/GameResultItem';

// KBO 팀 로고 URL
const teamLogos = {
  "KT": "https://i.namu.wiki/i/oBeeNjwnmWwfmQIVYLOMNprU2uRBNkrDFPUijjme-tifWUeeE0D8P652TlU8V7w7peExR5E-_lwv7jf0IGUKuw.svg",
  "LG": "https://i.namu.wiki/i/LxXhJtRrfucU3cBPgVME5T6MT6vjFCXGCMgLXkNv2AyAJTEP_zI9E1quP_IG2052hqxSgqD6qYMn_9rMCsTyiP5TqUG7IYjkllXSiywzU8ukzKRI954tqCDD0SQ-eZXKKcgOhqFD02PIYHAhWs5gxg.svg",
  "한화": "https://i.namu.wiki/i/8pj9ZIy7Q8FnbR4hLnZ7nkC7S8vVl5q32HRIBMZDimKTvYzwRYt_UEi-UYPG-wfQY5BjuAirfqG01clbziAQJw.svg",
  "두산": "https://i.namu.wiki/i/SM6pQeZzyF0Rf0mbz5gJ91IhCMRAvh2J-wcJfmVwMhqN_PhIB5swVLSeQdnf-zTtKRi5OuoMf1h4cUGuJObRaS6s9pFkfd7QPZX7SHgBjQrNoApf46RgfGWhf3q57yC6AH3GTDwTFdzT1gNOgd76VA.svg",
  "KIA": "https://i.namu.wiki/i/zWuonkrdoxBaxY6oe9RGf6u-YL0YJRUp3th5-fNkKGk7RqgNESeCtcbGl3HeR0LMP3SZ9IlYAsP3kSIjZhJgWUabnZCI4PwazHMbgxczAxOVJ_qZdcvxrOrITwsmnMQvUTTtIzPBfL9QX56ht0FPFQ.svg",
  "키움": "https://i.namu.wiki/i/iYY2lyEZKY3EpAtu2Uy9b1hDvQ3ijc8ivfkk6fBltP-LpJtQtudzC_LtkXfEKBBogFRAU4ETVrctfuN1UIt-5FaAcqvpMgKAbOTOFGxXB-XQ6wP_NqGndl5ChTxyqSzlJ6P9RWe6RkmM5ieuOXWbw.svg",
  "NC": "https://i.namu.wiki/i/N235-wD7Qzau4r3dfNwgqhqN1-4AEBCQey4tS-vqDgZuhLa_16KiGqbCHd-IWjrcDn2NtvZN7iT7X5eC9xekk7q5gYoJkxZ7pLoUBK8nGXGnfRE1UaP0QrxjCsoaKSOndKRyV1vhqHD0LLivZFM7wQ.svg",
  "삼성": "https://i.namu.wiki/i/oV_2e6_8-vFepLD0dHLsenkQEo0aj4nleb3xcilEZwi2Cfhr6jZMUZFb503MAlLmfapeHzMMR7DCEi3OJECz9LnJzb-Eic1W_-rNin-im1XlNDjGjbZsmQTmBueDFUvttyLHB2FA4QXIaDD9g0LeMw.svg",
  "SSG": "https://i.namu.wiki/i/TV5apmiATJX1d8xGgk6PtBctZeKxFCMZpUmFPaMcDkC36k1maJJokJ0Gpkuocah54nbKIQOAZUgyD9Ow-3512VLBwtDYyAN0Jm8JEe6_j-r534KUAVoCZ46NkOeJmI8y77ukV48NxCnbQ6KenB0UmQ.svg",
  "롯데": "https://i.namu.wiki/i/cFb8Ykp4kxvpk-foBdgeGyj3d2TGfYSW41KZ-k9SjjVsFSFgJnvAthnIjAND2AE____xihT73odP_H3LTi1UOjvyw5raOqh1biiza57RlobyEzf-ItioBNQEl8rtdqyY0Vw9hsk1CmUx7kNp3oddWw.svg"
};

// 내일 경기 데이터
const kboGames: GameType[] = [
  { id: 0, homeTeam: { name: "KT", logo: teamLogos.KT, votes: 1941 }, awayTeam: { name: "LG", logo: teamLogos.LG, votes: 3304 }, time: "18:00", status: "투표 중" },
  { id: 1, homeTeam: { name: "한화", logo: teamLogos["한화"], votes: 4720 }, awayTeam: { name: "NC", logo: teamLogos.NC, votes: 524 }, time: "18:00", status: "투표 중" },
  { id: 2, homeTeam: { name: "두산", logo: teamLogos["두산"], votes: 0 }, awayTeam: { name: "삼성", logo: teamLogos["삼성"], votes: 5245 }, time: "18:00", status: "투표 중" },
  { id: 3, homeTeam: { name: "KIA", logo: teamLogos.KIA, votes: 4458 }, awayTeam: { name: "SSG", logo: teamLogos.SSG, votes: 787 }, time: "18:00", status: "투표 중" },
  { id: 4, homeTeam: { name: "키움", logo: teamLogos["키움"], votes: 787 }, awayTeam: { name: "롯데", logo: teamLogos["롯데"], votes: 4458 }, time: "18:00", status: "투표 중" }
];

// 오늘 결과 데이터
const todayResults = [
  { id: 0, homeTeam: { name: "KT", logo: teamLogos.KT, votes: 1941 }, awayTeam: { name: "LG", logo: teamLogos.LG, votes: 3304 }, homeScore: 1, awayScore: 5, status: "종료" },
  { id: 1, homeTeam: { name: "한화", logo: teamLogos["한화"], votes: 4720 }, awayTeam: { name: "NC", logo: teamLogos.NC, votes: 524 }, homeScore: 2, awayScore: 3, status: "경기 중" },
  { id: 2, homeTeam: { name: "두산", logo: teamLogos["두산"], votes: 0 }, awayTeam: { name: "삼성", logo: teamLogos["삼성"], votes: 5245 }, homeScore: 4, awayScore: 4, status: "경기 중" },
  { id: 3, homeTeam: { name: "KIA", logo: teamLogos.KIA, votes: 4458 }, awayTeam: { name: "SSG", logo: teamLogos.SSG, votes: 787 }, homeScore: 10, awayScore: 2, status: "경기 중" },
  { id: 4, homeTeam: { name: "키움", logo: teamLogos["키움"], votes: 787 }, awayTeam: { name: "롯데", logo: teamLogos["롯데"], votes: 4458 }, homeScore: 1, awayScore: 0, status: "경기 중" }
];

// Today 기본 선택팀
const defaultSelectedTeams = {
  0: 'home',
  1: 'away',
  2: 'away',
  3: 'home',
  4: 'home'
};

// 어제 결과 데이터 (생략)

const TeamSelectionSection: React.FC = () => {
  const [selected, setSelected] = useState<Record<number, string>>({});
  const [buttonRendered, setButtonRendered] = useState(false);
  const [currentDay, setCurrentDay] = useState<number>(26); // Today

  useEffect(() => {
    const btn = document.getElementById('submit-allkill-btn');
    if (btn) {
      btn.dataset.reactRendered = 'true';
      setButtonRendered(true);
      document.dispatchEvent(new CustomEvent('react-rendered', {
        detail: { elementId: 'submit-allkill-btn' }
      }));
    }
  }, []);

  useEffect(() => {
    if (currentDay === 26) setSelected(defaultSelectedTeams);
    else setSelected({});
  }, [currentDay]);

  const handleDateChange = (day: number) => setCurrentDay(day);
  const handleTeamSelect = (id: number, side: 'home'|'away') =>
    setSelected(prev => ({ ...prev, [id]: side }));
  const isAllSelected = Object.keys(selected).length === kboGames.length;

  return (
    <section id="team-selection-section">
      {/* 날짜 네비게이션 / 내일 섹션 생략 */}

      {/* Today 결과 */}
      {currentDay === 26 && (
        <div className="team-selection-section flex flex-col gap-4" id="team-selection-section-today">
          <h2 className="team-selection-title flex items-center justify-center">
            {/* 타이틀 이미지 */}
          </h2>

          <div className="game-list flex flex-col gap-2" id="game-list">
            {todayResults.map((game, idx) => (
              <div
                key={game.id}
                className={`relative ${game.id === 0 ? 'bg-black/30 pointer-events-none' : ''}`}
              >
                {/* 첫 경기 오답 슬래시 */}
                {game.id === 0 && (
                  <img
                    src="https://lh3.googleusercontent.com/fife/ALs6j_HdGcZPY18Tcj8Q0AEJmM_3wII6CPILCnayLTdmGvadRIC3UtlI829q9TKOrr0yRdpR8Mg3rwP53GNzcfhWRFiS6p2bQdYDeYtf0blFn8vQqoJtB86CpgmLbPyzY9dmDoXcVg_ino9x6ZGZyCm2amyJqHGvbrXRSwibZu5QjySIjteqx5t8Qa1uSdbUTgXQSLC4Tr8rsvSod4Lac5QmShOH00AoYTfXmKbETMj-xSuebfVdEQ-Cab4xgiYlK-OhS7en3Jzy9nMg4Ms5U2l_08ggzaQihXBHjzqmfQ-S3kpiH0ZgA2gMDyu-LeV_9I22grjXFt38cUd7P7X3B4lL4TqpNhF2_fLLThjH-l2jtEO4l3Fcw-syua2tET_G5kbcht43CLOEIdLKRYmETsPxRy5g1nUuxzohYNKuuN_FPBcimVG67MqpY-UiCGPPe7qT1SeCd4QMON4dYSOQ8pHcqAzDUsKZo0piXepdmGCuX6z7QONUtL-QT7N4Ah5cgvUWzl9LnDxQbDhyQTdGrrePMmbDROJ0LTcpm4RVGCiAyjpPD5sBl470NZbH8Tvx5x6jtt-60ypL0rAz1lVSw4QR8yl2YsW2MIzs7GseeBJ3lAzpSBd5AkAAsvdP9aWp_1bjcPDpUp7rZudvcyCc0BMLTP2X1iRy1cpMX7HS1PORLzrZYiNlarHcQ-Cbe5wIJtHPYCdT1BV91XN-lY2H1hZGsK8H74YQZCs_aaMTySwLywNPegCk1mYTiEJku2k9gPFWrzoOYQsWIWalo69yb-i5rm6227fgMm-39l9lll4Btf6UK8HTsbsJ0APVY7k82vQAhdmkd1j1fiBC8Qm4taM2mnsxMlAGB5HcWDns6_I_DgXrhxqsI6GIC70A7kdhJv5-XNwOwy0rq4UygQstLeEfbttlTzyp5vCOuiKKFbT_hbHcy2XaH8bmPK3TPFTVrm_SugMaWYmt0dydeCZyxeNUiefoc7AuIeIzhmOfE682xjp9gMnHHXvW-KcRV71leZwgPyKXLD4OmC1ao5y9R1IzaSFOU6ueKTDaI8yqj2RVDVg_RumwGeF6Lfr6bIfQ3mrx9s_YVGBcFXcJxIgnCsGgU0XGausz9j-_jQ-gNz_vagoqT7xF8wiTZ6IE9PT3SwzAZkMW8HQ4mthY19JnCggOwJnngDRPtH-7qiVAdSxsJfEI0MBTeHbLlPAiej4EmMcbbBldN_fOycrytAprbJ-pskT3gPIikX4LtHeLttXIkKv4Dw8KcE693hP0gQfxUR5cjj6SaTImvbIS3crINoVLqvtBMzMRRMeNSmqW31O0HyCEouiiqZnU6sSz8v70ZWD9brWGa8yhJcYg_OntAFu73P0wHPKSxjHXe--nafUjmCMo9f_CJ1LW8xMIYLnmE3hfQ2xS2ZgIOW7DSQGRKi1LXlzA8887U6NVI4DGGg1qPVv8UfdI2X2EbmKUsG1V7KIFVkosZAihy3Z-Ix1x7xo0kOIJzJ1YYwbn4z5lFtN-bNsjyqdQKhm9jNXEBiOwu4FM86m8zi00kPtK1G7qbdDLqmdna7hkeC38NshvfElXJQBDecePsaeJVXe_jnz6-gCj8Ssm8etJu4vSMvsWFdUck2N3=w1920-h911?auditContext=forDisplay"
                    alt="오답 슬래시"
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
                  />
                )}
                {/* 두 번째 경기(id===1)에만 빨간 원 */}
                {game.id === 1 && (
                  <img
                    src="https://lh3.googleusercontent.com/fife/ALs6j_Fk-LnigSxBFoVCUKqFUbC7E7thYZdjVImHNT2eN34nPI26Nwe5wC2NYHxlL5tZDUslgN9EfHy0eixGloOaEHl3DDXbN4n1zz9enkKOB_T3YPpZ3X9fMhb2zmZWBPTZyqdmb11XtnC5L_8hp0UZRIsyMvyI6E4VXLD8C4vlRgz6CIDJZXzI1WQ8Fl4MmifAZDr3puthWxXAdlQ8jrZzfIFaM-usaA2Fn_pUErxrU6ep8UuF4XcbSH3RIRTed8KBnarNUOVW_3wYVHAO3yA8-l5CHtpIlsNjoPHTNNH2zSI5VFgFkZhz2BaNRkptkjFLd-Lp5Uk0b2LJSkxUPteKGMo0k5_oOEo3lRSLFWNcU6hYYDCplj3RpZ-FkzH8e-HeYAG_MDFl_CJOSOCmdKldaD0siWwQxPDdcd9bCl0z5Q4A4wr_zLq40Wlt9J86n7MBHgca9ROPUThkWZhXRMdoLG5lVn6QdSBHbR5ikjcTzrayCPqbQnIs6rgn-WRE0m955CGEOjka1b1K3b9uC9HaxByyL1J6cC8C91TcEIxxNc70koiRSgjrhS1ZFaC578_6H-zfNW-6fcoEeZ7odwHzkubKFH-XEgZ9RcMHfX7bBy8wLE_DkBerK3M7eQcy--RtRlPyf0bAL8G9ERtLaLDVcJdcLzbM0RGtQKfYlM_GgbkeYEHHioYWzcRE7hnqpxmoEo-w3tFG_ICZ-gyC2PzEi-BFyom7W10m0cqEGUiyFifJpY1WkcIDcCkEUwJtLMzut-mQlWQSIh5_pQEzoZLcXr0I8Fn9FRs-P94LvXnImbOKrzUAKEDtGqh0yYfCGdFnRTITtdmLS36KDMHEOzkw2Z0--ELS6rxXFWFROSrKKtvflASn_4v1E3gXAzFle46ZYhGb0PCrelI2uxZJP_rh-VeFtNwEY5zTidfx-mkgJaNDWDD2FwpXqhTtKtAV5bimra55bFiMoESvIsEvWj_wzT1zrNSlyWs-jGyR7COYWwsEtgjpzsTUGGR7A1x9JnQm2GXrfPh-T2IMj-6V0IKxB0ESl6-8aUsaZvtb6mNRxjlQiNMARnV9OqF-0pW4rDtn1czYk-winzC5RTXT_PnTZp0ct10upgY7vMGQg-2MgdpaNeM9D09_3Bq0ardXoxR1WRHxHFGRUBkGn1U-vUgjPwhDoUyCVXA_Jj82FFv5zip3S2Yd_tycWgBPas02RwLneSBUj7zLOAx6vXAMP04Cn48ro0ehyTQK
