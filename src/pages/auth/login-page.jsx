import { Navigate } from "react-router-dom";
import LoginForm from "@/components/form/auth/login-form";
import { useSession } from "@/provider/session-provider";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Header from "@/components/navigation/base-header";

export default function LoginPage() {
  const { user } = useSession();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="flex min-h-dvh w-full flex-col items-center justify-center gap-4 p-4 lg:p-0">
      <Header auth_section={false} />
      <LoginForm />
      <Link to="/" className={cn(buttonVariants({ variant: "link" }))}>
        Kembali
      </Link>
    </main>
  );
}
