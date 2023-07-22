/**
 * 문제 설명
 * 2 이상의 n이 입력되었을 때, n번째 피보나치 수를 1234567으로 나눈 나머지를 리턴하는 함수, solution을 완성해 주세요.
제한 사항
n은 2 이상 100,000 이하인 자연수입니다.
 * @param {*} n 자연수
 * @returns 
 * n이 일정 이상 커지면 피보나치수가 너무 커져 js 변수에 담을 수 없음.
 * 소 뒷걸음질치다 잡듯이 어렴풋하게 나머지끼리 더해서 나눠도 나머지가 똑같아진다는 추측이 들어서 해봤더니 성공
 * 곰곰이 생각해보니까 증명할 수 있겠더라
 */
function solution(n) {
  let a = 0;
  let b = 1;
  let nth;
  for (let i = 2; i <= n; i++) {
    nth = a + b;
    a = b % 1234567;
    b = nth % 1234567;
  }
  // n이 일정 이상 커질 경우 해당 숫자가 변수에 담기지 않아 null이 반환되는 문제
  return nth % 1234567;
}

// js에서 더 큰 수를 저장할 수 있는 BigInt를 사용해서 풀 수도 있더라. 단, 당연히 실행시간은 훨씬 더 걸림.
function solution(n) {
  let a = 0;
  let b = 1;
  let nth;
  for (let i = 2; i <= n; i++) {
    nth = BigInt(a + b);
    a = BigInt(b);
    b = BigInt(nth);
  }
  // n이 일정 이상 커질 경우 해당 숫자가 변수에 담기지 않아 null이 반환되는 문제
  return nth % BigInt(1234567);
}
