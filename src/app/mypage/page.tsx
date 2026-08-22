"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import AuthNav from "../components/AuthNav";
import {
  getAccount,
  updateProfile,
  getHistory,
  AVATAR_OPTIONS,
  DEFAULT_AVATAR,
  type HistoryEntry,
} from "../lib/localAuth";

export default function MyPage() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [avatar, setAvatar] = useState(DEFAULT_AVATAR);
  const [savedMessage, setSavedMessage] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    const account = getAccount();
    setNickname(account?.nickname ?? "");
    setAvatar(account?.avatar ?? DEFAULT_AVATAR);
    setHistory(getHistory());
  }, []);

  function handleSave() {
    updateProfile({ nickname: nickname.trim() || "이름 없음", avatar });
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 1500);
  }

  function askAgain(question: string) {
    sessionStorage.setItem("mgstudy:question", question);
    router.push("/analyze");
  }

  return (
    <div className={styles.page}>
      <AuthNav />

      <h1 className={styles.title}>마이페이지</h1>

      <div className={styles.profileCard}>
        <div className={styles.avatarDisplay}>{avatar}</div>

        <label className={styles.label} htmlFor="nickname">
          닉네임
        </label>
        <input
          id="nickname"
          className={styles.input}
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임을 입력해줘"
        />

        <label className={styles.label}>아바타 고르기</label>
        <div className={styles.avatarGrid}>
          {AVATAR_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              className={`${styles.avatarOption} ${
                option === avatar ? styles.avatarOptionSelected : ""
              }`}
              onClick={() => setAvatar(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <button className={styles.saveButton} onClick={handleSave}>
          저장하기
        </button>
        {savedMessage && <p className={styles.savedMessage}>저장했어요!</p>}
      </div>

      <div className={styles.historySection}>
        <h2 className={styles.sectionTitle}>내가 물어본 질문</h2>
        {history.length === 0 ? (
          <p className={styles.emptyText}>
            아직 물어본 질문이 없어요.{" "}
            <Link href="/" className={styles.inlineLink}>
              질문하러 가기
            </Link>
          </p>
        ) : (
          <ul className={styles.historyList}>
            {history.map((item, i) => (
              <li key={i} className={styles.historyItem}>
                <div className={styles.historyInfo}>
                  <p className={styles.historyQuestion}>{item.question}</p>
                  <p className={styles.historyMeta}>
                    {item.age}살 ·{" "}
                    {new Date(item.date).toLocaleString("ko-KR")}
                  </p>
                </div>
                <button
                  className={styles.retryButton}
                  onClick={() => askAgain(item.question)}
                >
                  다시 풀기
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Link href="/" className={styles.backLink}>
        ← 홈으로
      </Link>
    </div>
  );
}
