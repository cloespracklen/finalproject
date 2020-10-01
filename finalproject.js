//drawing map for incidence rates w/healthcare
var drawMap= function(mapData,target,pathGen,projection, border, field)
{
    var color1= d3.scaleQuantize()
    .range(["rgb(204,230,255)","rgb(102,181,255)","rgb(0,92,179)", "rgb(0,40,77)"])
    .domain([.1168,.4443]);
    
      var color2= d3.scaleQuantize()
    .range(["rgb(255,255,255)","rgb(217,217,217)","rgb(128,128,128)", "rgb(64,64,64)","rgb(0,0,0)"])
    .domain([.033, .268]);  
    
    /*var color3= d3.scaleQuantize()
    .range(["rgb(247,230,255)","rgb(207,102,255)","rgb(139,0,204)", "rgb(105,0,153)"])
    .domain([.1748,.0402]);*/
    
    
    target.selectAll("path")
    .data(mapData.features)
    .enter()
    .append("path")
    .attr("d",pathGen)
    .style("fill", function(d)
           {  
        if(d.properties.data)
        {
             var value= d.properties.data[field];
           return color1(value); 
        }
        else
        {
            return "#ccc";
        }
    
    }
          )
    /*.style("fill", function(d)
           {  
        if(d.properties.data)
        {
             var value= d.properties.data[field];
           return color3(value); 
        }
        else
        {
            return "#ccc";
        }
    
    })*/
          
    .style("stroke", function(d)
          {
       if(d.properties.data)
        {
             var value= d.properties.data[border];
           return color2(value); 
        }
        else
        {
            return "#ccc";
        }
    })
 
}


var makeTranslateString=function(x,y)
{
    return "translate("+x+","+y+")";
}

var initGraph= function(stateData, mapData)
{
    var screen = {width:1000,height:800}
    
    var margins =
        {left:30,right:20,top:20,bottom:30}


    

    
    
    
    
    var createLabels = function(screen,margins,
graph,target)
{
        var labels = d3.select(target)
        .append("g")
        .classed("labels",true)
        
    labels.append("text")
        .text("Map of the United States")
        .classed("title",true)
        .attr("text-anchor","middle")
        .attr("x",margins.left+(graph.width/2))
        .attr("y",margins.top)
}
  
 
 
 
 
 
 
 
 
 
 
 // joining the data from json and csv DO NOT put anything below this line unless in sucessFCN // 
 
 
var joinData= function(mapData,stateData)
{
    var shapes= {};
    mapData.features.forEach(function(feature)
                            {
        shapes[feature.properties.NAME]=feature;
    })
    stateData.forEach(function(state)
                     { if(shapes[state.states])
                         {
        //console.log("state", state.states);
        shapes[state.states].properties.data=state;
    }
})
    console.log(shapes)
}
var graph = 
        {
            width:screen.width-margins.left-margins.right,
            height:screen.height - margins.top-margins.bottom
        }

joinData(mapData,stateData)
    d3.select("svg")
.attr("width", screen.width)
.attr("height", screen.height)

var target= d3.select("svg")
.append("g")
.attr("id", "#graph")
.attr("transform","translate("+margins.left+ ","+ margins.top+")");


    
var projection= d3.geoAlbersUsa()
//.translate(["width"/2, "height"/2])


var pathGen= d3.geoPath()
.projection(projection)

        drawMap(mapData, target, pathGen, projection, "nohealthcare_rates", "incidence_rates");
    
    drawMap(mapData, target, pathGen, projection, "nohealthcare_rates", "mortality_rates")
}

//--------buttons----------
		var drawMapbutton = function (mapData,target,pathGen,projection, border, field)
		{
			d3.select("#banner1")
			.on("click", function()
			   {
                console.log("hello")
				
				.remove()
			drawMap(mapData, target, pathGen, projection, "nohealthcare_rates", "incidence_rates");
				
			})
        }
		{
			d3.select("#banner2")
			.on("click", function()
			   {
                console.log("hi")
				.remove()
                
			drawMap(mapData, target, pathGen, projection, "nohealthcare_rates", "mortality_rates")
				
			})
        }
				
		

//promises finishing up.
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
