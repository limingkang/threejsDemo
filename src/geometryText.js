import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
// import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

THREE.Cache.enabled = true;

export default () => {
    let container; // dom容器，设置鼠标移动事件也在该dom上
    let camera, cameraTarget, scene, renderer;
    let group, textMesh1, textMesh2, textGeo, materials;
    let text = 'limingkang',
        bevelEnabled = true,
        font = undefined,
        fontName = 'optimer', // helvetiker, optimer, gentilis, droid sans, droid serif
        fontWeight = 'bold'; // normal bold
    const height = 20,
        size = 70,
        hover = 30,
        curveSegments = 4,
        bevelThickness = 2,
        bevelSize = 1.5;
    const mirror = true;

    let targetRotation = 0;
    let targetRotationOnPointerDown = 0;

    let pointerX = 0;
    let pointerXOnPointerDown = 0;

    let windowHalfX = window.innerWidth / 2;

    // 元素初始化
    init();
    animate(); // 绘制到页面
    function init() {
        container = document.createElement( 'div' );
        document.body.appendChild( container );
        // CAMERA
        camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 1500 );
        camera.position.set( 0, 400, 700 );
        cameraTarget = new THREE.Vector3( 0, 150, 0 );

        // 雾：设置离相机远近程度不同雾化或者虚化物体
        scene = new THREE.Scene();
        scene.background = new THREE.Color( 0x000000 );
        scene.fog = new THREE.Fog( 0x000000, 250, 1400 );

        // LIGHTS: 模拟线性平行光，类似与太阳
        const dirLight = new THREE.DirectionalLight( 0xffffff, 0.4 );
        dirLight.position.set( 0, 0, 1 ).normalize();
        scene.add( dirLight );
        // 模拟点光源，照射到物体会产生阴影
        const pointLight = new THREE.PointLight( 0xffffff, 4.5, 0, 0 );
        pointLight.color.setHSL( Math.random(), 1, 0.5 );
        pointLight.position.set( 0, 100, 90 );
        scene.add( pointLight );

        // 组，可以向一个组里添加多个物体
        group = new THREE.Group();
        group.position.y = 100;
        scene.add( group );
        // 下载需要显示的字体文件
        loadFont();
        // 其实就是底部的虚化阴影
        const plane = new THREE.Mesh(
            new THREE.PlaneGeometry( 10000, 10000 ), // 平面几何体
            // 一个以简单着色（平面或线框）方式来绘制几何体的材质
            new THREE.MeshBasicMaterial( { color: 0xffffff, opacity: 0.5, transparent: true } )
        );
        plane.position.y = 100;
        plane.rotation.x = - Math.PI / 2;
        scene.add( plane );

        // RENDERER
        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        container.appendChild( renderer.domElement );

        // EVENTS
        container.style.touchAction = 'none';
        container.addEventListener( 'pointerdown', onPointerDown );
        // MeshPhongMaterial一种用于具有镜面高光的光泽表面的材质
        materials = [
            new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } ), // front 平面着色
            new THREE.MeshPhongMaterial( { color: 0xffffff } ) // side
        ];
        window.addEventListener( 'resize', onWindowResize );
    }
    // resize时候重新渲染
    function onWindowResize() {
        windowHalfX = window.innerWidth / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }
    // 下载字体
    function loadFont() {
        const loader = new FontLoader();
        loader.load( 'https://threejs.org/examples/fonts/' + fontName + '_' + fontWeight + '.typeface.json', function ( response ) {
            font = response;
            refreshText();
        } );
    }
    function createText() {
        textGeo = new TextGeometry( text, {
            font: font,
            size: size,
            height: height,
            curveSegments: curveSegments,
            bevelThickness: bevelThickness,
            bevelSize: bevelSize,
            bevelEnabled: bevelEnabled

        } );
        textGeo.computeBoundingBox();
        const centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
        textMesh1 = new THREE.Mesh( textGeo, materials );
        textMesh1.position.x = centerOffset;
        textMesh1.position.y = hover;
        textMesh1.position.z = 0;
        textMesh1.rotation.x = 0;
        textMesh1.rotation.y = Math.PI * 2;
        group.add( textMesh1 );
        if ( mirror ) { // 下面的镜面字体
            textMesh2 = new THREE.Mesh( textGeo, materials );
            textMesh2.position.x = centerOffset;
            textMesh2.position.y = - hover;
            textMesh2.position.z = height;
            textMesh2.rotation.x = Math.PI;
            textMesh2.rotation.y = Math.PI * 2;
            group.add( textMesh2 );
        }
    }

    function refreshText() {
        group.remove( textMesh1 );
        if ( mirror ) group.remove( textMesh2 );
        if ( ! text ) return;
        createText();
    }
    // 鼠标按下
    function onPointerDown( event ) {
        if ( event.isPrimary === false ) return;
        pointerXOnPointerDown = event.clientX - windowHalfX;
        targetRotationOnPointerDown = targetRotation;
        document.addEventListener( 'pointermove', onPointerMove );
        document.addEventListener( 'pointerup', onPointerUp );
    }
    // 鼠标移动
    function onPointerMove( event ) {
        if ( event.isPrimary === false ) return;
        pointerX = event.clientX - windowHalfX;
        targetRotation = targetRotationOnPointerDown + ( pointerX - pointerXOnPointerDown ) * 0.02;
    }
    // 鼠标抬起
    function onPointerUp() {
        if ( event.isPrimary === false ) return;
        document.removeEventListener( 'pointermove', onPointerMove );
        document.removeEventListener( 'pointerup', onPointerUp );

    }
    // 渲染动画
    function animate() {
        requestAnimationFrame( animate );
        render();
    }
    // 渲染
    function render() {
        // 设置物体组的位置
        group.rotation.y += ( targetRotation - group.rotation.y ) * 0.05;
        // 调整相机视角
        camera.lookAt( cameraTarget );
        renderer.clear();
        renderer.render( scene, camera );
    }
}