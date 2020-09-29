

var successFCN= function(staterates)
 {
     console.log("yes this did work!!!")
 }
 var failureFCN= function(error)
 {
     console.log("error", error)
 }
 var coloncancerPromise=d3.csv("staterates.csv")
coloncancerPromise.then(successFCN,failureFCN)