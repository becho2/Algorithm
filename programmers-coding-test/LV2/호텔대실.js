/**
 * 문제설명: 호텔을 운영 중인 코니는 최소한의 객실만을 사용하여 예약 손님들을 받으려고 합니다. 한 번 사용한 객실은 퇴실 시간을 기준으로 10분간 청소를 하고 다음 손님들이 사용할 수 있습니다.
예약 시각이 문자열 형태로 담긴 2차원 배열 book_time이 매개변수로 주어질 때, 코니에게 필요한 최소 객실의 수를 return 하는 solution 함수를 완성해주세요.

제한사항
1 ≤ book_time의 길이 ≤ 1,000
book_time[i]는 ["HH:MM", "HH:MM"]의 형태로 이루어진 배열입니다
[대실 시작 시각, 대실 종료 시각] 형태입니다.
시각은 HH:MM 형태로 24시간 표기법을 따르며, "00:00" 부터 "23:59" 까지로 주어집니다.
예약 시각이 자정을 넘어가는 경우는 없습니다.
시작 시각은 항상 종료 시각보다 빠릅니다.
입출력 예
book_time	result
[["15:00", "17:00"], ["16:40", "18:20"], ["14:20", "15:20"], ["14:10", "19:20"], ["18:20", "21:20"]]	3
[["09:10", "10:10"], ["10:20", "12:20"]]	1
[["10:20", "12:30"], ["10:20", "12:30"], ["10:20", "12:30"]]	3
 * @param {*} book_time 
 * @returns 
 * 푸는 데 시간이 오래 걸림
 * 이유1: 테스트케이스는 통과하는데 최종 제출시 실패하는 케이스들의 실패 이유를 알 수 없음, 이걸 짐작하는 데 긴 시간이 걸림
 * 그나마 다행인 건 전체 시간을 '숫자' 타입으로 변경해서 계산하는 것이 테스트케이스를 더 많이 통과했다는 점에서 힌트를 얻을 수 있었다는 것
 * 숫자로 변경해서 돌리면 12시63분같은 존재하지 않는 시간이 1263 이라는 숫자형태로 막 나오게 되어서 분명히 더 실패가 많을 것 같은데 문자열로 했을 때보다 오히려 더 많은 케이스를 통과함.
 * 여기에서 오히려 60분이 됐을 때 칼같이 다음시간의 00분으로 넘겨버리고, 24시00분~10분도 칼같이 계산해서 00시00분~10분으로 넘겨버린 것이 대소비교에서 에러를 발생시켰다는 걸 겨우겨우 짐작할 수 있었음.
 * 이유2: 다른 사람들의 풀이를 보니까 시간:분이 아니라 시간에 60을 곱해서 분과 더한, 하루를 '분'만으로 환산한 값을 가지고 계산했다. 그렇게 하면 훨씬 편할 듯!
 */
function solution(book_time) {
  /**
   * 시간대를 1분단위로 루프 돌면서 해당 시간대에 겹치는 시간대 예약이 몇 개인지 확인해서 최대값을 반환하면?
   * 그 전에 청소시간 10분을 예약끝나는 시간마다 더해놓으면 그 시간 자체로 계산할 수 있을 듯
   * 문자열을 다 숫자로 바꿔서 계산하면 편할까?
   */
  let 최소객실수 = 0;

  const bookTimeConvertedToNumberType = book_time.map((arr) => {
    return arr.map((v, i) => {
      const timeForCalculate = i === 1 ? plusTenMinutes(v) : v;
      return parseInt(timeForCalculate.replace(":", "")); // 문자열에서 :를 제거하고 숫자로 변환한다
    });
  });

  let 해당시점필요객실수;
  for (let i = 0; i < 2400; i++) {
    if (isOverSixty(i)) {
      continue;
    }
    해당시점필요객실수 = 0;
    for (const bookTime of bookTimeConvertedToNumberType) {
      if (i > bookTime[0] && i <= bookTime[1]) {
        해당시점필요객실수++;
      }
    }
    if (해당시점필요객실수 > 최소객실수) {
      최소객실수 = 해당시점필요객실수;
    }
  }

  return 최소객실수;
}

// 퇴실시간은 청소시간 10분을 더해준다
const plusTenMinutes = (timeString) => {
  const timeArr = timeString.split(":");
  if (timeArr[1] <= 50) {
    timeArr[1] = (parseInt(timeArr[1]) + 10).toString();
  } else {
    timeArr[1] = (parseInt(timeArr[1]) + 10 - 60).toString().padStart(2, "0");
    timeArr[0] = (parseInt(timeArr[0]) + 1).toString();
  }
  return timeArr.join(":");
};

