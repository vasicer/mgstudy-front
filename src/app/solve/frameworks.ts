export const DEFAULT_QUESTION = "공룡은 왜 사라졌어?";

export type Option = { id: string; label: string; value: string };

export type Quiz = {
  id: string;
  title: string;
  desc: string;
  options: Option[];
  correctId: string;
  wrongMsg: string;
  correctMsg: string;
};

export type Framework = {
  id: string;
  label: string;
  shortDesc: string;
  quizzes: Quiz[];
  buildQuestion: (values: string[]) => string;
  answer: string;
};

export const FRAMEWORKS: Record<string, Framework> = {
  oheukwonchik: {
    id: "oheukwonchik",
    label: "육하원칙",
    shortDesc:
      "누가·언제·어디서·무엇을·왜·어떻게를 채워서 훨씬 자세한 질문을 만들어요.",
    quizzes: [
      {
        id: "who",
        title: "1. 무엇에 대한 질문인지 확인하기",
        desc: "질문 속에서 궁금해하는 대상을 찾아보자.",
        options: [
          { id: "dino", label: "공룡", value: "공룡" },
          { id: "princess", label: "공주", value: "공주" },
          { id: "dog", label: "강아지", value: "강아지" },
        ],
        correctId: "dino",
        wrongMsg: "질문을 다시 읽어보자. 무엇에 대해 물어본 거지?",
        correctMsg: "맞아! '공룡'에 대한 질문이야.",
      },
      {
        id: "when",
        title: "2. 언제 있었던 일인지 채우기",
        desc: "'언제'를 넣어주면 더 좋은 질문이 돼. 알맞은 시대를 골라보자.",
        options: [
          { id: "ancient", label: "아주 먼 옛날 (공룡이 살던 때)", value: "아주 먼 옛날" },
          { id: "century", label: "100년 전", value: "100년 전" },
          { id: "yesterday", label: "어제", value: "어제" },
        ],
        correctId: "ancient",
        wrongMsg: "공룡은 아주 먼 옛날에 살았어. 다시 골라볼까?",
        correctMsg: "맞아! 아주 먼 옛날이야.",
      },
      {
        id: "precise",
        title: "3. 더 정확한 표현 찾기",
        desc: "'사라졌어' 대신 과학자들이 쓰는 더 정확한 표현은 뭘까?",
        options: [
          { id: "extinct", label: "멸종했어 (멸종하다)", value: "멸종" },
          { id: "moved", label: "이사 갔어", value: "이사" },
          { id: "hid", label: "숨었어", value: "숨음" },
        ],
        correctId: "extinct",
        wrongMsg: "과학자들이 쓰는 정확한 낱말을 다시 생각해볼까?",
        correctMsg: "맞아! '멸종'이 더 정확한 표현이야.",
      },
    ],
    buildQuestion: ([who, when, precise]) =>
      `${when}, ${who}은 왜 ${precise}하게 되었을까?`,
    answer:
      "커다란 소행성이 지구에 부딪히면서 환경이 갑자기 크게 바뀌었어요. 그래서 공룡을 비롯한 많은 생물이 오랫동안 살아남지 못하고 멸종하게 되었답니다.",
  },

  causeEffect: {
    id: "causeEffect",
    label: "원인과 결과",
    shortDesc:
      "무슨 일이 있었고(결과) 그게 왜 일어났는지(원인)를 짚어가며 질문을 만들어요.",
    quizzes: [
      {
        id: "effect",
        title: "1. 결과(무엇이 벌어졌는지) 확인하기",
        desc: "질문 속에서 이미 벌어진 일, 즉 '결과'는 무엇일까?",
        options: [
          { id: "extinct", label: "공룡이 사라짐 (멸종)", value: "공룡 멸종" },
          { id: "laidEgg", label: "공룡이 알을 낳음", value: "공룡이 알을 낳음" },
          { id: "grew", label: "공룡이 커짐", value: "공룡이 커짐" },
        ],
        correctId: "extinct",
        wrongMsg: "질문에서 이미 벌어진 일이 뭔지 다시 찾아보자.",
        correctMsg: "맞아! '공룡 멸종'이 이미 벌어진 결과야.",
      },
      {
        id: "cause",
        title: "2. 원인 후보 좁히기",
        desc: "이 결과가 생기려면 어떤 '원인'이 있었을까?",
        options: [
          { id: "asteroid", label: "소행성 같은 큰 물체가 충돌해서", value: "소행성 충돌" },
          { id: "hungry", label: "좋아하는 먹이를 다 먹어서", value: "먹이 부족" },
          { id: "bored", label: "그냥 심심해서", value: "심심함" },
        ],
        correctId: "asteroid",
        wrongMsg: "과학자들이 가장 유력하다고 보는 원인을 다시 생각해볼까?",
        correctMsg: "맞아! 소행성 충돌이 가장 유력한 원인이야.",
      },
      {
        id: "mechanism",
        title: "3. 원인이 결과로 이어진 과정 찾기",
        desc: "소행성 충돌이 어떻게 멸종으로 이어졌을까?",
        options: [
          { id: "envchange", label: "환경이 갑자기 크게 바뀐 것", value: "환경이 갑자기 크게 바뀐 것" },
          { id: "angry", label: "공룡들이 화가 난 것", value: "공룡들이 화가 난 것" },
          { id: "pretty", label: "소행성이 예뻤던 것", value: "소행성이 예뻤던 것" },
        ],
        correctId: "envchange",
        wrongMsg: "원인이 결과로 이어지려면 무엇이 바뀌어야 했을지 다시 생각해볼까?",
        correctMsg: "맞아! 환경이 갑자기 크게 바뀐 게 중요한 연결고리야.",
      },
    ],
    buildQuestion: ([effect, cause, mechanism]) =>
      `${cause}이 일어났을 때, ${mechanism} 때문에 왜 ${effect}이라는 결과로 이어졌을까?`,
    answer:
      "소행성이 부딪히면서 생긴 먼지와 재가 하늘을 오랫동안 뒤덮었어요. 햇빛이 가려져 식물이 자라지 못했고, 먹이가 사라지면서 공룡을 비롯한 많은 생물이 멸종하게 되었답니다.",
  },
};

export const FRAMEWORK_LIST = Object.values(FRAMEWORKS);
