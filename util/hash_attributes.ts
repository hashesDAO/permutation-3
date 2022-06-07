import { getBinaryTreeData } from './binaryTreeBranch';

export const HASH_ATTRIBUTES: Attribute[] = [
    {
        descriptionShort: "Leading 0's",
        description: "Length of the streak of 0's at the start of the binary number representation.",
        regex: /^0+(?!$)/,
    },
    {
        descriptionShort: "Leading 1's",
        description: "Length of the streak of 1's at the start of the binary number representation.",
        regex: /^1+(?!$)/,
    },
    {
        descriptionShort: "Trailing 0's",
        description: "Length of the streak of 0's at the end of the binary number representation.",
        regex: /0+$/,
    },
    {
        descriptionShort: "Trailing 1's",
        description: "Length of the streak of 1's at the end of the binary number representation.",
        regex: /1+$/,
    },
    {
        descriptionShort: "Longest Streak of 0's",
        description: "Length of the the longest streak of 0's in the binary number representation.",
        regex: /(0+)(?!.*\1)/
    },
    {
        descriptionShort: "Longest Streak of 1's",
        description: "Length of the the longest streak of 1's in the binary number representation.",
        regex: /(1+)(?!.*\1)/
    },
    {
        name: "MaxDriftFromCenter",
        descriptionShort: "Max drift from center",
        description: "The furthest distance (either left or right) traveled from the center of the binary tree branch.",
        calculationFunction: (hash) => {
            const binaryTreeData = getBinaryTreeData(hash);
            return binaryTreeData?.maxDrift;
        },
    },
];
