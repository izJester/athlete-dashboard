import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import useFirestore from "@/hooks/firestore";
import { Circle } from "lucide-react";
import { useState } from "react";

const RegisterRecords = () => {
    const [loading, setLoading] = useState(false);
    const { addRecord  } = useFirestore()
    const { toast } = useToast()
    const [ form , setForm ] = useState<any>({ team1: {} , team2: {}, condition: 'victory' , score: '' })

    return <>
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
                    <Label htmlFor="description">Equipo 1</Label>
                    <Input required onChange={e => {
                        let updated = {...form , team1: { ...form.team1  , first: e.target.value }}
                        setForm(updated)
                    }} />
                    <Input required onChange={e => {
                        let updated = {...form , team1: { ...form.team1  , second: e.target.value }}
                        setForm(updated)
                    }} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="security-level">Equipo 2</Label>
                    <Input required onChange={e => {
                        let updated = {...form , team2: { ...form.team2  , first: e.target.value }}
                        setForm(updated)
                    }}></Input>
                    <Input required onChange={e => {
                        let updated = {...form , team2: { ...form.team2  , second: e.target.value }}
                        setForm(updated)
                    }}></Input>
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
                <Button onClick={ () => addRecord({setLoading , form , toast})} disabled={loading}>
                {loading && (
                    <Circle className="mr-2 h-4 w-4 animate-spin" />
                )}
                    Registrar
                </Button>
            </CardFooter>
        </Card>
    </>;
}
 
export default RegisterRecords;