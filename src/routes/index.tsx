import { createFileRoute } from "@tanstack/react-router";
// @ts-expect-error - JSX component written in JavaScript
import LessonLayout from "../components/LessonLayout.jsx";

const title = "CSS Quest — Learn CSS by playing";
const description =
  "Learn CSS through playful, interactive challenges. Write real CSS, see it live, and earn XP as you go.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <LessonLayout />;
}
