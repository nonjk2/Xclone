const Footer = () => {
  const Link = [
    "소개",
    "X 앱 다운로드하기",
    "고객센터",
    "이용약관",
    "개인정보 처리방침",
    "쿠키 정책",
    "접근성",
    "광고 정보",
    "블로그",
    "상태",
    "채용",
    "브랜드 리소스",
    "광고",
    "마케팅",
    "비즈니스용 X",
    "개발자",
    "디렉터리",
    "설정",
    "© 2023 X Corp.",
  ];
  return (
    <footer className="flex items-stretch relative">
      <nav className="px-4 py-3 w-full flex justify-center items-stretch basis-auto shrink-0 relative p-[12px 16px] flex-row flex-wrap ">
        {Link.map((e) => (
          <a href="#" key={e} className="clone-a-tag">
            <span className="clone-span-tag">{e}</span>
          </a>
        ))}
      </nav>
    </footer>
  );
};

export default Footer;
