//eventStatus//
//이벤트 대기, 유저 미선택 	PENDING_USER_NOT_SELECTED//
//이벤트 대기, 유저 선택 완료  PENDING_USER_SELECTED//
//이벤트 진행, 유저 미선택 	IN_PROGRESS_USER_NOT_SELECTED//
//이벤트 진행, 유저 선택 완료 	IN_PROGRESS_USER_SELECTED//
//이벤트 종료, 유저 성공	COMPLETED_USER_SUCCESS//
//이벤트 종료, 유저 실패	COMPLETED_USER_FAIL//
//이벤트 종료, 유저 미선택	COMPLETED_USER_NOT_SELECTED//
//경기 없음, 이벤트 참여 불가	NO_GAMES_EVENT_DISABLED//
//3경기 이상 이벤트 취소	EVENT_CANCELLED_MULTI_GAMES//


(function() {
  window.matchData = {
    "2025-07-01": {
      eventStatus: "EVENT_CANCELLED_MULTI_GAMES",
      totalParticipants: 12000,
      winners: 0,
      games: [
        {
          gameId: "20250713-0",
          home: { teamName: "LG", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/3NqgO_dpTThWu3KBf600tg_48x48.png", votes: 123 },
          draw: { teamName: "무승부", votes: 45 },
          away: { teamName: "KT", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/LUZj3ojt_H6lYisolvQ2pg_48x48.png", votes: 67 },
          status: "경기취소",
          startTime: "18:30",
          userSelection: "home",
          gameResult: "home",
          eventResult: "success",
          league: "KBO"
        },
        {
          gameId: "20250713-1",
          home: { teamName: "NC", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/dDCbStDchWQktsZf2swYyA_48x48.png", votes: 234 },
          draw: { teamName: "무승부", votes: 12 },
          away: { teamName: "한화", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/pq5JUk7H0b6KX5Wi8M0xbA_48x48.png", votes: 56 },
          status: "경기취소",
          startTime: "18:30",
          userSelection: "home",
          gameResult: "home",
          eventResult: "success",
          league: "KBO"
        },
        {
          gameId: "20250713-2",
          home: { teamName: "삼성", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/c_Jn4jW-NOwRtnGE7uQRAA_48x48.png", votes: 345 },
          draw: { teamName: "무승부", votes: 23 },
          away: { teamName: "두산", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/AP_sE5nmR8ckhs_zEhDzEg_48x48.png", votes: 78 },
          status: "경기취소",
          startTime: "18:30",
          userSelection: "home",
          gameResult: "draw",
          eventResult: "success",
          league: "KBO"
        },
        {
          gameId: "20250713-3",
          home: { teamName: "SSG", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/171JeGI-4meYHLIoUPjerQ_48x48.png", votes: 456 },
          draw: { teamName: "무승부", votes: 34 },
          away: { teamName: "KIA", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/psd7z7tnBo7SD8f_Fxs-yg_48x48.png", votes: 89 },
          status: "경기취소",
          startTime: "18:30",
          userSelection: "home",
          gameResult: "draw",
          eventResult: "success",
          league: "KBO"
        },
        {
          gameId: "20250713-4",
          home: { teamName: "롯데", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/cGrvIuBYzj4D6KFLPV1MBg_48x48.png", votes: 567 },
          draw: { teamName: "무승부", votes: 56 },
          away: { teamName: "키움", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/BXbvDpPIJZ_HpPL4qikxNg_48x48.png", votes: 90 },
          status: "경기취소",
          startTime: "18:30",
          userSelection: "home",
          gameResult: "draw",
          eventResult: "success",
          league: "KBO"
        }
      ]
    },
    "2025-07-19": {
      eventStatus: "COMPLETED_USER_SUCCESS",
      totalParticipants: 15000,
      winners: 23,
      games: [
        {
          gameId: "20250512-0",
          home: { teamName: "LG", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/3NqgO_dpTThWu3KBf600tg_48x48.png", votes: 3215 },
          draw: { teamName: "무승부", votes: 2496 },
          away: { teamName: "KT", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/LUZj3ojt_H6lYisolvQ2pg_48x48.png", votes: 1111 },
          status: "경기종료",
          startTime: "18:00",
          score: { home: 1, away: 0 },
          userSelection: "home",
          gameResult: "home",
          eventResult: "success", league: "KBO"
        },
        {
          gameId: "20250512-1",
          home: { teamName: "NC", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/dDCbStDchWQktsZf2swYyA_48x48.png", votes: 4322 },
          draw: { teamName: "무승부", votes: 849 },
          away: { teamName: "한화", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/pq5JUk7H0b6KX5Wi8M0xbA_48x48.png", votes: 227 },
          status: "경기종료",
          startTime: "18:00",
          score: { home: 1, away: 2 },
          userSelection: "away",
          gameResult: "away",
          eventResult: "success",
          league: "KBO"
        },
        {
          gameId: "20250512-2",
          home: { teamName: "삼성", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/c_Jn4jW-NOwRtnGE7uQRAA_48x48.png", votes: 9324 },
          draw: { teamName: "무승부", votes: 153 },
          away: { teamName: "두산", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/AP_sE5nmR8ckhs_zEhDzEg_48x48.png", votes: 423 },
          status: "경기취소",
          startTime: "18:00",
          score: { home: 0, away: 0 },
          userSelection: "away",
          gameResult: "draw",
          eventResult: "success",
          league: "KBO"
        },
        {
          gameId: "20250512-3",
          home: { teamName: "SSG", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/171JeGI-4meYHLIoUPjerQ_48x48.png", votes: 5524 },
          draw: { teamName: "무승부", votes: 4263 },
          away: { teamName: "KIA", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/psd7z7tnBo7SD8f_Fxs-yg_48x48.png", votes: 4218 },
          status: "경기종료",
          startTime: "18:00",
          score: { home: 3, away: 9 },
          userSelection: "away",
          gameResult: "away",
          eventResult: "success",
          league: "KBO"
        },
        {
          gameId: "20250512-4",
          home: { teamName: "롯데", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/cGrvIuBYzj4D6KFLPV1MBg_48x48.png", votes: 1230 },
          draw: { teamName: "무승부", votes: 1691 },
          away: { teamName: "키움", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/BXbvDpPIJZ_HpPL4qikxNg_48x48.png", votes: 5525 },
          status: "경기종료",
          startTime: "18:00",
          score: { home: 6, away: 4 },
          userSelection: "home",
          gameResult: "home",
          eventResult: "success",
          league: "KBO"
        }
      ]
    },
    "2025-07-20": {
      eventStatus: "COMPLETED_USER_SUCCESS",
      totalParticipants: 17000,
      winners: 19,
      games: [
        {
          gameId: "20250513-0",
          home: { teamName: "LG", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/3NqgO_dpTThWu3KBf600tg_48x48.png", votes: 3215 },
          draw: { teamName: "무승부", votes: 3757 },
          away: { teamName: "KT", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/LUZj3ojt_H6lYisolvQ2pg_48x48.png", votes: 1111 },
          status: "경기종료",
          startTime: "18:00",
          score: { home: 8, away: 3 },
          userSelection: "home",
          gameResult: "home",
          eventResult: "success",
          league: "KBO"
        },
        {
          gameId: "20250513-1",
          home: { teamName: "NC", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/dDCbStDchWQktsZf2swYyA_48x48.png", votes: 4322 },
          draw: { teamName: "무승부", votes: 319 },
          away: { teamName: "한화", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/pq5JUk7H0b6KX5Wi8M0xbA_48x48.png", votes: 227 },
          status: "경기종료",
          startTime: "18:00",
          score: { home: 1, away: 6 },
          userSelection: "away",
          gameResult: "away",
          eventResult: "success",
          league: "KBO"
        },
        {
          gameId: "20250513-2",
          home: { teamName: "삼성", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/c_Jn4jW-NOwRtnGE7uQRAA_48x48.png", votes: 9324 },
          draw: { teamName: "무승부", votes: 5823 },
          away: { teamName: "두산", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/AP_sE5nmR8ckhs_zEhDzEg_48x48.png", votes: 423 },
          status: "경기종료",
          startTime: "18:00",
          score: { home: 7, away: 2 },
          userSelection: "home",
          gameResult: "home",
          eventResult: "success", league: "KBO"
        },
        {
          gameId: "20250513-3",
          home: { teamName: "SSG", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/171JeGI-4meYHLIoUPjerQ_48x48.png", votes: 5524 },
          draw: { teamName: "무승부", votes: 791 },
          away: { teamName: "KIA", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/psd7z7tnBo7SD8f_Fxs-yg_48x48.png", votes: 4218 },
          status: "경기종료",
          startTime: "18:00",
          score: { home: 3, away: 9 },
          userSelection: "away",
          gameResult: "away",
          eventResult: "success", league: "KBO"
        },
        {
          gameId: "20250513-4",
          home: { teamName: "롯데", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/cGrvIuBYzj4D6KFLPV1MBg_48x48.png", votes: 1230 },
          draw: { teamName: "무승부", votes: 4856 },
          away: { teamName: "키움", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/BXbvDpPIJZ_HpPL4qikxNg_48x48.png", votes: 5525 },
          status: "경기종료",
          startTime: "18:00",
          score: { home: 6, away: 4 },
          userSelection: "home",
          gameResult: "home",
          eventResult: "success", league: "KBO"
        }
      ]
    },
    "2025-07-21": {
      eventStatus: "COMPLETED_USER_FAIL",
      totalParticipants: 14000,
      winners: 1,
      games: [
        {
          gameId: "20250514-0",
          home: { teamName: "KT", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/LUZj3ojt_H6lYisolvQ2pg_48x48.png", votes: 1111 },
          draw: { teamName: "무승부", votes: 966 },
          away: { teamName: "LG", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/3NqgO_dpTThWu3KBf600tg_48x48.png", votes: 3215 },
          status: "경기종료",
          startTime: "18:00",
          score: { home: 11, away: 5 },
          userSelection: "home",
          gameResult: "home",
          eventResult: "success", league: "KBO"
        },
        {
          gameId: "20250514-1",
          home: { teamName: "한화", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/pq5JUk7H0b6KX5Wi8M0xbA_48x48.png", votes: 227 },
          draw: { teamName: "무승부", votes: 7924 },
          away: { teamName: "NC", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/dDCbStDchWQktsZf2swYyA_48x48.png", votes: 4322 },
          status: "경기종료",
          startTime: "18:00",
          score: { home: 7, away: 2 },
          userSelection: "home",
          gameResult: "home",
          eventResult: "success", league: "KBO"
        },
        {
          gameId: "20250514-2",
          home: { teamName: "두산", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/AP_sE5nmR8ckhs_zEhDzEg_48x48.png", votes: 423 },
          draw: { teamName: "무승부", votes: 2018 },
          away: { teamName: "삼성", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/c_Jn4jW-NOwRtnGE7uQRAA_48x48.png", votes: 9324 },
          status: "경기종료",
          startTime: "18:00",
          score: { home: 3, away: 9 },
          userSelection: "away",
          gameResult: "away",
          eventResult: "success", league: "KBO"
        },
        {
          gameId: "20250514-3",
          home: { teamName: "KIA", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/psd7z7tnBo7SD8f_Fxs-yg_48x48.png", votes: 4218 },
          draw: { teamName: "무승부", votes: 601 },
          away: { teamName: "SSG", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/171JeGI-4meYHLIoUPjerQ_48x48.png", votes: 5524 },
          status: "경기종료",
          startTime: "18:00",
          score: { home: 8, away: 4 },
          userSelection: "away",
          gameResult: "home",
          eventResult: "fail", league: "KBO"
        },
        {
          gameId: "20250514-4",
          home: { teamName: "키움", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/BXbvDpPIJZ_HpPL4qikxNg_48x48.png", votes: 5525 },
          draw: { teamName: "무승부", votes: 3772 },
          away: { teamName: "롯데", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/cGrvIuBYzj4D6KFLPV1MBg_48x48.png", votes: 1230 },
          status: "경기종료",
          startTime: "18:00",
          score: { home: 5, away: 10 },
          userSelection: "home",
          gameResult: "away",
          eventResult: "fail", league: "KBO"
        }
      ]
    },
    "2025-07-22": {
      eventStatus: "COMPLETED_USER_FAIL",
      totalParticipants: 16000,
      winners: 11,
      games: [
        {
          gameId: "20250515-0",
          home: { teamName: "KT", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/LUZj3ojt_H6lYisolvQ2pg_48x48.png", votes: 1243 },
          draw: { teamName: "무승부", votes: 1184 },
          away: { teamName: "SK", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/171JeGI-4meYHLIoUPjerQ_48x48.png", votes: 4214 },
          status: "경기취소",
          startTime: "18:00",
          userSelection: "home", league: "KBO"
        },
        {
          gameId: "20250515-1",
          home: { teamName: "KT", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/LUZj3ojt_H6lYisolvQ2pg_48x48.png", votes: 1243 },
          draw: { teamName: "무승부", votes: 2013 },
          away: { teamName: "SK", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/171JeGI-4meYHLIoUPjerQ_48x48.png", votes: 4214 },
          status: "경기종료",
          startTime: "18:00",
          score: { home: 88, away: 1 },
          userSelection: "away", league: "KBO",
          gameResult: "away",
          eventResult: "fail"
        },
        {
          gameId: "20250515-2",
          home: { teamName: "KT", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/LUZj3ojt_H6lYisolvQ2pg_48x48.png", votes: 1243 },
          draw: { teamName: "무승부", votes: 1387 },
          away: { teamName: "SK", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/171JeGI-4meYHLIoUPjerQ_48x48.png", votes: 4214 },
          status: "경기종료",
          startTime: "18:00",
          score: { home: 2, away: 5 },
          userSelection: "away",
          gameResult: "away",
          eventResult: "success", league: "KBO"
        },
        {
          gameId: "20250515-3",
          home: { teamName: "KT", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/LUZj3ojt_H6lYisolvQ2pg_48x48.png", votes: 1243 },
          draw: { teamName: "무승부", votes: 2455 },
          away: { teamName: "SK", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/171JeGI-4meYHLIoUPjerQ_48x48.png", votes: 4214 },
          status: "경기종료",
          startTime: "18:00",
          score: { home: 5, away: 2 },
          userSelection: "away",
          gameResult: "home",
          eventResult: "fail", league: "KBO"
        },
        {
          gameId: "20250515-4",
          home: { teamName: "KT", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/LUZj3ojt_H6lYisolvQ2pg_48x48.png", votes: 1243 },
          draw: { teamName: "무승부", votes: 754 },
          away: { teamName: "SK", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/171JeGI-4meYHLIoUPjerQ_48x48.png", votes: 4214 },
          status: "경기종료",
          startTime: "18:00",
          score: { home: 1, away: 1 },
          userSelection: "home", league: "KBO",
          gameResult: "home",
          eventResult: "fail"
        }
      ]
    },
    "2025-07-24": {
      eventStatus: "COMPLETED_USER_NOT_SELECTED",
      totalParticipants: 18020,
      winners: null,
      games: [
        {
          gameId: "20250515-0",
          home: { teamName: "KT", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/LUZj3ojt_H6lYisolvQ2pg_48x48.png", votes: 1243 },
          draw: { teamName: "무승부", votes: 1184 },
          away: { teamName: "SK", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/171JeGI-4meYHLIoUPjerQ_48x48.png", votes: 4214 },
          status: "경기취소",
          startTime: "18:00",
          userSelection: "home", league: "KBO"
        },
        {
          gameId: "20250515-1",
          home: { teamName: "KT", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/LUZj3ojt_H6lYisolvQ2pg_48x48.png", votes: 1243 },
          draw: { teamName: "무승부", votes: 2013 },
          away: { teamName: "SK", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/171JeGI-4meYHLIoUPjerQ_48x48.png", votes: 4214 },
          status: "경기종료",
          startTime: "18:00",
          score: { home: 88, away: 1 },
          userSelection: "away", league: "KBO",
          gameResult: "away",
          eventResult: "fail"
        },
        {
          gameId: "20250515-2",
          home: { teamName: "KT", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/LUZj3ojt_H6lYisolvQ2pg_48x48.png", votes: 1243 },
          draw: { teamName: "무승부", votes: 1387 },
          away: { teamName: "SK", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/171JeGI-4meYHLIoUPjerQ_48x48.png", votes: 4214 },
          status: "경기종료",
          startTime: "18:00",
          score: { home: 2, away: 5 },
          userSelection: "away",
          gameResult: "away",
          eventResult: "success", league: "KBO"
        },
        {
          gameId: "20250515-3",
          home: { teamName: "KT", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/LUZj3ojt_H6lYisolvQ2pg_48x48.png", votes: 1243 },
          draw: { teamName: "무승부", votes: 2455 },
          away: { teamName: "SK", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/171JeGI-4meYHLIoUPjerQ_48x48.png", votes: 4214 },
          status: "경기종료",
          startTime: "18:00",
          score: { home: 5, away: 2 },
          userSelection: "away",
          gameResult: "home",
          eventResult: "fail", league: "KBO"
        },
        {
          gameId: "20250515-4",
          home: { teamName: "KT", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/LUZj3ojt_H6lYisolvQ2pg_48x48.png", votes: 1243 },
          draw: { teamName: "무승부", votes: 754 },
          away: { teamName: "SK", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/171JeGI-4meYHLIoUPjerQ_48x48.png", votes: 4214 },
          status: "경기종료",
          startTime: "18:00",
          score: { home: 1, away: 1 },
          userSelection: "home", league: "KBO",
          gameResult: "home",
          eventResult: "fail"
        }
      ]
    },
    "2025-07-25": {
      eventStatus: "PENDING_USER_NOT_SELECTED",
      totalParticipants: 20000,
      winners: 3,
      games: [
        {
          gameId: "20250522-0",
          home: { teamName: "KT", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/LUZj3ojt_H6lYisolvQ2pg_48x48.png", votes: 0 },
          draw: { teamName: "무승부", votes: 2901 },
          away: { teamName: "LG", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/3NqgO_dpTThWu3KBf600tg_48x48.png", votes: 0 },
          status: "경기전",
          startTime: "18:00",
          userSelection: "none", league: "KBO"
        },
        {
          gameId: "20250522-1",
          home: { teamName: "한화", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/pq5JUk7H0b6KX5Wi8M0xbA_48x48.png", votes: 0 },
          draw: { teamName: "무승부", votes: 1405 },
          away: { teamName: "NC", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/dDCbStDchWQktsZf2swYyA_48x48.png", votes: 0 },
          status: "경기전",
          startTime: "18:00",
          userSelection: "none", league: "KBO"
        },
        {
          gameId: "20250522-2",
          home: { teamName: "두산", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/AP_sE5nmR8ckhs_zEhDzEg_48x48.png", votes: 0 },
          draw: { teamName: "무승부", votes: 3200 },
          away: { teamName: "삼성", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/c_Jn4jW-NOwRtnGE7uQRAA_48x48.png", votes: 0 },
          status: "경기전",
          startTime: "18:00",
          userSelection: "none", league: "KBO"
        },
        {
          gameId: "20250522-3",
          home: { teamName: "KIA", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/psd7z7tnBo7SD8f_Fxs-yg_48x48.png", votes: 0 },
          draw: { teamName: "무승부", votes: 493 },
          away: { teamName: "SSG", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/171JeGI-4meYHLIoUPjerQ_48x48.png", votes: 0 },
          status: "경기전",
          startTime: "18:00",
          userSelection: "none", league: "KBO"
        },
        {
          gameId: "20250522-4",
          home: { teamName: "키움", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/BXbvDpPIJZ_HpPL4qikxNg_48x48.png", votes: 0 },
          draw: { teamName: "무승부", votes: 7199 },
          away: { teamName: "롯데", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/cGrvIuBYzj4D6KFLPV1MBg_48x48.png", votes: 0 },
          status: "경기전",
          startTime: "18:00",
          userSelection: "none", league: "KBO"
        }
      ]
    },
    "2025-07-27": {
      eventStatus: "PENDING_USER_NOT_SELECTED",
      totalParticipants: 21000,
      winners: null,
      games: [
        {
          gameId: "20250523-0",
          home: { teamName: "KT", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/LUZj3ojt_H6lYisolvQ2pg_48x48.png", votes: 0 },
          draw: { teamName: "무승부", votes: 571 },
          away: { teamName: "LG", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/3NqgO_dpTThWu3KBf600tg_48x48.png", votes: 0 },
          status: "경기전",
          startTime: "18:00",
          userSelection: "none", league: "KBO"
        },
        {
          gameId: "20250523-1",
          home: { teamName: "한화", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/pq5JUk7H0b6KX5Wi8M0xbA_48x48.png", votes: 0 },
          draw: { teamName: "무승부", votes: 3346 },
          away: { teamName: "NC", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/dDCbStDchWQktsZf2swYyA_48x48.png", votes: 0 },
          status: "경기전",
          startTime: "18:00",
          userSelection: "none", league: "KBO"
        },
        {
          gameId: "20250523-2",
          home: { teamName: "두산", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/AP_sE5nmR8ckhs_zEhDzEg_48x48.png", votes: 0 },
          draw: { teamName: "무승부", votes: 246 },
          away: { teamName: "삼성", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/c_Jn4jW-NOwRtnGE7uQRAA_48x48.png", votes: 0 },
          status: "경기전",
          startTime: "18:00",
          userSelection: "none", league: "KBO"
        },
        {
          gameId: "20250523-3",
          home: { teamName: "KIA", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/psd7z7tnBo7SD8f_Fxs-yg_48x48.png", votes: 0 },
          draw: { teamName: "무승부", votes: 882 },
          away: { teamName: "SSG", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/171JeGI-4meYHLIoUPjerQ_48x48.png", votes: 0 },
          status: "경기전",
          startTime: "18:00",
          userSelection: "none", league: "KBO"
        },
        {
          gameId: "20250523-4",
          home: { teamName: "키움", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/BXbvDpPIJZ_HpPL4qikxNg_48x48.png", votes: 0 },
          draw: { teamName: "무승부", votes: 5555 },
          away: { teamName: "롯데", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/cGrvIuBYzj4D6KFLPV1MBg_48x48.png", votes: 0 },
          status: "경기전",
          startTime: "18:00",
          userSelection: "none", league: "KBO"
        }
      ]
    },
    "2025-07-28": {
      eventStatus: "PENDING_USER_NOT_SELECTED",
      totalParticipants: 22000,
      winners: null,
      games: [
        {
          gameId: "20250531-0",
          home: { teamName: "LG", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/3NqgO_dpTThWu3KBf600tg_48x48.png", votes: 2301 },
          draw: { teamName: "무승부", votes: 1732 },
          away: { teamName: "KT", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/LUZj3ojt_H6lYisolvQ2pg_48x48.png", votes: 1932 },
          status: "경기전",
          startTime: "18:30",
          userSelection: "none", league: "KBO"
        },
        {
          gameId: "20250531-1",
          home: { teamName: "한화", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/pq5JUk7H0b6KX5Wi8M0xbA_48x48.png", votes: 1432 },
          draw: { teamName: "무승부", votes: 899 },
          away: { teamName: "NC", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/dDCbStDchWQktsZf2swYyA_48x48.png", votes: 2481 },
          status: "경기전",
          startTime: "18:30",
          userSelection: "none", league: "KBO"
        },
        {
          gameId: "20250531-2",
          home: { teamName: "두산", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/AP_sE5nmR8ckhs_zEhDzEg_48x48.png", votes: 1820 },
          draw: { teamName: "무승부", votes: 675 },
          away: { teamName: "삼성", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/c_Jn4jW-NOwRtnGE7uQRAA_48x48.png", votes: 1477 },
          status: "경기전",
          startTime: "18:30",
          userSelection: "none", league: "KBO"
        }
      ]
    },
    "2025-07-29": {
      eventStatus: "PENDING_USER_NOT_SELECTED",
      totalParticipants: 23000,
      winners: null,
      games: [
        {
          gameId: "20250601-0",
          home: { teamName: "롯데", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/cGrvIuBYzj4D6KFLPV1MBg_48x48.png", votes: 890 },
          draw: { teamName: "무승부", votes: 2922 },
          away: { teamName: "키움", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/BXbvDpPIJZ_HpPL4qikxNg_48x48.png", votes: 1518 },
          status: "경기전",
          startTime: "18:00",
          userSelection: "none", league: "KBO"
        },
        {
          gameId: "20250601-1",
          home: { teamName: "KIA", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/psd7z7tnBo7SD8f_Fxs-yg_48x48.png", votes: 2030 },
          draw: { teamName: "무승부", votes: 437 },
          away: { teamName: "SSG", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/171JeGI-4meYHLIoUPjerQ_48x48.png", votes: 1794 },
          status: "경기전",
          startTime: "18:30",
          userSelection: "none", league: "KBO"
        },
        {
          gameId: "20250601-2",
          home: { teamName: "LG", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/3NqgO_dpTThWu3KBf600tg_48x48.png", votes: 1342 },
          draw: { teamName: "무승부", votes: 891 },
          away: { teamName: "KT", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/LUZj3ojt_H6lYisolvQ2pg_48x48.png", votes: 1832 },
          status: "경기전",
          startTime: "19:00",
          userSelection: "none", league: "KBO"
        }
      ]
    },
    "2025-07-30": {
      eventStatus: "EVENT_CANCELLED_MULTI_GAMES",
      totalParticipants: 11000,
      winners: 0,
      games: [
        {
          gameId: "20250601-0",
          home: { teamName: "롯데", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/cGrvIuBYzj4D6KFLPV1MBg_48x48.png", votes: 890 },
          draw: { teamName: "무승부", votes: 2922 },
          away: { teamName: "키움", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/BXbvDpPIJZ_HpPL4qikxNg_48x48.png", votes: 1518 },
          status: "경기취소",
          startTime: "18:00",
          userSelection: "none", league: "KBO"
        },
        {
          gameId: "20250601-1",
          home: { teamName: "KIA", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/psd7z7tnBo7SD8f_Fxs-yg_48x48.png", votes: 2030 },
          draw: { teamName: "무승부", votes: 437 },
          away: { teamName: "SSG", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/171JeGI-4meYHLIoUPjerQ_48x48.png", votes: 1794 },
          status: "경기취소",
          startTime: "18:30",
          userSelection: "none", league: "KBO"
        },
        {
          gameId: "20250601-2",
          home: { teamName: "LG", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/3NqgO_dpTThWu3KBf600tg_48x48.png", votes: 1342 },
          draw: { teamName: "무승부", votes: 891 },
          away: { teamName: "KT", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/LUZj3ojt_H6lYisolvQ2pg_48x48.png", votes: 1832 },
          status: "경기취소",
          startTime: "19:00",
          userSelection: "none", league: "KBO"
        }
      ]
    },
    "2025-08-01": {
      eventStatus: "NO_GAMES_EVENT_DISABLED",
      totalParticipants: 9000,
      winners: 0,
      games: [
        
      ]
    }
  };
})();

