/**
 * I had the idea of making ideas collapsable if you clicked on them
 * 
 * This works really well for a tree, but I don't know what algorithm to use
 *      for a graph. How to traverse the tree to make things visible/invisible
 *      gets super buggy and weird, very quickly.
 * 
 * COME BACK TO THIS PROJECT LATER.
 */


let gData;    

async function main(callback) {
  const response = await fetch('http://localhost:3000/api/graph');
  gData = await response.json();
  callback(gData);
}


function everything_else() {
  const rootId = '21fd3f0aca'; // hardcoded. change this later

  graph = {};
  for (node of gData.nodes) {
    graph[node.id] = node;
  }

  for (link of gData.links) {
    graph[link.source].childLinks.push(link.target);
    graph[link.target].childLinks.push(link.source);
  }




  const getPrunedTree = () => { // DECIDE WHAT ALGORITHM TO USE HERE
    let visibleNodes = [];
    let visibleLinks = [];
    let visited = new Set();
    (function traverseTree(rtId=rootId) {
      node = graph[rtId];
      visibleNodes.push(node);
      if (node.collapsed) { 
        return; 
      } else {
        node.collapsed = true;
      }

      for (target of node.childLinks) {
        if (!(target in visited) & graph[target].collapsed == true){ // super buggy!
          visited.add(target);
          traverseTree(target);
          visibleLinks.push({'source': node.id, 'target': target});
        }
        
      }
    })(); 
    console.log('vnodes', visibleNodes);
    console.log('vlinks', visibleLinks);
    return { nodes: visibleNodes, links: visibleLinks };
  };
  
  const elem = document.getElementById('3d-graph');
  const Graph = ForceGraph3D()(elem)
    //.graphData(getPrunedTree)
    .graphData(gData)
    .onNodeClick(node => {
      if (node.childLinks.length) {
        node.collapsed = !node.collapsed; // toggle collapse state
        Graph.graphData(getPrunedTree());
      }
    })
    .linkOpacity(0.1)
    .nodeThreeObject(node => {
      // use a sphere as a drag handle
      const obj = new THREE.Mesh(
        new THREE.SphereGeometry(10),
        new THREE.MeshBasicMaterial({ depthWrite: false, transparent: true, opacity: 0 })
      );
  
      // add text sprite as child
      const sprite = new SpriteText(node.name);
      sprite.textHeight = 8;
      obj.add(sprite);
  
      return obj;
    });
}


main(everything_else);



// .onNodeClick(node => {
    //   location.href = node.href; // takes you to the page
    // })