"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { FRAMEWORKS } from "../solve/frameworks";
import Fireworks from "../components/Fireworks";

export default function ResultPage() {
  const [finalQuestion, setFinalQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [celebrate, setCelebrate] = useState(0);

  useEffect(() => {
    const storedQuestion = sessionStorage.getItem("mgstudy:finalQuestion");
    const storedFramework = sessionStorage.getItem("mgstudy:framework");
    const framework = storedFramework ? FRAMEWORKS[storedFramework] : undefined;

    if (storedQuestion) setFinalQuestion(storedQuestion);
    if (framework) setAnswer(framework.answer);
    setCelebrate(1);
  }, []);

  return (
    <div className={styles.page}>
      <Fireworks trigger={celebrate} />
      <div className={styles.questionCard}>
        <span className={styles.questionLabel}>완성한 질문</span>
        <p className={styles.questionText}>{finalQuestion}</p>
      </div>

      <div className={styles.answerCard}>
        <span className={styles.answerLabel}>답</span>
        <p className={styles.answerText}>{answer}</p>
      </div>

      <Link href="/" className={styles.homeLink}>
        다른 질문 만들러 가기
      </Link>
    </div>
  );
}
