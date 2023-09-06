'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MainLayout from "@/layouts/mainLayout";
import { Metadata } from "next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import ReactCountryFlag from "react-country-flag"
import { Athlete } from "../interfaces";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "./components/data-table";
import { columns, columnsToResults } from "./columns";
import { AthletesRanking } from "./data";
import RegisterRecords from "./components/register-records";
import { MoreHorizontal } from "lucide-react";
import useFirestore from "@/hooks/firestore";
import { useToast } from "@/components/ui/use-toast";

// export const metadata: Metadata = {
//     title: "Players",
//     description: "Example dashboard app built using the components.",
//   }


export default function Players() {
    const [athletes , setAthletes] = useState<Athlete[]>([]);
    const [ records , setRecords ] = useState<any>([])
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const { toast } = useToast();

    const { getAthletes, getRecords } = useFirestore();
    
    useEffect(() => {
        getAthletes({ setAthletes , setLoading , toast })
        getRecords({ setRecords , toast })
    }, []);


    return (
        <MainLayout header="Atletas">
           

            <Tabs defaultValue="athletes" className="w-full">
                <TabsList>
                    <TabsTrigger value="athletes">Atletas registrados</TabsTrigger>
                    <TabsTrigger value="ranking">Clasificación</TabsTrigger>
                    <TabsTrigger value="results">Resultados</TabsTrigger>
                </TabsList>
                <TabsContent value="athletes">
                    {
                        loading ? (
                            <LoadingData></LoadingData>
                        ) : (
                            athletes.length === 0 ? (
                                <Empty />
                            ) : (
                                <Content athletes={athletes} router={router}></Content>
                            )
                        )
                    }
                </TabsContent>
                <TabsContent value="ranking">
                    <DataTable columns={columns} data={AthletesRanking} />
                </TabsContent>
                <TabsContent value="results">

                    <div className="grid grid-cols-3 gap-2">
                        <div className="col-span-1">
                            {/* Form Record */}
                            <RegisterRecords />
                        </div>
                        <div className="col-span-2">
                            <DataTable columns={columnsToResults} data={records} />
                        </div>
                    </div>


                   
                </TabsContent>
            </Tabs>
        </MainLayout>
    );
  
}

const Empty = () => {
    return <>
        <div className="flex justify-center">
            <Image alt="empty" src="empty.svg" width={400} height={400} />
        </div>
        <h2 className="text-center mt-2 font-bold text-2xl">Whoops is empty</h2>
    </>
}


const LoadingData = () => {
    return <>
        <div className="">
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
    <div className="">
                    <Table>
                    <TableCaption>Atletas de FVP.</TableCaption>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="font-bold">Atleta</TableHead>
                        <TableHead className="font-bold">Nacionalidad</TableHead>
                        <TableHead className="font-bold">Posición</TableHead>
                        <TableHead className="font-bold">Brazalete</TableHead>
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
                                <TableCell className="text-left">
                                    <ReactCountryFlag
                                        countryCode={athlete.data.nationality}
                                        svg
                                        style={{
                                            width: '2em',
                                            height: '2em',
                                        }}
                                        title="US"
                                    />
                                </TableCell>
                                <TableCell>{athlete.data.position}</TableCell>
                                <TableCell>
                                    <span className={`${athlete.data.carnetId ? 'bg-green-300' : 'bg-red-500' } px-2.5 text-xs rounded-full py-2 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white`}>{athlete.data.carnetId ? 'Assigned' : 'Waiting' }</span>
                                </TableCell>
                                <TableCell className="text-center">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <MoreHorizontal/>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel>Manage</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => router.push(`/players/${athlete.id}`)}>Ver</DropdownMenuItem>
                                            {/* <DropdownMenuItem onClick={deleteAthlete(athlete.id)}>Delete</DropdownMenuItem> */}

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