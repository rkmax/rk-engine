var
    sf = {},
    sf_loads = 0,
    App,
    deps = [
        'AABB', 'Engine', 'Manifold', 'Operation', 'Vector2D', 'World'
    ],
    mainloop
;

update_loads = function() {
    sf_loads++;
};

function loadDeps() {

    for (var i = deps.length - 1; i >= 0; i--) {
        var js = document.createElement("script");
        js.type = "text/javascript";
        js.src = "js/" + deps[i] + ".js";
        js.onload = update_loads;
        document.body.appendChild(js);
    }
}

function start() {

    if (sf_loads !== deps.length) {
        setTimeout(start, 500);
    } else {
        var canvas = document.getElementsByTagName('canvas')[0];
        canvas.width = 500;
        canvas.height = 400;
        var context = canvas.getContext('2d');

        App = new RkmaxEngine({
            context: context,
            width: canvas.width,
            height: canvas.height
        });


        var ent = new RkmaxAABB(225, 175 , {
            mass: 1,
            velocity: new RkmaxVector2D(0, 0),
            restitution: 1,
            width: 50,
            height: 50,
            color: 'rgba(0, 10, 150, 0.5)'
        });

        var ent2 = new RkmaxAABB(0, 0 , {
            mass: 4,
            velocity: new RkmaxVector2D(0.15, 0.1),
            restitution: 1,
            width: 100,
            height: 100,
            color: 'rgba(150, 10, 0, 0.5)'
        });

        App.entities.push(ent);
        App.entities.push(ent2);

        App.init();
    }
}

setControls = function() {
    var
        btnStop = document.getElementById('btn-stop'),
        btnStart = document.getElementById('btn-start')
    ;

    btnStop.addEventListener('mouseup', function() {
        App.stop();
    }, false);

    btnStart.addEventListener('mouseup', function() {
        App.play();
    }, false);

    document.getElementById('canvas').addEventListener('mousedown', function(event) {
        console.log(event);
    });
};


window.onload = function() {
    loadDeps();
    setControls();
    start();
};
