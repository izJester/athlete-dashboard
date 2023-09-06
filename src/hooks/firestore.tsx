import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebase.config";
import { Athlete } from "@/app/interfaces";

const useFirestore = () => {
    const athletesRef = collection(db , 'athletes');
    const recordsRef = collection(db , 'records');

    const searchByIndex = async (toSearch: string) => {
        let result;
        const q = query(athletesRef , where("carnetId", "==" , toSearch));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => {
            result = doc
        })

        return result;
    }

    const assignBracelet = async ({ setOpen , ...props  }: any) => {
        const ref = doc(athletesRef, props.id);
        await updateDoc(ref, {
            carnetId: props.bracelet,
        });
    }

    const getAthlete = ({ setPlayer , ...props }: any) => {
        onSnapshot(doc(athletesRef, props.id), (doc) => {
            setPlayer(doc.data())
        });
    }

    const getAthletes = ({ setAthletes , setLoading ,  toast }: any) => {
        const q = query(athletesRef);
        onSnapshot(q, (querySnapshot) => {
            const newAthletes: Athlete[] = [];
            querySnapshot.forEach((doc) => {
                newAthletes.push({ id: doc.id, data: doc.data() });
            });
            setAthletes(newAthletes);
            setLoading(false); // Data loaded successfully
        }, (err) => {
            toast({
                variant: 'destructive',
                description: "Error fetching data"
            })
        });
    }

    const getRecords = ({ setRecords , toast }: any) => {
        const q = query(recordsRef)
        onSnapshot(q , (querySnapshot) => {
            const records: any = [];
            querySnapshot.forEach(doc => {
                records.push(doc.data())
            });
            setRecords(records)
        } , (err) => {
            toast({
                variant: 'destructive',
                description: 'Error fetching data'
            })
        })
    }

    const addRecord = async ({setLoading , form , toast}: any) => {
        setLoading(true)
        try {
            await addDoc(collection(db, "records"), {
                ...form
             });

            setLoading(false)
            toast({
                description: "Se registró correctamente"
            })

        } catch (error) {
            setLoading(false)
            toast({
                variant: 'destructive',
                description: "Error"
            })
        }
    }

    const deleteAthlete = async ({ toast , ...props }: any) => {
        try {
            await deleteDoc(doc(athletesRef , props.id));
        } catch (error) {
            toast({
                variant: "destructive",
                description: "Error",
              })
        }
    }



    return {
        searchByIndex,
        assignBracelet,
        getAthlete,
        getAthletes,
        getRecords,
        deleteAthlete,
        addRecord
    };
}
 
export default useFirestore;