import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { FormControl } from "@workspace/ui/components/form";

const ALL_VALUE = "all";

type SelectOption = {
  value: string | number;
  label: string;
};

type FilterSelectSize = "sm" | "md" | "lg";

type FilterSelectProps = {
  value: string | number | undefined;
  onChange: (value: string | number | undefined) => void;
  options: SelectOption[];
  placeholder: string;
  allLabel: string;
  size?: FilterSelectSize;
};

const SIZE_CLASSES: Record<FilterSelectSize, string> = {
  sm: "w-[120px]",
  md: "w-[140px]",
  lg: "w-[160px]",
};

export function FilterSelect({
  value,
  onChange,
  options,
  placeholder,
  allLabel,
  size = "md",
}: FilterSelectProps) {
  const handleChange = (selectedValue: string) => {
    if (selectedValue === ALL_VALUE) {
      onChange(undefined);
      return;
    }

    const option = options.find((opt) => opt.value.toString() === selectedValue);
    onChange(option?.value);
  };

  return (
    <Select onValueChange={handleChange} value={value?.toString() ?? ALL_VALUE}>
      <FormControl>
        <SelectTrigger className={SIZE_CLASSES[size]}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value={ALL_VALUE}>{allLabel}</SelectItem>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value.toString()}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export type { SelectOption, FilterSelectSize };
