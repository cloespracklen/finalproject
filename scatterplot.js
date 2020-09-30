var drawPlot = function (staterates,screen,xScale,yScale)
	{
        var getincidencerates = function(staterates)
	{
        console.log(staterates.incidencerates[0])
		return staterates.incidencerates[0]
        
	}
		console.log("drawplot" ,staterates);
		d3.select("#graph")
		.selectAll("circle")
		.data(staterates)
		.enter()
		.append("circle")
		
		.attr("cx",function (staterates)
			 {
            return xScale(5)
			return xScale(getincidencerates(staterates))
			})
		.attr("cy",function (staterates)
			 {
			return yScale(getpercentofpeoplewithouthealthcarecoverage(staterates))
			})
		.attr("r",5)
        
    }

var initgraph = function(staterates)
{
	console.log(staterates)
	var screen = {width:500, height:500}
	d3.select("#graph")
	.attr("width", screen.width)
	.attr("height", screen.height)
	var xScale = d3.scaleLinear()
					.domain([0,100])
					.range([0,screen.width])
	var yScale = d3.scaleLinear()
					.domain([0,100])
					.range([screen.height,0])
	drawPlot(staterates,screen,xScale,yScale);

    };

var getpercentofpeoplewithouthealthcarecoverage = function(staterates)
{
	var  = function(staterates)
	{
		return staterates.percentofpeoplewithouthealthcarecoverage;
	}
    };
    
	
    
    

var successFCN= function(staterates)
 {
     console.log("yes this did work!!!", staterates);
     initgraph(staterates)
     
 }
 var failureFCN= function(error)
 {
     console.log("error", error)
 }
 var coloncancerPromise=d3.json("avgregions.json")
coloncancerPromise.then(successFCN,failureFCN)