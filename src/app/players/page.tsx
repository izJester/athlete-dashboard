'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MainLayout from "@/layouts/mainLayout";
import { Metadata } from "next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "../../../firebase.config";
import { collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import ReactCountryFlag from "react-country-flag"
import { Edit, Edit2, MoreHorizontal } from "react-feather";
import useAuth from "@/hooks/auth";
import Login from "../login/page";
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

// export const metadata: Metadata = {
//     title: "Players",
//     description: "Example dashboard app built using the components.",
//   }


export default function Players() {
    const [athletes , setAthletes] = useState<Athlete[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const router = useRouter()
    const { toast } = useToast()

    const athleteRef = collection(db, "athletes")

    useEffect(() => {
        const q = query(athleteRef);
    
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
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
    
        return () => {
            // Clean up the listener when the component unmounts
            unsubscribe();
        };
    }, []);

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
        <MainLayout header="Athletes">
           

            <Tabs defaultValue="athletes" className="w-full">
                <TabsList>
                    <TabsTrigger value="athletes">Athletes registered</TabsTrigger>
                    <TabsTrigger value="ranking">Ranking</TabsTrigger>
                    <TabsTrigger value="results">Results</TabsTrigger>
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
                                    <CardTitle>Register results</CardTitle>
                                    <CardDescription>
                                    What area are you having problems with?
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="grid gap-6">
                                    <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="area">Who</Label>
                                        <Select defaultValue="billing">
                                        <SelectTrigger id="area">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="team">Team</SelectItem>
                                            <SelectItem value="billing">Billing</SelectItem>
                                            <SelectItem value="account">Account</SelectItem>
                                            <SelectItem value="deployments">Deployments</SelectItem>
                                            <SelectItem value="support">Support</SelectItem>
                                        </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="security-level">Against To</Label>
                                        <Select defaultValue="2">
                                        <SelectTrigger
                                            id="security-level"
                                            className="line-clamp-1 w-[160px] truncate"
                                        >
                                            <SelectValue placeholder="Select level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">Severity 1 (Highest)</SelectItem>
                                            <SelectItem value="2">Severity 2</SelectItem>
                                            <SelectItem value="3">Severity 3</SelectItem>
                                            <SelectItem value="4">Severity 4 (Lowest)</SelectItem>
                                        </SelectContent>
                                        </Select>
                                    </div>
                                    </div>
                                    <div className="grid gap-2">
                                    <Label htmlFor="subject">Condition</Label>
                                    <Select defaultValue="victory">
                                        <SelectTrigger
                                            id="security-level"
                                            className=""
                                        >
                                            <SelectValue placeholder="Select level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="victory"><Badge>Victory</Badge></SelectItem>
                                            <SelectItem value="defeat"><Badge variant={'destructive'}>Defeat</Badge></SelectItem>
                                        </SelectContent>
                                    </Select>
                                    </div>
                                    <div className="grid gap-2">
                                    <Label htmlFor="description">Score</Label>
                                    <Input></Input>
                                    </div>
                                </CardContent>
                                <CardFooter className="justify-between space-x-2">
                                    <Button variant="ghost">Cancel</Button>
                                    <Button>Submit</Button>
                                </CardFooter>
                            </Card>
                        </div>
                        <div className="col-span-2">
                            <DataTable columns={columnsToResults} data={[{
                            names: "Andres Alizo",
                            condition: "Victory",
                            against: "Angel Maxwell",
                            score: "6|2"
                        }]} />
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
                    <TableCaption>Players of FVP.</TableCaption>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="font-bold">Athlete</TableHead>
                        <TableHead className="font-bold">Nationality</TableHead>
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
                                            <DropdownMenuItem onClick={() => router.push(`/players/${athlete.id}`)}>View</DropdownMenuItem>
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