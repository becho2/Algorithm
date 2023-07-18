/**
 * 문제 설명
자카드 유사도는 집합 간의 유사도를 검사하는 여러 방법 중의 하나로 알려져 있다. 두 집합 A, B 사이의 자카드 유사도 J(A, B)는
두 집합의 교집합 크기를 두 집합의 합집합 크기로 나눈 값으로 정의된다.
예를 들어 집합 A = {1, 2, 3}, 집합 B = {2, 3, 4}라고 할 때, 교집합 A ∩ B = {2, 3}, 합집합 A ∪ B = {1, 2, 3, 4}이 되므로,
집합 A, B 사이의 자카드 유사도 J(A, B) = 2/4 = 0.5가 된다.
집합 A와 집합 B가 모두 공집합일 경우에는 나눗셈이 정의되지 않으니 따로 J(A, B) = 1로 정의한다.
자카드 유사도는 원소의 중복을 허용하는 다중집합에 대해서 확장할 수 있다. 다중집합 A는 원소 "1"을 3개 가지고 있고, 
다중집합 B는 원소 "1"을 5개 가지고 있다고 하자. 이 다중집합의 교집합 A ∩ B는 원소 "1"을 min(3, 5)인 3개, 
합집합 A ∪ B는 원소 "1"을 max(3, 5)인 5개 가지게 된다. 다중집합 A = {1, 1, 2, 2, 3}, 다중집합 B = {1, 2, 2, 4, 5}라고 하면, 
교집합 A ∩ B = {1, 2, 2}, 합집합 A ∪ B = {1, 1, 2, 2, 3, 4, 5}가 되므로, 자카드 유사도 J(A, B) = 3/7, 약 0.42가 된다.
이를 이용하여 문자열 사이의 유사도를 계산하는데 이용할 수 있다. 문자열 "FRANCE"와 "FRENCH"가 주어졌을 때, 이를 두 글자씩 끊어서 다중집합을 만들 수 있다. 
각각 {FR, RA, AN, NC, CE}, {FR, RE, EN, NC, CH}가 되며, 교집합은 {FR, NC}, 합집합은 {FR, RA, AN, NC, CE, RE, EN, CH}가 되므로,
두 문자열 사이의 자카드 유사도 J("FRANCE", "FRENCH") = 2/8 = 0.25가 된다.

입력 형식
입력으로는 str1과 str2의 두 문자열이 들어온다. 각 문자열의 길이는 2 이상, 1,000 이하이다.
입력으로 들어온 문자열은 두 글자씩 끊어서 다중집합의 원소로 만든다. 이때 영문자로 된 글자 쌍만 유효하고, 기타 공백이나 숫자, 특수 문자가 들어있는 경우는 그 글자 쌍을 버린다. 예를 들어 "ab+"가 입력으로 들어오면, "ab"만 다중집합의 원소로 삼고, "b+"는 버린다.
다중집합 원소 사이를 비교할 때, 대문자와 소문자의 차이는 무시한다. "AB"와 "Ab", "ab"는 같은 원소로 취급한다.
출력 형식
입력으로 들어온 두 문자열의 자카드 유사도를 출력한다. 유사도 값은 0에서 1 사이의 실수이므로, 이를 다루기 쉽도록 65536을 곱한 후에 소수점 아래를 버리고 정수부만 출력한다.
 * @param {*} str1 
 * @param {*} str2 
 * @returns 
 */
function solution(str1, str2) {
  let J = 0;

  const arr1 = makeArrForJ(str1);
  const arr2 = makeArrForJ(str2);
  // 중복없는 합집합 배열을 먼저 만들고,
  // 그 집합의 원소를 순환하면서 1이 갖고 있는 해당 원소의 개수(없는 건 0),
  // 2가 갖고 있는 해당 원소의 개수를 요소로 하는 배열을 만들고,
  // 그렇게 만들어진 두 배열을 비교해서 교집합은 개수가 적은 쪽을 택하고 합집합은 개수가 많은 쪽을 택해서 합집합 만들면?

  // new Set으로 Set 객체를 만들면 중복이 제거되고, 이 Set객체의 원소들을 ...연산자로 배열에 담기
  const allUniqueItems = [...new Set([...arr1, ...arr2])];

  const arr1ItemCounts = allUniqueItems.map((item) => {
    return arr1.filter((v) => v === item).length; // arr1의 원소들 중 item과 같은 것들의 개수를 반환
  });
  const arr2ItemCounts = allUniqueItems.map((item) => {
    return arr2.filter((v) => v === item).length;
  });
  const itemsLength = allUniqueItems.length;
  const 교집합 = [];
  const 합집합 = [];
  for (let i = 0; i < itemsLength; i++) {
    let 교집합에넣을갯수;
    let 합집합에넣을갯수;
    if (arr1ItemCounts[i] <= arr2ItemCounts[i]) {
      교집합에넣을갯수 = arr1ItemCounts[i];
      합집합에넣을갯수 = arr2ItemCounts[i];
    } else {
      교집합에넣을갯수 = arr2ItemCounts[i];
      합집합에넣을갯수 = arr1ItemCounts[i];
    }
    for (let j = 0; j < 교집합에넣을갯수; j++) {
      교집합.push(allUniqueItems[i]);
    }
    for (let k = 0; k < 합집합에넣을갯수; k++) {
      합집합.push(arr1ItemCounts[i]);
    }
  }

  if (합집합.length === 0) return 65536;
  J = 교집합.length / 합집합.length;
  return Math.floor(J * 65536);
}

// 공백특수문자 제외하고 두 글자씩 가진 배열 만들기
const makeArrForJ = (str) => {
  let arrForJ = [];
  const strLength = str.length;
  const lowerStr = str.toLowerCase();
  const lowerStrArr = lowerStr.split("");
  let matchResult;

  for (let i = 0; i < strLength - 1; i++) {
    const twoChar = lowerStrArr[i] + lowerStrArr[i + 1];

    if ((matchResult = twoChar.match(/[a-z]+/g))) {
      if (matchResult[0].length > 1) arrForJ.push(matchResult[0]);
    }
  }
  return arrForJ;
};

/**
 * 다른 사람 풀이에서 배운 것
 * 1. 내가 만든 makeArrForJ를 substr을 이용해 훨씬 간단하게 만든 explode라는 함수 정의를 solution함수 내에서 만들어 쓴 것 (함수 내용은 아래)
 * 2. 굳이 진짜 교집합, 합집합을 진짜 실제 원소들을 채워서 만들지 않고 교집합, 합집합의 개수(배열길이)만 구해서 계산하면 더 간단하다.
 * 어차피 결과는 두 집합의 길이를 나눠서 숫자만 나오는 것이므로.
 * 3. if ((matchResult = twoChar.match(/[a-z]+/g))) {
      if (matchResult[0].length > 1) arrForJ.push(matchResult[0]);
    } 이 부분도 if의 match에서 정규식을 /[a-z]{3}/를 썼으면 if 한방에 해결되는 걸 엄청 복잡하게 만들었다는 걸 알게 됐다.
 */
function explode(text) {
  const result = [];
  for (let i = 0; i < text.length - 1; i++) {
    const node = text.substr(i, 2);
    if (node.match(/[A-Za-z]{2}/)) {
      result.push(node.toLowerCase());
    }
  }
  return result;
}
