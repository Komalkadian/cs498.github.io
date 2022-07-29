function main() {


    var svg = d3.select("svg"),
    margin = 200,
    width = svg.attr("width") - margin
    height = svg.attr("height") - margin;


    var xScale = d3.scaleBand().range([0, width]).padding(0.4),
        yScale = d3.scaleLinear().range([height, 0]);

    var g = svg.append("g").attr("transform", "translate("+ 100 +","+ 100 +")");

    d3.csv("country_wise_latest.csv").then(function(data){

            xScale.domain(data.map(function(d){ return d.Region;}));
            //yScale.domain([0, d3.max(data, function(d){ return d.Confirmed;})]);
            yScale.domain([0, 400000]);


            g.append("g").attr("transform", "translate(0,"+ height +")")
                  // .call(d3.axisBottom(xScale))
                  .call(d3.axisBottom(xScale))
                  .selectAll("text").attr("transform", "translate(-10,0)rotate(-45)")
                  .style("text-anchor", "end");

            g.append("g").call(d3.axisLeft(yScale).tickFormat(function(d){ return d;}).ticks(10));

            svg.append("text").attr("class", "x label").attr("text-anchor", "end")
            .attr("x", width/1.5).attr("y", height + 180).text("Regions");

            svg.append("text").attr("text-anchor", "end")
            .attr("x", width/5).attr("y", height-500).text("Total Deaths").attr("text-anchor", "start");
//------------------//


const type = d3.annotationLabel

const annotations = [

{
  note: {
    label: "Scale representing total deaths across multiple regions",
    
  },
  //can use x, y directly instead of data

  color: d3.rgb("Darkblue"),
  x: 100,
  y: 200,
  dy: 137,
  dx: 162
}]



const makeAnnotations = d3.annotation()

  .annotations(annotations)

d3.select("svg")
  .append("g")
  .attr("class", "annotation-group")
  .call(makeAnnotations)


    // create a tooltip
      const Tooltip = d3.select("#my_dataviz")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "10px")

      // Three function that change the tooltip when user hover / move / leave a cell
      const mouseover = function(event,d) {
        Tooltip
          .style("opacity", 1)
      }
      const mousemove = function(event,d) {
        Tooltip
          .html("Total Deaths: " + d.TotalDeath)
          .style("left", `${event.layerX+90}px`)
          .style("top", `${event.layerY}px`)
      }
      const mouseleave = function(event,d) {
        Tooltip
          .transition()
          .duration(200)
          .style("opacity", 0)
      }

            g.selectAll(".dot").data(data).enter().append("circle")
             .attr("cx", function(d){ return xScale(d.Region);})
             .attr("cy", function(d){ return yScale(d.TotalDeath);})
             .attr("r", 8)
             .attr("stroke", "#69b3a2")
             .attr("stroke-width", 3)
             .attr("fill", "white")
             .on("mouseover", mouseover)
             .on("mousemove", mousemove)
             .on("mouseleave", mouseleave)
             .attr("width", xScale.bandwidth())
             .attr("height", function(d){ return  yScale(d.TotalDeath);});

             // create a tooltip
       
         

    });

}
