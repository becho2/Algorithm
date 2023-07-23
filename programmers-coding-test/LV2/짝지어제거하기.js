/**
 * 
 * @param {*} s 
 * @returns 
 * 
정확성  테스트
테스트 1 〉	통과 (0.06ms, 33.4MB)
테스트 2 〉	통과 (4.76ms, 38MB)
테스트 3 〉	통과 (5.85ms, 38.4MB)
테스트 4 〉	통과 (8.49ms, 38.9MB)
테스트 5 〉	통과 (8.33ms, 38.9MB)
테스트 6 〉	통과 (6.20ms, 38.9MB)
테스트 7 〉	통과 (6.44ms, 38.9MB)
테스트 8 〉	통과 (6.21ms, 38.9MB)
테스트 9 〉	통과 (0.06ms, 33.4MB)
테스트 10 〉	통과 (0.15ms, 33.4MB)
테스트 11 〉	통과 (0.05ms, 33.4MB)
테스트 12 〉	통과 (0.06ms, 33.5MB)
테스트 13 〉	통과 (0.06ms, 33.4MB)
효율성  테스트
테스트 1 〉	통과 (52.87ms, 60.7MB)
테스트 2 〉	통과 (27.35ms, 50.2MB)
테스트 3 〉	통과 (33.23ms, 55.4MB)
테스트 4 〉	통과 (38.23ms, 56.3MB)
테스트 5 〉	통과 (33.56ms, 55.4MB)
테스트 6 〉	통과 (38.20ms, 56.3MB)
테스트 7 〉	통과 (37.39ms, 56.3MB)
테스트 8 〉	통과 (33.72ms, 57.9MB)
 */
function solution(s) {
  // 반복문 돌리면 효율성테스트 답 안 나옴 문자열을 한번 훑을 때 최대한 다 처리할 방법 필요
  let arrayOfString = s.split("");
  let working = [arrayOfString[0]];
  let countOfPair = 0;
  let originalLength = s.length;
  let workingLength;
  if (originalLength % 2 === 1) return 0; // 길이가 홀수면 수행불가

  for (let i = 1; i < originalLength; i++) {
    workingLength = working.length;
    if (workingLength > 0) {
      if (arrayOfString[i] === working[workingLength - 1]) {
        countOfPair++;
        working.pop();
      } else {
        working.push(arrayOfString[i]);
      }
    } else {
      working.push(arrayOfString[i]);
    }
  }
  return countOfPair === originalLength / 2 ? 1 : 0;
}

/**
 * for문을 map이나 reduce로 바꿔도 시간이 차이가 없었는데 shift, unshift를 push, pop으로 바꾸니까 시간이 확 줄었다.
 * @param {*} s 
 * @returns 
 * 정확성  테스트
테스트 1 〉	통과 (0.05ms, 33.4MB)
테스트 2 〉	통과 (5.33ms, 36.9MB)
테스트 3 〉	통과 (6.18ms, 37.4MB)
테스트 4 〉	통과 (6.35ms, 37.8MB)
테스트 5 〉	통과 (6.24ms, 37.7MB)
테스트 6 〉	통과 (6.33ms, 37.9MB)
테스트 7 〉	실패 (7.11ms, 37.9MB)
테스트 8 〉	통과 (9.70ms, 37.7MB)
테스트 9 〉	통과 (0.05ms, 33.4MB)
테스트 10 〉	통과 (0.16ms, 33.4MB)
테스트 11 〉	통과 (0.05ms, 33.4MB)
테스트 12 〉	통과 (0.05ms, 33.4MB)
테스트 13 〉	통과 (0.07ms, 33.4MB)
효율성  테스트
테스트 1 〉	실패 (68.18ms, 59.5MB)
테스트 2 〉	통과 (34.62ms, 50MB)
테스트 3 〉	통과 (41.67ms, 54.3MB)
테스트 4 〉	통과 (46.38ms, 55.3MB)
테스트 5 〉	통과 (45.54ms, 54.3MB)
테스트 6 〉	실패 (41.02ms, 54.3MB)
테스트 7 〉	실패 (46.20ms, 54.3MB)
테스트 8 〉	실패 (46.35ms, 56.8MB)
 */
