import { Link } from "@tanstack/react-router";

interface AuthCardLayoutProps {
  heading: string;
  sub?: string;
  alt: string;
  altHref: string;
  altText: string;
  children: React.ReactNode;
}

const AuthCard = ({
  heading,
  sub,
  alt,
  altHref,
  altText,
  children,
}: AuthCardLayoutProps) => {
  return (
    <div className="min-h-[calc(100dvh-4rem)] flex items-center justify-center bg-muted/20 py-10 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">RukaTi</h1>
        </div>

        <div className="border border-black bg-white p-6 sm:p-8">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              {heading}
            </h2>
            {sub && <p className="mt-1 text-sm text-muted-foreground">{sub}</p>}
          </div>

          <div className="mt-6">{children}</div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {alt}{" "}
            <Link
              to={altHref}
              className="font-semibold text-black hover:underline"
            >
              {altText}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthCard;
