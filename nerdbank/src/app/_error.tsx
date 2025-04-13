import { useRouter } from "next/router";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page "{router.asPath}" does not exist.</p>
      <a href="/" style={{ color: "blue", textDecoration: "underline" }}>
        Go Home
      </a>
    </div>
  );
}
