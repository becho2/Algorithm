/**
 *
 * @param {*} people
 * @param {*} limit
 * @returns
 */
function solution(people, limit) {
  // 큰순서로 정렬한 뒤 제일 작은 사람과 짝지어서 limit을 초과하는지 확인한다면? 예외가 있을까?
  // 검색 : 배열 큰 순서로 정렬하기
  let answer = 0;
  people.sort((a, b) => b - a);
  for (let i = 0; i < people.length; i++) {
    if (people[i] + people[people.length - 1] <= limit) {
      people.pop();
    }
    answer++;
  }
  return answer;
}
