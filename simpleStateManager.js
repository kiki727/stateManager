class StateManager {
    constructor() {
      //this.state = {};
      this.stateOrder = [];
      this.stateFunctions = {};
      this.resetEnabled = true;
  
      // Dodati prazne funkcije za događaje
      this.onBeforeNext = () => {};
      this.onAfterNext = () => {};
    }
  
    addState(stateName, stateFunction) {
      this.stateOrder.push(stateName.toUpperCase());
      this.stateFunctions[stateName.toUpperCase()] = stateFunction;
    }
  
    getCurrentStateInfo() {
      const currentStateName = this.stateOrder[0];
      if (currentStateName) {
        const stateFunction = this.stateFunctions[currentStateName];
        return { currentStateName, stateFunction };
      }
      return null;
    }
  
    getStateName() {
      const currentStateInfo = this.getCurrentStateInfo();
      if (currentStateInfo) {
        const { currentStateName } = currentStateInfo;
        return currentStateName;
      }
      return null;
    }
  
    getNextStateInfo() {
      const nextStateName = this.stateOrder[0];
      //console.log(this.stateOrder)
      //console.log(this.stateFunctions)
      if (nextStateName) {
        const stateFunction = this.stateFunctions[nextStateName];
        return { nextStateName, stateFunction };
      }
      return null;
    }
  
    nextState() {
      const nextStateInfo = this.getNextStateInfo();
      if (nextStateInfo) {
        this.onBeforeNext(); // Poziv događaja pre prelaska na sledeće stanje
  
        const { nextStateName, stateFunction } = nextStateInfo;
        stateFunction();
        this.stateOrder.shift();
  
        if (this.stateOrder.length === 0 && this.resetEnabled) {
          this.resetState();
        }
  
        this.onAfterNext(); // Poziv događaja nakon prelaska na sledeće stanje
      }
    }
  
    resetState() {
      this.stateOrder = Object.keys(this.stateFunctions);
    }
  
    setResetEnabled(enabled) {
      this.resetEnabled = enabled;
    }
  }
  
  ////////////////////////////
  //  e x a m p l e . . . ////
  ////////////////////////////
  // Primeri upotrebe
  const stateManager = new StateManager();
  
  // Dodavanje stanja
  stateManager.addState("start", () => console.log("Starting..."));
  stateManager.addState("middle", () => console.log("In the middle..."));
  stateManager.addState("end", () => console.log("Finishing..."));
  
  // Definisanje akcija za događaje
  stateManager.onBeforeNext = () => console.log("Before next state...",stateManager.getStateName());
  stateManager.onAfterNext = () => console.log("After next state...",stateManager.getStateName());
  
  
  
  // star loop . . . . .
  setInterval(()=>{
  
    // Ispis trenutnog stanja
  console.clear()
  
  // Prelazak na sledeće stanje
  stateManager.nextState();
  console.log("Current state:", stateManager.getStateName());
  
  },5000)