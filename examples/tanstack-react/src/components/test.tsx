import { useRouter } from "@tanstack/react-router";

export function Test() {
  const data = useRouter();

  return (
    <pre>
      <code>{JSON.stringify(data, null, 2)}</code>
    </pre>
  );
}
