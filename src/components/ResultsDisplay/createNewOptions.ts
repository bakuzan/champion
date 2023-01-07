export enum CreateTypeOption {
  BracketTemplate,
  Tournament
}

export const typeOptions = [
  {
    id: 'createBracket',
    name: 'createType',
    label: 'Bracket Template',
    value: CreateTypeOption.BracketTemplate
  },
  {
    id: 'createTournament',
    name: 'createType',
    label: 'Tournament',
    value: CreateTypeOption.Tournament
  }
];

export enum CreateSeedOrderOption {
  Initial,
  Results
}

export const seedOptions = [
  {
    id: 'initialSeed',
    name: 'createSeedOrder',
    label: 'Initial Order',
    value: CreateSeedOrderOption.Initial
  },
  {
    id: 'resultsSeed',
    name: 'createSeedOrder',
    label: 'Results Order',
    value: CreateSeedOrderOption.Results
  }
];
