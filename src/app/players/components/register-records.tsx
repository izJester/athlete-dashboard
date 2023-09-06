"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import useFirestore from "@/hooks/firestore";
import { Circle } from "lucide-react";
import { useState } from "react";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";

const formSchema = z.object({
    team1: z.string().array(),
    team2: z.string().array(),
    condition: z.string(),
    score: z.string(),
})

const RegisterRecords = () => {
    const [loading, setLoading] = useState(false);
    const { addRecord  } = useFirestore()
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            team1: ["" , ""],
            team2: ["" , ""],
            condition: '',
            score: ''
        },
      })

    function onSubmit(values: z.infer<typeof formSchema>) {
        addRecord({ setLoading , form: values , toast })
    }

    return <>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
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
                                <FormField
                                    control={form.control}
                                    name={`team1.${0}`}
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormControl>
                                            <Input  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`team1.${1}`}
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormControl>
                                            <Input  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="security-level">Equipo 2</Label>
                                <FormField
                                    control={form.control}
                                    name={`team2.${0}`}
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormControl>
                                            <Input  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`team2.${1}`}
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormControl>
                                            <Input  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            </div>
                            <div className="grid gap-2">
                            <FormField
                                    control={form.control}
                                    name='condition'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Condición</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona una condición" />
                                                </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                <SelectItem value="victory">Victoria</SelectItem>
                                                <SelectItem value="defeat">Derrota</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            
                            </div>
                            <div className="grid gap-2">
                            <FormField
                                    control={form.control}
                                    name='score'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Puntuación</FormLabel>
                                            <Input { ...field }></Input>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                        
                    </CardContent>
                    <CardFooter className="justify-end space-x-2">
                        <Button disabled={loading}>
                        {loading && (
                            <Circle className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Registrar
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    </>;
}
 
export default RegisterRecords;