interface BinaryTreeData {
  points: Array<[number, number]>;
  maxDrift: number;
}

type HighlightFunction = (string) => Chunk[];

interface ActiveStat {
  name?: 'BinaryTreeBranch' | 'MaxDriftFromCenter';
  regex?: RegExp;
  description: string;
  highlightFunction?: HighlightFunction;
}

interface Attribute {
  name?: 'MaxDriftFromCenter';
  regex?: RegExp;
  descriptionShort: string;
  description: string;
  calculationFunction?: (string) => any;
  highlightFunction?: HighlightFunction;
}

interface CollectionContentOverrides {
  name?: string;
  description?: string;
  eligibilityCriteria?: string;
  coverPhoto?: string;
  bannerPhoto?: string;
  openSeaCollectionName?: string;
  totalSupply?: number;
}
