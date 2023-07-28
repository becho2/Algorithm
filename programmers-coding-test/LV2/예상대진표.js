/**
 * 게임 참가자 수 N, 참가자 번호 A, 경쟁자 번호 B가 함수 solution의 매개변수로 주어질 때, 
 * 처음 라운드에서 A번을 가진 참가자는 경쟁자로 생각하는 B번 참가자와
 * 몇 번째 라운드에서 만나는지 return 하는 solution 함수를 완성해 주세요. 
 * 단, A번 참가자와 B번 참가자는 서로 붙게 되기 전까지 항상 이긴다고 가정합니다.

제한사항
N : 21 이상 220 이하인 자연수 (2의 지수 승으로 주어지므로 부전승은 발생하지 않습니다.)
A, B : N 이하인 자연수 (단, A ≠ B 입니다.)
 * @param {*} n 전체 참가자 수
 * @param {*} a 첫번째 참가자 번호
 * @param {*} b 두번째 참가자 번호
 * @returns
 */
function solution(n, a, b) {
  let answer;

  const howManyTwoInN = n.toString(2).length - 1;
  let node;
  let roundUpA = a;
  let roundUpB = b;

  for (let i = howManyTwoInN; i > 0; i--) {
    node = 2 ** (i - 1);
    if (
      (roundUpA <= node && roundUpB > node) ||
      (roundUpB <= node && roundUpA > node)
    ) {
      // 둘 중 하나가 node보다 작고, 다른 하나가 node보다 크다면 (가운데를 기준으로 양쪽으로 떨어져있다면 몇 라운드에 만날지 알 수 있음)
      answer = i;
      break;
    }
    roundUpA = roundUpA % 2 === 1 ? (roundUpA + 1) / 2 : roundUpA / 2;
    roundUpB = roundUpB % 2 === 1 ? (roundUpB + 1) / 2 : roundUpB / 2;
    if (roundUpA === roundUpB) {
      // 둘이 같아졌다는 건 만났다는 의미
      answer = howManyTwoInN - i + 1;
      break;
    }
  }
  return answer;
}
