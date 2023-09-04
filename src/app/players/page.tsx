'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MainLayout from "@/layouts/mainLayout";
import { Metadata } from "next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "../../../firebase.config";
import { QuerySnapshot, addDoc, collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import ReactCountryFlag from "react-country-flag"
import { Circle, Edit, Edit2, MoreHorizontal } from "react-feather";
import { Athlete } from "../interfaces";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "./components/data-table";
import { columns, columnsToResults } from "./columns";
import { AthletesRanking } from "./data";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import useFirestore from "@/hooks/firestore";

// export const metadata: Metadata = {
//     title: "Players",
//     description: "Example dashboard app built using the components.",
//   }


export default function Players() {
    const [athletes , setAthletes] = useState<Athlete[]>([]);
    const [ records , setRecords ] = useState<any>([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const router = useRouter()
    const { toast } = useToast()
    const { addRecord } = useFirestore()

    // Record form
    const [ form , setForm ] = useState<any>({ condition: 'victory' })

    const athleteRef = collection(db, "athletes")
    const recordsRef = collection(db, "records")

    useEffect(() => {
        const q = query(athleteRef);
        const q2 = query(recordsRef)

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setLoading(true)
            const newAthletes: Athlete[] = [];
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

        const uns = onSnapshot(q2 , (querySnapshot) => {
            const recordsEntry: any = []
            querySnapshot.forEach(doc => {
                recordsEntry.push(doc.data())
            })

            setRecords(recordsEntry)
        })
    
        return () => {
            // Clean up the listener when the component unmounts
            unsubscribe();
            uns();
        };
    }, []);

    console.log('records', records)

    

    const deleteAthlete = async (id: any) => {
        try {
            await deleteDoc(doc(athleteRef , id));
        } catch (error) {
            toast({
                variant: "destructive",
                description: "Error",
              })
        }
    }
    

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
                                <Content athletes={athletes} router={router} deleteAthlete={deleteAthlete}></Content>
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
                            <Card>
                                <CardHeader>
                                    <CardTitle>Registrar resultados</CardTitle>
                                    <CardDescription>
                                        ¿Cuales fueron los resultados hoy?
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="grid gap-6">
                                    <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="description">Quien</Label>
                                        <Input onChange={e => setForm({ ...form , who: e.target.value })}></Input>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="security-level">Contra quien</Label>
                                        <Input onChange={e => setForm({ ...form , against: e.target.value })}></Input>
                                    </div>
                                    </div>
                                    <div className="grid gap-2">
                                    <Label htmlFor="subject">Condición</Label>
                                    <Select onValueChange={ value => setForm({ ...form ,condition: value }) } defaultValue="victory">
                                        <SelectTrigger
                                            id="security-level"
                                            className=""
                                        >
                                            <SelectValue placeholder="Select level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="victory"><Badge>Victoria</Badge></SelectItem>
                                            <SelectItem value="defeat"><Badge variant={'destructive'}>Derrota</Badge></SelectItem>
                                        </SelectContent>
                                    </Select>
                                    </div>
                                    <div className="grid gap-2">
                                    <Label htmlFor="description">Puntuación</Label>
                                    <Input onChange={e => setForm({ ...form , score: e.target.value })}></Input>
                                    </div>
                                </CardContent>
                                <CardFooter className="justify-end space-x-2">
                                    <Button onClick={() => addRecord({setLoading , form , toast})} disabled={loading}>
                                    {loading && (
                                        <Circle className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                        Registrar
                                    </Button>
                                </CardFooter>
                            </Card>
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

const Content = ({ athletes, router, deleteAthlete }: any) => {
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