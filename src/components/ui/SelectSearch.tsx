"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

 interface SelectSearchProps
  {
    value: string,
    label: string,
  }
export function SelectSearch({SelectSearchData,title,size} : {SelectSearchData: SelectSearchProps[],title:string,size : "sm" | "md"}) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen} >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(" justify-between text-xs",size === 'sm' ? "w-[100px]" : "w-[220px]")}
        >
          {value
            ? SelectSearchData.find((data) => data.value === value)?.label
            : title}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn(" p-0", size === 'sm' ? "w-[100px]" : "w-[220px]")} >
        <Command className="text-xs">
          <CommandInput placeholder="Search Here..." className="h-9 text-xs" />
          <CommandList>
            <CommandEmpty>Not found.</CommandEmpty>
            <CommandGroup>
              {SelectSearchData.map((item) => (
                <CommandItem
                className="text-xs"
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {item.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
