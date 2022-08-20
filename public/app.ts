let a:Number = 1;

class Greeter {
  private greeting: string;
  public m: string;
 
  constructor(message: string) {
    this.greeting = message;
    this.m = message; 
  }
 
  greet() {
    return "Hello, " + this.greeting;
  }
}

console.log(a);