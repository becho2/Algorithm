/**
 * name과 yearning의 인덱스를 맞춰서 photo의 각 배열의 합을 구한다.
 * yearning이 각 이름의 인물에 대한 '추억점수', photo에 있는 배열들은 각 사진에 찍힌 인물들의 이름들이다.
 * example name = ["may", "kein", "kain", "radi"]
 * example yearning = [5, 10, 1, 3]
 * example photo = [["may", "kein", "kain", "radi"],["may", "kein", "brin", "deny"], ["kon", "kain", "may", "coni"]]
 * @param {*} name
 * @param {*} yearning
 * @param {*} photo
 * @returns
 */

function solution(name, yearning, photo) {
  var answer = [];

  answer = photo.map((item) => {
    return item.reduce((acc, cur) => {
      var yearningIndex = name.findIndex((element) => element === cur);
      if (yearningIndex !== -1) {
        acc += yearning[yearningIndex];
      }
      return acc;
    }, 0);
  });
  return answer;
}
