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

type Combination = [number, number, number];

type WinningCombinationIndices = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];

type GetBoardValues<$Board extends string> = 
    $Board extends `${infer FirstChar}${infer TailString}` 
        ? FirstChar extends BoardValue 
            ? [FirstChar, ...GetBoardValues<TailString>] 
            : GetBoardValues<TailString>
        : [];

type BoardValues = GetBoardValues<Board>;

type GetBoardValuesForCombination<$Combination extends Combination> = 
    BoardValues[$Combination[0]] |
    BoardValues[$Combination[1]] |
    BoardValues[$Combination[2]];
    
type _WhoIsWinning<$Combinations extends List<Combination>> = 
    Length<$Combinations> extends 0 
        ? never
        : GetBoardValuesForCombination<Head<$Combinations>> extends X 
            ? X
            : GetBoardValuesForCombination<Head<$Combinations>> extends O 
                ? O 
                : _WhoIsWinning<Tail<$Combinations>>;

type WhoIsWinning = _WhoIsWinning<WinningCombinationIndices>;

type Winner = WhoIsWinning extends never 
                ? 'draw!' 
                : `${WhoIsWinning} wins!`;