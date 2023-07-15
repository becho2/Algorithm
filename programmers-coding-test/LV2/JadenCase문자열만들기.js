function solution(s) {
  let stringArr = s.split("");
  const answerArr = [];
  let prevChar = stringArr[0];
  stringArr.forEach((char, index) => {
    if (prevChar === " " || index === 0) {
      answerArr.push(char.toUpperCase());
    } else {
      answerArr.push(char.toLowerCase());
    }
    prevChar = char;
  });
  return answerArr.join("");
}
