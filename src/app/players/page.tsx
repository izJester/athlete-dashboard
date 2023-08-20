'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MainLayout from "@/layouts/mainLayout";
import { Metadata } from "next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "../../../firebase.config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

// export const metadata: Metadata = {
//     title: "Players",
//     description: "Example dashboard app built using the components.",
//   }

export default function Players() {
    const [athletes , setAthletes] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const router = useRouter()

    useEffect(() => {
        const q = query(collection(db, "atletes"));
    
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const newAthletes: any[] = [];
            querySnapshot.forEach((doc) => {
                newAthletes.push({ id: doc.id, data: doc.data() });
            });
            setAthletes(newAthletes);
            setLoading(false); // Data loaded successfully
        }, (err) => {
            console.error("Error fetching data:", err);
            setError(true);
            setLoading(false); // Data loading failed
        });
    
        return () => {
            // Clean up the listener when the component unmounts
            unsubscribe();
        };
    }, []);

    return (
        <MainLayout>
            {athletes.length > 0 ? <Content athletes={athletes} router={router} /> : <LoadingData />}
        </MainLayout>
    );
  
}


const LoadingData = () => {
    return <>
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="space-y-4">
                <Skeleton className="w-1/3 h-4"></Skeleton>
                <Skeleton className="w-1/4 h-4"></Skeleton>
            </div>
                    <div className="flex items-center space-x-6">
                        <Skeleton className="h-12 w-12 rounded-full"></Skeleton>
                        <Skeleton className="w-1/4 h-6"></Skeleton>
                        <Skeleton className="w-2/4 h-6"></Skeleton>
                        <Skeleton className="w-1/4 h-6"></Skeleton>
                    </div>
                    <div className="flex items-center space-x-6">
                        <Skeleton className="h-12 w-12 rounded-full"></Skeleton>
                        <Skeleton className="w-1/4 h-6"></Skeleton>
                        <Skeleton className="w-2/4 h-6"></Skeleton>
                        <Skeleton className="w-1/4 h-6"></Skeleton>
                    </div>
                    <div className="flex items-center space-x-6">
                        <Skeleton className="h-12 w-12 rounded-full"></Skeleton>
                        <Skeleton className="w-1/4 h-6"></Skeleton>
                        <Skeleton className="w-2/4 h-6"></Skeleton>
                        <Skeleton className="w-1/4 h-6"></Skeleton>
                    </div>
                    <div className="flex items-center space-x-6">
                        <Skeleton className="h-12 w-12 rounded-full"></Skeleton>
                        <Skeleton className="w-1/4 h-6"></Skeleton>
                        <Skeleton className="w-2/4 h-6"></Skeleton>
                        <Skeleton className="w-1/4 h-6"></Skeleton>
                    </div>

        </div>
    </>
}

const Content = ({ athletes, router }: any) => {
    return <>
    <div className="flex-1 space-y-4 p-8 pt-6">
                    <div className="flex flex-col space-y-4">
                        <span className="font-bold text-2xl">Players Registered</span>
                        <span className="font-semibold text-sm text-gray-500">You can only see the players who been registered in the app.</span>
                    </div>
                    <Table>
                    <TableCaption>Players of FVP.</TableCaption>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="font-bold">Athlete</TableHead>
                        <TableHead className="font-bold">Position</TableHead>
                        <TableHead className="font-bold">Bracelet</TableHead>
                        <TableHead className="text-right"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {athletes.map((athlete: any, i: number) => (
                            <TableRow key={i}>
                                <TableCell className="text-left">
                                    <div className="flex space-x-4">
                                        <Avatar>
                                            {/* <AvatarImage src={ athlete.data.portraitpicture }/> */}
                                            <AvatarFallback>{`${athlete.data.names.charAt(0)}${athlete.data.lastnames.charAt(0)}`}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-md">{athlete.data.names} {athlete.data.lastnames}</span>
                                            <span>{athlete.data.email}</span>
                                        </div>
                                    </div>
                                    
                                </TableCell>
                                <TableCell>{athlete.data.playingposition}</TableCell>
                                <TableCell>
                                    <span className={`${athlete.data.carnetId ? 'bg-green-300' : 'bg-red-500' } px-2.5 text-xs rounded-full py-2 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white`}>{athlete.data.carnetId ? 'Assigned' : 'Waiting' }</span>
                                </TableCell>
                                <TableCell className="text-center">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel>Manage</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => router.push(`/players/${athlete.id}`)}>View</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                        
                    </TableBody>
                    </Table>
            </div>
    </>
}