/**
 * Leo는 카펫을 사러 갔다가 아래 그림과 같이 중앙에는 노란색으로 칠해져 있고 테두리 1줄은 갈색으로 칠해져 있는 격자 모양 카펫을 봤습니다.
Leo는 집으로 돌아와서 아까 본 카펫의 노란색과 갈색으로 색칠된 격자의 개수는 기억했지만, 전체 카펫의 크기는 기억하지 못했습니다.
Leo가 본 카펫에서 갈색 격자의 수 brown, 노란색 격자의 수 yellow가 매개변수로 주어질 때 카펫의 가로, 세로 크기를 순서대로 배열에 담아 return 하도록 solution 함수를 작성해주세요.
 * @param {*} brown 
 * @param {*} yellow 
 * @returns 
 */
function solution(brown, yellow) {
  /**
   * 카펫의 가로길이가 x, 세로길이가 y라고 했을 때 x >= y 가 참이다.
   * brown = 2x + 2y - 4
   * halfBrown = x + y - 2
   * yellow = (x - 2) * (y - 2)
   * 을 만족하는 x와 y값을 구하라
   * 자연수이므로 x + y - 2 = halfBrown에서 x를 중간 정수부터 1씩 증가/y는 1씩 감소시키면서
   * 해당 x,y 쌍의 (x - 2) * (y - 2) === yellow와 같으면 리턴
   * 또는 x * y === yellow + brown이면 리턴
   * ---------------------------------------- 가능한 수학적풀이
   * xy - 2x - 2y + 4 = yellow
   * xy = yellow + brown
   * x(halfBrown - x + 2) = yellow + brown - 4
   * x^2 - (halfBrown+2)*x + yellow + brown - 4 = 0 이 2차방정식의 두 해를 구하면 큰 쪽이 x, 작은 쪽이 y
   * ---------------------------------------- 수학적풀이 끝
   */
  const halfBrown = brown / 2;
  let x = Math.ceil((halfBrown + 2) / 2);
  let y = halfBrown - x + 2;
  const yellowBrown = yellow + brown;
  while (true) {
    if (yellowBrown === x * y) {
      return [x, y];
    } else {
      x++;
      y--;
    }
  }
}
