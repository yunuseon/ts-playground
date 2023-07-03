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
    
type _IsWinning<
        $Player extends Player, 
        $Combinations extends List<Combination>
    > = 
        Length<$Combinations> extends 0
            ? false
            : GetBoardValuesForCombination<Head<$Combinations>> extends $Player
                ? true
                : _IsWinning<$Player, Tail<$Combinations>>;

type IsWinning<$Player extends Player> =
    _IsWinning<$Player, WinningCombinationIndices>;

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