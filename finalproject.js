var drawMap= function(mapData,target,pathGen,projection)
{
    target.selectAll("path")
    .data(mapData.features)
    .enter()
    .append("path")
    .attr("d",pathGen);
}

var makeTranslateString=function(x,y)
{
    return "translate("+x+","+y+")";
}

var initGraph= function(stateData, mapData)
{
    var screen = {width:800,height:600}
    
    var margins =
        {left:30,right:20,top:20,bottom:30}
}
//*var drawAxes= function(graphDim,margins,xScale,yScale)*//
                       {}

var graph = 
        {
            width:screen.width-margins.left-margins.right,
            height:screen.height - margins.top-margins.bottom
        }
    d3.select("svg")
.attr("width", screen.width)
.attr("height". screen.height)

var target= d3.select("svg")
.append("g")
.attr("id", "#graph")
.attr("transform","translate("+margins.left+ ","+ margins.top+")");


    
var projection= d3.geoAlbersUsa();

var pathGen= d3.geopath()
.projection(projection)

        drawMap(mapData, target, pathGen, projection);
    
//promises
var successFCN = function(states)
{
    console.log("states", states);
    initGraph(states[0], states[1]);
    
}
var failureFCN= function(error)
{
    console.log("error", error);
}
var statePromise= d3.csv("staterates.csv")
var geoPromise= d3.json("us-states.json")
var promises= [statePromise, geoPromise];
Promise.all(promises)
.then(successFCN, failureFCN);
