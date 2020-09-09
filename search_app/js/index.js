let gData;    

async function getData(callback) {
  const response = await fetch('/api/graph'); // needs to be fixed
  gData = await response.json();
  callback(gData);
}

function main() {
  const Graph = ForceGraph3D()
    (document.getElementById('3d-graph'))
    .graphData(gData)

    .linkOpacity(0.1)

    .nodeLabel('')

    .cooldownTicks(100)

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


