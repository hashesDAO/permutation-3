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

export function getHashBase64EncodedSVG(tokenId: number, hash: string, isDeactivated: boolean): string {
    const borderColorString =
        tokenId >= 1000
            ? ''
            : isDeactivated
            ? 'stroke="black" stroke-width="10" filter="url(#f1)"'
            : 'stroke="red" stroke-width="10" filter="url(#f1)"';
    const svgHTML = `<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350"><defs><filter id="f1" x="0" y="0" height="100%" width="100%"><feGaussianBlur in="SourceGraphic" stdDeviation="8" /></filter></defs><style>.base { fill: black; font-family: courier; font-size: 8px; }</style><rect width="100%" height="100%" fill="white" ${borderColorString} /><text x="10" y="20" class="base">${hash}</text></svg>`;
    return Buffer.from(svgHTML).toString('base64');
}
