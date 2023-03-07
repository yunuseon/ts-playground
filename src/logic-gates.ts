type BitOrder = [7, 6, 5, 4, 3, 2, 1, 0];

type Bit = 1 | 0;

type NAND<A extends Bit, B extends Bit> =
    A extends 0 ?
    (B extends 0 ? 1 : 1) :
    (B extends 0 ? 1 : 0);

type NOT<A extends Bit> = NAND<A, A>;

type AND<A extends Bit, B extends Bit> = NAND<NAND<A, B>, NAND<A, B>>;

type OR<A extends Bit, B extends Bit> = NAND<NAND<A, A>, NAND<B, B>>;

type NOR<A extends Bit, B extends Bit> = NAND<NAND<NAND<A, A>, NAND<B, B>>, NAND<NAND<A, A>, NAND<B, B>>>;

type XOR<A extends Bit, B extends Bit> = NAND<NAND<A, NAND<A, B>>, NAND<B, NAND<A, B>>>;

type XNOR<A extends Bit, B extends Bit> = NAND<NAND<NAND<A, A>, NAND<B, B>>, NAND<A, B>>;

type MUX<A extends Bit, B extends Bit, Select extends Bit> = NAND<NAND<A, NAND<Select, Select>>, NAND<B, Select>>;

type HalfAdder<A extends Bit, B extends Bit> = [
    XOR<A, B>,
    AND<A, B>
];

type FullAdder<A extends Bit, B extends Bit, Carry extends Bit> = [
    XOR<XOR<A, B>, Carry>,
    OR<AND<A, B>, AND<XOR<A, B>, Carry>>
];



type _BinaryInput<_BitOrder extends ReadonlyArray<number>, Result extends string> = 
    Length<_BitOrder> extends 0 ? 
        Result :
        `${Result}${Bit}`;

// type BinaryInput<T extends number> = `${Bit}`;



