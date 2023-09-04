'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Circle } from "react-feather";
import { auth } from "../../../firebase.config";
import { sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/auth";
import { useState } from "react";
import GuestLayout from "@/layouts/guestLayout";
import { useToast } from "@/components/ui/use-toast";

const ResetPassword = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [ email , setEmail ] = useState<any>()
    const {user , signIn} = useAuth();
    const router = useRouter();
    const { toast } = useToast()

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        sendPasswordResetEmail(auth, email)
        .then(() => {
            router.push('/login')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if ('auth/user-not-found') {   
                toast({
                    variant: "destructive",
                    description: "This email does not exist",
                  })
            }
        });
    }

    return ( 
        <GuestLayout>
            <div className="flex flex-col space-y-4 justify-center h-screen items-center">
                <Image src="/logo.svg" height={120} width={120} alt="Logo" />
            {/* <img className="h-8 w-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company"></img> */}

            <Card className="p-6">
                <CardContent>
                    <div className={cn("grid gap-6")}>
                        <form onSubmit={onSubmit}>
                            <div className="grid gap-2">
                            <div className="grid gap-1">
                                <Label >
                                    Correo
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
                                
                            </div>
                            <Button disabled={isLoading}>
                                {isLoading && (
                                <Circle className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Enviar correo de recuperación
                            </Button>
                            </div>
                        </form>
                    </div>
                    </CardContent>
                    </Card>
                    </div>

        </GuestLayout>
     );
}
 
export default ResetPassword;