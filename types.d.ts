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
