"use client"

import React,{useEffect,useState} from 'react'
import {usePathname,useRouter} from 'next/navigation'
import { Switch } from "@/components/ui/switch"
import {Apply,checkEligibility} from "@/lib/actions"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {useFormState} from 'react-dom'
import { UserButton } from "@clerk/nextjs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import { Calendar } from "@/components/ui/calendar"
import {CalendarIcon} from 'lucide-react'



const Page = () => {
  const [date, setDate] = React.useState(new Date())
  const router = useRouter()
  const { toast } = useToast()
  const [formState,action]=useFormState(Apply,{ans:""})
  

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
      <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        <section className=' flex items-center mt-8'>
          <form 
          className='bg-white text-slate-900 font-semibold rounded-sm shadow-lg p-4 grid gap-4 w-[450px]'
          action={checkEligibility}>
            <h2 className='font-bold text-3xl'>Apply for scholarship</h2>
            <div className='w-full grid gap-4 my-3'>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
              
              <Input
              placeholder='Nationality'
              name='nationality'
              />
              <Input
              placeholder='Family Income'
              name='income'
              />
              <Select name='grade'>
                <SelectTrigger className="">
                  <SelectValue placeholder="Grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">A</SelectItem>
                  <SelectItem value="B">B</SelectItem>
                  <SelectItem value="C">C</SelectItem>
                  <SelectItem value="D">D</SelectItem>
                  <SelectItem value="E">E</SelectItem>
                </SelectContent>
              </Select>

              {/* <Input
              placeholder='Sports'
              name='sports'
              />
              <Input
              placeholder='Clubs'
              name='clubs'
              /> */}
              <Select
              name='religion'
              >
                <SelectTrigger className="">
                  <SelectValue placeholder="Religion" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Christian">Christian</SelectItem>
                  <SelectItem value="Muslim">Islam</SelectItem>
                  <SelectItem value="Aethist">Aethist</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button>Submit</Button>
          </form>
        </section>
       
      </motion.h1>
      <div className='fixed -bottom-40 -left-10 flex items-center gap-3 font-semibold text-white'>
        <Switch
          onCheckedChange={() => {  
            router.push('/admin')
          }}
        />
        <p>Switch to Admin</p>
      </div>
    </LampContainer>
    </div>
  )
}

export default Page