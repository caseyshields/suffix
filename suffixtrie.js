/** Creates a suffix tree, which can be built from a stream of text.
 * It is compatible with d3.hierarchy */
function CreateSuffixTrie() {
    
    // create an empty suffix tree
    let strie = {
        root: {
            name: '', // the node symbol
            children: [], // the possible suffixes
            link: null // the failure link for building the suffix trie
        },
        deep: null
    };
    strie.root.link = strie.root;
    strie.deep = strie.root;

    strie.append = function( symbol ) {

        // this will be our pointer for traversing the previous boundary path
        let active = strie.deep.link;

        // find the next deepest suffix after this symbol is added
        strie.deep.children[ symbol ] = { name: symbol, children:[], link:null };
        strie.deep = strie.deep;

        // this will be our pointer for the next boundary path we are constructing
        let suffix = strie.deep;

        // traverse the previous boundary path, exiting when you encounter work
        // you've already performed on a previous occurance of the symbol
        while (!active.children[ symbol ]) {

            // add a transition for the symbol from the old boundary path to the new boundary
            // and link the new node to the boundary path as well
            active.children[ symbol ] = { name: symbol, children:[], link: null };
            suffix.link = active

            // advance the new and old boundary path
            suffix.link = suffix.link;
            active.link = active.link;
            // notice since the root's boundary link points to itself,
            // it will cause the loop to exit, without a null pointer exception
        }

        // now we have to attach the new boundary path tp any previously computed path for this suffix
        if (active.children[ symbol ] == suffix)
            suffix.link = root;
        else
            suffix.link = active.children[ symbol ];
        // avoid the special case of the root
    }

    /** Searches the trie for the given text.
     * @returns the suffix trie node matching the given input, otherwise null */
    strie.get = function( word ) {
        let n=0;
        let node = strie.root;
        while (node != null)
            if (n==word.length)
                return node;
            else
                node = node.children[ word.chatAt(n++) ];
        return null;
    }

    strie.has = function( word ) {
        return null != strie.get(word);
    }

    return strie;
}