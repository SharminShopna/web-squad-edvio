import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FaHeadSideVirus } from 'react-icons/fa'
export default function CourseContent({content}) {
  return (
    <div className="border-[1px] border-LightTeal p-10 rounded-lg bg-gray-50 mb-8">
        <h2 className="text-2xl font-bold text-TealGreen mb-6 flex items-center">
          <FaHeadSideVirus  className="text-xl text-TealGreen mr-2" />Course Curriculum
        </h2>
        <div>
          {
          content?.map((item,index) =>
         <Accordion key={index}  type="single" collapsible>
            <AccordionItem value="item-1">
          <AccordionTrigger>{item?.title}</AccordionTrigger>
         <AccordionContent>
          <ul >
            {
              item?.topics?.map((topic,index)=><li key={index} className="list-disc mb-2 text-gray-700">{topic}</li>)
            }
          </ul>
         </AccordionContent>
        </AccordionItem>
        </Accordion>
            )
          }
      

        </div>
      </div>
  )
}
