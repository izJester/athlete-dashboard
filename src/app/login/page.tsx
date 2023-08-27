'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Circle, GitHub } from "react-feather";
import useAuth from "@/hooks/auth";
import Image from "next/image";
import Link from "next/link";
import GuestLayout from "@/layouts/guestLayout";

const Login = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [ email , setEmail ] = useState<any>()
    const [ password , setPassword ] = useState<any>()
    const {signIn} = useAuth();

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        signIn(email , password , setIsLoading)
    }

    

    return ( <GuestLayout>
        <div className="flex flex-col space-y-4 justify-center h-screen items-center">
            <Image src="/logo.svg" height={120} width={120} alt="Logo" />
            
            <Card className="p-6">
                <CardContent>
                    <div className={cn("grid gap-6")}>
                        <form onSubmit={onSubmit}>
                            <div className="grid gap-2">
                            <div className="grid gap-1">
                                <Label >
                                    Email
                                </Label>
                                <Input
                                id="email"
                                placeholder="name@example.com"
                                type="email"
                                autoCapitalize="none"
                                autoComplete="email"
                                autoCorrect="off"
                                disabled={isLoading}
                                onChange={(e) => setEmail(e.target.value)}
                                />
                                <Label>Password</Label>
                                <Input
                                id="password"
                                type="password"
                                autoCapitalize="none"
                                autoCorrect="off"
                                disabled={isLoading}
                                onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <Button disabled={isLoading}>
                                {isLoading && (
                                <Circle className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Sign In with Email
                            </Button>
                            </div>
                        </form>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Or continue with
                            </span>
                            </div>
                        </div>
                        <div className="text-center">

                            <Link className="text-sm hover:underline" href={'/reset-password'}> Forgot your password? </Link>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    </GuestLayout> );
}
 
export default Login;