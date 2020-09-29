var dataPromise =(d3.csv("staterates.csv"))
var mapPromise = (d3.json("states.json"))

//need to initGraph
// color of incidence_rates
//var incidence_rates=
    //d3.scaleSequential(d3.interpolateBlues)
// color of mortality_rates
// color of nohealthcare_rates

//define path
var path= d3.geoPath()

d3.json("states.json", function(json)
       {
    svg.selectAll("path")
    .data(json.features)
    .enter()
    .append("path")
    .attr("d",path)
});

//finish promise
console.log("hello");
 var successFCN= function(rates)
 {
     console.log("hello")
 }
 var failureFCN= function(error)
 {
     console.log("error", error)
 }
Promise.all.then(dataPromise,mapPromise)