function solution(s) {
  // 반복문 돌리면 효율성테스트 답 안 나옴 문자열을 한번 훑을 때 최대한 다 처리할 방법 필요
  let arrayOfString = s.split("");
  let working = [arrayOfString[0]];
  let countOfPair;
  let originalLength = s.length;
  if (originalLength % 2 === 1) return 0; // 길이가 홀수면 수행불가

  countOfPair = arrayOfString.reduce((acc, cur) => {
    if (working.length > 0) {
      if (cur === working[working.length - 1]) {
        working.pop();
        return acc + 1;
      } else {
        working.push(cur);
      }
    } else {
      working.push(cur);
    }
    return acc;
  }, 0);
  return countOfPair === originalLength / 2 ? 1 : 0;
}

/**
 * 
 * @param {*} s 
 * @returns 
 * 정확성  테스트
테스트 1 〉	통과 (0.06ms, 33.6MB)
테스트 2 〉	통과 (6.24ms, 38.1MB)
테스트 3 〉	통과 (188.53ms, 38.8MB)
테스트 4 〉	통과 (236.76ms, 38.9MB)
테스트 5 〉	통과 (234.39ms, 38.8MB)
테스트 6 〉	통과 (236.86ms, 38.8MB)
테스트 7 〉	통과 (237.43ms, 39MB)
테스트 8 〉	통과 (249.83ms, 39.1MB)
테스트 9 〉	통과 (0.05ms, 33.5MB)
테스트 10 〉	통과 (0.16ms, 33.6MB)
테스트 11 〉	통과 (0.05ms, 33.6MB)
테스트 12 〉	통과 (0.05ms, 33.6MB)
테스트 13 〉	통과 (0.06ms, 33.5MB)
효율성  테스트
테스트 1 〉	실패 (시간 초과)
테스트 2 〉	통과 (36.02ms, 50MB)
테스트 3 〉	실패 (시간 초과)
테스트 4 〉	실패 (시간 초과)
테스트 5 〉	실패 (시간 초과)
테스트 6 〉	실패 (시간 초과)
테스트 7 〉	실패 (시간 초과)
 */
function solution(s) {
  // 반복문 돌리면 효율성테스트 답 안 나옴 문자열을 한번 훑을 때 최대한 다 처리할 방법 필요
  let arrayOfString = s.split("");
  let working = [arrayOfString[0]];
  let countOfPair = 0;
  let originalLength = s.length;
  if (originalLength % 2 === 1) return 0; // 길이가 홀수면 수행불가

  for (let i = 1; i < originalLength; i++) {
    if (working.length > 0) {
      if (working[0] === arrayOfString[i]) {
        countOfPair++;
        working.shift();
      } else {
        working.unshift(arrayOfString[i]);
      }
    } else {
      working.unshift(arrayOfString[i]);
    }
    // unshift로 배열에 맨 앞부터 하나씩 껴넣고 배열[0]의 원소와 같으면 삭제
  }
  return countOfPair === originalLength / 2 ? 1 : 0;
}

/**
 * 
 * @param {*} s 
 * @returns
 * 
정확성  테스트
테스트 1 〉	통과 (0.08ms, 33.4MB)
테스트 2 〉	통과 (9.80ms, 40.9MB)
테스트 3 〉	통과 (485.80ms, 42.3MB)
테스트 4 〉	통과 (503.21ms, 42.4MB)
테스트 5 〉	통과 (489.33ms, 42.3MB)
테스트 6 〉	통과 (781.61ms, 42.6MB)
테스트 7 〉	통과 (533.57ms, 42.7MB)
테스트 8 〉	통과 (460.58ms, 42.5MB)
테스트 9 〉	통과 (0.07ms, 33.5MB)
테스트 10 〉	통과 (0.21ms, 33.5MB)
테스트 11 〉	통과 (0.08ms, 33.4MB)
테스트 12 〉	통과 (0.08ms, 33.4MB)
테스트 13 〉	통과 (0.08ms, 33.4MB)
효율성  테스트
테스트 1 〉	실패 (시간 초과)
테스트 2 〉	실패 (시간 초과)
테스트 3 〉	실패 (시간 초과)
테스트 4 〉	실패 (시간 초과)
테스트 5 〉	실패 (시간 초과)
테스트 6 〉	실패 (시간 초과)
테스트 7 〉	실패 (시간 초과)
테스트 8 〉	실패 (시간 초과)
 
 */
