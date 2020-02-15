// export default createTrie()

/** A minimal trie implementation which is compatible with D3 layouts. */
function createTrie() {

    // declare simulation dataset and root node
    let nodes = [];
    let edges = [];
    
    nodes[0] = { symbol:'^', edge:[], x:0, y:0 };

    return {root, get, put, append, nodes, edges};

    function root() {
        return nodes[0];
    }

    /** @returns The node associated with the given word or null if it doesn't exist.
    */
    function get( node, word ) {
        let next =node;
        for (let n=0; n<word.length; n++)
            if (next.edge[word[n]])
                next = next.edge[word[n]];
            else
                return null;
        return next;
    }

    /** Adds the word to the given point in the trie.
     * @returns the last node created or traversed when adding the word.
    */
    function put( node, word ) {
        let next = node;
        for (let n=0; n<word.length; n++)
            next = append(next, word[n]);
        return next;
    }

    /** Adds a transition and node for the symbol to the given node.
     * @returns The child node associated with the symbol
    */
    function append(parent, symbol) {
        // check if the node already exists for the symbol's transition
        let node = parent.edge[symbol];
        if (!node) {
            // create the missing node
            node = {
                symbol,
                edge : [],
                x : parent.x,
                y : parent.y
            };
            parent.edge[symbol] = node;

            // create the edge to the node
            let edge = {
                source: parent,
                target: node,
                class: 'new'
            }; // this isn't really needed for the data structure, but it helps make the vizualization clear!

            // update the simulation data structures
            edges.push(edge);
            nodes.push(node);
            // todo update styling
        }
        return node;
    }
}
    // // adds the given string to the trie
    // function add( node, word ) {
    //     let next2 = node;
    //     for(let n=0; n<word.length; n++)
    //         next2 = addSymbol(next2, word, n);
    //     // todo do this loop on a timer, updating styling...
    // }

    // // adds a single node to the trie and refreshes the graph
    // function addSymbol( node, word, index ) {
    //     // find the transition for the next symbol
    //     let c = word[ index ];
    //     let next = node.suffix[c];

    //     // if the transition does not exist
    //     if (!next) {
    //         // create the node
    //         next = {
    //             symbol: c,
    //             suffix: [],
    //             x: node.x,
    //             y: node.y
    //         };
    //         node.suffix[c] = next;

    //         // create the edge
    //         let edge = {
    //             source: node,
    //             target: next
    //         };

    //         // update the simulation data structures
    //         edges.push(edge);
    //         nodes.push(next);
    //         // todo update styling
    //     }
    //     return next;
    // }
