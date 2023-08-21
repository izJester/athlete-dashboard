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
            <div className="row-span-2 lg:col-span-1 sm:col-span-3">
                <Card>
                    <CardHeader className="space-y-1">
                        <CardTitle className="uppercase">personal</CardTitle>
                        
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col space-y-2">
                            <div>  
                                <span className="uppercase font-bold">Height: </span>
                                <span className="uppercase font-semibold text-gray-700">{playerData?.height} cm</span>
                            </div>
                            <div>
                                <span className="uppercase font-bold">Birthdate: </span>
                                <span className="uppercase font-semibold text-gray-700">{toBirthDate}</span>
                            </div>
                            <div>
                                <span className="uppercase font-bold">Age: </span>
                                <span className="uppercase font-semibold text-gray-700">{toAgeInYears}</span>
                            </div>
                            <div>
                                <span className="uppercase font-bold">Email: </span>
                                <span className="uppercase font-semibold text-gray-700">{playerData?.email}</span>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                    <div className="container max-w-screen-lg mx-auto">
                        <div>
                        <h2 className="text-lg font-semibold text-center mb-6 text-gray-700">Social Media</h2>

                        <div className="flex flex-wrap justify-center gap-2">
                            {
                                playerData?.socialmedias?.facebook && <a href={playerData?.socialmedias.facebook} className="bg-blue-500 p-2 font-semibold text-white inline-flex items-center space-x-2 rounded">
                                    <svg className="w-5 h-5 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                                </a>
                            }
                            
                            {
                                playerData?.socialmedias?.twitter && <a href={playerData?.socialmedias.twitter} className="bg-blue-400 p-2 font-semibold text-white inline-flex items-center space-x-2 rounded">
                                    <svg className="w-5 h-5 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                                </a>
                            }

                            

                        </div>
                        </div>
                    </div>
                    </CardFooter>
                </Card>
            </div>
            <div className="lg:col-span-2 sm:col-span-3">
                <Card>
                    <CardContent className={`p-4 bg-center max-h-36 h-36`} style={{ backgroundImage: `url(${playerData?.bannerpicture})` }}>
                        <div className="grid grid-cols-4">
                            <div className="col-span-2">
                                <div className="flex flex-col items-center">
                                    <span className="uppercase font-semibold text-white">Ranking: </span>
                                    <span className="uppercase text-xl text-gray-100">{playerData?.ranking}</span>
                                </div>

                            </div>
                            <div className="col-span-2">
                                <div className="flex flex-col items-center">
                                    <span className="uppercase font-semibold text-white">Sizes: </span>
                                    <div>  
                                        <span className="uppercase font-bold text-white">Pant: </span>
                                        <span className="uppercase font-semibold text-white">{playerData?.pantsize}</span>
                                    </div>
                                    <div>
                                        <span className="uppercase font-bold text-white">Shirt: </span>
                                        <span className="uppercase font-semibold text-white">{playerData?.shirtsize}</span>
                                    </div>
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