import { useSession } from "@/provider/session-provider";
import { Navigate } from "react-router-dom";
import RegisterForm from "@/components/form/auth/register-form";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function RegisterPage() {
  const { user } = useSession();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="flex min-h-dvh w-full flex-col items-center justify-center gap-4 p-4 lg:p-0">
      <RegisterForm />
      <Link to="/" className={cn(buttonVariants({ variant: "link" }))}>
        Kembali
      </Link>
    </main>
  );
}
