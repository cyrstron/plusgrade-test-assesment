import {} from "@stylexjs/shared";
import { type create, props } from "@stylexjs/stylex";

type SXStyle = ReturnType<typeof create>[string];

export function sx(
	...args: Array<SXStyle | null | undefined | false | string>
) {
	const { className, ...rest } = props(
		...args.filter(
			(value): value is SXStyle | null | undefined | false =>
				typeof value !== "string",
		),
	);

	return {
		className: `${className} ${args
			.filter((value): value is string => typeof value === "string")
			.join(" ")}`,
		...rest,
	};
}
