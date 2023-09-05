"use client"

import { collection, onSnapshot, query } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { db } from "../../../firebase.config";

const RealtimeGame = () => {
    const setsPlayer1 = [6, 3, 7];
    const setsPlayer2 = [4, 6, 5];
    const isPlayer1Serving = true;
    const isPlayer2Serving = false;
    const scorePlayer1 = 30;
    const scorePlayer2 = 15;
    const [ score , setScore ] = useState<any>()

    useEffect(() => {
      const q = query(collection(db , "scores"))
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            setScore(doc.data())
        });
    }, (err) => {
        
    });
    
      return () => {
        unsubscribe();
      }
    }, [])
    
    console.log('score', score)
  
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="w-96 bg-blue-900 p-6 rounded-lg shadow-md text-white">
            <div className="flex justify-center p-2 mb-4">
                <Image src="/logow.svg" height={120} width={120} alt="Logo" />
            </div>
          <div className="">
            <table className="w-full">
              <tbody>
                <tr>
                    <td className=" text-2xl font-bold">
                        <div className="flex items-center space-x-2">
                        <div className={`w-4 h-4 rounded-full ${isPlayer2Serving ? 'bg-green-500' : 'bg-gray-100'}`}></div>
                            <ReactCountryFlag
                                countryCode='PA'
                                svg
                                style={{
                                    width: '1em',
                                    height: '1em',
                                }}
                                title="US"
                            />
                            <span>Angel Maxwell</span>
                        </div>
                    </td>
                    <td className=" text-2xl font-bold">1</td>
                    <td className=" text-2xl font-bold">2</td>
                    <td className=" text-2xl font-bold">0</td>
                </tr>
                <tr>
                    <td className=" text-2xl font-bold">
                    <div className="flex items-center space-x-2">
                        <div className={`w-4 h-4 rounded-full ${isPlayer1Serving ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                            <ReactCountryFlag
                                countryCode='VE'
                                svg
                                style={{
                                    width: '1em',
                                    height: '1em',
                                }}
                                title="US"
                            />
                            <span>Andres Alizo</span>
                        </div>
                    </td>
                    <td className=" text-2xl font-bold">6</td>
                    <td className=" text-2xl font-bold">6</td>
                    <td className=" text-2xl font-bold">0</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-6">
            <div className="text-center border p-2">
              <div className="text-4xl font-semibold mb-2">{ score?.current.home }</div>
            </div>
            <div className="text-4xl mx-6">-</div>
            <div className="text-center border p-2">
              <div className="text-4xl font-semibold  mb-2">{ score?.current.visitors }</div>
            </div>
          </div>
          <div className="mt-6 space-y-2">
            <div className="text-center text-sm">
                Sponsored by
            </div>
            <div className="bg-gray-200 p-4 rounded-lg text-center text-gray-950">
              <p>Área de Publicidad</p>
            </div>
          </div>
        </div>
      </div>
    );
}
 
export default RealtimeGame;