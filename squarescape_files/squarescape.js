var SQUARESCAPE = function(SQUARESCAPE) {
    "use strict";
    return SQUARESCAPE;
}(SQUARESCAPE || {});

SQUARESCAPE.assetList = function() {
    "use strict";
    return {
        audio: [ "squarescape/assets/audio/intro.mp3", "squarescape/assets/audio/music.mp3" ],
        audioSprite: [],
        graphic: [ "squarescape/assets/images/bg.png", "squarescape/assets/images/rotate.png", "squarescape/assets/images/sprites.png", "squarescape/assets/images/sprites.json" ]
    };
}();

SQUARESCAPE.GAME = {};

SQUARESCAPE.GAME.config = {
    grid: {
        rows: 24,
        cols: 16,
        groundHeight: 6
    },
    speed: -2,
    step: .028
};

window.speed = function (speed) { SQUARESCAPE.GAME.config.speed = speed; }

SQUARESCAPE.GAME.SCENE = {};

SQUARESCAPE.GAME.state = function() {
    "use strict";
    var state = {};
    function setState(key, value) {
        state[key] = value;
    }
    function getState(key) {
        if (key) {
            return state[key];
        }
        return state;
    }
    return {
        setState: setState,
        getState: getState
    };
}();

SQUARESCAPE.COMPONENT = {};

SQUARESCAPE.COMPONENT.viewPort = function() {
    "use strict";
    return {
        width: 1024,
        height: 768,
        scaleLarge: 1,
        scaleSmall: 1,
        tipPoint: 1.2
    };
}();

SQUARESCAPE.COMPONENT.rotate = function(viewPort, scene, Entity) {
    "use strict";
    var optionsBackground = {
        asset: "squarescape/assets/images/bg.png",
        x: 0,
        y: 0,
        anchor: {
            y: 0,
            x: .5
        },
        scale: {
            x: 6,
            y: 7
        },
        container: scene,
        type: "spriteFromFrame",
        name: "rotate.background"
    };
    var optionsForeground = {
        asset: "squarescape/assets/images/rotate.png",
        x: 0,
        y: viewPort.height / 2,
        anchor: {
            y: .5,
            x: .5
        },
        scale: {
            x: .5,
            y: .5
        },
        container: scene,
        type: "spriteFromFrame",
        name: "rotate.foreground"
    };
    var rotate = {
        background: null,
        foreground: null,
        show: function() {
            if (!rotate.background) {
                optionsBackground.at = scene.children.length;
                rotate.background = new Entity(optionsBackground).sprite;
                optionsForeground.at = scene.children.length;
                rotate.foreground = new Entity(optionsForeground).sprite;
            }
        },
        hide: function() {
            if (rotate.background) {
                rotate.background.parent.removeChild(rotate.background);
                rotate.foreground.parent.removeChild(rotate.foreground);
                rotate.background = null;
                rotate.foreground = null;
            }
        }
    };
    return rotate;
}(SQUARESCAPE.COMPONENT.viewPort, DUST.GRAPHIC.scene, DUST.GRAPHIC.Entity);

SQUARESCAPE.COMPONENT.keyboard = function(event) {
    "use strict";
    var listener = function(ev) {
        switch (ev.keyCode) {
          case 32:
          case 38:
            event.broadcast("game.tap");
            break;
        }
    };
    function bindKeyboard() {
        window.addEventListener("keydown", listener, false);
    }
    function unbindKeyboard() {
        window.removeEventListener("keydown", listener);
    }
    event.on("game.start", function() {
        bindKeyboard();
    });
    event.on("game.stop", function() {
        unbindKeyboard();
    });
}(DUST.event);

SQUARESCAPE.COMPONENT.LAYERS = {};

SQUARESCAPE.COMPONENT.LAYERS.bottom = function(scene, Entity) {
    "use strict";
    return new Entity({
        x: 0,
        y: 0,
        container: scene,
        type: "container",
        name: "layer.bottom"
    });
}(DUST.GRAPHIC.scene, DUST.GRAPHIC.Entity);

SQUARESCAPE.COMPONENT.LAYERS.middle = function(scene, Entity) {
    "use strict";
    return new Entity({
        x: 0,
        y: 0,
        container: scene,
        type: "container",
        name: "layer.middle"
    });
}(DUST.GRAPHIC.scene, DUST.GRAPHIC.Entity);

SQUARESCAPE.COMPONENT.LAYERS.top = function(scene, Entity) {
    "use strict";
    return new Entity({
        x: 0,
        y: 0,
        container: scene,
        type: "container",
        name: "layer.top"
    });
}(DUST.GRAPHIC.scene, DUST.GRAPHIC.Entity);

SQUARESCAPE.COMPONENT.grid = function(viewPort, rows, cols, groundHeight) {
    "use strict";
    var Cell = function(pos, w, h) {
        this.width = w;
        this.height = h;
        this.anchor = [ pos[0], pos[1] + h / 2 ];
    };
    var Grid = function(viewPort, rowsNum, colsNum, groundHeight) {
        var self = this;
        this.viewPort = viewPort;
        this.rowsNum = rowsNum;
        this.groundHeight = groundHeight;
        this.cellWidth = viewPort.width / colsNum;
        this.cellHeight = viewPort.height / rowsNum;
        this.cols = [];
        Object.defineProperties(this, {
            colsNum: {
                get: function() {
                    return self.cols.length;
                }
            }
        });
        this.ensureColCount(colsNum);
    };
    Grid.prototype.ensureColCount = function(num) {
        while (this.colsNum < num) {
            this.pushEmptyCol();
        }
    };
    Grid.prototype.pushEmptyCol = function() {
        var currentCol = [];
        while (currentCol.length < this.rowsNum) {
            currentCol.push(this.createCellInRowCol(currentCol.length, this.colsNum));
        }
        this.cols.push(currentCol);
    };
    Grid.prototype.getCell = function(row, col) {
        this.ensureColCount(col + 1);
        row = this.rowsNum - 1 - row - this.groundHeight;
        return this.cols[col][row];
    };
    Grid.prototype.getCol = function(n) {
        return this.cols[n];
    };
    Grid.prototype.getLastCol = function() {
        return this.getCol((this.cols || []).length - 1);
    };
    Grid.prototype.getFirstCol = function() {
        return this.getCol(0);
    };
    Grid.prototype.createCellInPos = function(x, y) {
        return new Cell([ x, y ], this.cellWidth, this.cellHeight);
    };
    Grid.prototype.createCellInRowCol = function(row, col) {
        var x = col * this.cellWidth - viewPort.width / 2;
        var y = row * this.cellHeight;
        return this.createCellInPos(x, y);
    };
    Grid.prototype.shiftCol = function() {
        return this.cols.shift();
    };
    Grid.prototype.pushCol = function() {};
    return new Grid(viewPort, rows, cols, groundHeight);
}(SQUARESCAPE.COMPONENT.viewPort, SQUARESCAPE.GAME.config.grid.rows, SQUARESCAPE.GAME.config.grid.cols, SQUARESCAPE.GAME.config.grid.groundHeight);

