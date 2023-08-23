import { ColorCircle } from "@/features/colors/circle";
import { Color } from "@/features/colors/types";
import { Size } from "@/features/sizes/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/features/ui";
import { CreateVariantDto } from "../utils";

interface ProductVariantProps {
  color?: Color;
  colorId: string;
  sizes: Size[];
  variants: CreateVariantDto[];
}

export const ProductVariant: React.FC<ProductVariantProps> = ({
  color,
  colorId,
  variants,
  sizes,
}) => {
  return (
    <Accordion collapsible type="single" key={colorId}>
      <AccordionItem value={"item-" + colorId}>
        <AccordionTrigger>
          <div className="flex max-w-fit gap-x-4 font-medium">
            {color?.name || "Default"}
            {+colorId > 0 && <ColorCircle color={color?.hexCode || ""} />}
          </div>
        </AccordionTrigger>
        {variants.map((variant) => (
          <AccordionContent key={variant.sizeId}>
            <ul>
              <li>
                Size: {sizes.find((size) => size.id === variant.sizeId)?.label}
              </li>
              <li>Price: {variant.price}</li>
              <li>In Stock: {variant.inStock}</li>
            </ul>
          </AccordionContent>
        ))}
      </AccordionItem>
    </Accordion>
  );
};
