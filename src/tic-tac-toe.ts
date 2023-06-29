type GetBoardValues<T extends string> = 
    T extends `${infer Head}${infer Tail}` ? 
        (Head extends BoardValue ? [Head, ...GetBoardValues<Tail>] : GetBoardValues<Tail>) :
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
type PlayerSymbol = X | O;
type BoardValue = PlayerSymbol | '-';

type Combination = [number, number, number];

type WinningCombinationIndices = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],    
];

type BoardValues = GetBoardValues<Board>;

type Index = [0, 1, 2, 3, 4, 5, 6, 7, 8];

type _GetBoardValueIndices<
        Player extends BoardValue, 
        Values extends BoardValue[], 
        CurrentIndex extends List<number>
    > = 
    Length<Values> extends 0 
        ? [] 
        : [
            Head<Values> extends Player ? Head<CurrentIndex> : -1, 
            ..._GetBoardValueIndices<Player, Tail<Values>, Tail<CurrentIndex>>
          ];

type GetBoardValueIndices<Player extends BoardValue> = _GetBoardValueIndices<Player, BoardValues, Index>;




type GetSingleCombination<
        BoardIndices extends List<number>, 
        C extends Combination
    > = [
    BoardIndices[C[0]],
    BoardIndices[C[1]],
    BoardIndices[C[2]]
];

type GetAllCombinations<Search extends PlayerSymbol> = 
    _GetAllCombinations<GetBoardValueIndices<Search>, WinningCombinationIndices>;

type _GetAllCombinations<
    BoardIndices extends List<number>, 
    Combinations extends List<Combination>
    > = 
    Length<Combinations> extends 0 
        ? [] 
        : [
            GetSingleCombination<BoardIndices, Head<Combinations>>, 
            ..._GetAllCombinations<BoardIndices, Tail<Combinations>> 
        ];





type IsCombinationValid<Combination extends [number, number, number]> = 
    Combination[0] extends -1 
        ? false 
        : Combination[1] extends -1 
            ? false 
            : Combination[2] extends -1 
                ? false 
                : true; 

type IsWinning<Search extends PlayerSymbol> = _IsWinning<GetAllCombinations<Search>>

type _IsWinning<BoardCombinations extends List<Combination>> = 
    Length<BoardCombinations> extends 0 ? 
        false :
        IsCombinationValid<Head<BoardCombinations>> extends true ? 
            true : 
            _IsWinning<Tail<BoardCombinations>>;


type _Winner = 
    (IsWinning<X> extends true 
        ? X 
        : never
    ) | 
    (IsWinning<O> extends true 
        ? O 
        : never
    );

type Winner = _Winner extends never 
                ? 'draw!' 
                : `${_Winner} wins!`;