SQUARESCAPE.COMPONENT.background = function(event, Entity, viewPort, bottom) {
    "use strict";
    var Background = function() {
        var self = this;
        this.entity = [ new Entity({
            asset: "bg.png",
            x: viewPort.width * 2 - 2,
            y: 0,
            anchor: {
                x: .5,
                y: 0
            },
            container: bottom,
            type: "spriteFromFrame",
            name: "background"
        }), new Entity({
            asset: "bg.png",
            x: viewPort.width - 1,
            y: 0,
            anchor: {
                x: .5,
                y: 0
            },
            container: bottom,
            type: "spriteFromFrame",
            name: "background"
        }), new Entity({
            asset: "bg.png",
            x: 0,
            y: 0,
            anchor: {
                x: .5,
                y: 0
            },
            container: bottom,
            type: "spriteFromFrame",
            name: "background"
        }), new Entity({
            asset: "bg.png",
            x: -viewPort.width + 1,
            y: 0,
            anchor: {
                x: .5,
                y: 0
            },
            container: bottom,
            type: "spriteFromFrame",
            name: "background"
        }), new Entity({
            asset: "bg.png",
            x: -viewPort.width * 2 + 2,
            y: 0,
            anchor: {
                x: .5,
                y: 0
            },
            container: bottom,
            type: "spriteFromFrame",
            name: "background"
        }) ];
        event.on("game.color", function(color) {
            self.entity.forEach(function(bg) {
                bg.sprite.tint = parseInt("0x" + color, 16);
            });
        });
        event.on("game.move", function(amount) {
            self.entity.forEach(function(bg) {
                bg.sprite.x -= amount * 128 / 6;
                if (bg.sprite.x < bg.properties.x - 1024) {
                    bg.sprite.x = bg.properties.x;
                }
            });
        });
        event.on("game.start", function() {
            self.entity.forEach(function(bg) {
                bg.sprite.interactive = bg.sprite.buttonMode = true;
            });
        });
        event.on("game.stop", function() {
            self.entity.forEach(function(bg) {
                bg.sprite.interactive = bg.sprite.buttonMode = false;
            });
        });
        self.entity.forEach(function(bg) {
            bg.sprite.touchstart = bg.sprite.mousedown = function() {
                event.broadcast("game.tap");
            };
        });
        return this;
    }, instance = null;
    return function() {
        if (!instance) {
            instance = new Background();
        }
        return instance;
    };
}(DUST.event, DUST.GRAPHIC.Entity, SQUARESCAPE.COMPONENT.viewPort, SQUARESCAPE.COMPONENT.LAYERS.bottom);

SQUARESCAPE.COMPONENT.shadow = function(event, scene, Entity, viewPort, bottom) {
    "use strict";
    var Shadow = function() {
        var self = this;
        this.entity = new Entity({
            asset: "shadow.png",
            x: 0,
            y: 0,
            anchor: {
                x: .5,
                y: 0
            },
            scale: {
                x: 1,
                y: 1
            },
            container: bottom,
            type: "spriteFromFrame",
            name: "shadow"
        });
        this.resize = function() {
            self.entity.sprite.width = window.innerWidth / scene.scale.x;
        };
        this.resize();
        window.addEventListener("resize", this.resize);
        window.addEventListener("deviceOrientation", this.resize);
        return this;
    }, instance = null;
    return function() {
        if (!instance) {
            instance = new Shadow();
        }
        return instance;
    };
}(DUST.event, DUST.GRAPHIC.scene, DUST.GRAPHIC.Entity, SQUARESCAPE.COMPONENT.viewPort, SQUARESCAPE.COMPONENT.LAYERS.bottom);

SQUARESCAPE.COMPONENT.floor = function(event, stage, Entity, config, viewPort, middle) {
    "use strict";
    var Floor = function() {
        var self = this;
        this.mover = new Entity({
            x: 0,
            y: 0,
            invisible: true,
            name: "mover",
            physics: {
                mass: 0,
                enable: true,
                kinematic: true,
                width: 1,
                height: 1,
                collisionGroup: Math.pow(2, 2),
                collisionMask: Math.pow(2, 2)
            }
        });
        this.mover.physics.velocity[0] = config.speed;
        this.plane = new Entity({
            x: 0,
            y: 576,
            invisible: true,
            name: "plane",
            physics: {
                mass: 0,
                enable: true,
                isPlane: true,
                collisionGroup: Math.pow(2, 0),
                collisionMask: Math.pow(2, 1)
            }
        });
        this.entity = [ new Entity({
            asset: "floor.png",
            x: viewPort.width * 2 - 2,
            y: 576,
            anchor: {
                x: .5,
                y: 0
            },
            container: middle,
            type: "spriteFromFrame",
            name: "floor"
        }), new Entity({
            asset: "floor.png",
            x: viewPort.width - 1,
            y: 576,
            anchor: {
                x: .5,
                y: 0
            },
            container: middle,
            type: "spriteFromFrame",
            name: "floor"
        }), new Entity({
            asset: "floor.png",
            x: 0,
            y: 576,
            anchor: {
                x: .5,
                y: 0
            },
            container: middle,
            type: "spriteFromFrame",
            name: "floor"
        }), new Entity({
            asset: "floor.png",
            x: -viewPort.width + 1,
            y: 576,
            anchor: {
                x: .5,
                y: 0
            },
            container: middle,
            type: "spriteFromFrame",
            name: "floor"
        }), new Entity({
            asset: "floor.png",
            x: -viewPort.width * 2 + 2,
            y: 576,
            anchor: {
                x: .5,
                y: 0
            },
            container: middle,
            type: "spriteFromFrame",
            name: "floor"
        }) ];
        this.plane.physics.name = "floor";
        this.plane.physics.angle = Math.PI;
        event.on("game.move", function(amount) {
            self.entity.forEach(function(floor) {
                floor.sprite.x -= amount * 128;
                if (floor.sprite.x < floor.properties.x - 1024) {
                    floor.sprite.x = floor.properties.x;
                }
            });
        });
        event.on("player.killed", function() {
            self.mover.physics.previousPosition[0] = 0;
            self.mover.physics.position[0] = 0;
        });
        event.on("game.start", function() {
            self.entity.forEach(function(bg) {
                bg.sprite.interactive = bg.sprite.buttonMode = true;
            });
        });
        event.on("game.stop", function() {
            self.entity.forEach(function(bg) {
                bg.sprite.interactive = bg.sprite.buttonMode = false;
            });
        });
        self.entity.forEach(function(bg) {
            bg.sprite.touchstart = bg.sprite.mousedown = function() {
                event.broadcast("game.tap");
            };
        });
        stage.addToLoop(function() {
            event.broadcast("game.move", self.mover.physics.previousPosition[0] - self.mover.physics.position[0]);
            event.broadcast("game.position", self.mover.physics.position[0]);
        }, "testmeloop");
        return this;
    }, instance = null;
    return function() {
        if (!instance) {
            instance = new Floor();
        }
        return instance;
    };
}(DUST.event, DUST.GRAPHIC.stage, DUST.GRAPHIC.Entity, SQUARESCAPE.GAME.config, SQUARESCAPE.COMPONENT.viewPort, SQUARESCAPE.COMPONENT.LAYERS.middle);

