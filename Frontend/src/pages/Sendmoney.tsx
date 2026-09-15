import { Logo } from "../icons/logo";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type User = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
};

export function SendMoney() {

    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [amount, setAmount] = useState("");

    // Search User
    const searchUser = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.get(
                `${BACKEND_URL}/app/v1/user/search?filter=${search}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setUsers(res.data.user);

        } catch (error) {
            console.log(error);
        }
    };


    // Send Money
    const sendMoney = async () => {

        if (!selectedUser) {
            alert("Please select a recipient");
            return;
        }

        if (!amount || Number(amount) <= 0) {
            alert("Please enter a valid amount");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            const res = await axios.post(
                `${BACKEND_URL}/app/v2/account/transfer`,
                {
                    to: selectedUser._id,
                    amount: Number(amount)
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log(res.data);
            toast.success("Money sent successfully");
            navigate("/dashboard");


            

        } catch (error) {
            console.log(error);
            toast.error("Transfer failed");
        }
    };


    return (
        <div className="min-h-screen bg-gray-50">

            {/* Navbar */}
            <nav className="border-b bg-white">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

                    <Logo />

                    <Link to="/dashboard">
                        <Button variant="outline">
                            Dashboard
                        </Button>
                    </Link>

                </div>
            </nav>


            {/* Send Money */}
            <main className="min-h-[calc(100vh-73px)] flex items-center justify-center px-6">

                <Card className="w-full max-w-md p-6">

                    <h1 className="text-2xl font-semibold">
                        Send Money
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Send money securely to another user
                    </p>


                    <div className="space-y-4 mt-6">

                        {/* Recipient */}
                        <Field>

                            <label>Recipient</label>

                            <Input
                                placeholder="Enter email or name"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                            <Button
                                type="button"
                                variant="outline"
                                onClick={searchUser}
                                className="w-full mt-2"
                            >
                                Search
                            </Button>

                        </Field>


                        {/* Search Results */}
                        <div className="space-y-2">

                            {users.map((user) => (

                                <Card
                                    key={user._id}
                                    className="p-3 cursor-pointer hover:bg-gray-50"
                                    onClick={() => setSelectedUser(user)}
                                >

                                    <p className="font-medium">
                                        {user.firstName} {user.lastName}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        {user.email}
                                    </p>

                                </Card>

                            ))}

                        </div>


                        {/* Selected Recipient */}
                        {selectedUser && (
                            <Card className="p-4">

                                <p className="text-sm text-gray-500">
                                    Selected recipient
                                </p>

                                <p className="font-medium">
                                    {selectedUser.firstName}{" "}
                                    {selectedUser.lastName}
                                </p>

                                <p className="text-sm text-gray-500">
                                    {selectedUser.email}
                                </p>

                            </Card>
                        )}


                        {/* Amount */}
                        <Field>

                            <label>Amount</label>

                            <Input
                                type="number"
                                placeholder="Enter amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />

                        </Field>


                        {/* Send Money */}
                        <Button
                            type="button"
                            className="w-full"
                            onClick={sendMoney}
                        >
                            Send Money
                        </Button>

                    </div>

                </Card>

            </main>

        </div>
    );
}