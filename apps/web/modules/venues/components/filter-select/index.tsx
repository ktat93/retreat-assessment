import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { FormControl } from "@workspace/ui/components/form";
import {
  FILTER_SELECT_ALL_VALUE,
  FILTER_SELECT_SIZE_CLASSES,
} from "../../constants";
import type { FilterOption, FilterSelectSize } from "../../types";

type FilterSelectProps = {
  value: string | number | undefined;
  onChangeAction: (value: string | number | undefined) => void;
  options: FilterOption[];
  placeholder: string;
  allLabel: string;
  size?: FilterSelectSize;
};

export function FilterSelect({
  value,
  onChangeAction,
  options,
  placeholder,
  allLabel,
  size = "md",
}: FilterSelectProps) {
  const handleChange = (selectedValue: string) => {
    if (selectedValue === FILTER_SELECT_ALL_VALUE) {
      onChangeAction(undefined);
      return;
    }

    const option = options.find((opt) => opt.value.toString() === selectedValue);
    onChangeAction(option?.value);
  };

  return (
    <Select
      onValueChange={handleChange}
      value={value?.toString() ?? FILTER_SELECT_ALL_VALUE}
    >
      <FormControl>
        <SelectTrigger className={FILTER_SELECT_SIZE_CLASSES[size]}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value={FILTER_SELECT_ALL_VALUE}>{allLabel}</SelectItem>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value.toString()}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

