/**
 * 성공 => 마지막에 첫번째 테스트 케이스를 return값 1씩 늘려가면서 알아냈는데 6 -> 9 테스트 케이스였음.
 * 원래 짠 프로그램에서 6을 넣으면 10이 나왔는데, 이유는 index를 이용해 변경한 부분 아랫쪽 숫자들의 0과 1을 더 작은 숫자로 바꿔주는 과정에서
 * 중간에 바뀐 애들만 적용(changed && index)하고 가장 큰 자릿수에서 자릿수가 늘어나는 케이스에 대해서는 해당 로직이 적용되지 않았기 때문.
 * -> 그래서 1001이 나와야하는데 1010이 나옴.
 * @param n 자연수
 * @returns
 */
function solution(n) {
  // 이진수로 1의 갯수가 같은 다음 큰 수
  // 문법검색: unshift, **(거듭제곱)

  // 이진수로 바꿨을 때 '01' 이라는 조합이 1번 이상 등장하면 그 중 가장 끝(가장 작은)에 있는 조합을 10으로 뒤집어주면 해당 조건 만족
  // 단, '01'이라는 조합이 한번도 등장하지 않는 수의 경우 맨앞 1을 '10'으로 바꿔서 자릿수를 하나 올리면 조건 만족
  // 이진수로 변환하는 과정에서 처리 가능할 듯 계속 2로 나눈 나머지를 역순으로 나열하면 이진수가 되므로,
  // 나누는 과정에서 '1' 다음 '0'이 나오는 경우가 있으면 바로 바꿔주고, 없으면 마지막 1 대신 0, 1을 넣어주면?

  // 테스트케이스 78에서 실패 -> 예를 들어 101110 의 경우 110110이 아니라 110011 이 조건에 해당된다.
  // 즉, 가장 작은 01의 순서만 바꿔준다고 해결되지 않는다. 그 뒤에 나오는 나머지 1들이 0과 자리를 바꿔서 가장 작은 수가 되어야한다.
  // change한 값의 index를 저장한 뒤, 해당 index로 배열을 분할해서, 작은 자릿수들만의 배열을 만든 뒤
  // 해당 배열과 같은 길이의 배열을 만들되 0의 개수만큼 앞에서부터 채우고, 뒤를 1로 채운 배열을 만들어서 다시 원래의 앞 배열과 합치면 됨
  const getNextBigBinaryReversedArray = (decimal) => {
    let 몫 = decimal;
    let 나머지;
    let changed = false; // 큰 수로 만들기 위한 변경 여부
    let pass = false; // 변경을 위해 이번 반복에서 나머지를 array에 넣지 않고 통과시키기 위한 flag값
    let index;
    let binaryArray = [];
    if (몫 === 1) return [0, 1]; // 처음부터 1이 들어오면 while없이 빈 배열 리턴되므로 해당 케이스 방지
    while (몫 > 1) {
      나머지 = 몫 % 2;
      if (pass && 나머지 === 0) {
        pass = false;
        changed = true;
      } else {
        binaryArray.push(나머지);
      }

      몫 = Math.floor(몫 / 2);
      if (나머지 === 1 && 몫 % 2 === 0 && changed === false) {
        // 이번 나머지가 1이고 다음 나머지가 0일 경우
        binaryArray.pop();
        index = binaryArray.length;
        binaryArray.push(0);
        binaryArray.push(1);
        pass = true;
      }

      if (몫 === 1) {
        if (changed) {
          binaryArray.push(1);
        } else {
          index = binaryArray.length;
          binaryArray.push(0);
          binaryArray.push(1);
        }
      }
    }
    if (index) {
      let smallBinaryArray = [];
      for (let i = 0; i < index; i++) {
        smallBinaryArray.push(binaryArray[0]);
        binaryArray.shift();
      }
      const countOfOneInSmallArray = smallBinaryArray.reduce(
        (acc, cur) => acc + cur
      );
      const countOfZeroInSmallArray =
        smallBinaryArray.length - countOfOneInSmallArray;
      for (let i = 0; i < smallBinaryArray.length; i++) {
        if (i < countOfZeroInSmallArray) {
          binaryArray.unshift(0);
        } else {
          binaryArray.unshift(1);
        }
      }
    }
    // console.log(binaryArray); // 78은 1001110 이때 정답은 1010011 (83)
    return binaryArray;
  };

  const binaryArray = getNextBigBinaryReversedArray(n);

  const convertToDecimal = (binaryArray) => {
    return binaryArray.reduce((acc, cur, i) => {
      return acc + cur * 2 ** i;
    }, 0);
  };
  return convertToDecimal(binaryArray);
}

