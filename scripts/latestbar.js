function main() {
    var svg = d3.select("svg"),
        margin = {top: 30, right: 30, bottom: 70, left: 60},
        width = svg.attr("width") - margin.left - margin.right,
        height = svg.attr("height") - margin.top - margin.bottom;

            svg.append("g").select("#my_dataviz")
            .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
            .append("g")
              .attr("transform", `translate(${margin.left},${margin.top})`);
 
              // Parse the Data
d3.csv("country_wise_latest.csv").then( function(data) {

    // X axis
    const x = d3.scaleBand()
      .range([ 0, width ])
      .domain(data.map(d => d.Region))
      .padding(0.2);
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");
    
    // Add Y axis
    const y = d3.scaleLinear()
      .domain([0, 20000])
      .range([ height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y).tickFormat(function(d){ return d;}).ticks(10));
    
    // Bars
    svg.selectAll("mybar")
      .data(data)
      .join("rect")
        .attr("x", d => x(d.Region))
        .attr("y", d => y(d.TotalDeath))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.TotalDeath))
        .attr("fill", "#69b3a2")
    
    })
}