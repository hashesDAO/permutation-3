import { hex2bin } from './index';

const PIXELS_PER_EDGE = 2;

export function getBinaryTreeData(hash: string | null): BinaryTreeData | null {
    if (!hash) {
        return null;
    }
    const binaryData = hex2bin(hash);
    const numberOfPoints = binaryData.length;
    const points = binaryData.split('').reduce(
        (prev, curr) => {
            const [x, y] = prev[prev.length - 1];
            const newX = curr === '0' ? x - PIXELS_PER_EDGE : x + PIXELS_PER_EDGE;
            return prev.concat([[newX, y + PIXELS_PER_EDGE]]);
        },
        [[numberOfPoints, 0]] as Array<[number, number]>,
    );

    const xCoords = points.map((coord) => coord[0]);
    const minXCoord = Math.min(...xCoords);
    const maxXCoord = Math.max(...xCoords);
    const maxDrift = Math.max(numberOfPoints - minXCoord, maxXCoord - numberOfPoints) / PIXELS_PER_EDGE;

    return {
        points: points,
        maxDrift: maxDrift,
    };
}