/**
 * 
 * @param {*} n 
 * @returns 
 * 테스트 1 〉	실패 (0.15ms, 33.4MB)
테스트 2 〉	통과 (0.16ms, 33.4MB)
테스트 3 〉	통과 (0.16ms, 33.4MB)
테스트 4 〉	통과 (0.17ms, 33.4MB)
테스트 5 〉	통과 (0.17ms, 33.4MB)
테스트 6 〉	통과 (0.15ms, 33.5MB)
테스트 7 〉	실패 (0.17ms, 33.4MB)
테스트 8 〉	통과 (0.19ms, 33.4MB)
테스트 9 〉	실패 (0.17ms, 33.4MB)
테스트 10 〉	통과 (0.16ms, 33.5MB)
테스트 11 〉	통과 (0.16ms, 33.4MB)
테스트 12 〉	통과 (0.16ms, 33.4MB)
테스트 13 〉	통과 (0.16ms, 33.4MB)
테스트 14 〉	통과 (0.16ms, 33.4MB)
효율성  테스트
테스트 1 〉	실패 (0.15ms, 33MB)
테스트 2 〉	통과 (0.21ms, 33MB)
테스트 3 〉	통과 (0.18ms, 33.4MB)
테스트 4 〉	통과 (0.17ms, 33.4MB)
테스트 5 〉	실패 (0.24ms, 33.3MB)
테스트 6 〉	통과 (0.23ms, 33MB)
 */
function solution(n) {
  // 이진수로 1의 갯수가 같은 다음 큰 수
  // 문법검색: unshift, **(거듭제곱)

  // 이진수로 바꿨을 때 '01' 이라는 조합이 1번 이상 등장하면 그 중 가장 끝(가장 작은)에 있는 조합을 10으로 뒤집어주면 해당 조건 만족
  // 단, '01'이라는 조합이 한번도 등장하지 않는 수의 경우 맨앞 1을 '10'으로 바꿔서 자릿수를 하나 올리면 조건 만족
  // 이진수로 변환하는 과정에서 처리 가능할 듯 계속 2로 나눈 나머지를 역순으로 나열하면 이진수가 되므로,
  // 나누는 과정에서 '1' 다음 '0'이 나오는 경우가 있으면 바로 바꿔주고, 없으면 마지막 1 대신 0, 1을 넣어주면?

  // 테스트케이스 78에서 실패 -> 예를 들어 101110 의 경우 110110이 아니라 110011 이 조건에 해당된다.
  // 즉, 가장 작은 01의 순서만 바꿔준다고 해결되지 않는다. 그 뒤에 나오는 나머지 1들이 0과 자리를 바꿔서 가장 작은 수가 되어야한다.
  // change한 값의 index를 저장한 뒤, 해당 index로 배열을 분할해서, 작은 자릿수들만의 배열을 만든 뒤
  // 해당 배열의 길이를 측정, 같은 길이의 배열을 만들되 0의 개수만큼 앞에서부터 채우고, 뒤를 1로 채운 배열을 만들어서 다시 원래의 앞 배열과 합치면 됨
  // unshift를 push로 바꿔서 그냥 뒤에다 넣자. 그래야 index를 파악하기 편하다.
  const getNextBigBinaryReversedArray = (decimal) => {
    let 몫 = decimal;
    let 나머지;
    let changed = false; // 큰 수로 만들기 위한 변경 여부
    let pass = false; // 변경을 위해 이번 반복에서 나머지를 array에 넣지 않고 통과시키기 위한 flag값
    let index;
    let binaryArray = [];
    while (몫 > 1) {
      나머지 = 몫 % 2;
      if (pass && 나머지 === 0) {
        pass = false;
        changed = true;
      } else {
        binaryArray.push(나머지);
      }

      몫 = Math.floor(몫 / 2);
      if (나머지 === 1 && 몫 % 2 === 0 && changed === false) {
        // 이번 나머지가 1이고 다음 나머지가 0일 경우
        binaryArray.pop();
        index = binaryArray.length;
        binaryArray.push(0);
        binaryArray.push(1);
        pass = true;
      }

      if (몫 === 1) {
        if (changed) {
          binaryArray.push(1);
        } else {
          binaryArray.push(0);
          binaryArray.push(1);
        }
      }
    }
    // console.log(binaryArray);
    if (changed && index) {
      let smallBinaryArray = [];
      for (let i = 0; i < index; i++) {
        smallBinaryArray.push(binaryArray[i]); // 여기가 틀렸었음 -> shift로 없어지니까 계속 binaryArray[0]만 넣었어야함
        binaryArray.shift();
      }
      // console.log(smallBinaryArray);
      const countOfOneInSmallArray = smallBinaryArray.reduce(
        (acc, cur) => acc + cur
      );
      const countOfZeroInSmallArray =
        smallBinaryArray.length - countOfOneInSmallArray;
      for (let i = 0; i < smallBinaryArray.length; i++) {
        if (i < countOfZeroInSmallArray) {
          binaryArray.unshift(0);
        } else {
          binaryArray.unshift(1);
        }
      }
    }
    // console.log(binaryArray); // 78은 1001110 이때 정답은 1010011 (83)
    return binaryArray;
  };

  const binaryArray = getNextBigBinaryReversedArray(n);

  const convertToDecimal = (binaryArray) => {
    return binaryArray.reduce((acc, cur, i) => {
      return acc + cur * 2 ** i;
    }, 0);
  };
  return convertToDecimal(binaryArray);
}

