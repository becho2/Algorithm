function solution(s) {
  let point = 0;
  const arr = s.split("");
  const arrLength = arr.length;
  for (let i = 0; i < arrLength; i++) {
    if (arr[i] === "(") {
      point++;
    } else {
      point--;
      if (point === -1) return false;
    }
  }

  if (point === 0) return true;
  return false;
}
