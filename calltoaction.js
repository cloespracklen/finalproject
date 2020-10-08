//drawing map for incidence rates w/healthcare
var drawMap= function(mapData,target,pathGen,projection, border, field, label, color, strokeborder)
{
    
      var color2= d3.scaleQuantize()
    .range(['#ffb6c1', '#db6fbb', '#b300b3'])
    .domain([.033, .268]);  
   

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
           return color(value); 
        }
        else
        {
            return "#ccc";
        }
    
    }
          )
         .style("stroke-width", 3) 
    .style("stroke", function(d)
          {
       if(d.properties.data)
        {
            
             var value= d.properties.data[border];
           return strokeborder(value); 
            
        }
        else
        {
            return "#ccc";
        }
    })
    /*
    if (border=="")
        {
            return
                  if(d.properties.data)
    {
        var value=d.properties.data[""]
        return strokeborder(value);
    }
    */
    
    
    
 .on("mouseenter" ,function(mapData)
      {
        
      var xPos = d3.event.pageX;
      var yPos = d3.event.pageY;
      
        d3.select("#tooltip")
        .classed("hidden",false)
        .style("top",yPos+"px")
        .style("left",xPos+"px")
        
       if (label!="")
           {
               d3.select("#mapData")
        .text(mapData.properties.data[field]);
           }
           d3.select("#geoData")
            .text(mapData.properties.data[border]);
        
        d3.select("#mapDatalabel")
        .text(label);
        
      })//tool tip off
    .on("mouseleave",function()
    {
        d3.select("#tooltip")    
        .classed("hidden",true);
    })

}


var makeTranslateString=function(x,y)
{
    return "translate("+x+","+y+")";
}

var initGraph= function(stateData, mapData)
{
    var screen = {width:1000,height:550}
    
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

var color1= d3.scaleQuantize()
    .range(["rgb(255,255,255)","rgb(230,247,255)","rgb(179,231,255)", "rgb(128,215,255)", "rgb(77,198,255)","rgb(26,182,255)","rgb(0,157,230)", "rgb(0,122,179)", "rgb(0,87,128)","rgb(0,52,77)"])
    .domain([.0402,.4443]);
    
 var color2= d3.scaleQuantize()
   .range(['#ffb6c1', '#db6fbb', '#b300b3'])
    .domain([.033, .268]);  
    
 var color3= d3.scaleQuantize()
    .range(["rgb(0,0,0)"])
    .domain([.033,.268]);
   
    
var projection= d3.geoAlbersUsa()
//.translate(["width"/2, "height"/2])


var pathGen= d3.geoPath()
.projection(projection)

        drawMap(mapData, target, pathGen, projection, "nohealthcare_rates", "incidence_rates", "Incidence Rates:", color1, color2 );
    
   // drawMap(mapData, target, pathGen, projection, "nohealthcare_rates", "mortality_rates", "Mortality Rates:", color1, color2);
    
      

    drawMapbutton(mapData,target,pathGen,projection,color1,color2,color3)
}





//--------buttons----------
		var drawMapbutton = function (mapData,target,pathGen,projection,color1,color2,color3)
		{
			d3.select("#banner1")
			.on("click", function()
			   {
                console.log("hello")
				d3.selectAll("path")
				.remove()
			drawMap(mapData, target, pathGen, projection, "nohealthcare_rates", "incidence_rates", "Incidence Rates:", color1, color2);
				
			})
        
		{
			d3.select("#banner2")
			.on("click", function()
			   {
                console.log("hi")
                d3.selectAll("path")
				.remove()
                
			drawMap(mapData, target, pathGen, projection, "nohealthcare_rates", "mortality_rates", "Mortality Rates:", color1,color2);
				
			})
             d3.select("#banner3")
			.on("click", function()
			   {
                console.log("howdy")
                d3.selectAll("path")
				.remove()
                
			drawMap(mapData, target, pathGen, projection, "nohealthcare_rates", "nohealthcare_rates","", color2, color3);
				
			})
            
        }}
				
		

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
