import { Logo } from "../icons/logo";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BACKEND_URL } from "@/config";


export function Signin() {

    const form = useForm<{ email: string; password: string }>();
    const navigate = useNavigate();

    const onSubmit = async (data:{email:string , password:string}) => {

        try{

            const res = await axios.post( 
                `${BACKEND_URL}/app/v1/user/signin`,
                data
            
            );
            
            console.log(res.data);
            localStorage.setItem("token" , res.data.token);
            navigate ("/dashboard")    
        } catch(error){
            console.log(error)
        }
     };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="w-full max-w-md p-6">

                <div className="flex justify-center">
                    <Logo />
                </div>

                <h1 className="text-2xl font-semibold">
                    Welcome Back
                </h1>

                <p className="text-sm text-gray-500">
                    Sign in to continue to your account
                </p>

                <form onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-2">

                    <Field>
                        <label>Email</label>
                        <Input
                            placeholder="Enter your email"
                            type="email"
                            {...form.register("email")}
                        />
                    </Field>

                    <Field>
                        <label>Password</label>
                        <Input
                            type="password"
                            placeholder="Enter your password"
                            {...form.register("password")}
                        />
                    </Field>

                    <Button
                        type="submit"
                        className="w-full"
                    >
                        Sign in
                    </Button>

                </form>

                <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="font-medium text-blue-600 hover:underline"
                    >
                        Sign up
                    </Link>
                </p>

            </Card>
        </div>
    );
}