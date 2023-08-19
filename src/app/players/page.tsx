'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import MainLayout from "@/layouts/mainLayout";
import { Metadata } from "next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "../../../firebase.config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// export const metadata: Metadata = {
//     title: "Players",
//     description: "Example dashboard app built using the components.",
//   }

export default function Players() {
    const [athletes , setAthletes] = useState<any>([]);

    const getAthletes = async () => {

        const q = query(collection(db, "atletes"), where("names", "not-in", ['josefa']));
        const newAthletes: any[] = [];
        await onSnapshot(q, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
              newAthletes.push({id: doc.id , data: doc.data()});
          });
        });

        setAthletes(newAthletes);
    }

    useEffect(() => {
        getAthletes()
    }, [athletes])

    return ( 
        <MainLayout>
            <div className="flex-1 space-y-4 p-8 pt-6">
                    <div className="flex flex-col space-y-4">
                        <span className="font-bold text-2xl">Players Registered</span>
                        <span className="font-semibold text-sm text-gray-500">You can only see the players who been registered in the app.</span>
                    </div>
                    <Table>
                    <TableCaption>Players of FVP.</TableCaption>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="font-bold">Photo</TableHead>
                        <TableHead className="font-bold">Name</TableHead>
                        <TableHead className="font-bold">Lastnames</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {athletes.map((athlete: any, i: number) => (
                            <TableRow key={i}>
                                <TableCell className="text-left">
                                    {/* <Avatar>
                                        <AvatarImage src={ athlete.data.portraitpicture }/>
                                        <AvatarFallback>{`${athlete.data.names.charAt(0)}${athlete.data.lastnames.charAt(0)}`}</AvatarFallback>
                                    </Avatar> */}

                                        <div className="bg-no-repeat bg-top bg-cover h-16" style={{ backgroundImage: `url(${athlete.data.portraitpicture})` }} >
                                            
                                        </div>

                                </TableCell>
                                <TableCell>{athlete.data.names}</TableCell>
                                <TableCell>{athlete.data.lastnames}</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel>Manage</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>Details</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                        
                    </TableBody>
                    </Table>
            </div>

        </MainLayout> 
    );
}