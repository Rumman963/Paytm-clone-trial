import { Logo } from "../icons/logo";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState , useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/config";

export function Dashboard() {
    const [balance, setBalance] = useState(0);

    useEffect(() => {
    const getBalance = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.get(
                `${BACKEND_URL}/app/v2/account/balance`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setBalance(res.data.balance);

        } catch (error) {
            console.log(error);
        }
    };

    getBalance();
}, []);

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Navbar */}
            <nav className="border-b bg-blue-200 ">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

                    <Logo />

                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">
                            Welcome back
                        </span>

                        <Button variant="outline">
                            Sign out
                        </Button>
                    </div>

                </div>
            </nav>


            {/* Main */}
            <main className="max-w-6xl mx-auto px-6 py-8 bg-blue-100">

                <div className="mb-8">
                    <h1 className="text-2xl font-semibold">
                        Dashboard
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Manage your money easily
                    </p>
                </div>


                {/* Balance + Send Money */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <Card className="md:col-span-2 p-6">
                        <p className="text-sm text-gray-500">
                            Available balance
                        </p>

                        <h2 className="text-4xl font-semibold mt-2">
                             ₹{balance}
                        </h2>

                        <p className="text-sm text-gray-500 mt-2">
                            Your current account balance
                        </p>
                    </Card>


                    <Card className="p-6 flex flex-col justify-between">
                        <div>
                            <h2 className="text-lg font-semibold">
                                Send Money
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Transfer money to another user
                            </p>
                        </div>

                        <Link to="/sendMoney">
                            <Button className="w-full mt-6">
                                Send Money
                            </Button>
                        </Link>
                    </Card>

                </div>


                {/* Quick Actions */}
                <div className="mt-8">
                    <h2 className="text-lg font-semibold mb-4">
                        Quick Actions
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <Link to="/sendMoney">
                            <Card className="p-5 hover:shadow-sm transition cursor-pointer">
                                <h3 className="font-medium">
                                    Send Money
                                </h3>

                                <p className="text-sm text-gray-500 mt-1">
                                    Send money to another account
                                </p>
                            </Card>
                        </Link>

                        <Card className="p-5">
                            <h3 className="font-medium">
                                Transactions
                            </h3>

                            <p className="text-sm text-gray-500 mt-1">
                                View your recent transactions
                            </p>
                        </Card>

                    </div>
                </div>


                {/* Recent Transactions */}
                <div className="mt-8">
                    <h2 className="text-lg font-semibold mb-4">
                        Recent Transactions
                    </h2>

                    <Card className="p-6">

                        <p className="text-sm text-gray-500 text-center">
                            No transactions yet
                        </p>

                    </Card>
                </div>

            </main>

        </div>
    );
}