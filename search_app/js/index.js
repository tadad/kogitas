let gData;    

async function getData(callback) {
  query = window.location.search.substring(1).split("=")[1]

  const response = await fetch('/api/?q=' + query); // needs to be fixed
  gData = await response.json();
  callback(gData);
}

function main() {
  const highlightNodes = new Set();
  const highlightLinks = new Set();
  let hoverNode = null;



  const Graph = ForceGraph3D()
  Graph(document.getElementById('3d-graph'))
    .graphData(gData)

    .linkOpacity(0.1)

    .nodeLabel('')

    .onNodeClick(node=> {
      // location.href = "/?q=" + node.name.replaceAll(' ', '_');
    })

    .nodeThreeObject(node => {
      const obj = new THREE.Mesh(
        new THREE.SphereGeometry(5),
        new THREE.MeshBasicMaterial({ depthWrite: false, transparent: true, opacity: 0 })
      );
  
      // add text sprite as child
      const sprite = new SpriteText(node.name);
      sprite.textHeight = 4;
      sprite.fontFace = "Times-New-Roman"
      obj.add(sprite);
  
      return obj;
    })
    .onNodeHover( node => {
      if (node) {
        document.getElementById('main-info').innerHTML = node.description;
        document.getElementById('info-title').innerHTML = node.name;
        document.getElementById('wiki-link').href = node.href;
      }
      
    });
}


getData(main);