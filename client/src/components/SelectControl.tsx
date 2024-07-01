import { Select } from "@radix-ui/themes";
import type { FC, ReactNode } from "react";
import { FormControl } from "./FormControl";

export interface SelectControlProps {
	label?: ReactNode;
	value?: string;
	initialValue?: string;
	options: SelectOption[] | Array<number | string>;
	onChange: (value: string) => void;
	className?: string;
}

export interface SelectOption {
	value: string;
	label?: ReactNode;
}

export const SelectControl: FC<SelectControlProps> = ({
	label,
	value,
	initialValue,
	options,
	onChange,
	className,
}) => {
	return (
		<FormControl label={label} className={className}>
			<Select.Root
				value={value}
				defaultValue={initialValue}
				size="2"
				onValueChange={onChange}
			>
				<Select.Trigger value={value} />
				<Select.Content>
					{options.map((option) => {
						const { value, label = value }: SelectOption =
							typeof option === "object" ? option : { value: `${option}` };

						return (
							<Select.Item key={value} value={value}>
								{label}
							</Select.Item>
						);
					})}
				</Select.Content>
			</Select.Root>
		</FormControl>
	);
};