SQUARESCAPE.COMPONENT.Tail = function(bottom, textureFromFile, particle) {
    "use strict";
    var texture = textureFromFile("squarescape/assets/animations/particle.png");
    return function() {
        var self = this;
        this.emitter = new Proton.BehaviourEmitter();
        this.emitter.rate = new Proton.Rate(1, .02);
        this.emitter.addInitialize(new Proton.Mass(1));
        this.emitter.addInitialize(new Proton.Life(.5, 1));
        this.emitter.addInitialize(new Proton.ImageTarget(texture));
        this.emitter.addInitialize(new Proton.V(new Proton.Span(7, 12), new Proton.Span(265, 290), "polar"));
        this.emitter.addBehaviour(new Proton.Color("ffffff"));
        this.emitter.addBehaviour(new Proton.Alpha(1, .1));
        this.emitter.addBehaviour(new Proton.Scale(2, .01));
        this.emitter.alpha = 0;
        particle(bottom.sprite).engine.addEmitter(this.emitter);
        this.start = function() {
            self.running = true;
            self.emitter.emit();
        };
        this.stop = function() {
            self.running = false;
            self.emitter.stopEmit();
        };
        this.move = function(position) {
            self.emitter.p.x = position.x - 5;
            self.emitter.p.y = position.y + 15;
        };
    };
}(SQUARESCAPE.COMPONENT.LAYERS.bottom, DUST.GRAPHIC.HELPERS.textureFromFile, DUST.particle);

SQUARESCAPE.COMPONENT.Explosion = function(bottom, textureFromFile, particle) {
    "use strict";
    var texture = textureFromFile("squarescape/assets/animations/particle_pink.png"), secondTexture = textureFromFile("squarescape/assets/animations/particle.png");
    return function(yellow, life, velocity) {
        var self = this, targetTexture = texture;
        if (yellow) {
            targetTexture = secondTexture;
        }
        this.emitter = new Proton.BehaviourEmitter();
        this.emitter.rate = new Proton.Rate(1 * (life || 1), .01);
        this.emitter.addInitialize(new Proton.Mass(1));
        this.emitter.addInitialize(new Proton.Life(.25, life || .5));
        this.emitter.addInitialize(new Proton.ImageTarget(targetTexture));
        this.emitter.addInitialize(new Proton.V(new Proton.Span(5, velocity || 6), new Proton.Span(0, 360), "polar"));
        this.emitter.addBehaviour(new Proton.Color("ffffff"));
        this.emitter.addBehaviour(new Proton.Alpha(1, .1));
        this.emitter.addBehaviour(new Proton.Scale(3.5, .01));
        particle(bottom.sprite).engine.addEmitter(this.emitter);
        this.start = function(time) {
            self.running = true;
            self.emitter.emit();
            window.setTimeout(function() {
                self.stop();
            }, time || 50);
        };
        this.stop = function() {
            self.running = false;
            self.emitter.stopEmit();
        };
        this.move = function(position) {
            self.emitter.p.x = position.x + 20;
            self.emitter.p.y = position.y;
        };
    };
}(SQUARESCAPE.COMPONENT.LAYERS.bottom, DUST.GRAPHIC.HELPERS.textureFromFile, DUST.particle);

SQUARESCAPE.COMPONENT.Square = function(event, scene, stage, Entity, floor, viewPort, top, grid, Tail, Explosion, p2) {
    "use strict";
    var Square = function(settings) {
        this.settings = settings;
        this.configure();
        this.build();
        this.events();
        return this;
    };
    Square.prototype.configure = function() {
        this.cell = grid.getCell(this.settings.grid[0], this.settings.grid[1]);
        this.targetRotation = 0;
        this.explosion = new Explosion(true, 3, 7);
        this.settings.asset = "player_32.png";
        this.settings.container = top;
        this.settings.type = "spriteFromFrame";
        this.settings.physics = {
            enable: true,
            width: 32,
            height: 32,
            mass: 1e-5,
            fixedRotation: true,
            collisionGroup: Math.pow(2, 1),
            collisionMask: Math.pow(2, 0)
        };
        this.settings.anchor = {
            x: .5,
            y: .5
        };
        this.settings.x = this.cell.anchor[0];
        this.settings.y = this.cell.anchor[1];
    };
    Square.prototype.build = function() {
        var self = this;
        this.entity = new Entity(this.settings);
        this.entity.sprite.rotation = 0;
        this.entity.physics.name = this.settings.name;
        this.entity.onBeforeRemove = function() {
            self.tail.stop();
            stage.removeFromLoop(self.settings.name + ".tail.move");
        };
        this.tail = new Tail();
        this.tail.start();
        this.alive = true;
        stage.addToLoop(function() {
            self.loop();
        }, this.settings.name + ".tail.move");
    };
    Square.prototype.action = function(action, data, success) {
        var self = this, offset;
        if (action === "jump") {
            if (this.alive) {
                if (this.isColliding()) {
                    this.entity.physics.velocity[1] = -4.5;
                    this.targetRotation += Math.PI * 2;
                    success && success();
                }
            }
        }
        if (data) {
            offset = (data.x + data.offset + floor().mover.physics.position[0] * 128) / 128;
        }
        if (offset && this.alive && (action === "jump" || action === "sync")) {
            this.entity.physics.position[0] = offset;
            this.entity.physics.position[1] = data.y / 128;
        }
        if (action === "respawn") {
            this.entity.physics.velocity[0] = 0;
            this.entity.physics.velocity[1] = 0;
            this.entity.physics.position[0] = this.cell.anchor[0] / 128;
            this.entity.physics.position[1] = this.cell.anchor[1] / 128;
            this.alive = true;
            this.entity.animationEnable();
            this.entity.sprite.animate.fade(.5, function() {
                self.entity.animationDisable();
            });
        }
        if (action === "killed") {
            this.tail.stop();
            this.entity.sprite.alpha = 0;
            this.alive = false;
        }
    };
    Square.prototype.events = function() {
        var self = this;
        event.on(this.settings.name + ".kill", function() {
            self.destroy();
        });
        event.on(this.settings.name + ".respawn", function() {
            if (!self.alive) {
                self.alive = true;
                self.entity.physics.velocity[0] = 0;
                self.entity.physics.position[0] = self.cell.anchor[0] / 128;
                self.targetRotation = 0;
                self.entity.sprite.rotation = 0;
                self.entity.selfAttach();
                self.entity.animationEnable();
                self.entity.sprite.animate.fade(1, function() {
                    self.entity.animationDisable();
                });
                self.entity.physics.velocity[0] = 0;
                self.entity.physics.velocity[1] = 0;
                self.entity.physics.position[0] = self.cell.anchor[0] / 128;
                self.entity.physics.position[1] = self.cell.anchor[1] / 128;
                stage.addToLoop(function() {
                    self.loop();
                }, self.settings.name + ".tail.move");
            }
        });
        event.on("game.position", function(position) {
            self.offset = -position * 128;
        });
    };
    Square.prototype.loop = function() {
        if (this.entity) {
            if (this.entity.physics.position[0] < this.cell.anchor[0] / 128 && this.entity.physics.velocity[1] < -.5) {
                this.entity.physics.velocity[0] = -this.entity.physics.position[0] + this.cell.anchor[0] / 128;
                if (this.entity.physics.velocity[0] > 3) {
                    this.entity.physics.velocity[0] = 3;
                }
            } else {
                this.entity.physics.velocity[0] = 0;
            }
            if (this.targetRotation && this.targetRotation > this.entity.sprite.rotation) {
                this.entity.sprite.rotation += .2;
            } else if (this.targetRotation && this.targetRotation <= this.entity.sprite.rotation) {
                this.entity.sprite.rotation = this.targetRotation;
            }
            if (this.isColliding()) {
                if (!this.tail.running && this.alive) {
                    this.tail.start();
                }
                this.tail.move({
                    x: this.entity.sprite.x,
                    y: this.entity.sprite.y
                });
            } else {
                this.tail.stop();
            }
            if (this.settings.fragile) {
                if (this.entity.physics.position[0] < -3 && this.alive) {
                    this.destroy();
                }
            }
        }
    };
    Square.prototype.isColliding = function() {
        var world = this.entity.physics.world;
        for (var i = 0; i < world.narrowphase.contactEquations.length; i++) {
            var c = world.narrowphase.contactEquations[i];
            if (c.bodyA === this.entity.physics || c.bodyB === this.entity.physics) {
                var d = p2.vec2.dot(c.normalA, p2.vec2.fromValues(0, 1));

                if (c.bodyA === this.entity.physics) {
                    d *= -1;
                }
                if (d < -.5) {
                    return true;
                }
            }
        }
        return false;
    };
    Square.prototype.destroy = function() {
        if (this.alive) {
            this.alive = false;
            this.explosion.start(200);
            this.explosion.move({
                x: this.entity.sprite.x - 60,
                y: this.entity.sprite.y
            });
            this.entity.sprite.alpha = 0;
            this.entity.selfRemove();
            event.broadcast(this.settings.name + ".killed");
        }
    };
    return Square;
}(DUST.event, DUST.GRAPHIC.scene, DUST.GRAPHIC.stage, DUST.GRAPHIC.Entity, SQUARESCAPE.COMPONENT.floor, SQUARESCAPE.COMPONENT.viewPort, SQUARESCAPE.COMPONENT.LAYERS.top, SQUARESCAPE.COMPONENT.grid, SQUARESCAPE.COMPONENT.Tail, SQUARESCAPE.COMPONENT.Explosion, p2);

