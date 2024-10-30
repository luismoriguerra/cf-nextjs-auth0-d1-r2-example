import UserClient from "@/components/auth/user-client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Button asChild>
        <Link href="/api/auth/login">Login</Link>
      </Button>
      <hr />
      <div>
        <a href="/api/auth/logout">Logout</a>
      </div>

      <hr />
      <br />
      <h2>Client Component:</h2>
      <UserClient />
    </main>
  );
}
