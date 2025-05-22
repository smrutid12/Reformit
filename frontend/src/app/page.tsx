import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1>Chrome Extension Dev Mode</h1>
      <p>
        Open <Link href="/popUp">popup.html</Link> from the dist folder in
        Chrome.
      </p>
    </div>
  );
}
