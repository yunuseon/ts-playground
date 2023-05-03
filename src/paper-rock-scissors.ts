type Rock = '🪨';
type Paper = '📄';
type Scissors = '✂️';

type Move = Rock | Paper | Scissors;

type PlayerOne = '😎';
type PlayerTwo = '💩';

type WhoWins<PlayerOneMove extends Move, PlayerTwoMove extends Move> = 
    PlayerOneMove extends PlayerTwoMove ? 
        'draw' : 
        PlayerOneMove extends Rock ?
            PlayerTwoMove extends Paper ? 
                PlayerTwo :
                PlayerOne
            :
        PlayerOneMove extends Paper ?
            PlayerTwoMove extends Scissors ? 
                PlayerTwo :
                PlayerOne 
        : never;
        

type Winner = WhoWins<Scissors, Scissors>;
            
         

        
        