const isOverSixty = (i) => {
  const hourMinutesString = i.toString().padStart(4, "0");
  const minutesNumber = parseInt(hourMinutesString.substring(2));
  return minutesNumber > 60;
};

/** ************************************* */
/** 다른 사람의 풀이에서 알게 된 분 환산 방법을 이용해 개선한 코드 */
function solution(book_time) {
  let 최소객실수 = 0;

  const bookTimeConvertedToNumberType = book_time.map((arr) => {
    return arr.map((v, i) => {
      const hourMinutesArr = v.split(":");
      const hourToMinutes = parseInt(hourMinutesArr[0] * 60);
      const minutes = parseInt(hourMinutesArr[1]);
      const timeIncludesCleaning =
        i === 1 ? hourToMinutes + minutes + 10 : hourToMinutes + minutes;
      return timeIncludesCleaning;
    });
  });

  let 해당시점필요객실수;
  for (let i = 0; i < 24 * 60; i++) {
    해당시점필요객실수 = 0;
    for (const bookTime of bookTimeConvertedToNumberType) {
      if (i > bookTime[0] && i <= bookTime[1]) {
        해당시점필요객실수++;
      }
    }
    if (해당시점필요객실수 > 최소객실수) {
      최소객실수 = 해당시점필요객실수;
    }
  }

  return 최소객실수;
}

/** 도전 및 실패기록 */

/**
 * 
 * @param {*} book_time 
 * @returns 
 * 테스트 1 〉	통과 (0.49ms, 33.4MB)
테스트 2 〉	통과 (2.13ms, 35.5MB)
테스트 3 〉	통과 (5.05ms, 36.1MB)
테스트 4 〉	통과 (3.47ms, 35.6MB)
테스트 5 〉	통과 (0.24ms, 33.4MB)
테스트 6 〉	실패 (4.87ms, 36MB)
테스트 7 〉	통과 (4.91ms, 35.8MB)
테스트 8 〉	통과 (3.59ms, 35.5MB)
테스트 9 〉	실패 (2.42ms, 35.4MB)
테스트 10 〉	통과 (5.44ms, 35.7MB)
테스트 11 〉	실패 (5.62ms, 35.9MB)
테스트 12 〉	실패 (5.52ms, 35.9MB)
테스트 13 〉	실패 (2.01ms, 35.5MB)
테스트 14 〉	실패 (4.44ms, 35.9MB)
테스트 15 〉	실패 (5.08ms, 36MB)
테스트 16 〉	통과 (3.05ms, 35.5MB)
테스트 17 〉	실패 (5.03ms, 35.7MB)
테스트 18 〉	실패 (4.02ms, 35.5MB)
테스트 19 〉	통과 (5.76ms, 35.9MB)
 */
function solution(book_time) {
  /**
   * 시간대를 10분단위로 루프 돌면서 해당 시간대에 겹치는 시간대 예약이 몇 개인지 확인해서 최대값을 반환하면?
   * 그 전에 청소시간 10분을 예약끝나는 시간마다 더해놓으면 그 시간 자체로 계산할 수 있을 듯
   * 문자열을 다 숫자로 바꿔서 계산하면 편할까?
   */
  let 최소객실수 = 0;

  const bookTimeConvertedToNumberType = book_time.map((arr) => {
    return arr.map((v, i) => {
      let timeForCalculate = parseInt(v.replace(":", "")); // 문자열에서 :를 제거하고 숫자로 변환한다
      return i === 1 ? timeForCalculate + 10 : timeForCalculate; // 퇴실시간은 청소시간 10분을 더해준다
    });
  });

  let 해당시점필요객실수;
  for (let i = 0; i < 2400; i = i + 10) {
    해당시점필요객실수 = 0;
    bookTimeConvertedToNumberType.forEach((bookTime) => {
      if (i >= bookTime[0] && i < bookTime[1]) {
        해당시점필요객실수++;
      }
    });
    if (해당시점필요객실수 > 최소객실수) {
      최소객실수 = 해당시점필요객실수;
    }
  }

  return 최소객실수;
}

