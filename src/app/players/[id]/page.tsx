'use client'

import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { db } from "../../../../firebase.config";
import MainLayout from "@/layouts/mainLayout";
import moment from "moment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Compass, Edit, Facebook, Twitter } from 'react-feather';
import { Instagram } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ViewPlayer = ({params} : any) => {
    const [playerData, setPlayer] = useState<any>();
    const [open, setOpen] = useState(false)

    const toBirthDate = useMemo(() => moment(playerData?.dob.toDate()).format("MMMM DD , YYYY"), [playerData])
    const toAgeInYears = useMemo(() => moment().diff(moment(playerData?.dob.toDate()) , 'years'), [playerData])

    const assignCode = async (id: string , bracelet: string) => {
        const atletesRef = doc(db, "atletes", id);
        await updateDoc(atletesRef, {
            carnetId: bracelet,
          });

        setOpen(false)
        
    }

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "atletes", params.id), (doc) => {
            setPlayer(doc.data())
        });
       return () => {
        unsub();
       }
    }, [])

    

    return ( <MainLayout>
        
        <div className="h-80 bg-center bg-cover relative" style={{ backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/padel-venezuela.appspot.com/o/defaults%2Fcancha-de-padel-tec-campus-laguna%20copy.jpg?alt=media&token=0357ca61-1d14-4341-847b-f79a90268420)` }}>
            <div className="flex items-center space-x-2 max-h-80">
                <img className="h-80 w-80" src={playerData?.portraitpicture} alt="" />
                <div className="flex flex-col">
                    <span className="font-semilbold text-2xl text-white uppercase mb-4">{playerData?.playingposition}</span>
                    <span className="font-bold text-4xl text-white uppercase">{playerData?.names}</span>
                    <span className="font-bold text-4xl text-white uppercase">{playerData?.lastnames}</span>

                </div>
            </div>

            <div className="absolute right-0 top-0 p-4">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger>
                    <Button>Assign / Update</Button>
                </DialogTrigger>
                <DialogContent>
                <div className='flex justify-center items-center'>
                    <div className='flex flex-col items-center space-y-4 '>
                        <Compass size={130} className='animate-spin text-gray-800 stroke-1'></Compass>
                        <span className='lg:text-2xl text-md text-gray-700 uppercase font-bold'> Waiting for bracelet scan... </span>
                        <Input className='border-transparent focus:bor text-white' autoFocus onChange={(e) => assignCode(params.id , e.target.value)}></Input>
                    </div>
                </div>
                </DialogContent>
            </Dialog>
            </div>

        </div>
        <div className="grid grid-cols-3 gap-4">
            <div className="row-span-2 col-span-3 lg:col-span-1">
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
                            {
                                playerData?.carnetId && <div>
                                    <span className="uppercase font-bold">Carnet number: </span>
                                    <span>{playerData?.carnetId}</span>
                                </div> 
                            }
                            
                        </div>
                    </CardContent>
                    <CardFooter>
                    <div className="container max-w-screen-lg mx-auto">
                        <div>
                        <h2 className="text-lg font-semibold text-center mb-6 text-gray-700">Social Media</h2>

                        <div className="flex flex-wrap justify-center gap-4">
                            {
                                playerData?.socialmedias?.facebook && <a href={playerData?.socialmedias.facebook} className="ease-in duration-300 hover:scale-125">
                                   <Facebook></Facebook> 
                                </a>
                            }
                            
                            {
                                playerData?.socialmedias?.twitter && <a href={playerData?.socialmedias.twitter} className="ease-in duration-300 hover:scale-125">
                                    <Twitter></Twitter>
                                </a>
                            }
                            {
                                playerData?.socialmedias?.twitter && <a href={playerData?.socialmedias.twitter} className="ease-in duration-300 hover:scale-125">
                                    <Instagram></Instagram>
                                </a>
                            }

                        </div>
                        
                        </div>
                    </div>
                    </CardFooter>
                </Card>
            </div>
            <div className="lg:col-span-2 col-span-3">
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
            <div className="lg:col-span-2 col-span-3">
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