SQUARESCAPE.COMPONENT.playerGhost = function(event, events, Square) {
    "use strict";
    var playerGhost;
    return function() {
        if (!playerGhost) {
            playerGhost = new Square({
                name: "playerGhost",
                grid: [ 0, 6 ]
            });
            playerGhost.entity.sprite.alpha = .5;
            playerGhost.entity.sprite.tint = 65280;
            playerGhost.jumpSuccess = function() {
                console.log("ghost jumped");
            };

        }
        return playerGhost;
    };
}(DUST.event, SQUARESCAPE.COMPONENT.Square);

SQUARESCAPE.COMPONENT.player = function(event, Square, playerGhost) {
    "use strict";
    var player;
    return function() {
        if (!player) {
            player = new Square({
                name: "player",
                grid: [ 0, 6 ],
                fragile: true
            });

            event.on("game.tap", function() {
                player.action("jump", null, player.jumpSuccess);
            });
        }
        return player;
    };
}(DUST.event, SQUARESCAPE.COMPONENT.Square, SQUARESCAPE.COMPONENT.playerGhost);

SQUARESCAPE.COMPONENT.ghost = function(event, Entity, top, grid, floor) {
    "use strict";
    var ghostCell = grid.getCell(0, 6);
    var Ghost = function() {
        var self = this, floorRef = floor();
        this.entity = new Entity({
            asset: "player_32.png",
            x: ghostCell.anchor[0],
            y: ghostCell.anchor[1],
            anchor: {
                x: .5,
                y: .5
            },
            scale: {
                x: 1,
                y: 1
            },
            container: top,
            type: "spriteFromFrame",
            name: "ghost"
        });
        this.entity.sprite.alpha = 0;

        return this;
    }, instance = null;
    return function() {
        if (!instance) {
            instance = new Ghost();
        }
        return instance;
    };
}(DUST.event, DUST.GRAPHIC.Entity, SQUARESCAPE.COMPONENT.LAYERS.top, SQUARESCAPE.COMPONENT.grid, SQUARESCAPE.COMPONENT.floor);

SQUARESCAPE.COMPONENT.buttonPlay = function(event, scenes, Entity, top, Explosion) {
    "use strict";
    var ButtonPlay = function() {
        var self = this;
        this.entity = new Entity({
            asset: "buttonPlay.png",
            x: 0,
            y: 300,
            anchor: {
                x: .5,
                y: .5
            },
            scale: {
                x: .8,
                y: .8
            },
            container: top,
            type: "spriteFromFrame",
            name: "buttonPlay"
        });
        this.explosion = new Explosion(true, 10, 12);
        this.entity.sprite.interactive = this.entity.sprite.buttonMode = true;
        this.entity.sprite.touchstart = this.entity.sprite.mousedown = function() {
            self.explosion.start();
            self.explosion.move({
                x: 0,
                y: 400
            });
            scenes.switch("main");
        };
        event.on("welcome.start", function() {
            self.entity.selfAttach();
        });
        event.on("game.start", function() {
            self.entity.selfRemove();
        });
        return this;
    }, instance = null;
    return function() {
        if (!instance) {
            instance = new ButtonPlay();
        }
        return instance;
    };
}(DUST.event, DUST.scenes, DUST.GRAPHIC.Entity, SQUARESCAPE.COMPONENT.LAYERS.top, SQUARESCAPE.COMPONENT.Explosion);

SQUARESCAPE.COMPONENT.BLOCKS = {};

