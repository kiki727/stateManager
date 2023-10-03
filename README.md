# stateManager.js
simple state manager or sequential executer

////////////////////////////
//  e x a m p l e . . . ////
// getStateName() is curent active state !!! 
////////////////////////////

  const stateManager = new StateManager();
  
  //Add states
  stateManager.addState("start", () => console.log("Starting..."));
  stateManager.addState("middle", () => console.log("In the middle..."));
  stateManager.addState("end", () => console.log("Finishing..."));
  
  // Define actions before and after states...
  stateManager.onBeforeNext = () => console.log("Before next state...",stateManager.getStateName());
  stateManager.onAfterNext = () => console.log("After next state...",stateManager.getStateName());
