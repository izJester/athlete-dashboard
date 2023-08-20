'use client'

import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { db } from "../../../../firebase.config";
import { readSync } from "fs";
import { Player } from "@/app/interfaces";
import MainLayout from "@/layouts/mainLayout";
import moment from "moment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const ViewPlayer = ({params} : any) => {
    const [playerData, setPlayer] = useState<any>();

    const toBirthDate = useMemo(() => moment(playerData?.dob.toDate()).format("MMMM DD , YYYY"), [playerData])
    const toAgeInYears = useMemo(() => moment().diff(moment(playerData?.dob.toDate()) , 'years'), [playerData])

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "atletes", params.id), (doc) => {
            setPlayer(doc.data())
        });
       return () => {
        unsub();
       }
    }, [])

    return ( <MainLayout>
        
        <div className="h-80 bg-center bg-cover" style={{ backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/padel-venezuela.appspot.com/o/defaults%2Fcancha-de-padel-tec-campus-laguna%20copy.jpg?alt=media&token=0357ca61-1d14-4341-847b-f79a90268420)` }}>
            <div className="flex items-center space-x-2 max-h-80">
                <img className="h-80 w-80" src={playerData?.portraitpicture} alt="" />
                <div className="flex flex-col">
                    <span className="font-semilbold text-2xl text-white uppercase mb-4">{playerData?.playingposition}</span>
                    <span className="font-bold text-4xl text-white uppercase">{playerData?.names}</span>
                    <span className="font-bold text-4xl text-white uppercase">{playerData?.lastnames}</span>

                </div>
            </div>

        </div>
        <div className="grid grid-cols-3 gap-4 p-4">
            <div className="row-span-3 lg:col-span-1 sm:col-span-3">
                <Card>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl">Create an account</CardTitle>
                        <CardDescription>
                        Enter your email below to create your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid grid-cols-2 gap-6">
                        <Button variant="outline">
                            {/* <Icons.gitHub className="mr-2 h-4 w-4" /> */}
                            Github
                        </Button>
                        <Button variant="outline">
                            {/* <Icons.google className="mr-2 h-4 w-4" /> */}
                            Google
                        </Button>
                        </div>
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
                        <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="m@example.com" />
                        </div>
                        <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full">Create account</Button>
                    </CardFooter>
                </Card>
            </div>
            <div className="lg:col-span-2 sm:col-span-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Team Members</CardTitle>
                        <CardDescription>
                        Invite your team members to collaborate.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        <div className="flex items-center justify-between space-x-4">
                        <div className="flex items-center space-x-4">
                            <Avatar>
                            <AvatarImage src="/avatars/01.png" />
                            <AvatarFallback>OM</AvatarFallback>
                            </Avatar>
                            <div>
                            <p className="text-sm font-medium leading-none">Sofia Davis</p>
                            <p className="text-sm text-muted-foreground">m@example.com</p>
                            </div>
                        </div>
                        
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-2 sm:col-span-3">
            <Card>
                    <CardHeader>
                        <CardTitle>Team Members</CardTitle>
                        <CardDescription>
                        Invite your team members to collaborate.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        <div className="flex items-center justify-between space-x-4">
                        <div className="flex items-center space-x-4">
                            <Avatar>
                            <AvatarImage src="/avatars/01.png" />
                            <AvatarFallback>OM</AvatarFallback>
                            </Avatar>
                            <div>
                            <p className="text-sm font-medium leading-none">Sofia Davis</p>
                            <p className="text-sm text-muted-foreground">m@example.com</p>
                            </div>
                        </div>
                        
                        </div>
                       
                    </CardContent>
                </Card>
            </div>
        </div>
       
    </MainLayout> );
}
 
export default ViewPlayer;


const LoadingData = () => {

}