function solution(s) {
  // 반복문 돌리면 효율성테스트 답 안 나옴 문자열을 한번 훑을 때 최대한 다 처리할 방법 필요
  let arrayOfString = s.split("");
  let working = [{ index: 0, char: arrayOfString[0] }];
  let arrayOfIndex = [];
  let originalLength = s.length;
  for (let i = 1; i < originalLength; i++) {
    if (working.length > 0) {
      if (working[0].char === arrayOfString[i]) {
        arrayOfIndex.push(i);
        arrayOfIndex.push(working[0].index);
        working.shift();
      } else {
        working.unshift({ index: i, char: arrayOfString[i] });
      }
    } else {
      working.unshift({ index: i, char: arrayOfString[i] });
    }
    // unshift로 배열에 맨 앞부터 하나씩 껴넣고 배열[0]의 원소와 같으면 삭제 -> 인덱스 저장했다가 나중에 한꺼번에 삭제?
  }
  return arrayOfIndex.length === originalLength ? 1 : 0;
}

/**
 * 시간초과 - 효율성 테스트 실패
 * @param string s
 * @returns
 * 테스트 1 〉	통과 (0.06ms, 33.4MB)
테스트 2 〉	통과 (1945.29ms, 39.3MB)
테스트 3 〉	통과 (6511.73ms, 39.1MB)
테스트 4 〉	통과 (7834.36ms, 38.2MB)
테스트 5 〉	통과 (7814.78ms, 38.2MB)
테스트 6 〉	통과 (7713.65ms, 38.1MB)
테스트 7 〉	통과 (7790.47ms, 38.2MB)
테스트 8 〉	통과 (7370.25ms, 38.1MB)
테스트 9 〉	통과 (0.05ms, 33.4MB)
테스트 10 〉	통과 (0.17ms, 33.4MB)
테스트 11 〉	통과 (0.05ms, 33.4MB)
테스트 12 〉	통과 (0.05ms, 33.3MB)
테스트 13 〉	통과 (0.06ms, 33.4MB)
효율성  테스트
테스트 1 〉	실패 (시간 초과)
테스트 2 〉	실패 (시간 초과)
테스트 3 〉	실패 (시간 초과)
테스트 4 〉	실패 (시간 초과)
테스트 5 〉	실패 (시간 초과)
테스트 6 〉	실패 (시간 초과)
테스트 7 〉	실패 (시간 초과)
테스트 8 〉	실패 (시간 초과)
 */
function solution(s) {
  // 문법검색: array에서 특정 index의 원소를 제거하는 법 -> splice, delete / splice를 써야 배열 길이가 줄어듦
  // splice 첫번째 파라미터: 삭제하고자하는 원소의 index, 두번째 파라미터: 그 Index부터 몇개의 원소를 삭제할지 갯수
  let answer = 0;
  let array = s.split("");
  const length = array.length;
  let indexToSplice;
  for (let i = 0; i < length; i++) {
    indexToSplice = -1;
    for (let j = 1; j < array.length; j++) {
      if (array[j] === array[j - 1]) {
        indexToSplice = j - 1;
        break;
      }
    }
    if (indexToSplice > -1) {
      array.splice(indexToSplice, 2);
    } else {
      answer = array.length === 0 ? 1 : 0;
      break;
    }
  }
  return answer;
}

/**
 * 실패한 데다가 시간도 오히려 더 걸림 -> 다시 해보니 시간은 좀 덜 걸리네? console.log때문이었나?
 * @param string s
 * @returns
 * 
정확성  테스트
테스트 1 〉	통과 (0.07ms, 33.3MB)
테스트 2 〉	통과 (25.57ms, 38.1MB)
테스트 3 〉	실패 (116.09ms, 48.7MB)
테스트 4 〉	실패 (123.64ms, 49.3MB)
테스트 5 〉	실패 (327.69ms, 56.3MB)
테스트 6 〉	통과 (585.94ms, 57.5MB)
테스트 7 〉	통과 (403.58ms, 56.4MB)
테스트 8 〉	통과 (55.68ms, 46.2MB)
테스트 9 〉	통과 (0.07ms, 33.3MB)
테스트 10 〉	실패 (0.22ms, 33.4MB)
테스트 11 〉	실패 (0.07ms, 33.4MB)
테스트 12 〉	통과 (0.07ms, 33.5MB)
테스트 13 〉	통과 (0.15ms, 33.3MB)
효율성  테스트
테스트 1 〉 실패 (시간 초과)
테스트 2 〉	실패 (시간 초과)
테스트 3 〉	실패 (시간 초과)
테스트 4 〉	실패 (시간 초과)
테스트 5 〉	실패 (시간 초과)
테스트 6 〉	실패 (시간 초과)
테스트 7 〉	실패 (시간 초과)
테스트 8 〉	실패 (시간 초과)
 */
