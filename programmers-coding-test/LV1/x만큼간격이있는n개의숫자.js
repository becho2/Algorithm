/**
 *
 * @param {*} x 정수
 * @param {*} n 자연수
 * @returns
 */

function solution(x, n) {
  const answer = [];
  let y = 0;
  for (let i = 0; i < n; i++) {
    y += x;
    answer.push(y);
  }
  return answer;
}

/**
 * 다른 사람의 풀이 insight
 * Array(n).fill(x).map((v, i) => (i + 1) * v)
 * Array(n)을 통해 n개의 배열을 만들고 fill(x)를 통해 x로 채운다.
 * map을 통해 각 배열의 인덱스에 1을 더하고 x를 곱한다.
 * Array(n)으로 n개의 원소를 가진 배열을 초기화하는 방법을 처음 알게 됨.
 * 성능은 어느 쪽이 더 좋을까?
 */