/**
 * n === 1 일때 케이스에서 실패했나했더니 그것도 아닌가봄.
 * @param {*} n 
 * @returns 
 * 채점을 시작합니다.
정확성  테스트
테스트 1 〉	실패 (0.16ms, 33.5MB)
테스트 2 〉	통과 (0.15ms, 33.5MB)
테스트 3 〉	통과 (0.16ms, 33.3MB)
테스트 4 〉	통과 (0.16ms, 33.5MB)
테스트 5 〉	통과 (0.16ms, 33.4MB)
테스트 6 〉	통과 (0.16ms, 33.5MB)
테스트 7 〉	통과 (0.17ms, 33.4MB)
테스트 8 〉	통과 (0.16ms, 33.5MB)
테스트 9 〉	통과 (0.19ms, 33.4MB)
테스트 10 〉	통과 (0.17ms, 33.5MB)
테스트 11 〉	통과 (0.18ms, 33.5MB)
테스트 12 〉	통과 (0.17ms, 33.5MB)
테스트 13 〉	통과 (0.16ms, 33.4MB)
테스트 14 〉	통과 (0.17ms, 33.4MB)
효율성  테스트
테스트 1 〉	통과 (0.17ms, 33.4MB)
테스트 2 〉	통과 (0.15ms, 33.5MB)
테스트 3 〉	통과 (0.15ms, 33.4MB)
테스트 4 〉	통과 (0.18ms, 33.4MB)
테스트 5 〉	통과 (0.18ms, 33.3MB)
테스트 6 〉	통과 (0.16ms, 33.3MB)
 */
