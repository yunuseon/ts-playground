type GetBoardValues<T extends string> = 
    T extends `${infer S}${infer Ux}` ? 
        (S extends BoardValue ? [S, ...GetBoardValues<Ux>] : GetBoardValues<Ux>) :
        [];

type List<T = any> = ReadonlyArray<T>;

type Length<List extends ReadonlyArray<any>> = List['length'];

type Head<L extends List> = Length<L> extends 0 ? 
    never : 
    L[0];

type Tail<L extends List> =
    L extends readonly []
    ? L
    : L extends readonly [any?, ...infer LTail]
      ? LTail
      : L

type Board = `
     |     |     
  X  |  O  |  X  
_____|_____|_____
     |     |     
  -  |  X  |  O  
_____|_____|_____
     |     |     
  O  |  -  |  X  
     |     |     
`;

type X = 'X';
type O = 'O';
type Player = X | O;
type BoardValue = Player | '-';
type BoardValues = GetBoardValues<Board>;
type Combination = [number, number, number];
type Index = [0, 1, 2, 3, 4, 5, 6, 7, 8];

type WinningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [2, 4, 8],
    [2, 4, 6],    
];


type SearchSetIndices<Search extends BoardValue> = _SearchSetIndices<Search, BoardValues, Index>;

type _SearchSetIndices<Search extends BoardValue, Values extends BoardValue[], CurrentIndex extends List<number>> = 
    Length<Values> extends 0 ? 
        [] :
        Head<Values> extends Search ? 
            [Head<CurrentIndex>, ..._SearchSetIndices<Search, Tail<Values>, Tail<CurrentIndex>>] : 
            [-1, ..._SearchSetIndices<Search, Tail<Values>, Tail<CurrentIndex>>]

type MapSingleCombination<SearchIndices extends List<number>, C extends Combination> = [
    SearchIndices[C[0]],
    SearchIndices[C[1]],
    SearchIndices[C[2]]
];

type MapAllCombinations<Search extends Player> = _MapAllCombinations<SearchSetIndices<Search>, WinningCombinations>;

type _MapAllCombinations<SearchIndices extends List<number>, Combinations extends List<Combination>> = 
    Length<Combinations> extends 0 ? 
        [] :
        [MapSingleCombination<SearchIndices, Head<Combinations>>, ..._MapAllCombinations<SearchIndices, Tail<Combinations>> ];

type IsCombinationValid<Combination extends [number, number, number]> = 
    Combination extends [infer A, infer B, infer C] ?
        A extends -1 ? false :
        B extends -1 ? false :
        C extends -1 ? false : 
        true : 
    false; 

type IsWinning<Search extends Player> = _IsWinning<MapAllCombinations<Search>>

type _IsWinning<MappedCombinations extends List<Combination>> = 
    Length<MappedCombinations> extends 0 ? 
        false :
        IsCombinationValid<Head<MappedCombinations>> extends true ? 
            true : 
            _IsWinning<Tail<MappedCombinations>>;


type _Winner = (IsWinning<X> extends true ? X : never) | (IsWinning<O> extends true ? O : never);

type Winner = _Winner extends never ? 
                'draw!' : 
                Player extends _Winner ? 
                    'invalid' :
                    `${_Winner} wins!`;
