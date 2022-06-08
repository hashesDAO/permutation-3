interface BinaryTreeData {
  points: Array<[number, number]>;
  maxDrift: number;
}

interface Attribute {
  name?: 'MaxDriftFromCenter';
  regex?: RegExp;
  descriptionShort: string;
  description: string;
  calculationFunction?: (string) => any;
}

type BinaryAttribute = { trait_type: string, value: number };