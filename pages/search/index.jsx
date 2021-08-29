import { useRouter } from "next/router";

export default function Search() {
  const { q } = useRouter().query;

  return <div>{q}</div>;
}
