let gData;    

async function getData(callback) {
  query = window.location.search.substring(1).split("=")[1]

  const response = await fetch('/api/?q=' + query); // needs to be fixed
  gData = await response.json();
  callback(gData);
}

function main() {

  const Graph = ForceGraph3D()
  Graph(document.getElementById('3d-graph'))
    .graphData(gData)

    .linkOpacity(.3)

    .nodeLabel('')

    .onNodeClick(node=> {
      if (node) {
        document.getElementById('main-info').innerHTML = node.description;
        document.getElementById('info-title').innerHTML = node.name;
        document.getElementById('wiki-link').href = node.href;
        openSide();
      }
      

      const distance = 100  //(node.value * node.name.length); // extremely hackey and arbitrary
      const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);

      Graph.cameraPosition(
        { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
        node, // lookAt ({ x, y, z })
        2000  // ms transition duration
      );
    })

    .nodeThreeObject(node => {
      const obj = new THREE.Mesh(
        new THREE.SphereGeometry(5),
        new THREE.MeshBasicMaterial({ depthWrite: false, transparent: true, opacity: 0 })
      );
  
      // add text sprite as child
      const sprite = new SpriteText(node.name);
      sprite.textHeight = node.value * 10;
      sprite.fontFace = "Times-New-Roman";
      sprite.backgroundColor = true;
      obj.add(sprite);
      return obj;
    })
    .cooldownTicks(100);
    Graph.onEngineStop(() => Graph.zoomToFit(400));
}

function openSide() {
  document.getElementById('info-container').style.width = 'auto'; //need new way of hiding this
  document.getElementById('info-container').style.left = '0';
}

function closeSide() {
  document.getElementById('info-container').style.width = '0';
  document.getElementById('info-container').style.left = '-400px';
  document.getElementById('main-info').innerHTML = '';
  document.getElementById('info-title').innerHTML = '';
  document.getElementById('wiki-link').href = '';

}

getData(main);