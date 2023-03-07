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

type Cast<A1 extends any, A2 extends any> =
    A1 extends A2
      ? A1
      : A2;

type _ConstructList<AccList extends List<null>, DesiredLength extends number> = 
    Length<AccList> extends DesiredLength ? AccList : _ConstructList<[...AccList, null], DesiredLength>;


type ConstructList<DesiredLength extends number> = 
    number extends DesiredLength 
        ? never 
        : DesiredLength extends 0 
            ? [] 
            : `${DesiredLength}` extends `-${string}` 
                ? never 
                : _ConstructList<[null], DesiredLength>; 




                
type AddPositives<A extends number, B extends number> = Length<[...ConstructList<A>, ...ConstructList<B>]>;



type _SubtractPositives<LA extends List, LB extends List> = 
    Length<LA> extends Length<LB> 
        ? 0 
        : Length<LA> extends 0 
            ? `-${Length<LB>}` extends `${infer Result extends number }` 
                ? Result
                : never
            : Length<LB> extends 0 
                ? Length<LA> 
                : _SubtractPositives<Tail<LA>, Tail<LB>>;

type SubtractPositives<A extends number, B extends number> = _SubtractPositives<ConstructList<A>, ConstructList<B>>;

type StringToNumber<S extends string> = S extends `${infer Result extends number}` ? Result : never;

type isNegative<N extends number> = 
    `${N}` extends `-${number}` 
        ? true 
        : false;

type Abs<N extends number> = 
    isNegative<N> extends true 
    ? `${N}` extends `-${infer Result extends number }`
        ? Result
        : never
    : N;


    

type Add<A extends number, B extends number> = 
    isNegative<A> extends true 
        ? isNegative<B> extends true 
            ? StringToNumber<`-${Cast<AddPositives<Abs<A>, Abs<B>>, number>}`>
            : SubtractPositives<B, Abs<A>>
        : isNegative<B> extends true 
            ? SubtractPositives<A, Abs<B>>
            : AddPositives<A, B>;