/** javascript는 "13:00" 같은 문자열의 대소비교를 허용한다. 숫자타입으로 변환할 필요가 없다. */
/**
 * 
 * @param {*} book_time 
 * @returns 
 * 테스트 1 〉	실패 (5.14ms, 37.4MB)
테스트 2 〉	실패 (10.32ms, 37.5MB)
테스트 3 〉	실패 (26.75ms, 37.9MB)
테스트 4 〉	실패 (19.23ms, 38MB)
테스트 5 〉	통과 (0.76ms, 33.7MB)
테스트 6 〉	실패 (25.71ms, 38.3MB)
테스트 7 〉	실패 (25.26ms, 38.3MB)
테스트 8 〉	실패 (16.64ms, 38MB)
테스트 9 〉	실패 (11.76ms, 37.8MB)
테스트 10 〉	실패 (20.48ms, 38.1MB)
테스트 11 〉	실패 (28.95ms, 38MB)
테스트 12 〉	실패 (26.96ms, 38MB)
테스트 13 〉	실패 (10.77ms, 37.9MB)
테스트 14 〉	실패 (25.40ms, 38.1MB)
테스트 15 〉	실패 (26.41ms, 38.3MB)
테스트 16 〉	실패 (16.89ms, 38MB)
테스트 17 〉	실패 (29.42ms, 38.2MB)
테스트 18 〉	실패 (21.28ms, 38.1MB)
테스트 19 〉	통과 (28.32ms, 38.5MB)
 */
function solution(book_time) {
  /**
   * 시간대를 10분단위로 루프 돌면서 해당 시간대에 겹치는 시간대 예약이 몇 개인지 확인해서 최대값을 반환하면?
   * 그 전에 청소시간 10분을 예약끝나는 시간마다 더해놓으면 그 시간 자체로 계산할 수 있을 듯
   */
  let 최소객실수 = 0;

  const bookTimeIncludeCleaningTime = book_time.map((bookTimeArr) => {
    return bookTimeArr.map((v, i) => {
      return i === 1 ? plusTenMinutes(v) : v;
    });
  });

  let 해당시점필요객실수;
  let hour;
  let minutes;
  let time;
  for (let i = 0; i < 24; i++) {
    for (let j = 1; j < 60; j++) {
      해당시점필요객실수 = 0;
      hour = i.toString().padStart(2, "0");
      minutes = j.toString().padStart(2, "0");
      time = hour + ":" + minutes;
      for (const bookTime of bookTimeIncludeCleaningTime) {
        if (time >= bookTime[0] && time < bookTime[1]) {
          해당시점필요객실수++;
        }
      }
      if (해당시점필요객실수 > 최소객실수) {
        최소객실수 = 해당시점필요객실수;
      }
    }
  }

  return 최소객실수;
}

const plusTenMinutesFailed = (timeString) => {
  const timeArr = timeString.split(":");
  if (timeArr[1] < 50) {
    timeArr[1] = (parseInt(timeArr[1]) + 10).toString();
  } else {
    timeArr[1] = (parseInt(timeArr[1]) + 10 - 60).toString().padStart(2, "0");
    if (timeArr[0] === "23") {
      timeArr[0] = "00";
    } else {
      timeArr[0] = (parseInt(timeArr[0]) + 1).toString();
    }
  }
  return timeArr.join(":");
};

// 오히려 숫자로 바꿔서 계산하는 게 더 테스트를 많이 통과했다. 심지어 시간간격 10분을 1분으로 줄이니까 테스트를 두 개 빼고 다 통과해버렸다.
function solution(book_time) {
  /**
   * 시간대를 10분단위로 루프 돌면서 해당 시간대에 겹치는 시간대 예약이 몇 개인지 확인해서 최대값을 반환하면?
   * 그 전에 청소시간 10분을 예약끝나는 시간마다 더해놓으면 그 시간 자체로 계산할 수 있을 듯
   * 문자열을 다 숫자로 바꿔서 계산하면 편할까?
   */
  let 최소객실수 = 0;

  const bookTimeConvertedToNumberType = book_time.map((arr) => {
    return arr.map((v, i) => {
      let timeForCalculate = parseInt(v.replace(":", "")); // 문자열에서 :를 제거하고 숫자로 변환한다
      return i === 1 ? timeForCalculate + 10 : timeForCalculate; // 퇴실시간은 청소시간 10분을 더해준다
    });
  });

  let 해당시점필요객실수;
  for (let i = 0; i < 2400; i++) {
    해당시점필요객실수 = 0;
    bookTimeConvertedToNumberType.forEach((bookTime) => {
      if (i >= bookTime[0] && i < bookTime[1]) {
        해당시점필요객실수++;
      }
    });
    if (해당시점필요객실수 > 최소객실수) {
      최소객실수 = 해당시점필요객실수;
    }
  }

  return 최소객실수;
}

/**
 const timeForCalculate = i === 1 ? plusTenMinutes(v) : v; 
 return parseInt(timeForCalculate.replace(":", "")); // 문자열에서 :를 제거하고 숫자로 변환한다
 */