SQUARESCAPE.COMPONENT.BLOCKS.Block = function(event, stage, Entity, viewPort, middle, config, grid) {
    "use strict";
    var Block = function(row, col, version, offset, initial, inverted) {
        var self = this;
        this.initial = initial;
        this.cell = grid.getCell(row, col);
        this.entity = new Entity({
            asset: "block_32_" + (version || "middle") + ".png",
            x: offset,
            y: this.cell.anchor[1],
            anchor: {
                x: .5,
                y: .5
            },
            container: middle,
            type: "spriteFromFrame",
            name: "block" + row + col,
            physics: {
                enable: true,
                width: this.cell.width,
                height: this.cell.height,
                mass: 1e-4,
                fixedRotation: true,
                kinematic: true,
                collisionGroup: Math.pow(2, 0),
                collisionMask: Math.pow(2, 1)
            }
        });
        this.entity.selfRemove();
        this.entity.physics.velocity[0] = config.speed;
        this.entity.sprite.alpha = 0;
        if (inverted) {
            this.entity.sprite.rotation = Math.PI;
        }
        this.entity.onAfterAttach = function() {
            self.entity.animationEnable();
            self.entity.sprite.speed = .4 + Math.random() * .3;
            self.entity.sprite.acceleration = .2 + Math.random() * .1;
            self.entity.sprite.animate.fade(1, function() {
                self.entity.sprite.speed = 1;
                self.entity.sprite.acceleration = 0;
                self.entity.animationDisable();
            });
            stage.addToLoop(function() {
                if (self.entity.physics.position[0] < -3) {
                    self.fade();
                }
                if (self.entity.physics.position[0] < -6) {
                    self.destroy();
                }
            }, "platform.loop" + row + "_" + col);
        };
        this.entity.onBeforeRemove = function() {
            stage.removeFromLoop("platform.loop" + row + "_" + col);
        };
        this.entity.selfAttach();
        this.fade = function(action) {
            self.entity.animationEnable();
            self.entity.sprite.speed = .2 * Math.random() + .05;
            self.entity.sprite.acceleration = .5 * Math.random();
            self.entity.sprite.animate.fade(.01, function() {
                self.entity.sprite.speed = 1;
                self.entity.sprite.acceleration = 1;
                self.entity.animationDisable();
                if (action) {
                    action();
                }
            });
        };
        this.destroy = function() {
            self.entity.selfRemove();
            if (self.lastOne) {
                self.lastOne = false;
                event.broadcast("column.was.removed");
            }
        };
        return this;
    };
    return Block;
}(DUST.event, DUST.GRAPHIC.stage, DUST.GRAPHIC.Entity, SQUARESCAPE.COMPONENT.viewPort, SQUARESCAPE.COMPONENT.LAYERS.middle, SQUARESCAPE.GAME.config, SQUARESCAPE.COMPONENT.grid);

SQUARESCAPE.COMPONENT.BLOCKS.Platform = function(event, stage, Entity, viewPort, middle, config, grid) {
    "use strict";
    var Platform = function(row, col, version, offset, initial) {
        var self = this;
        this.initial = initial;
        this.cell = grid.getCell(row, col);
        this.entity = new Entity({
            asset: "platform_32.png",
            x: offset,
            y: this.cell.anchor[1],
            anchor: {
                x: .5,
                y: .5
            },
            scale: {
                x: 1,
                y: 1
            },
            container: middle,
            type: "spriteFromFrame",
            name: "platform" + row + col,
            physics: {
                enable: true,
                width: this.cell.width,
                height: this.cell.height,
                mass: 1e-4,
                kinematic: true,
                collisionGroup: Math.pow(2, 0),
                collisionMask: Math.pow(2, 1)
            }
        });
        this.entity.selfRemove();
        this.entity.physics.velocity[0] = config.speed;
        this.entity.sprite.alpha = 0;
        this.entity.onAfterAttach = function() {
            self.entity.animationEnable();
            self.entity.sprite.speed = .4 + Math.random() * .3;
            self.entity.sprite.animate.fade(1, function() {
                self.entity.sprite.speed = 1;
                self.entity.sprite.acceleration = 0;
                self.entity.animationDisable();
            });
            stage.addToLoop(function() {
                if (self.entity.physics.position[0] < -3) {
                    self.fade();
                }
                if (self.entity.physics.position[0] < -6) {
                    self.destroy();
                }
            }, "platform.loop" + row + "_" + col);
        };
        this.entity.onBeforeRemove = function() {
            stage.removeFromLoop("platform.loop" + row + "_" + col);
        };
        this.entity.selfAttach();
        this.fade = function(action) {
            self.entity.animationEnable();
            self.entity.sprite.speed = Math.random() * .3 + .5;
            self.entity.sprite.acceleration = Math.random() * .1;
            self.entity.sprite.acceleration = 0;
            self.entity.sprite.animate.fade(.01, function() {
                self.entity.sprite.speed = 1;
                self.entity.sprite.acceleration = 1;
                self.entity.animationDisable();
                if (action) {
                    action();
                }
            });
        };
        this.destroy = function() {
            self.entity.selfRemove();
            if (self.lastOne) {
                self.lastOne = false;
                event.broadcast("column.was.removed");
            }
        };
        return this;
    };
    return Platform;
}(DUST.event, DUST.GRAPHIC.stage, DUST.GRAPHIC.Entity, SQUARESCAPE.COMPONENT.viewPort, SQUARESCAPE.COMPONENT.LAYERS.middle, SQUARESCAPE.GAME.config, SQUARESCAPE.COMPONENT.grid);

SQUARESCAPE.COMPONENT.BLOCKS.Spikes = function(event, stage, Entity, viewPort, middle, config, grid) {
    "use strict";
    var Spikes = function(row, col, version, offset, initial, inverted) {
        var self = this;
        this.initial = initial;
        this.cell = grid.getCell(row, col);
        this.entity = new Entity({
            asset: "spikes_64_" + (version || 1) + ".png",
            x: offset,
            y: this.cell.anchor[1],
            anchor: {
                x: .5,
                y: .5
            },
            container: middle,
            type: "spriteFromFrame",
            name: "spike" + row + col,
            physics: {
                enable: true,
                width: this.cell.width - 6,
                height: this.cell.height - 6,
                mass: 1e-4,
                fixedRotation: true,
                kinematic: true,
                collisionGroup: Math.pow(2, 0),
                collisionMask: Math.pow(2, 1)
            }
        });
        this.entity.selfRemove();
        this.entity.physics.velocity[0] = config.speed;
        this.entity.physics.impactHandler = function(impact) {
            if (impact.bodyA.name === "player" || impact.bodyB.name === "player") {
                event.broadcast("player.kill");
            }
        };
        this.entity.sprite.alpha = 0;
        if (inverted) {
            this.entity.sprite.rotation = Math.PI;
        }
        this.entity.onAfterAttach = function() {
            self.entity.animationEnable();
            self.entity.sprite.speed = .4 + Math.random() * .3;
            self.entity.sprite.acceleration = .2;
            self.entity.sprite.animate.fade(1, function() {
                self.entity.sprite.speed = 1;
                self.entity.sprite.acceleration = 0;
                self.entity.animationDisable();
            });
            stage.addToLoop(function() {
                if (self.entity.physics.position[0] < -3) {
                    self.fade();
                }
                if (self.entity.physics.position[0] < -6) {
                    self.destroy();
                }
            }, "platform.loop" + row + "_" + col);
        };
        this.entity.onBeforeRemove = function() {
            stage.removeFromLoop("platform.loop" + row + "_" + col);
        };
        this.entity.selfAttach();
        this.fade = function(action) {
            self.entity.animationEnable();
            self.entity.sprite.speed = Math.random() * .3 + .5;
            self.entity.sprite.acceleration = Math.random() * .1;
            self.entity.sprite.acceleration = 0;
            self.entity.sprite.animate.fade(.01, function() {
                self.entity.sprite.speed = 1;
                self.entity.sprite.acceleration = 1;
                self.entity.animationDisable();
                if (action) {
                    action();
                }
            });
        };
        this.destroy = function() {
            self.entity.selfRemove();
            if (self.lastOne) {
                self.lastOne = false;
                event.broadcast("column.was.removed");
            }
        };
        return this;
    };
    return Spikes;
}(DUST.event, DUST.GRAPHIC.stage, DUST.GRAPHIC.Entity, SQUARESCAPE.COMPONENT.viewPort, SQUARESCAPE.COMPONENT.LAYERS.middle, SQUARESCAPE.GAME.config, SQUARESCAPE.COMPONENT.grid);

