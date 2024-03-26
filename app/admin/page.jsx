import React from 'react'
import ResultsList from '@/components/resultsList'
import {Record,Model} from '@/lib/models'
import connectDB from '@/lib/connect'

const page = async () => {
  await connectDB()
  const data = await Record.find()
  const datamodel = await Model.findOne({name:1})
  const records = []
  for (let i = 0; i < data.length ; i++){
    records.push({
      name:data[i].name,
      results:data[i].results,
    })
  }
  const model = {
    minAge:datamodel.minage,
    maxAge:datamodel.maxage,
    grades:datamodel.grade,
    nationality:datamodel.nationality,
    religion:datamodel.religion,
  }
  return (
    <>
      <ResultsList data={records} model={model}/>
    </>
  )
}

export default page