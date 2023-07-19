function solution(n) {
  return n
    .toString()
    .split("")
    .reduce((acc, cur) => (acc += parseInt(cur)), 0);
}
// reduce가 안익숙해서 acc+=cur 이렇게 썼는데, acc+cur로 써도 된다.