SQUARESCAPE.COMPONENT.LEVEL = {};

SQUARESCAPE.COMPONENT.LEVEL.ColumnManager = function(Block, Platform, Spikes) {
    "use strict";
    var ColumnManager = function(column, colNum, initial) {
        this.column = column;
        this.colNum = colNum;
        this.initial = initial;
        this.items = [];
    };
    ColumnManager.prototype.types = {
        block: Block,
        platform: Platform,
        spikes: Spikes
    };
    ColumnManager.prototype.destroy = function() {
        this.items.forEach(function(obstacle) {
            obstacle.fade(function() {
                obstacle.destroy();
            });
        });
    };
    ColumnManager.prototype.load = function(prevX) {
        var self = this;
        if (isNaN(prevX)) {
            prevX = 0;
        }
        (this.column || []).forEach(function(item) {
            if (self.types[item.type]) {
                var Obstacle = self.types[item.type];
                var obstacle = new Obstacle(item.row, self.colNum, item.version, (prevX + 64 / 128) * 128, self.initial, item.inverted);
                self.items.push(obstacle);
            }
        });
        if (self.items.length === 0) {
            var watcher = new self.types.platform(-2, self.colNum, null, (prevX + 64 / 128) * 128, true);
            self.items.push(watcher);
            watcher.entity.sprite.visible = false;
        }
        self.items[0].lastOne = true;
    };
    return ColumnManager;
}(SQUARESCAPE.COMPONENT.BLOCKS.Block, SQUARESCAPE.COMPONENT.BLOCKS.Platform, SQUARESCAPE.COMPONENT.BLOCKS.Spikes);

SQUARESCAPE.COMPONENT.LEVEL.LevelManager = function(event, stage, ColumnManager) {
    "use strict";
    var LevelManager = function(genLevel) {
        var self = this;
        this.genLevel = genLevel;
        this.columns = [];
        this.alive = true;
        this.init();
        event.on("player.killed", function() {
            if (self.alive) {
                self.reset();
            }
        });
    };
    LevelManager.prototype.destroy = function() {
        if (this.loader) {
            window.clearTimeout(this.loader);
        }
        this.alive = false;
        this.columns.forEach(function(column) {
            column.destroy();
        });
        while (this.columns.length) {
            this.columns.pop();
        }
    };
    LevelManager.prototype.reset = function() {
        var self = this;
        this.destroy();
        this.loader = window.setTimeout(function() {
            self.alive = true;
            event.broadcast("player.respawn");
            self.init(true);
        }, 4e3);
        return true;
    };
    LevelManager.prototype.init = function(restart) {
        var self = this;
        this.lastShowed = 25;
        this.level = this.genLevel();
        this.level.forEach(function(column, colNum) {
            if (colNum < self.lastShowed) {
                self.processColumn(column, colNum, true);
            }
        });
        if (!restart) {
            event.on("column.was.removed", function() {
                if (self.alive) {
                    self.processColumn(self.level[self.lastShowed], self.lastShowed++);
                }
            });
        }
    };
    LevelManager.prototype.processColumn = function(column, colNum, initial) {
        var columnManager = new ColumnManager(column, colNum, initial);
        this.columns.push(columnManager);
        var prevX = 0;
        if (this.columns[this.columns.length - 2]) {
            var item = this.columns[this.columns.length - 2].items[0];
            prevX = item.entity.physics.position[0];
        }
        columnManager.load(prevX);
    };
    return LevelManager;
}(DUST.event, DUST.GRAPHIC.stage, SQUARESCAPE.COMPONENT.LEVEL.ColumnManager);

/*global SQUARESCAPE*/

