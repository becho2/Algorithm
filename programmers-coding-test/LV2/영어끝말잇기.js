/**
 * 통과했지만 코드도 너무 길고 마음에 들지 않아 리팩토링
 */
function solution(n, words) {
  let indexOfWrong = 0;
  const alreadyWords = [words[0]];
  const wordsLength = words.length;
  for (let i = 1; i < wordsLength; i++) {
    if (
      words[i - 1].charAt(words[i - 1].length - 1) !== words[i].charAt(0) ||
      alreadyWords.indexOf(words[i]) > -1
    ) {
      indexOfWrong = i;
      break;
    } else {
      alreadyWords.push(words[i]);
    }
  }
  if (indexOfWrong === 0) return [0, 0];

  const answerOrder = indexOfWrong + 1;
  let personNumber;
  personNumber = answerOrder % n;

  return [personNumber === 0 ? n : personNumber, Math.ceil(answerOrder / n)];
}

/**
 * 사람의 수 n과 사람들이 순서대로 말한 단어 words 가 매개변수로 주어질 때, 가장 먼저 탈락하는 사람의 번호와 그 사람이 자신의 몇 번째 차례에 탈락하는지를 구해서 return 하도록 solution 함수를 완성해주세요.

제한 사항
끝말잇기에 참여하는 사람의 수 n은 2 이상 10 이하의 자연수입니다.
words는 끝말잇기에 사용한 단어들이 순서대로 들어있는 배열이며, 길이는 n 이상 100 이하입니다.
단어의 길이는 2 이상 50 이하입니다.
모든 단어는 알파벳 소문자로만 이루어져 있습니다.
끝말잇기에 사용되는 단어의 뜻(의미)은 신경 쓰지 않으셔도 됩니다.
정답은 [ 번호, 차례 ] 형태로 return 해주세요. (번호는 1번 참가자, 2번 참가자 등 n명의 참가자의 참가자번호를 뜻함, 차례는 해당 틀린 참가자가 자신의 몇번째 차례에 틀렸는지를 뜻함)
만약 주어진 단어들로 탈락자가 생기지 않는다면, [0, 0]을 return 해주세요.
 * @param {*} n 
 * @param {*} words 
 * @returns 
 */
function solution(n, words) {
  // 마지막 글자와 다른 글자를 첫 글자로 하는 단어를 만들어 탈락한 경우
  let wrongAnswerIndex = 0;
  const wordsLength = words.length;
  for (let i = 0; i < wordsLength; i++) {
    if (i < words.length - 1) {
      if (words[i].charAt(words[i].length - 1) !== words[i + 1].charAt(0)) {
        wrongAnswerIndex = i + 1;
        break;
      }
    }
  }

  // 이미 나왔던 단어로 인해 탈락한 경우
  const uniqueWords = [...new Set(words)];
  let sameAnswerIndex = 0;
  const countWords = uniqueWords.map((v) => 0);
  const sameAnswerIndexes = [];
  uniqueWords.map((uniqueWord, uniqueIndex) => {
    words.filter((word, wordIndex) => {
      if (word === uniqueWord) {
        if (countWords[uniqueIndex] > 0) sameAnswerIndexes.push(wordIndex);
        countWords[uniqueIndex]++;
      }
    });
  });
  sameAnswerIndexes.forEach((v) => {
    if (sameAnswerIndex === 0) {
      sameAnswerIndex = v;
    } else {
      sameAnswerIndex = sameAnswerIndex > v ? v : sameAnswerIndex;
    }
  });
  let answerIndex = 0;
  if (wrongAnswerIndex === 0 && sameAnswerIndex === 0) {
    return [0, 0];
  } else if (wrongAnswerIndex === 0 || sameAnswerIndex === 0) {
    answerIndex = wrongAnswerIndex === 0 ? sameAnswerIndex : wrongAnswerIndex;
  } else {
    answerIndex =
      wrongAnswerIndex < sameAnswerIndex ? wrongAnswerIndex : sameAnswerIndex;
  }
  const answerOrder = answerIndex === 0 ? 0 : answerIndex + 1;
  let personNumber;
  personNumber = answerOrder % n;

  return [personNumber === 0 ? n : personNumber, Math.ceil(answerOrder / n)];
}
