import Login from "@/components/login";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white items-center justify-between p-24">
      <Login></Login>
    </main>
  );
}
