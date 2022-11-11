export interface objCollatzStats {
    seed: bigint;
    steps: string;
    sumSteps: number;
    oddSteps: number;
    evenSteps: number;
    sequence: bigint[];

    loopStart: number;
    loopLength: number;
};

export function funcCollatz (bigSeed: bigint) {
    let strSteps: string = "";
    let numCounter: number = 0;
    let numOddCounter: number = 0;
    let numEvenCounter: number = 0;
    let bigSequenceArray: bigint[] = [];
    let bigCurrentValue: bigint = bigSeed;

    // Additional information
    let numLoopStart: number = 0;
    let numLoopLength: number = 0;

    for (let boolCollatzLooped: boolean = false; !boolCollatzLooped; numCounter++) {
        if (bigCurrentValue % 2n != 0n) {
            bigCurrentValue = (bigCurrentValue * 3n) + 1n;
            numOddCounter++;
            strSteps += '0'; //TEMPORARY!
        } else {
            bigCurrentValue = bigCurrentValue / 2n;
            numEvenCounter++;
            strSteps += '1'; //TEMPORARY!
        }

        for (let i: number = 0; i < bigSequenceArray.length; i++){
            if (bigSequenceArray[i] === bigCurrentValue) {
                numLoopLength = bigSequenceArray.length - i;
                boolCollatzLooped = true;
                numLoopStart = i;
            }
        }

        bigSequenceArray.push(bigCurrentValue);
    };

    const retVal: objCollatzStats = {
        seed: bigSeed,
        steps: strSteps,
        sumSteps: numCounter,
        oddSteps: numOddCounter,
        evenSteps: numEvenCounter,
        sequence: bigSequenceArray,

        loopStart: numLoopStart,
        loopLength: numLoopLength,
    };

    return retVal;
};
