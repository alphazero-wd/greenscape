"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Label,
} from "@/features/ui";

export const CollapsibleDesc = ({ desc }: { desc: string }) => {
  return (
    <div className="mt-6">
      <Accordion type="single" collapsible>
        <AccordionItem value="desc">
          <AccordionTrigger>
            <Label>About this product</Label>
          </AccordionTrigger>
          <AccordionContent>
            <p
              className={
                "h-full whitespace-pre-wrap text-sm leading-[1.7142857] text-gray-500"
              }
            >
              {desc}
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
