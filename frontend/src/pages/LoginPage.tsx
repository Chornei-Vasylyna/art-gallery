import { AuthCard } from "@/features/auth/components/AuthCard";
import { LoginForm } from "@/features/auth/components/LoginForm";

export const LoginPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <AuthCard
        title="Welcome back"
        description="Enter your email and password to access the gallery"
      >
        <LoginForm />
      </AuthCard>
    </div>
  );
};