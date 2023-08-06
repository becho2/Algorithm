function solution(arr) {
  // 최소공배수는 각 자연수들을 소인수분해한 뒤
  // 결과로 나온 각 소수들을 가장 많은 친구 기준으로 곱하기

  // 소인수분해를 하기 위해 일단 소수의 목록을 구한다
  // 소수란 1과 자기 자신으로만 나누어 떨어지는 수
  // 100 이하의 자연수 중에서만 소수의 목록을 구하고 시작하면 된다.
  // 소수를 구하려면 각 자연수에 대해 1부터 자기자신까지 나누어서 나머지가 0인 게 있으면 탈락, 없을 경우에만 그 수를 배열에 포함.
  const 소수 = []; // 1을 제외한 소수
  for (let i = 2; i < 100; i++) {
    for (let j = 2; j <= i; j++) {
      if (i === j) {
        소수.push(i);
      } else {
        if (i % j === 0) {
          break;
        }
      }
    }
  }

  const 소인수분해결과 = arr.map((v) => {
    let 몫 = v;
    let 소수들 = [];
    if (v === 1) {
      소수들.push(1);
    }
    while (몫 > 1) {
      for (const value of 소수) {
        if (몫 % value === 0) {
          몫 = 몫 / value;
          소수들.push(value);
        }
      }
    }
    return 소수들;
  });
  const 최소공배수인수 = [];
  let 임시최소공배수인수 = [];
  소인수분해결과.forEach((v) => {
    임시최소공배수인수 = [...최소공배수인수];
    v.forEach((vv) => {
      const 삭제할인덱스 = 임시최소공배수인수.indexOf(vv);
      if (삭제할인덱스 > -1) {
        임시최소공배수인수.splice(삭제할인덱스, 1);
      } else {
        최소공배수인수.push(vv);
      }
    });
  });

  return 최소공배수인수.reduce((acc, cur) => acc * cur);
}