function solution(n) {
  // 이진수로 1의 갯수가 같은 다음 큰 수
  // 문법검색: unshift, **(거듭제곱)

  // 이진수로 바꿨을 때 '01' 이라는 조합이 1번 이상 등장하면 그 중 가장 끝(가장 작은)에 있는 조합을 10으로 뒤집어주면 해당 조건 만족
  // 단, '01'이라는 조합이 한번도 등장하지 않는 수의 경우 맨앞 1을 '10'으로 바꿔서 자릿수를 하나 올리면 조건 만족
  // 이진수로 변환하는 과정에서 처리 가능할 듯 계속 2로 나눈 나머지를 역순으로 나열하면 이진수가 되므로,
  // 나누는 과정에서 '1' 다음 '0'이 나오는 경우가 있으면 바로 바꿔주고, 없으면 마지막 1 대신 0, 1을 넣어주면?

  // 테스트케이스 78에서 실패 -> 예를 들어 101110 의 경우 110110이 아니라 110011 이 조건에 해당된다.
  // 즉, 가장 작은 01의 순서만 바꿔준다고 해결되지 않는다. 그 뒤에 나오는 나머지 1들이 0과 자리를 바꿔서 가장 작은 수가 되어야한다.
  // change한 값의 index를 저장한 뒤, 해당 index로 배열을 분할해서, 작은 자릿수들만의 배열을 만든 뒤
  // 해당 배열과 같은 길이의 배열을 만들되 0의 개수만큼 앞에서부터 채우고, 뒤를 1로 채운 배열을 만들어서 다시 원래의 앞 배열과 합치면 됨
  const getNextBigBinaryReversedArray = (decimal) => {
    let 몫 = decimal;
    let 나머지;
    let changed = false; // 큰 수로 만들기 위한 변경 여부
    let pass = false; // 변경을 위해 이번 반복에서 나머지를 array에 넣지 않고 통과시키기 위한 flag값
    let index;
    let binaryArray = [];
    if (몫 === 1) return [0, 1]; // 처음부터 1이 들어오면 while없이 빈 배열 리턴되므로 해당 케이스 방지
    while (몫 > 1) {
      나머지 = 몫 % 2;
      if (pass && 나머지 === 0) {
        pass = false;
        changed = true;
      } else {
        binaryArray.push(나머지);
      }

      몫 = Math.floor(몫 / 2);
      if (나머지 === 1 && 몫 % 2 === 0 && changed === false) {
        // 이번 나머지가 1이고 다음 나머지가 0일 경우
        binaryArray.pop();
        index = binaryArray.length;
        binaryArray.push(0);
        binaryArray.push(1);
        pass = true;
      }

      if (몫 === 1) {
        if (changed) {
          binaryArray.push(1);
        } else {
          binaryArray.push(0);
          binaryArray.push(1);
        }
      }
    }
    if (changed && index) {
      let smallBinaryArray = [];
      for (let i = 0; i < index; i++) {
        smallBinaryArray.push(binaryArray[0]);
        binaryArray.shift();
      }
      const countOfOneInSmallArray = smallBinaryArray.reduce(
        (acc, cur) => acc + cur
      );
      const countOfZeroInSmallArray =
        smallBinaryArray.length - countOfOneInSmallArray;
      for (let i = 0; i < smallBinaryArray.length; i++) {
        if (i < countOfZeroInSmallArray) {
          binaryArray.unshift(0);
        } else {
          binaryArray.unshift(1);
        }
      }
    }
    // console.log(binaryArray); // 78은 1001110 이때 정답은 1010011 (83)
    return binaryArray;
  };

  const binaryArray = getNextBigBinaryReversedArray(n);

  const convertToDecimal = (binaryArray) => {
    return binaryArray.reduce((acc, cur, i) => {
      return acc + cur * 2 ** i;
    }, 0);
  };
  return convertToDecimal(binaryArray);
}

/** 예상대로 효율성에서 시간초과 
 * 테스트 1 〉	통과 (0.15ms, 33.4MB)
테스트 2 〉	통과 (0.15ms, 33.5MB)
테스트 3 〉	통과 (0.24ms, 33.4MB)
테스트 4 〉	통과 (0.23ms, 33.5MB)
테스트 5 〉	통과 (0.25ms, 33.4MB)
테스트 6 〉	통과 (0.22ms, 33.5MB)
테스트 7 〉	통과 (0.24ms, 33.4MB)
테스트 8 〉	통과 (0.25ms, 33.4MB)
테스트 9 〉	통과 (0.28ms, 33.3MB)
테스트 10 〉	통과 (0.29ms, 33.3MB)
테스트 11 〉	통과 (0.27ms, 33.5MB)
테스트 12 〉	통과 (0.24ms, 33.4MB)
테스트 13 〉	통과 (0.25ms, 33.5MB)
테스트 14 〉	통과 (0.26ms, 33.4MB)
효율성  테스트
테스트 1 〉	통과 (0.23ms, 33MB)
테스트 2 〉	통과 (0.22ms, 33MB)
테스트 3 〉	실패 (시간 초과)
테스트 4 〉	실패 (시간 초과)
테스트 5 〉	실패 (시간 초과)
테스트 6 〉	실패 (시간 초과)
*/

function solution(n) {
  // 이진수로 1의 갯수가 같은 다음 큰 수
  // 문법검색: unshift, **(거듭제곱)
  const getBinaryReversedArray = (n) => {
    let 몫 = n;
    let 나머지;
    const array = [];

    while (몫 > 1) {
      나머지 = 몫 % 2;
      몫 = Math.floor(몫 / 2);
      array.push(나머지);
    }
    if (몫 === 1) {
      array.push(1);
    }
    return array;
  };

  const binaryArray = getBinaryReversedArray(n);
  const countOne = binaryArray.reduce((acc, cur) => acc + cur);
  let x = n;
  let nextBigBinaryArray;
  while ((x = x + 1)) {
    nextBigBinaryArray = getBinaryReversedArray(x);
    if (nextBigBinaryArray.reduce((acc, cur) => acc + cur) === countOne) break;
  }

  const convertToDecimal = (binaryArray) => {
    return binaryArray.reduce((acc, cur, i) => {
      return acc + cur * 2 ** i;
    }, 0);
  };
  return convertToDecimal(nextBigBinaryArray);
}
