"use client"

import React,{useEffect,useState} from 'react'
import {usePathname,useRouter} from 'next/navigation'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import {Apply,checkEligibility} from "@/lib/actions"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {useFormState} from 'react-dom'
import { UserButton } from "@clerk/nextjs";
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";



const Page = (data,model) => {
  const [date, setDate] = React.useState(new Date())
  const [rules, setRules] = React.useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const [formState,action]=useFormState(Apply,{ans:""})
  const passed = data.length > 0 ? data?.filter((d) => d.result == "passed") : null
  const failed = data.length > 0 ? data?.filter((d) => d.result == "failed") : null
  
  if (formState.messsage){
    console.log("hi there")
    toast({
      title: "Response",
      description: formState.message,
    })
  }
  return (
    <div className=''>
      <header className='flex p-4 shadow-sm items-center justify-between'>
        <div>
          <p className='font-bold text-lg'>RBS</p>
        </div>
        <div>
          <UserButton/>
        </div>
      </header>
      <div className='flex flex-col items-center justify-center pt-20 h-[90vh]'>
        <section className=' flex items-center gap-4 pt-4'>
            {rules ? 
            <section className=' w-[400px] h-fit pt-8'>
            <Card className='w-full border-2   mt-20 p-4 rounded-sm text-sm'>
                <CardHeader>
                    <CardTitle>Edit rules</CardTitle>
                </CardHeader>
                <CardContent className='grid grid-cols-2 gap-4'>
                    <div>
                        <p>Minimum age</p>
                        <Input
                        placeholder={model.minAge}
                        />
                    </div>
                    <div>
                        <p>Maximum age</p>
                        <Input
                        placeholder={model.maxAge}
                        />
                    </div>
                    <div>
                        <p>Nationality</p>
                        <Input
                        placeholder={model.minAge}
                        />
                    </div>
                    <div>
                        <p>Grades</p>
                        <Input
                        placeholder={model.minAge}
                        />
                    </div>
                    <div>
                        <p>Religion</p>
                        <Input
                        placeholder={model.minAge}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button>Edit Rules</Button>
                </CardFooter>
            </Card>
            </section>
            :
            <section className='border-2 mt-20 p-4 rounded-sm flex flex-col items-start gap-2 text-slate-900 w-[400px]'>
                <h2 className=' text-lg font-semibold underline underline-offset-3'>Applicants records</h2>
                {data.length > 1 && (
                    <>
                        <div className='w-full grid gap-2 divide-y-2'>
                        {data.map((d,i) => {
                            const {name,status } = d
                            return(
                            <div className='flex items-center justify-between w-full' key={i}>
                                <div className=''>
                                <p className='text-[16px] font-semibold'>
                                    {name}
                                </p>
                                </div>
                                <div className={`p-1 rounded-full ${status == 'passed' ? 'bg-green-800' : 'bg-red-800'}`} ></div>
                            </div>
                            )
                        })}
                        </div>
                        <div className='flex items-center gap-2 text-sm font-semibold'>
                        <p>{passed} <span className='text-green-800'>passed</span></p>
                        <p>{failed} <span className='text-red-800'>passed</span></p>
                        </div>
                    </>
                )}
                {data.length < 1 && (<h1> No records so far</h1>)}
            </section>
            }
        
        </section>
       
      


      <div className='fixed bottom-0 left-10 flex items-center w-[400px] justify-between font-semibold text-white'>
        <div className='flex items-center gap-3'>
            <Switch
            onCheckedChange={() => {  
                router.push('/admin')
            }}
            />
            <p>Switch to User</p>
        </div>
        <div>
            <Button onClick={() => setRules((prev) => !prev)}>{rules ? 'Hide rules': "View rules"}</Button>
        </div>
      </div>
      </div>
      
      
    
    </div>
  )
}

export default Page