function solution(s) {
  let array = s.split("");

  let length = -1;
  while (length !== array.length) {
    length = array.length;
    array = array.map((v, i) => {
      if (v !== array[i + 1] && v !== array[i - 1]) {
        return v;
      }
    });
    array = array.filter((v) => v !== undefined);
    // console.log(array);
  }
  return length === 0 ? 1 : 0;
}

/**
 *
 * @param {*} s
 * @returns
 * 정확성  테스트
테스트 1 〉	통과 (0.10ms, 33.4MB)
테스트 2 〉	통과 (1901.30ms, 38.4MB)
테스트 3 〉	통과 (6629.94ms, 38.1MB)
테스트 4 〉	통과 (7924.38ms, 38MB)
테스트 5 〉	통과 (7890.09ms, 38.1MB)
테스트 6 〉	통과 (7980.85ms, 38.2MB)
테스트 7 〉	통과 (8082.53ms, 38MB)
테스트 8 〉	통과 (7677.48ms, 37.1MB)
테스트 9 〉	통과 (0.07ms, 33.4MB)
테스트 10 〉	통과 (0.19ms, 33.4MB)
테스트 11 〉	통과 (0.07ms, 33.4MB)
테스트 12 〉	통과 (0.07ms, 33.4MB)
테스트 13 〉	통과 (0.07ms, 33.4MB)
효율성  테스트
테스트 1 〉	실패 (시간 초과)
테스트 2 〉	실패 (시간 초과)
테스트 3 〉	실패 (시간 초과)
테스트 4 〉	실패 (시간 초과)
테스트 5 〉	실패 (시간 초과)
테스트 6 〉	실패 (시간 초과)
테스트 7 〉	실패 (시간 초과)
테스트 8 〉	실패 (시간 초과)
 */
function solution(s) {
  const deleteFirstSameChars = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === arr[i + 1]) {
        arr.splice(i, 2);
        break;
      }
    }
    return arr;
  };
  // 문법검색: array에서 특정 index의 원소를 제거하는 법 -> splice, delete / splice를 써야 배열 길이가 줄어듦
  // splice 첫번째 파라미터: 삭제하고자하는 원소의 index, 두번째 파라미터: 그 Index부터 몇개의 원소를 삭제할지 갯수
  let array = s.split("");
  let prevLength;
  while (true) {
    prevLength = array.length;
    array = deleteFirstSameChars(array);
    if (prevLength === array.length || array.length === 0) break;
  }

  return array.length === 0 ? 1 : 0;
}

/**
 * 
 * @param {*} s 
 * @returns 
 * 
정확성  테스트
테스트 1 〉	통과 (0.09ms, 33.4MB)
테스트 2 〉	통과 (7.74ms, 37.7MB)
테스트 3 〉	실패 (118.97ms, 50.2MB)
테스트 4 〉	실패 (159.99ms, 55.9MB)
테스트 5 〉	실패 (318.78ms, 58.2MB)
테스트 6 〉	통과 (611.10ms, 65MB)
테스트 7 〉	통과 (439.72ms, 63.7MB)
테스트 8 〉	통과 (56.64ms, 48.2MB)
테스트 9 〉	통과 (0.08ms, 33.4MB)
테스트 10 〉	실패 (0.22ms, 33.4MB)
테스트 11 〉	실패 (0.08ms, 33.3MB)
테스트 12 〉	통과 (0.09ms, 33.3MB)
테스트 13 〉	통과 (0.16ms, 33.4MB)
효율성  테스트
테스트 1 〉	실패 (시간 초과)
테스트 2 〉	통과 (58.97ms, 55.6MB)
테스트 3 〉	실패 (시간 초과)
테스트 4 〉	실패 (시간 초과)
테스트 5 〉	실패 (시간 초과)
테스트 6 〉	실패 (시간 초과)
테스트 7 〉	실패 (시간 초과)
테스트 8 〉	실패 (시간 초과)
 */