SQUARESCAPE.COMPONENT.LEVEL.example = (function() {
    'use strict';

    var MAX_ROW = 17;
    var MIN_ROW = 0;
    var LAST_ROW = 0;

    function getPlanePlatforms(row, length) {
        var ret = [];
        for (var i = 0; i < length; i++) {
            ret.push([genPlatform(row)]);
        }
        LAST_ROW = row;
        return ret;
    }

    function genPlatform(row) {
        LAST_ROW = row;
        return {type: 'platform', row: row};
    }

    function getStairs(from, to, stepLenght) {
        stepLenght = stepLenght || 1;
        var dir = to > from;
        dir = dir > 0 ? 1 : -1;
        var curr = from;
        var ret = [];

        while (curr !== to) {
            ret = ret.concat(getPlanePlatforms(curr, stepLenght));
            curr += dir;
        }

        return ret;
    }

    function buildBlock(height, upsideDown, from, spikesProbability) {
        var ret = [],
            inverted = upsideDown;

        upsideDown = !!upsideDown;
        from = from || (upsideDown ? MAX_ROW : MIN_ROW);
        upsideDown = upsideDown ? -1 : 1;
        for (var i = 0; i < height; i++) {
            ret.push({type: 'block', row: from + upsideDown * i, version: 'middle', inverted: inverted});
        }

        var last = (ret[ret.length - 1] || {});

        if (Math.random() < spikesProbability) {
            last.type = 'spikes';
            last.version = getRandomInt(1, 4);
            last.inverted = inverted;
        } else {
            last.version = 'top';
        }

        if (!upsideDown) {
            LAST_ROW = height;
        }
        return ret;
    }

    function getPlaneBlocks(row, length, upsideDown, from) {
        var ret = [];
        for (var i = 0; i < length; i++) {
            ret.push(buildBlock(row, upsideDown, from));
        }
        LAST_ROW = row;
        return ret;
    }

    function getBlocksTunnel(row, length, height) {
        var ret = [];
        for (var i = 0; i < length; i++) {
            ret.push(getBlocksTunnelSection(row, height));
        }
        LAST_ROW = row;
        return ret;
    }

    function genRandomBlocksTunnel(current, length, height, goDownChances, goUpChances, spikesProbabilityTop, spikesProbabilityBottom) {
        var ret = [];
        goDownChances = goDownChances || 0.2;
        goUpChances = goUpChances || 0.2;

        spikesProbabilityTop = spikesProbabilityTop || 0.5;
        spikesProbabilityBottom = spikesProbabilityBottom || 0.05;

        function incCurrent() {
            var rand = Math.random();
            var val = rand < goDownChances ? -1 : (rand > (1 - goUpChances) ? 1 : 0);
            current += val;
            if (current > MAX_ROW - height) {
                current = MAX_ROW - height;
            }
            if (current < MIN_ROW) {
                current = MIN_ROW;
            }
            LAST_ROW = current;
            return current;
        }

        for (var i = 0; i < length; i++) {
            incCurrent();
            ret.push(getBlocksTunnelSection(current, height, spikesProbabilityTop, spikesProbabilityBottom));
        }

        return ret;
    }

    function getBlocksTunnelSection(row, height, spikesProbabilityTop, spikesProbabilityBottom) {
        var lowerBlock = buildBlock(Math.max(1, row), false, null, spikesProbabilityBottom);
        LAST_ROW = row;
        var higherBlockHeight = MAX_ROW - row - height;
        if (higherBlockHeight <= 1) {
            higherBlockHeight = 1;
        }

        var higherBlock = buildBlock(higherBlockHeight, true, null, spikesProbabilityTop);

        return lowerBlock.concat(higherBlock);
    }

    function genRandomPlatforms(current, length, goDownChances, goUpChances) {
        var oneBefore = current;
        var ret = [];
        goDownChances = goDownChances || 0.2;
        goUpChances = goUpChances || 0.2;

        function incCurrent() {
            var rand = Math.random();
            var val = rand < goDownChances ? -1 : (rand > (1 - goUpChances) ? 1 : 0);
            oneBefore = current;
            current += val;
            if (current > MAX_ROW) {
                current = MAX_ROW;
            }
            if (current < MIN_ROW) {
                current = MIN_ROW;
            }

            LAST_ROW = current;
            return current;
        }

        for (var i = 0; i < length; i++) {
            incCurrent();
            var col = [];
            col.push({type: 'platform', row: current});
            if (current !== oneBefore) {
                col.push({type: 'platform', row: oneBefore});
            }
            ret.push(col);
        }

        return ret;
    }

    function getEmptySpace(length) {
        if (length > 2) {
            LAST_ROW = 0;
        }

        return Array.apply(null, new Array(length)).map(function() {
            return [];
        });
    }

    function HERE_YOU_DIE() {
        return genRandomBlocksTunnel(LAST_ROW, 25, 8, 0, 0, 1, 1);
    }

    var sections = [
        getEmptySpace(7),

        genRandomBlocksTunnel(LAST_ROW, 20, 12, 0.1, 0.9),
        genRandomBlocksTunnel(LAST_ROW, 20, 8, 0, 0.9),
        getStairs(LAST_ROW, 2, 2),
        getPlanePlatforms(LAST_ROW, 10),
        getStairs(LAST_ROW, 5, 1),
        genRandomBlocksTunnel(LAST_ROW, 10, 10, 0.2, 0.3),
        getPlanePlatforms(LAST_ROW, 10),
        genRandomBlocksTunnel(LAST_ROW, 10, 10, 0.2, 0.3),
        getPlanePlatforms(LAST_ROW, 10),
        genRandomBlocksTunnel(LAST_ROW, 10, 10, 0.2, 0.3),
        genRandomPlatforms(LAST_ROW, 10),
        genRandomBlocksTunnel(LAST_ROW, 20, 10, 0.2, 0.3),
        getEmptySpace(2),
        genRandomPlatforms(LAST_ROW, 10),
        getEmptySpace(2),
        genRandomPlatforms(LAST_ROW, 10),
        getEmptySpace(2),
        genRandomPlatforms(LAST_ROW, 10),
        getEmptySpace(1),
        genRandomPlatforms(LAST_ROW, 10),
        getEmptySpace(1),
        genRandomPlatforms(LAST_ROW, 10),
        getEmptySpace(3),
        genRandomPlatforms(LAST_ROW, 10),
        getEmptySpace(2),
        genRandomPlatforms(LAST_ROW, 10),
        getEmptySpace(1),
        genRandomPlatforms(LAST_ROW, 10),
        genRandomBlocksTunnel(LAST_ROW, 20, 10, 0.2, 0.3),
        getEmptySpace(2),
        genRandomBlocksTunnel(LAST_ROW, 20, 10, 0.2, 0.3),
        getEmptySpace(2),
        genRandomBlocksTunnel(LAST_ROW, 20, 10, 0.2, 0.3),
        getEmptySpace(2),
        genRandomBlocksTunnel(LAST_ROW, 20, 10, 0.2, 0.3),
        getEmptySpace(1),
        genRandomBlocksTunnel(LAST_ROW, 20, 12, 0.9, 0),
        genRandomBlocksTunnel(LAST_ROW, 20, 8)
    ];

    sections.push(HERE_YOU_DIE());

    var ret = sections.reduce(function(ret, section) {
        ret = ret.concat(section);
        return ret;
    }, []);

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function genSpike(row, upsideDown) {
        return {type: 'spikes', row: 0, version: getRandomInt(1, 4), inverted: upsideDown};
    }

    function addSpikesOnGround(columns) {
        function isGroundEmpty(column) {
            return column.every(function(obstacle) {
                return obstacle.row !== 0;
            });
        }

        columns.forEach(function(column) {
            if (column.length > 0 && isGroundEmpty(column)) {
                column.push(genSpike(0, false));
            }
        });
    }

    addSpikesOnGround(ret);

    return ret;
});

SQUARESCAPE.COMPONENT.SOUNDS = {};

SQUARESCAPE.COMPONENT.SOUNDS.music = function(audio) {
    "use strict";
    var Music = function() {
        this.name = "music";
    }, instance;

    var loop;

    Music.prototype.stop = function() {
        audio.stop(this.name);
        // clearInterval(loop);
    };
    Music.prototype.play = function() {
        audio.play(this.name, true);
        // clearInterval(loop);
        // loop = setInterval(function () {
        //     instance.stop();
        //     instance.play();
        // }, 40 * 1000);
    };
    return function() {
        if (!instance) {
            instance = new Music();
        }
        return instance;
    };
}(DUST.ASSETS.AUDIO.init);

SQUARESCAPE.COMPONENT.SOUNDS.intro = function(audio) {
    "use strict";
    var Intro = function() {
        this.name = "intro";
    }, instance;
    var loop;

    Intro.prototype.stop = function() {
        audio.stop(this.name);
        // clearInterval(loop);
    };
    Intro.prototype.play = function() {
        audio.play(this.name, true);
        // clearInterval(loop);
        // loop = setInterval(function () {
        //     instance.stop();
        //     instance.play();
        // }, 44 * 1000);
    };
    return function() {
        if (!instance) {
            instance = new Intro();
        }
        return instance;
    };
}(DUST.ASSETS.AUDIO.init);

