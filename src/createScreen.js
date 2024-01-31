import * as THREE from 'three';

export default () => {
    const scene = new THREE.Scene(); // 一个画布场景
    // 相机，相当于设置人的观察视角
    const camera = new THREE.PerspectiveCamera( 20, window.innerWidth / window.innerHeight, 0.1, 1000 );
    // 创建一个渲染器将相机和场景渲染到页面上
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    // 创建几何体例如立方体
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    // 创建材质可以理解为是个几何体的材质例如颜色等
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    // 物体：创建一个真正的物体即用来合并几何体和材质
    // 这里使用的物体是网格Mesh
    const cube = new THREE.Mesh( geometry, material );
    // 场景上添加网格
    scene.add( cube );

    camera.position.z = 5;

    function animate() {
      requestAnimationFrame( animate );
      // 不停调整网格位置
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render( scene, camera );
    }
    animate();
}