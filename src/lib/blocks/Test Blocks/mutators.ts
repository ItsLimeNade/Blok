import { BlockShape, BlockType, WarningType } from "$lib/enums/BlockTypes";
import type { BlockDefinition } from "$lib/types/BlockDefinition";
import type { CategoryDefinition } from "$lib/types/CategoryDefinition";
import StatementInput from "$lib/utils/BlockGen/Inputs/StatementInput";
import ValueInput from "$lib/utils/BlockGen/Inputs/ValueInput";
import AssemblerMutator from "$lib/utils/BlockGen/Mutators/AssemblerMutator";
import Warning from "$lib/utils/BlockGen/Warnings/Warning";
import rgbToHex from "$lib/utils/helpers/rgbToHex";
import AssemblerMutatorV2 from "$lib/utils/BlockGen/Mutators/AssemblerMutatorV2";

const blocks: BlockDefinition[] = [
	{
		label: true,
		text: "All the mutator blocks will be displayed here!"
	},
	{
		id: "test_item",
		text: "list thing",
		shape: BlockShape.Action,
		inline: true,
		colour: rgbToHex(91, 128, 165),
		tooltip: "Returns the opposite of the input",
		helpUrl:
			"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT",
		code: () => {
			return "bob";
		},
		hidden: true
	},
	{
		id: "if_test",
		text: "else if",
		shape: BlockShape.Action,
		inline: true,
		colour: rgbToHex(91, 128, 165),
		tooltip: "Returns the opposite of the input",
		helpUrl:
			"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT",
		code: () => {
			return "bob";
		},

		hidden: true
	},
	{
		id: "else_test",
		text: "else",
		shape: BlockShape.Bottom,
		inline: true,
		colour: rgbToHex(91, 128, 165),
		tooltip: "Returns the opposite of the input",
		helpUrl:
			"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT",
		code: () => {
			return "bob";
		},
		hidden: true
	},
	{
		id: "not_mutator",
		text: "not {operand}",
		args: [new ValueInput("operand", BlockType.Boolean)],
		warnings: [new Warning(WarningType.Input, { fieldName: "operand" })],
		shape: BlockShape.Action,
		inline: true,
		colour: rgbToHex(91, 128, 165),
		tooltip: "Returns the opposite of the input",
		helpUrl:
			"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT",
		code: (args) => {
			return `!${args.operand}`;
		},
		mutator: new AssemblerMutator("Not content", [
			{
				block: "if_test",
				adds: [new ValueInput("elseIf", BlockType.Any)],
				once: true
			},
			{
				block: "else_test",
				adds: [new StatementInput("ifThing")],
				once: true
			}
		])
	},
	{
		id: "not_mutator_v2",
		text: "if {operand} {if}",
		args: [new ValueInput("operand", BlockType.Boolean), new StatementInput("if")],
		warnings: [new Warning(WarningType.Input, "operand")],
		shape: BlockShape.Action,
		inline: true,
		colour: rgbToHex(91, 128, 165),
		tooltip: "Returns the opposite of the input",
		helpUrl:
			"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT",
		code: (args) => {
			return `!${args.operand}`;
		},
		mutator: new AssemblerMutatorV2("If", [
			{
				block: "if_test",
				adds: [new ValueInput("if_input", BlockType.Boolean).setField("else if"), new StatementInput("bob2").setField("do")],
				once: true
			},
			{
				block: "else_test",
				adds: [new StatementInput("else_input").setField("else")],
				once: true
			}
		])
	}
];

const category: CategoryDefinition = {
	name: "Mutators",
	colour: "#db5c53"
};

export default { blocks, category };