SQUARESCAPE.GAME.SCENE.welcome = function(Scene, event, intro, objects) {
    "use strict";
    var welcome = null;
    var onShow = function() {
        intro().play();
        event.broadcast("welcome.start");
    };
    var onHide = function(clean) {
        event.broadcast("welcome.stop");
        clean();
    };
    return function(options) {
        if (!welcome) {
            if (!options) {
                options = {};
            }
            options.objects = objects;
            options.onShow = onShow;
            options.onHide = onHide;
            options.name = "welcome";
            options.authoritative = true;
            welcome = new Scene(options);
        }
        return welcome;
    };
}(DUST.Scene, DUST.event, SQUARESCAPE.COMPONENT.SOUNDS.intro, [ SQUARESCAPE.COMPONENT.background, SQUARESCAPE.COMPONENT.floor, SQUARESCAPE.COMPONENT.shadow, SQUARESCAPE.COMPONENT.player, SQUARESCAPE.COMPONENT.buttonPlay ]);

SQUARESCAPE.GAME.SCENE.main = function(Scene, event, music, intro, LevelManager, level, objects) {
    "use strict";
    var main = null;
    var currentLevel = null;
    var onShow = function() {
        if (!currentLevel) {
            currentLevel = new LevelManager(level);
        } else {
            currentLevel.reset();
        }
        event.broadcast("game.start");
        intro().stop();
        music().play();
        setInterval(function () {music().stop(); music().play();}, 40 * 1000);
    };
    var onHide = function(clean) {
        currentLevel.destroy();
        event.broadcast("game.stop");
        window.setTimeout(function() {
            event.broadcast("player.respawn");
        }, 2e3);
        music().stop();
        clean();
    };
    return function(options) {
        if (!main) {
            if (!options) {
                options = {};
            }
            options.objects = objects;
            options.onShow = onShow;
            options.onHide = onHide;
            options.name = "main";
            main = new Scene(options);
        }
        return main;
    };
}(DUST.Scene, DUST.event, SQUARESCAPE.COMPONENT.SOUNDS.music, SQUARESCAPE.COMPONENT.SOUNDS.intro, SQUARESCAPE.COMPONENT.LEVEL.LevelManager, SQUARESCAPE.COMPONENT.LEVEL.example, []);

SQUARESCAPE.GAME.SCENE.gameOver = function(Scene, event, music, objects) {
    "use strict";
    var gameOver = null;
    var onShow = function() {
        event.broadcast("gameOver.start");
    };
    var onHide = function(clean) {
        event.broadcast("gameOver.stop");
        clean();
    };
    return function(options) {
        if (!gameOver) {
            if (!options) {
                options = {};
            }
            options.objects = objects;
            options.onShow = onShow;
            options.onHide = onHide;
            options.name = "gameOver";
            gameOver = new Scene(options);
        }
        return gameOver;
    };
}(DUST.Scene, DUST.event, SQUARESCAPE.COMPONENT.SOUNDS.music, [ SQUARESCAPE.COMPONENT.background, SQUARESCAPE.COMPONENT.floor, SQUARESCAPE.COMPONENT.shadow, SQUARESCAPE.COMPONENT.player ]);

SQUARESCAPE.world = function(world) {
    "use strict";
    world.gravity = [ 0, 10 ];
    world.applyDamping = false;
    world.defaultContactMaterial.restitution = 0;
    world.defaultContactMaterial.friction = 0;
    world.on("impact", function(e) {
        if (e.bodyA.impactHandler) {
            e.bodyA.impactHandler(e);
        }
        if (e.bodyB.impactHandler) {
            e.bodyB.impactHandler(e);
        }
    });
    return world;
}(DUST.PHYSICS.world);

SQUARESCAPE.GAME.loop = function(event, stage, particle, config, world, bodies) {
    "use strict";
    var animate = function() {
        world.step(config.step);
        bodies.update();
        particle().engine.update();
    };
    return function() {
        stage.addToLoop(animate);
    };
}(DUST.event, DUST.GRAPHIC.stage, DUST.particle, SQUARESCAPE.GAME.config, SQUARESCAPE.world, DUST.PHYSICS.bodies);

SQUARESCAPE.GAME.init = function(loop, welcome, main, gameOver) {
    "use strict";
    return function() {
        welcome({
            onFinishedLoading: function() {
                loop();
            }
        }).show();
        main();
        gameOver();
    };
}(SQUARESCAPE.GAME.loop, SQUARESCAPE.GAME.SCENE.welcome, SQUARESCAPE.GAME.SCENE.main, SQUARESCAPE.GAME.SCENE.gameOver);

SQUARESCAPE.COMPONENT.loading = function(Entity, stage, game, top) {
    "use strict";
    var loader = null;
    return function(completed, total) {
        if (!loader) {
            loader = {};
            loader.bg = new Entity({
                asset: "squarescape/assets/preLoader/bg.png",
                x: 0,
                y: 0,
                anchor: {
                    x: .5,
                    y: .5
                },
                scale: {
                    x: 3.5,
                    y: 3.5
                },
                container: top,
                type: "spriteFromFile",
                name: "loader.bg"
            });
            loader.logo = new Entity({
                asset: "squarescape/assets/preLoader/logo.png",
                x: 0,
                y: 300,
                anchor: {
                    x: .5,
                    y: .5
                },
                container: top,
                type: "spriteFromFile",
                name: "loader.logo"
            });
            loader.bar = new Entity({
                asset: "squarescape/assets/preLoader/loading.png",
                x: 0,
                y: 550,
                anchor: {
                    x: .5,
                    y: .5
                },
                container: top,
                type: "spriteFromFile",
                name: "loader.bar"
            });
            loader.fill = new Entity({
                asset: "squarescape/assets/preLoader/fill.png",
                x: 0,
                y: 550,
                anchor: {
                    x: .5,
                    y: .5
                },
                scale: {
                    x: .01,
                    y: 1
                },
                container: top,
                type: "spriteFromFile",
                name: "loader.fill"
            });
        }
        loader.fill.sprite.scale.x = completed / total;
        if (completed === total) {
            window.setTimeout(function() {
                game();
                loader.logo.selfRemove();
                loader.bar.selfRemove();
                loader.fill.selfRemove();
                loader.bg.selfRemove();
            }, 500);
        }
    };
}(DUST.GRAPHIC.Entity, DUST.GRAPHIC.stage, SQUARESCAPE.GAME.init, SQUARESCAPE.COMPONENT.LAYERS.top);

SQUARESCAPE.init = function(dust, counter, assetList, rotate, viewPort, loading) {
    "use strict";
    counter.setCounterChange(function(completed, total) {
        loading(completed, total);
    });
    dust({
        game: function() {},
        assetList: assetList,
        viewPort: viewPort,
        rotate: rotate
    });
}(DUST.init, DUST.ASSETS.PROGRESS.counter, SQUARESCAPE.assetList, SQUARESCAPE.COMPONENT.rotate, SQUARESCAPE.COMPONENT.viewPort, SQUARESCAPE.COMPONENT.loading);
