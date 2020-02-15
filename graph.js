// export default createGraph;

/** Factory which returns a D3 component for visualizing various graph and tree
 * data structures.
 */
function createGraph( selection, nodes, edges ) {

    // create graph's visual artifacts
    let svg = selection;
    // let width = +svg.attr('width');
    // let height = +svg.attr('height');
    let verts = svg.selectAll('.node');
    let links = svg.selectAll('.link');

    // create simulation
    let linking = d3.forceLink()
        .links( edges )
        .distance( 60 );
    let charging = d3.forceManyBody();
    let centering = d3.forceCenter()
        .x(0)//width/2 )
        .y(0);// height/2 );
    var simulation = d3.forceSimulation(nodes)
        .force('link', linking)
        .force('charge', charging)
        .force('center', centering)
        .alphaTarget(1)
        .on('tick', tock);

    return {refresh, adjust};

    // callback for simulation's main loop
    function tock() {

        // add new edges to the graph
        links = links.data( edges );
        links = links.enter()
            .append( 'line'  )
                .attr('class', 'link')
                .lower() // move the edges under the nodes

            // update the edge with simulation coordinates
            .merge( links )
                .attr('x1', function(d){return d.source.x;} )
                .attr('y1', function(d){return d.source.y;} )
                .attr('x2', function(d){return d.target.x;} )
                .attr('y2', function(d){return d.target.y;} );

        // append circles to the svg to represent the trie nodes
        verts = verts.data( nodes );
        let entered = verts.enter()
            .append('g')
                .attr( "class", "node" )
            .call( d3.drag()
                .on('start', started)
                .on('drag', dragged)
                .on('end', ended) );

        entered.append('circle')
                .attr('r', 20);

        entered.append('text')
                .text( function(d){return d.symbol;} );

        // update positions with simulation for both new and old nodes
        verts = entered.merge( verts )
                .attr("class", function(d){ return (d.status==undefined) ? 'node' : 'node '+d.status; })
                .attr("transform", function(d) { return "translate("+d.x+", "+d.y+")";});
    }

    // callback for slider events
    function adjust(force) {
        // d3.select("#linkLabel").text(force);
        linking.strength(+force);
        simulation.restart();
    }

    function refresh( nodes, edges ) {
        simulation.nodes( nodes );
        linking.links( edges );
        simulation.restart();
    }

    function started(d) {
        d.fx = d.x;
        d.fy = d.y;
    }
    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }
    function ended(d) {
        d.fx = null;
        d.fy = null;
    }
}