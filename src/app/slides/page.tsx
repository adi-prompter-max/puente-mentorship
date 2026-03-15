import { readFileSync } from "fs";
import { join } from "path";

export default function SlidesPage() {
  const html = readFileSync(
    join(process.cwd(), "public", "slides.html"),
    "utf-8"
  );

  return (
    <iframe
      srcDoc={html}
      style={{
        width: "100vw",
        height: "100vh",
        border: "none",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
      }}
      title="Puente - Presentación"
    />
  );
}
