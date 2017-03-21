// interface SquareConfig {
//     color?: string;
//     width?: number;
// }

interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    // ...
}

let mySquare = createSquare({ colour: "red", width: 100 });
let mySquare2 = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);


// interface for function
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
  let result = source.search(subString);
  if (result == -1) {
    return false;
  }
  else {
    return true;
  }
}


// interface for class
interface ClockInterface1 {
    currentTime: Date;
    setTime(d: Date);
}

class Clock implements ClockInterface1 {
    currentTime: Date;
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) { }
}
