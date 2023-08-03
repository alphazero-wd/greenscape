"use client";

import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/features/ui";
import { cn } from "@/lib/utils";
import {
  CheckIcon,
  ChevronUpDownIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { StoreIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useCreateStoreModal } from "../create-store-modal";
import { Store } from "../types";

interface NavbarStoresProps {
  stores: Store[];
}

export function NavbarStores({ stores }: NavbarStoresProps) {
  const { onOpen } = useCreateStoreModal();
  const [open, setOpen] = useState(false);
  const { sid } = useParams();
  const [value, setValue] = useState(sid as string);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          <div className="flex items-center gap-x-3">
            <StoreIcon className="h-4 w-4 text-gray-500" />
            {value
              ? stores.find((store) => store.id.toString() === value)?.name
              : "Select store..."}
          </div>
          <ChevronUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search store..." />
            <CommandEmpty>No store found.</CommandEmpty>
            <CommandGroup heading="Stores">
              {stores.map((store) => (
                <CommandItem
                  key={store.id.toString()}
                  onSelect={(currentValue: React.SetStateAction<string>) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Link
                    className="flex w-full items-center justify-between"
                    href={`/store/${store.id}`}
                  >
                    <div className="flex items-center gap-x-3">
                      <StoreIcon className="h-4 w-4 text-gray-500" />
                      {store.name}
                    </div>
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === store.id.toString()
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                  </Link>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  onOpen();
                }}
              >
                <PlusCircleIcon className="mr-2 h-5 w-5 text-gray-700" />
                Create new store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
