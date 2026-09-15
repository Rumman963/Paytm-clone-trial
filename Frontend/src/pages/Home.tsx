import { Logo } from "@/icons/logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="min-h-screen w-full bg-linear-to-r from-sky-200 to-indigo-200">
      {/* Navbar */}
      <nav className="flex h-16 w-full items-center justify-between px-8">
        <Link to="/">
          <Logo />
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/signin"
            className="text-sm font-medium text-gray-700 hover:text-blue-600"
          >
            Sign in
          </Link>

          <Button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white">
            <Link to="/signup">Get Started</Link>
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center px-6 pt-32">
        <section className="flex max-w-3xl flex-col items-center text-center">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900">
            Move money. Simply.
          </h1>

          <p className="mt-5 max-w-xl text-lg text-gray-500">
            Send money to anyone, anytime. Fast, simple and secure.
          </p>

          <Button  size="lg" className="mt-8 bg-indigo-600 hover:bg-indigo-700">
            <Link to="/signup">Get Started</Link>
          </Button>
        </section>

        {/* Payment Visual */}
        <Card className="mt-16 w-full max-w-md rounded-2xl p-6 shadow-lg bg-gray-400">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Available balance</p>

              <p className="mt-2 text-3xl font-bold text-gray-900">
                ₹24,580
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-200 text-blue-600">
              ₹
            </div>
          </div>

          <div className="mt-6 border-t pt-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Rahul Sharma
                </p>

                <p className="text-xs text-gray-500">
                  Money sent
                </p>
              </div>

              <p className="font-semibold text-gray-900">
                -₹500
              </p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}