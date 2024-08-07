import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type optionSelect = {
  id: string;
  value: string;
  title: string;
};
export type InputSelectProps = {
  placeholder: string;
  name: string;
  value: string;
  optionList: optionSelect[];
  onChange: (value: string) => void;
  required?: boolean;
};
export function InputSelect({
  placeholder,
  optionList,
  value,
  onChange,
  name,
  required,
}: InputSelectProps) {
  return (
    <Select
      name={name}
      value={value}
      onValueChange={onChange}
      required={required}
    >
      <SelectTrigger
        id={name}
        className={`w-[180px] ${value === "P-1" ? "option-low" : value === "P-2" ? "option-medium" : value === "P-3" ? "option-high" : ""} ${value === "S-1" ? "option-todo" : value === "S-2" ? "option-doing" : value === "S-3" ? "option-done" : ""}`}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="">
        {optionList && optionList.length > 0 ? (
          optionList.map((option) => (
            <SelectGroup key={option.id}>
              <SelectItem
                className={`w-[180px] ${option.value === "P-1" ? "option-low" : option.value === "P-2" ? "option-medium" : option.value === "P-3" ? "option-high" : ""} ${option.value === "S-1" ? "option-todo" : option.value === "S-2" ? "option-doing" : option.value === "S-3" ? "option-done" : ""}`}
                value={option.value}
              >
                {option.title}
              </SelectItem>
            </SelectGroup>
          ))
        ) : (
          <SelectGroup>
            <SelectItem value="">No select data</SelectItem>
          </SelectGroup>
        )}
      </SelectContent>
    </Select>
  );
}