function solution(s) {
  const deleteSameChars = (arr) => {
    return arr
      .map((v, i) => {
        if (v !== arr[i + 1] && v !== arr[i - 1]) {
          return v;
        }
      })
      .filter((v) => v !== undefined);
  };

  let array = s.split("");
  let prevLength;
  while (true) {
    prevLength = array.length;
    array = deleteSameChars(array);
    if (prevLength === array.length || array.length === 0) break;
  }

  return array.length === 0 ? 1 : 0;
}

/**
 * array로 안 만들고 string 상태에서 정규식 사용
 * @param s
 * @returns
 * 
정확성  테스트
테스트 1 〉	통과 (0.16ms, 33.4MB)
테스트 2 〉	통과 (40.35ms, 41.1MB)
테스트 3 〉	통과 (5123.77ms, 51.9MB)
테스트 4 〉	통과 (7774.87ms, 51.8MB)
테스트 5 〉	통과 (7764.01ms, 52.8MB)
테스트 6 〉	통과 (7696.72ms, 52.8MB)
테스트 7 〉	통과 (7778.48ms, 51.8MB)
테스트 8 〉	통과 (7067.82ms, 51.7MB)
테스트 9 〉	통과 (0.09ms, 33.4MB)
테스트 10 〉	통과 (0.26ms, 33.4MB)
테스트 11 〉	통과 (0.14ms, 33.5MB)
테스트 12 〉	통과 (0.14ms, 33.4MB)
테스트 13 〉	통과 (0.16ms, 33.4MB)
효율성  테스트
테스트 1 〉	실패 (시간 초과)
테스트 2 〉	실패 (시간 초과)
테스트 3 〉	실패 (시간 초과)
테스트 4 〉	실패 (시간 초과)
테스트 5 〉	실패 (시간 초과)
테스트 6 〉	실패 (시간 초과)
테스트 7 〉	실패 (시간 초과)
테스트 8 〉	실패 (시간 초과)
 */
function solution(s) {
  let match;
  let str = s;
  let length;
  while (true) {
    length = str.length;
    match = str.match(/([a-z])\1/g);
    if (match instanceof Array) {
      match.forEach((v) => {
        str = str.replace(v, "");
      });
    }
    if (str === "") return 1;
    if (length === str.length) return 0;
  }
}

/**
 * 
 * @param {*} s 
 * @returns 
 * 정확성  테스트
테스트 1 〉	통과 (0.13ms, 33.4MB)
테스트 2 〉	통과 (14.60ms, 38.3MB)
테스트 3 〉	통과 (4262.46ms, 52.2MB)
테스트 4 〉	통과 (5180.39ms, 52.3MB)
테스트 5 〉	통과 (5102.92ms, 52.3MB)
테스트 6 〉	통과 (5181.29ms, 52.2MB)
테스트 7 〉	통과 (5133.35ms, 52.2MB)
테스트 8 〉	통과 (4883.18ms, 52.3MB)
테스트 9 〉	통과 (0.08ms, 33.4MB)
테스트 10 〉	통과 (0.23ms, 33.6MB)
테스트 11 〉	통과 (0.12ms, 33.4MB)
테스트 12 〉	통과 (0.14ms, 33.4MB)
테스트 13 〉	통과 (0.12ms, 33.4MB)
효율성  테스트
테스트 1 〉	실패 (시간 초과)
테스트 2 〉	실패 (시간 초과)
테스트 3 〉	실패 (시간 초과)
 */
function solution(s) {
  let match;
  let str = s;
  let length;
  let originalLength = s.length;
  for (let i = 0; i < originalLength; i++) {
    length = str.length;
    match = str.match(/([a-z])\1/);
    if (match) {
      str = str.replace(match[0], "");
    } else {
      return 0;
    }
    if (str === "") return 1;
    if (length === str.length) return 0;
  }
  return 1;
}
