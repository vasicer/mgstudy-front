"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./AuthNav.module.css";
import {
  isLoggedIn,
  getCurrentEmail,
  getAccount,
  logout,
  DEFAULT_AVATAR,
} from "../lib/localAuth";

export default function AuthNav() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string | null>(null);
  const [avatar, setAvatar] = useState(DEFAULT_AVATAR);

  useEffect(() => {
    setLoggedIn(isLoggedIn());
    setEmail(getCurrentEmail());
    const account = getAccount();
    setNickname(account?.nickname ?? null);
    setAvatar(account?.avatar ?? DEFAULT_AVATAR);
  }, []);

  function handleLogout() {
    logout();
    setLoggedIn(false);
    setEmail(null);
    router.push("/");
  }

  return (
    <div className={styles.nav}>
      {loggedIn && (
        <span className={styles.greeting}>
          {avatar} {nickname ?? email}님
        </span>
      )}

      <Link href="/mypage" className={styles.link}>
        마이페이지
      </Link>

      {loggedIn ? (
        <>
          <Link href="/history" className={styles.link}>
            내 질문 기록
          </Link>
          <button className={styles.linkButton} onClick={handleLogout}>
            로그아웃
          </button>
        </>
      ) : (
        <>
          <Link href="/login" className={styles.link}>
            로그인
          </Link>
          <Link href="/signup" className={styles.linkPrimary}>
            회원가입
          </Link>
        </>
      )}
    </div>
  );
}
