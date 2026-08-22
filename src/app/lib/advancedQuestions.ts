/**
 * "심화 질문" 추천 — 실제로는 AI가 지난 질문을 분석해서 만들어줄 부분이지만,
 * 백엔드가 아직 없어서 지금은 자주 나오는 질문에 대한 예시 심화 질문을 미리
 * 준비해두고, 목록에 없는 질문에는 일반적인 심화 질문 틀을 붙여 보여줍니다.
 */
const CURATED_FOLLOW_UPS: Record<string, string> = {
  "공룡은 왜 사라졌어?":
    "공룡 말고 그 시대에 함께 살던 다른 동물들은 어떻게 됐을까?",
  "우주는 얼마나 커?": "우주가 그렇게 크다면, 우주에는 끝이 있을까?",
  "하늘은 왜 파래?": "그럼 노을이 질 때는 왜 하늘이 빨갛게 변할까?",
  "무지개는 왜 생겨?": "무지개는 왜 항상 둥근 활 모양으로 보일까?",
  "번개는 왜 쳐?": "번개가 친 다음에 왜 천둥소리는 조금 늦게 들릴까?",
  "개미는 왜 줄지어 다녀?": "개미들은 길을 잃지 않고 집을 어떻게 다시 찾아갈까?",
};

export function suggestAdvancedQuestion(question: string): string {
  const curated = CURATED_FOLLOW_UPS[question.trim()];
  if (curated) return curated;
  return `"${question}"를 알았다면, 이번엔 "어떻게"로 시작하는 질문도 만들어볼까?`;
}
