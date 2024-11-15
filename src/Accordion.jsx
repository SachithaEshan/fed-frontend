import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

function CustomAccordion(props){

    return(
        <div>
      <Accordion type="single" collapsible className="relative  px-4 flex gap-x-4">
  <AccordionItem value="item-1" className=" border-3 px-7 w-96 border-2 bg-black text-white">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
     {props.accordionOne}
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-2" className=" border-3 px-7 w-96 border-2  bg-black text-white">
        <AccordionTrigger className="gap-x-14">Is it styled?</AccordionTrigger>
        <AccordionContent>
        {props.accordion2}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3" className=" border-3 px-7 w-96 border-2  bg-black text-white">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
        {props.accordion3}
        </AccordionContent>
      </AccordionItem>
</Accordion>
</div>
    );
}

export default CustomAccordion;