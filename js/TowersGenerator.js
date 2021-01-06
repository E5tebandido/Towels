
//Esta clase crea todos los elementos threejs.

$(function(){
    var scene;
    var camera;
    var renderer;
    var control;
    init();

    function init(){
        renderer = new THREE.WebGLRenderer({alpha:true, antialias:true});
        renderer.setSize( window.innerWidth, window.innerHeight );
        $("#stage").append(renderer.domElement);
        scene = new THREE.Scene();
        createFog();
        createCamera();
        createLight();
        createFloor();
        render();
    }  
    
    function createFloor(){
        var geometry = new THREE.PlaneGeometry( 1000 ,1000, 32 );
        var material = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide} );
        var plane = new THREE.Mesh( geometry, material );
        scene.add( plane );
    }
    
    function createTower(){
        var positionz = Math.random() * (50 - 1) + 1;
        var geometry = new THREE.BoxGeometry( 4 ,4 , positionz );
        var cubeMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff});
        var cube = new THREE.Mesh( geometry, cubeMaterial );
        scene.add( cube );
        cube.position.z = positionz * 0.5;
        cube.position.x= Math.random() * (500 - (-500)) + (-500);
        cube.position.y= Math.random() * (500 - (-500)) + (-500);
    }

    function createFog(){
        scene.fog = new THREE.FogExp2(0x1E2630,0.01);
        renderer.setClearColor(0xffffff);
        renderer.setClearColor(scene.fog.color);
    }

    function createLight(){
        var luz = new THREE.PointLight(0xffffff, 0.5);
        scene.add(luz);
        var luzAmbiente = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(luzAmbiente);
    }         

    function createCamera(){
        camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight , 0.1 , 1000);
        camera.position.z = 50;
        camera.position.y = -150;
        camera.position.x = 0;
        control = new THREE.OrbitControls(camera);
    }

    function render(){
        requestAnimationFrame( render );
        control.update();
        renderer.render( scene , camera );
    }

    $( document ).ready(function() {
        document.getElementById("background").onclick = function() {createTower()};
    });
});