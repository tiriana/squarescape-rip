var DUST = {
    debug: true
};

var Stats = function() {
    var l = Date.now(), m = l, g = 0, n = Infinity, o = 0, h = 0, p = Infinity, q = 0, r = 0, s = 0, f = document.createElement("div");
    f.id = "stats";
    f.addEventListener("mousedown", function(b) {
        b.preventDefault();
        t(++s % 2);
    }, !1);
    f.style.cssText = "width:80px;opacity:0.9;cursor:pointer";
    var a = document.createElement("div");
    a.id = "fps";
    a.style.cssText = "padding:0 0 3px 3px;text-align:left;background-color:#002";
    f.appendChild(a);
    var i = document.createElement("div");
    i.id = "fpsText";
    i.style.cssText = "color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";
    i.innerHTML = "FPS";
    a.appendChild(i);
    var c = document.createElement("div");
    c.id = "fpsGraph";
    c.style.cssText = "position:relative;width:74px;height:30px;background-color:#0ff";
    for (a.appendChild(c); 74 > c.children.length; ) {
        var j = document.createElement("span");
        j.style.cssText = "width:1px;height:30px;float:left;background-color:#113";
        c.appendChild(j);
    }
    var d = document.createElement("div");
    d.id = "ms";
    d.style.cssText = "padding:0 0 3px 3px;text-align:left;background-color:#020;display:none";
    f.appendChild(d);
    var k = document.createElement("div");
    k.id = "msText";
    k.style.cssText = "color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";
    k.innerHTML = "MS";
    d.appendChild(k);
    var e = document.createElement("div");
    e.id = "msGraph";
    e.style.cssText = "position:relative;width:74px;height:30px;background-color:#0f0";
    for (d.appendChild(e); 74 > e.children.length; ) j = document.createElement("span"),
    j.style.cssText = "width:1px;height:30px;float:left;background-color:#131", e.appendChild(j);
    var t = function(b) {
        s = b;
        switch (s) {
          case 0:
            a.style.display = "block";
            d.style.display = "none";
            break;

          case 1:
            a.style.display = "none", d.style.display = "block";
        }
    };
    return {
        REVISION: 11,
        domElement: f,
        setMode: t,
        begin: function() {
            l = Date.now();
        },
        end: function() {
            var b = Date.now();
            g = b - l;
            n = Math.min(n, g);
            o = Math.max(o, g);
            k.textContent = g + " MS (" + n + "-" + o + ")";
            var a = Math.min(30, 30 - 30 * (g / 200));
            e.appendChild(e.firstChild).style.height = a + "px";
            r++;
            b > m + 1e3 && (h = Math.round(1e3 * r / (b - m)), p = Math.min(p, h), q = Math.max(q, h),
            i.textContent = h + " FPS (" + p + "-" + q + ")", a = Math.min(30, 30 - 30 * (h / 100)),
            c.appendChild(c.firstChild).style.height = a + "px", m = b, r = 0);
            return b;
        },
        update: function() {
            l = this.end();
        }
    };
};

(function() {
    var root = this;
    var PIXI = PIXI || {};
    PIXI.WEBGL_RENDERER = 0;
    PIXI.CANVAS_RENDERER = 1;
    PIXI.VERSION = "v2.1.0";
    PIXI.blendModes = {
        NORMAL: 0,
        ADD: 1,
        MULTIPLY: 2,
        SCREEN: 3,
        OVERLAY: 4,
        DARKEN: 5,
        LIGHTEN: 6,
        COLOR_DODGE: 7,
        COLOR_BURN: 8,
        HARD_LIGHT: 9,
        SOFT_LIGHT: 10,
        DIFFERENCE: 11,
        EXCLUSION: 12,
        HUE: 13,
        SATURATION: 14,
        COLOR: 15,
        LUMINOSITY: 16
    };
    PIXI.scaleModes = {
        DEFAULT: 0,
        LINEAR: 0,
        NEAREST: 1
    };
    PIXI._UID = 0;
    if (typeof Float32Array != "undefined") {
        PIXI.Float32Array = Float32Array;
        PIXI.Uint16Array = Uint16Array;
    } else {
        PIXI.Float32Array = Array;
        PIXI.Uint16Array = Array;
    }
    PIXI.INTERACTION_FREQUENCY = 30;
    PIXI.AUTO_PREVENT_DEFAULT = true;
    PIXI.PI_2 = Math.PI * 2;
    PIXI.RAD_TO_DEG = 180 / Math.PI;
    PIXI.DEG_TO_RAD = Math.PI / 180;
    PIXI.RETINA_PREFIX = "@2x";
    PIXI.dontSayHello = false;
    PIXI.defaultRenderOptions = {
        view: null,
        transparent: false,
        antialias: false,
        preserveDrawingBuffer: false,
        resolution: 1,
        clearBeforeRender: true,
        autoResize: false
    };
    PIXI.sayHello = function(type) {
        if (PIXI.dontSayHello) return;
        if (navigator.userAgent.toLowerCase().indexOf("chrome") > -1) {
            var args = [ "%c %c %c Pixi.js " + PIXI.VERSION + " - " + type + "  %c " + " %c " + " http://www.pixijs.com/  %c %c ♥%c♥%c♥ ", "background: #ff66a5", "background: #ff66a5", "color: #ff66a5; background: #030307;", "background: #ff66a5", "background: #ffc3dc", "background: #ff66a5", "color: #ff2424; background: #fff", "color: #ff2424; background: #fff", "color: #ff2424; background: #fff" ];
            console.log.apply(console, args);
        } else if (window["console"]) {
            console.log("Pixi.js " + PIXI.VERSION + " - http://www.pixijs.com/");
        }
        PIXI.dontSayHello = true;
    };
    PIXI.Point = function(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    };
    PIXI.Point.prototype.clone = function() {
        return new PIXI.Point(this.x, this.y);
    };
    PIXI.Point.prototype.set = function(x, y) {
        this.x = x || 0;
        this.y = y || (y !== 0 ? this.x : 0);
    };
    PIXI.Point.prototype.constructor = PIXI.Point;
    PIXI.Rectangle = function(x, y, width, height) {
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || 0;
        this.height = height || 0;
    };
    PIXI.Rectangle.prototype.clone = function() {
        return new PIXI.Rectangle(this.x, this.y, this.width, this.height);
    };
    PIXI.Rectangle.prototype.contains = function(x, y) {
        if (this.width <= 0 || this.height <= 0) return false;
        var x1 = this.x;
        if (x >= x1 && x <= x1 + this.width) {
            var y1 = this.y;
            if (y >= y1 && y <= y1 + this.height) {
                return true;
            }
        }
        return false;
    };
    PIXI.Rectangle.prototype.constructor = PIXI.Rectangle;
    PIXI.EmptyRectangle = new PIXI.Rectangle(0, 0, 0, 0);
    PIXI.Polygon = function(points) {
        if (!(points instanceof Array)) points = Array.prototype.slice.call(arguments);
        if (points[0] instanceof PIXI.Point) {
            var p = [];
            for (var i = 0, il = points.length; i < il; i++) {
                p.push(points[i].x, points[i].y);
            }
            points = p;
        }
        this.closed = true;
        this.points = points;
    };
    PIXI.Polygon.prototype.clone = function() {
        var points = this.points.slice();
        return new PIXI.Polygon(points);
    };
    PIXI.Polygon.prototype.contains = function(x, y) {
        var inside = false;
        var length = this.points.length / 2;
        for (var i = 0, j = length - 1; i < length; j = i++) {
            var xi = this.points[i * 2], yi = this.points[i * 2 + 1], xj = this.points[j * 2], yj = this.points[j * 2 + 1], intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
            if (intersect) inside = !inside;
        }
        return inside;
    };
    PIXI.Polygon.prototype.constructor = PIXI.Polygon;
    PIXI.Circle = function(x, y, radius) {
        this.x = x || 0;
        this.y = y || 0;
        this.radius = radius || 0;
    };
    PIXI.Circle.prototype.clone = function() {
        return new PIXI.Circle(this.x, this.y, this.radius);
    };
    PIXI.Circle.prototype.contains = function(x, y) {
        if (this.radius <= 0) return false;
        var dx = this.x - x, dy = this.y - y, r2 = this.radius * this.radius;
        dx *= dx;
        dy *= dy;
        return dx + dy <= r2;
    };
    PIXI.Circle.prototype.getBounds = function() {
        return new PIXI.Rectangle(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    };
    PIXI.Circle.prototype.constructor = PIXI.Circle;
    PIXI.Ellipse = function(x, y, width, height) {
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || 0;
        this.height = height || 0;
    };
    PIXI.Ellipse.prototype.clone = function() {
        return new PIXI.Ellipse(this.x, this.y, this.width, this.height);
    };
    PIXI.Ellipse.prototype.contains = function(x, y) {
        if (this.width <= 0 || this.height <= 0) return false;
        var normx = (x - this.x) / this.width, normy = (y - this.y) / this.height;
        normx *= normx;
        normy *= normy;
        return normx + normy <= 1;
    };
    PIXI.Ellipse.prototype.getBounds = function() {
        return new PIXI.Rectangle(this.x - this.width, this.y - this.height, this.width, this.height);
    };
    PIXI.Ellipse.prototype.constructor = PIXI.Ellipse;
    PIXI.RoundedRectangle = function(x, y, width, height, radius) {
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || 0;
        this.height = height || 0;
        this.radius = radius || 20;
    };
    PIXI.RoundedRectangle.prototype.clone = function() {
        return new PIXI.RoundedRectangle(this.x, this.y, this.width, this.height, this.radius);
    };
    PIXI.RoundedRectangle.prototype.contains = function(x, y) {
        if (this.width <= 0 || this.height <= 0) return false;
        var x1 = this.x;
        if (x >= x1 && x <= x1 + this.width) {
            var y1 = this.y;
            if (y >= y1 && y <= y1 + this.height) {
                return true;
            }
        }
        return false;
    };
    PIXI.RoundedRectangle.prototype.constructor = PIXI.RoundedRectangle;
    PIXI.Matrix = function() {
        this.a = 1;
        this.b = 0;
        this.c = 0;
        this.d = 1;
        this.tx = 0;
        this.ty = 0;
    };
    PIXI.Matrix.prototype.fromArray = function(array) {
        this.a = array[0];
        this.b = array[1];
        this.c = array[3];
        this.d = array[4];
        this.tx = array[2];
        this.ty = array[5];
    };
    PIXI.Matrix.prototype.toArray = function(transpose) {
        if (!this.array) this.array = new PIXI.Float32Array(9);
        var array = this.array;
        if (transpose) {
            array[0] = this.a;
            array[1] = this.b;
            array[2] = 0;
            array[3] = this.c;
            array[4] = this.d;
            array[5] = 0;
            array[6] = this.tx;
            array[7] = this.ty;
            array[8] = 1;
        } else {
            array[0] = this.a;
            array[1] = this.c;
            array[2] = this.tx;
            array[3] = this.b;
            array[4] = this.d;
            array[5] = this.ty;
            array[6] = 0;
            array[7] = 0;
            array[8] = 1;
        }
        return array;
    };
    PIXI.Matrix.prototype.apply = function(pos, newPos) {
        newPos = newPos || new PIXI.Point();
        newPos.x = this.a * pos.x + this.c * pos.y + this.tx;
        newPos.y = this.b * pos.x + this.d * pos.y + this.ty;
        return newPos;
    };
    PIXI.Matrix.prototype.applyInverse = function(pos, newPos) {
        newPos = newPos || new PIXI.Point();
        var id = 1 / (this.a * this.d + this.c * -this.b);
        newPos.x = this.d * id * pos.x + -this.c * id * pos.y + (this.ty * this.c - this.tx * this.d) * id;
        newPos.y = this.a * id * pos.y + -this.b * id * pos.x + (-this.ty * this.a + this.tx * this.b) * id;
        return newPos;
    };
    PIXI.Matrix.prototype.translate = function(x, y) {
        this.tx += x;
        this.ty += y;
        return this;
    };
    PIXI.Matrix.prototype.scale = function(x, y) {
        this.a *= x;
        this.d *= y;
        this.c *= x;
        this.b *= y;
        this.tx *= x;
        this.ty *= y;
        return this;
    };
    PIXI.Matrix.prototype.rotate = function(angle) {
        var cos = Math.cos(angle);
        var sin = Math.sin(angle);
        var a1 = this.a;
        var c1 = this.c;
        var tx1 = this.tx;
        this.a = a1 * cos - this.b * sin;
        this.b = a1 * sin + this.b * cos;
        this.c = c1 * cos - this.d * sin;
        this.d = c1 * sin + this.d * cos;
        this.tx = tx1 * cos - this.ty * sin;
        this.ty = tx1 * sin + this.ty * cos;
        return this;
    };
    PIXI.Matrix.prototype.append = function(matrix) {
        var a1 = this.a;
        var b1 = this.b;
        var c1 = this.c;
        var d1 = this.d;
        this.a = matrix.a * a1 + matrix.b * c1;
        this.b = matrix.a * b1 + matrix.b * d1;
        this.c = matrix.c * a1 + matrix.d * c1;
        this.d = matrix.c * b1 + matrix.d * d1;
        this.tx = matrix.tx * a1 + matrix.ty * c1 + this.tx;
        this.ty = matrix.tx * b1 + matrix.ty * d1 + this.ty;
        return this;
    };
    PIXI.Matrix.prototype.identity = function() {
        this.a = 1;
        this.b = 0;
        this.c = 0;
        this.d = 1;
        this.tx = 0;
        this.ty = 0;
        return this;
    };
    PIXI.identityMatrix = new PIXI.Matrix();
    PIXI.DisplayObject = function() {
        this.position = new PIXI.Point();
        this.scale = new PIXI.Point(1, 1);
        this.pivot = new PIXI.Point(0, 0);
        this.rotation = 0;
        this.alpha = 1;
        this.visible = true;
        this.hitArea = null;
        this.buttonMode = false;
        this.renderable = false;
        this.parent = null;
        this.stage = null;
        this.worldAlpha = 1;
        this._interactive = false;
        this.defaultCursor = "pointer";
        this.worldTransform = new PIXI.Matrix();
        this._sr = 0;
        this._cr = 1;
        this.filterArea = null;
        this._bounds = new PIXI.Rectangle(0, 0, 1, 1);
        this._currentBounds = null;
        this._mask = null;
        this._cacheAsBitmap = false;
        this._cacheIsDirty = false;
    };
    PIXI.DisplayObject.prototype.constructor = PIXI.DisplayObject;
    Object.defineProperty(PIXI.DisplayObject.prototype, "interactive", {
        get: function() {
            return this._interactive;
        },
        set: function(value) {
            this._interactive = value;
            if (this.stage) this.stage.dirty = true;
        }
    });
    Object.defineProperty(PIXI.DisplayObject.prototype, "worldVisible", {
        get: function() {
            var item = this;
            do {
                if (!item.visible) return false;
                item = item.parent;
            } while (item);
            return true;
        }
    });
    Object.defineProperty(PIXI.DisplayObject.prototype, "mask", {
        get: function() {
            return this._mask;
        },
        set: function(value) {
            if (this._mask) this._mask.isMask = false;
            this._mask = value;
            if (this._mask) this._mask.isMask = true;
        }
    });
    Object.defineProperty(PIXI.DisplayObject.prototype, "filters", {
        get: function() {
            return this._filters;
        },
        set: function(value) {
            if (value) {
                var passes = [];
                for (var i = 0; i < value.length; i++) {
                    var filterPasses = value[i].passes;
                    for (var j = 0; j < filterPasses.length; j++) {
                        passes.push(filterPasses[j]);
                    }
                }
                this._filterBlock = {
                    target: this,
                    filterPasses: passes
                };
            }
            this._filters = value;
        }
    });
    Object.defineProperty(PIXI.DisplayObject.prototype, "cacheAsBitmap", {
        get: function() {
            return this._cacheAsBitmap;
        },
        set: function(value) {
            if (this._cacheAsBitmap === value) return;
            if (value) {
                this._generateCachedSprite();
            } else {
                this._destroyCachedSprite();
            }
            this._cacheAsBitmap = value;
        }
    });
    PIXI.DisplayObject.prototype.updateTransform = function() {
        var pt = this.parent.worldTransform;
        var wt = this.worldTransform;
        var a, b, c, d, tx, ty;
        if (this.rotation % PIXI.PI_2) {
            if (this.rotation !== this.rotationCache) {
                this.rotationCache = this.rotation;
                this._sr = Math.sin(this.rotation);
                this._cr = Math.cos(this.rotation);
            }
            a = this._cr * this.scale.x;
            b = this._sr * this.scale.x;
            c = -this._sr * this.scale.y;
            d = this._cr * this.scale.y;
            tx = this.position.x;
            ty = this.position.y;
            if (this.pivot.x || this.pivot.y) {
                tx -= this.pivot.x * a + this.pivot.y * c;
                ty -= this.pivot.x * b + this.pivot.y * d;
            }
            wt.a = a * pt.a + b * pt.c;
            wt.b = a * pt.b + b * pt.d;
            wt.c = c * pt.a + d * pt.c;
            wt.d = c * pt.b + d * pt.d;
            wt.tx = tx * pt.a + ty * pt.c + pt.tx;
            wt.ty = tx * pt.b + ty * pt.d + pt.ty;
        } else {
            a = this.scale.x;
            d = this.scale.y;
            tx = this.position.x - this.pivot.x * a;
            ty = this.position.y - this.pivot.y * d;
            wt.a = a * pt.a;
            wt.b = a * pt.b;
            wt.c = d * pt.c;
            wt.d = d * pt.d;
            wt.tx = tx * pt.a + ty * pt.c + pt.tx;
            wt.ty = tx * pt.b + ty * pt.d + pt.ty;
        }
        this.worldAlpha = this.alpha * this.parent.worldAlpha;
    };
    PIXI.DisplayObject.prototype.displayObjectUpdateTransform = PIXI.DisplayObject.prototype.updateTransform;
    PIXI.DisplayObject.prototype.getBounds = function(matrix) {
        matrix = matrix;
        return PIXI.EmptyRectangle;
    };
    PIXI.DisplayObject.prototype.getLocalBounds = function() {
        return this.getBounds(PIXI.identityMatrix);
    };
    PIXI.DisplayObject.prototype.setStageReference = function(stage) {
        this.stage = stage;
        if (this._interactive) this.stage.dirty = true;
    };
    PIXI.DisplayObject.prototype.generateTexture = function(resolution, scaleMode, renderer) {
        var bounds = this.getLocalBounds();
        var renderTexture = new PIXI.RenderTexture(bounds.width | 0, bounds.height | 0, renderer, scaleMode, resolution);
        PIXI.DisplayObject._tempMatrix.tx = -bounds.x;
        PIXI.DisplayObject._tempMatrix.ty = -bounds.y;
        renderTexture.render(this, PIXI.DisplayObject._tempMatrix);
        return renderTexture;
    };
    PIXI.DisplayObject.prototype.updateCache = function() {
        this._generateCachedSprite();
    };
    PIXI.DisplayObject.prototype.toGlobal = function(position) {
        this.updateTransform();
        return this.worldTransform.apply(position);
    };
    PIXI.DisplayObject.prototype.toLocal = function(position, from) {
        if (from) {
            position = from.toGlobal(position);
        }
        this.updateTransform();
        return this.worldTransform.applyInverse(position);
    };
    PIXI.DisplayObject.prototype._renderCachedSprite = function(renderSession) {
        this._cachedSprite.worldAlpha = this.worldAlpha;
        if (renderSession.gl) {
            PIXI.Sprite.prototype._renderWebGL.call(this._cachedSprite, renderSession);
        } else {
            PIXI.Sprite.prototype._renderCanvas.call(this._cachedSprite, renderSession);
        }
    };
    PIXI.DisplayObject.prototype._generateCachedSprite = function() {
        this._cacheAsBitmap = false;
        var bounds = this.getLocalBounds();
        if (!this._cachedSprite) {
            var renderTexture = new PIXI.RenderTexture(bounds.width | 0, bounds.height | 0);
            this._cachedSprite = new PIXI.Sprite(renderTexture);
            this._cachedSprite.worldTransform = this.worldTransform;
        } else {
            this._cachedSprite.texture.resize(bounds.width | 0, bounds.height | 0);
        }
        var tempFilters = this._filters;
        this._filters = null;
        this._cachedSprite.filters = tempFilters;
        PIXI.DisplayObject._tempMatrix.tx = -bounds.x;
        PIXI.DisplayObject._tempMatrix.ty = -bounds.y;
        this._cachedSprite.texture.render(this, PIXI.DisplayObject._tempMatrix);
        this._cachedSprite.anchor.x = -(bounds.x / bounds.width);
        this._cachedSprite.anchor.y = -(bounds.y / bounds.height);
        this._filters = tempFilters;
        this._cacheAsBitmap = true;
    };
    PIXI.DisplayObject.prototype._destroyCachedSprite = function() {
        if (!this._cachedSprite) return;
        this._cachedSprite.texture.destroy(true);
        this._cachedSprite = null;
    };
    PIXI.DisplayObject.prototype._renderWebGL = function(renderSession) {
        renderSession = renderSession;
    };
    PIXI.DisplayObject.prototype._renderCanvas = function(renderSession) {
        renderSession = renderSession;
    };
    PIXI.DisplayObject._tempMatrix = new PIXI.Matrix();
    Object.defineProperty(PIXI.DisplayObject.prototype, "x", {
        get: function() {
            return this.position.x;
        },
        set: function(value) {
            this.position.x = value;
        }
    });
    Object.defineProperty(PIXI.DisplayObject.prototype, "y", {
        get: function() {
            return this.position.y;
        },
        set: function(value) {
            this.position.y = value;
        }
    });
    PIXI.DisplayObjectContainer = function() {
        PIXI.DisplayObject.call(this);
        this.children = [];
    };
    PIXI.DisplayObjectContainer.prototype = Object.create(PIXI.DisplayObject.prototype);
    PIXI.DisplayObjectContainer.prototype.constructor = PIXI.DisplayObjectContainer;
    Object.defineProperty(PIXI.DisplayObjectContainer.prototype, "width", {
        get: function() {
            return this.scale.x * this.getLocalBounds().width;
        },
        set: function(value) {
            var width = this.getLocalBounds().width;
            if (width !== 0) {
                this.scale.x = value / width;
            } else {
                this.scale.x = 1;
            }
            this._width = value;
        }
    });
    Object.defineProperty(PIXI.DisplayObjectContainer.prototype, "height", {
        get: function() {
            return this.scale.y * this.getLocalBounds().height;
        },
        set: function(value) {
            var height = this.getLocalBounds().height;
            if (height !== 0) {
                this.scale.y = value / height;
            } else {
                this.scale.y = 1;
            }
            this._height = value;
        }
    });
    PIXI.DisplayObjectContainer.prototype.addChild = function(child) {
        return this.addChildAt(child, this.children.length);
    };
    PIXI.DisplayObjectContainer.prototype.addChildAt = function(child, index) {
        if (index >= 0 && index <= this.children.length) {
            if (child.parent) {
                child.parent.removeChild(child);
            }
            child.parent = this;
            this.children.splice(index, 0, child);
            if (this.stage) child.setStageReference(this.stage);
            return child;
        } else {
            throw new Error(child + "addChildAt: The index " + index + " supplied is out of bounds " + this.children.length);
        }
    };
    PIXI.DisplayObjectContainer.prototype.swapChildren = function(child, child2) {
        if (child === child2) {
            return;
        }
        var index1 = this.getChildIndex(child);
        var index2 = this.getChildIndex(child2);
        if (index1 < 0 || index2 < 0) {
            throw new Error("swapChildren: Both the supplied DisplayObjects must be a child of the caller.");
        }
        this.children[index1] = child2;
        this.children[index2] = child;
    };
    PIXI.DisplayObjectContainer.prototype.getChildIndex = function(child) {
        var index = this.children.indexOf(child);
        if (index === -1) {
            throw new Error("The supplied DisplayObject must be a child of the caller");
        }
        return index;
    };
    PIXI.DisplayObjectContainer.prototype.setChildIndex = function(child, index) {
        if (index < 0 || index >= this.children.length) {
            throw new Error("The supplied index is out of bounds");
        }
        var currentIndex = this.getChildIndex(child);
        this.children.splice(currentIndex, 1);
        this.children.splice(index, 0, child);
    };
    PIXI.DisplayObjectContainer.prototype.getChildAt = function(index) {
        if (index < 0 || index >= this.children.length) {
            throw new Error("getChildAt: Supplied index " + index + " does not exist in the child list, or the supplied DisplayObject must be a child of the caller");
        }
        return this.children[index];
    };
    PIXI.DisplayObjectContainer.prototype.removeChild = function(child) {
        var index = this.children.indexOf(child);
        if (index === -1) return;
        return this.removeChildAt(index);
    };
    PIXI.DisplayObjectContainer.prototype.removeChildAt = function(index) {
        var child = this.getChildAt(index);
        if (this.stage) child.removeStageReference();
        child.parent = undefined;
        this.children.splice(index, 1);
        return child;
    };
    PIXI.DisplayObjectContainer.prototype.removeChildren = function(beginIndex, endIndex) {
        var begin = beginIndex || 0;
        var end = typeof endIndex === "number" ? endIndex : this.children.length;
        var range = end - begin;
        if (range > 0 && range <= end) {
            var removed = this.children.splice(begin, range);
            for (var i = 0; i < removed.length; i++) {
                var child = removed[i];
                if (this.stage) child.removeStageReference();
                child.parent = undefined;
            }
            return removed;
        } else if (range === 0 && this.children.length === 0) {
            return [];
        } else {
            throw new Error("removeChildren: Range Error, numeric values are outside the acceptable range");
        }
    };
    PIXI.DisplayObjectContainer.prototype.updateTransform = function() {
        if (!this.visible) return;
        this.displayObjectUpdateTransform();
        if (this._cacheAsBitmap) return;
        for (var i = 0, j = this.children.length; i < j; i++) {
            this.children[i].updateTransform();
        }
    };
    PIXI.DisplayObjectContainer.prototype.displayObjectContainerUpdateTransform = PIXI.DisplayObjectContainer.prototype.updateTransform;
    PIXI.DisplayObjectContainer.prototype.getBounds = function() {
        if (this.children.length === 0) return PIXI.EmptyRectangle;
        var minX = Infinity;
        var minY = Infinity;
        var maxX = -Infinity;
        var maxY = -Infinity;
        var childBounds;
        var childMaxX;
        var childMaxY;
        var childVisible = false;
        for (var i = 0, j = this.children.length; i < j; i++) {
            var child = this.children[i];
            if (!child.visible) continue;
            childVisible = true;
            childBounds = this.children[i].getBounds();
            minX = minX < childBounds.x ? minX : childBounds.x;
            minY = minY < childBounds.y ? minY : childBounds.y;
            childMaxX = childBounds.width + childBounds.x;
            childMaxY = childBounds.height + childBounds.y;
            maxX = maxX > childMaxX ? maxX : childMaxX;
            maxY = maxY > childMaxY ? maxY : childMaxY;
        }
        if (!childVisible) return PIXI.EmptyRectangle;
        var bounds = this._bounds;
        bounds.x = minX;
        bounds.y = minY;
        bounds.width = maxX - minX;
        bounds.height = maxY - minY;
        return bounds;
    };
    PIXI.DisplayObjectContainer.prototype.getLocalBounds = function() {
        var matrixCache = this.worldTransform;
        this.worldTransform = PIXI.identityMatrix;
        for (var i = 0, j = this.children.length; i < j; i++) {
            this.children[i].updateTransform();
        }
        var bounds = this.getBounds();
        this.worldTransform = matrixCache;
        return bounds;
    };
    PIXI.DisplayObjectContainer.prototype.setStageReference = function(stage) {
        this.stage = stage;
        if (this._interactive) this.stage.dirty = true;
        for (var i = 0, j = this.children.length; i < j; i++) {
            var child = this.children[i];
            child.setStageReference(stage);
        }
    };
    PIXI.DisplayObjectContainer.prototype.removeStageReference = function() {
        for (var i = 0, j = this.children.length; i < j; i++) {
            var child = this.children[i];
            child.removeStageReference();
        }
        if (this._interactive) this.stage.dirty = true;
        this.stage = null;
    };
    PIXI.DisplayObjectContainer.prototype._renderWebGL = function(renderSession) {
        if (!this.visible || this.alpha <= 0) return;
        if (this._cacheAsBitmap) {
            this._renderCachedSprite(renderSession);
            return;
        }
        var i, j;
        if (this._mask || this._filters) {
            if (this._filters) {
                renderSession.spriteBatch.flush();
                renderSession.filterManager.pushFilter(this._filterBlock);
            }
            if (this._mask) {
                renderSession.spriteBatch.stop();
                renderSession.maskManager.pushMask(this.mask, renderSession);
                renderSession.spriteBatch.start();
            }
            for (i = 0, j = this.children.length; i < j; i++) {
                this.children[i]._renderWebGL(renderSession);
            }
            renderSession.spriteBatch.stop();
            if (this._mask) renderSession.maskManager.popMask(this._mask, renderSession);
            if (this._filters) renderSession.filterManager.popFilter();
            renderSession.spriteBatch.start();
        } else {
            for (i = 0, j = this.children.length; i < j; i++) {
                this.children[i]._renderWebGL(renderSession);
            }
        }
    };
    PIXI.DisplayObjectContainer.prototype._renderCanvas = function(renderSession) {
        if (this.visible === false || this.alpha === 0) return;
        if (this._cacheAsBitmap) {
            this._renderCachedSprite(renderSession);
            return;
        }
        if (this._mask) {
            renderSession.maskManager.pushMask(this._mask, renderSession);
        }
        for (var i = 0, j = this.children.length; i < j; i++) {
            var child = this.children[i];
            child._renderCanvas(renderSession);
        }
        if (this._mask) {
            renderSession.maskManager.popMask(renderSession);
        }
    };
    PIXI.Sprite = function(texture) {
        PIXI.DisplayObjectContainer.call(this);
        this.anchor = new PIXI.Point();
        this.texture = texture;
        this._width = 0;
        this._height = 0;
        this.tint = 16777215;
        this.blendMode = PIXI.blendModes.NORMAL;
        this.shader = null;
        if (texture.baseTexture.hasLoaded) {
            this.onTextureUpdate();
        } else {
            this.texture.on("update", this.onTextureUpdate.bind(this));
        }
        this.renderable = true;
    };
    PIXI.Sprite.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
    PIXI.Sprite.prototype.constructor = PIXI.Sprite;
    Object.defineProperty(PIXI.Sprite.prototype, "width", {
        get: function() {
            return this.scale.x * this.texture.frame.width;
        },
        set: function(value) {
            this.scale.x = value / this.texture.frame.width;
            this._width = value;
        }
    });
    Object.defineProperty(PIXI.Sprite.prototype, "height", {
        get: function() {
            return this.scale.y * this.texture.frame.height;
        },
        set: function(value) {
            this.scale.y = value / this.texture.frame.height;
            this._height = value;
        }
    });
    PIXI.Sprite.prototype.setTexture = function(texture) {
        this.texture = texture;
        this.cachedTint = 16777215;
    };
    PIXI.Sprite.prototype.onTextureUpdate = function() {
        if (this._width) this.scale.x = this._width / this.texture.frame.width;
        if (this._height) this.scale.y = this._height / this.texture.frame.height;
    };
    PIXI.Sprite.prototype.getBounds = function(matrix) {
        var width = this.texture.frame.width;
        var height = this.texture.frame.height;
        var w0 = width * (1 - this.anchor.x);
        var w1 = width * -this.anchor.x;
        var h0 = height * (1 - this.anchor.y);
        var h1 = height * -this.anchor.y;
        var worldTransform = matrix || this.worldTransform;
        var a = worldTransform.a;
        var b = worldTransform.b;
        var c = worldTransform.c;
        var d = worldTransform.d;
        var tx = worldTransform.tx;
        var ty = worldTransform.ty;
        var x1 = a * w1 + c * h1 + tx;
        var y1 = d * h1 + b * w1 + ty;
        var x2 = a * w0 + c * h1 + tx;
        var y2 = d * h1 + b * w0 + ty;
        var x3 = a * w0 + c * h0 + tx;
        var y3 = d * h0 + b * w0 + ty;
        var x4 = a * w1 + c * h0 + tx;
        var y4 = d * h0 + b * w1 + ty;
        var maxX = -Infinity;
        var maxY = -Infinity;
        var minX = Infinity;
        var minY = Infinity;
        minX = x1 < minX ? x1 : minX;
        minX = x2 < minX ? x2 : minX;
        minX = x3 < minX ? x3 : minX;
        minX = x4 < minX ? x4 : minX;
        minY = y1 < minY ? y1 : minY;
        minY = y2 < minY ? y2 : minY;
        minY = y3 < minY ? y3 : minY;
        minY = y4 < minY ? y4 : minY;
        maxX = x1 > maxX ? x1 : maxX;
        maxX = x2 > maxX ? x2 : maxX;
        maxX = x3 > maxX ? x3 : maxX;
        maxX = x4 > maxX ? x4 : maxX;
        maxY = y1 > maxY ? y1 : maxY;
        maxY = y2 > maxY ? y2 : maxY;
        maxY = y3 > maxY ? y3 : maxY;
        maxY = y4 > maxY ? y4 : maxY;
        var bounds = this._bounds;
        bounds.x = minX;
        bounds.width = maxX - minX;
        bounds.y = minY;
        bounds.height = maxY - minY;
        this._currentBounds = bounds;
        return bounds;
    };
    PIXI.Sprite.prototype._renderWebGL = function(renderSession) {
        if (!this.visible || this.alpha <= 0) return;
        var i, j;
        if (this._mask || this._filters) {
            var spriteBatch = renderSession.spriteBatch;
            if (this._filters) {
                spriteBatch.flush();
                renderSession.filterManager.pushFilter(this._filterBlock);
            }
            if (this._mask) {
                spriteBatch.stop();
                renderSession.maskManager.pushMask(this.mask, renderSession);
                spriteBatch.start();
            }
            spriteBatch.render(this);
            for (i = 0, j = this.children.length; i < j; i++) {
                this.children[i]._renderWebGL(renderSession);
            }
            spriteBatch.stop();
            if (this._mask) renderSession.maskManager.popMask(this._mask, renderSession);
            if (this._filters) renderSession.filterManager.popFilter();
            spriteBatch.start();
        } else {
            renderSession.spriteBatch.render(this);
            for (i = 0, j = this.children.length; i < j; i++) {
                this.children[i]._renderWebGL(renderSession);
            }
        }
    };
    PIXI.Sprite.prototype._renderCanvas = function(renderSession) {
        if (this.visible === false || this.alpha === 0 || this.texture.crop.width <= 0 || this.texture.crop.height <= 0) return;
        if (this.blendMode !== renderSession.currentBlendMode) {
            renderSession.currentBlendMode = this.blendMode;
            renderSession.context.globalCompositeOperation = PIXI.blendModesCanvas[renderSession.currentBlendMode];
        }
        if (this._mask) {
            renderSession.maskManager.pushMask(this._mask, renderSession);
        }
        if (this.texture.valid) {
            var resolution = this.texture.baseTexture.resolution / renderSession.resolution;
            renderSession.context.globalAlpha = this.worldAlpha;
            if (renderSession.roundPixels) {
                renderSession.context.setTransform(this.worldTransform.a, this.worldTransform.b, this.worldTransform.c, this.worldTransform.d, this.worldTransform.tx * renderSession.resolution | 0, this.worldTransform.ty * renderSession.resolution | 0);
            } else {
                renderSession.context.setTransform(this.worldTransform.a, this.worldTransform.b, this.worldTransform.c, this.worldTransform.d, this.worldTransform.tx * renderSession.resolution, this.worldTransform.ty * renderSession.resolution);
            }
            if (renderSession.smoothProperty && renderSession.scaleMode !== this.texture.baseTexture.scaleMode) {
                renderSession.scaleMode = this.texture.baseTexture.scaleMode;
                renderSession.context[renderSession.smoothProperty] = renderSession.scaleMode === PIXI.scaleModes.LINEAR;
            }
            var dx = this.texture.trim ? this.texture.trim.x - this.anchor.x * this.texture.trim.width : this.anchor.x * -this.texture.frame.width;
            var dy = this.texture.trim ? this.texture.trim.y - this.anchor.y * this.texture.trim.height : this.anchor.y * -this.texture.frame.height;
            if (this.tint !== 16777215) {
                if (this.cachedTint !== this.tint) {
                    this.cachedTint = this.tint;
                    this.tintedTexture = PIXI.CanvasTinter.getTintedTexture(this, this.tint);
                }
                renderSession.context.drawImage(this.tintedTexture, 0, 0, this.texture.crop.width, this.texture.crop.height, dx / resolution, dy / resolution, this.texture.crop.width / resolution, this.texture.crop.height / resolution);
            } else {
                renderSession.context.drawImage(this.texture.baseTexture.source, this.texture.crop.x, this.texture.crop.y, this.texture.crop.width, this.texture.crop.height, dx / resolution, dy / resolution, this.texture.crop.width / resolution, this.texture.crop.height / resolution);
            }
        }
        for (var i = 0, j = this.children.length; i < j; i++) {
            this.children[i]._renderCanvas(renderSession);
        }
        if (this._mask) {
            renderSession.maskManager.popMask(renderSession);
        }
    };
    PIXI.Sprite.fromFrame = function(frameId) {
        var texture = PIXI.TextureCache[frameId];
        if (!texture) throw new Error('The frameId "' + frameId + '" does not exist in the texture cache' + this);
        return new PIXI.Sprite(texture);
    };
    PIXI.Sprite.fromImage = function(imageId, crossorigin, scaleMode) {
        var texture = PIXI.Texture.fromImage(imageId, crossorigin, scaleMode);
        return new PIXI.Sprite(texture);
    };
    PIXI.SpriteBatch = function(texture) {
        PIXI.DisplayObjectContainer.call(this);
        this.textureThing = texture;
        this.ready = false;
    };
    PIXI.SpriteBatch.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
    PIXI.SpriteBatch.prototype.constructor = PIXI.SpriteBatch;
    PIXI.SpriteBatch.prototype.initWebGL = function(gl) {
        this.fastSpriteBatch = new PIXI.WebGLFastSpriteBatch(gl);
        this.ready = true;
    };
    PIXI.SpriteBatch.prototype.updateTransform = function() {
        PIXI.DisplayObject.prototype.updateTransform.call(this);
    };
    PIXI.SpriteBatch.prototype._renderWebGL = function(renderSession) {
        if (!this.visible || this.alpha <= 0 || !this.children.length) return;
        if (!this.ready) this.initWebGL(renderSession.gl);
        renderSession.spriteBatch.stop();
        renderSession.shaderManager.setShader(renderSession.shaderManager.fastShader);
        this.fastSpriteBatch.begin(this, renderSession);
        this.fastSpriteBatch.render(this);
        renderSession.spriteBatch.start();
    };
    PIXI.SpriteBatch.prototype._renderCanvas = function(renderSession) {
        if (!this.visible || this.alpha <= 0 || !this.children.length) return;
        var context = renderSession.context;
        context.globalAlpha = this.worldAlpha;
        PIXI.DisplayObject.prototype.updateTransform.call(this);
        var transform = this.worldTransform;
        var isRotated = true;
        for (var i = 0; i < this.children.length; i++) {
            var child = this.children[i];
            if (!child.visible) continue;
            var texture = child.texture;
            var frame = texture.frame;
            context.globalAlpha = this.worldAlpha * child.alpha;
            if (child.rotation % (Math.PI * 2) === 0) {
                if (isRotated) {
                    context.setTransform(transform.a, transform.b, transform.c, transform.d, transform.tx, transform.ty);
                    isRotated = false;
                }
                context.drawImage(texture.baseTexture.source, frame.x, frame.y, frame.width, frame.height, child.anchor.x * (-frame.width * child.scale.x) + child.position.x + .5 | 0, child.anchor.y * (-frame.height * child.scale.y) + child.position.y + .5 | 0, frame.width * child.scale.x, frame.height * child.scale.y);
            } else {
                if (!isRotated) isRotated = true;
                PIXI.DisplayObject.prototype.updateTransform.call(child);
                var childTransform = child.worldTransform;
                if (renderSession.roundPixels) {
                    context.setTransform(childTransform.a, childTransform.b, childTransform.c, childTransform.d, childTransform.tx | 0, childTransform.ty | 0);
                } else {
                    context.setTransform(childTransform.a, childTransform.b, childTransform.c, childTransform.d, childTransform.tx, childTransform.ty);
                }
                context.drawImage(texture.baseTexture.source, frame.x, frame.y, frame.width, frame.height, child.anchor.x * -frame.width + .5 | 0, child.anchor.y * -frame.height + .5 | 0, frame.width, frame.height);
            }
        }
    };
    PIXI.MovieClip = function(textures) {
        PIXI.Sprite.call(this, textures[0]);
        this.textures = textures;
        this.animationSpeed = 1;
        this.loop = true;
        this.onComplete = null;
        this.currentFrame = 0;
        this.playing = false;
    };
    PIXI.MovieClip.prototype = Object.create(PIXI.Sprite.prototype);
    PIXI.MovieClip.prototype.constructor = PIXI.MovieClip;
    Object.defineProperty(PIXI.MovieClip.prototype, "totalFrames", {
        get: function() {
            return this.textures.length;
        }
    });
    PIXI.MovieClip.prototype.stop = function() {
        this.playing = false;
    };
    PIXI.MovieClip.prototype.play = function() {
        this.playing = true;
    };
    PIXI.MovieClip.prototype.gotoAndStop = function(frameNumber) {
        this.playing = false;
        this.currentFrame = frameNumber;
        var round = this.currentFrame + .5 | 0;
        this.setTexture(this.textures[round % this.textures.length]);
    };
    PIXI.MovieClip.prototype.gotoAndPlay = function(frameNumber) {
        this.currentFrame = frameNumber;
        this.playing = true;
    };
    PIXI.MovieClip.prototype.updateTransform = function() {
        PIXI.Sprite.prototype.updateTransform.call(this);
        if (!this.playing) return;
        this.currentFrame += this.animationSpeed;
        var round = this.currentFrame + .5 | 0;
        this.currentFrame = this.currentFrame % this.textures.length;
        if (this.loop || round < this.textures.length) {
            this.setTexture(this.textures[round % this.textures.length]);
        } else if (round >= this.textures.length) {
            this.gotoAndStop(this.textures.length - 1);
            if (this.onComplete) {
                this.onComplete();
            }
        }
    };
    PIXI.MovieClip.fromFrames = function(frames) {
        var textures = [];
        for (var i = 0; i < frames.length; i++) {
            textures.push(new PIXI.Texture.fromFrame(frames[i]));
        }
        return new PIXI.MovieClip(textures);
    };
    PIXI.MovieClip.fromImages = function(images) {
        var textures = [];
        for (var i = 0; i < images.length; i++) {
            textures.push(new PIXI.Texture.fromImage(images[i]));
        }
        return new PIXI.MovieClip(textures);
    };
    PIXI.FilterBlock = function() {
        this.visible = true;
        this.renderable = true;
    };
    PIXI.FilterBlock.prototype.constructor = PIXI.FilterBlock;
    PIXI.Text = function(text, style) {
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        this.resolution = 1;
        PIXI.Sprite.call(this, PIXI.Texture.fromCanvas(this.canvas));
        this.setText(text);
        this.setStyle(style);
    };
    PIXI.Text.prototype = Object.create(PIXI.Sprite.prototype);
    PIXI.Text.prototype.constructor = PIXI.Text;
    Object.defineProperty(PIXI.Text.prototype, "width", {
        get: function() {
            if (this.dirty) {
                this.updateText();
                this.dirty = false;
            }
            return this.scale.x * this.texture.frame.width;
        },
        set: function(value) {
            this.scale.x = value / this.texture.frame.width;
            this._width = value;
        }
    });
    Object.defineProperty(PIXI.Text.prototype, "height", {
        get: function() {
            if (this.dirty) {
                this.updateText();
                this.dirty = false;
            }
            return this.scale.y * this.texture.frame.height;
        },
        set: function(value) {
            this.scale.y = value / this.texture.frame.height;
            this._height = value;
        }
    });
    PIXI.Text.prototype.setStyle = function(style) {
        style = style || {};
        style.font = style.font || "bold 20pt Arial";
        style.fill = style.fill || "black";
        style.align = style.align || "left";
        style.stroke = style.stroke || "black";
        style.strokeThickness = style.strokeThickness || 0;
        style.wordWrap = style.wordWrap || false;
        style.wordWrapWidth = style.wordWrapWidth || 100;
        style.dropShadow = style.dropShadow || false;
        style.dropShadowAngle = style.dropShadowAngle || Math.PI / 6;
        style.dropShadowDistance = style.dropShadowDistance || 4;
        style.dropShadowColor = style.dropShadowColor || "black";
        this.style = style;
        this.dirty = true;
    };
    PIXI.Text.prototype.setText = function(text) {
        this.text = text.toString() || " ";
        this.dirty = true;
    };
    PIXI.Text.prototype.updateText = function() {
        this.texture.baseTexture.resolution = this.resolution;
        this.context.font = this.style.font;
        var outputText = this.text;
        if (this.style.wordWrap) outputText = this.wordWrap(this.text);
        var lines = outputText.split(/(?:\r\n|\r|\n)/);
        var lineWidths = [];
        var maxLineWidth = 0;
        var fontProperties = this.determineFontProperties(this.style.font);
        for (var i = 0; i < lines.length; i++) {
            var lineWidth = this.context.measureText(lines[i]).width;
            lineWidths[i] = lineWidth;
            maxLineWidth = Math.max(maxLineWidth, lineWidth);
        }
        var width = maxLineWidth + this.style.strokeThickness;
        if (this.style.dropShadow) width += this.style.dropShadowDistance;
        this.canvas.width = (width + this.context.lineWidth) * this.resolution;
        var lineHeight = fontProperties.fontSize + this.style.strokeThickness;
        var height = lineHeight * lines.length;
        if (this.style.dropShadow) height += this.style.dropShadowDistance;
        this.canvas.height = height * this.resolution;
        this.context.scale(this.resolution, this.resolution);
        if (navigator.isCocoonJS) this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.font = this.style.font;
        this.context.strokeStyle = this.style.stroke;
        this.context.lineWidth = this.style.strokeThickness;
        this.context.textBaseline = "alphabetic";
        var linePositionX;
        var linePositionY;
        if (this.style.dropShadow) {
            this.context.fillStyle = this.style.dropShadowColor;
            var xShadowOffset = Math.sin(this.style.dropShadowAngle) * this.style.dropShadowDistance;
            var yShadowOffset = Math.cos(this.style.dropShadowAngle) * this.style.dropShadowDistance;
            for (i = 0; i < lines.length; i++) {
                linePositionX = this.style.strokeThickness / 2;
                linePositionY = this.style.strokeThickness / 2 + i * lineHeight + fontProperties.ascent;
                if (this.style.align === "right") {
                    linePositionX += maxLineWidth - lineWidths[i];
                } else if (this.style.align === "center") {
                    linePositionX += (maxLineWidth - lineWidths[i]) / 2;
                }
                if (this.style.fill) {
                    this.context.fillText(lines[i], linePositionX + xShadowOffset, linePositionY + yShadowOffset);
                }
            }
        }
        this.context.fillStyle = this.style.fill;
        for (i = 0; i < lines.length; i++) {
            linePositionX = this.style.strokeThickness / 2;
            linePositionY = this.style.strokeThickness / 2 + i * lineHeight + fontProperties.ascent;
            if (this.style.align === "right") {
                linePositionX += maxLineWidth - lineWidths[i];
            } else if (this.style.align === "center") {
                linePositionX += (maxLineWidth - lineWidths[i]) / 2;
            }
            if (this.style.stroke && this.style.strokeThickness) {
                this.context.strokeText(lines[i], linePositionX, linePositionY);
            }
            if (this.style.fill) {
                this.context.fillText(lines[i], linePositionX, linePositionY);
            }
        }
        this.updateTexture();
    };
    PIXI.Text.prototype.updateTexture = function() {
        this.texture.baseTexture.width = this.canvas.width;
        this.texture.baseTexture.height = this.canvas.height;
        this.texture.crop.width = this.texture.frame.width = this.canvas.width;
        this.texture.crop.height = this.texture.frame.height = this.canvas.height;
        this._width = this.canvas.width;
        this._height = this.canvas.height;
        this.texture.baseTexture.dirty();
    };
    PIXI.Text.prototype._renderWebGL = function(renderSession) {
        if (this.dirty) {
            this.resolution = renderSession.resolution;
            this.updateText();
            this.dirty = false;
        }
        PIXI.Sprite.prototype._renderWebGL.call(this, renderSession);
    };
    PIXI.Text.prototype._renderCanvas = function(renderSession) {
        if (this.dirty) {
            this.resolution = renderSession.resolution;
            this.updateText();
            this.dirty = false;
        }
        PIXI.Sprite.prototype._renderCanvas.call(this, renderSession);
    };
    PIXI.Text.prototype.determineFontProperties = function(fontStyle) {
        var properties = PIXI.Text.fontPropertiesCache[fontStyle];
        if (!properties) {
            properties = {};
            var canvas = PIXI.Text.fontPropertiesCanvas;
            var context = PIXI.Text.fontPropertiesContext;
            context.font = fontStyle;
            var width = Math.ceil(context.measureText("|Mq").width);
            var baseline = Math.ceil(context.measureText("M").width);
            var height = 2 * baseline;
            baseline = baseline * 1.4 | 0;
            canvas.width = width;
            canvas.height = height;
            context.fillStyle = "#f00";
            context.fillRect(0, 0, width, height);
            context.font = fontStyle;
            context.textBaseline = "alphabetic";
            context.fillStyle = "#000";
            context.fillText("|Mq", 0, baseline);
            var imagedata = context.getImageData(0, 0, width, height).data;
            var pixels = imagedata.length;
            var line = width * 4;
            var i, j;
            var idx = 0;
            var stop = false;
            for (i = 0; i < baseline; i++) {
                for (j = 0; j < line; j += 4) {
                    if (imagedata[idx + j] !== 255) {
                        stop = true;
                        break;
                    }
                }
                if (!stop) {
                    idx += line;
                } else {
                    break;
                }
            }
            properties.ascent = baseline - i;
            idx = pixels - line;
            stop = false;
            for (i = height; i > baseline; i--) {
                for (j = 0; j < line; j += 4) {
                    if (imagedata[idx + j] !== 255) {
                        stop = true;
                        break;
                    }
                }
                if (!stop) {
                    idx -= line;
                } else {
                    break;
                }
            }
            properties.descent = i - baseline;
            properties.fontSize = properties.ascent + properties.descent;
            PIXI.Text.fontPropertiesCache[fontStyle] = properties;
        }
        return properties;
    };
    PIXI.Text.prototype.wordWrap = function(text) {
        var result = "";
        var lines = text.split("\n");
        for (var i = 0; i < lines.length; i++) {
            var spaceLeft = this.style.wordWrapWidth;
            var words = lines[i].split(" ");
            for (var j = 0; j < words.length; j++) {
                var wordWidth = this.context.measureText(words[j]).width;
                var wordWidthWithSpace = wordWidth + this.context.measureText(" ").width;
                if (j === 0 || wordWidthWithSpace > spaceLeft) {
                    if (j > 0) {
                        result += "\n";
                    }
                    result += words[j];
                    spaceLeft = this.style.wordWrapWidth - wordWidth;
                } else {
                    spaceLeft -= wordWidthWithSpace;
                    result += " " + words[j];
                }
            }
            if (i < lines.length - 1) {
                result += "\n";
            }
        }
        return result;
    };
    PIXI.Text.prototype.getBounds = function(matrix) {
        if (this.dirty) {
            this.updateText();
            this.dirty = false;
        }
        return PIXI.Sprite.prototype.getBounds.call(this, matrix);
    };
    PIXI.Text.prototype.destroy = function(destroyBaseTexture) {
        this.context = null;
        this.canvas = null;
        this.texture.destroy(destroyBaseTexture === undefined ? true : destroyBaseTexture);
    };
    PIXI.Text.fontPropertiesCache = {};
    PIXI.Text.fontPropertiesCanvas = document.createElement("canvas");
    PIXI.Text.fontPropertiesContext = PIXI.Text.fontPropertiesCanvas.getContext("2d");
    PIXI.BitmapText = function(text, style) {
        PIXI.DisplayObjectContainer.call(this);
        this.textWidth = 0;
        this.textHeight = 0;
        this._pool = [];
        this.setText(text);
        this.setStyle(style);
        this.updateText();
        this.dirty = false;
    };
    PIXI.BitmapText.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
    PIXI.BitmapText.prototype.constructor = PIXI.BitmapText;
    PIXI.BitmapText.prototype.setText = function(text) {
        this.text = text || " ";
        this.dirty = true;
    };
    PIXI.BitmapText.prototype.setStyle = function(style) {
        style = style || {};
        style.align = style.align || "left";
        this.style = style;
        var font = style.font.split(" ");
        this.fontName = font[font.length - 1];
        this.fontSize = font.length >= 2 ? parseInt(font[font.length - 2], 10) : PIXI.BitmapText.fonts[this.fontName].size;
        this.dirty = true;
        this.tint = style.tint;
    };
    PIXI.BitmapText.prototype.updateText = function() {
        var data = PIXI.BitmapText.fonts[this.fontName];
        var pos = new PIXI.Point();
        var prevCharCode = null;
        var chars = [];
        var maxLineWidth = 0;
        var lineWidths = [];
        var line = 0;
        var scale = this.fontSize / data.size;
        for (var i = 0; i < this.text.length; i++) {
            var charCode = this.text.charCodeAt(i);
            if (/(?:\r\n|\r|\n)/.test(this.text.charAt(i))) {
                lineWidths.push(pos.x);
                maxLineWidth = Math.max(maxLineWidth, pos.x);
                line++;
                pos.x = 0;
                pos.y += data.lineHeight;
                prevCharCode = null;
                continue;
            }
            var charData = data.chars[charCode];
            if (!charData) continue;
            if (prevCharCode && charData.kerning[prevCharCode]) {
                pos.x += charData.kerning[prevCharCode];
            }
            chars.push({
                texture: charData.texture,
                line: line,
                charCode: charCode,
                position: new PIXI.Point(pos.x + charData.xOffset, pos.y + charData.yOffset)
            });
            pos.x += charData.xAdvance;
            prevCharCode = charCode;
        }
        lineWidths.push(pos.x);
        maxLineWidth = Math.max(maxLineWidth, pos.x);
        var lineAlignOffsets = [];
        for (i = 0; i <= line; i++) {
            var alignOffset = 0;
            if (this.style.align === "right") {
                alignOffset = maxLineWidth - lineWidths[i];
            } else if (this.style.align === "center") {
                alignOffset = (maxLineWidth - lineWidths[i]) / 2;
            }
            lineAlignOffsets.push(alignOffset);
        }
        var lenChildren = this.children.length;
        var lenChars = chars.length;
        var tint = this.tint || 16777215;
        for (i = 0; i < lenChars; i++) {
            var c = i < lenChildren ? this.children[i] : this._pool.pop();
            if (c) c.setTexture(chars[i].texture); else c = new PIXI.Sprite(chars[i].texture);
            c.position.x = (chars[i].position.x + lineAlignOffsets[chars[i].line]) * scale;
            c.position.y = chars[i].position.y * scale;
            c.scale.x = c.scale.y = scale;
            c.tint = tint;
            if (!c.parent) this.addChild(c);
        }
        while (this.children.length > lenChars) {
            var child = this.getChildAt(this.children.length - 1);
            this._pool.push(child);
            this.removeChild(child);
        }
        this.textWidth = maxLineWidth * scale;
        this.textHeight = (pos.y + data.lineHeight) * scale;
    };
    PIXI.BitmapText.prototype.updateTransform = function() {
        if (this.dirty) {
            this.updateText();
            this.dirty = false;
        }
        PIXI.DisplayObjectContainer.prototype.updateTransform.call(this);
    };
    PIXI.BitmapText.fonts = {};
    PIXI.InteractionData = function() {
        this.global = new PIXI.Point();
        this.target = null;
        this.originalEvent = null;
    };
    PIXI.InteractionData.prototype.getLocalPosition = function(displayObject, point) {
        var worldTransform = displayObject.worldTransform;
        var global = this.global;
        var a00 = worldTransform.a, a01 = worldTransform.c, a02 = worldTransform.tx, a10 = worldTransform.b, a11 = worldTransform.d, a12 = worldTransform.ty, id = 1 / (a00 * a11 + a01 * -a10);
        point = point || new PIXI.Point();
        point.x = a11 * id * global.x + -a01 * id * global.y + (a12 * a01 - a02 * a11) * id;
        point.y = a00 * id * global.y + -a10 * id * global.x + (-a12 * a00 + a02 * a10) * id;
        return point;
    };
    PIXI.InteractionData.prototype.constructor = PIXI.InteractionData;
    PIXI.InteractionManager = function(stage) {
        this.stage = stage;
        this.mouse = new PIXI.InteractionData();
        this.touches = {};
        this.tempPoint = new PIXI.Point();
        this.mouseoverEnabled = true;
        this.pool = [];
        this.interactiveItems = [];
        this.interactionDOMElement = null;
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
        this.last = 0;
        this.currentCursorStyle = "inherit";
        this.mouseOut = false;
        this.resolution = 1;
    };
    PIXI.InteractionManager.prototype.constructor = PIXI.InteractionManager;
    PIXI.InteractionManager.prototype.collectInteractiveSprite = function(displayObject, iParent) {
        var children = displayObject.children;
        var length = children.length;
        for (var i = length - 1; i >= 0; i--) {
            var child = children[i];
            if (child._interactive) {
                iParent.interactiveChildren = true;
                this.interactiveItems.push(child);
                if (child.children.length > 0) {
                    this.collectInteractiveSprite(child, child);
                }
            } else {
                child.__iParent = null;
                if (child.children.length > 0) {
                    this.collectInteractiveSprite(child, iParent);
                }
            }
        }
    };
    PIXI.InteractionManager.prototype.setTarget = function(target) {
        this.target = target;
        this.resolution = target.resolution;
        if (this.interactionDOMElement !== null) return;
        this.setTargetDomElement(target.view);
    };
    PIXI.InteractionManager.prototype.setTargetDomElement = function(domElement) {
        this.removeEvents();
        if (window.navigator.msPointerEnabled) {
            domElement.style["-ms-content-zooming"] = "none";
            domElement.style["-ms-touch-action"] = "none";
        }
        this.interactionDOMElement = domElement;
        domElement.addEventListener("mousemove", this.onMouseMove, true);
        domElement.addEventListener("mousedown", this.onMouseDown, true);
        domElement.addEventListener("mouseout", this.onMouseOut, true);
        domElement.addEventListener("touchstart", this.onTouchStart, true);
        domElement.addEventListener("touchend", this.onTouchEnd, true);
        domElement.addEventListener("touchmove", this.onTouchMove, true);
        window.addEventListener("mouseup", this.onMouseUp, true);
    };
    PIXI.InteractionManager.prototype.removeEvents = function() {
        if (!this.interactionDOMElement) return;
        this.interactionDOMElement.style["-ms-content-zooming"] = "";
        this.interactionDOMElement.style["-ms-touch-action"] = "";
        this.interactionDOMElement.removeEventListener("mousemove", this.onMouseMove, true);
        this.interactionDOMElement.removeEventListener("mousedown", this.onMouseDown, true);
        this.interactionDOMElement.removeEventListener("mouseout", this.onMouseOut, true);
        this.interactionDOMElement.removeEventListener("touchstart", this.onTouchStart, true);
        this.interactionDOMElement.removeEventListener("touchend", this.onTouchEnd, true);
        this.interactionDOMElement.removeEventListener("touchmove", this.onTouchMove, true);
        this.interactionDOMElement = null;
        window.removeEventListener("mouseup", this.onMouseUp, true);
    };
    PIXI.InteractionManager.prototype.update = function() {
        if (!this.target) return;
        var now = Date.now();
        var diff = now - this.last;
        diff = diff * PIXI.INTERACTION_FREQUENCY / 1e3;
        if (diff < 1) return;
        this.last = now;
        var i = 0;
        if (this.dirty) {
            this.rebuildInteractiveGraph();
        }
        var length = this.interactiveItems.length;
        var cursor = "inherit";
        var over = false;
        for (i = 0; i < length; i++) {
            var item = this.interactiveItems[i];
            item.__hit = this.hitTest(item, this.mouse);
            this.mouse.target = item;
            if (item.__hit && !over) {
                if (item.buttonMode) cursor = item.defaultCursor;
                if (!item.interactiveChildren) {
                    over = true;
                }
                if (!item.__isOver) {
                    if (item.mouseover) {
                        item.mouseover(this.mouse);
                    }
                    item.__isOver = true;
                }
            } else {
                if (item.__isOver) {
                    if (item.mouseout) {
                        item.mouseout(this.mouse);
                    }
                    item.__isOver = false;
                }
            }
        }
        if (this.currentCursorStyle !== cursor) {
            this.currentCursorStyle = cursor;
            this.interactionDOMElement.style.cursor = cursor;
        }
    };
    PIXI.InteractionManager.prototype.rebuildInteractiveGraph = function() {
        this.dirty = false;
        var len = this.interactiveItems.length;
        for (var i = 0; i < len; i++) {
            this.interactiveItems[i].interactiveChildren = false;
        }
        this.interactiveItems = [];
        if (this.stage.interactive) {
            this.interactiveItems.push(this.stage);
        }
        this.collectInteractiveSprite(this.stage, this.stage);
    };
    PIXI.InteractionManager.prototype.onMouseMove = function(event) {
        if (this.dirty) {
            this.rebuildInteractiveGraph();
        }
        this.mouse.originalEvent = event;
        var rect = this.interactionDOMElement.getBoundingClientRect();
        this.mouse.global.x = (event.clientX - rect.left) * (this.target.width / rect.width) / this.resolution;
        this.mouse.global.y = (event.clientY - rect.top) * (this.target.height / rect.height) / this.resolution;
        var length = this.interactiveItems.length;
        for (var i = 0; i < length; i++) {
            var item = this.interactiveItems[i];
            if (item.mousemove) {
                item.mousemove(this.mouse);
            }
        }
    };
    PIXI.InteractionManager.prototype.onMouseDown = function(event) {
        if (this.dirty) {
            this.rebuildInteractiveGraph();
        }
        this.mouse.originalEvent = event;
        if (PIXI.AUTO_PREVENT_DEFAULT) {
            this.mouse.originalEvent.preventDefault();
        }
        var length = this.interactiveItems.length;
        var e = this.mouse.originalEvent;
        var isRightButton = e.button === 2 || e.which === 3;
        var downFunction = isRightButton ? "rightdown" : "mousedown";
        var clickFunction = isRightButton ? "rightclick" : "click";
        var buttonIsDown = isRightButton ? "__rightIsDown" : "__mouseIsDown";
        var isDown = isRightButton ? "__isRightDown" : "__isDown";
        for (var i = 0; i < length; i++) {
            var item = this.interactiveItems[i];
            if (item[downFunction] || item[clickFunction]) {
                item[buttonIsDown] = true;
                item.__hit = this.hitTest(item, this.mouse);
                if (item.__hit) {
                    if (item[downFunction]) {
                        item[downFunction](this.mouse);
                    }
                    item[isDown] = true;
                    if (!item.interactiveChildren) break;
                }
            }
        }
    };
    PIXI.InteractionManager.prototype.onMouseOut = function(event) {
        if (this.dirty) {
            this.rebuildInteractiveGraph();
        }
        this.mouse.originalEvent = event;
        var length = this.interactiveItems.length;
        this.interactionDOMElement.style.cursor = "inherit";
        for (var i = 0; i < length; i++) {
            var item = this.interactiveItems[i];
            if (item.__isOver) {
                this.mouse.target = item;
                if (item.mouseout) {
                    item.mouseout(this.mouse);
                }
                item.__isOver = false;
            }
        }
        this.mouseOut = true;
        this.mouse.global.x = -1e4;
        this.mouse.global.y = -1e4;
    };
    PIXI.InteractionManager.prototype.onMouseUp = function(event) {
        if (this.dirty) {
            this.rebuildInteractiveGraph();
        }
        this.mouse.originalEvent = event;
        var length = this.interactiveItems.length;
        var up = false;
        var e = this.mouse.originalEvent;
        var isRightButton = e.button === 2 || e.which === 3;
        var upFunction = isRightButton ? "rightup" : "mouseup";
        var clickFunction = isRightButton ? "rightclick" : "click";
        var upOutsideFunction = isRightButton ? "rightupoutside" : "mouseupoutside";
        var isDown = isRightButton ? "__isRightDown" : "__isDown";
        for (var i = 0; i < length; i++) {
            var item = this.interactiveItems[i];
            if (item[clickFunction] || item[upFunction] || item[upOutsideFunction]) {
                item.__hit = this.hitTest(item, this.mouse);
                if (item.__hit && !up) {
                    if (item[upFunction]) {
                        item[upFunction](this.mouse);
                    }
                    if (item[isDown]) {
                        if (item[clickFunction]) {
                            item[clickFunction](this.mouse);
                        }
                    }
                    if (!item.interactiveChildren) {
                        up = true;
                    }
                } else {
                    if (item[isDown]) {
                        if (item[upOutsideFunction]) item[upOutsideFunction](this.mouse);
                    }
                }
                item[isDown] = false;
            }
        }
    };
    PIXI.InteractionManager.prototype.hitTest = function(item, interactionData) {
        var global = interactionData.global;
        if (!item.worldVisible) {
            return false;
        }
        var worldTransform = item.worldTransform, i, a = worldTransform.a, b = worldTransform.b, c = worldTransform.c, tx = worldTransform.tx, d = worldTransform.d, ty = worldTransform.ty, id = 1 / (a * d + c * -b), x = d * id * global.x + -c * id * global.y + (ty * c - tx * d) * id, y = a * id * global.y + -b * id * global.x + (-ty * a + tx * b) * id;
        interactionData.target = item;
        if (item.hitArea && item.hitArea.contains) {
            if (item.hitArea.contains(x, y)) {
                interactionData.target = item;
                return true;
            }
            return false;
        } else if (item instanceof PIXI.Sprite) {
            var width = item.texture.frame.width;
            var height = item.texture.frame.height;
            var x1 = -width * item.anchor.x;
            var y1;
            if (x > x1 && x < x1 + width) {
                y1 = -height * item.anchor.y;
                if (y > y1 && y < y1 + height) {
                    interactionData.target = item;
                    return true;
                }
            }
        } else if (item instanceof PIXI.Graphics) {
            var graphicsData = item.graphicsData;
            for (i = 0; i < graphicsData.length; i++) {
                var data = graphicsData[i];
                if (!data.fill) continue;
                if (data.shape) {
                    if (data.shape.contains(x, y)) {
                        interactionData.target = item;
                        return true;
                    }
                }
            }
        }
        var length = item.children.length;
        for (i = 0; i < length; i++) {
            var tempItem = item.children[i];
            var hit = this.hitTest(tempItem, interactionData);
            if (hit) {
                interactionData.target = item;
                return true;
            }
        }
        return false;
    };
    PIXI.InteractionManager.prototype.onTouchMove = function(event) {
        if (this.dirty) {
            this.rebuildInteractiveGraph();
        }
        var rect = this.interactionDOMElement.getBoundingClientRect();
        var changedTouches = event.changedTouches;
        var touchData;
        var i = 0;
        for (i = 0; i < changedTouches.length; i++) {
            var touchEvent = changedTouches[i];
            touchData = this.touches[touchEvent.identifier];
            touchData.originalEvent = event;
            touchData.global.x = (touchEvent.clientX - rect.left) * (this.target.width / rect.width) / this.resolution;
            touchData.global.y = (touchEvent.clientY - rect.top) * (this.target.height / rect.height) / this.resolution;
            if (navigator.isCocoonJS && !rect.left && !rect.top && !event.target.style.width && !event.target.style.height) {
                touchData.global.x = touchEvent.clientX;
                touchData.global.y = touchEvent.clientY;
            }
            for (var j = 0; j < this.interactiveItems.length; j++) {
                var item = this.interactiveItems[j];
                if (item.touchmove && item.__touchData && item.__touchData[touchEvent.identifier]) {
                    item.touchmove(touchData);
                }
            }
        }
    };
    PIXI.InteractionManager.prototype.onTouchStart = function(event) {
        if (this.dirty) {
            this.rebuildInteractiveGraph();
        }
        var rect = this.interactionDOMElement.getBoundingClientRect();
        if (PIXI.AUTO_PREVENT_DEFAULT) {
            event.preventDefault();
        }
        var changedTouches = event.changedTouches;
        for (var i = 0; i < changedTouches.length; i++) {
            var touchEvent = changedTouches[i];
            var touchData = this.pool.pop();
            if (!touchData) {
                touchData = new PIXI.InteractionData();
            }
            touchData.originalEvent = event;
            this.touches[touchEvent.identifier] = touchData;
            touchData.global.x = (touchEvent.clientX - rect.left) * (this.target.width / rect.width) / this.resolution;
            touchData.global.y = (touchEvent.clientY - rect.top) * (this.target.height / rect.height) / this.resolution;
            if (navigator.isCocoonJS && !rect.left && !rect.top && !event.target.style.width && !event.target.style.height) {
                touchData.global.x = touchEvent.clientX;
                touchData.global.y = touchEvent.clientY;
            }
            var length = this.interactiveItems.length;
            for (var j = 0; j < length; j++) {
                var item = this.interactiveItems[j];
                if (item.touchstart || item.tap) {
                    item.__hit = this.hitTest(item, touchData);
                    if (item.__hit) {
                        if (item.touchstart) item.touchstart(touchData);
                        item.__isDown = true;
                        item.__touchData = item.__touchData || {};
                        item.__touchData[touchEvent.identifier] = touchData;
                        if (!item.interactiveChildren) break;
                    }
                }
            }
        }
    };
    PIXI.InteractionManager.prototype.onTouchEnd = function(event) {
        if (this.dirty) {
            this.rebuildInteractiveGraph();
        }
        var rect = this.interactionDOMElement.getBoundingClientRect();
        var changedTouches = event.changedTouches;
        for (var i = 0; i < changedTouches.length; i++) {
            var touchEvent = changedTouches[i];
            var touchData = this.touches[touchEvent.identifier];
            var up = false;
            touchData.global.x = (touchEvent.clientX - rect.left) * (this.target.width / rect.width) / this.resolution;
            touchData.global.y = (touchEvent.clientY - rect.top) * (this.target.height / rect.height) / this.resolution;
            if (navigator.isCocoonJS && !rect.left && !rect.top && !event.target.style.width && !event.target.style.height) {
                touchData.global.x = touchEvent.clientX;
                touchData.global.y = touchEvent.clientY;
            }
            var length = this.interactiveItems.length;
            for (var j = 0; j < length; j++) {
                var item = this.interactiveItems[j];
                if (item.__touchData && item.__touchData[touchEvent.identifier]) {
                    item.__hit = this.hitTest(item, item.__touchData[touchEvent.identifier]);
                    touchData.originalEvent = event;
                    if (item.touchend || item.tap) {
                        if (item.__hit && !up) {
                            if (item.touchend) {
                                item.touchend(touchData);
                            }
                            if (item.__isDown && item.tap) {
                                item.tap(touchData);
                            }
                            if (!item.interactiveChildren) {
                                up = true;
                            }
                        } else {
                            if (item.__isDown && item.touchendoutside) {
                                item.touchendoutside(touchData);
                            }
                        }
                        item.__isDown = false;
                    }
                    item.__touchData[touchEvent.identifier] = null;
                }
            }
            this.pool.push(touchData);
            this.touches[touchEvent.identifier] = null;
        }
    };
    PIXI.Stage = function(backgroundColor) {
        PIXI.DisplayObjectContainer.call(this);
        this.worldTransform = new PIXI.Matrix();
        this.interactive = true;
        this.interactionManager = new PIXI.InteractionManager(this);
        this.dirty = true;
        this.stage = this;
        this.stage.hitArea = new PIXI.Rectangle(0, 0, 1e5, 1e5);
        this.setBackgroundColor(backgroundColor);
    };
    PIXI.Stage.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
    PIXI.Stage.prototype.constructor = PIXI.Stage;
    PIXI.Stage.prototype.setInteractionDelegate = function(domElement) {
        this.interactionManager.setTargetDomElement(domElement);
    };
    PIXI.Stage.prototype.updateTransform = function() {
        this.worldAlpha = 1;
        for (var i = 0, j = this.children.length; i < j; i++) {
            this.children[i].updateTransform();
        }
        if (this.dirty) {
            this.dirty = false;
            this.interactionManager.dirty = true;
        }
        if (this.interactive) this.interactionManager.update();
    };
    PIXI.Stage.prototype.setBackgroundColor = function(backgroundColor) {
        this.backgroundColor = backgroundColor || 0;
        this.backgroundColorSplit = PIXI.hex2rgb(this.backgroundColor);
        var hex = this.backgroundColor.toString(16);
        hex = "000000".substr(0, 6 - hex.length) + hex;
        this.backgroundColorString = "#" + hex;
    };
    PIXI.Stage.prototype.getMousePosition = function() {
        return this.interactionManager.mouse.global;
    };
    (function(window) {
        var lastTime = 0;
        var vendors = [ "ms", "moz", "webkit", "o" ];
        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
            window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] || window[vendors[x] + "CancelRequestAnimationFrame"];
        }
        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = function(callback) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() {
                    callback(currTime + timeToCall);
                }, timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
        }
        if (!window.cancelAnimationFrame) {
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
        }
        window.requestAnimFrame = window.requestAnimationFrame;
    })(this);
    PIXI.hex2rgb = function(hex) {
        return [ (hex >> 16 & 255) / 255, (hex >> 8 & 255) / 255, (hex & 255) / 255 ];
    };
    PIXI.rgb2hex = function(rgb) {
        return (rgb[0] * 255 << 16) + (rgb[1] * 255 << 8) + rgb[2] * 255;
    };
    if (typeof Function.prototype.bind !== "function") {
        Function.prototype.bind = function() {
            return function(thisArg) {
                var target = this, i = arguments.length - 1, boundArgs = [];
                if (i > 0) {
                    boundArgs.length = i;
                    while (i--) boundArgs[i] = arguments[i + 1];
                }
                if (typeof target !== "function") throw new TypeError();
                function bound() {
                    var i = arguments.length, args = new Array(i);
                    while (i--) args[i] = arguments[i];
                    args = boundArgs.concat(args);
                    return target.apply(this instanceof bound ? this : thisArg, args);
                }
                bound.prototype = function F(proto) {
                    if (proto) F.prototype = proto;
                    if (!(this instanceof F)) return new F();
                }(target.prototype);
                return bound;
            };
        }();
    }
    PIXI.AjaxRequest = function() {
        var activexmodes = [ "Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.3.0", "Microsoft.XMLHTTP" ];
        if (window.ActiveXObject) {
            for (var i = 0; i < activexmodes.length; i++) {
                try {
                    return new window.ActiveXObject(activexmodes[i]);
                } catch (e) {}
            }
        } else if (window.XMLHttpRequest) {
            return new window.XMLHttpRequest();
        } else {
            return false;
        }
    };
    PIXI.canUseNewCanvasBlendModes = function() {
        if (typeof document === "undefined") return false;
        var canvas = document.createElement("canvas");
        canvas.width = 1;
        canvas.height = 1;
        var context = canvas.getContext("2d");
        context.fillStyle = "#000";
        context.fillRect(0, 0, 1, 1);
        context.globalCompositeOperation = "multiply";
        context.fillStyle = "#fff";
        context.fillRect(0, 0, 1, 1);
        return context.getImageData(0, 0, 1, 1).data[0] === 0;
    };
    PIXI.getNextPowerOfTwo = function(number) {
        if (number > 0 && (number & number - 1) === 0) return number; else {
            var result = 1;
            while (result < number) result <<= 1;
            return result;
        }
    };
    PIXI.EventTarget = {
        call: function callCompat(obj) {
            if (obj) {
                obj = obj.prototype || obj;
                PIXI.EventTarget.mixin(obj);
            }
        },
        mixin: function mixin(obj) {
            obj.listeners = function listeners(eventName) {
                this._listeners = this._listeners || {};
                return this._listeners[eventName] ? this._listeners[eventName].slice() : [];
            };
            obj.emit = obj.dispatchEvent = function emit(eventName, data) {
                this._listeners = this._listeners || {};
                if (typeof eventName === "object") {
                    data = eventName;
                    eventName = eventName.type;
                }
                if (!data || data.__isEventObject !== true) {
                    data = new PIXI.Event(this, eventName, data);
                }
                if (this._listeners && this._listeners[eventName]) {
                    var listeners = this._listeners[eventName].slice(0), length = listeners.length, fn = listeners[0], i;
                    for (i = 0; i < length; fn = listeners[++i]) {
                        fn.call(this, data);
                        if (data.stoppedImmediate) {
                            return this;
                        }
                    }
                    if (data.stopped) {
                        return this;
                    }
                }
                if (this.parent && this.parent.emit) {
                    this.parent.emit.call(this.parent, eventName, data);
                }
                return this;
            };
            obj.on = obj.addEventListener = function on(eventName, fn) {
                this._listeners = this._listeners || {};
                (this._listeners[eventName] = this._listeners[eventName] || []).push(fn);
                return this;
            };
            obj.once = function once(eventName, fn) {
                this._listeners = this._listeners || {};
                var self = this;
                function onceHandlerWrapper() {
                    fn.apply(self.off(eventName, onceHandlerWrapper), arguments);
                }
                onceHandlerWrapper._originalHandler = fn;
                return this.on(eventName, onceHandlerWrapper);
            };
            obj.off = obj.removeEventListener = function off(eventName, fn) {
                this._listeners = this._listeners || {};
                if (!this._listeners[eventName]) return this;
                var list = this._listeners[eventName], i = fn ? list.length : 0;
                while (i-- > 0) {
                    if (list[i] === fn || list[i]._originalHandler === fn) {
                        list.splice(i, 1);
                    }
                }
                if (list.length === 0) {
                    delete this._listeners[eventName];
                }
                return this;
            };
            obj.removeAllListeners = function removeAllListeners(eventName) {
                this._listeners = this._listeners || {};
                if (!this._listeners[eventName]) return this;
                delete this._listeners[eventName];
                return this;
            };
        }
    };
    PIXI.Event = function(target, name, data) {
        this.__isEventObject = true;
        this.stopped = false;
        this.stoppedImmediate = false;
        this.target = target;
        this.type = name;
        this.data = data;
        this.content = data;
        this.timeStamp = Date.now();
    };
    PIXI.Event.prototype.stopPropagation = function stopPropagation() {
        this.stopped = true;
    };
    PIXI.Event.prototype.stopImmediatePropagation = function stopImmediatePropagation() {
        this.stoppedImmediate = true;
    };
    PIXI.autoDetectRenderer = function(width, height, options) {
        if (!width) width = 800;
        if (!height) height = 600;
        var webgl = function() {
            try {
                var canvas = document.createElement("canvas");
                return !!window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
            } catch (e) {
                return false;
            }
        }();
        if (webgl) {
            return new PIXI.WebGLRenderer(width, height, options);
        }
        return new PIXI.CanvasRenderer(width, height, options);
    };
    PIXI.autoDetectRecommendedRenderer = function(width, height, options) {
        if (!width) width = 800;
        if (!height) height = 600;
        var webgl = function() {
            try {
                var canvas = document.createElement("canvas");
                return !!window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
            } catch (e) {
                return false;
            }
        }();
        var isAndroid = /Android/i.test(navigator.userAgent);
        if (webgl && !isAndroid) {
            return new PIXI.WebGLRenderer(width, height, options);
        }
        return new PIXI.CanvasRenderer(width, height, options);
    };
    PIXI.PolyK = {};
    PIXI.PolyK.Triangulate = function(p) {
        var sign = true;
        var n = p.length >> 1;
        if (n < 3) return [];
        var tgs = [];
        var avl = [];
        for (var i = 0; i < n; i++) avl.push(i);
        i = 0;
        var al = n;
        while (al > 3) {
            var i0 = avl[(i + 0) % al];
            var i1 = avl[(i + 1) % al];
            var i2 = avl[(i + 2) % al];
            var ax = p[2 * i0], ay = p[2 * i0 + 1];
            var bx = p[2 * i1], by = p[2 * i1 + 1];
            var cx = p[2 * i2], cy = p[2 * i2 + 1];
            var earFound = false;
            if (PIXI.PolyK._convex(ax, ay, bx, by, cx, cy, sign)) {
                earFound = true;
                for (var j = 0; j < al; j++) {
                    var vi = avl[j];
                    if (vi === i0 || vi === i1 || vi === i2) continue;
                    if (PIXI.PolyK._PointInTriangle(p[2 * vi], p[2 * vi + 1], ax, ay, bx, by, cx, cy)) {
                        earFound = false;
                        break;
                    }
                }
            }
            if (earFound) {
                tgs.push(i0, i1, i2);
                avl.splice((i + 1) % al, 1);
                al--;
                i = 0;
            } else if (i++ > 3 * al) {
                if (sign) {
                    tgs = [];
                    avl = [];
                    for (i = 0; i < n; i++) avl.push(i);
                    i = 0;
                    al = n;
                    sign = false;
                } else {
                    return null;
                }
            }
        }
        tgs.push(avl[0], avl[1], avl[2]);
        return tgs;
    };
    PIXI.PolyK._PointInTriangle = function(px, py, ax, ay, bx, by, cx, cy) {
        var v0x = cx - ax;
        var v0y = cy - ay;
        var v1x = bx - ax;
        var v1y = by - ay;
        var v2x = px - ax;
        var v2y = py - ay;
        var dot00 = v0x * v0x + v0y * v0y;
        var dot01 = v0x * v1x + v0y * v1y;
        var dot02 = v0x * v2x + v0y * v2y;
        var dot11 = v1x * v1x + v1y * v1y;
        var dot12 = v1x * v2x + v1y * v2y;
        var invDenom = 1 / (dot00 * dot11 - dot01 * dot01);
        var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
        var v = (dot00 * dot12 - dot01 * dot02) * invDenom;
        return u >= 0 && v >= 0 && u + v < 1;
    };
    PIXI.PolyK._convex = function(ax, ay, bx, by, cx, cy, sign) {
        return (ay - by) * (cx - bx) + (bx - ax) * (cy - by) >= 0 === sign;
    };
    PIXI.initDefaultShaders = function() {};
    PIXI.CompileVertexShader = function(gl, shaderSrc) {
        return PIXI._CompileShader(gl, shaderSrc, gl.VERTEX_SHADER);
    };
    PIXI.CompileFragmentShader = function(gl, shaderSrc) {
        return PIXI._CompileShader(gl, shaderSrc, gl.FRAGMENT_SHADER);
    };
    PIXI._CompileShader = function(gl, shaderSrc, shaderType) {
        var src = shaderSrc.join("\n");
        var shader = gl.createShader(shaderType);
        gl.shaderSource(shader, src);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            window.console.log(gl.getShaderInfoLog(shader));
            return null;
        }
        return shader;
    };
    PIXI.compileProgram = function(gl, vertexSrc, fragmentSrc) {
        var fragmentShader = PIXI.CompileFragmentShader(gl, fragmentSrc);
        var vertexShader = PIXI.CompileVertexShader(gl, vertexSrc);
        var shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);
        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            window.console.log("Could not initialise shaders");
        }
        return shaderProgram;
    };
    PIXI.PixiShader = function(gl) {
        this._UID = PIXI._UID++;
        this.gl = gl;
        this.program = null;
        this.fragmentSrc = [ "precision lowp float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform sampler2D uSampler;", "void main(void) {", "   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;", "}" ];
        this.textureCount = 0;
        this.firstRun = true;
        this.dirty = true;
        this.attributes = [];
        this.init();
    };
    PIXI.PixiShader.prototype.constructor = PIXI.PixiShader;
    PIXI.PixiShader.prototype.init = function() {
        var gl = this.gl;
        var program = PIXI.compileProgram(gl, this.vertexSrc || PIXI.PixiShader.defaultVertexSrc, this.fragmentSrc);
        gl.useProgram(program);
        this.uSampler = gl.getUniformLocation(program, "uSampler");
        this.projectionVector = gl.getUniformLocation(program, "projectionVector");
        this.offsetVector = gl.getUniformLocation(program, "offsetVector");
        this.dimensions = gl.getUniformLocation(program, "dimensions");
        this.aVertexPosition = gl.getAttribLocation(program, "aVertexPosition");
        this.aTextureCoord = gl.getAttribLocation(program, "aTextureCoord");
        this.colorAttribute = gl.getAttribLocation(program, "aColor");
        if (this.colorAttribute === -1) {
            this.colorAttribute = 2;
        }
        this.attributes = [ this.aVertexPosition, this.aTextureCoord, this.colorAttribute ];
        for (var key in this.uniforms) {
            this.uniforms[key].uniformLocation = gl.getUniformLocation(program, key);
        }
        this.initUniforms();
        this.program = program;
    };
    PIXI.PixiShader.prototype.initUniforms = function() {
        this.textureCount = 1;
        var gl = this.gl;
        var uniform;
        for (var key in this.uniforms) {
            uniform = this.uniforms[key];
            var type = uniform.type;
            if (type === "sampler2D") {
                uniform._init = false;
                if (uniform.value !== null) {
                    this.initSampler2D(uniform);
                }
            } else if (type === "mat2" || type === "mat3" || type === "mat4") {
                uniform.glMatrix = true;
                uniform.glValueLength = 1;
                if (type === "mat2") {
                    uniform.glFunc = gl.uniformMatrix2fv;
                } else if (type === "mat3") {
                    uniform.glFunc = gl.uniformMatrix3fv;
                } else if (type === "mat4") {
                    uniform.glFunc = gl.uniformMatrix4fv;
                }
            } else {
                uniform.glFunc = gl["uniform" + type];
                if (type === "2f" || type === "2i") {
                    uniform.glValueLength = 2;
                } else if (type === "3f" || type === "3i") {
                    uniform.glValueLength = 3;
                } else if (type === "4f" || type === "4i") {
                    uniform.glValueLength = 4;
                } else {
                    uniform.glValueLength = 1;
                }
            }
        }
    };
    PIXI.PixiShader.prototype.initSampler2D = function(uniform) {
        if (!uniform.value || !uniform.value.baseTexture || !uniform.value.baseTexture.hasLoaded) {
            return;
        }
        var gl = this.gl;
        gl.activeTexture(gl["TEXTURE" + this.textureCount]);
        gl.bindTexture(gl.TEXTURE_2D, uniform.value.baseTexture._glTextures[gl.id]);
        if (uniform.textureData) {
            var data = uniform.textureData;
            var magFilter = data.magFilter ? data.magFilter : gl.LINEAR;
            var minFilter = data.minFilter ? data.minFilter : gl.LINEAR;
            var wrapS = data.wrapS ? data.wrapS : gl.CLAMP_TO_EDGE;
            var wrapT = data.wrapT ? data.wrapT : gl.CLAMP_TO_EDGE;
            var format = data.luminance ? gl.LUMINANCE : gl.RGBA;
            if (data.repeat) {
                wrapS = gl.REPEAT;
                wrapT = gl.REPEAT;
            }
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, !!data.flipY);
            if (data.width) {
                var width = data.width ? data.width : 512;
                var height = data.height ? data.height : 2;
                var border = data.border ? data.border : 0;
                gl.texImage2D(gl.TEXTURE_2D, 0, format, width, height, border, format, gl.UNSIGNED_BYTE, null);
            } else {
                gl.texImage2D(gl.TEXTURE_2D, 0, format, gl.RGBA, gl.UNSIGNED_BYTE, uniform.value.baseTexture.source);
            }
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT);
        }
        gl.uniform1i(uniform.uniformLocation, this.textureCount);
        uniform._init = true;
        this.textureCount++;
    };
    PIXI.PixiShader.prototype.syncUniforms = function() {
        this.textureCount = 1;
        var uniform;
        var gl = this.gl;
        for (var key in this.uniforms) {
            uniform = this.uniforms[key];
            if (uniform.glValueLength === 1) {
                if (uniform.glMatrix === true) {
                    uniform.glFunc.call(gl, uniform.uniformLocation, uniform.transpose, uniform.value);
                } else {
                    uniform.glFunc.call(gl, uniform.uniformLocation, uniform.value);
                }
            } else if (uniform.glValueLength === 2) {
                uniform.glFunc.call(gl, uniform.uniformLocation, uniform.value.x, uniform.value.y);
            } else if (uniform.glValueLength === 3) {
                uniform.glFunc.call(gl, uniform.uniformLocation, uniform.value.x, uniform.value.y, uniform.value.z);
            } else if (uniform.glValueLength === 4) {
                uniform.glFunc.call(gl, uniform.uniformLocation, uniform.value.x, uniform.value.y, uniform.value.z, uniform.value.w);
            } else if (uniform.type === "sampler2D") {
                if (uniform._init) {
                    gl.activeTexture(gl["TEXTURE" + this.textureCount]);
                    if (uniform.value.baseTexture._dirty[gl.id]) {
                        PIXI.instances[gl.id].updateTexture(uniform.value.baseTexture);
                    } else {
                        gl.bindTexture(gl.TEXTURE_2D, uniform.value.baseTexture._glTextures[gl.id]);
                    }
                    gl.uniform1i(uniform.uniformLocation, this.textureCount);
                    this.textureCount++;
                } else {
                    this.initSampler2D(uniform);
                }
            }
        }
    };
    PIXI.PixiShader.prototype.destroy = function() {
        this.gl.deleteProgram(this.program);
        this.uniforms = null;
        this.gl = null;
        this.attributes = null;
    };
    PIXI.PixiShader.defaultVertexSrc = [ "attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "attribute vec4 aColor;", "uniform vec2 projectionVector;", "uniform vec2 offsetVector;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "const vec2 center = vec2(-1.0, 1.0);", "void main(void) {", "   gl_Position = vec4( ((aVertexPosition + offsetVector) / projectionVector) + center , 0.0, 1.0);", "   vTextureCoord = aTextureCoord;", "   vec3 color = mod(vec3(aColor.y/65536.0, aColor.y/256.0, aColor.y), 256.0) / 256.0;", "   vColor = vec4(color * aColor.x, aColor.x);", "}" ];
    PIXI.PixiFastShader = function(gl) {
        this._UID = PIXI._UID++;
        this.gl = gl;
        this.program = null;
        this.fragmentSrc = [ "precision lowp float;", "varying vec2 vTextureCoord;", "varying float vColor;", "uniform sampler2D uSampler;", "void main(void) {", "   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;", "}" ];
        this.vertexSrc = [ "attribute vec2 aVertexPosition;", "attribute vec2 aPositionCoord;", "attribute vec2 aScale;", "attribute float aRotation;", "attribute vec2 aTextureCoord;", "attribute float aColor;", "uniform vec2 projectionVector;", "uniform vec2 offsetVector;", "uniform mat3 uMatrix;", "varying vec2 vTextureCoord;", "varying float vColor;", "const vec2 center = vec2(-1.0, 1.0);", "void main(void) {", "   vec2 v;", "   vec2 sv = aVertexPosition * aScale;", "   v.x = (sv.x) * cos(aRotation) - (sv.y) * sin(aRotation);", "   v.y = (sv.x) * sin(aRotation) + (sv.y) * cos(aRotation);", "   v = ( uMatrix * vec3(v + aPositionCoord , 1.0) ).xy ;", "   gl_Position = vec4( ( v / projectionVector) + center , 0.0, 1.0);", "   vTextureCoord = aTextureCoord;", "   vColor = aColor;", "}" ];
        this.textureCount = 0;
        this.init();
    };
    PIXI.PixiFastShader.prototype.constructor = PIXI.PixiFastShader;
    PIXI.PixiFastShader.prototype.init = function() {
        var gl = this.gl;
        var program = PIXI.compileProgram(gl, this.vertexSrc, this.fragmentSrc);
        gl.useProgram(program);
        this.uSampler = gl.getUniformLocation(program, "uSampler");
        this.projectionVector = gl.getUniformLocation(program, "projectionVector");
        this.offsetVector = gl.getUniformLocation(program, "offsetVector");
        this.dimensions = gl.getUniformLocation(program, "dimensions");
        this.uMatrix = gl.getUniformLocation(program, "uMatrix");
        this.aVertexPosition = gl.getAttribLocation(program, "aVertexPosition");
        this.aPositionCoord = gl.getAttribLocation(program, "aPositionCoord");
        this.aScale = gl.getAttribLocation(program, "aScale");
        this.aRotation = gl.getAttribLocation(program, "aRotation");
        this.aTextureCoord = gl.getAttribLocation(program, "aTextureCoord");
        this.colorAttribute = gl.getAttribLocation(program, "aColor");
        if (this.colorAttribute === -1) {
            this.colorAttribute = 2;
        }
        this.attributes = [ this.aVertexPosition, this.aPositionCoord, this.aScale, this.aRotation, this.aTextureCoord, this.colorAttribute ];
        this.program = program;
    };
    PIXI.PixiFastShader.prototype.destroy = function() {
        this.gl.deleteProgram(this.program);
        this.uniforms = null;
        this.gl = null;
        this.attributes = null;
    };
    PIXI.StripShader = function(gl) {
        this._UID = PIXI._UID++;
        this.gl = gl;
        this.program = null;
        this.fragmentSrc = [ "precision mediump float;", "varying vec2 vTextureCoord;", "uniform float alpha;", "uniform sampler2D uSampler;", "void main(void) {", "   gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y)) * alpha;", "}" ];
        this.vertexSrc = [ "attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "uniform mat3 translationMatrix;", "uniform vec2 projectionVector;", "uniform vec2 offsetVector;", "varying vec2 vTextureCoord;", "void main(void) {", "   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);", "   v -= offsetVector.xyx;", "   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);", "   vTextureCoord = aTextureCoord;", "}" ];
        this.init();
    };
    PIXI.StripShader.prototype.constructor = PIXI.StripShader;
    PIXI.StripShader.prototype.init = function() {
        var gl = this.gl;
        var program = PIXI.compileProgram(gl, this.vertexSrc, this.fragmentSrc);
        gl.useProgram(program);
        this.uSampler = gl.getUniformLocation(program, "uSampler");
        this.projectionVector = gl.getUniformLocation(program, "projectionVector");
        this.offsetVector = gl.getUniformLocation(program, "offsetVector");
        this.colorAttribute = gl.getAttribLocation(program, "aColor");
        this.aVertexPosition = gl.getAttribLocation(program, "aVertexPosition");
        this.aTextureCoord = gl.getAttribLocation(program, "aTextureCoord");
        this.attributes = [ this.aVertexPosition, this.aTextureCoord ];
        this.translationMatrix = gl.getUniformLocation(program, "translationMatrix");
        this.alpha = gl.getUniformLocation(program, "alpha");
        this.program = program;
    };
    PIXI.StripShader.prototype.destroy = function() {
        this.gl.deleteProgram(this.program);
        this.uniforms = null;
        this.gl = null;
        this.attribute = null;
    };
    PIXI.PrimitiveShader = function(gl) {
        this._UID = PIXI._UID++;
        this.gl = gl;
        this.program = null;
        this.fragmentSrc = [ "precision mediump float;", "varying vec4 vColor;", "void main(void) {", "   gl_FragColor = vColor;", "}" ];
        this.vertexSrc = [ "attribute vec2 aVertexPosition;", "attribute vec4 aColor;", "uniform mat3 translationMatrix;", "uniform vec2 projectionVector;", "uniform vec2 offsetVector;", "uniform float alpha;", "uniform vec3 tint;", "varying vec4 vColor;", "void main(void) {", "   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);", "   v -= offsetVector.xyx;", "   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);", "   vColor = aColor * vec4(tint * alpha, alpha);", "}" ];
        this.init();
    };
    PIXI.PrimitiveShader.prototype.constructor = PIXI.PrimitiveShader;
    PIXI.PrimitiveShader.prototype.init = function() {
        var gl = this.gl;
        var program = PIXI.compileProgram(gl, this.vertexSrc, this.fragmentSrc);
        gl.useProgram(program);
        this.projectionVector = gl.getUniformLocation(program, "projectionVector");
        this.offsetVector = gl.getUniformLocation(program, "offsetVector");
        this.tintColor = gl.getUniformLocation(program, "tint");
        this.aVertexPosition = gl.getAttribLocation(program, "aVertexPosition");
        this.colorAttribute = gl.getAttribLocation(program, "aColor");
        this.attributes = [ this.aVertexPosition, this.colorAttribute ];
        this.translationMatrix = gl.getUniformLocation(program, "translationMatrix");
        this.alpha = gl.getUniformLocation(program, "alpha");
        this.program = program;
    };
    PIXI.PrimitiveShader.prototype.destroy = function() {
        this.gl.deleteProgram(this.program);
        this.uniforms = null;
        this.gl = null;
        this.attributes = null;
    };
    PIXI.ComplexPrimitiveShader = function(gl) {
        this._UID = PIXI._UID++;
        this.gl = gl;
        this.program = null;
        this.fragmentSrc = [ "precision mediump float;", "varying vec4 vColor;", "void main(void) {", "   gl_FragColor = vColor;", "}" ];
        this.vertexSrc = [ "attribute vec2 aVertexPosition;", "uniform mat3 translationMatrix;", "uniform vec2 projectionVector;", "uniform vec2 offsetVector;", "uniform vec3 tint;", "uniform float alpha;", "uniform vec3 color;", "varying vec4 vColor;", "void main(void) {", "   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);", "   v -= offsetVector.xyx;", "   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);", "   vColor = vec4(color * alpha * tint, alpha);", "}" ];
        this.init();
    };
    PIXI.ComplexPrimitiveShader.prototype.constructor = PIXI.ComplexPrimitiveShader;
    PIXI.ComplexPrimitiveShader.prototype.init = function() {
        var gl = this.gl;
        var program = PIXI.compileProgram(gl, this.vertexSrc, this.fragmentSrc);
        gl.useProgram(program);
        this.projectionVector = gl.getUniformLocation(program, "projectionVector");
        this.offsetVector = gl.getUniformLocation(program, "offsetVector");
        this.tintColor = gl.getUniformLocation(program, "tint");
        this.color = gl.getUniformLocation(program, "color");
        this.aVertexPosition = gl.getAttribLocation(program, "aVertexPosition");
        this.attributes = [ this.aVertexPosition, this.colorAttribute ];
        this.translationMatrix = gl.getUniformLocation(program, "translationMatrix");
        this.alpha = gl.getUniformLocation(program, "alpha");
        this.program = program;
    };
    PIXI.ComplexPrimitiveShader.prototype.destroy = function() {
        this.gl.deleteProgram(this.program);
        this.uniforms = null;
        this.gl = null;
        this.attribute = null;
    };
    PIXI.WebGLGraphics = function() {};
    PIXI.WebGLGraphics.renderGraphics = function(graphics, renderSession) {
        var gl = renderSession.gl;
        var projection = renderSession.projection, offset = renderSession.offset, shader = renderSession.shaderManager.primitiveShader, webGLData;
        if (graphics.dirty) {
            PIXI.WebGLGraphics.updateGraphics(graphics, gl);
        }
        var webGL = graphics._webGL[gl.id];
        for (var i = 0; i < webGL.data.length; i++) {
            if (webGL.data[i].mode === 1) {
                webGLData = webGL.data[i];
                renderSession.stencilManager.pushStencil(graphics, webGLData, renderSession);
                gl.drawElements(gl.TRIANGLE_FAN, 4, gl.UNSIGNED_SHORT, (webGLData.indices.length - 4) * 2);
                renderSession.stencilManager.popStencil(graphics, webGLData, renderSession);
            } else {
                webGLData = webGL.data[i];
                renderSession.shaderManager.setShader(shader);
                shader = renderSession.shaderManager.primitiveShader;
                gl.uniformMatrix3fv(shader.translationMatrix, false, graphics.worldTransform.toArray(true));
                gl.uniform2f(shader.projectionVector, projection.x, -projection.y);
                gl.uniform2f(shader.offsetVector, -offset.x, -offset.y);
                gl.uniform3fv(shader.tintColor, PIXI.hex2rgb(graphics.tint));
                gl.uniform1f(shader.alpha, graphics.worldAlpha);
                gl.bindBuffer(gl.ARRAY_BUFFER, webGLData.buffer);
                gl.vertexAttribPointer(shader.aVertexPosition, 2, gl.FLOAT, false, 4 * 6, 0);
                gl.vertexAttribPointer(shader.colorAttribute, 4, gl.FLOAT, false, 4 * 6, 2 * 4);
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, webGLData.indexBuffer);
                gl.drawElements(gl.TRIANGLE_STRIP, webGLData.indices.length, gl.UNSIGNED_SHORT, 0);
            }
        }
    };
    PIXI.WebGLGraphics.updateGraphics = function(graphics, gl) {
        var webGL = graphics._webGL[gl.id];
        if (!webGL) webGL = graphics._webGL[gl.id] = {
            lastIndex: 0,
            data: [],
            gl: gl
        };
        graphics.dirty = false;
        var i;
        if (graphics.clearDirty) {
            graphics.clearDirty = false;
            for (i = 0; i < webGL.data.length; i++) {
                var graphicsData = webGL.data[i];
                graphicsData.reset();
                PIXI.WebGLGraphics.graphicsDataPool.push(graphicsData);
            }
            webGL.data = [];
            webGL.lastIndex = 0;
        }
        var webGLData;
        for (i = webGL.lastIndex; i < graphics.graphicsData.length; i++) {
            var data = graphics.graphicsData[i];
            if (data.type === PIXI.Graphics.POLY) {
                data.points = data.shape.points.slice();
                if (data.shape.closed) {
                    if (data.points[0] !== data.points[data.points.length - 2] && data.points[1] !== data.points[data.points.length - 1]) {
                        data.points.push(data.points[0], data.points[1]);
                    }
                }
                if (data.fill) {
                    if (data.points.length >= 6) {
                        if (data.points.length < 6 * 2) {
                            webGLData = PIXI.WebGLGraphics.switchMode(webGL, 0);
                            var canDrawUsingSimple = PIXI.WebGLGraphics.buildPoly(data, webGLData);
                            if (!canDrawUsingSimple) {
                                webGLData = PIXI.WebGLGraphics.switchMode(webGL, 1);
                                PIXI.WebGLGraphics.buildComplexPoly(data, webGLData);
                            }
                        } else {
                            webGLData = PIXI.WebGLGraphics.switchMode(webGL, 1);
                            PIXI.WebGLGraphics.buildComplexPoly(data, webGLData);
                        }
                    }
                }
                if (data.lineWidth > 0) {
                    webGLData = PIXI.WebGLGraphics.switchMode(webGL, 0);
                    PIXI.WebGLGraphics.buildLine(data, webGLData);
                }
            } else {
                webGLData = PIXI.WebGLGraphics.switchMode(webGL, 0);
                if (data.type === PIXI.Graphics.RECT) {
                    PIXI.WebGLGraphics.buildRectangle(data, webGLData);
                } else if (data.type === PIXI.Graphics.CIRC || data.type === PIXI.Graphics.ELIP) {
                    PIXI.WebGLGraphics.buildCircle(data, webGLData);
                } else if (data.type === PIXI.Graphics.RREC) {
                    PIXI.WebGLGraphics.buildRoundedRectangle(data, webGLData);
                }
            }
            webGL.lastIndex++;
        }
        for (i = 0; i < webGL.data.length; i++) {
            webGLData = webGL.data[i];
            if (webGLData.dirty) webGLData.upload();
        }
    };
    PIXI.WebGLGraphics.switchMode = function(webGL, type) {
        var webGLData;
        if (!webGL.data.length) {
            webGLData = PIXI.WebGLGraphics.graphicsDataPool.pop() || new PIXI.WebGLGraphicsData(webGL.gl);
            webGLData.mode = type;
            webGL.data.push(webGLData);
        } else {
            webGLData = webGL.data[webGL.data.length - 1];
            if (webGLData.mode !== type || type === 1) {
                webGLData = PIXI.WebGLGraphics.graphicsDataPool.pop() || new PIXI.WebGLGraphicsData(webGL.gl);
                webGLData.mode = type;
                webGL.data.push(webGLData);
            }
        }
        webGLData.dirty = true;
        return webGLData;
    };
    PIXI.WebGLGraphics.buildRectangle = function(graphicsData, webGLData) {
        var rectData = graphicsData.shape;
        var x = rectData.x;
        var y = rectData.y;
        var width = rectData.width;
        var height = rectData.height;
        if (graphicsData.fill) {
            var color = PIXI.hex2rgb(graphicsData.fillColor);
            var alpha = graphicsData.fillAlpha;
            var r = color[0] * alpha;
            var g = color[1] * alpha;
            var b = color[2] * alpha;
            var verts = webGLData.points;
            var indices = webGLData.indices;
            var vertPos = verts.length / 6;
            verts.push(x, y);
            verts.push(r, g, b, alpha);
            verts.push(x + width, y);
            verts.push(r, g, b, alpha);
            verts.push(x, y + height);
            verts.push(r, g, b, alpha);
            verts.push(x + width, y + height);
            verts.push(r, g, b, alpha);
            indices.push(vertPos, vertPos, vertPos + 1, vertPos + 2, vertPos + 3, vertPos + 3);
        }
        if (graphicsData.lineWidth) {
            var tempPoints = graphicsData.points;
            graphicsData.points = [ x, y, x + width, y, x + width, y + height, x, y + height, x, y ];
            PIXI.WebGLGraphics.buildLine(graphicsData, webGLData);
            graphicsData.points = tempPoints;
        }
    };
    PIXI.WebGLGraphics.buildRoundedRectangle = function(graphicsData, webGLData) {
        var rrectData = graphicsData.shape;
        var x = rrectData.x;
        var y = rrectData.y;
        var width = rrectData.width;
        var height = rrectData.height;
        var radius = rrectData.radius;
        var recPoints = [];
        recPoints.push(x, y + radius);
        recPoints = recPoints.concat(PIXI.WebGLGraphics.quadraticBezierCurve(x, y + height - radius, x, y + height, x + radius, y + height));
        recPoints = recPoints.concat(PIXI.WebGLGraphics.quadraticBezierCurve(x + width - radius, y + height, x + width, y + height, x + width, y + height - radius));
        recPoints = recPoints.concat(PIXI.WebGLGraphics.quadraticBezierCurve(x + width, y + radius, x + width, y, x + width - radius, y));
        recPoints = recPoints.concat(PIXI.WebGLGraphics.quadraticBezierCurve(x + radius, y, x, y, x, y + radius));
        if (graphicsData.fill) {
            var color = PIXI.hex2rgb(graphicsData.fillColor);
            var alpha = graphicsData.fillAlpha;
            var r = color[0] * alpha;
            var g = color[1] * alpha;
            var b = color[2] * alpha;
            var verts = webGLData.points;
            var indices = webGLData.indices;
            var vecPos = verts.length / 6;
            var triangles = PIXI.PolyK.Triangulate(recPoints);
            var i = 0;
            for (i = 0; i < triangles.length; i += 3) {
                indices.push(triangles[i] + vecPos);
                indices.push(triangles[i] + vecPos);
                indices.push(triangles[i + 1] + vecPos);
                indices.push(triangles[i + 2] + vecPos);
                indices.push(triangles[i + 2] + vecPos);
            }
            for (i = 0; i < recPoints.length; i++) {
                verts.push(recPoints[i], recPoints[++i], r, g, b, alpha);
            }
        }
        if (graphicsData.lineWidth) {
            var tempPoints = graphicsData.points;
            graphicsData.points = recPoints;
            PIXI.WebGLGraphics.buildLine(graphicsData, webGLData);
            graphicsData.points = tempPoints;
        }
    };
    PIXI.WebGLGraphics.quadraticBezierCurve = function(fromX, fromY, cpX, cpY, toX, toY) {
        var xa, ya, xb, yb, x, y, n = 20, points = [];
        function getPt(n1, n2, perc) {
            var diff = n2 - n1;
            return n1 + diff * perc;
        }
        var j = 0;
        for (var i = 0; i <= n; i++) {
            j = i / n;
            xa = getPt(fromX, cpX, j);
            ya = getPt(fromY, cpY, j);
            xb = getPt(cpX, toX, j);
            yb = getPt(cpY, toY, j);
            x = getPt(xa, xb, j);
            y = getPt(ya, yb, j);
            points.push(x, y);
        }
        return points;
    };
    PIXI.WebGLGraphics.buildCircle = function(graphicsData, webGLData) {
        var circleData = graphicsData.shape;
        var x = circleData.x;
        var y = circleData.y;
        var width;
        var height;
        if (graphicsData.type === PIXI.Graphics.CIRC) {
            width = circleData.radius;
            height = circleData.radius;
        } else {
            width = circleData.width;
            height = circleData.height;
        }
        var totalSegs = 40;
        var seg = Math.PI * 2 / totalSegs;
        var i = 0;
        if (graphicsData.fill) {
            var color = PIXI.hex2rgb(graphicsData.fillColor);
            var alpha = graphicsData.fillAlpha;
            var r = color[0] * alpha;
            var g = color[1] * alpha;
            var b = color[2] * alpha;
            var verts = webGLData.points;
            var indices = webGLData.indices;
            var vecPos = verts.length / 6;
            indices.push(vecPos);
            for (i = 0; i < totalSegs + 1; i++) {
                verts.push(x, y, r, g, b, alpha);
                verts.push(x + Math.sin(seg * i) * width, y + Math.cos(seg * i) * height, r, g, b, alpha);
                indices.push(vecPos++, vecPos++);
            }
            indices.push(vecPos - 1);
        }
        if (graphicsData.lineWidth) {
            var tempPoints = graphicsData.points;
            graphicsData.points = [];
            for (i = 0; i < totalSegs + 1; i++) {
                graphicsData.points.push(x + Math.sin(seg * i) * width, y + Math.cos(seg * i) * height);
            }
            PIXI.WebGLGraphics.buildLine(graphicsData, webGLData);
            graphicsData.points = tempPoints;
        }
    };
    PIXI.WebGLGraphics.buildLine = function(graphicsData, webGLData) {
        var i = 0;
        var points = graphicsData.points;
        if (points.length === 0) return;
        if (graphicsData.lineWidth % 2) {
            for (i = 0; i < points.length; i++) {
                points[i] += .5;
            }
        }
        var firstPoint = new PIXI.Point(points[0], points[1]);
        var lastPoint = new PIXI.Point(points[points.length - 2], points[points.length - 1]);
        if (firstPoint.x === lastPoint.x && firstPoint.y === lastPoint.y) {
            points = points.slice();
            points.pop();
            points.pop();
            lastPoint = new PIXI.Point(points[points.length - 2], points[points.length - 1]);
            var midPointX = lastPoint.x + (firstPoint.x - lastPoint.x) * .5;
            var midPointY = lastPoint.y + (firstPoint.y - lastPoint.y) * .5;
            points.unshift(midPointX, midPointY);
            points.push(midPointX, midPointY);
        }
        var verts = webGLData.points;
        var indices = webGLData.indices;
        var length = points.length / 2;
        var indexCount = points.length;
        var indexStart = verts.length / 6;
        var width = graphicsData.lineWidth / 2;
        var color = PIXI.hex2rgb(graphicsData.lineColor);
        var alpha = graphicsData.lineAlpha;
        var r = color[0] * alpha;
        var g = color[1] * alpha;
        var b = color[2] * alpha;
        var px, py, p1x, p1y, p2x, p2y, p3x, p3y;
        var perpx, perpy, perp2x, perp2y, perp3x, perp3y;
        var a1, b1, c1, a2, b2, c2;
        var denom, pdist, dist;
        p1x = points[0];
        p1y = points[1];
        p2x = points[2];
        p2y = points[3];
        perpx = -(p1y - p2y);
        perpy = p1x - p2x;
        dist = Math.sqrt(perpx * perpx + perpy * perpy);
        perpx /= dist;
        perpy /= dist;
        perpx *= width;
        perpy *= width;
        verts.push(p1x - perpx, p1y - perpy, r, g, b, alpha);
        verts.push(p1x + perpx, p1y + perpy, r, g, b, alpha);
        for (i = 1; i < length - 1; i++) {
            p1x = points[(i - 1) * 2];
            p1y = points[(i - 1) * 2 + 1];
            p2x = points[i * 2];
            p2y = points[i * 2 + 1];
            p3x = points[(i + 1) * 2];
            p3y = points[(i + 1) * 2 + 1];
            perpx = -(p1y - p2y);
            perpy = p1x - p2x;
            dist = Math.sqrt(perpx * perpx + perpy * perpy);
            perpx /= dist;
            perpy /= dist;
            perpx *= width;
            perpy *= width;
            perp2x = -(p2y - p3y);
            perp2y = p2x - p3x;
            dist = Math.sqrt(perp2x * perp2x + perp2y * perp2y);
            perp2x /= dist;
            perp2y /= dist;
            perp2x *= width;
            perp2y *= width;
            a1 = -perpy + p1y - (-perpy + p2y);
            b1 = -perpx + p2x - (-perpx + p1x);
            c1 = (-perpx + p1x) * (-perpy + p2y) - (-perpx + p2x) * (-perpy + p1y);
            a2 = -perp2y + p3y - (-perp2y + p2y);
            b2 = -perp2x + p2x - (-perp2x + p3x);
            c2 = (-perp2x + p3x) * (-perp2y + p2y) - (-perp2x + p2x) * (-perp2y + p3y);
            denom = a1 * b2 - a2 * b1;
            if (Math.abs(denom) < .1) {
                denom += 10.1;
                verts.push(p2x - perpx, p2y - perpy, r, g, b, alpha);
                verts.push(p2x + perpx, p2y + perpy, r, g, b, alpha);
                continue;
            }
            px = (b1 * c2 - b2 * c1) / denom;
            py = (a2 * c1 - a1 * c2) / denom;
            pdist = (px - p2x) * (px - p2x) + (py - p2y) + (py - p2y);
            if (pdist > 140 * 140) {
                perp3x = perpx - perp2x;
                perp3y = perpy - perp2y;
                dist = Math.sqrt(perp3x * perp3x + perp3y * perp3y);
                perp3x /= dist;
                perp3y /= dist;
                perp3x *= width;
                perp3y *= width;
                verts.push(p2x - perp3x, p2y - perp3y);
                verts.push(r, g, b, alpha);
                verts.push(p2x + perp3x, p2y + perp3y);
                verts.push(r, g, b, alpha);
                verts.push(p2x - perp3x, p2y - perp3y);
                verts.push(r, g, b, alpha);
                indexCount++;
            } else {
                verts.push(px, py);
                verts.push(r, g, b, alpha);
                verts.push(p2x - (px - p2x), p2y - (py - p2y));
                verts.push(r, g, b, alpha);
            }
        }
        p1x = points[(length - 2) * 2];
        p1y = points[(length - 2) * 2 + 1];
        p2x = points[(length - 1) * 2];
        p2y = points[(length - 1) * 2 + 1];
        perpx = -(p1y - p2y);
        perpy = p1x - p2x;
        dist = Math.sqrt(perpx * perpx + perpy * perpy);
        perpx /= dist;
        perpy /= dist;
        perpx *= width;
        perpy *= width;
        verts.push(p2x - perpx, p2y - perpy);
        verts.push(r, g, b, alpha);
        verts.push(p2x + perpx, p2y + perpy);
        verts.push(r, g, b, alpha);
        indices.push(indexStart);
        for (i = 0; i < indexCount; i++) {
            indices.push(indexStart++);
        }
        indices.push(indexStart - 1);
    };
    PIXI.WebGLGraphics.buildComplexPoly = function(graphicsData, webGLData) {
        var points = graphicsData.points.slice();
        if (points.length < 6) return;
        var indices = webGLData.indices;
        webGLData.points = points;
        webGLData.alpha = graphicsData.fillAlpha;
        webGLData.color = PIXI.hex2rgb(graphicsData.fillColor);
        var minX = Infinity;
        var maxX = -Infinity;
        var minY = Infinity;
        var maxY = -Infinity;
        var x, y;
        for (var i = 0; i < points.length; i += 2) {
            x = points[i];
            y = points[i + 1];
            minX = x < minX ? x : minX;
            maxX = x > maxX ? x : maxX;
            minY = y < minY ? y : minY;
            maxY = y > maxY ? y : maxY;
        }
        points.push(minX, minY, maxX, minY, maxX, maxY, minX, maxY);
        var length = points.length / 2;
        for (i = 0; i < length; i++) {
            indices.push(i);
        }
    };
    PIXI.WebGLGraphics.buildPoly = function(graphicsData, webGLData) {
        var points = graphicsData.points;
        if (points.length < 6) return;
        var verts = webGLData.points;
        var indices = webGLData.indices;
        var length = points.length / 2;
        var color = PIXI.hex2rgb(graphicsData.fillColor);
        var alpha = graphicsData.fillAlpha;
        var r = color[0] * alpha;
        var g = color[1] * alpha;
        var b = color[2] * alpha;
        var triangles = PIXI.PolyK.Triangulate(points);
        if (!triangles) return false;
        var vertPos = verts.length / 6;
        var i = 0;
        for (i = 0; i < triangles.length; i += 3) {
            indices.push(triangles[i] + vertPos);
            indices.push(triangles[i] + vertPos);
            indices.push(triangles[i + 1] + vertPos);
            indices.push(triangles[i + 2] + vertPos);
            indices.push(triangles[i + 2] + vertPos);
        }
        for (i = 0; i < length; i++) {
            verts.push(points[i * 2], points[i * 2 + 1], r, g, b, alpha);
        }
        return true;
    };
    PIXI.WebGLGraphics.graphicsDataPool = [];
    PIXI.WebGLGraphicsData = function(gl) {
        this.gl = gl;
        this.color = [ 0, 0, 0 ];
        this.points = [];
        this.indices = [];
        this.lastIndex = 0;
        this.buffer = gl.createBuffer();
        this.indexBuffer = gl.createBuffer();
        this.mode = 1;
        this.alpha = 1;
        this.dirty = true;
    };
    PIXI.WebGLGraphicsData.prototype.reset = function() {
        this.points = [];
        this.indices = [];
        this.lastIndex = 0;
    };
    PIXI.WebGLGraphicsData.prototype.upload = function() {
        var gl = this.gl;
        this.glPoints = new PIXI.Float32Array(this.points);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.glPoints, gl.STATIC_DRAW);
        this.glIndicies = new PIXI.Uint16Array(this.indices);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.glIndicies, gl.STATIC_DRAW);
        this.dirty = false;
    };
    PIXI.glContexts = [];
    PIXI.instances = [];
    PIXI.WebGLRenderer = function(width, height, options) {
        if (options) {
            for (var i in PIXI.defaultRenderOptions) {
                if (typeof options[i] === "undefined") options[i] = PIXI.defaultRenderOptions[i];
            }
        } else {
            options = PIXI.defaultRenderOptions;
        }
        if (!PIXI.defaultRenderer) {
            PIXI.sayHello("webGL");
            PIXI.defaultRenderer = this;
        }
        this.type = PIXI.WEBGL_RENDERER;
        this.resolution = options.resolution;
        this.transparent = options.transparent;
        this.autoResize = options.autoResize || false;
        this.preserveDrawingBuffer = options.preserveDrawingBuffer;
        this.clearBeforeRender = options.clearBeforeRender;
        this.width = width || 800;
        this.height = height || 600;
        this.view = options.view || document.createElement("canvas");
        this.contextLostBound = this.handleContextLost.bind(this);
        this.contextRestoredBound = this.handleContextRestored.bind(this);
        this.view.addEventListener("webglcontextlost", this.contextLostBound, false);
        this.view.addEventListener("webglcontextrestored", this.contextRestoredBound, false);
        this._contextOptions = {
            alpha: this.transparent,
            antialias: options.antialias,
            premultipliedAlpha: this.transparent && this.transparent !== "notMultiplied",
            stencil: true,
            preserveDrawingBuffer: options.preserveDrawingBuffer
        };
        this.projection = new PIXI.Point();
        this.offset = new PIXI.Point(0, 0);
        this.shaderManager = new PIXI.WebGLShaderManager();
        this.spriteBatch = new PIXI.WebGLSpriteBatch();
        this.maskManager = new PIXI.WebGLMaskManager();
        this.filterManager = new PIXI.WebGLFilterManager();
        this.stencilManager = new PIXI.WebGLStencilManager();
        this.blendModeManager = new PIXI.WebGLBlendModeManager();
        this.renderSession = {};
        this.renderSession.gl = this.gl;
        this.renderSession.drawCount = 0;
        this.renderSession.shaderManager = this.shaderManager;
        this.renderSession.maskManager = this.maskManager;
        this.renderSession.filterManager = this.filterManager;
        this.renderSession.blendModeManager = this.blendModeManager;
        this.renderSession.spriteBatch = this.spriteBatch;
        this.renderSession.stencilManager = this.stencilManager;
        this.renderSession.renderer = this;
        this.renderSession.resolution = this.resolution;
        this.initContext();
        this.mapBlendModes();
    };
    PIXI.WebGLRenderer.prototype.constructor = PIXI.WebGLRenderer;
    PIXI.WebGLRenderer.prototype.initContext = function() {
        var gl = this.view.getContext("webgl", this._contextOptions) || this.view.getContext("experimental-webgl", this._contextOptions);
        this.gl = gl;
        if (!gl) {
            throw new Error("This browser does not support webGL. Try using the canvas renderer");
        }
        this.glContextId = gl.id = PIXI.WebGLRenderer.glContextId++;
        PIXI.glContexts[this.glContextId] = gl;
        PIXI.instances[this.glContextId] = this;
        gl.disable(gl.DEPTH_TEST);
        gl.disable(gl.CULL_FACE);
        gl.enable(gl.BLEND);
        this.shaderManager.setContext(gl);
        this.spriteBatch.setContext(gl);
        this.maskManager.setContext(gl);
        this.filterManager.setContext(gl);
        this.blendModeManager.setContext(gl);
        this.stencilManager.setContext(gl);
        this.renderSession.gl = this.gl;
        this.resize(this.width, this.height);
    };
    PIXI.WebGLRenderer.prototype.render = function(stage) {
        if (this.contextLost) return;
        if (this.__stage !== stage) {
            if (stage.interactive) stage.interactionManager.removeEvents();
            this.__stage = stage;
        }
        stage.updateTransform();
        var gl = this.gl;
        if (stage._interactive) {
            if (!stage._interactiveEventsAdded) {
                stage._interactiveEventsAdded = true;
                stage.interactionManager.setTarget(this);
            }
        } else {
            if (stage._interactiveEventsAdded) {
                stage._interactiveEventsAdded = false;
                stage.interactionManager.setTarget(this);
            }
        }
        gl.viewport(0, 0, this.width, this.height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        if (this.clearBeforeRender) {
            if (this.transparent) {
                gl.clearColor(0, 0, 0, 0);
            } else {
                gl.clearColor(stage.backgroundColorSplit[0], stage.backgroundColorSplit[1], stage.backgroundColorSplit[2], 1);
            }
            gl.clear(gl.COLOR_BUFFER_BIT);
        }
        this.renderDisplayObject(stage, this.projection);
    };
    PIXI.WebGLRenderer.prototype.renderDisplayObject = function(displayObject, projection, buffer) {
        this.renderSession.blendModeManager.setBlendMode(PIXI.blendModes.NORMAL);
        this.renderSession.drawCount = 0;
        this.renderSession.projection = projection;
        this.renderSession.offset = this.offset;
        this.spriteBatch.begin(this.renderSession);
        this.filterManager.begin(this.renderSession, buffer);
        displayObject._renderWebGL(this.renderSession);
        this.spriteBatch.end();
    };
    PIXI.WebGLRenderer.prototype.resize = function(width, height) {
        this.width = width * this.resolution;
        this.height = height * this.resolution;
        this.view.width = this.width;
        this.view.height = this.height;
        if (this.autoResize) {
            this.view.style.width = this.width / this.resolution + "px";
            this.view.style.height = this.height / this.resolution + "px";
        }
        this.gl.viewport(0, 0, this.width, this.height);
        this.projection.x = this.width / 2 / this.resolution;
        this.projection.y = -this.height / 2 / this.resolution;
    };
    PIXI.WebGLRenderer.prototype.updateTexture = function(texture) {
        if (!texture.hasLoaded) return;
        var gl = this.gl;
        if (!texture._glTextures[gl.id]) texture._glTextures[gl.id] = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture._glTextures[gl.id]);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, texture.premultipliedAlpha);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.source);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, texture.scaleMode === PIXI.scaleModes.LINEAR ? gl.LINEAR : gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, texture.scaleMode === PIXI.scaleModes.LINEAR ? gl.LINEAR : gl.NEAREST);
        if (!texture._powerOf2) {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        } else {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
        }
        texture._dirty[gl.id] = false;
        return texture._glTextures[gl.id];
    };
    PIXI.WebGLRenderer.prototype.handleContextLost = function(event) {
        event.preventDefault();
        this.contextLost = true;
    };
    PIXI.WebGLRenderer.prototype.handleContextRestored = function() {
        this.initContext();
        for (var key in PIXI.TextureCache) {
            var texture = PIXI.TextureCache[key].baseTexture;
            texture._glTextures = [];
        }
        this.contextLost = false;
    };
    PIXI.WebGLRenderer.prototype.destroy = function() {
        this.view.removeEventListener("webglcontextlost", this.contextLostBound);
        this.view.removeEventListener("webglcontextrestored", this.contextRestoredBound);
        PIXI.glContexts[this.glContextId] = null;
        this.projection = null;
        this.offset = null;
        this.shaderManager.destroy();
        this.spriteBatch.destroy();
        this.maskManager.destroy();
        this.filterManager.destroy();
        this.shaderManager = null;
        this.spriteBatch = null;
        this.maskManager = null;
        this.filterManager = null;
        this.gl = null;
        this.renderSession = null;
    };
    PIXI.WebGLRenderer.prototype.mapBlendModes = function() {
        var gl = this.gl;
        if (!PIXI.blendModesWebGL) {
            PIXI.blendModesWebGL = [];
            PIXI.blendModesWebGL[PIXI.blendModes.NORMAL] = [ gl.ONE, gl.ONE_MINUS_SRC_ALPHA ];
            PIXI.blendModesWebGL[PIXI.blendModes.ADD] = [ gl.SRC_ALPHA, gl.DST_ALPHA ];
            PIXI.blendModesWebGL[PIXI.blendModes.MULTIPLY] = [ gl.DST_COLOR, gl.ONE_MINUS_SRC_ALPHA ];
            PIXI.blendModesWebGL[PIXI.blendModes.SCREEN] = [ gl.SRC_ALPHA, gl.ONE ];
            PIXI.blendModesWebGL[PIXI.blendModes.OVERLAY] = [ gl.ONE, gl.ONE_MINUS_SRC_ALPHA ];
            PIXI.blendModesWebGL[PIXI.blendModes.DARKEN] = [ gl.ONE, gl.ONE_MINUS_SRC_ALPHA ];
            PIXI.blendModesWebGL[PIXI.blendModes.LIGHTEN] = [ gl.ONE, gl.ONE_MINUS_SRC_ALPHA ];
            PIXI.blendModesWebGL[PIXI.blendModes.COLOR_DODGE] = [ gl.ONE, gl.ONE_MINUS_SRC_ALPHA ];
            PIXI.blendModesWebGL[PIXI.blendModes.COLOR_BURN] = [ gl.ONE, gl.ONE_MINUS_SRC_ALPHA ];
            PIXI.blendModesWebGL[PIXI.blendModes.HARD_LIGHT] = [ gl.ONE, gl.ONE_MINUS_SRC_ALPHA ];
            PIXI.blendModesWebGL[PIXI.blendModes.SOFT_LIGHT] = [ gl.ONE, gl.ONE_MINUS_SRC_ALPHA ];
            PIXI.blendModesWebGL[PIXI.blendModes.DIFFERENCE] = [ gl.ONE, gl.ONE_MINUS_SRC_ALPHA ];
            PIXI.blendModesWebGL[PIXI.blendModes.EXCLUSION] = [ gl.ONE, gl.ONE_MINUS_SRC_ALPHA ];
            PIXI.blendModesWebGL[PIXI.blendModes.HUE] = [ gl.ONE, gl.ONE_MINUS_SRC_ALPHA ];
            PIXI.blendModesWebGL[PIXI.blendModes.SATURATION] = [ gl.ONE, gl.ONE_MINUS_SRC_ALPHA ];
            PIXI.blendModesWebGL[PIXI.blendModes.COLOR] = [ gl.ONE, gl.ONE_MINUS_SRC_ALPHA ];
            PIXI.blendModesWebGL[PIXI.blendModes.LUMINOSITY] = [ gl.ONE, gl.ONE_MINUS_SRC_ALPHA ];
        }
    };
    PIXI.WebGLRenderer.glContextId = 0;
    PIXI.WebGLBlendModeManager = function() {
        this.currentBlendMode = 99999;
    };
    PIXI.WebGLBlendModeManager.prototype.constructor = PIXI.WebGLBlendModeManager;
    PIXI.WebGLBlendModeManager.prototype.setContext = function(gl) {
        this.gl = gl;
    };
    PIXI.WebGLBlendModeManager.prototype.setBlendMode = function(blendMode) {
        if (this.currentBlendMode === blendMode) return false;
        this.currentBlendMode = blendMode;
        var blendModeWebGL = PIXI.blendModesWebGL[this.currentBlendMode];
        this.gl.blendFunc(blendModeWebGL[0], blendModeWebGL[1]);
        return true;
    };
    PIXI.WebGLBlendModeManager.prototype.destroy = function() {
        this.gl = null;
    };
    PIXI.WebGLMaskManager = function() {};
    PIXI.WebGLMaskManager.prototype.constructor = PIXI.WebGLMaskManager;
    PIXI.WebGLMaskManager.prototype.setContext = function(gl) {
        this.gl = gl;
    };
    PIXI.WebGLMaskManager.prototype.pushMask = function(maskData, renderSession) {
        var gl = renderSession.gl;
        if (maskData.dirty) {
            PIXI.WebGLGraphics.updateGraphics(maskData, gl);
        }
        if (!maskData._webGL[gl.id].data.length) return;
        renderSession.stencilManager.pushStencil(maskData, maskData._webGL[gl.id].data[0], renderSession);
    };
    PIXI.WebGLMaskManager.prototype.popMask = function(maskData, renderSession) {
        var gl = this.gl;
        renderSession.stencilManager.popStencil(maskData, maskData._webGL[gl.id].data[0], renderSession);
    };
    PIXI.WebGLMaskManager.prototype.destroy = function() {
        this.gl = null;
    };
    PIXI.WebGLStencilManager = function() {
        this.stencilStack = [];
        this.reverse = true;
        this.count = 0;
    };
    PIXI.WebGLStencilManager.prototype.setContext = function(gl) {
        this.gl = gl;
    };
    PIXI.WebGLStencilManager.prototype.pushStencil = function(graphics, webGLData, renderSession) {
        var gl = this.gl;
        this.bindGraphics(graphics, webGLData, renderSession);
        if (this.stencilStack.length === 0) {
            gl.enable(gl.STENCIL_TEST);
            gl.clear(gl.STENCIL_BUFFER_BIT);
            this.reverse = true;
            this.count = 0;
        }
        this.stencilStack.push(webGLData);
        var level = this.count;
        gl.colorMask(false, false, false, false);
        gl.stencilFunc(gl.ALWAYS, 0, 255);
        gl.stencilOp(gl.KEEP, gl.KEEP, gl.INVERT);
        if (webGLData.mode === 1) {
            gl.drawElements(gl.TRIANGLE_FAN, webGLData.indices.length - 4, gl.UNSIGNED_SHORT, 0);
            if (this.reverse) {
                gl.stencilFunc(gl.EQUAL, 255 - level, 255);
                gl.stencilOp(gl.KEEP, gl.KEEP, gl.DECR);
            } else {
                gl.stencilFunc(gl.EQUAL, level, 255);
                gl.stencilOp(gl.KEEP, gl.KEEP, gl.INCR);
            }
            gl.drawElements(gl.TRIANGLE_FAN, 4, gl.UNSIGNED_SHORT, (webGLData.indices.length - 4) * 2);
            if (this.reverse) {
                gl.stencilFunc(gl.EQUAL, 255 - (level + 1), 255);
            } else {
                gl.stencilFunc(gl.EQUAL, level + 1, 255);
            }
            this.reverse = !this.reverse;
        } else {
            if (!this.reverse) {
                gl.stencilFunc(gl.EQUAL, 255 - level, 255);
                gl.stencilOp(gl.KEEP, gl.KEEP, gl.DECR);
            } else {
                gl.stencilFunc(gl.EQUAL, level, 255);
                gl.stencilOp(gl.KEEP, gl.KEEP, gl.INCR);
            }
            gl.drawElements(gl.TRIANGLE_STRIP, webGLData.indices.length, gl.UNSIGNED_SHORT, 0);
            if (!this.reverse) {
                gl.stencilFunc(gl.EQUAL, 255 - (level + 1), 255);
            } else {
                gl.stencilFunc(gl.EQUAL, level + 1, 255);
            }
        }
        gl.colorMask(true, true, true, true);
        gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
        this.count++;
    };
    PIXI.WebGLStencilManager.prototype.bindGraphics = function(graphics, webGLData, renderSession) {
        this._currentGraphics = graphics;
        var gl = this.gl;
        var projection = renderSession.projection, offset = renderSession.offset, shader;
        if (webGLData.mode === 1) {
            shader = renderSession.shaderManager.complexPrimitiveShader;
            renderSession.shaderManager.setShader(shader);
            gl.uniformMatrix3fv(shader.translationMatrix, false, graphics.worldTransform.toArray(true));
            gl.uniform2f(shader.projectionVector, projection.x, -projection.y);
            gl.uniform2f(shader.offsetVector, -offset.x, -offset.y);
            gl.uniform3fv(shader.tintColor, PIXI.hex2rgb(graphics.tint));
            gl.uniform3fv(shader.color, webGLData.color);
            gl.uniform1f(shader.alpha, graphics.worldAlpha * webGLData.alpha);
            gl.bindBuffer(gl.ARRAY_BUFFER, webGLData.buffer);
            gl.vertexAttribPointer(shader.aVertexPosition, 2, gl.FLOAT, false, 4 * 2, 0);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, webGLData.indexBuffer);
        } else {
            shader = renderSession.shaderManager.primitiveShader;
            renderSession.shaderManager.setShader(shader);
            gl.uniformMatrix3fv(shader.translationMatrix, false, graphics.worldTransform.toArray(true));
            gl.uniform2f(shader.projectionVector, projection.x, -projection.y);
            gl.uniform2f(shader.offsetVector, -offset.x, -offset.y);
            gl.uniform3fv(shader.tintColor, PIXI.hex2rgb(graphics.tint));
            gl.uniform1f(shader.alpha, graphics.worldAlpha);
            gl.bindBuffer(gl.ARRAY_BUFFER, webGLData.buffer);
            gl.vertexAttribPointer(shader.aVertexPosition, 2, gl.FLOAT, false, 4 * 6, 0);
            gl.vertexAttribPointer(shader.colorAttribute, 4, gl.FLOAT, false, 4 * 6, 2 * 4);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, webGLData.indexBuffer);
        }
    };
    PIXI.WebGLStencilManager.prototype.popStencil = function(graphics, webGLData, renderSession) {
        var gl = this.gl;
        this.stencilStack.pop();
        this.count--;
        if (this.stencilStack.length === 0) {
            gl.disable(gl.STENCIL_TEST);
        } else {
            var level = this.count;
            this.bindGraphics(graphics, webGLData, renderSession);
            gl.colorMask(false, false, false, false);
            if (webGLData.mode === 1) {
                this.reverse = !this.reverse;
                if (this.reverse) {
                    gl.stencilFunc(gl.EQUAL, 255 - (level + 1), 255);
                    gl.stencilOp(gl.KEEP, gl.KEEP, gl.INCR);
                } else {
                    gl.stencilFunc(gl.EQUAL, level + 1, 255);
                    gl.stencilOp(gl.KEEP, gl.KEEP, gl.DECR);
                }
                gl.drawElements(gl.TRIANGLE_FAN, 4, gl.UNSIGNED_SHORT, (webGLData.indices.length - 4) * 2);
                gl.stencilFunc(gl.ALWAYS, 0, 255);
                gl.stencilOp(gl.KEEP, gl.KEEP, gl.INVERT);
                gl.drawElements(gl.TRIANGLE_FAN, webGLData.indices.length - 4, gl.UNSIGNED_SHORT, 0);
                if (!this.reverse) {
                    gl.stencilFunc(gl.EQUAL, 255 - level, 255);
                } else {
                    gl.stencilFunc(gl.EQUAL, level, 255);
                }
            } else {
                if (!this.reverse) {
                    gl.stencilFunc(gl.EQUAL, 255 - (level + 1), 255);
                    gl.stencilOp(gl.KEEP, gl.KEEP, gl.INCR);
                } else {
                    gl.stencilFunc(gl.EQUAL, level + 1, 255);
                    gl.stencilOp(gl.KEEP, gl.KEEP, gl.DECR);
                }
                gl.drawElements(gl.TRIANGLE_STRIP, webGLData.indices.length, gl.UNSIGNED_SHORT, 0);
                if (!this.reverse) {
                    gl.stencilFunc(gl.EQUAL, 255 - level, 255);
                } else {
                    gl.stencilFunc(gl.EQUAL, level, 255);
                }
            }
            gl.colorMask(true, true, true, true);
            gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
        }
    };
    PIXI.WebGLStencilManager.prototype.destroy = function() {
        this.stencilStack = null;
        this.gl = null;
    };
    PIXI.WebGLShaderManager = function() {
        this.maxAttibs = 10;
        this.attribState = [];
        this.tempAttribState = [];
        for (var i = 0; i < this.maxAttibs; i++) {
            this.attribState[i] = false;
        }
        this.stack = [];
    };
    PIXI.WebGLShaderManager.prototype.constructor = PIXI.WebGLShaderManager;
    PIXI.WebGLShaderManager.prototype.setContext = function(gl) {
        this.gl = gl;
        this.primitiveShader = new PIXI.PrimitiveShader(gl);
        this.complexPrimitiveShader = new PIXI.ComplexPrimitiveShader(gl);
        this.defaultShader = new PIXI.PixiShader(gl);
        this.fastShader = new PIXI.PixiFastShader(gl);
        this.stripShader = new PIXI.StripShader(gl);
        this.setShader(this.defaultShader);
    };
    PIXI.WebGLShaderManager.prototype.setAttribs = function(attribs) {
        var i;
        for (i = 0; i < this.tempAttribState.length; i++) {
            this.tempAttribState[i] = false;
        }
        for (i = 0; i < attribs.length; i++) {
            var attribId = attribs[i];
            this.tempAttribState[attribId] = true;
        }
        var gl = this.gl;
        for (i = 0; i < this.attribState.length; i++) {
            if (this.attribState[i] !== this.tempAttribState[i]) {
                this.attribState[i] = this.tempAttribState[i];
                if (this.tempAttribState[i]) {
                    gl.enableVertexAttribArray(i);
                } else {
                    gl.disableVertexAttribArray(i);
                }
            }
        }
    };
    PIXI.WebGLShaderManager.prototype.setShader = function(shader) {
        if (this._currentId === shader._UID) return false;
        this._currentId = shader._UID;
        this.currentShader = shader;
        this.gl.useProgram(shader.program);
        this.setAttribs(shader.attributes);
        return true;
    };
    PIXI.WebGLShaderManager.prototype.destroy = function() {
        this.attribState = null;
        this.tempAttribState = null;
        this.primitiveShader.destroy();
        this.complexPrimitiveShader.destroy();
        this.defaultShader.destroy();
        this.fastShader.destroy();
        this.stripShader.destroy();
        this.gl = null;
    };
    PIXI.WebGLSpriteBatch = function() {
        this.vertSize = 6;
        this.size = 2e3;
        var numVerts = this.size * 4 * this.vertSize;
        var numIndices = this.size * 6;
        this.vertices = new PIXI.Float32Array(numVerts);
        this.indices = new PIXI.Uint16Array(numIndices);
        this.lastIndexCount = 0;
        for (var i = 0, j = 0; i < numIndices; i += 6, j += 4) {
            this.indices[i + 0] = j + 0;
            this.indices[i + 1] = j + 1;
            this.indices[i + 2] = j + 2;
            this.indices[i + 3] = j + 0;
            this.indices[i + 4] = j + 2;
            this.indices[i + 5] = j + 3;
        }
        this.drawing = false;
        this.currentBatchSize = 0;
        this.currentBaseTexture = null;
        this.dirty = true;
        this.textures = [];
        this.blendModes = [];
        this.shaders = [];
        this.sprites = [];
        this.defaultShader = new PIXI.AbstractFilter([ "precision lowp float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform sampler2D uSampler;", "void main(void) {", "   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;", "}" ]);
    };
    PIXI.WebGLSpriteBatch.prototype.setContext = function(gl) {
        this.gl = gl;
        this.vertexBuffer = gl.createBuffer();
        this.indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.DYNAMIC_DRAW);
        this.currentBlendMode = 99999;
        var shader = new PIXI.PixiShader(gl);
        shader.fragmentSrc = this.defaultShader.fragmentSrc;
        shader.uniforms = {};
        shader.init();
        this.defaultShader.shaders[gl.id] = shader;
    };
    PIXI.WebGLSpriteBatch.prototype.begin = function(renderSession) {
        this.renderSession = renderSession;
        this.shader = this.renderSession.shaderManager.defaultShader;
        this.start();
    };
    PIXI.WebGLSpriteBatch.prototype.end = function() {
        this.flush();
    };
    PIXI.WebGLSpriteBatch.prototype.render = function(sprite) {
        var texture = sprite.texture;
        if (this.currentBatchSize >= this.size) {
            this.flush();
            this.currentBaseTexture = texture.baseTexture;
        }
        var uvs = texture._uvs;
        if (!uvs) return;
        var alpha = sprite.worldAlpha;
        var tint = sprite.tint;
        var verticies = this.vertices;
        var aX = sprite.anchor.x;
        var aY = sprite.anchor.y;
        var w0, w1, h0, h1;
        if (texture.trim) {
            var trim = texture.trim;
            w1 = trim.x - aX * trim.width;
            w0 = w1 + texture.crop.width;
            h1 = trim.y - aY * trim.height;
            h0 = h1 + texture.crop.height;
        } else {
            w0 = texture.frame.width * (1 - aX);
            w1 = texture.frame.width * -aX;
            h0 = texture.frame.height * (1 - aY);
            h1 = texture.frame.height * -aY;
        }
        var index = this.currentBatchSize * 4 * this.vertSize;
        var resolution = texture.baseTexture.resolution;
        var worldTransform = sprite.worldTransform;
        var a = worldTransform.a / resolution;
        var b = worldTransform.b / resolution;
        var c = worldTransform.c / resolution;
        var d = worldTransform.d / resolution;
        var tx = worldTransform.tx;
        var ty = worldTransform.ty;
        verticies[index++] = a * w1 + c * h1 + tx;
        verticies[index++] = d * h1 + b * w1 + ty;
        verticies[index++] = uvs.x0;
        verticies[index++] = uvs.y0;
        verticies[index++] = alpha;
        verticies[index++] = tint;
        verticies[index++] = a * w0 + c * h1 + tx;
        verticies[index++] = d * h1 + b * w0 + ty;
        verticies[index++] = uvs.x1;
        verticies[index++] = uvs.y1;
        verticies[index++] = alpha;
        verticies[index++] = tint;
        verticies[index++] = a * w0 + c * h0 + tx;
        verticies[index++] = d * h0 + b * w0 + ty;
        verticies[index++] = uvs.x2;
        verticies[index++] = uvs.y2;
        verticies[index++] = alpha;
        verticies[index++] = tint;
        verticies[index++] = a * w1 + c * h0 + tx;
        verticies[index++] = d * h0 + b * w1 + ty;
        verticies[index++] = uvs.x3;
        verticies[index++] = uvs.y3;
        verticies[index++] = alpha;
        verticies[index++] = tint;
        this.sprites[this.currentBatchSize++] = sprite;
    };
    PIXI.WebGLSpriteBatch.prototype.renderTilingSprite = function(tilingSprite) {
        var texture = tilingSprite.tilingTexture;
        if (this.currentBatchSize >= this.size) {
            this.flush();
            this.currentBaseTexture = texture.baseTexture;
        }
        if (!tilingSprite._uvs) tilingSprite._uvs = new PIXI.TextureUvs();
        var uvs = tilingSprite._uvs;
        tilingSprite.tilePosition.x %= texture.baseTexture.width * tilingSprite.tileScaleOffset.x;
        tilingSprite.tilePosition.y %= texture.baseTexture.height * tilingSprite.tileScaleOffset.y;
        var offsetX = tilingSprite.tilePosition.x / (texture.baseTexture.width * tilingSprite.tileScaleOffset.x);
        var offsetY = tilingSprite.tilePosition.y / (texture.baseTexture.height * tilingSprite.tileScaleOffset.y);
        var scaleX = tilingSprite.width / texture.baseTexture.width / (tilingSprite.tileScale.x * tilingSprite.tileScaleOffset.x);
        var scaleY = tilingSprite.height / texture.baseTexture.height / (tilingSprite.tileScale.y * tilingSprite.tileScaleOffset.y);
        uvs.x0 = 0 - offsetX;
        uvs.y0 = 0 - offsetY;
        uvs.x1 = 1 * scaleX - offsetX;
        uvs.y1 = 0 - offsetY;
        uvs.x2 = 1 * scaleX - offsetX;
        uvs.y2 = 1 * scaleY - offsetY;
        uvs.x3 = 0 - offsetX;
        uvs.y3 = 1 * scaleY - offsetY;
        var alpha = tilingSprite.worldAlpha;
        var tint = tilingSprite.tint;
        var verticies = this.vertices;
        var width = tilingSprite.width;
        var height = tilingSprite.height;
        var aX = tilingSprite.anchor.x;
        var aY = tilingSprite.anchor.y;
        var w0 = width * (1 - aX);
        var w1 = width * -aX;
        var h0 = height * (1 - aY);
        var h1 = height * -aY;
        var index = this.currentBatchSize * 4 * this.vertSize;
        var resolution = texture.baseTexture.resolution;
        var worldTransform = tilingSprite.worldTransform;
        var a = worldTransform.a / resolution;
        var b = worldTransform.b / resolution;
        var c = worldTransform.c / resolution;
        var d = worldTransform.d / resolution;
        var tx = worldTransform.tx;
        var ty = worldTransform.ty;
        verticies[index++] = a * w1 + c * h1 + tx;
        verticies[index++] = d * h1 + b * w1 + ty;
        verticies[index++] = uvs.x0;
        verticies[index++] = uvs.y0;
        verticies[index++] = alpha;
        verticies[index++] = tint;
        verticies[index++] = a * w0 + c * h1 + tx;
        verticies[index++] = d * h1 + b * w0 + ty;
        verticies[index++] = uvs.x1;
        verticies[index++] = uvs.y1;
        verticies[index++] = alpha;
        verticies[index++] = tint;
        verticies[index++] = a * w0 + c * h0 + tx;
        verticies[index++] = d * h0 + b * w0 + ty;
        verticies[index++] = uvs.x2;
        verticies[index++] = uvs.y2;
        verticies[index++] = alpha;
        verticies[index++] = tint;
        verticies[index++] = a * w1 + c * h0 + tx;
        verticies[index++] = d * h0 + b * w1 + ty;
        verticies[index++] = uvs.x3;
        verticies[index++] = uvs.y3;
        verticies[index++] = alpha;
        verticies[index++] = tint;
        this.sprites[this.currentBatchSize++] = tilingSprite;
    };
    PIXI.WebGLSpriteBatch.prototype.flush = function() {
        if (this.currentBatchSize === 0) return;
        var gl = this.gl;
        var shader;
        if (this.dirty) {
            this.dirty = false;
            gl.activeTexture(gl.TEXTURE0);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
            shader = this.defaultShader.shaders[gl.id];
            var stride = this.vertSize * 4;
            gl.vertexAttribPointer(shader.aVertexPosition, 2, gl.FLOAT, false, stride, 0);
            gl.vertexAttribPointer(shader.aTextureCoord, 2, gl.FLOAT, false, stride, 2 * 4);
            gl.vertexAttribPointer(shader.colorAttribute, 2, gl.FLOAT, false, stride, 4 * 4);
        }
        if (this.currentBatchSize > this.size * .5) {
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.vertices);
        } else {
            var view = this.vertices.subarray(0, this.currentBatchSize * 4 * this.vertSize);
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, view);
        }
        var nextTexture, nextBlendMode, nextShader;
        var batchSize = 0;
        var start = 0;
        var currentBaseTexture = null;
        var currentBlendMode = this.renderSession.blendModeManager.currentBlendMode;
        var currentShader = null;
        var blendSwap = false;
        var shaderSwap = false;
        var sprite;
        for (var i = 0, j = this.currentBatchSize; i < j; i++) {
            sprite = this.sprites[i];
            nextTexture = sprite.texture.baseTexture;
            nextBlendMode = sprite.blendMode;
            nextShader = sprite.shader || this.defaultShader;
            blendSwap = currentBlendMode !== nextBlendMode;
            shaderSwap = currentShader !== nextShader;
            if (currentBaseTexture !== nextTexture || blendSwap || shaderSwap) {
                this.renderBatch(currentBaseTexture, batchSize, start);
                start = i;
                batchSize = 0;
                currentBaseTexture = nextTexture;
                if (blendSwap) {
                    currentBlendMode = nextBlendMode;
                    this.renderSession.blendModeManager.setBlendMode(currentBlendMode);
                }
                if (shaderSwap) {
                    currentShader = nextShader;
                    shader = currentShader.shaders[gl.id];
                    if (!shader) {
                        shader = new PIXI.PixiShader(gl);
                        shader.fragmentSrc = currentShader.fragmentSrc;
                        shader.uniforms = currentShader.uniforms;
                        shader.init();
                        currentShader.shaders[gl.id] = shader;
                    }
                    this.renderSession.shaderManager.setShader(shader);
                    if (shader.dirty) shader.syncUniforms();
                    var projection = this.renderSession.projection;
                    gl.uniform2f(shader.projectionVector, projection.x, projection.y);
                    var offsetVector = this.renderSession.offset;
                    gl.uniform2f(shader.offsetVector, offsetVector.x, offsetVector.y);
                }
            }
            batchSize++;
        }
        this.renderBatch(currentBaseTexture, batchSize, start);
        this.currentBatchSize = 0;
    };
    PIXI.WebGLSpriteBatch.prototype.renderBatch = function(texture, size, startIndex) {
        if (size === 0) return;
        var gl = this.gl;
        if (texture._dirty[gl.id]) {
            this.renderSession.renderer.updateTexture(texture);
        } else {
            gl.bindTexture(gl.TEXTURE_2D, texture._glTextures[gl.id]);
        }
        gl.drawElements(gl.TRIANGLES, size * 6, gl.UNSIGNED_SHORT, startIndex * 6 * 2);
        this.renderSession.drawCount++;
    };
    PIXI.WebGLSpriteBatch.prototype.stop = function() {
        this.flush();
        this.dirty = true;
    };
    PIXI.WebGLSpriteBatch.prototype.start = function() {
        this.dirty = true;
    };
    PIXI.WebGLSpriteBatch.prototype.destroy = function() {
        this.vertices = null;
        this.indices = null;
        this.gl.deleteBuffer(this.vertexBuffer);
        this.gl.deleteBuffer(this.indexBuffer);
        this.currentBaseTexture = null;
        this.gl = null;
    };
    PIXI.WebGLFastSpriteBatch = function(gl) {
        this.vertSize = 10;
        this.maxSize = 6e3;
        this.size = this.maxSize;
        var numVerts = this.size * 4 * this.vertSize;
        var numIndices = this.maxSize * 6;
        this.vertices = new PIXI.Float32Array(numVerts);
        this.indices = new PIXI.Uint16Array(numIndices);
        this.vertexBuffer = null;
        this.indexBuffer = null;
        this.lastIndexCount = 0;
        for (var i = 0, j = 0; i < numIndices; i += 6, j += 4) {
            this.indices[i + 0] = j + 0;
            this.indices[i + 1] = j + 1;
            this.indices[i + 2] = j + 2;
            this.indices[i + 3] = j + 0;
            this.indices[i + 4] = j + 2;
            this.indices[i + 5] = j + 3;
        }
        this.drawing = false;
        this.currentBatchSize = 0;
        this.currentBaseTexture = null;
        this.currentBlendMode = 0;
        this.renderSession = null;
        this.shader = null;
        this.matrix = null;
        this.setContext(gl);
    };
    PIXI.WebGLFastSpriteBatch.prototype.constructor = PIXI.WebGLFastSpriteBatch;
    PIXI.WebGLFastSpriteBatch.prototype.setContext = function(gl) {
        this.gl = gl;
        this.vertexBuffer = gl.createBuffer();
        this.indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.DYNAMIC_DRAW);
    };
    PIXI.WebGLFastSpriteBatch.prototype.begin = function(spriteBatch, renderSession) {
        this.renderSession = renderSession;
        this.shader = this.renderSession.shaderManager.fastShader;
        this.matrix = spriteBatch.worldTransform.toArray(true);
        this.start();
    };
    PIXI.WebGLFastSpriteBatch.prototype.end = function() {
        this.flush();
    };
    PIXI.WebGLFastSpriteBatch.prototype.render = function(spriteBatch) {
        var children = spriteBatch.children;
        var sprite = children[0];
        if (!sprite.texture._uvs) return;
        this.currentBaseTexture = sprite.texture.baseTexture;
        if (sprite.blendMode !== this.renderSession.blendModeManager.currentBlendMode) {
            this.flush();
            this.renderSession.blendModeManager.setBlendMode(sprite.blendMode);
        }
        for (var i = 0, j = children.length; i < j; i++) {
            this.renderSprite(children[i]);
        }
        this.flush();
    };
    PIXI.WebGLFastSpriteBatch.prototype.renderSprite = function(sprite) {
        if (!sprite.visible) return;
        if (sprite.texture.baseTexture !== this.currentBaseTexture) {
            this.flush();
            this.currentBaseTexture = sprite.texture.baseTexture;
            if (!sprite.texture._uvs) return;
        }
        var uvs, verticies = this.vertices, width, height, w0, w1, h0, h1, index;
        uvs = sprite.texture._uvs;
        width = sprite.texture.frame.width;
        height = sprite.texture.frame.height;
        if (sprite.texture.trim) {
            var trim = sprite.texture.trim;
            w1 = trim.x - sprite.anchor.x * trim.width;
            w0 = w1 + sprite.texture.crop.width;
            h1 = trim.y - sprite.anchor.y * trim.height;
            h0 = h1 + sprite.texture.crop.height;
        } else {
            w0 = sprite.texture.frame.width * (1 - sprite.anchor.x);
            w1 = sprite.texture.frame.width * -sprite.anchor.x;
            h0 = sprite.texture.frame.height * (1 - sprite.anchor.y);
            h1 = sprite.texture.frame.height * -sprite.anchor.y;
        }
        index = this.currentBatchSize * 4 * this.vertSize;
        verticies[index++] = w1;
        verticies[index++] = h1;
        verticies[index++] = sprite.position.x;
        verticies[index++] = sprite.position.y;
        verticies[index++] = sprite.scale.x;
        verticies[index++] = sprite.scale.y;
        verticies[index++] = sprite.rotation;
        verticies[index++] = uvs.x0;
        verticies[index++] = uvs.y1;
        verticies[index++] = sprite.alpha;
        verticies[index++] = w0;
        verticies[index++] = h1;
        verticies[index++] = sprite.position.x;
        verticies[index++] = sprite.position.y;
        verticies[index++] = sprite.scale.x;
        verticies[index++] = sprite.scale.y;
        verticies[index++] = sprite.rotation;
        verticies[index++] = uvs.x1;
        verticies[index++] = uvs.y1;
        verticies[index++] = sprite.alpha;
        verticies[index++] = w0;
        verticies[index++] = h0;
        verticies[index++] = sprite.position.x;
        verticies[index++] = sprite.position.y;
        verticies[index++] = sprite.scale.x;
        verticies[index++] = sprite.scale.y;
        verticies[index++] = sprite.rotation;
        verticies[index++] = uvs.x2;
        verticies[index++] = uvs.y2;
        verticies[index++] = sprite.alpha;
        verticies[index++] = w1;
        verticies[index++] = h0;
        verticies[index++] = sprite.position.x;
        verticies[index++] = sprite.position.y;
        verticies[index++] = sprite.scale.x;
        verticies[index++] = sprite.scale.y;
        verticies[index++] = sprite.rotation;
        verticies[index++] = uvs.x3;
        verticies[index++] = uvs.y3;
        verticies[index++] = sprite.alpha;
        this.currentBatchSize++;
        if (this.currentBatchSize >= this.size) {
            this.flush();
        }
    };
    PIXI.WebGLFastSpriteBatch.prototype.flush = function() {
        if (this.currentBatchSize === 0) return;
        var gl = this.gl;
        if (!this.currentBaseTexture._glTextures[gl.id]) this.renderSession.renderer.updateTexture(this.currentBaseTexture, gl);
        gl.bindTexture(gl.TEXTURE_2D, this.currentBaseTexture._glTextures[gl.id]);
        if (this.currentBatchSize > this.size * .5) {
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.vertices);
        } else {
            var view = this.vertices.subarray(0, this.currentBatchSize * 4 * this.vertSize);
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, view);
        }
        gl.drawElements(gl.TRIANGLES, this.currentBatchSize * 6, gl.UNSIGNED_SHORT, 0);
        this.currentBatchSize = 0;
        this.renderSession.drawCount++;
    };
    PIXI.WebGLFastSpriteBatch.prototype.stop = function() {
        this.flush();
    };
    PIXI.WebGLFastSpriteBatch.prototype.start = function() {
        var gl = this.gl;
        gl.activeTexture(gl.TEXTURE0);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        var projection = this.renderSession.projection;
        gl.uniform2f(this.shader.projectionVector, projection.x, projection.y);
        gl.uniformMatrix3fv(this.shader.uMatrix, false, this.matrix);
        var stride = this.vertSize * 4;
        gl.vertexAttribPointer(this.shader.aVertexPosition, 2, gl.FLOAT, false, stride, 0);
        gl.vertexAttribPointer(this.shader.aPositionCoord, 2, gl.FLOAT, false, stride, 2 * 4);
        gl.vertexAttribPointer(this.shader.aScale, 2, gl.FLOAT, false, stride, 4 * 4);
        gl.vertexAttribPointer(this.shader.aRotation, 1, gl.FLOAT, false, stride, 6 * 4);
        gl.vertexAttribPointer(this.shader.aTextureCoord, 2, gl.FLOAT, false, stride, 7 * 4);
        gl.vertexAttribPointer(this.shader.colorAttribute, 1, gl.FLOAT, false, stride, 9 * 4);
    };
    PIXI.WebGLFilterManager = function() {
        this.filterStack = [];
        this.offsetX = 0;
        this.offsetY = 0;
    };
    PIXI.WebGLFilterManager.prototype.constructor = PIXI.WebGLFilterManager;
    PIXI.WebGLFilterManager.prototype.setContext = function(gl) {
        this.gl = gl;
        this.texturePool = [];
        this.initShaderBuffers();
    };
    PIXI.WebGLFilterManager.prototype.begin = function(renderSession, buffer) {
        this.renderSession = renderSession;
        this.defaultShader = renderSession.shaderManager.defaultShader;
        var projection = this.renderSession.projection;
        this.width = projection.x * 2;
        this.height = -projection.y * 2;
        this.buffer = buffer;
    };
    PIXI.WebGLFilterManager.prototype.pushFilter = function(filterBlock) {
        var gl = this.gl;
        var projection = this.renderSession.projection;
        var offset = this.renderSession.offset;
        filterBlock._filterArea = filterBlock.target.filterArea || filterBlock.target.getBounds();
        this.filterStack.push(filterBlock);
        var filter = filterBlock.filterPasses[0];
        this.offsetX += filterBlock._filterArea.x;
        this.offsetY += filterBlock._filterArea.y;
        var texture = this.texturePool.pop();
        if (!texture) {
            texture = new PIXI.FilterTexture(this.gl, this.width, this.height);
        } else {
            texture.resize(this.width, this.height);
        }
        gl.bindTexture(gl.TEXTURE_2D, texture.texture);
        var filterArea = filterBlock._filterArea;
        var padding = filter.padding;
        filterArea.x -= padding;
        filterArea.y -= padding;
        filterArea.width += padding * 2;
        filterArea.height += padding * 2;
        if (filterArea.x < 0) filterArea.x = 0;
        if (filterArea.width > this.width) filterArea.width = this.width;
        if (filterArea.y < 0) filterArea.y = 0;
        if (filterArea.height > this.height) filterArea.height = this.height;
        gl.bindFramebuffer(gl.FRAMEBUFFER, texture.frameBuffer);
        gl.viewport(0, 0, filterArea.width, filterArea.height);
        projection.x = filterArea.width / 2;
        projection.y = -filterArea.height / 2;
        offset.x = -filterArea.x;
        offset.y = -filterArea.y;
        gl.colorMask(true, true, true, true);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        filterBlock._glFilterTexture = texture;
    };
    PIXI.WebGLFilterManager.prototype.popFilter = function() {
        var gl = this.gl;
        var filterBlock = this.filterStack.pop();
        var filterArea = filterBlock._filterArea;
        var texture = filterBlock._glFilterTexture;
        var projection = this.renderSession.projection;
        var offset = this.renderSession.offset;
        if (filterBlock.filterPasses.length > 1) {
            gl.viewport(0, 0, filterArea.width, filterArea.height);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
            this.vertexArray[0] = 0;
            this.vertexArray[1] = filterArea.height;
            this.vertexArray[2] = filterArea.width;
            this.vertexArray[3] = filterArea.height;
            this.vertexArray[4] = 0;
            this.vertexArray[5] = 0;
            this.vertexArray[6] = filterArea.width;
            this.vertexArray[7] = 0;
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.vertexArray);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
            this.uvArray[2] = filterArea.width / this.width;
            this.uvArray[5] = filterArea.height / this.height;
            this.uvArray[6] = filterArea.width / this.width;
            this.uvArray[7] = filterArea.height / this.height;
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.uvArray);
            var inputTexture = texture;
            var outputTexture = this.texturePool.pop();
            if (!outputTexture) outputTexture = new PIXI.FilterTexture(this.gl, this.width, this.height);
            outputTexture.resize(this.width, this.height);
            gl.bindFramebuffer(gl.FRAMEBUFFER, outputTexture.frameBuffer);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.disable(gl.BLEND);
            for (var i = 0; i < filterBlock.filterPasses.length - 1; i++) {
                var filterPass = filterBlock.filterPasses[i];
                gl.bindFramebuffer(gl.FRAMEBUFFER, outputTexture.frameBuffer);
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, inputTexture.texture);
                this.applyFilterPass(filterPass, filterArea, filterArea.width, filterArea.height);
                var temp = inputTexture;
                inputTexture = outputTexture;
                outputTexture = temp;
            }
            gl.enable(gl.BLEND);
            texture = inputTexture;
            this.texturePool.push(outputTexture);
        }
        var filter = filterBlock.filterPasses[filterBlock.filterPasses.length - 1];
        this.offsetX -= filterArea.x;
        this.offsetY -= filterArea.y;
        var sizeX = this.width;
        var sizeY = this.height;
        var offsetX = 0;
        var offsetY = 0;
        var buffer = this.buffer;
        if (this.filterStack.length === 0) {
            gl.colorMask(true, true, true, true);
        } else {
            var currentFilter = this.filterStack[this.filterStack.length - 1];
            filterArea = currentFilter._filterArea;
            sizeX = filterArea.width;
            sizeY = filterArea.height;
            offsetX = filterArea.x;
            offsetY = filterArea.y;
            buffer = currentFilter._glFilterTexture.frameBuffer;
        }
        projection.x = sizeX / 2;
        projection.y = -sizeY / 2;
        offset.x = offsetX;
        offset.y = offsetY;
        filterArea = filterBlock._filterArea;
        var x = filterArea.x - offsetX;
        var y = filterArea.y - offsetY;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        this.vertexArray[0] = x;
        this.vertexArray[1] = y + filterArea.height;
        this.vertexArray[2] = x + filterArea.width;
        this.vertexArray[3] = y + filterArea.height;
        this.vertexArray[4] = x;
        this.vertexArray[5] = y;
        this.vertexArray[6] = x + filterArea.width;
        this.vertexArray[7] = y;
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.vertexArray);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
        this.uvArray[2] = filterArea.width / this.width;
        this.uvArray[5] = filterArea.height / this.height;
        this.uvArray[6] = filterArea.width / this.width;
        this.uvArray[7] = filterArea.height / this.height;
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.uvArray);
        gl.viewport(0, 0, sizeX, sizeY);
        gl.bindFramebuffer(gl.FRAMEBUFFER, buffer);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture.texture);
        this.applyFilterPass(filter, filterArea, sizeX, sizeY);
        this.texturePool.push(texture);
        filterBlock._glFilterTexture = null;
    };
    PIXI.WebGLFilterManager.prototype.applyFilterPass = function(filter, filterArea, width, height) {
        var gl = this.gl;
        var shader = filter.shaders[gl.id];
        if (!shader) {
            shader = new PIXI.PixiShader(gl);
            shader.fragmentSrc = filter.fragmentSrc;
            shader.uniforms = filter.uniforms;
            shader.init();
            filter.shaders[gl.id] = shader;
        }
        this.renderSession.shaderManager.setShader(shader);
        gl.uniform2f(shader.projectionVector, width / 2, -height / 2);
        gl.uniform2f(shader.offsetVector, 0, 0);
        if (filter.uniforms.dimensions) {
            filter.uniforms.dimensions.value[0] = this.width;
            filter.uniforms.dimensions.value[1] = this.height;
            filter.uniforms.dimensions.value[2] = this.vertexArray[0];
            filter.uniforms.dimensions.value[3] = this.vertexArray[5];
        }
        shader.syncUniforms();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.vertexAttribPointer(shader.aVertexPosition, 2, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
        gl.vertexAttribPointer(shader.aTextureCoord, 2, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
        gl.vertexAttribPointer(shader.colorAttribute, 2, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
        this.renderSession.drawCount++;
    };
    PIXI.WebGLFilterManager.prototype.initShaderBuffers = function() {
        var gl = this.gl;
        this.vertexBuffer = gl.createBuffer();
        this.uvBuffer = gl.createBuffer();
        this.colorBuffer = gl.createBuffer();
        this.indexBuffer = gl.createBuffer();
        this.vertexArray = new PIXI.Float32Array([ 0, 0, 1, 0, 0, 1, 1, 1 ]);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.vertexArray, gl.STATIC_DRAW);
        this.uvArray = new PIXI.Float32Array([ 0, 0, 1, 0, 0, 1, 1, 1 ]);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.uvArray, gl.STATIC_DRAW);
        this.colorArray = new PIXI.Float32Array([ 1, 16777215, 1, 16777215, 1, 16777215, 1, 16777215 ]);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.colorArray, gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([ 0, 1, 2, 1, 3, 2 ]), gl.STATIC_DRAW);
    };
    PIXI.WebGLFilterManager.prototype.destroy = function() {
        var gl = this.gl;
        this.filterStack = null;
        this.offsetX = 0;
        this.offsetY = 0;
        for (var i = 0; i < this.texturePool.length; i++) {
            this.texturePool[i].destroy();
        }
        this.texturePool = null;
        gl.deleteBuffer(this.vertexBuffer);
        gl.deleteBuffer(this.uvBuffer);
        gl.deleteBuffer(this.colorBuffer);
        gl.deleteBuffer(this.indexBuffer);
    };
    PIXI.FilterTexture = function(gl, width, height, scaleMode) {
        this.gl = gl;
        this.frameBuffer = gl.createFramebuffer();
        this.texture = gl.createTexture();
        scaleMode = scaleMode || PIXI.scaleModes.DEFAULT;
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, scaleMode === PIXI.scaleModes.LINEAR ? gl.LINEAR : gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, scaleMode === PIXI.scaleModes.LINEAR ? gl.LINEAR : gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
        this.renderBuffer = gl.createRenderbuffer();
        gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderBuffer);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, this.renderBuffer);
        this.resize(width, height);
    };
    PIXI.FilterTexture.prototype.constructor = PIXI.FilterTexture;
    PIXI.FilterTexture.prototype.clear = function() {
        var gl = this.gl;
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
    };
    PIXI.FilterTexture.prototype.resize = function(width, height) {
        if (this.width === width && this.height === height) return;
        this.width = width;
        this.height = height;
        var gl = this.gl;
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderBuffer);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, width, height);
    };
    PIXI.FilterTexture.prototype.destroy = function() {
        var gl = this.gl;
        gl.deleteFramebuffer(this.frameBuffer);
        gl.deleteTexture(this.texture);
        this.frameBuffer = null;
        this.texture = null;
    };
    PIXI.CanvasBuffer = function(width, height) {
        this.width = width;
        this.height = height;
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        this.canvas.width = width;
        this.canvas.height = height;
    };
    PIXI.CanvasBuffer.prototype.constructor = PIXI.CanvasBuffer;
    PIXI.CanvasBuffer.prototype.clear = function() {
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.clearRect(0, 0, this.width, this.height);
    };
    PIXI.CanvasBuffer.prototype.resize = function(width, height) {
        this.width = this.canvas.width = width;
        this.height = this.canvas.height = height;
    };
    PIXI.CanvasMaskManager = function() {};
    PIXI.CanvasMaskManager.prototype.constructor = PIXI.CanvasMaskManager;
    PIXI.CanvasMaskManager.prototype.pushMask = function(maskData, renderSession) {
        var context = renderSession.context;
        context.save();
        var cacheAlpha = maskData.alpha;
        var transform = maskData.worldTransform;
        var resolution = renderSession.resolution;
        context.setTransform(transform.a * resolution, transform.b * resolution, transform.c * resolution, transform.d * resolution, transform.tx * resolution, transform.ty * resolution);
        PIXI.CanvasGraphics.renderGraphicsMask(maskData, context);
        context.clip();
        maskData.worldAlpha = cacheAlpha;
    };
    PIXI.CanvasMaskManager.prototype.popMask = function(renderSession) {
        renderSession.context.restore();
    };
    PIXI.CanvasTinter = function() {};
    PIXI.CanvasTinter.getTintedTexture = function(sprite, color) {
        var texture = sprite.texture;
        color = PIXI.CanvasTinter.roundColor(color);
        var stringColor = "#" + ("00000" + (color | 0).toString(16)).substr(-6);
        texture.tintCache = texture.tintCache || {};
        if (texture.tintCache[stringColor]) return texture.tintCache[stringColor];
        var canvas = PIXI.CanvasTinter.canvas || document.createElement("canvas");
        PIXI.CanvasTinter.tintMethod(texture, color, canvas);
        if (PIXI.CanvasTinter.convertTintToImage) {
            var tintImage = new Image();
            tintImage.src = canvas.toDataURL();
            texture.tintCache[stringColor] = tintImage;
        } else {
            texture.tintCache[stringColor] = canvas;
            PIXI.CanvasTinter.canvas = null;
        }
        return canvas;
    };
    PIXI.CanvasTinter.tintWithMultiply = function(texture, color, canvas) {
        var context = canvas.getContext("2d");
        var crop = texture.crop;
        canvas.width = crop.width;
        canvas.height = crop.height;
        context.fillStyle = "#" + ("00000" + (color | 0).toString(16)).substr(-6);
        context.fillRect(0, 0, crop.width, crop.height);
        context.globalCompositeOperation = "multiply";
        context.drawImage(texture.baseTexture.source, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);
        context.globalCompositeOperation = "destination-atop";
        context.drawImage(texture.baseTexture.source, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);
    };
    PIXI.CanvasTinter.tintWithOverlay = function(texture, color, canvas) {
        var context = canvas.getContext("2d");
        var crop = texture.crop;
        canvas.width = crop.width;
        canvas.height = crop.height;
        context.globalCompositeOperation = "copy";
        context.fillStyle = "#" + ("00000" + (color | 0).toString(16)).substr(-6);
        context.fillRect(0, 0, crop.width, crop.height);
        context.globalCompositeOperation = "destination-atop";
        context.drawImage(texture.baseTexture.source, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);
    };
    PIXI.CanvasTinter.tintWithPerPixel = function(texture, color, canvas) {
        var context = canvas.getContext("2d");
        var crop = texture.crop;
        canvas.width = crop.width;
        canvas.height = crop.height;
        context.globalCompositeOperation = "copy";
        context.drawImage(texture.baseTexture.source, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);
        var rgbValues = PIXI.hex2rgb(color);
        var r = rgbValues[0], g = rgbValues[1], b = rgbValues[2];
        var pixelData = context.getImageData(0, 0, crop.width, crop.height);
        var pixels = pixelData.data;
        for (var i = 0; i < pixels.length; i += 4) {
            pixels[i + 0] *= r;
            pixels[i + 1] *= g;
            pixels[i + 2] *= b;
        }
        context.putImageData(pixelData, 0, 0);
    };
    PIXI.CanvasTinter.roundColor = function(color) {
        var step = PIXI.CanvasTinter.cacheStepsPerColorChannel;
        var rgbValues = PIXI.hex2rgb(color);
        rgbValues[0] = Math.min(255, rgbValues[0] / step * step);
        rgbValues[1] = Math.min(255, rgbValues[1] / step * step);
        rgbValues[2] = Math.min(255, rgbValues[2] / step * step);
        return PIXI.rgb2hex(rgbValues);
    };
    PIXI.CanvasTinter.cacheStepsPerColorChannel = 8;
    PIXI.CanvasTinter.convertTintToImage = false;
    PIXI.CanvasTinter.canUseMultiply = PIXI.canUseNewCanvasBlendModes();
    PIXI.CanvasTinter.tintMethod = PIXI.CanvasTinter.canUseMultiply ? PIXI.CanvasTinter.tintWithMultiply : PIXI.CanvasTinter.tintWithPerPixel;
    PIXI.CanvasRenderer = function(width, height, options) {
        if (options) {
            for (var i in PIXI.defaultRenderOptions) {
                if (typeof options[i] === "undefined") options[i] = PIXI.defaultRenderOptions[i];
            }
        } else {
            options = PIXI.defaultRenderOptions;
        }
        if (!PIXI.defaultRenderer) {
            PIXI.sayHello("Canvas");
            PIXI.defaultRenderer = this;
        }
        this.type = PIXI.CANVAS_RENDERER;
        this.resolution = options.resolution;
        this.clearBeforeRender = options.clearBeforeRender;
        this.transparent = options.transparent;
        this.autoResize = options.autoResize || false;
        this.width = width || 800;
        this.height = height || 600;
        this.width *= this.resolution;
        this.height *= this.resolution;
        this.view = options.view || document.createElement("canvas");
        this.context = this.view.getContext("2d", {
            alpha: this.transparent
        });
        this.refresh = true;
        this.view.width = this.width * this.resolution;
        this.view.height = this.height * this.resolution;
        this.count = 0;
        this.maskManager = new PIXI.CanvasMaskManager();
        this.renderSession = {
            context: this.context,
            maskManager: this.maskManager,
            scaleMode: null,
            smoothProperty: null,
            roundPixels: false
        };
        this.mapBlendModes();
        this.resize(width, height);
        if ("imageSmoothingEnabled" in this.context) this.renderSession.smoothProperty = "imageSmoothingEnabled"; else if ("webkitImageSmoothingEnabled" in this.context) this.renderSession.smoothProperty = "webkitImageSmoothingEnabled"; else if ("mozImageSmoothingEnabled" in this.context) this.renderSession.smoothProperty = "mozImageSmoothingEnabled"; else if ("oImageSmoothingEnabled" in this.context) this.renderSession.smoothProperty = "oImageSmoothingEnabled"; else if ("msImageSmoothingEnabled" in this.context) this.renderSession.smoothProperty = "msImageSmoothingEnabled";
    };
    PIXI.CanvasRenderer.prototype.constructor = PIXI.CanvasRenderer;
    PIXI.CanvasRenderer.prototype.render = function(stage) {
        stage.updateTransform();
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.globalAlpha = 1;
        this.renderSession.currentBlendMode = PIXI.blendModes.NORMAL;
        this.context.globalCompositeOperation = PIXI.blendModesCanvas[PIXI.blendModes.NORMAL];
        if (navigator.isCocoonJS && this.view.screencanvas) {
            this.context.fillStyle = "black";
            this.context.clear();
        }
        if (this.clearBeforeRender) {
            if (this.transparent) {
                this.context.clearRect(0, 0, this.width, this.height);
            } else {
                this.context.fillStyle = stage.backgroundColorString;
                this.context.fillRect(0, 0, this.width, this.height);
            }
        }
        this.renderDisplayObject(stage);
        if (stage.interactive) {
            if (!stage._interactiveEventsAdded) {
                stage._interactiveEventsAdded = true;
                stage.interactionManager.setTarget(this);
            }
        }
    };
    PIXI.CanvasRenderer.prototype.destroy = function(removeView) {
        if (typeof removeView === "undefined") {
            removeView = true;
        }
        if (removeView && this.view.parent) {
            this.view.parent.removeChild(this.view);
        }
        this.view = null;
        this.context = null;
        this.maskManager = null;
        this.renderSession = null;
    };
    PIXI.CanvasRenderer.prototype.resize = function(width, height) {
        this.width = width * this.resolution;
        this.height = height * this.resolution;
        this.view.width = this.width;
        this.view.height = this.height;
        if (this.autoResize) {
            this.view.style.width = this.width / this.resolution + "px";
            this.view.style.height = this.height / this.resolution + "px";
        }
    };
    PIXI.CanvasRenderer.prototype.renderDisplayObject = function(displayObject, context) {
        this.renderSession.context = context || this.context;
        this.renderSession.resolution = this.resolution;
        displayObject._renderCanvas(this.renderSession);
    };
    PIXI.CanvasRenderer.prototype.mapBlendModes = function() {
        if (!PIXI.blendModesCanvas) {
            PIXI.blendModesCanvas = [];
            if (PIXI.canUseNewCanvasBlendModes()) {
                PIXI.blendModesCanvas[PIXI.blendModes.NORMAL] = "source-over";
                PIXI.blendModesCanvas[PIXI.blendModes.ADD] = "lighter";
                PIXI.blendModesCanvas[PIXI.blendModes.MULTIPLY] = "multiply";
                PIXI.blendModesCanvas[PIXI.blendModes.SCREEN] = "screen";
                PIXI.blendModesCanvas[PIXI.blendModes.OVERLAY] = "overlay";
                PIXI.blendModesCanvas[PIXI.blendModes.DARKEN] = "darken";
                PIXI.blendModesCanvas[PIXI.blendModes.LIGHTEN] = "lighten";
                PIXI.blendModesCanvas[PIXI.blendModes.COLOR_DODGE] = "color-dodge";
                PIXI.blendModesCanvas[PIXI.blendModes.COLOR_BURN] = "color-burn";
                PIXI.blendModesCanvas[PIXI.blendModes.HARD_LIGHT] = "hard-light";
                PIXI.blendModesCanvas[PIXI.blendModes.SOFT_LIGHT] = "soft-light";
                PIXI.blendModesCanvas[PIXI.blendModes.DIFFERENCE] = "difference";
                PIXI.blendModesCanvas[PIXI.blendModes.EXCLUSION] = "exclusion";
                PIXI.blendModesCanvas[PIXI.blendModes.HUE] = "hue";
                PIXI.blendModesCanvas[PIXI.blendModes.SATURATION] = "saturation";
                PIXI.blendModesCanvas[PIXI.blendModes.COLOR] = "color";
                PIXI.blendModesCanvas[PIXI.blendModes.LUMINOSITY] = "luminosity";
            } else {
                PIXI.blendModesCanvas[PIXI.blendModes.NORMAL] = "source-over";
                PIXI.blendModesCanvas[PIXI.blendModes.ADD] = "lighter";
                PIXI.blendModesCanvas[PIXI.blendModes.MULTIPLY] = "source-over";
                PIXI.blendModesCanvas[PIXI.blendModes.SCREEN] = "source-over";
                PIXI.blendModesCanvas[PIXI.blendModes.OVERLAY] = "source-over";
                PIXI.blendModesCanvas[PIXI.blendModes.DARKEN] = "source-over";
                PIXI.blendModesCanvas[PIXI.blendModes.LIGHTEN] = "source-over";
                PIXI.blendModesCanvas[PIXI.blendModes.COLOR_DODGE] = "source-over";
                PIXI.blendModesCanvas[PIXI.blendModes.COLOR_BURN] = "source-over";
                PIXI.blendModesCanvas[PIXI.blendModes.HARD_LIGHT] = "source-over";
                PIXI.blendModesCanvas[PIXI.blendModes.SOFT_LIGHT] = "source-over";
                PIXI.blendModesCanvas[PIXI.blendModes.DIFFERENCE] = "source-over";
                PIXI.blendModesCanvas[PIXI.blendModes.EXCLUSION] = "source-over";
                PIXI.blendModesCanvas[PIXI.blendModes.HUE] = "source-over";
                PIXI.blendModesCanvas[PIXI.blendModes.SATURATION] = "source-over";
                PIXI.blendModesCanvas[PIXI.blendModes.COLOR] = "source-over";
                PIXI.blendModesCanvas[PIXI.blendModes.LUMINOSITY] = "source-over";
            }
        }
    };
    PIXI.CanvasGraphics = function() {};
    PIXI.CanvasGraphics.renderGraphics = function(graphics, context) {
        var worldAlpha = graphics.worldAlpha;
        var color = "";
        for (var i = 0; i < graphics.graphicsData.length; i++) {
            var data = graphics.graphicsData[i];
            var shape = data.shape;
            context.strokeStyle = color = "#" + ("00000" + (data.lineColor | 0).toString(16)).substr(-6);
            context.lineWidth = data.lineWidth;
            if (data.type === PIXI.Graphics.POLY) {
                context.beginPath();
                var points = shape.points;
                context.moveTo(points[0], points[1]);
                for (var j = 1; j < points.length / 2; j++) {
                    context.lineTo(points[j * 2], points[j * 2 + 1]);
                }
                if (shape.closed) {
                    context.lineTo(points[0], points[1]);
                }
                if (points[0] === points[points.length - 2] && points[1] === points[points.length - 1]) {
                    context.closePath();
                }
                if (data.fill) {
                    context.globalAlpha = data.fillAlpha * worldAlpha;
                    context.fillStyle = color = "#" + ("00000" + (data.fillColor | 0).toString(16)).substr(-6);
                    context.fill();
                }
                if (data.lineWidth) {
                    context.globalAlpha = data.lineAlpha * worldAlpha;
                    context.stroke();
                }
            } else if (data.type === PIXI.Graphics.RECT) {
                if (data.fillColor || data.fillColor === 0) {
                    context.globalAlpha = data.fillAlpha * worldAlpha;
                    context.fillStyle = color = "#" + ("00000" + (data.fillColor | 0).toString(16)).substr(-6);
                    context.fillRect(shape.x, shape.y, shape.width, shape.height);
                }
                if (data.lineWidth) {
                    context.globalAlpha = data.lineAlpha * worldAlpha;
                    context.strokeRect(shape.x, shape.y, shape.width, shape.height);
                }
            } else if (data.type === PIXI.Graphics.CIRC) {
                context.beginPath();
                context.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
                context.closePath();
                if (data.fill) {
                    context.globalAlpha = data.fillAlpha * worldAlpha;
                    context.fillStyle = color = "#" + ("00000" + (data.fillColor | 0).toString(16)).substr(-6);
                    context.fill();
                }
                if (data.lineWidth) {
                    context.globalAlpha = data.lineAlpha * worldAlpha;
                    context.stroke();
                }
            } else if (data.type === PIXI.Graphics.ELIP) {
                var w = shape.width * 2;
                var h = shape.height * 2;
                var x = shape.x - w / 2;
                var y = shape.y - h / 2;
                context.beginPath();
                var kappa = .5522848, ox = w / 2 * kappa, oy = h / 2 * kappa, xe = x + w, ye = y + h, xm = x + w / 2, ym = y + h / 2;
                context.moveTo(x, ym);
                context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
                context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
                context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
                context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
                context.closePath();
                if (data.fill) {
                    context.globalAlpha = data.fillAlpha * worldAlpha;
                    context.fillStyle = color = "#" + ("00000" + (data.fillColor | 0).toString(16)).substr(-6);
                    context.fill();
                }
                if (data.lineWidth) {
                    context.globalAlpha = data.lineAlpha * worldAlpha;
                    context.stroke();
                }
            } else if (data.type === PIXI.Graphics.RREC) {
                var rx = shape.x;
                var ry = shape.y;
                var width = shape.width;
                var height = shape.height;
                var radius = shape.radius;
                var maxRadius = Math.min(width, height) / 2 | 0;
                radius = radius > maxRadius ? maxRadius : radius;
                context.beginPath();
                context.moveTo(rx, ry + radius);
                context.lineTo(rx, ry + height - radius);
                context.quadraticCurveTo(rx, ry + height, rx + radius, ry + height);
                context.lineTo(rx + width - radius, ry + height);
                context.quadraticCurveTo(rx + width, ry + height, rx + width, ry + height - radius);
                context.lineTo(rx + width, ry + radius);
                context.quadraticCurveTo(rx + width, ry, rx + width - radius, ry);
                context.lineTo(rx + radius, ry);
                context.quadraticCurveTo(rx, ry, rx, ry + radius);
                context.closePath();
                if (data.fillColor || data.fillColor === 0) {
                    context.globalAlpha = data.fillAlpha * worldAlpha;
                    context.fillStyle = color = "#" + ("00000" + (data.fillColor | 0).toString(16)).substr(-6);
                    context.fill();
                }
                if (data.lineWidth) {
                    context.globalAlpha = data.lineAlpha * worldAlpha;
                    context.stroke();
                }
            }
        }
    };
    PIXI.CanvasGraphics.renderGraphicsMask = function(graphics, context) {
        var len = graphics.graphicsData.length;
        if (len === 0) return;
        if (len > 1) {
            len = 1;
            window.console.log("Pixi.js warning: masks in canvas can only mask using the first path in the graphics object");
        }
        for (var i = 0; i < 1; i++) {
            var data = graphics.graphicsData[i];
            var shape = data.shape;
            if (data.type === PIXI.Graphics.POLY) {
                context.beginPath();
                var points = shape.points;
                context.moveTo(points[0], points[1]);
                for (var j = 1; j < points.length / 2; j++) {
                    context.lineTo(points[j * 2], points[j * 2 + 1]);
                }
                if (points[0] === points[points.length - 2] && points[1] === points[points.length - 1]) {
                    context.closePath();
                }
            } else if (data.type === PIXI.Graphics.RECT) {
                context.beginPath();
                context.rect(shape.x, shape.y, shape.width, shape.height);
                context.closePath();
            } else if (data.type === PIXI.Graphics.CIRC) {
                context.beginPath();
                context.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
                context.closePath();
            } else if (data.type === PIXI.Graphics.ELIP) {
                var w = shape.width * 2;
                var h = shape.height * 2;
                var x = shape.x - w / 2;
                var y = shape.y - h / 2;
                context.beginPath();
                var kappa = .5522848, ox = w / 2 * kappa, oy = h / 2 * kappa, xe = x + w, ye = y + h, xm = x + w / 2, ym = y + h / 2;
                context.moveTo(x, ym);
                context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
                context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
                context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
                context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
                context.closePath();
            } else if (data.type === PIXI.Graphics.RREC) {
                var pts = shape.points;
                var rx = pts[0];
                var ry = pts[1];
                var width = pts[2];
                var height = pts[3];
                var radius = pts[4];
                var maxRadius = Math.min(width, height) / 2 | 0;
                radius = radius > maxRadius ? maxRadius : radius;
                context.beginPath();
                context.moveTo(rx, ry + radius);
                context.lineTo(rx, ry + height - radius);
                context.quadraticCurveTo(rx, ry + height, rx + radius, ry + height);
                context.lineTo(rx + width - radius, ry + height);
                context.quadraticCurveTo(rx + width, ry + height, rx + width, ry + height - radius);
                context.lineTo(rx + width, ry + radius);
                context.quadraticCurveTo(rx + width, ry, rx + width - radius, ry);
                context.lineTo(rx + radius, ry);
                context.quadraticCurveTo(rx, ry, rx, ry + radius);
                context.closePath();
            }
        }
    };
    PIXI.Graphics = function() {
        PIXI.DisplayObjectContainer.call(this);
        this.renderable = true;
        this.fillAlpha = 1;
        this.lineWidth = 0;
        this.lineColor = 0;
        this.graphicsData = [];
        this.tint = 16777215;
        this.blendMode = PIXI.blendModes.NORMAL;
        this.currentPath = null;
        this._webGL = [];
        this.isMask = false;
        this.boundsPadding = 0;
        this._localBounds = new PIXI.Rectangle(0, 0, 1, 1);
        this.dirty = true;
        this.webGLDirty = false;
        this.cachedSpriteDirty = false;
    };
    PIXI.Graphics.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
    PIXI.Graphics.prototype.constructor = PIXI.Graphics;
    Object.defineProperty(PIXI.Graphics.prototype, "cacheAsBitmap", {
        get: function() {
            return this._cacheAsBitmap;
        },
        set: function(value) {
            this._cacheAsBitmap = value;
            if (this._cacheAsBitmap) {
                this._generateCachedSprite();
            } else {
                this.destroyCachedSprite();
                this.dirty = true;
            }
        }
    });
    PIXI.Graphics.prototype.lineStyle = function(lineWidth, color, alpha) {
        this.lineWidth = lineWidth || 0;
        this.lineColor = color || 0;
        this.lineAlpha = arguments.length < 3 ? 1 : alpha;
        if (this.currentPath) {
            if (this.currentPath.shape.points.length) {
                this.drawShape(new PIXI.Polygon(this.currentPath.shape.points.slice(-2)));
                return this;
            }
            this.currentPath.lineWidth = this.lineWidth;
            this.currentPath.lineColor = this.lineColor;
            this.currentPath.lineAlpha = this.lineAlpha;
        }
        return this;
    };
    PIXI.Graphics.prototype.moveTo = function(x, y) {
        this.drawShape(new PIXI.Polygon([ x, y ]));
        return this;
    };
    PIXI.Graphics.prototype.lineTo = function(x, y) {
        this.currentPath.shape.points.push(x, y);
        this.dirty = true;
        return this;
    };
    PIXI.Graphics.prototype.quadraticCurveTo = function(cpX, cpY, toX, toY) {
        if (this.currentPath) {
            if (this.currentPath.shape.points.length === 0) this.currentPath.shape.points = [ 0, 0 ];
        } else {
            this.moveTo(0, 0);
        }
        var xa, ya, n = 20, points = this.currentPath.shape.points;
        if (points.length === 0) this.moveTo(0, 0);
        var fromX = points[points.length - 2];
        var fromY = points[points.length - 1];
        var j = 0;
        for (var i = 1; i <= n; i++) {
            j = i / n;
            xa = fromX + (cpX - fromX) * j;
            ya = fromY + (cpY - fromY) * j;
            points.push(xa + (cpX + (toX - cpX) * j - xa) * j, ya + (cpY + (toY - cpY) * j - ya) * j);
        }
        this.dirty = true;
        return this;
    };
    PIXI.Graphics.prototype.bezierCurveTo = function(cpX, cpY, cpX2, cpY2, toX, toY) {
        if (this.currentPath) {
            if (this.currentPath.shape.points.length === 0) this.currentPath.shape.points = [ 0, 0 ];
        } else {
            this.moveTo(0, 0);
        }
        var n = 20, dt, dt2, dt3, t2, t3, points = this.currentPath.shape.points;
        var fromX = points[points.length - 2];
        var fromY = points[points.length - 1];
        var j = 0;
        for (var i = 1; i <= n; i++) {
            j = i / n;
            dt = 1 - j;
            dt2 = dt * dt;
            dt3 = dt2 * dt;
            t2 = j * j;
            t3 = t2 * j;
            points.push(dt3 * fromX + 3 * dt2 * j * cpX + 3 * dt * t2 * cpX2 + t3 * toX, dt3 * fromY + 3 * dt2 * j * cpY + 3 * dt * t2 * cpY2 + t3 * toY);
        }
        this.dirty = true;
        return this;
    };
    PIXI.Graphics.prototype.arcTo = function(x1, y1, x2, y2, radius) {
        if (this.currentPath) {
            if (this.currentPath.shape.points.length === 0) {
                this.currentPath.shape.points.push(x1, y1);
            }
        } else {
            this.moveTo(x1, y1);
        }
        var points = this.currentPath.shape.points;
        var fromX = points[points.length - 2];
        var fromY = points[points.length - 1];
        var a1 = fromY - y1;
        var b1 = fromX - x1;
        var a2 = y2 - y1;
        var b2 = x2 - x1;
        var mm = Math.abs(a1 * b2 - b1 * a2);
        if (mm < 1e-8 || radius === 0) {
            if (points[points.length - 2] !== x1 || points[points.length - 1] !== y1) {
                points.push(x1, y1);
            }
        } else {
            var dd = a1 * a1 + b1 * b1;
            var cc = a2 * a2 + b2 * b2;
            var tt = a1 * a2 + b1 * b2;
            var k1 = radius * Math.sqrt(dd) / mm;
            var k2 = radius * Math.sqrt(cc) / mm;
            var j1 = k1 * tt / dd;
            var j2 = k2 * tt / cc;
            var cx = k1 * b2 + k2 * b1;
            var cy = k1 * a2 + k2 * a1;
            var px = b1 * (k2 + j1);
            var py = a1 * (k2 + j1);
            var qx = b2 * (k1 + j2);
            var qy = a2 * (k1 + j2);
            var startAngle = Math.atan2(py - cy, px - cx);
            var endAngle = Math.atan2(qy - cy, qx - cx);
            this.arc(cx + x1, cy + y1, radius, startAngle, endAngle, b1 * a2 > b2 * a1);
        }
        this.dirty = true;
        return this;
    };
    PIXI.Graphics.prototype.arc = function(cx, cy, radius, startAngle, endAngle, anticlockwise) {
        var startX = cx + Math.cos(startAngle) * radius;
        var startY = cy + Math.sin(startAngle) * radius;
        var points = this.currentPath.shape.points;
        if (points.length === 0) {
            this.moveTo(startX, startY);
            points = this.currentPath.shape.points;
        } else if (points[points.length - 2] !== startX || points[points.length - 1] !== startY) {
            points.push(startX, startY);
        }
        if (startAngle === endAngle) return this;
        if (!anticlockwise && endAngle <= startAngle) {
            endAngle += Math.PI * 2;
        } else if (anticlockwise && startAngle <= endAngle) {
            startAngle += Math.PI * 2;
        }
        var sweep = anticlockwise ? (startAngle - endAngle) * -1 : endAngle - startAngle;
        var segs = Math.abs(sweep) / (Math.PI * 2) * 40;
        if (sweep === 0) return this;
        var theta = sweep / (segs * 2);
        var theta2 = theta * 2;
        var cTheta = Math.cos(theta);
        var sTheta = Math.sin(theta);
        var segMinus = segs - 1;
        var remainder = segMinus % 1 / segMinus;
        for (var i = 0; i <= segMinus; i++) {
            var real = i + remainder * i;
            var angle = theta + startAngle + theta2 * real;
            var c = Math.cos(angle);
            var s = -Math.sin(angle);
            points.push((cTheta * c + sTheta * s) * radius + cx, (cTheta * -s + sTheta * c) * radius + cy);
        }
        this.dirty = true;
        return this;
    };
    PIXI.Graphics.prototype.beginFill = function(color, alpha) {
        this.filling = true;
        this.fillColor = color || 0;
        this.fillAlpha = alpha === undefined ? 1 : alpha;
        if (this.currentPath) {
            if (this.currentPath.shape.points.length <= 2) {
                this.currentPath.fill = this.filling;
                this.currentPath.fillColor = this.fillColor;
                this.currentPath.fillAlpha = this.fillAlpha;
            }
        }
        return this;
    };
    PIXI.Graphics.prototype.endFill = function() {
        this.filling = false;
        this.fillColor = null;
        this.fillAlpha = 1;
        return this;
    };
    PIXI.Graphics.prototype.drawRect = function(x, y, width, height) {
        this.drawShape(new PIXI.Rectangle(x, y, width, height));
        return this;
    };
    PIXI.Graphics.prototype.drawRoundedRect = function(x, y, width, height, radius) {
        this.drawShape(new PIXI.RoundedRectangle(x, y, width, height, radius));
        return this;
    };
    PIXI.Graphics.prototype.drawCircle = function(x, y, radius) {
        this.drawShape(new PIXI.Circle(x, y, radius));
        return this;
    };
    PIXI.Graphics.prototype.drawEllipse = function(x, y, width, height) {
        this.drawShape(new PIXI.Ellipse(x, y, width, height));
        return this;
    };
    PIXI.Graphics.prototype.drawPolygon = function(path) {
        if (!(path instanceof Array)) path = Array.prototype.slice.call(arguments);
        this.drawShape(new PIXI.Polygon(path));
        return this;
    };
    PIXI.Graphics.prototype.clear = function() {
        this.lineWidth = 0;
        this.filling = false;
        this.dirty = true;
        this.clearDirty = true;
        this.graphicsData = [];
        return this;
    };
    PIXI.Graphics.prototype.generateTexture = function(resolution, scaleMode) {
        resolution = resolution || 1;
        var bounds = this.getBounds();
        var canvasBuffer = new PIXI.CanvasBuffer(bounds.width * resolution, bounds.height * resolution);
        var texture = PIXI.Texture.fromCanvas(canvasBuffer.canvas, scaleMode);
        texture.baseTexture.resolution = resolution;
        canvasBuffer.context.scale(resolution, resolution);
        canvasBuffer.context.translate(-bounds.x, -bounds.y);
        PIXI.CanvasGraphics.renderGraphics(this, canvasBuffer.context);
        return texture;
    };
    PIXI.Graphics.prototype._renderWebGL = function(renderSession) {
        if (this.visible === false || this.alpha === 0 || this.isMask === true) return;
        if (this._cacheAsBitmap) {
            if (this.dirty || this.cachedSpriteDirty) {
                this._generateCachedSprite();
                this.updateCachedSpriteTexture();
                this.cachedSpriteDirty = false;
                this.dirty = false;
            }
            this._cachedSprite.worldAlpha = this.worldAlpha;
            PIXI.Sprite.prototype._renderWebGL.call(this._cachedSprite, renderSession);
            return;
        } else {
            renderSession.spriteBatch.stop();
            renderSession.blendModeManager.setBlendMode(this.blendMode);
            if (this._mask) renderSession.maskManager.pushMask(this._mask, renderSession);
            if (this._filters) renderSession.filterManager.pushFilter(this._filterBlock);
            if (this.blendMode !== renderSession.spriteBatch.currentBlendMode) {
                renderSession.spriteBatch.currentBlendMode = this.blendMode;
                var blendModeWebGL = PIXI.blendModesWebGL[renderSession.spriteBatch.currentBlendMode];
                renderSession.spriteBatch.gl.blendFunc(blendModeWebGL[0], blendModeWebGL[1]);
            }
            if (this.webGLDirty) {
                this.dirty = true;
                this.webGLDirty = false;
            }
            PIXI.WebGLGraphics.renderGraphics(this, renderSession);
            if (this.children.length) {
                renderSession.spriteBatch.start();
                for (var i = 0, j = this.children.length; i < j; i++) {
                    this.children[i]._renderWebGL(renderSession);
                }
                renderSession.spriteBatch.stop();
            }
            if (this._filters) renderSession.filterManager.popFilter();
            if (this._mask) renderSession.maskManager.popMask(this.mask, renderSession);
            renderSession.drawCount++;
            renderSession.spriteBatch.start();
        }
    };
    PIXI.Graphics.prototype._renderCanvas = function(renderSession) {
        if (this.visible === false || this.alpha === 0 || this.isMask === true) return;
        if (this._cacheAsBitmap) {
            if (this.dirty || this.cachedSpriteDirty) {
                this._generateCachedSprite();
                this.updateCachedSpriteTexture();
                this.cachedSpriteDirty = false;
                this.dirty = false;
            }
            this._cachedSprite.alpha = this.alpha;
            PIXI.Sprite.prototype._renderCanvas.call(this._cachedSprite, renderSession);
            return;
        } else {
            var context = renderSession.context;
            var transform = this.worldTransform;
            if (this.blendMode !== renderSession.currentBlendMode) {
                renderSession.currentBlendMode = this.blendMode;
                context.globalCompositeOperation = PIXI.blendModesCanvas[renderSession.currentBlendMode];
            }
            if (this._mask) {
                renderSession.maskManager.pushMask(this._mask, renderSession);
            }
            var resolution = renderSession.resolution;
            context.setTransform(transform.a * resolution, transform.b * resolution, transform.c * resolution, transform.d * resolution, transform.tx * resolution, transform.ty * resolution);
            PIXI.CanvasGraphics.renderGraphics(this, context);
            for (var i = 0, j = this.children.length; i < j; i++) {
                this.children[i]._renderCanvas(renderSession);
            }
            if (this._mask) {
                renderSession.maskManager.popMask(renderSession);
            }
        }
    };
    PIXI.Graphics.prototype.getBounds = function(matrix) {
        if (this.isMask) return PIXI.EmptyRectangle;
        if (this.dirty) {
            this.updateLocalBounds();
            this.webGLDirty = true;
            this.cachedSpriteDirty = true;
            this.dirty = false;
        }
        var bounds = this._localBounds;
        var w0 = bounds.x;
        var w1 = bounds.width + bounds.x;
        var h0 = bounds.y;
        var h1 = bounds.height + bounds.y;
        var worldTransform = matrix || this.worldTransform;
        var a = worldTransform.a;
        var b = worldTransform.b;
        var c = worldTransform.c;
        var d = worldTransform.d;
        var tx = worldTransform.tx;
        var ty = worldTransform.ty;
        var x1 = a * w1 + c * h1 + tx;
        var y1 = d * h1 + b * w1 + ty;
        var x2 = a * w0 + c * h1 + tx;
        var y2 = d * h1 + b * w0 + ty;
        var x3 = a * w0 + c * h0 + tx;
        var y3 = d * h0 + b * w0 + ty;
        var x4 = a * w1 + c * h0 + tx;
        var y4 = d * h0 + b * w1 + ty;
        var maxX = x1;
        var maxY = y1;
        var minX = x1;
        var minY = y1;
        minX = x2 < minX ? x2 : minX;
        minX = x3 < minX ? x3 : minX;
        minX = x4 < minX ? x4 : minX;
        minY = y2 < minY ? y2 : minY;
        minY = y3 < minY ? y3 : minY;
        minY = y4 < minY ? y4 : minY;
        maxX = x2 > maxX ? x2 : maxX;
        maxX = x3 > maxX ? x3 : maxX;
        maxX = x4 > maxX ? x4 : maxX;
        maxY = y2 > maxY ? y2 : maxY;
        maxY = y3 > maxY ? y3 : maxY;
        maxY = y4 > maxY ? y4 : maxY;
        this._bounds.x = minX;
        this._bounds.width = maxX - minX;
        this._bounds.y = minY;
        this._bounds.height = maxY - minY;
        return this._bounds;
    };
    PIXI.Graphics.prototype.updateLocalBounds = function() {
        var minX = Infinity;
        var maxX = -Infinity;
        var minY = Infinity;
        var maxY = -Infinity;
        if (this.graphicsData.length) {
            var shape, points, x, y, w, h;
            for (var i = 0; i < this.graphicsData.length; i++) {
                var data = this.graphicsData[i];
                var type = data.type;
                var lineWidth = data.lineWidth;
                shape = data.shape;
                if (type === PIXI.Graphics.RECT || type === PIXI.Graphics.RREC) {
                    x = shape.x - lineWidth / 2;
                    y = shape.y - lineWidth / 2;
                    w = shape.width + lineWidth;
                    h = shape.height + lineWidth;
                    minX = x < minX ? x : minX;
                    maxX = x + w > maxX ? x + w : maxX;
                    minY = y < minY ? y : minY;
                    maxY = y + h > maxY ? y + h : maxY;
                } else if (type === PIXI.Graphics.CIRC) {
                    x = shape.x;
                    y = shape.y;
                    w = shape.radius + lineWidth / 2;
                    h = shape.radius + lineWidth / 2;
                    minX = x - w < minX ? x - w : minX;
                    maxX = x + w > maxX ? x + w : maxX;
                    minY = y - h < minY ? y - h : minY;
                    maxY = y + h > maxY ? y + h : maxY;
                } else if (type === PIXI.Graphics.ELIP) {
                    x = shape.x;
                    y = shape.y;
                    w = shape.width + lineWidth / 2;
                    h = shape.height + lineWidth / 2;
                    minX = x - w < minX ? x - w : minX;
                    maxX = x + w > maxX ? x + w : maxX;
                    minY = y - h < minY ? y - h : minY;
                    maxY = y + h > maxY ? y + h : maxY;
                } else {
                    points = shape.points;
                    for (var j = 0; j < points.length; j += 2) {
                        x = points[j];
                        y = points[j + 1];
                        minX = x - lineWidth < minX ? x - lineWidth : minX;
                        maxX = x + lineWidth > maxX ? x + lineWidth : maxX;
                        minY = y - lineWidth < minY ? y - lineWidth : minY;
                        maxY = y + lineWidth > maxY ? y + lineWidth : maxY;
                    }
                }
            }
        } else {
            minX = 0;
            maxX = 0;
            minY = 0;
            maxY = 0;
        }
        var padding = this.boundsPadding;
        this._localBounds.x = minX - padding;
        this._localBounds.width = maxX - minX + padding * 2;
        this._localBounds.y = minY - padding;
        this._localBounds.height = maxY - minY + padding * 2;
    };
    PIXI.Graphics.prototype._generateCachedSprite = function() {
        var bounds = this.getLocalBounds();
        if (!this._cachedSprite) {
            var canvasBuffer = new PIXI.CanvasBuffer(bounds.width, bounds.height);
            var texture = PIXI.Texture.fromCanvas(canvasBuffer.canvas);
            this._cachedSprite = new PIXI.Sprite(texture);
            this._cachedSprite.buffer = canvasBuffer;
            this._cachedSprite.worldTransform = this.worldTransform;
        } else {
            this._cachedSprite.buffer.resize(bounds.width, bounds.height);
        }
        this._cachedSprite.anchor.x = -(bounds.x / bounds.width);
        this._cachedSprite.anchor.y = -(bounds.y / bounds.height);
        this._cachedSprite.buffer.context.translate(-bounds.x, -bounds.y);
        this.worldAlpha = 1;
        PIXI.CanvasGraphics.renderGraphics(this, this._cachedSprite.buffer.context);
        this._cachedSprite.alpha = this.alpha;
    };
    PIXI.Graphics.prototype.updateCachedSpriteTexture = function() {
        var cachedSprite = this._cachedSprite;
        var texture = cachedSprite.texture;
        var canvas = cachedSprite.buffer.canvas;
        texture.baseTexture.width = canvas.width;
        texture.baseTexture.height = canvas.height;
        texture.crop.width = texture.frame.width = canvas.width;
        texture.crop.height = texture.frame.height = canvas.height;
        cachedSprite._width = canvas.width;
        cachedSprite._height = canvas.height;
        texture.baseTexture.dirty();
    };
    PIXI.Graphics.prototype.destroyCachedSprite = function() {
        this._cachedSprite.texture.destroy(true);
        this._cachedSprite = null;
    };
    PIXI.Graphics.prototype.drawShape = function(shape) {
        if (this.currentPath) {
            if (this.currentPath.shape.points.length <= 2) this.graphicsData.pop();
        }
        this.currentPath = null;
        var data = new PIXI.GraphicsData(this.lineWidth, this.lineColor, this.lineAlpha, this.fillColor, this.fillAlpha, this.filling, shape);
        this.graphicsData.push(data);
        if (data.type === PIXI.Graphics.POLY) {
            data.shape.closed = this.filling;
            this.currentPath = data;
        }
        this.dirty = true;
        return data;
    };
    PIXI.GraphicsData = function(lineWidth, lineColor, lineAlpha, fillColor, fillAlpha, fill, shape) {
        this.lineWidth = lineWidth;
        this.lineColor = lineColor;
        this.lineAlpha = lineAlpha;
        this.fillColor = fillColor;
        this.fillAlpha = fillAlpha;
        this.fill = fill;
        this.shape = shape;
        this.type = shape.type;
    };
    PIXI.Graphics.POLY = 0;
    PIXI.Graphics.RECT = 1;
    PIXI.Graphics.CIRC = 2;
    PIXI.Graphics.ELIP = 3;
    PIXI.Graphics.RREC = 4;
    PIXI.Polygon.prototype.type = PIXI.Graphics.POLY;
    PIXI.Rectangle.prototype.type = PIXI.Graphics.RECT;
    PIXI.Circle.prototype.type = PIXI.Graphics.CIRC;
    PIXI.Ellipse.prototype.type = PIXI.Graphics.ELIP;
    PIXI.RoundedRectangle.prototype.type = PIXI.Graphics.RREC;
    PIXI.Strip = function(texture) {
        PIXI.DisplayObjectContainer.call(this);
        this.texture = texture;
        this.uvs = new PIXI.Float32Array([ 0, 1, 1, 1, 1, 0, 0, 1 ]);
        this.verticies = new PIXI.Float32Array([ 0, 0, 100, 0, 100, 100, 0, 100 ]);
        this.colors = new PIXI.Float32Array([ 1, 1, 1, 1 ]);
        this.indices = new PIXI.Uint16Array([ 0, 1, 2, 3 ]);
        this.dirty = true;
        this.blendMode = PIXI.blendModes.NORMAL;
        this.padding = 0;
    };
    PIXI.Strip.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
    PIXI.Strip.prototype.constructor = PIXI.Strip;
    PIXI.Strip.prototype._renderWebGL = function(renderSession) {
        if (!this.visible || this.alpha <= 0) return;
        renderSession.spriteBatch.stop();
        if (!this._vertexBuffer) this._initWebGL(renderSession);
        renderSession.shaderManager.setShader(renderSession.shaderManager.stripShader);
        this._renderStrip(renderSession);
        renderSession.spriteBatch.start();
    };
    PIXI.Strip.prototype._initWebGL = function(renderSession) {
        var gl = renderSession.gl;
        this._vertexBuffer = gl.createBuffer();
        this._indexBuffer = gl.createBuffer();
        this._uvBuffer = gl.createBuffer();
        this._colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.verticies, gl.DYNAMIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, this._uvBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.uvs, gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, this._colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.colors, gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);
    };
    PIXI.Strip.prototype._renderStrip = function(renderSession) {
        var gl = renderSession.gl;
        var projection = renderSession.projection, offset = renderSession.offset, shader = renderSession.shaderManager.stripShader;
        renderSession.blendModeManager.setBlendMode(this.blendMode);
        gl.uniformMatrix3fv(shader.translationMatrix, false, this.worldTransform.toArray(true));
        gl.uniform2f(shader.projectionVector, projection.x, -projection.y);
        gl.uniform2f(shader.offsetVector, -offset.x, -offset.y);
        gl.uniform1f(shader.alpha, this.worldAlpha);
        if (!this.dirty) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.verticies);
            gl.vertexAttribPointer(shader.aVertexPosition, 2, gl.FLOAT, false, 0, 0);
            gl.bindBuffer(gl.ARRAY_BUFFER, this._uvBuffer);
            gl.vertexAttribPointer(shader.aTextureCoord, 2, gl.FLOAT, false, 0, 0);
            gl.activeTexture(gl.TEXTURE0);
            if (this.texture.baseTexture._dirty[gl.id]) {
                renderSession.renderer.updateTexture(this.texture.baseTexture);
            } else {
                gl.bindTexture(gl.TEXTURE_2D, this.texture.baseTexture._glTextures[gl.id]);
            }
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
        } else {
            this.dirty = false;
            gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, this.verticies, gl.STATIC_DRAW);
            gl.vertexAttribPointer(shader.aVertexPosition, 2, gl.FLOAT, false, 0, 0);
            gl.bindBuffer(gl.ARRAY_BUFFER, this._uvBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, this.uvs, gl.STATIC_DRAW);
            gl.vertexAttribPointer(shader.aTextureCoord, 2, gl.FLOAT, false, 0, 0);
            gl.activeTexture(gl.TEXTURE0);
            if (this.texture.baseTexture._dirty[gl.id]) {
                renderSession.renderer.updateTexture(this.texture.baseTexture);
            } else {
                gl.bindTexture(gl.TEXTURE_2D, this.texture.baseTexture._glTextures[gl.id]);
            }
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);
        }
        gl.drawElements(gl.TRIANGLE_STRIP, this.indices.length, gl.UNSIGNED_SHORT, 0);
    };
    PIXI.Strip.prototype._renderCanvas = function(renderSession) {
        var context = renderSession.context;
        var transform = this.worldTransform;
        if (renderSession.roundPixels) {
            context.setTransform(transform.a, transform.b, transform.c, transform.d, transform.tx | 0, transform.ty | 0);
        } else {
            context.setTransform(transform.a, transform.b, transform.c, transform.d, transform.tx, transform.ty);
        }
        var strip = this;
        var verticies = strip.verticies;
        var uvs = strip.uvs;
        var length = verticies.length / 2;
        this.count++;
        for (var i = 0; i < length - 2; i++) {
            var index = i * 2;
            var x0 = verticies[index], x1 = verticies[index + 2], x2 = verticies[index + 4];
            var y0 = verticies[index + 1], y1 = verticies[index + 3], y2 = verticies[index + 5];
            if (this.padding > 0) {
                var centerX = (x0 + x1 + x2) / 3;
                var centerY = (y0 + y1 + y2) / 3;
                var normX = x0 - centerX;
                var normY = y0 - centerY;
                var dist = Math.sqrt(normX * normX + normY * normY);
                x0 = centerX + normX / dist * (dist + 3);
                y0 = centerY + normY / dist * (dist + 3);
                normX = x1 - centerX;
                normY = y1 - centerY;
                dist = Math.sqrt(normX * normX + normY * normY);
                x1 = centerX + normX / dist * (dist + 3);
                y1 = centerY + normY / dist * (dist + 3);
                normX = x2 - centerX;
                normY = y2 - centerY;
                dist = Math.sqrt(normX * normX + normY * normY);
                x2 = centerX + normX / dist * (dist + 3);
                y2 = centerY + normY / dist * (dist + 3);
            }
            var u0 = uvs[index] * strip.texture.width, u1 = uvs[index + 2] * strip.texture.width, u2 = uvs[index + 4] * strip.texture.width;
            var v0 = uvs[index + 1] * strip.texture.height, v1 = uvs[index + 3] * strip.texture.height, v2 = uvs[index + 5] * strip.texture.height;
            context.save();
            context.beginPath();
            context.moveTo(x0, y0);
            context.lineTo(x1, y1);
            context.lineTo(x2, y2);
            context.closePath();
            context.clip();
            var delta = u0 * v1 + v0 * u2 + u1 * v2 - v1 * u2 - v0 * u1 - u0 * v2;
            var deltaA = x0 * v1 + v0 * x2 + x1 * v2 - v1 * x2 - v0 * x1 - x0 * v2;
            var deltaB = u0 * x1 + x0 * u2 + u1 * x2 - x1 * u2 - x0 * u1 - u0 * x2;
            var deltaC = u0 * v1 * x2 + v0 * x1 * u2 + x0 * u1 * v2 - x0 * v1 * u2 - v0 * u1 * x2 - u0 * x1 * v2;
            var deltaD = y0 * v1 + v0 * y2 + y1 * v2 - v1 * y2 - v0 * y1 - y0 * v2;
            var deltaE = u0 * y1 + y0 * u2 + u1 * y2 - y1 * u2 - y0 * u1 - u0 * y2;
            var deltaF = u0 * v1 * y2 + v0 * y1 * u2 + y0 * u1 * v2 - y0 * v1 * u2 - v0 * u1 * y2 - u0 * y1 * v2;
            context.transform(deltaA / delta, deltaD / delta, deltaB / delta, deltaE / delta, deltaC / delta, deltaF / delta);
            context.drawImage(strip.texture.baseTexture.source, 0, 0);
            context.restore();
        }
    };
    PIXI.Strip.prototype.renderStripFlat = function(strip) {
        var context = this.context;
        var verticies = strip.verticies;
        var length = verticies.length / 2;
        this.count++;
        context.beginPath();
        for (var i = 1; i < length - 2; i++) {
            var index = i * 2;
            var x0 = verticies[index], x1 = verticies[index + 2], x2 = verticies[index + 4];
            var y0 = verticies[index + 1], y1 = verticies[index + 3], y2 = verticies[index + 5];
            context.moveTo(x0, y0);
            context.lineTo(x1, y1);
            context.lineTo(x2, y2);
        }
        context.fillStyle = "#FF0000";
        context.fill();
        context.closePath();
    };
    PIXI.Strip.prototype.onTextureUpdate = function() {
        this.updateFrame = true;
    };
    PIXI.Rope = function(texture, points) {
        PIXI.Strip.call(this, texture);
        this.points = points;
        this.verticies = new PIXI.Float32Array(points.length * 4);
        this.uvs = new PIXI.Float32Array(points.length * 4);
        this.colors = new PIXI.Float32Array(points.length * 2);
        this.indices = new PIXI.Uint16Array(points.length * 2);
        this.refresh();
    };
    PIXI.Rope.prototype = Object.create(PIXI.Strip.prototype);
    PIXI.Rope.prototype.constructor = PIXI.Rope;
    PIXI.Rope.prototype.refresh = function() {
        var points = this.points;
        if (points.length < 1) return;
        var uvs = this.uvs;
        var lastPoint = points[0];
        var indices = this.indices;
        var colors = this.colors;
        this.count -= .2;
        uvs[0] = 0;
        uvs[1] = 0;
        uvs[2] = 0;
        uvs[3] = 1;
        colors[0] = 1;
        colors[1] = 1;
        indices[0] = 0;
        indices[1] = 1;
        var total = points.length, point, index, amount;
        for (var i = 1; i < total; i++) {
            point = points[i];
            index = i * 4;
            amount = i / (total - 1);
            if (i % 2) {
                uvs[index] = amount;
                uvs[index + 1] = 0;
                uvs[index + 2] = amount;
                uvs[index + 3] = 1;
            } else {
                uvs[index] = amount;
                uvs[index + 1] = 0;
                uvs[index + 2] = amount;
                uvs[index + 3] = 1;
            }
            index = i * 2;
            colors[index] = 1;
            colors[index + 1] = 1;
            index = i * 2;
            indices[index] = index;
            indices[index + 1] = index + 1;
            lastPoint = point;
        }
    };
    PIXI.Rope.prototype.updateTransform = function() {
        var points = this.points;
        if (points.length < 1) return;
        var lastPoint = points[0];
        var nextPoint;
        var perp = {
            x: 0,
            y: 0
        };
        this.count -= .2;
        var verticies = this.verticies;
        var total = points.length, point, index, ratio, perpLength, num;
        for (var i = 0; i < total; i++) {
            point = points[i];
            index = i * 4;
            if (i < points.length - 1) {
                nextPoint = points[i + 1];
            } else {
                nextPoint = point;
            }
            perp.y = -(nextPoint.x - lastPoint.x);
            perp.x = nextPoint.y - lastPoint.y;
            ratio = (1 - i / (total - 1)) * 10;
            if (ratio > 1) ratio = 1;
            perpLength = Math.sqrt(perp.x * perp.x + perp.y * perp.y);
            num = this.texture.height / 2;
            perp.x /= perpLength;
            perp.y /= perpLength;
            perp.x *= num;
            perp.y *= num;
            verticies[index] = point.x + perp.x;
            verticies[index + 1] = point.y + perp.y;
            verticies[index + 2] = point.x - perp.x;
            verticies[index + 3] = point.y - perp.y;
            lastPoint = point;
        }
        PIXI.DisplayObjectContainer.prototype.updateTransform.call(this);
    };
    PIXI.Rope.prototype.setTexture = function(texture) {
        this.texture = texture;
    };
    PIXI.TilingSprite = function(texture, width, height) {
        PIXI.Sprite.call(this, texture);
        this._width = width || 100;
        this._height = height || 100;
        this.tileScale = new PIXI.Point(1, 1);
        this.tileScaleOffset = new PIXI.Point(1, 1);
        this.tilePosition = new PIXI.Point(0, 0);
        this.renderable = true;
        this.tint = 16777215;
        this.blendMode = PIXI.blendModes.NORMAL;
    };
    PIXI.TilingSprite.prototype = Object.create(PIXI.Sprite.prototype);
    PIXI.TilingSprite.prototype.constructor = PIXI.TilingSprite;
    Object.defineProperty(PIXI.TilingSprite.prototype, "width", {
        get: function() {
            return this._width;
        },
        set: function(value) {
            this._width = value;
        }
    });
    Object.defineProperty(PIXI.TilingSprite.prototype, "height", {
        get: function() {
            return this._height;
        },
        set: function(value) {
            this._height = value;
        }
    });
    PIXI.TilingSprite.prototype.setTexture = function(texture) {
        if (this.texture === texture) return;
        this.texture = texture;
        this.refreshTexture = true;
        this.cachedTint = 16777215;
    };
    PIXI.TilingSprite.prototype._renderWebGL = function(renderSession) {
        if (this.visible === false || this.alpha === 0) return;
        var i, j;
        if (this._mask) {
            renderSession.spriteBatch.stop();
            renderSession.maskManager.pushMask(this.mask, renderSession);
            renderSession.spriteBatch.start();
        }
        if (this._filters) {
            renderSession.spriteBatch.flush();
            renderSession.filterManager.pushFilter(this._filterBlock);
        }
        if (!this.tilingTexture || this.refreshTexture) {
            this.generateTilingTexture(true);
            if (this.tilingTexture && this.tilingTexture.needsUpdate) {
                PIXI.updateWebGLTexture(this.tilingTexture.baseTexture, renderSession.gl);
                this.tilingTexture.needsUpdate = false;
            }
        } else {
            renderSession.spriteBatch.renderTilingSprite(this);
        }
        for (i = 0, j = this.children.length; i < j; i++) {
            this.children[i]._renderWebGL(renderSession);
        }
        renderSession.spriteBatch.stop();
        if (this._filters) renderSession.filterManager.popFilter();
        if (this._mask) renderSession.maskManager.popMask(this._mask, renderSession);
        renderSession.spriteBatch.start();
    };
    PIXI.TilingSprite.prototype._renderCanvas = function(renderSession) {
        if (this.visible === false || this.alpha === 0) return;
        var context = renderSession.context;
        if (this._mask) {
            renderSession.maskManager.pushMask(this._mask, context);
        }
        context.globalAlpha = this.worldAlpha;
        var transform = this.worldTransform;
        var i, j;
        var resolution = renderSession.resolution;
        context.setTransform(transform.a * resolution, transform.c * resolution, transform.b * resolution, transform.d * resolution, transform.tx * resolution, transform.ty * resolution);
        if (!this.__tilePattern || this.refreshTexture) {
            this.generateTilingTexture(false);
            if (this.tilingTexture) {
                this.__tilePattern = context.createPattern(this.tilingTexture.baseTexture.source, "repeat");
            } else {
                return;
            }
        }
        if (this.blendMode !== renderSession.currentBlendMode) {
            renderSession.currentBlendMode = this.blendMode;
            context.globalCompositeOperation = PIXI.blendModesCanvas[renderSession.currentBlendMode];
        }
        var tilePosition = this.tilePosition;
        var tileScale = this.tileScale;
        tilePosition.x %= this.tilingTexture.baseTexture.width;
        tilePosition.y %= this.tilingTexture.baseTexture.height;
        context.scale(tileScale.x, tileScale.y);
        context.translate(tilePosition.x + this.anchor.x * -this._width, tilePosition.y + this.anchor.y * -this._height);
        context.fillStyle = this.__tilePattern;
        context.fillRect(-tilePosition.x, -tilePosition.y, this._width / tileScale.x, this._height / tileScale.y);
        context.scale(1 / tileScale.x, 1 / tileScale.y);
        context.translate(-tilePosition.x + this.anchor.x * this._width, -tilePosition.y + this.anchor.y * this._height);
        if (this._mask) {
            renderSession.maskManager.popMask(renderSession.context);
        }
        for (i = 0, j = this.children.length; i < j; i++) {
            this.children[i]._renderCanvas(renderSession);
        }
    };
    PIXI.TilingSprite.prototype.getBounds = function() {
        var width = this._width;
        var height = this._height;
        var w0 = width * (1 - this.anchor.x);
        var w1 = width * -this.anchor.x;
        var h0 = height * (1 - this.anchor.y);
        var h1 = height * -this.anchor.y;
        var worldTransform = this.worldTransform;
        var a = worldTransform.a;
        var b = worldTransform.b;
        var c = worldTransform.c;
        var d = worldTransform.d;
        var tx = worldTransform.tx;
        var ty = worldTransform.ty;
        var x1 = a * w1 + c * h1 + tx;
        var y1 = d * h1 + b * w1 + ty;
        var x2 = a * w0 + c * h1 + tx;
        var y2 = d * h1 + b * w0 + ty;
        var x3 = a * w0 + c * h0 + tx;
        var y3 = d * h0 + b * w0 + ty;
        var x4 = a * w1 + c * h0 + tx;
        var y4 = d * h0 + b * w1 + ty;
        var maxX = -Infinity;
        var maxY = -Infinity;
        var minX = Infinity;
        var minY = Infinity;
        minX = x1 < minX ? x1 : minX;
        minX = x2 < minX ? x2 : minX;
        minX = x3 < minX ? x3 : minX;
        minX = x4 < minX ? x4 : minX;
        minY = y1 < minY ? y1 : minY;
        minY = y2 < minY ? y2 : minY;
        minY = y3 < minY ? y3 : minY;
        minY = y4 < minY ? y4 : minY;
        maxX = x1 > maxX ? x1 : maxX;
        maxX = x2 > maxX ? x2 : maxX;
        maxX = x3 > maxX ? x3 : maxX;
        maxX = x4 > maxX ? x4 : maxX;
        maxY = y1 > maxY ? y1 : maxY;
        maxY = y2 > maxY ? y2 : maxY;
        maxY = y3 > maxY ? y3 : maxY;
        maxY = y4 > maxY ? y4 : maxY;
        var bounds = this._bounds;
        bounds.x = minX;
        bounds.width = maxX - minX;
        bounds.y = minY;
        bounds.height = maxY - minY;
        this._currentBounds = bounds;
        return bounds;
    };
    PIXI.TilingSprite.prototype.onTextureUpdate = function() {};
    PIXI.TilingSprite.prototype.generateTilingTexture = function(forcePowerOfTwo) {
        if (!this.texture.baseTexture.hasLoaded) return;
        var texture = this.originalTexture || this.texture;
        var frame = texture.frame;
        var targetWidth, targetHeight;
        var isFrame = frame.width !== texture.baseTexture.width || frame.height !== texture.baseTexture.height;
        var newTextureRequired = false;
        if (!forcePowerOfTwo) {
            if (isFrame) {
                targetWidth = frame.width;
                targetHeight = frame.height;
                newTextureRequired = true;
            }
        } else {
            targetWidth = PIXI.getNextPowerOfTwo(frame.width);
            targetHeight = PIXI.getNextPowerOfTwo(frame.height);
            if (frame.width !== targetWidth || frame.height !== targetHeight) newTextureRequired = true;
        }
        if (newTextureRequired) {
            var canvasBuffer;
            if (this.tilingTexture && this.tilingTexture.isTiling) {
                canvasBuffer = this.tilingTexture.canvasBuffer;
                canvasBuffer.resize(targetWidth, targetHeight);
                this.tilingTexture.baseTexture.width = targetWidth;
                this.tilingTexture.baseTexture.height = targetHeight;
                this.tilingTexture.needsUpdate = true;
            } else {
                canvasBuffer = new PIXI.CanvasBuffer(targetWidth, targetHeight);
                this.tilingTexture = PIXI.Texture.fromCanvas(canvasBuffer.canvas);
                this.tilingTexture.canvasBuffer = canvasBuffer;
                this.tilingTexture.isTiling = true;
            }
            canvasBuffer.context.drawImage(texture.baseTexture.source, texture.crop.x, texture.crop.y, texture.crop.width, texture.crop.height, 0, 0, targetWidth, targetHeight);
            this.tileScaleOffset.x = frame.width / targetWidth;
            this.tileScaleOffset.y = frame.height / targetHeight;
        } else {
            if (this.tilingTexture && this.tilingTexture.isTiling) {
                this.tilingTexture.destroy(true);
            }
            this.tileScaleOffset.x = 1;
            this.tileScaleOffset.y = 1;
            this.tilingTexture = texture;
        }
        this.refreshTexture = false;
        this.originalTexture = this.texture;
        this.texture = this.tilingTexture;
        this.tilingTexture.baseTexture._powerOf2 = true;
    };
    var spine = {};
    spine.BoneData = function(name, parent) {
        this.name = name;
        this.parent = parent;
    };
    spine.BoneData.prototype = {
        length: 0,
        x: 0,
        y: 0,
        rotation: 0,
        scaleX: 1,
        scaleY: 1
    };
    spine.SlotData = function(name, boneData) {
        this.name = name;
        this.boneData = boneData;
    };
    spine.SlotData.prototype = {
        r: 1,
        g: 1,
        b: 1,
        a: 1,
        attachmentName: null
    };
    spine.Bone = function(boneData, parent) {
        this.data = boneData;
        this.parent = parent;
        this.setToSetupPose();
    };
    spine.Bone.yDown = false;
    spine.Bone.prototype = {
        x: 0,
        y: 0,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        m00: 0,
        m01: 0,
        worldX: 0,
        m10: 0,
        m11: 0,
        worldY: 0,
        worldRotation: 0,
        worldScaleX: 1,
        worldScaleY: 1,
        updateWorldTransform: function(flipX, flipY) {
            var parent = this.parent;
            if (parent != null) {
                this.worldX = this.x * parent.m00 + this.y * parent.m01 + parent.worldX;
                this.worldY = this.x * parent.m10 + this.y * parent.m11 + parent.worldY;
                this.worldScaleX = parent.worldScaleX * this.scaleX;
                this.worldScaleY = parent.worldScaleY * this.scaleY;
                this.worldRotation = parent.worldRotation + this.rotation;
            } else {
                this.worldX = this.x;
                this.worldY = this.y;
                this.worldScaleX = this.scaleX;
                this.worldScaleY = this.scaleY;
                this.worldRotation = this.rotation;
            }
            var radians = this.worldRotation * Math.PI / 180;
            var cos = Math.cos(radians);
            var sin = Math.sin(radians);
            this.m00 = cos * this.worldScaleX;
            this.m10 = sin * this.worldScaleX;
            this.m01 = -sin * this.worldScaleY;
            this.m11 = cos * this.worldScaleY;
            if (flipX) {
                this.m00 = -this.m00;
                this.m01 = -this.m01;
            }
            if (flipY) {
                this.m10 = -this.m10;
                this.m11 = -this.m11;
            }
            if (spine.Bone.yDown) {
                this.m10 = -this.m10;
                this.m11 = -this.m11;
            }
        },
        setToSetupPose: function() {
            var data = this.data;
            this.x = data.x;
            this.y = data.y;
            this.rotation = data.rotation;
            this.scaleX = data.scaleX;
            this.scaleY = data.scaleY;
        }
    };
    spine.Slot = function(slotData, skeleton, bone) {
        this.data = slotData;
        this.skeleton = skeleton;
        this.bone = bone;
        this.setToSetupPose();
    };
    spine.Slot.prototype = {
        r: 1,
        g: 1,
        b: 1,
        a: 1,
        _attachmentTime: 0,
        attachment: null,
        setAttachment: function(attachment) {
            this.attachment = attachment;
            this._attachmentTime = this.skeleton.time;
        },
        setAttachmentTime: function(time) {
            this._attachmentTime = this.skeleton.time - time;
        },
        getAttachmentTime: function() {
            return this.skeleton.time - this._attachmentTime;
        },
        setToSetupPose: function() {
            var data = this.data;
            this.r = data.r;
            this.g = data.g;
            this.b = data.b;
            this.a = data.a;
            var slotDatas = this.skeleton.data.slots;
            for (var i = 0, n = slotDatas.length; i < n; i++) {
                if (slotDatas[i] == data) {
                    this.setAttachment(!data.attachmentName ? null : this.skeleton.getAttachmentBySlotIndex(i, data.attachmentName));
                    break;
                }
            }
        }
    };
    spine.Skin = function(name) {
        this.name = name;
        this.attachments = {};
    };
    spine.Skin.prototype = {
        addAttachment: function(slotIndex, name, attachment) {
            this.attachments[slotIndex + ":" + name] = attachment;
        },
        getAttachment: function(slotIndex, name) {
            return this.attachments[slotIndex + ":" + name];
        },
        _attachAll: function(skeleton, oldSkin) {
            for (var key in oldSkin.attachments) {
                var colon = key.indexOf(":");
                var slotIndex = parseInt(key.substring(0, colon), 10);
                var name = key.substring(colon + 1);
                var slot = skeleton.slots[slotIndex];
                if (slot.attachment && slot.attachment.name == name) {
                    var attachment = this.getAttachment(slotIndex, name);
                    if (attachment) slot.setAttachment(attachment);
                }
            }
        }
    };
    spine.Animation = function(name, timelines, duration) {
        this.name = name;
        this.timelines = timelines;
        this.duration = duration;
    };
    spine.Animation.prototype = {
        apply: function(skeleton, time, loop) {
            if (loop && this.duration) time %= this.duration;
            var timelines = this.timelines;
            for (var i = 0, n = timelines.length; i < n; i++) timelines[i].apply(skeleton, time, 1);
        },
        mix: function(skeleton, time, loop, alpha) {
            if (loop && this.duration) time %= this.duration;
            var timelines = this.timelines;
            for (var i = 0, n = timelines.length; i < n; i++) timelines[i].apply(skeleton, time, alpha);
        }
    };
    spine.binarySearch = function(values, target, step) {
        var low = 0;
        var high = Math.floor(values.length / step) - 2;
        if (!high) return step;
        var current = high >>> 1;
        while (true) {
            if (values[(current + 1) * step] <= target) low = current + 1; else high = current;
            if (low == high) return (low + 1) * step;
            current = low + high >>> 1;
        }
    };
    spine.linearSearch = function(values, target, step) {
        for (var i = 0, last = values.length - step; i <= last; i += step) if (values[i] > target) return i;
        return -1;
    };
    spine.Curves = function(frameCount) {
        this.curves = [];
        this.curves.length = (frameCount - 1) * 6;
    };
    spine.Curves.prototype = {
        setLinear: function(frameIndex) {
            this.curves[frameIndex * 6] = 0;
        },
        setStepped: function(frameIndex) {
            this.curves[frameIndex * 6] = -1;
        },
        setCurve: function(frameIndex, cx1, cy1, cx2, cy2) {
            var subdiv_step = 1 / 10;
            var subdiv_step2 = subdiv_step * subdiv_step;
            var subdiv_step3 = subdiv_step2 * subdiv_step;
            var pre1 = 3 * subdiv_step;
            var pre2 = 3 * subdiv_step2;
            var pre4 = 6 * subdiv_step2;
            var pre5 = 6 * subdiv_step3;
            var tmp1x = -cx1 * 2 + cx2;
            var tmp1y = -cy1 * 2 + cy2;
            var tmp2x = (cx1 - cx2) * 3 + 1;
            var tmp2y = (cy1 - cy2) * 3 + 1;
            var i = frameIndex * 6;
            var curves = this.curves;
            curves[i] = cx1 * pre1 + tmp1x * pre2 + tmp2x * subdiv_step3;
            curves[i + 1] = cy1 * pre1 + tmp1y * pre2 + tmp2y * subdiv_step3;
            curves[i + 2] = tmp1x * pre4 + tmp2x * pre5;
            curves[i + 3] = tmp1y * pre4 + tmp2y * pre5;
            curves[i + 4] = tmp2x * pre5;
            curves[i + 5] = tmp2y * pre5;
        },
        getCurvePercent: function(frameIndex, percent) {
            percent = percent < 0 ? 0 : percent > 1 ? 1 : percent;
            var curveIndex = frameIndex * 6;
            var curves = this.curves;
            var dfx = curves[curveIndex];
            if (!dfx) return percent;
            if (dfx == -1) return 0;
            var dfy = curves[curveIndex + 1];
            var ddfx = curves[curveIndex + 2];
            var ddfy = curves[curveIndex + 3];
            var dddfx = curves[curveIndex + 4];
            var dddfy = curves[curveIndex + 5];
            var x = dfx, y = dfy;
            var i = 10 - 2;
            while (true) {
                if (x >= percent) {
                    var lastX = x - dfx;
                    var lastY = y - dfy;
                    return lastY + (y - lastY) * (percent - lastX) / (x - lastX);
                }
                if (!i) break;
                i--;
                dfx += ddfx;
                dfy += ddfy;
                ddfx += dddfx;
                ddfy += dddfy;
                x += dfx;
                y += dfy;
            }
            return y + (1 - y) * (percent - x) / (1 - x);
        }
    };
    spine.RotateTimeline = function(frameCount) {
        this.curves = new spine.Curves(frameCount);
        this.frames = [];
        this.frames.length = frameCount * 2;
    };
    spine.RotateTimeline.prototype = {
        boneIndex: 0,
        getFrameCount: function() {
            return this.frames.length / 2;
        },
        setFrame: function(frameIndex, time, angle) {
            frameIndex *= 2;
            this.frames[frameIndex] = time;
            this.frames[frameIndex + 1] = angle;
        },
        apply: function(skeleton, time, alpha) {
            var frames = this.frames, amount;
            if (time < frames[0]) return;
            var bone = skeleton.bones[this.boneIndex];
            if (time >= frames[frames.length - 2]) {
                amount = bone.data.rotation + frames[frames.length - 1] - bone.rotation;
                while (amount > 180) amount -= 360;
                while (amount < -180) amount += 360;
                bone.rotation += amount * alpha;
                return;
            }
            var frameIndex = spine.binarySearch(frames, time, 2);
            var lastFrameValue = frames[frameIndex - 1];
            var frameTime = frames[frameIndex];
            var percent = 1 - (time - frameTime) / (frames[frameIndex - 2] - frameTime);
            percent = this.curves.getCurvePercent(frameIndex / 2 - 1, percent);
            amount = frames[frameIndex + 1] - lastFrameValue;
            while (amount > 180) amount -= 360;
            while (amount < -180) amount += 360;
            amount = bone.data.rotation + (lastFrameValue + amount * percent) - bone.rotation;
            while (amount > 180) amount -= 360;
            while (amount < -180) amount += 360;
            bone.rotation += amount * alpha;
        }
    };
    spine.TranslateTimeline = function(frameCount) {
        this.curves = new spine.Curves(frameCount);
        this.frames = [];
        this.frames.length = frameCount * 3;
    };
    spine.TranslateTimeline.prototype = {
        boneIndex: 0,
        getFrameCount: function() {
            return this.frames.length / 3;
        },
        setFrame: function(frameIndex, time, x, y) {
            frameIndex *= 3;
            this.frames[frameIndex] = time;
            this.frames[frameIndex + 1] = x;
            this.frames[frameIndex + 2] = y;
        },
        apply: function(skeleton, time, alpha) {
            var frames = this.frames;
            if (time < frames[0]) return;
            var bone = skeleton.bones[this.boneIndex];
            if (time >= frames[frames.length - 3]) {
                bone.x += (bone.data.x + frames[frames.length - 2] - bone.x) * alpha;
                bone.y += (bone.data.y + frames[frames.length - 1] - bone.y) * alpha;
                return;
            }
            var frameIndex = spine.binarySearch(frames, time, 3);
            var lastFrameX = frames[frameIndex - 2];
            var lastFrameY = frames[frameIndex - 1];
            var frameTime = frames[frameIndex];
            var percent = 1 - (time - frameTime) / (frames[frameIndex + -3] - frameTime);
            percent = this.curves.getCurvePercent(frameIndex / 3 - 1, percent);
            bone.x += (bone.data.x + lastFrameX + (frames[frameIndex + 1] - lastFrameX) * percent - bone.x) * alpha;
            bone.y += (bone.data.y + lastFrameY + (frames[frameIndex + 2] - lastFrameY) * percent - bone.y) * alpha;
        }
    };
    spine.ScaleTimeline = function(frameCount) {
        this.curves = new spine.Curves(frameCount);
        this.frames = [];
        this.frames.length = frameCount * 3;
    };
    spine.ScaleTimeline.prototype = {
        boneIndex: 0,
        getFrameCount: function() {
            return this.frames.length / 3;
        },
        setFrame: function(frameIndex, time, x, y) {
            frameIndex *= 3;
            this.frames[frameIndex] = time;
            this.frames[frameIndex + 1] = x;
            this.frames[frameIndex + 2] = y;
        },
        apply: function(skeleton, time, alpha) {
            var frames = this.frames;
            if (time < frames[0]) return;
            var bone = skeleton.bones[this.boneIndex];
            if (time >= frames[frames.length - 3]) {
                bone.scaleX += (bone.data.scaleX - 1 + frames[frames.length - 2] - bone.scaleX) * alpha;
                bone.scaleY += (bone.data.scaleY - 1 + frames[frames.length - 1] - bone.scaleY) * alpha;
                return;
            }
            var frameIndex = spine.binarySearch(frames, time, 3);
            var lastFrameX = frames[frameIndex - 2];
            var lastFrameY = frames[frameIndex - 1];
            var frameTime = frames[frameIndex];
            var percent = 1 - (time - frameTime) / (frames[frameIndex + -3] - frameTime);
            percent = this.curves.getCurvePercent(frameIndex / 3 - 1, percent);
            bone.scaleX += (bone.data.scaleX - 1 + lastFrameX + (frames[frameIndex + 1] - lastFrameX) * percent - bone.scaleX) * alpha;
            bone.scaleY += (bone.data.scaleY - 1 + lastFrameY + (frames[frameIndex + 2] - lastFrameY) * percent - bone.scaleY) * alpha;
        }
    };
    spine.ColorTimeline = function(frameCount) {
        this.curves = new spine.Curves(frameCount);
        this.frames = [];
        this.frames.length = frameCount * 5;
    };
    spine.ColorTimeline.prototype = {
        slotIndex: 0,
        getFrameCount: function() {
            return this.frames.length / 5;
        },
        setFrame: function(frameIndex, time, r, g, b, a) {
            frameIndex *= 5;
            this.frames[frameIndex] = time;
            this.frames[frameIndex + 1] = r;
            this.frames[frameIndex + 2] = g;
            this.frames[frameIndex + 3] = b;
            this.frames[frameIndex + 4] = a;
        },
        apply: function(skeleton, time, alpha) {
            var frames = this.frames;
            if (time < frames[0]) return;
            var slot = skeleton.slots[this.slotIndex];
            if (time >= frames[frames.length - 5]) {
                var i = frames.length - 1;
                slot.r = frames[i - 3];
                slot.g = frames[i - 2];
                slot.b = frames[i - 1];
                slot.a = frames[i];
                return;
            }
            var frameIndex = spine.binarySearch(frames, time, 5);
            var lastFrameR = frames[frameIndex - 4];
            var lastFrameG = frames[frameIndex - 3];
            var lastFrameB = frames[frameIndex - 2];
            var lastFrameA = frames[frameIndex - 1];
            var frameTime = frames[frameIndex];
            var percent = 1 - (time - frameTime) / (frames[frameIndex - 5] - frameTime);
            percent = this.curves.getCurvePercent(frameIndex / 5 - 1, percent);
            var r = lastFrameR + (frames[frameIndex + 1] - lastFrameR) * percent;
            var g = lastFrameG + (frames[frameIndex + 2] - lastFrameG) * percent;
            var b = lastFrameB + (frames[frameIndex + 3] - lastFrameB) * percent;
            var a = lastFrameA + (frames[frameIndex + 4] - lastFrameA) * percent;
            if (alpha < 1) {
                slot.r += (r - slot.r) * alpha;
                slot.g += (g - slot.g) * alpha;
                slot.b += (b - slot.b) * alpha;
                slot.a += (a - slot.a) * alpha;
            } else {
                slot.r = r;
                slot.g = g;
                slot.b = b;
                slot.a = a;
            }
        }
    };
    spine.AttachmentTimeline = function(frameCount) {
        this.curves = new spine.Curves(frameCount);
        this.frames = [];
        this.frames.length = frameCount;
        this.attachmentNames = [];
        this.attachmentNames.length = frameCount;
    };
    spine.AttachmentTimeline.prototype = {
        slotIndex: 0,
        getFrameCount: function() {
            return this.frames.length;
        },
        setFrame: function(frameIndex, time, attachmentName) {
            this.frames[frameIndex] = time;
            this.attachmentNames[frameIndex] = attachmentName;
        },
        apply: function(skeleton, time, alpha) {
            var frames = this.frames;
            if (time < frames[0]) return;
            var frameIndex;
            if (time >= frames[frames.length - 1]) frameIndex = frames.length - 1; else frameIndex = spine.binarySearch(frames, time, 1) - 1;
            var attachmentName = this.attachmentNames[frameIndex];
            skeleton.slots[this.slotIndex].setAttachment(!attachmentName ? null : skeleton.getAttachmentBySlotIndex(this.slotIndex, attachmentName));
        }
    };
    spine.SkeletonData = function() {
        this.bones = [];
        this.slots = [];
        this.skins = [];
        this.animations = [];
    };
    spine.SkeletonData.prototype = {
        defaultSkin: null,
        findBone: function(boneName) {
            var bones = this.bones;
            for (var i = 0, n = bones.length; i < n; i++) if (bones[i].name == boneName) return bones[i];
            return null;
        },
        findBoneIndex: function(boneName) {
            var bones = this.bones;
            for (var i = 0, n = bones.length; i < n; i++) if (bones[i].name == boneName) return i;
            return -1;
        },
        findSlot: function(slotName) {
            var slots = this.slots;
            for (var i = 0, n = slots.length; i < n; i++) {
                if (slots[i].name == slotName) return slot[i];
            }
            return null;
        },
        findSlotIndex: function(slotName) {
            var slots = this.slots;
            for (var i = 0, n = slots.length; i < n; i++) if (slots[i].name == slotName) return i;
            return -1;
        },
        findSkin: function(skinName) {
            var skins = this.skins;
            for (var i = 0, n = skins.length; i < n; i++) if (skins[i].name == skinName) return skins[i];
            return null;
        },
        findAnimation: function(animationName) {
            var animations = this.animations;
            for (var i = 0, n = animations.length; i < n; i++) if (animations[i].name == animationName) return animations[i];
            return null;
        }
    };
    spine.Skeleton = function(skeletonData) {
        this.data = skeletonData;
        this.bones = [];
        for (var i = 0, n = skeletonData.bones.length; i < n; i++) {
            var boneData = skeletonData.bones[i];
            var parent = !boneData.parent ? null : this.bones[skeletonData.bones.indexOf(boneData.parent)];
            this.bones.push(new spine.Bone(boneData, parent));
        }
        this.slots = [];
        this.drawOrder = [];
        for (i = 0, n = skeletonData.slots.length; i < n; i++) {
            var slotData = skeletonData.slots[i];
            var bone = this.bones[skeletonData.bones.indexOf(slotData.boneData)];
            var slot = new spine.Slot(slotData, this, bone);
            this.slots.push(slot);
            this.drawOrder.push(slot);
        }
    };
    spine.Skeleton.prototype = {
        x: 0,
        y: 0,
        skin: null,
        r: 1,
        g: 1,
        b: 1,
        a: 1,
        time: 0,
        flipX: false,
        flipY: false,
        updateWorldTransform: function() {
            var flipX = this.flipX;
            var flipY = this.flipY;
            var bones = this.bones;
            for (var i = 0, n = bones.length; i < n; i++) bones[i].updateWorldTransform(flipX, flipY);
        },
        setToSetupPose: function() {
            this.setBonesToSetupPose();
            this.setSlotsToSetupPose();
        },
        setBonesToSetupPose: function() {
            var bones = this.bones;
            for (var i = 0, n = bones.length; i < n; i++) bones[i].setToSetupPose();
        },
        setSlotsToSetupPose: function() {
            var slots = this.slots;
            for (var i = 0, n = slots.length; i < n; i++) slots[i].setToSetupPose(i);
        },
        getRootBone: function() {
            return this.bones.length ? this.bones[0] : null;
        },
        findBone: function(boneName) {
            var bones = this.bones;
            for (var i = 0, n = bones.length; i < n; i++) if (bones[i].data.name == boneName) return bones[i];
            return null;
        },
        findBoneIndex: function(boneName) {
            var bones = this.bones;
            for (var i = 0, n = bones.length; i < n; i++) if (bones[i].data.name == boneName) return i;
            return -1;
        },
        findSlot: function(slotName) {
            var slots = this.slots;
            for (var i = 0, n = slots.length; i < n; i++) if (slots[i].data.name == slotName) return slots[i];
            return null;
        },
        findSlotIndex: function(slotName) {
            var slots = this.slots;
            for (var i = 0, n = slots.length; i < n; i++) if (slots[i].data.name == slotName) return i;
            return -1;
        },
        setSkinByName: function(skinName) {
            var skin = this.data.findSkin(skinName);
            if (!skin) throw "Skin not found: " + skinName;
            this.setSkin(skin);
        },
        setSkin: function(newSkin) {
            if (this.skin && newSkin) newSkin._attachAll(this, this.skin);
            this.skin = newSkin;
        },
        getAttachmentBySlotName: function(slotName, attachmentName) {
            return this.getAttachmentBySlotIndex(this.data.findSlotIndex(slotName), attachmentName);
        },
        getAttachmentBySlotIndex: function(slotIndex, attachmentName) {
            if (this.skin) {
                var attachment = this.skin.getAttachment(slotIndex, attachmentName);
                if (attachment) return attachment;
            }
            if (this.data.defaultSkin) return this.data.defaultSkin.getAttachment(slotIndex, attachmentName);
            return null;
        },
        setAttachment: function(slotName, attachmentName) {
            var slots = this.slots;
            for (var i = 0, n = slots.size; i < n; i++) {
                var slot = slots[i];
                if (slot.data.name == slotName) {
                    var attachment = null;
                    if (attachmentName) {
                        attachment = this.getAttachment(i, attachmentName);
                        if (attachment == null) throw "Attachment not found: " + attachmentName + ", for slot: " + slotName;
                    }
                    slot.setAttachment(attachment);
                    return;
                }
            }
            throw "Slot not found: " + slotName;
        },
        update: function(delta) {
            time += delta;
        }
    };
    spine.AttachmentType = {
        region: 0
    };
    spine.RegionAttachment = function() {
        this.offset = [];
        this.offset.length = 8;
        this.uvs = [];
        this.uvs.length = 8;
    };
    spine.RegionAttachment.prototype = {
        x: 0,
        y: 0,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        width: 0,
        height: 0,
        rendererObject: null,
        regionOffsetX: 0,
        regionOffsetY: 0,
        regionWidth: 0,
        regionHeight: 0,
        regionOriginalWidth: 0,
        regionOriginalHeight: 0,
        setUVs: function(u, v, u2, v2, rotate) {
            var uvs = this.uvs;
            if (rotate) {
                uvs[2] = u;
                uvs[3] = v2;
                uvs[4] = u;
                uvs[5] = v;
                uvs[6] = u2;
                uvs[7] = v;
                uvs[0] = u2;
                uvs[1] = v2;
            } else {
                uvs[0] = u;
                uvs[1] = v2;
                uvs[2] = u;
                uvs[3] = v;
                uvs[4] = u2;
                uvs[5] = v;
                uvs[6] = u2;
                uvs[7] = v2;
            }
        },
        updateOffset: function() {
            var regionScaleX = this.width / this.regionOriginalWidth * this.scaleX;
            var regionScaleY = this.height / this.regionOriginalHeight * this.scaleY;
            var localX = -this.width / 2 * this.scaleX + this.regionOffsetX * regionScaleX;
            var localY = -this.height / 2 * this.scaleY + this.regionOffsetY * regionScaleY;
            var localX2 = localX + this.regionWidth * regionScaleX;
            var localY2 = localY + this.regionHeight * regionScaleY;
            var radians = this.rotation * Math.PI / 180;
            var cos = Math.cos(radians);
            var sin = Math.sin(radians);
            var localXCos = localX * cos + this.x;
            var localXSin = localX * sin;
            var localYCos = localY * cos + this.y;
            var localYSin = localY * sin;
            var localX2Cos = localX2 * cos + this.x;
            var localX2Sin = localX2 * sin;
            var localY2Cos = localY2 * cos + this.y;
            var localY2Sin = localY2 * sin;
            var offset = this.offset;
            offset[0] = localXCos - localYSin;
            offset[1] = localYCos + localXSin;
            offset[2] = localXCos - localY2Sin;
            offset[3] = localY2Cos + localXSin;
            offset[4] = localX2Cos - localY2Sin;
            offset[5] = localY2Cos + localX2Sin;
            offset[6] = localX2Cos - localYSin;
            offset[7] = localYCos + localX2Sin;
        },
        computeVertices: function(x, y, bone, vertices) {
            x += bone.worldX;
            y += bone.worldY;
            var m00 = bone.m00;
            var m01 = bone.m01;
            var m10 = bone.m10;
            var m11 = bone.m11;
            var offset = this.offset;
            vertices[0] = offset[0] * m00 + offset[1] * m01 + x;
            vertices[1] = offset[0] * m10 + offset[1] * m11 + y;
            vertices[2] = offset[2] * m00 + offset[3] * m01 + x;
            vertices[3] = offset[2] * m10 + offset[3] * m11 + y;
            vertices[4] = offset[4] * m00 + offset[5] * m01 + x;
            vertices[5] = offset[4] * m10 + offset[5] * m11 + y;
            vertices[6] = offset[6] * m00 + offset[7] * m01 + x;
            vertices[7] = offset[6] * m10 + offset[7] * m11 + y;
        }
    };
    spine.AnimationStateData = function(skeletonData) {
        this.skeletonData = skeletonData;
        this.animationToMixTime = {};
    };
    spine.AnimationStateData.prototype = {
        defaultMix: 0,
        setMixByName: function(fromName, toName, duration) {
            var from = this.skeletonData.findAnimation(fromName);
            if (!from) throw "Animation not found: " + fromName;
            var to = this.skeletonData.findAnimation(toName);
            if (!to) throw "Animation not found: " + toName;
            this.setMix(from, to, duration);
        },
        setMix: function(from, to, duration) {
            this.animationToMixTime[from.name + ":" + to.name] = duration;
        },
        getMix: function(from, to) {
            var time = this.animationToMixTime[from.name + ":" + to.name];
            return time ? time : this.defaultMix;
        }
    };
    spine.AnimationState = function(stateData) {
        this.data = stateData;
        this.queue = [];
    };
    spine.AnimationState.prototype = {
        animationSpeed: 1,
        current: null,
        previous: null,
        currentTime: 0,
        previousTime: 0,
        currentLoop: false,
        previousLoop: false,
        mixTime: 0,
        mixDuration: 0,
        update: function(delta) {
            this.currentTime += delta * this.animationSpeed;
            this.previousTime += delta;
            this.mixTime += delta;
            if (this.queue.length > 0) {
                var entry = this.queue[0];
                if (this.currentTime >= entry.delay) {
                    this._setAnimation(entry.animation, entry.loop);
                    this.queue.shift();
                }
            }
        },
        apply: function(skeleton) {
            if (!this.current) return;
            if (this.previous) {
                this.previous.apply(skeleton, this.previousTime, this.previousLoop);
                var alpha = this.mixTime / this.mixDuration;
                if (alpha >= 1) {
                    alpha = 1;
                    this.previous = null;
                }
                this.current.mix(skeleton, this.currentTime, this.currentLoop, alpha);
            } else this.current.apply(skeleton, this.currentTime, this.currentLoop);
        },
        clearAnimation: function() {
            this.previous = null;
            this.current = null;
            this.queue.length = 0;
        },
        _setAnimation: function(animation, loop) {
            this.previous = null;
            if (animation && this.current) {
                this.mixDuration = this.data.getMix(this.current, animation);
                if (this.mixDuration > 0) {
                    this.mixTime = 0;
                    this.previous = this.current;
                    this.previousTime = this.currentTime;
                    this.previousLoop = this.currentLoop;
                }
            }
            this.current = animation;
            this.currentLoop = loop;
            this.currentTime = 0;
        },
        setAnimationByName: function(animationName, loop) {
            var animation = this.data.skeletonData.findAnimation(animationName);
            if (!animation) throw "Animation not found: " + animationName;
            this.setAnimation(animation, loop);
        },
        setAnimation: function(animation, loop) {
            this.queue.length = 0;
            this._setAnimation(animation, loop);
        },
        addAnimationByName: function(animationName, loop, delay) {
            var animation = this.data.skeletonData.findAnimation(animationName);
            if (!animation) throw "Animation not found: " + animationName;
            this.addAnimation(animation, loop, delay);
        },
        addAnimation: function(animation, loop, delay) {
            var entry = {};
            entry.animation = animation;
            entry.loop = loop;
            if (!delay || delay <= 0) {
                var previousAnimation = this.queue.length ? this.queue[this.queue.length - 1].animation : this.current;
                if (previousAnimation != null) delay = previousAnimation.duration - this.data.getMix(previousAnimation, animation) + (delay || 0); else delay = 0;
            }
            entry.delay = delay;
            this.queue.push(entry);
        },
        isComplete: function() {
            return !this.current || this.currentTime >= this.current.duration;
        }
    };
    spine.SkeletonJson = function(attachmentLoader) {
        this.attachmentLoader = attachmentLoader;
    };
    spine.SkeletonJson.prototype = {
        scale: 1,
        readSkeletonData: function(root) {
            var skeletonData = new spine.SkeletonData(), boneData;
            var bones = root["bones"];
            for (var i = 0, n = bones.length; i < n; i++) {
                var boneMap = bones[i];
                var parent = null;
                if (boneMap["parent"]) {
                    parent = skeletonData.findBone(boneMap["parent"]);
                    if (!parent) throw "Parent bone not found: " + boneMap["parent"];
                }
                boneData = new spine.BoneData(boneMap["name"], parent);
                boneData.length = (boneMap["length"] || 0) * this.scale;
                boneData.x = (boneMap["x"] || 0) * this.scale;
                boneData.y = (boneMap["y"] || 0) * this.scale;
                boneData.rotation = boneMap["rotation"] || 0;
                boneData.scaleX = boneMap["scaleX"] || 1;
                boneData.scaleY = boneMap["scaleY"] || 1;
                skeletonData.bones.push(boneData);
            }
            var slots = root["slots"];
            for (i = 0, n = slots.length; i < n; i++) {
                var slotMap = slots[i];
                boneData = skeletonData.findBone(slotMap["bone"]);
                if (!boneData) throw "Slot bone not found: " + slotMap["bone"];
                var slotData = new spine.SlotData(slotMap["name"], boneData);
                var color = slotMap["color"];
                if (color) {
                    slotData.r = spine.SkeletonJson.toColor(color, 0);
                    slotData.g = spine.SkeletonJson.toColor(color, 1);
                    slotData.b = spine.SkeletonJson.toColor(color, 2);
                    slotData.a = spine.SkeletonJson.toColor(color, 3);
                }
                slotData.attachmentName = slotMap["attachment"];
                skeletonData.slots.push(slotData);
            }
            var skins = root["skins"];
            for (var skinName in skins) {
                if (!skins.hasOwnProperty(skinName)) continue;
                var skinMap = skins[skinName];
                var skin = new spine.Skin(skinName);
                for (var slotName in skinMap) {
                    if (!skinMap.hasOwnProperty(slotName)) continue;
                    var slotIndex = skeletonData.findSlotIndex(slotName);
                    var slotEntry = skinMap[slotName];
                    for (var attachmentName in slotEntry) {
                        if (!slotEntry.hasOwnProperty(attachmentName)) continue;
                        var attachment = this.readAttachment(skin, attachmentName, slotEntry[attachmentName]);
                        if (attachment != null) skin.addAttachment(slotIndex, attachmentName, attachment);
                    }
                }
                skeletonData.skins.push(skin);
                if (skin.name == "default") skeletonData.defaultSkin = skin;
            }
            var animations = root["animations"];
            for (var animationName in animations) {
                if (!animations.hasOwnProperty(animationName)) continue;
                this.readAnimation(animationName, animations[animationName], skeletonData);
            }
            return skeletonData;
        },
        readAttachment: function(skin, name, map) {
            name = map["name"] || name;
            var type = spine.AttachmentType[map["type"] || "region"];
            if (type == spine.AttachmentType.region) {
                var attachment = new spine.RegionAttachment();
                attachment.x = (map["x"] || 0) * this.scale;
                attachment.y = (map["y"] || 0) * this.scale;
                attachment.scaleX = map["scaleX"] || 1;
                attachment.scaleY = map["scaleY"] || 1;
                attachment.rotation = map["rotation"] || 0;
                attachment.width = (map["width"] || 32) * this.scale;
                attachment.height = (map["height"] || 32) * this.scale;
                attachment.updateOffset();
                attachment.rendererObject = {};
                attachment.rendererObject.name = name;
                attachment.rendererObject.scale = {};
                attachment.rendererObject.scale.x = attachment.scaleX;
                attachment.rendererObject.scale.y = attachment.scaleY;
                attachment.rendererObject.rotation = -attachment.rotation * Math.PI / 180;
                return attachment;
            }
            throw "Unknown attachment type: " + type;
        },
        readAnimation: function(name, map, skeletonData) {
            var timelines = [];
            var duration = 0;
            var frameIndex, timeline, timelineName, valueMap, values, i, n;
            var bones = map["bones"];
            for (var boneName in bones) {
                if (!bones.hasOwnProperty(boneName)) continue;
                var boneIndex = skeletonData.findBoneIndex(boneName);
                if (boneIndex == -1) throw "Bone not found: " + boneName;
                var boneMap = bones[boneName];
                for (timelineName in boneMap) {
                    if (!boneMap.hasOwnProperty(timelineName)) continue;
                    values = boneMap[timelineName];
                    if (timelineName == "rotate") {
                        timeline = new spine.RotateTimeline(values.length);
                        timeline.boneIndex = boneIndex;
                        frameIndex = 0;
                        for (i = 0, n = values.length; i < n; i++) {
                            valueMap = values[i];
                            timeline.setFrame(frameIndex, valueMap["time"], valueMap["angle"]);
                            spine.SkeletonJson.readCurve(timeline, frameIndex, valueMap);
                            frameIndex++;
                        }
                        timelines.push(timeline);
                        duration = Math.max(duration, timeline.frames[timeline.getFrameCount() * 2 - 2]);
                    } else if (timelineName == "translate" || timelineName == "scale") {
                        var timelineScale = 1;
                        if (timelineName == "scale") timeline = new spine.ScaleTimeline(values.length); else {
                            timeline = new spine.TranslateTimeline(values.length);
                            timelineScale = this.scale;
                        }
                        timeline.boneIndex = boneIndex;
                        frameIndex = 0;
                        for (i = 0, n = values.length; i < n; i++) {
                            valueMap = values[i];
                            var x = (valueMap["x"] || 0) * timelineScale;
                            var y = (valueMap["y"] || 0) * timelineScale;
                            timeline.setFrame(frameIndex, valueMap["time"], x, y);
                            spine.SkeletonJson.readCurve(timeline, frameIndex, valueMap);
                            frameIndex++;
                        }
                        timelines.push(timeline);
                        duration = Math.max(duration, timeline.frames[timeline.getFrameCount() * 3 - 3]);
                    } else throw "Invalid timeline type for a bone: " + timelineName + " (" + boneName + ")";
                }
            }
            var slots = map["slots"];
            for (var slotName in slots) {
                if (!slots.hasOwnProperty(slotName)) continue;
                var slotMap = slots[slotName];
                var slotIndex = skeletonData.findSlotIndex(slotName);
                for (timelineName in slotMap) {
                    if (!slotMap.hasOwnProperty(timelineName)) continue;
                    values = slotMap[timelineName];
                    if (timelineName == "color") {
                        timeline = new spine.ColorTimeline(values.length);
                        timeline.slotIndex = slotIndex;
                        frameIndex = 0;
                        for (i = 0, n = values.length; i < n; i++) {
                            valueMap = values[i];
                            var color = valueMap["color"];
                            var r = spine.SkeletonJson.toColor(color, 0);
                            var g = spine.SkeletonJson.toColor(color, 1);
                            var b = spine.SkeletonJson.toColor(color, 2);
                            var a = spine.SkeletonJson.toColor(color, 3);
                            timeline.setFrame(frameIndex, valueMap["time"], r, g, b, a);
                            spine.SkeletonJson.readCurve(timeline, frameIndex, valueMap);
                            frameIndex++;
                        }
                        timelines.push(timeline);
                        duration = Math.max(duration, timeline.frames[timeline.getFrameCount() * 5 - 5]);
                    } else if (timelineName == "attachment") {
                        timeline = new spine.AttachmentTimeline(values.length);
                        timeline.slotIndex = slotIndex;
                        frameIndex = 0;
                        for (i = 0, n = values.length; i < n; i++) {
                            valueMap = values[i];
                            timeline.setFrame(frameIndex++, valueMap["time"], valueMap["name"]);
                        }
                        timelines.push(timeline);
                        duration = Math.max(duration, timeline.frames[timeline.getFrameCount() - 1]);
                    } else throw "Invalid timeline type for a slot: " + timelineName + " (" + slotName + ")";
                }
            }
            skeletonData.animations.push(new spine.Animation(name, timelines, duration));
        }
    };
    spine.SkeletonJson.readCurve = function(timeline, frameIndex, valueMap) {
        var curve = valueMap["curve"];
        if (!curve) return;
        if (curve == "stepped") timeline.curves.setStepped(frameIndex); else if (curve instanceof Array) timeline.curves.setCurve(frameIndex, curve[0], curve[1], curve[2], curve[3]);
    };
    spine.SkeletonJson.toColor = function(hexString, colorIndex) {
        if (hexString.length != 8) throw "Color hexidecimal length must be 8, recieved: " + hexString;
        return parseInt(hexString.substr(colorIndex * 2, 2), 16) / 255;
    };
    spine.Atlas = function(atlasText, textureLoader) {
        this.textureLoader = textureLoader;
        this.pages = [];
        this.regions = [];
        var reader = new spine.AtlasReader(atlasText);
        var tuple = [];
        tuple.length = 4;
        var page = null;
        while (true) {
            var line = reader.readLine();
            if (line == null) break;
            line = reader.trim(line);
            if (!line.length) page = null; else if (!page) {
                page = new spine.AtlasPage();
                page.name = line;
                page.format = spine.Atlas.Format[reader.readValue()];
                reader.readTuple(tuple);
                page.minFilter = spine.Atlas.TextureFilter[tuple[0]];
                page.magFilter = spine.Atlas.TextureFilter[tuple[1]];
                var direction = reader.readValue();
                page.uWrap = spine.Atlas.TextureWrap.clampToEdge;
                page.vWrap = spine.Atlas.TextureWrap.clampToEdge;
                if (direction == "x") page.uWrap = spine.Atlas.TextureWrap.repeat; else if (direction == "y") page.vWrap = spine.Atlas.TextureWrap.repeat; else if (direction == "xy") page.uWrap = page.vWrap = spine.Atlas.TextureWrap.repeat;
                textureLoader.load(page, line);
                this.pages.push(page);
            } else {
                var region = new spine.AtlasRegion();
                region.name = line;
                region.page = page;
                region.rotate = reader.readValue() == "true";
                reader.readTuple(tuple);
                var x = parseInt(tuple[0], 10);
                var y = parseInt(tuple[1], 10);
                reader.readTuple(tuple);
                var width = parseInt(tuple[0], 10);
                var height = parseInt(tuple[1], 10);
                region.u = x / page.width;
                region.v = y / page.height;
                if (region.rotate) {
                    region.u2 = (x + height) / page.width;
                    region.v2 = (y + width) / page.height;
                } else {
                    region.u2 = (x + width) / page.width;
                    region.v2 = (y + height) / page.height;
                }
                region.x = x;
                region.y = y;
                region.width = Math.abs(width);
                region.height = Math.abs(height);
                if (reader.readTuple(tuple) == 4) {
                    region.splits = [ parseInt(tuple[0], 10), parseInt(tuple[1], 10), parseInt(tuple[2], 10), parseInt(tuple[3], 10) ];
                    if (reader.readTuple(tuple) == 4) {
                        region.pads = [ parseInt(tuple[0], 10), parseInt(tuple[1], 10), parseInt(tuple[2], 10), parseInt(tuple[3], 10) ];
                        reader.readTuple(tuple);
                    }
                }
                region.originalWidth = parseInt(tuple[0], 10);
                region.originalHeight = parseInt(tuple[1], 10);
                reader.readTuple(tuple);
                region.offsetX = parseInt(tuple[0], 10);
                region.offsetY = parseInt(tuple[1], 10);
                region.index = parseInt(reader.readValue(), 10);
                this.regions.push(region);
            }
        }
    };
    spine.Atlas.prototype = {
        findRegion: function(name) {
            var regions = this.regions;
            for (var i = 0, n = regions.length; i < n; i++) if (regions[i].name == name) return regions[i];
            return null;
        },
        dispose: function() {
            var pages = this.pages;
            for (var i = 0, n = pages.length; i < n; i++) this.textureLoader.unload(pages[i].rendererObject);
        },
        updateUVs: function(page) {
            var regions = this.regions;
            for (var i = 0, n = regions.length; i < n; i++) {
                var region = regions[i];
                if (region.page != page) continue;
                region.u = region.x / page.width;
                region.v = region.y / page.height;
                if (region.rotate) {
                    region.u2 = (region.x + region.height) / page.width;
                    region.v2 = (region.y + region.width) / page.height;
                } else {
                    region.u2 = (region.x + region.width) / page.width;
                    region.v2 = (region.y + region.height) / page.height;
                }
            }
        }
    };
    spine.Atlas.Format = {
        alpha: 0,
        intensity: 1,
        luminanceAlpha: 2,
        rgb565: 3,
        rgba4444: 4,
        rgb888: 5,
        rgba8888: 6
    };
    spine.Atlas.TextureFilter = {
        nearest: 0,
        linear: 1,
        mipMap: 2,
        mipMapNearestNearest: 3,
        mipMapLinearNearest: 4,
        mipMapNearestLinear: 5,
        mipMapLinearLinear: 6
    };
    spine.Atlas.TextureWrap = {
        mirroredRepeat: 0,
        clampToEdge: 1,
        repeat: 2
    };
    spine.AtlasPage = function() {};
    spine.AtlasPage.prototype = {
        name: null,
        format: null,
        minFilter: null,
        magFilter: null,
        uWrap: null,
        vWrap: null,
        rendererObject: null,
        width: 0,
        height: 0
    };
    spine.AtlasRegion = function() {};
    spine.AtlasRegion.prototype = {
        page: null,
        name: null,
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        u: 0,
        v: 0,
        u2: 0,
        v2: 0,
        offsetX: 0,
        offsetY: 0,
        originalWidth: 0,
        originalHeight: 0,
        index: 0,
        rotate: false,
        splits: null,
        pads: null
    };
    spine.AtlasReader = function(text) {
        this.lines = text.split(/\r\n|\r|\n/);
    };
    spine.AtlasReader.prototype = {
        index: 0,
        trim: function(value) {
            return value.replace(/^\s+|\s+$/g, "");
        },
        readLine: function() {
            if (this.index >= this.lines.length) return null;
            return this.lines[this.index++];
        },
        readValue: function() {
            var line = this.readLine();
            var colon = line.indexOf(":");
            if (colon == -1) throw "Invalid line: " + line;
            return this.trim(line.substring(colon + 1));
        },
        readTuple: function(tuple) {
            var line = this.readLine();
            var colon = line.indexOf(":");
            if (colon == -1) throw "Invalid line: " + line;
            var i = 0, lastMatch = colon + 1;
            for (;i < 3; i++) {
                var comma = line.indexOf(",", lastMatch);
                if (comma == -1) {
                    if (!i) throw "Invalid line: " + line;
                    break;
                }
                tuple[i] = this.trim(line.substr(lastMatch, comma - lastMatch));
                lastMatch = comma + 1;
            }
            tuple[i] = this.trim(line.substring(lastMatch));
            return i + 1;
        }
    };
    spine.AtlasAttachmentLoader = function(atlas) {
        this.atlas = atlas;
    };
    spine.AtlasAttachmentLoader.prototype = {
        newAttachment: function(skin, type, name) {
            switch (type) {
              case spine.AttachmentType.region:
                var region = this.atlas.findRegion(name);
                if (!region) throw "Region not found in atlas: " + name + " (" + type + ")";
                var attachment = new spine.RegionAttachment(name);
                attachment.rendererObject = region;
                attachment.setUVs(region.u, region.v, region.u2, region.v2, region.rotate);
                attachment.regionOffsetX = region.offsetX;
                attachment.regionOffsetY = region.offsetY;
                attachment.regionWidth = region.width;
                attachment.regionHeight = region.height;
                attachment.regionOriginalWidth = region.originalWidth;
                attachment.regionOriginalHeight = region.originalHeight;
                return attachment;
            }
            throw "Unknown attachment type: " + type;
        }
    };
    spine.Bone.yDown = true;
    PIXI.AnimCache = {};
    PIXI.Spine = function(url) {
        PIXI.DisplayObjectContainer.call(this);
        this.spineData = PIXI.AnimCache[url];
        if (!this.spineData) {
            throw new Error("Spine data must be preloaded using PIXI.SpineLoader or PIXI.AssetLoader: " + url);
        }
        this.skeleton = new spine.Skeleton(this.spineData);
        this.skeleton.updateWorldTransform();
        this.stateData = new spine.AnimationStateData(this.spineData);
        this.state = new spine.AnimationState(this.stateData);
        this.slotContainers = [];
        for (var i = 0, n = this.skeleton.drawOrder.length; i < n; i++) {
            var slot = this.skeleton.drawOrder[i];
            var attachment = slot.attachment;
            var slotContainer = new PIXI.DisplayObjectContainer();
            this.slotContainers.push(slotContainer);
            this.addChild(slotContainer);
            if (!(attachment instanceof spine.RegionAttachment)) {
                continue;
            }
            var spriteName = attachment.rendererObject.name;
            var sprite = this.createSprite(slot, attachment.rendererObject);
            slot.currentSprite = sprite;
            slot.currentSpriteName = spriteName;
            slotContainer.addChild(sprite);
        }
    };
    PIXI.Spine.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
    PIXI.Spine.prototype.constructor = PIXI.Spine;
    PIXI.Spine.prototype.updateTransform = function() {
        this.lastTime = this.lastTime || Date.now();
        var timeDelta = (Date.now() - this.lastTime) * .001;
        this.lastTime = Date.now();
        this.state.update(timeDelta);
        this.state.apply(this.skeleton);
        this.skeleton.updateWorldTransform();
        var drawOrder = this.skeleton.drawOrder;
        for (var i = 0, n = drawOrder.length; i < n; i++) {
            var slot = drawOrder[i];
            var attachment = slot.attachment;
            var slotContainer = this.slotContainers[i];
            if (!(attachment instanceof spine.RegionAttachment)) {
                slotContainer.visible = false;
                continue;
            }
            if (attachment.rendererObject) {
                if (!slot.currentSpriteName || slot.currentSpriteName != attachment.name) {
                    var spriteName = attachment.rendererObject.name;
                    if (slot.currentSprite !== undefined) {
                        slot.currentSprite.visible = false;
                    }
                    slot.sprites = slot.sprites || {};
                    if (slot.sprites[spriteName] !== undefined) {
                        slot.sprites[spriteName].visible = true;
                    } else {
                        var sprite = this.createSprite(slot, attachment.rendererObject);
                        slotContainer.addChild(sprite);
                    }
                    slot.currentSprite = slot.sprites[spriteName];
                    slot.currentSpriteName = spriteName;
                }
            }
            slotContainer.visible = true;
            var bone = slot.bone;
            slotContainer.position.x = bone.worldX + attachment.x * bone.m00 + attachment.y * bone.m01;
            slotContainer.position.y = bone.worldY + attachment.x * bone.m10 + attachment.y * bone.m11;
            slotContainer.scale.x = bone.worldScaleX;
            slotContainer.scale.y = bone.worldScaleY;
            slotContainer.rotation = -(slot.bone.worldRotation * Math.PI / 180);
            slotContainer.alpha = slot.a;
            slot.currentSprite.tint = PIXI.rgb2hex([ slot.r, slot.g, slot.b ]);
        }
        PIXI.DisplayObjectContainer.prototype.updateTransform.call(this);
    };
    PIXI.Spine.prototype.createSprite = function(slot, descriptor) {
        var name = PIXI.TextureCache[descriptor.name] ? descriptor.name : descriptor.name + ".png";
        var sprite = new PIXI.Sprite(PIXI.Texture.fromFrame(name));
        sprite.scale = descriptor.scale;
        sprite.rotation = descriptor.rotation;
        sprite.anchor.x = sprite.anchor.y = .5;
        slot.sprites = slot.sprites || {};
        slot.sprites[descriptor.name] = sprite;
        return sprite;
    };
    PIXI.BaseTextureCache = {};
    PIXI.BaseTextureCacheIdGenerator = 0;
    PIXI.BaseTexture = function(source, scaleMode) {
        this.resolution = 1;
        this.width = 100;
        this.height = 100;
        this.scaleMode = scaleMode || PIXI.scaleModes.DEFAULT;
        this.hasLoaded = false;
        this.source = source;
        this._UID = PIXI._UID++;
        this.premultipliedAlpha = true;
        this._glTextures = [];
        this._dirty = [ true, true, true, true ];
        if (!source) return;
        if ((this.source.complete || this.source.getContext) && this.source.width && this.source.height) {
            this.hasLoaded = true;
            this.width = this.source.naturalWidth || this.source.width;
            this.height = this.source.naturalHeight || this.source.height;
            this.dirty();
        } else {
            var scope = this;
            this.source.onload = function() {
                scope.hasLoaded = true;
                scope.width = scope.source.naturalWidth || scope.source.width;
                scope.height = scope.source.naturalHeight || scope.source.height;
                scope.dirty();
                scope.dispatchEvent({
                    type: "loaded",
                    content: scope
                });
            };
            this.source.onerror = function() {
                scope.dispatchEvent({
                    type: "error",
                    content: scope
                });
            };
        }
        this.imageUrl = null;
        this._powerOf2 = false;
    };
    PIXI.BaseTexture.prototype.constructor = PIXI.BaseTexture;
    PIXI.EventTarget.mixin(PIXI.BaseTexture.prototype);
    PIXI.BaseTexture.prototype.destroy = function() {
        if (this.imageUrl) {
            delete PIXI.BaseTextureCache[this.imageUrl];
            delete PIXI.TextureCache[this.imageUrl];
            this.imageUrl = null;
            if (!navigator.isCocoonJS) this.source.src = "";
        } else if (this.source && this.source._pixiId) {
            delete PIXI.BaseTextureCache[this.source._pixiId];
        }
        this.source = null;
        this.unloadFromGPU();
    };
    PIXI.BaseTexture.prototype.updateSourceImage = function(newSrc) {
        this.hasLoaded = false;
        this.source.src = null;
        this.source.src = newSrc;
    };
    PIXI.BaseTexture.prototype.dirty = function() {
        for (var i = 0; i < this._glTextures.length; i++) {
            this._dirty[i] = true;
        }
    };
    PIXI.BaseTexture.prototype.unloadFromGPU = function() {
        this.dirty();
        for (var i = this._glTextures.length - 1; i >= 0; i--) {
            var glTexture = this._glTextures[i];
            var gl = PIXI.glContexts[i];
            if (gl && glTexture) {
                gl.deleteTexture(glTexture);
            }
        }
        this._glTextures.length = 0;
        this.dirty();
    };
    PIXI.BaseTexture.fromImage = function(imageUrl, crossorigin, scaleMode) {
        var baseTexture = PIXI.BaseTextureCache[imageUrl];
        if (crossorigin === undefined && imageUrl.indexOf("data:") === -1) crossorigin = true;
        if (!baseTexture) {
            var image = new Image();
            if (crossorigin) {
                image.crossOrigin = "";
            }
            image.src = imageUrl;
            baseTexture = new PIXI.BaseTexture(image, scaleMode);
            baseTexture.imageUrl = imageUrl;
            PIXI.BaseTextureCache[imageUrl] = baseTexture;
            if (imageUrl.indexOf(PIXI.RETINA_PREFIX + ".") !== -1) {
                baseTexture.resolution = 2;
            }
        }
        return baseTexture;
    };
    PIXI.BaseTexture.fromCanvas = function(canvas, scaleMode) {
        if (!canvas._pixiId) {
            canvas._pixiId = "canvas_" + PIXI.TextureCacheIdGenerator++;
        }
        var baseTexture = PIXI.BaseTextureCache[canvas._pixiId];
        if (!baseTexture) {
            baseTexture = new PIXI.BaseTexture(canvas, scaleMode);
            PIXI.BaseTextureCache[canvas._pixiId] = baseTexture;
        }
        return baseTexture;
    };
    PIXI.TextureCache = {};
    PIXI.FrameCache = {};
    PIXI.TextureCacheIdGenerator = 0;
    PIXI.Texture = function(baseTexture, frame, crop, trim) {
        this.noFrame = false;
        if (!frame) {
            this.noFrame = true;
            frame = new PIXI.Rectangle(0, 0, 1, 1);
        }
        if (baseTexture instanceof PIXI.Texture) {
            baseTexture = baseTexture.baseTexture;
        }
        this.baseTexture = baseTexture;
        this.frame = frame;
        this.trim = trim;
        this.valid = false;
        this.requiresUpdate = false;
        this._uvs = null;
        this.width = 0;
        this.height = 0;
        this.crop = crop || new PIXI.Rectangle(0, 0, 1, 1);
        if (baseTexture.hasLoaded) {
            if (this.noFrame) frame = new PIXI.Rectangle(0, 0, baseTexture.width, baseTexture.height);
            this.setFrame(frame);
        } else {
            baseTexture.addEventListener("loaded", this.onBaseTextureLoaded.bind(this));
        }
    };
    PIXI.Texture.prototype.constructor = PIXI.Texture;
    PIXI.EventTarget.mixin(PIXI.Texture.prototype);
    PIXI.Texture.prototype.onBaseTextureLoaded = function() {
        var baseTexture = this.baseTexture;
        baseTexture.removeEventListener("loaded", this.onLoaded);
        if (this.noFrame) this.frame = new PIXI.Rectangle(0, 0, baseTexture.width, baseTexture.height);
        this.setFrame(this.frame);
        this.dispatchEvent({
            type: "update",
            content: this
        });
    };
    PIXI.Texture.prototype.destroy = function(destroyBase) {
        if (destroyBase) this.baseTexture.destroy();
        this.valid = false;
    };
    PIXI.Texture.prototype.setFrame = function(frame) {
        this.noFrame = false;
        this.frame = frame;
        this.width = frame.width;
        this.height = frame.height;
        this.crop.x = frame.x;
        this.crop.y = frame.y;
        this.crop.width = frame.width;
        this.crop.height = frame.height;
        if (!this.trim && (frame.x + frame.width > this.baseTexture.width || frame.y + frame.height > this.baseTexture.height)) {
            throw new Error("Texture Error: frame does not fit inside the base Texture dimensions " + this);
        }
        this.valid = frame && frame.width && frame.height && this.baseTexture.source && this.baseTexture.hasLoaded;
        if (this.trim) {
            this.width = this.trim.width;
            this.height = this.trim.height;
            this.frame.width = this.trim.width;
            this.frame.height = this.trim.height;
        }
        if (this.valid) this._updateUvs();
    };
    PIXI.Texture.prototype._updateUvs = function() {
        if (!this._uvs) this._uvs = new PIXI.TextureUvs();
        var frame = this.crop;
        var tw = this.baseTexture.width;
        var th = this.baseTexture.height;
        this._uvs.x0 = frame.x / tw;
        this._uvs.y0 = frame.y / th;
        this._uvs.x1 = (frame.x + frame.width) / tw;
        this._uvs.y1 = frame.y / th;
        this._uvs.x2 = (frame.x + frame.width) / tw;
        this._uvs.y2 = (frame.y + frame.height) / th;
        this._uvs.x3 = frame.x / tw;
        this._uvs.y3 = (frame.y + frame.height) / th;
    };
    PIXI.Texture.fromImage = function(imageUrl, crossorigin, scaleMode) {
        var texture = PIXI.TextureCache[imageUrl];
        if (!texture) {
            texture = new PIXI.Texture(PIXI.BaseTexture.fromImage(imageUrl, crossorigin, scaleMode));
            PIXI.TextureCache[imageUrl] = texture;
        }
        return texture;
    };
    PIXI.Texture.fromFrame = function(frameId) {
        var texture = PIXI.TextureCache[frameId];
        if (!texture) throw new Error('The frameId "' + frameId + '" does not exist in the texture cache ');
        return texture;
    };
    PIXI.Texture.fromCanvas = function(canvas, scaleMode) {
        var baseTexture = PIXI.BaseTexture.fromCanvas(canvas, scaleMode);
        return new PIXI.Texture(baseTexture);
    };
    PIXI.Texture.addTextureToCache = function(texture, id) {
        PIXI.TextureCache[id] = texture;
    };
    PIXI.Texture.removeTextureFromCache = function(id) {
        var texture = PIXI.TextureCache[id];
        delete PIXI.TextureCache[id];
        delete PIXI.BaseTextureCache[id];
        return texture;
    };
    PIXI.TextureUvs = function() {
        this.x0 = 0;
        this.y0 = 0;
        this.x1 = 0;
        this.y1 = 0;
        this.x2 = 0;
        this.y2 = 0;
        this.x3 = 0;
        this.y3 = 0;
    };
    PIXI.Texture.emptyTexture = new PIXI.Texture(new PIXI.BaseTexture());
    PIXI.RenderTexture = function(width, height, renderer, scaleMode, resolution) {
        this.width = width || 100;
        this.height = height || 100;
        this.resolution = resolution || 1;
        this.frame = new PIXI.Rectangle(0, 0, this.width * this.resolution, this.height * this.resolution);
        this.crop = new PIXI.Rectangle(0, 0, this.width * this.resolution, this.height * this.resolution);
        this.baseTexture = new PIXI.BaseTexture();
        this.baseTexture.width = this.width * this.resolution;
        this.baseTexture.height = this.height * this.resolution;
        this.baseTexture._glTextures = [];
        this.baseTexture.resolution = this.resolution;
        this.baseTexture.scaleMode = scaleMode || PIXI.scaleModes.DEFAULT;
        this.baseTexture.hasLoaded = true;
        PIXI.Texture.call(this, this.baseTexture, new PIXI.Rectangle(0, 0, this.width, this.height));
        this.renderer = renderer || PIXI.defaultRenderer;
        if (this.renderer.type === PIXI.WEBGL_RENDERER) {
            var gl = this.renderer.gl;
            this.baseTexture._dirty[gl.id] = false;
            this.textureBuffer = new PIXI.FilterTexture(gl, this.width * this.resolution, this.height * this.resolution, this.baseTexture.scaleMode);
            this.baseTexture._glTextures[gl.id] = this.textureBuffer.texture;
            this.render = this.renderWebGL;
            this.projection = new PIXI.Point(this.width * .5, -this.height * .5);
        } else {
            this.render = this.renderCanvas;
            this.textureBuffer = new PIXI.CanvasBuffer(this.width * this.resolution, this.height * this.resolution);
            this.baseTexture.source = this.textureBuffer.canvas;
        }
        this.valid = true;
        this._updateUvs();
    };
    PIXI.RenderTexture.prototype = Object.create(PIXI.Texture.prototype);
    PIXI.RenderTexture.prototype.constructor = PIXI.RenderTexture;
    PIXI.RenderTexture.prototype.resize = function(width, height, updateBase) {
        if (width === this.width && height === this.height) return;
        this.valid = width > 0 && height > 0;
        this.width = this.frame.width = this.crop.width = width;
        this.height = this.frame.height = this.crop.height = height;
        if (updateBase) {
            this.baseTexture.width = this.width;
            this.baseTexture.height = this.height;
        }
        if (this.renderer.type === PIXI.WEBGL_RENDERER) {
            this.projection.x = this.width / 2;
            this.projection.y = -this.height / 2;
        }
        if (!this.valid) return;
        this.textureBuffer.resize(this.width * this.resolution, this.height * this.resolution);
    };
    PIXI.RenderTexture.prototype.clear = function() {
        if (!this.valid) return;
        if (this.renderer.type === PIXI.WEBGL_RENDERER) {
            this.renderer.gl.bindFramebuffer(this.renderer.gl.FRAMEBUFFER, this.textureBuffer.frameBuffer);
        }
        this.textureBuffer.clear();
    };
    PIXI.RenderTexture.prototype.renderWebGL = function(displayObject, matrix, clear) {
        if (!this.valid) return;
        var wt = displayObject.worldTransform;
        wt.identity();
        wt.translate(0, this.projection.y * 2);
        if (matrix) wt.append(matrix);
        wt.scale(1, -1);
        displayObject.worldAlpha = 1;
        var children = displayObject.children;
        for (var i = 0, j = children.length; i < j; i++) {
            children[i].updateTransform();
        }
        var gl = this.renderer.gl;
        gl.viewport(0, 0, this.width * this.resolution, this.height * this.resolution);
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.textureBuffer.frameBuffer);
        if (clear) this.textureBuffer.clear();
        this.renderer.spriteBatch.dirty = true;
        this.renderer.renderDisplayObject(displayObject, this.projection, this.textureBuffer.frameBuffer);
        this.renderer.spriteBatch.dirty = true;
    };
    PIXI.RenderTexture.prototype.renderCanvas = function(displayObject, matrix, clear) {
        if (!this.valid) return;
        var wt = displayObject.worldTransform;
        wt.identity();
        if (matrix) wt.append(matrix);
        displayObject.worldAlpha = 1;
        var children = displayObject.children;
        for (var i = 0, j = children.length; i < j; i++) {
            children[i].updateTransform();
        }
        if (clear) this.textureBuffer.clear();
        var context = this.textureBuffer.context;
        var realResolution = this.renderer.resolution;
        this.renderer.resolution = this.resolution;
        this.renderer.renderDisplayObject(displayObject, context);
        this.renderer.resolution = realResolution;
    };
    PIXI.RenderTexture.prototype.getImage = function() {
        var image = new Image();
        image.src = this.getBase64();
        return image;
    };
    PIXI.RenderTexture.prototype.getBase64 = function() {
        return this.getCanvas().toDataURL();
    };
    PIXI.RenderTexture.prototype.getCanvas = function() {
        if (this.renderer.type === PIXI.WEBGL_RENDERER) {
            var gl = this.renderer.gl;
            var width = this.textureBuffer.width;
            var height = this.textureBuffer.height;
            var webGLPixels = new Uint8Array(4 * width * height);
            gl.bindFramebuffer(gl.FRAMEBUFFER, this.textureBuffer.frameBuffer);
            gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, webGLPixels);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            var tempCanvas = new PIXI.CanvasBuffer(width, height);
            var canvasData = tempCanvas.context.getImageData(0, 0, width, height);
            canvasData.data.set(webGLPixels);
            tempCanvas.context.putImageData(canvasData, 0, 0);
            return tempCanvas.canvas;
        } else {
            return this.textureBuffer.canvas;
        }
    };
    PIXI.RenderTexture.tempMatrix = new PIXI.Matrix();
    PIXI.VideoTexture = function(source, scaleMode) {
        if (!source) {
            throw new Error("No video source element specified.");
        }
        if ((source.readyState === source.HAVE_ENOUGH_DATA || source.readyState === source.HAVE_FUTURE_DATA) && source.width && source.height) {
            source.complete = true;
        }
        PIXI.BaseTexture.call(this, source, scaleMode);
        this.autoUpdate = false;
        this.updateBound = this._onUpdate.bind(this);
        if (!source.complete) {
            this._onCanPlay = this.onCanPlay.bind(this);
            source.addEventListener("canplay", this._onCanPlay);
            source.addEventListener("canplaythrough", this._onCanPlay);
            source.addEventListener("play", this.onPlayStart.bind(this));
            source.addEventListener("pause", this.onPlayStop.bind(this));
        }
    };
    PIXI.VideoTexture.prototype = Object.create(PIXI.BaseTexture.prototype);
    PIXI.VideoTexture.constructor = PIXI.VideoTexture;
    PIXI.VideoTexture.prototype._onUpdate = function() {
        if (this.autoUpdate) {
            window.requestAnimationFrame(this.updateBound);
            this.dirty();
        }
    };
    PIXI.VideoTexture.prototype.onPlayStart = function() {
        if (!this.autoUpdate) {
            window.requestAnimationFrame(this.updateBound);
            this.autoUpdate = true;
        }
    };
    PIXI.VideoTexture.prototype.onPlayStop = function() {
        this.autoUpdate = false;
    };
    PIXI.VideoTexture.prototype.onCanPlay = function() {
        if (event.type === "canplaythrough") {
            this.hasLoaded = true;
            if (this.source) {
                this.source.removeEventListener("canplay", this._onCanPlay);
                this.source.removeEventListener("canplaythrough", this._onCanPlay);
                this.width = this.source.videoWidth;
                this.height = this.source.videoHeight;
                if (!this.__loaded) {
                    this.__loaded = true;
                    this.dispatchEvent({
                        type: "loaded",
                        content: this
                    });
                }
            }
        }
    };
    PIXI.VideoTexture.baseTextureFromVideo = function(video, scaleMode) {
        if (!video._pixiId) {
            video._pixiId = "video_" + PIXI.TextureCacheIdGenerator++;
        }
        var baseTexture = PIXI.BaseTextureCache[video._pixiId];
        if (!baseTexture) {
            baseTexture = new PIXI.VideoTexture(video, scaleMode);
            PIXI.BaseTextureCache[video._pixiId] = baseTexture;
        }
        return baseTexture;
    };
    PIXI.VideoTexture.prototype.destroy = function() {
        if (this.source && this.source._pixiId) {
            PIXI.BaseTextureCache[this.source._pixiId] = null;
            delete PIXI.BaseTextureCache[this.source._pixiId];
            this.source._pixiId = null;
            delete this.source._pixiId;
        }
        PIXI.BaseTexture.prototype.destroy.call(this);
    };
    PIXI.VideoTexture.textureFromVideo = function(video, scaleMode) {
        var baseTexture = PIXI.VideoTexture.baseTextureFromVideo(video, scaleMode);
        return new PIXI.Texture(baseTexture);
    };
    PIXI.VideoTexture.fromUrl = function(videoSrc, scaleMode) {
        var video = document.createElement("video");
        video.src = videoSrc;
        video.autoPlay = true;
        video.play();
        return PIXI.VideoTexture.textureFromVideo(video, scaleMode);
    };
    PIXI.AssetLoader = function(assetURLs, crossorigin) {
        this.assetURLs = assetURLs;
        this.crossorigin = crossorigin;
        this.loadersByType = {
            jpg: PIXI.ImageLoader,
            jpeg: PIXI.ImageLoader,
            png: PIXI.ImageLoader,
            gif: PIXI.ImageLoader,
            webp: PIXI.ImageLoader,
            json: PIXI.JsonLoader,
            atlas: PIXI.AtlasLoader,
            anim: PIXI.SpineLoader,
            xml: PIXI.BitmapFontLoader,
            fnt: PIXI.BitmapFontLoader
        };
    };
    PIXI.EventTarget.mixin(PIXI.AssetLoader.prototype);
    PIXI.AssetLoader.prototype.constructor = PIXI.AssetLoader;
    PIXI.AssetLoader.prototype._getDataType = function(str) {
        var test = "data:";
        var start = str.slice(0, test.length).toLowerCase();
        if (start === test) {
            var data = str.slice(test.length);
            var sepIdx = data.indexOf(",");
            if (sepIdx === -1) return null;
            var info = data.slice(0, sepIdx).split(";")[0];
            if (!info || info.toLowerCase() === "text/plain") return "txt";
            return info.split("/").pop().toLowerCase();
        }
        return null;
    };
    PIXI.AssetLoader.prototype.load = function() {
        var scope = this;
        function onLoad(evt) {
            scope.onAssetLoaded(evt.data.content);
        }
        this.loadCount = this.assetURLs.length;
        for (var i = 0; i < this.assetURLs.length; i++) {
            var fileName = this.assetURLs[i];
            var fileType = this._getDataType(fileName);
            if (!fileType) fileType = fileName.split("?").shift().split(".").pop().toLowerCase();
            var Constructor = this.loadersByType[fileType];
            if (!Constructor) throw new Error(fileType + " is an unsupported file type");
            var loader = new Constructor(fileName, this.crossorigin);
            loader.on("loaded", onLoad);
            loader.load();
        }
    };
    PIXI.AssetLoader.prototype.onAssetLoaded = function(loader) {
        this.loadCount--;
        this.emit("onProgress", {
            content: this,
            loader: loader
        });
        if (this.onProgress) this.onProgress(loader);
        if (!this.loadCount) {
            this.emit("onComplete", {
                content: this
            });
            if (this.onComplete) this.onComplete();
        }
    };
    PIXI.JsonLoader = function(url, crossorigin) {
        this.url = url;
        this.crossorigin = crossorigin;
        this.baseUrl = url.replace(/[^\/]*$/, "");
        this.loaded = false;
    };
    PIXI.JsonLoader.prototype.constructor = PIXI.JsonLoader;
    PIXI.EventTarget.mixin(PIXI.JsonLoader.prototype);
    PIXI.JsonLoader.prototype.load = function() {
        if (window.XDomainRequest && this.crossorigin) {
            this.ajaxRequest = new window.XDomainRequest();
            this.ajaxRequest.timeout = 3e3;
            this.ajaxRequest.onerror = this.onError.bind(this);
            this.ajaxRequest.ontimeout = this.onError.bind(this);
            this.ajaxRequest.onprogress = function() {};
        } else if (window.XMLHttpRequest) {
            this.ajaxRequest = new window.XMLHttpRequest();
        } else {
            this.ajaxRequest = new window.ActiveXObject("Microsoft.XMLHTTP");
        }
        this.ajaxRequest.onload = this.onJSONLoaded.bind(this);
        this.ajaxRequest.open("GET", this.url, true);
        this.ajaxRequest.send();
    };
    PIXI.JsonLoader.prototype.onJSONLoaded = function() {
        if (!this.ajaxRequest.responseText) {
            this.onError();
            return;
        }
        this.json = JSON.parse(this.ajaxRequest.responseText);
        if (this.json.frames) {
            var textureUrl = this.baseUrl + this.json.meta.image;
            var image = new PIXI.ImageLoader(textureUrl, this.crossorigin);
            var frameData = this.json.frames;
            this.texture = image.texture.baseTexture;
            image.addEventListener("loaded", this.onLoaded.bind(this));
            for (var i in frameData) {
                var rect = frameData[i].frame;
                if (rect) {
                    var textureSize = new PIXI.Rectangle(rect.x, rect.y, rect.w, rect.h);
                    var crop = textureSize.clone();
                    var trim = null;
                    if (frameData[i].trimmed) {
                        var actualSize = frameData[i].sourceSize;
                        var realSize = frameData[i].spriteSourceSize;
                        trim = new PIXI.Rectangle(realSize.x, realSize.y, actualSize.w, actualSize.h);
                    }
                    PIXI.TextureCache[i] = new PIXI.Texture(this.texture, textureSize, crop, trim);
                }
            }
            image.load();
        } else if (this.json.bones) {
            var spineJsonParser = new spine.SkeletonJson();
            var skeletonData = spineJsonParser.readSkeletonData(this.json);
            PIXI.AnimCache[this.url] = skeletonData;
            this.onLoaded();
        } else {
            this.onLoaded();
        }
    };
    PIXI.JsonLoader.prototype.onLoaded = function() {
        this.loaded = true;
        this.dispatchEvent({
            type: "loaded",
            content: this
        });
    };
    PIXI.JsonLoader.prototype.onError = function() {
        this.dispatchEvent({
            type: "error",
            content: this
        });
    };
    PIXI.AtlasLoader = function(url, crossorigin) {
        this.url = url;
        this.baseUrl = url.replace(/[^\/]*$/, "");
        this.crossorigin = crossorigin;
        this.loaded = false;
    };
    PIXI.AtlasLoader.constructor = PIXI.AtlasLoader;
    PIXI.EventTarget.mixin(PIXI.AtlasLoader.prototype);
    PIXI.AtlasLoader.prototype.load = function() {
        this.ajaxRequest = new PIXI.AjaxRequest();
        this.ajaxRequest.onreadystatechange = this.onAtlasLoaded.bind(this);
        this.ajaxRequest.open("GET", this.url, true);
        if (this.ajaxRequest.overrideMimeType) this.ajaxRequest.overrideMimeType("application/json");
        this.ajaxRequest.send(null);
    };
    PIXI.AtlasLoader.prototype.onAtlasLoaded = function() {
        if (this.ajaxRequest.readyState === 4) {
            if (this.ajaxRequest.status === 200 || window.location.href.indexOf("http") === -1) {
                this.atlas = {
                    meta: {
                        image: []
                    },
                    frames: []
                };
                var result = this.ajaxRequest.responseText.split(/\r?\n/);
                var lineCount = -3;
                var currentImageId = 0;
                var currentFrame = null;
                var nameInNextLine = false;
                var i = 0, j = 0, selfOnLoaded = this.onLoaded.bind(this);
                for (i = 0; i < result.length; i++) {
                    result[i] = result[i].replace(/^\s+|\s+$/g, "");
                    if (result[i] === "") {
                        nameInNextLine = i + 1;
                    }
                    if (result[i].length > 0) {
                        if (nameInNextLine === i) {
                            this.atlas.meta.image.push(result[i]);
                            currentImageId = this.atlas.meta.image.length - 1;
                            this.atlas.frames.push({});
                            lineCount = -3;
                        } else if (lineCount > 0) {
                            if (lineCount % 7 === 1) {
                                if (currentFrame != null) {
                                    this.atlas.frames[currentImageId][currentFrame.name] = currentFrame;
                                }
                                currentFrame = {
                                    name: result[i],
                                    frame: {}
                                };
                            } else {
                                var text = result[i].split(" ");
                                if (lineCount % 7 === 3) {
                                    currentFrame.frame.x = Number(text[1].replace(",", ""));
                                    currentFrame.frame.y = Number(text[2]);
                                } else if (lineCount % 7 === 4) {
                                    currentFrame.frame.w = Number(text[1].replace(",", ""));
                                    currentFrame.frame.h = Number(text[2]);
                                } else if (lineCount % 7 === 5) {
                                    var realSize = {
                                        x: 0,
                                        y: 0,
                                        w: Number(text[1].replace(",", "")),
                                        h: Number(text[2])
                                    };
                                    if (realSize.w > currentFrame.frame.w || realSize.h > currentFrame.frame.h) {
                                        currentFrame.trimmed = true;
                                        currentFrame.realSize = realSize;
                                    } else {
                                        currentFrame.trimmed = false;
                                    }
                                }
                            }
                        }
                        lineCount++;
                    }
                }
                if (currentFrame != null) {
                    this.atlas.frames[currentImageId][currentFrame.name] = currentFrame;
                }
                if (this.atlas.meta.image.length > 0) {
                    this.images = [];
                    for (j = 0; j < this.atlas.meta.image.length; j++) {
                        var textureUrl = this.baseUrl + this.atlas.meta.image[j];
                        var frameData = this.atlas.frames[j];
                        this.images.push(new PIXI.ImageLoader(textureUrl, this.crossorigin));
                        for (i in frameData) {
                            var rect = frameData[i].frame;
                            if (rect) {
                                PIXI.TextureCache[i] = new PIXI.Texture(this.images[j].texture.baseTexture, {
                                    x: rect.x,
                                    y: rect.y,
                                    width: rect.w,
                                    height: rect.h
                                });
                                if (frameData[i].trimmed) {
                                    PIXI.TextureCache[i].realSize = frameData[i].realSize;
                                    PIXI.TextureCache[i].trim.x = 0;
                                    PIXI.TextureCache[i].trim.y = 0;
                                }
                            }
                        }
                    }
                    this.currentImageId = 0;
                    for (j = 0; j < this.images.length; j++) {
                        this.images[j].on("loaded", selfOnLoaded);
                    }
                    this.images[this.currentImageId].load();
                } else {
                    this.onLoaded();
                }
            } else {
                this.onError();
            }
        }
    };
    PIXI.AtlasLoader.prototype.onLoaded = function() {
        if (this.images.length - 1 > this.currentImageId) {
            this.currentImageId++;
            this.images[this.currentImageId].load();
        } else {
            this.loaded = true;
            this.emit("loaded", {
                content: this
            });
        }
    };
    PIXI.AtlasLoader.prototype.onError = function() {
        this.emit("error", {
            content: this
        });
    };
    PIXI.SpriteSheetLoader = function(url, crossorigin) {
        this.url = url;
        this.crossorigin = crossorigin;
        this.baseUrl = url.replace(/[^\/]*$/, "");
        this.texture = null;
        this.frames = {};
    };
    PIXI.SpriteSheetLoader.prototype.constructor = PIXI.SpriteSheetLoader;
    PIXI.EventTarget.mixin(PIXI.SpriteSheetLoader.prototype);
    PIXI.SpriteSheetLoader.prototype.load = function() {
        var scope = this;
        var jsonLoader = new PIXI.JsonLoader(this.url, this.crossorigin);
        jsonLoader.on("loaded", function(event) {
            scope.json = event.data.content.json;
            scope.onLoaded();
        });
        jsonLoader.load();
    };
    PIXI.SpriteSheetLoader.prototype.onLoaded = function() {
        this.emit("loaded", {
            content: this
        });
    };
    PIXI.ImageLoader = function(url, crossorigin) {
        this.texture = PIXI.Texture.fromImage(url, crossorigin);
        this.frames = [];
    };
    PIXI.ImageLoader.prototype.constructor = PIXI.ImageLoader;
    PIXI.EventTarget.mixin(PIXI.ImageLoader.prototype);
    PIXI.ImageLoader.prototype.load = function() {
        if (!this.texture.baseTexture.hasLoaded) {
            this.texture.baseTexture.on("loaded", this.onLoaded.bind(this));
        } else {
            this.onLoaded();
        }
    };
    PIXI.ImageLoader.prototype.onLoaded = function() {
        this.emit("loaded", {
            content: this
        });
    };
    PIXI.ImageLoader.prototype.loadFramedSpriteSheet = function(frameWidth, frameHeight, textureName) {
        this.frames = [];
        var cols = Math.floor(this.texture.width / frameWidth);
        var rows = Math.floor(this.texture.height / frameHeight);
        var i = 0;
        for (var y = 0; y < rows; y++) {
            for (var x = 0; x < cols; x++, i++) {
                var texture = new PIXI.Texture(this.texture.baseTexture, {
                    x: x * frameWidth,
                    y: y * frameHeight,
                    width: frameWidth,
                    height: frameHeight
                });
                this.frames.push(texture);
                if (textureName) PIXI.TextureCache[textureName + "-" + i] = texture;
            }
        }
        this.load();
    };
    PIXI.BitmapFontLoader = function(url, crossorigin) {
        this.url = url;
        this.crossorigin = crossorigin;
        this.baseUrl = url.replace(/[^\/]*$/, "");
        this.texture = null;
    };
    PIXI.BitmapFontLoader.prototype.constructor = PIXI.BitmapFontLoader;
    PIXI.EventTarget.mixin(PIXI.BitmapFontLoader.prototype);
    PIXI.BitmapFontLoader.prototype.load = function() {
        this.ajaxRequest = new PIXI.AjaxRequest();
        this.ajaxRequest.onreadystatechange = this.onXMLLoaded.bind(this);
        this.ajaxRequest.open("GET", this.url, true);
        if (this.ajaxRequest.overrideMimeType) this.ajaxRequest.overrideMimeType("application/xml");
        this.ajaxRequest.send(null);
    };
    PIXI.BitmapFontLoader.prototype.onXMLLoaded = function() {
        if (this.ajaxRequest.readyState === 4) {
            if (this.ajaxRequest.status === 200 || window.location.protocol.indexOf("http") === -1) {
                var responseXML = this.ajaxRequest.responseXML;
                if (!responseXML || /MSIE 9/i.test(navigator.userAgent) || navigator.isCocoonJS) {
                    if (typeof window.DOMParser === "function") {
                        var domparser = new DOMParser();
                        responseXML = domparser.parseFromString(this.ajaxRequest.responseText, "text/xml");
                    } else {
                        var div = document.createElement("div");
                        div.innerHTML = this.ajaxRequest.responseText;
                        responseXML = div;
                    }
                }
                if (!responseXML.getElementsByTagName) {
                    responseXML = {};
                    responseXML.getElementsByTagName = function(name) {
                        var node = [], tagRegex = new RegExp("<" + name + "(.*)/>", "g"), tagArray = this.match(tagRegex);
                        tagArray.forEach(function(tag) {
                            var propertyString = tag.replace("<" + name, "").replace(/'/g, "").replace(" ", "").replace("/>", ""), propertyListArray = propertyString.split(" "), propertyArray = {};
                            propertyListArray.forEach(function(property) {
                                var split = property.split("=");
                                propertyArray[split[0]] = split[1];
                            });
                            node.push({
                                getAttribute: function(name) {
                                    return propertyArray[name].replace('"', "");
                                }
                            });
                        });
                        return node;
                    }.bind(this.ajaxRequest.responseText);
                }
                var textureUrl = this.baseUrl + responseXML.getElementsByTagName("page")[0].getAttribute("file");
                var image = new PIXI.ImageLoader(textureUrl, this.crossorigin);
                this.texture = image.texture.baseTexture;
                var data = {};
                var info = responseXML.getElementsByTagName("info")[0];
                var common = responseXML.getElementsByTagName("common")[0];
                data.font = info.getAttribute("face");
                data.size = parseInt(info.getAttribute("size"), 10);
                data.lineHeight = parseInt(common.getAttribute("lineHeight"), 10);
                data.chars = {};
                var letters = responseXML.getElementsByTagName("char");
                for (var i = 0; i < letters.length; i++) {
                    var charCode = parseInt(letters[i].getAttribute("id"), 10);
                    var textureRect = new PIXI.Rectangle(parseInt(letters[i].getAttribute("x"), 10), parseInt(letters[i].getAttribute("y"), 10), parseInt(letters[i].getAttribute("width"), 10), parseInt(letters[i].getAttribute("height"), 10));
                    data.chars[charCode] = {
                        xOffset: parseInt(letters[i].getAttribute("xoffset"), 10),
                        yOffset: parseInt(letters[i].getAttribute("yoffset"), 10),
                        xAdvance: parseInt(letters[i].getAttribute("xadvance"), 10),
                        kerning: {},
                        texture: PIXI.TextureCache[charCode] = new PIXI.Texture(this.texture, textureRect)
                    };
                }
                var kernings = responseXML.getElementsByTagName("kerning");
                for (i = 0; i < kernings.length; i++) {
                    var first = parseInt(kernings[i].getAttribute("first"), 10);
                    var second = parseInt(kernings[i].getAttribute("second"), 10);
                    var amount = parseInt(kernings[i].getAttribute("amount"), 10);
                    data.chars[second].kerning[first] = amount;
                }
                PIXI.BitmapText.fonts[data.font] = data;
                image.addEventListener("loaded", this.onLoaded.bind(this));
                image.load();
            }
        }
    };
    PIXI.BitmapFontLoader.prototype.onLoaded = function() {
        this.emit("loaded", {
            content: this
        });
    };
    PIXI.SpineLoader = function(url, crossorigin) {
        this.url = url;
        this.crossorigin = crossorigin;
        this.loaded = false;
    };
    PIXI.SpineLoader.prototype.constructor = PIXI.SpineLoader;
    PIXI.EventTarget.mixin(PIXI.SpineLoader.prototype);
    PIXI.SpineLoader.prototype.load = function() {
        var scope = this;
        var jsonLoader = new PIXI.JsonLoader(this.url, this.crossorigin);
        jsonLoader.on("loaded", function(event) {
            scope.json = event.data.content.json;
            scope.onLoaded();
        });
        jsonLoader.load();
    };
    PIXI.SpineLoader.prototype.onLoaded = function() {
        this.loaded = true;
        this.emit("loaded", {
            content: this
        });
    };
    PIXI.AbstractFilter = function(fragmentSrc, uniforms) {
        this.passes = [ this ];
        this.shaders = [];
        this.dirty = true;
        this.padding = 0;
        this.uniforms = uniforms || {};
        this.fragmentSrc = fragmentSrc || [];
    };
    PIXI.AbstractFilter.prototype.constructor = PIXI.AbstractFilter;
    PIXI.AbstractFilter.prototype.syncUniforms = function() {
        for (var i = 0, j = this.shaders.length; i < j; i++) {
            this.shaders[i].dirty = true;
        }
    };
    PIXI.AlphaMaskFilter = function(texture) {
        PIXI.AbstractFilter.call(this);
        this.passes = [ this ];
        texture.baseTexture._powerOf2 = true;
        this.uniforms = {
            mask: {
                type: "sampler2D",
                value: texture
            },
            mapDimensions: {
                type: "2f",
                value: {
                    x: 1,
                    y: 5112
                }
            },
            dimensions: {
                type: "4fv",
                value: [ 0, 0, 0, 0 ]
            }
        };
        if (texture.baseTexture.hasLoaded) {
            this.uniforms.mask.value.x = texture.width;
            this.uniforms.mask.value.y = texture.height;
        } else {
            this.boundLoadedFunction = this.onTextureLoaded.bind(this);
            texture.baseTexture.on("loaded", this.boundLoadedFunction);
        }
        this.fragmentSrc = [ "precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform sampler2D mask;", "uniform sampler2D uSampler;", "uniform vec2 offset;", "uniform vec4 dimensions;", "uniform vec2 mapDimensions;", "void main(void) {", "   vec2 mapCords = vTextureCoord.xy;", "   mapCords += (dimensions.zw + offset)/ dimensions.xy ;", "   mapCords.y *= -1.0;", "   mapCords.y += 1.0;", "   mapCords *= dimensions.xy / mapDimensions;", "   vec4 original =  texture2D(uSampler, vTextureCoord);", "   float maskAlpha =  texture2D(mask, mapCords).r;", "   original *= maskAlpha;", "   gl_FragColor =  original;", "}" ];
    };
    PIXI.AlphaMaskFilter.prototype = Object.create(PIXI.AbstractFilter.prototype);
    PIXI.AlphaMaskFilter.prototype.constructor = PIXI.AlphaMaskFilter;
    PIXI.AlphaMaskFilter.prototype.onTextureLoaded = function() {
        this.uniforms.mapDimensions.value.x = this.uniforms.mask.value.width;
        this.uniforms.mapDimensions.value.y = this.uniforms.mask.value.height;
        this.uniforms.mask.value.baseTexture.off("loaded", this.boundLoadedFunction);
    };
    Object.defineProperty(PIXI.AlphaMaskFilter.prototype, "map", {
        get: function() {
            return this.uniforms.mask.value;
        },
        set: function(value) {
            this.uniforms.mask.value = value;
        }
    });
    PIXI.ColorMatrixFilter = function() {
        PIXI.AbstractFilter.call(this);
        this.passes = [ this ];
        this.uniforms = {
            matrix: {
                type: "mat4",
                value: [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ]
            }
        };
        this.fragmentSrc = [ "precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform float invert;", "uniform mat4 matrix;", "uniform sampler2D uSampler;", "void main(void) {", "   gl_FragColor = texture2D(uSampler, vTextureCoord) * matrix;", "}" ];
    };
    PIXI.ColorMatrixFilter.prototype = Object.create(PIXI.AbstractFilter.prototype);
    PIXI.ColorMatrixFilter.prototype.constructor = PIXI.ColorMatrixFilter;
    Object.defineProperty(PIXI.ColorMatrixFilter.prototype, "matrix", {
        get: function() {
            return this.uniforms.matrix.value;
        },
        set: function(value) {
            this.uniforms.matrix.value = value;
        }
    });
    PIXI.GrayFilter = function() {
        PIXI.AbstractFilter.call(this);
        this.passes = [ this ];
        this.uniforms = {
            gray: {
                type: "1f",
                value: 1
            }
        };
        this.fragmentSrc = [ "precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform sampler2D uSampler;", "uniform float gray;", "void main(void) {", "   gl_FragColor = texture2D(uSampler, vTextureCoord);", "   gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.2126*gl_FragColor.r + 0.7152*gl_FragColor.g + 0.0722*gl_FragColor.b), gray);", "}" ];
    };
    PIXI.GrayFilter.prototype = Object.create(PIXI.AbstractFilter.prototype);
    PIXI.GrayFilter.prototype.constructor = PIXI.GrayFilter;
    Object.defineProperty(PIXI.GrayFilter.prototype, "gray", {
        get: function() {
            return this.uniforms.gray.value;
        },
        set: function(value) {
            this.uniforms.gray.value = value;
        }
    });
    PIXI.DisplacementFilter = function(texture) {
        PIXI.AbstractFilter.call(this);
        this.passes = [ this ];
        texture.baseTexture._powerOf2 = true;
        this.uniforms = {
            displacementMap: {
                type: "sampler2D",
                value: texture
            },
            scale: {
                type: "2f",
                value: {
                    x: 30,
                    y: 30
                }
            },
            offset: {
                type: "2f",
                value: {
                    x: 0,
                    y: 0
                }
            },
            mapDimensions: {
                type: "2f",
                value: {
                    x: 1,
                    y: 5112
                }
            },
            dimensions: {
                type: "4fv",
                value: [ 0, 0, 0, 0 ]
            }
        };
        if (texture.baseTexture.hasLoaded) {
            this.uniforms.mapDimensions.value.x = texture.width;
            this.uniforms.mapDimensions.value.y = texture.height;
        } else {
            this.boundLoadedFunction = this.onTextureLoaded.bind(this);
            texture.baseTexture.on("loaded", this.boundLoadedFunction);
        }
        this.fragmentSrc = [ "precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform sampler2D displacementMap;", "uniform sampler2D uSampler;", "uniform vec2 scale;", "uniform vec2 offset;", "uniform vec4 dimensions;", "uniform vec2 mapDimensions;", "void main(void) {", "   vec2 mapCords = vTextureCoord.xy;", "   mapCords += (dimensions.zw + offset)/ dimensions.xy ;", "   mapCords.y *= -1.0;", "   mapCords.y += 1.0;", "   vec2 matSample = texture2D(displacementMap, mapCords).xy;", "   matSample -= 0.5;", "   matSample *= scale;", "   matSample /= mapDimensions;", "   gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x + matSample.x, vTextureCoord.y + matSample.y));", "   gl_FragColor.rgb = mix( gl_FragColor.rgb, gl_FragColor.rgb, 1.0);", "   vec2 cord = vTextureCoord;", "}" ];
    };
    PIXI.DisplacementFilter.prototype = Object.create(PIXI.AbstractFilter.prototype);
    PIXI.DisplacementFilter.prototype.constructor = PIXI.DisplacementFilter;
    PIXI.DisplacementFilter.prototype.onTextureLoaded = function() {
        this.uniforms.mapDimensions.value.x = this.uniforms.displacementMap.value.width;
        this.uniforms.mapDimensions.value.y = this.uniforms.displacementMap.value.height;
        this.uniforms.displacementMap.value.baseTexture.off("loaded", this.boundLoadedFunction);
    };
    Object.defineProperty(PIXI.DisplacementFilter.prototype, "map", {
        get: function() {
            return this.uniforms.displacementMap.value;
        },
        set: function(value) {
            this.uniforms.displacementMap.value = value;
        }
    });
    Object.defineProperty(PIXI.DisplacementFilter.prototype, "scale", {
        get: function() {
            return this.uniforms.scale.value;
        },
        set: function(value) {
            this.uniforms.scale.value = value;
        }
    });
    Object.defineProperty(PIXI.DisplacementFilter.prototype, "offset", {
        get: function() {
            return this.uniforms.offset.value;
        },
        set: function(value) {
            this.uniforms.offset.value = value;
        }
    });
    PIXI.PixelateFilter = function() {
        PIXI.AbstractFilter.call(this);
        this.passes = [ this ];
        this.uniforms = {
            invert: {
                type: "1f",
                value: 0
            },
            dimensions: {
                type: "4fv",
                value: new PIXI.Float32Array([ 1e4, 100, 10, 10 ])
            },
            pixelSize: {
                type: "2f",
                value: {
                    x: 10,
                    y: 10
                }
            }
        };
        this.fragmentSrc = [ "precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform vec2 testDim;", "uniform vec4 dimensions;", "uniform vec2 pixelSize;", "uniform sampler2D uSampler;", "void main(void) {", "   vec2 coord = vTextureCoord;", "   vec2 size = dimensions.xy/pixelSize;", "   vec2 color = floor( ( vTextureCoord * size ) ) / size + pixelSize/dimensions.xy * 0.5;", "   gl_FragColor = texture2D(uSampler, color);", "}" ];
    };
    PIXI.PixelateFilter.prototype = Object.create(PIXI.AbstractFilter.prototype);
    PIXI.PixelateFilter.prototype.constructor = PIXI.PixelateFilter;
    Object.defineProperty(PIXI.PixelateFilter.prototype, "size", {
        get: function() {
            return this.uniforms.pixelSize.value;
        },
        set: function(value) {
            this.dirty = true;
            this.uniforms.pixelSize.value = value;
        }
    });
    PIXI.BlurXFilter = function() {
        PIXI.AbstractFilter.call(this);
        this.passes = [ this ];
        this.uniforms = {
            blur: {
                type: "1f",
                value: 1 / 512
            }
        };
        this.fragmentSrc = [ "precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform float blur;", "uniform sampler2D uSampler;", "void main(void) {", "   vec4 sum = vec4(0.0);", "   sum += texture2D(uSampler, vec2(vTextureCoord.x - 4.0*blur, vTextureCoord.y)) * 0.05;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x - 3.0*blur, vTextureCoord.y)) * 0.09;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x - 2.0*blur, vTextureCoord.y)) * 0.12;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x - blur, vTextureCoord.y)) * 0.15;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y)) * 0.16;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x + blur, vTextureCoord.y)) * 0.15;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x + 2.0*blur, vTextureCoord.y)) * 0.12;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x + 3.0*blur, vTextureCoord.y)) * 0.09;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x + 4.0*blur, vTextureCoord.y)) * 0.05;", "   gl_FragColor = sum;", "}" ];
    };
    PIXI.BlurXFilter.prototype = Object.create(PIXI.AbstractFilter.prototype);
    PIXI.BlurXFilter.prototype.constructor = PIXI.BlurXFilter;
    Object.defineProperty(PIXI.BlurXFilter.prototype, "blur", {
        get: function() {
            return this.uniforms.blur.value / (1 / 7e3);
        },
        set: function(value) {
            this.dirty = true;
            this.uniforms.blur.value = 1 / 7e3 * value;
        }
    });
    PIXI.BlurYFilter = function() {
        PIXI.AbstractFilter.call(this);
        this.passes = [ this ];
        this.uniforms = {
            blur: {
                type: "1f",
                value: 1 / 512
            }
        };
        this.fragmentSrc = [ "precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform float blur;", "uniform sampler2D uSampler;", "void main(void) {", "   vec4 sum = vec4(0.0);", "   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - 4.0*blur)) * 0.05;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - 3.0*blur)) * 0.09;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - 2.0*blur)) * 0.12;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - blur)) * 0.15;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y)) * 0.16;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + blur)) * 0.15;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + 2.0*blur)) * 0.12;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + 3.0*blur)) * 0.09;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + 4.0*blur)) * 0.05;", "   gl_FragColor = sum;", "}" ];
    };
    PIXI.BlurYFilter.prototype = Object.create(PIXI.AbstractFilter.prototype);
    PIXI.BlurYFilter.prototype.constructor = PIXI.BlurYFilter;
    Object.defineProperty(PIXI.BlurYFilter.prototype, "blur", {
        get: function() {
            return this.uniforms.blur.value / (1 / 7e3);
        },
        set: function(value) {
            this.uniforms.blur.value = 1 / 7e3 * value;
        }
    });
    PIXI.BlurFilter = function() {
        this.blurXFilter = new PIXI.BlurXFilter();
        this.blurYFilter = new PIXI.BlurYFilter();
        this.passes = [ this.blurXFilter, this.blurYFilter ];
    };
    PIXI.BlurFilter.prototype = Object.create(PIXI.AbstractFilter.prototype);
    PIXI.BlurFilter.prototype.constructor = PIXI.BlurFilter;
    Object.defineProperty(PIXI.BlurFilter.prototype, "blur", {
        get: function() {
            return this.blurXFilter.blur;
        },
        set: function(value) {
            this.blurXFilter.blur = this.blurYFilter.blur = value;
        }
    });
    Object.defineProperty(PIXI.BlurFilter.prototype, "blurX", {
        get: function() {
            return this.blurXFilter.blur;
        },
        set: function(value) {
            this.blurXFilter.blur = value;
        }
    });
    Object.defineProperty(PIXI.BlurFilter.prototype, "blurY", {
        get: function() {
            return this.blurYFilter.blur;
        },
        set: function(value) {
            this.blurYFilter.blur = value;
        }
    });
    PIXI.InvertFilter = function() {
        PIXI.AbstractFilter.call(this);
        this.passes = [ this ];
        this.uniforms = {
            invert: {
                type: "1f",
                value: 1
            }
        };
        this.fragmentSrc = [ "precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform float invert;", "uniform sampler2D uSampler;", "void main(void) {", "   gl_FragColor = texture2D(uSampler, vTextureCoord);", "   gl_FragColor.rgb = mix( (vec3(1)-gl_FragColor.rgb) * gl_FragColor.a, gl_FragColor.rgb, 1.0 - invert);", "}" ];
    };
    PIXI.InvertFilter.prototype = Object.create(PIXI.AbstractFilter.prototype);
    PIXI.InvertFilter.prototype.constructor = PIXI.InvertFilter;
    Object.defineProperty(PIXI.InvertFilter.prototype, "invert", {
        get: function() {
            return this.uniforms.invert.value;
        },
        set: function(value) {
            this.uniforms.invert.value = value;
        }
    });
    PIXI.SepiaFilter = function() {
        PIXI.AbstractFilter.call(this);
        this.passes = [ this ];
        this.uniforms = {
            sepia: {
                type: "1f",
                value: 1
            }
        };
        this.fragmentSrc = [ "precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform float sepia;", "uniform sampler2D uSampler;", "const mat3 sepiaMatrix = mat3(0.3588, 0.7044, 0.1368, 0.2990, 0.5870, 0.1140, 0.2392, 0.4696, 0.0912);", "void main(void) {", "   gl_FragColor = texture2D(uSampler, vTextureCoord);", "   gl_FragColor.rgb = mix( gl_FragColor.rgb, gl_FragColor.rgb * sepiaMatrix, sepia);", "}" ];
    };
    PIXI.SepiaFilter.prototype = Object.create(PIXI.AbstractFilter.prototype);
    PIXI.SepiaFilter.prototype.constructor = PIXI.SepiaFilter;
    Object.defineProperty(PIXI.SepiaFilter.prototype, "sepia", {
        get: function() {
            return this.uniforms.sepia.value;
        },
        set: function(value) {
            this.uniforms.sepia.value = value;
        }
    });
    PIXI.TwistFilter = function() {
        PIXI.AbstractFilter.call(this);
        this.passes = [ this ];
        this.uniforms = {
            radius: {
                type: "1f",
                value: .5
            },
            angle: {
                type: "1f",
                value: 5
            },
            offset: {
                type: "2f",
                value: {
                    x: .5,
                    y: .5
                }
            }
        };
        this.fragmentSrc = [ "precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform vec4 dimensions;", "uniform sampler2D uSampler;", "uniform float radius;", "uniform float angle;", "uniform vec2 offset;", "void main(void) {", "   vec2 coord = vTextureCoord - offset;", "   float distance = length(coord);", "   if (distance < radius) {", "       float ratio = (radius - distance) / radius;", "       float angleMod = ratio * ratio * angle;", "       float s = sin(angleMod);", "       float c = cos(angleMod);", "       coord = vec2(coord.x * c - coord.y * s, coord.x * s + coord.y * c);", "   }", "   gl_FragColor = texture2D(uSampler, coord+offset);", "}" ];
    };
    PIXI.TwistFilter.prototype = Object.create(PIXI.AbstractFilter.prototype);
    PIXI.TwistFilter.prototype.constructor = PIXI.TwistFilter;
    Object.defineProperty(PIXI.TwistFilter.prototype, "offset", {
        get: function() {
            return this.uniforms.offset.value;
        },
        set: function(value) {
            this.dirty = true;
            this.uniforms.offset.value = value;
        }
    });
    Object.defineProperty(PIXI.TwistFilter.prototype, "radius", {
        get: function() {
            return this.uniforms.radius.value;
        },
        set: function(value) {
            this.dirty = true;
            this.uniforms.radius.value = value;
        }
    });
    Object.defineProperty(PIXI.TwistFilter.prototype, "angle", {
        get: function() {
            return this.uniforms.angle.value;
        },
        set: function(value) {
            this.dirty = true;
            this.uniforms.angle.value = value;
        }
    });
    PIXI.ColorStepFilter = function() {
        PIXI.AbstractFilter.call(this);
        this.passes = [ this ];
        this.uniforms = {
            step: {
                type: "1f",
                value: 5
            }
        };
        this.fragmentSrc = [ "precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform sampler2D uSampler;", "uniform float step;", "void main(void) {", "   vec4 color = texture2D(uSampler, vTextureCoord);", "   color = floor(color * step) / step;", "   gl_FragColor = color;", "}" ];
    };
    PIXI.ColorStepFilter.prototype = Object.create(PIXI.AbstractFilter.prototype);
    PIXI.ColorStepFilter.prototype.constructor = PIXI.ColorStepFilter;
    Object.defineProperty(PIXI.ColorStepFilter.prototype, "step", {
        get: function() {
            return this.uniforms.step.value;
        },
        set: function(value) {
            this.uniforms.step.value = value;
        }
    });
    PIXI.DotScreenFilter = function() {
        PIXI.AbstractFilter.call(this);
        this.passes = [ this ];
        this.uniforms = {
            scale: {
                type: "1f",
                value: 1
            },
            angle: {
                type: "1f",
                value: 5
            },
            dimensions: {
                type: "4fv",
                value: [ 0, 0, 0, 0 ]
            }
        };
        this.fragmentSrc = [ "precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform vec4 dimensions;", "uniform sampler2D uSampler;", "uniform float angle;", "uniform float scale;", "float pattern() {", "   float s = sin(angle), c = cos(angle);", "   vec2 tex = vTextureCoord * dimensions.xy;", "   vec2 point = vec2(", "       c * tex.x - s * tex.y,", "       s * tex.x + c * tex.y", "   ) * scale;", "   return (sin(point.x) * sin(point.y)) * 4.0;", "}", "void main() {", "   vec4 color = texture2D(uSampler, vTextureCoord);", "   float average = (color.r + color.g + color.b) / 3.0;", "   gl_FragColor = vec4(vec3(average * 10.0 - 5.0 + pattern()), color.a);", "}" ];
    };
    PIXI.DotScreenFilter.prototype = Object.create(PIXI.AbstractFilter.prototype);
    PIXI.DotScreenFilter.prototype.constructor = PIXI.DotScreenFilter;
    Object.defineProperty(PIXI.DotScreenFilter.prototype, "scale", {
        get: function() {
            return this.uniforms.scale.value;
        },
        set: function(value) {
            this.dirty = true;
            this.uniforms.scale.value = value;
        }
    });
    Object.defineProperty(PIXI.DotScreenFilter.prototype, "angle", {
        get: function() {
            return this.uniforms.angle.value;
        },
        set: function(value) {
            this.dirty = true;
            this.uniforms.angle.value = value;
        }
    });
    PIXI.CrossHatchFilter = function() {
        PIXI.AbstractFilter.call(this);
        this.passes = [ this ];
        this.uniforms = {
            blur: {
                type: "1f",
                value: 1 / 512
            }
        };
        this.fragmentSrc = [ "precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform float blur;", "uniform sampler2D uSampler;", "void main(void) {", "    float lum = length(texture2D(uSampler, vTextureCoord.xy).rgb);", "    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);", "    if (lum < 1.00) {", "        if (mod(gl_FragCoord.x + gl_FragCoord.y, 10.0) == 0.0) {", "            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);", "        }", "    }", "    if (lum < 0.75) {", "        if (mod(gl_FragCoord.x - gl_FragCoord.y, 10.0) == 0.0) {", "            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);", "        }", "    }", "    if (lum < 0.50) {", "        if (mod(gl_FragCoord.x + gl_FragCoord.y - 5.0, 10.0) == 0.0) {", "            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);", "        }", "    }", "    if (lum < 0.3) {", "        if (mod(gl_FragCoord.x - gl_FragCoord.y - 5.0, 10.0) == 0.0) {", "            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);", "        }", "    }", "}" ];
    };
    PIXI.CrossHatchFilter.prototype = Object.create(PIXI.AbstractFilter.prototype);
    PIXI.CrossHatchFilter.prototype.constructor = PIXI.CrossHatchFilter;
    Object.defineProperty(PIXI.CrossHatchFilter.prototype, "blur", {
        get: function() {
            return this.uniforms.blur.value / (1 / 7e3);
        },
        set: function(value) {
            this.uniforms.blur.value = 1 / 7e3 * value;
        }
    });
    PIXI.RGBSplitFilter = function() {
        PIXI.AbstractFilter.call(this);
        this.passes = [ this ];
        this.uniforms = {
            red: {
                type: "2f",
                value: {
                    x: 20,
                    y: 20
                }
            },
            green: {
                type: "2f",
                value: {
                    x: -20,
                    y: 20
                }
            },
            blue: {
                type: "2f",
                value: {
                    x: 20,
                    y: -20
                }
            },
            dimensions: {
                type: "4fv",
                value: [ 0, 0, 0, 0 ]
            }
        };
        this.fragmentSrc = [ "precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform vec2 red;", "uniform vec2 green;", "uniform vec2 blue;", "uniform vec4 dimensions;", "uniform sampler2D uSampler;", "void main(void) {", "   gl_FragColor.r = texture2D(uSampler, vTextureCoord + red/dimensions.xy).r;", "   gl_FragColor.g = texture2D(uSampler, vTextureCoord + green/dimensions.xy).g;", "   gl_FragColor.b = texture2D(uSampler, vTextureCoord + blue/dimensions.xy).b;", "   gl_FragColor.a = texture2D(uSampler, vTextureCoord).a;", "}" ];
    };
    PIXI.RGBSplitFilter.prototype = Object.create(PIXI.AbstractFilter.prototype);
    PIXI.RGBSplitFilter.prototype.constructor = PIXI.RGBSplitFilter;
    Object.defineProperty(PIXI.RGBSplitFilter.prototype, "red", {
        get: function() {
            return this.uniforms.red.value;
        },
        set: function(value) {
            this.uniforms.red.value = value;
        }
    });
    Object.defineProperty(PIXI.RGBSplitFilter.prototype, "green", {
        get: function() {
            return this.uniforms.green.value;
        },
        set: function(value) {
            this.uniforms.green.value = value;
        }
    });
    Object.defineProperty(PIXI.RGBSplitFilter.prototype, "blue", {
        get: function() {
            return this.uniforms.blue.value;
        },
        set: function(value) {
            this.uniforms.blue.value = value;
        }
    });
    if (typeof exports !== "undefined") {
        if (typeof module !== "undefined" && module.exports) {
            exports = module.exports = PIXI;
        }
        exports.PIXI = PIXI;
    } else if (typeof define !== "undefined" && define.amd) {
        define(PIXI);
    } else {
        root.PIXI = PIXI;
    }
}).call(this);

if (!window.performance) {
    var performance = undefined;
}

!function(e) {
    if ("object" == typeof exports) module.exports = e(); else if ("function" == typeof define && define.amd) define(e); else {
        var f;
        "undefined" != typeof window ? f = window : "undefined" != typeof global ? f = global : "undefined" != typeof self && (f = self),
        f.p2 = e();
    }
}(function() {
    var define, module, exports;
    return function e(t, n, r) {
        function s(o, u) {
            if (!n[o]) {
                if (!t[o]) {
                    var a = typeof require == "function" && require;
                    if (!u && a) return a(o, !0);
                    if (i) return i(o, !0);
                    throw new Error("Cannot find module '" + o + "'");
                }
                var f = n[o] = {
                    exports: {}
                };
                t[o][0].call(f.exports, function(e) {
                    var n = t[o][1][e];
                    return s(n ? n : e);
                }, f, f.exports, e, t, n, r);
            }
            return n[o].exports;
        }
        var i = typeof require == "function" && require;
        for (var o = 0; o < r.length; o++) s(r[o]);
        return s;
    }({
        1: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                var base64 = _dereq_("base64-js");
                var ieee754 = _dereq_("ieee754");
                exports.Buffer = Buffer;
                exports.SlowBuffer = Buffer;
                exports.INSPECT_MAX_BYTES = 50;
                Buffer.poolSize = 8192;
                Buffer._useTypedArrays = function() {
                    if (typeof Uint8Array !== "function" || typeof ArrayBuffer !== "function") return false;
                    try {
                        var arr = new Uint8Array(0);
                        arr.foo = function() {
                            return 42;
                        };
                        return 42 === arr.foo() && typeof arr.subarray === "function";
                    } catch (e) {
                        return false;
                    }
                }();
                function Buffer(subject, encoding, noZero) {
                    if (!(this instanceof Buffer)) return new Buffer(subject, encoding, noZero);
                    var type = typeof subject;
                    if (encoding === "base64" && type === "string") {
                        subject = stringtrim(subject);
                        while (subject.length % 4 !== 0) {
                            subject = subject + "=";
                        }
                    }
                    var length;
                    if (type === "number") length = coerce(subject); else if (type === "string") length = Buffer.byteLength(subject, encoding); else if (type === "object") length = coerce(subject.length); else throw new Error("First argument needs to be a number, array or string.");
                    var buf;
                    if (Buffer._useTypedArrays) {
                        buf = augment(new Uint8Array(length));
                    } else {
                        buf = this;
                        buf.length = length;
                        buf._isBuffer = true;
                    }
                    var i;
                    if (Buffer._useTypedArrays && typeof Uint8Array === "function" && subject instanceof Uint8Array) {
                        buf._set(subject);
                    } else if (isArrayish(subject)) {
                        for (i = 0; i < length; i++) {
                            if (Buffer.isBuffer(subject)) buf[i] = subject.readUInt8(i); else buf[i] = subject[i];
                        }
                    } else if (type === "string") {
                        buf.write(subject, 0, encoding);
                    } else if (type === "number" && !Buffer._useTypedArrays && !noZero) {
                        for (i = 0; i < length; i++) {
                            buf[i] = 0;
                        }
                    }
                    return buf;
                }
                Buffer.isEncoding = function(encoding) {
                    switch (String(encoding).toLowerCase()) {
                      case "hex":
                      case "utf8":
                      case "utf-8":
                      case "ascii":
                      case "binary":
                      case "base64":
                      case "raw":
                      case "ucs2":
                      case "ucs-2":
                      case "utf16le":
                      case "utf-16le":
                        return true;

                      default:
                        return false;
                    }
                };
                Buffer.isBuffer = function(b) {
                    return !!(b !== null && b !== undefined && b._isBuffer);
                };
                Buffer.byteLength = function(str, encoding) {
                    var ret;
                    str = str + "";
                    switch (encoding || "utf8") {
                      case "hex":
                        ret = str.length / 2;
                        break;

                      case "utf8":
                      case "utf-8":
                        ret = utf8ToBytes(str).length;
                        break;

                      case "ascii":
                      case "binary":
                      case "raw":
                        ret = str.length;
                        break;

                      case "base64":
                        ret = base64ToBytes(str).length;
                        break;

                      case "ucs2":
                      case "ucs-2":
                      case "utf16le":
                      case "utf-16le":
                        ret = str.length * 2;
                        break;

                      default:
                        throw new Error("Unknown encoding");
                    }
                    return ret;
                };
                Buffer.concat = function(list, totalLength) {
                    assert(isArray(list), "Usage: Buffer.concat(list, [totalLength])\n" + "list should be an Array.");
                    if (list.length === 0) {
                        return new Buffer(0);
                    } else if (list.length === 1) {
                        return list[0];
                    }
                    var i;
                    if (typeof totalLength !== "number") {
                        totalLength = 0;
                        for (i = 0; i < list.length; i++) {
                            totalLength += list[i].length;
                        }
                    }
                    var buf = new Buffer(totalLength);
                    var pos = 0;
                    for (i = 0; i < list.length; i++) {
                        var item = list[i];
                        item.copy(buf, pos);
                        pos += item.length;
                    }
                    return buf;
                };
                function _hexWrite(buf, string, offset, length) {
                    offset = Number(offset) || 0;
                    var remaining = buf.length - offset;
                    if (!length) {
                        length = remaining;
                    } else {
                        length = Number(length);
                        if (length > remaining) {
                            length = remaining;
                        }
                    }
                    var strLen = string.length;
                    assert(strLen % 2 === 0, "Invalid hex string");
                    if (length > strLen / 2) {
                        length = strLen / 2;
                    }
                    for (var i = 0; i < length; i++) {
                        var byte = parseInt(string.substr(i * 2, 2), 16);
                        assert(!isNaN(byte), "Invalid hex string");
                        buf[offset + i] = byte;
                    }
                    Buffer._charsWritten = i * 2;
                    return i;
                }
                function _utf8Write(buf, string, offset, length) {
                    var charsWritten = Buffer._charsWritten = blitBuffer(utf8ToBytes(string), buf, offset, length);
                    return charsWritten;
                }
                function _asciiWrite(buf, string, offset, length) {
                    var charsWritten = Buffer._charsWritten = blitBuffer(asciiToBytes(string), buf, offset, length);
                    return charsWritten;
                }
                function _binaryWrite(buf, string, offset, length) {
                    return _asciiWrite(buf, string, offset, length);
                }
                function _base64Write(buf, string, offset, length) {
                    var charsWritten = Buffer._charsWritten = blitBuffer(base64ToBytes(string), buf, offset, length);
                    return charsWritten;
                }
                function _utf16leWrite(buf, string, offset, length) {
                    var charsWritten = Buffer._charsWritten = blitBuffer(utf16leToBytes(string), buf, offset, length);
                    return charsWritten;
                }
                Buffer.prototype.write = function(string, offset, length, encoding) {
                    if (isFinite(offset)) {
                        if (!isFinite(length)) {
                            encoding = length;
                            length = undefined;
                        }
                    } else {
                        var swap = encoding;
                        encoding = offset;
                        offset = length;
                        length = swap;
                    }
                    offset = Number(offset) || 0;
                    var remaining = this.length - offset;
                    if (!length) {
                        length = remaining;
                    } else {
                        length = Number(length);
                        if (length > remaining) {
                            length = remaining;
                        }
                    }
                    encoding = String(encoding || "utf8").toLowerCase();
                    var ret;
                    switch (encoding) {
                      case "hex":
                        ret = _hexWrite(this, string, offset, length);
                        break;

                      case "utf8":
                      case "utf-8":
                        ret = _utf8Write(this, string, offset, length);
                        break;

                      case "ascii":
                        ret = _asciiWrite(this, string, offset, length);
                        break;

                      case "binary":
                        ret = _binaryWrite(this, string, offset, length);
                        break;

                      case "base64":
                        ret = _base64Write(this, string, offset, length);
                        break;

                      case "ucs2":
                      case "ucs-2":
                      case "utf16le":
                      case "utf-16le":
                        ret = _utf16leWrite(this, string, offset, length);
                        break;

                      default:
                        throw new Error("Unknown encoding");
                    }
                    return ret;
                };
                Buffer.prototype.toString = function(encoding, start, end) {
                    var self = this;
                    encoding = String(encoding || "utf8").toLowerCase();
                    start = Number(start) || 0;
                    end = end !== undefined ? Number(end) : end = self.length;
                    if (end === start) return "";
                    var ret;
                    switch (encoding) {
                      case "hex":
                        ret = _hexSlice(self, start, end);
                        break;

                      case "utf8":
                      case "utf-8":
                        ret = _utf8Slice(self, start, end);
                        break;

                      case "ascii":
                        ret = _asciiSlice(self, start, end);
                        break;

                      case "binary":
                        ret = _binarySlice(self, start, end);
                        break;

                      case "base64":
                        ret = _base64Slice(self, start, end);
                        break;

                      case "ucs2":
                      case "ucs-2":
                      case "utf16le":
                      case "utf-16le":
                        ret = _utf16leSlice(self, start, end);
                        break;

                      default:
                        throw new Error("Unknown encoding");
                    }
                    return ret;
                };
                Buffer.prototype.toJSON = function() {
                    return {
                        type: "Buffer",
                        data: Array.prototype.slice.call(this._arr || this, 0)
                    };
                };
                Buffer.prototype.copy = function(target, target_start, start, end) {
                    var source = this;
                    if (!start) start = 0;
                    if (!end && end !== 0) end = this.length;
                    if (!target_start) target_start = 0;
                    if (end === start) return;
                    if (target.length === 0 || source.length === 0) return;
                    assert(end >= start, "sourceEnd < sourceStart");
                    assert(target_start >= 0 && target_start < target.length, "targetStart out of bounds");
                    assert(start >= 0 && start < source.length, "sourceStart out of bounds");
                    assert(end >= 0 && end <= source.length, "sourceEnd out of bounds");
                    if (end > this.length) end = this.length;
                    if (target.length - target_start < end - start) end = target.length - target_start + start;
                    for (var i = 0; i < end - start; i++) target[i + target_start] = this[i + start];
                };
                function _base64Slice(buf, start, end) {
                    if (start === 0 && end === buf.length) {
                        return base64.fromByteArray(buf);
                    } else {
                        return base64.fromByteArray(buf.slice(start, end));
                    }
                }
                function _utf8Slice(buf, start, end) {
                    var res = "";
                    var tmp = "";
                    end = Math.min(buf.length, end);
                    for (var i = start; i < end; i++) {
                        if (buf[i] <= 127) {
                            res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i]);
                            tmp = "";
                        } else {
                            tmp += "%" + buf[i].toString(16);
                        }
                    }
                    return res + decodeUtf8Char(tmp);
                }
                function _asciiSlice(buf, start, end) {
                    var ret = "";
                    end = Math.min(buf.length, end);
                    for (var i = start; i < end; i++) ret += String.fromCharCode(buf[i]);
                    return ret;
                }
                function _binarySlice(buf, start, end) {
                    return _asciiSlice(buf, start, end);
                }
                function _hexSlice(buf, start, end) {
                    var len = buf.length;
                    if (!start || start < 0) start = 0;
                    if (!end || end < 0 || end > len) end = len;
                    var out = "";
                    for (var i = start; i < end; i++) {
                        out += toHex(buf[i]);
                    }
                    return out;
                }
                function _utf16leSlice(buf, start, end) {
                    var bytes = buf.slice(start, end);
                    var res = "";
                    for (var i = 0; i < bytes.length; i += 2) {
                        res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
                    }
                    return res;
                }
                Buffer.prototype.slice = function(start, end) {
                    var len = this.length;
                    start = clamp(start, len, 0);
                    end = clamp(end, len, len);
                    if (Buffer._useTypedArrays) {
                        return augment(this.subarray(start, end));
                    } else {
                        var sliceLen = end - start;
                        var newBuf = new Buffer(sliceLen, undefined, true);
                        for (var i = 0; i < sliceLen; i++) {
                            newBuf[i] = this[i + start];
                        }
                        return newBuf;
                    }
                };
                Buffer.prototype.get = function(offset) {
                    console.log(".get() is deprecated. Access using array indexes instead.");
                    return this.readUInt8(offset);
                };
                Buffer.prototype.set = function(v, offset) {
                    console.log(".set() is deprecated. Access using array indexes instead.");
                    return this.writeUInt8(v, offset);
                };
                Buffer.prototype.readUInt8 = function(offset, noAssert) {
                    if (!noAssert) {
                        assert(offset !== undefined && offset !== null, "missing offset");
                        assert(offset < this.length, "Trying to read beyond buffer length");
                    }
                    if (offset >= this.length) return;
                    return this[offset];
                };
                function _readUInt16(buf, offset, littleEndian, noAssert) {
                    if (!noAssert) {
                        assert(typeof littleEndian === "boolean", "missing or invalid endian");
                        assert(offset !== undefined && offset !== null, "missing offset");
                        assert(offset + 1 < buf.length, "Trying to read beyond buffer length");
                    }
                    var len = buf.length;
                    if (offset >= len) return;
                    var val;
                    if (littleEndian) {
                        val = buf[offset];
                        if (offset + 1 < len) val |= buf[offset + 1] << 8;
                    } else {
                        val = buf[offset] << 8;
                        if (offset + 1 < len) val |= buf[offset + 1];
                    }
                    return val;
                }
                Buffer.prototype.readUInt16LE = function(offset, noAssert) {
                    return _readUInt16(this, offset, true, noAssert);
                };
                Buffer.prototype.readUInt16BE = function(offset, noAssert) {
                    return _readUInt16(this, offset, false, noAssert);
                };
                function _readUInt32(buf, offset, littleEndian, noAssert) {
                    if (!noAssert) {
                        assert(typeof littleEndian === "boolean", "missing or invalid endian");
                        assert(offset !== undefined && offset !== null, "missing offset");
                        assert(offset + 3 < buf.length, "Trying to read beyond buffer length");
                    }
                    var len = buf.length;
                    if (offset >= len) return;
                    var val;
                    if (littleEndian) {
                        if (offset + 2 < len) val = buf[offset + 2] << 16;
                        if (offset + 1 < len) val |= buf[offset + 1] << 8;
                        val |= buf[offset];
                        if (offset + 3 < len) val = val + (buf[offset + 3] << 24 >>> 0);
                    } else {
                        if (offset + 1 < len) val = buf[offset + 1] << 16;
                        if (offset + 2 < len) val |= buf[offset + 2] << 8;
                        if (offset + 3 < len) val |= buf[offset + 3];
                        val = val + (buf[offset] << 24 >>> 0);
                    }
                    return val;
                }
                Buffer.prototype.readUInt32LE = function(offset, noAssert) {
                    return _readUInt32(this, offset, true, noAssert);
                };
                Buffer.prototype.readUInt32BE = function(offset, noAssert) {
                    return _readUInt32(this, offset, false, noAssert);
                };
                Buffer.prototype.readInt8 = function(offset, noAssert) {
                    if (!noAssert) {
                        assert(offset !== undefined && offset !== null, "missing offset");
                        assert(offset < this.length, "Trying to read beyond buffer length");
                    }
                    if (offset >= this.length) return;
                    var neg = this[offset] & 128;
                    if (neg) return (255 - this[offset] + 1) * -1; else return this[offset];
                };
                function _readInt16(buf, offset, littleEndian, noAssert) {
                    if (!noAssert) {
                        assert(typeof littleEndian === "boolean", "missing or invalid endian");
                        assert(offset !== undefined && offset !== null, "missing offset");
                        assert(offset + 1 < buf.length, "Trying to read beyond buffer length");
                    }
                    var len = buf.length;
                    if (offset >= len) return;
                    var val = _readUInt16(buf, offset, littleEndian, true);
                    var neg = val & 32768;
                    if (neg) return (65535 - val + 1) * -1; else return val;
                }
                Buffer.prototype.readInt16LE = function(offset, noAssert) {
                    return _readInt16(this, offset, true, noAssert);
                };
                Buffer.prototype.readInt16BE = function(offset, noAssert) {
                    return _readInt16(this, offset, false, noAssert);
                };
                function _readInt32(buf, offset, littleEndian, noAssert) {
                    if (!noAssert) {
                        assert(typeof littleEndian === "boolean", "missing or invalid endian");
                        assert(offset !== undefined && offset !== null, "missing offset");
                        assert(offset + 3 < buf.length, "Trying to read beyond buffer length");
                    }
                    var len = buf.length;
                    if (offset >= len) return;
                    var val = _readUInt32(buf, offset, littleEndian, true);
                    var neg = val & 2147483648;
                    if (neg) return (4294967295 - val + 1) * -1; else return val;
                }
                Buffer.prototype.readInt32LE = function(offset, noAssert) {
                    return _readInt32(this, offset, true, noAssert);
                };
                Buffer.prototype.readInt32BE = function(offset, noAssert) {
                    return _readInt32(this, offset, false, noAssert);
                };
                function _readFloat(buf, offset, littleEndian, noAssert) {
                    if (!noAssert) {
                        assert(typeof littleEndian === "boolean", "missing or invalid endian");
                        assert(offset + 3 < buf.length, "Trying to read beyond buffer length");
                    }
                    return ieee754.read(buf, offset, littleEndian, 23, 4);
                }
                Buffer.prototype.readFloatLE = function(offset, noAssert) {
                    return _readFloat(this, offset, true, noAssert);
                };
                Buffer.prototype.readFloatBE = function(offset, noAssert) {
                    return _readFloat(this, offset, false, noAssert);
                };
                function _readDouble(buf, offset, littleEndian, noAssert) {
                    if (!noAssert) {
                        assert(typeof littleEndian === "boolean", "missing or invalid endian");
                        assert(offset + 7 < buf.length, "Trying to read beyond buffer length");
                    }
                    return ieee754.read(buf, offset, littleEndian, 52, 8);
                }
                Buffer.prototype.readDoubleLE = function(offset, noAssert) {
                    return _readDouble(this, offset, true, noAssert);
                };
                Buffer.prototype.readDoubleBE = function(offset, noAssert) {
                    return _readDouble(this, offset, false, noAssert);
                };
                Buffer.prototype.writeUInt8 = function(value, offset, noAssert) {
                    if (!noAssert) {
                        assert(value !== undefined && value !== null, "missing value");
                        assert(offset !== undefined && offset !== null, "missing offset");
                        assert(offset < this.length, "trying to write beyond buffer length");
                        verifuint(value, 255);
                    }
                    if (offset >= this.length) return;
                    this[offset] = value;
                };
                function _writeUInt16(buf, value, offset, littleEndian, noAssert) {
                    if (!noAssert) {
                        assert(value !== undefined && value !== null, "missing value");
                        assert(typeof littleEndian === "boolean", "missing or invalid endian");
                        assert(offset !== undefined && offset !== null, "missing offset");
                        assert(offset + 1 < buf.length, "trying to write beyond buffer length");
                        verifuint(value, 65535);
                    }
                    var len = buf.length;
                    if (offset >= len) return;
                    for (var i = 0, j = Math.min(len - offset, 2); i < j; i++) {
                        buf[offset + i] = (value & 255 << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
                    }
                }
                Buffer.prototype.writeUInt16LE = function(value, offset, noAssert) {
                    _writeUInt16(this, value, offset, true, noAssert);
                };
                Buffer.prototype.writeUInt16BE = function(value, offset, noAssert) {
                    _writeUInt16(this, value, offset, false, noAssert);
                };
                function _writeUInt32(buf, value, offset, littleEndian, noAssert) {
                    if (!noAssert) {
                        assert(value !== undefined && value !== null, "missing value");
                        assert(typeof littleEndian === "boolean", "missing or invalid endian");
                        assert(offset !== undefined && offset !== null, "missing offset");
                        assert(offset + 3 < buf.length, "trying to write beyond buffer length");
                        verifuint(value, 4294967295);
                    }
                    var len = buf.length;
                    if (offset >= len) return;
                    for (var i = 0, j = Math.min(len - offset, 4); i < j; i++) {
                        buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 255;
                    }
                }
                Buffer.prototype.writeUInt32LE = function(value, offset, noAssert) {
                    _writeUInt32(this, value, offset, true, noAssert);
                };
                Buffer.prototype.writeUInt32BE = function(value, offset, noAssert) {
                    _writeUInt32(this, value, offset, false, noAssert);
                };
                Buffer.prototype.writeInt8 = function(value, offset, noAssert) {
                    if (!noAssert) {
                        assert(value !== undefined && value !== null, "missing value");
                        assert(offset !== undefined && offset !== null, "missing offset");
                        assert(offset < this.length, "Trying to write beyond buffer length");
                        verifsint(value, 127, -128);
                    }
                    if (offset >= this.length) return;
                    if (value >= 0) this.writeUInt8(value, offset, noAssert); else this.writeUInt8(255 + value + 1, offset, noAssert);
                };
                function _writeInt16(buf, value, offset, littleEndian, noAssert) {
                    if (!noAssert) {
                        assert(value !== undefined && value !== null, "missing value");
                        assert(typeof littleEndian === "boolean", "missing or invalid endian");
                        assert(offset !== undefined && offset !== null, "missing offset");
                        assert(offset + 1 < buf.length, "Trying to write beyond buffer length");
                        verifsint(value, 32767, -32768);
                    }
                    var len = buf.length;
                    if (offset >= len) return;
                    if (value >= 0) _writeUInt16(buf, value, offset, littleEndian, noAssert); else _writeUInt16(buf, 65535 + value + 1, offset, littleEndian, noAssert);
                }
                Buffer.prototype.writeInt16LE = function(value, offset, noAssert) {
                    _writeInt16(this, value, offset, true, noAssert);
                };
                Buffer.prototype.writeInt16BE = function(value, offset, noAssert) {
                    _writeInt16(this, value, offset, false, noAssert);
                };
                function _writeInt32(buf, value, offset, littleEndian, noAssert) {
                    if (!noAssert) {
                        assert(value !== undefined && value !== null, "missing value");
                        assert(typeof littleEndian === "boolean", "missing or invalid endian");
                        assert(offset !== undefined && offset !== null, "missing offset");
                        assert(offset + 3 < buf.length, "Trying to write beyond buffer length");
                        verifsint(value, 2147483647, -2147483648);
                    }
                    var len = buf.length;
                    if (offset >= len) return;
                    if (value >= 0) _writeUInt32(buf, value, offset, littleEndian, noAssert); else _writeUInt32(buf, 4294967295 + value + 1, offset, littleEndian, noAssert);
                }
                Buffer.prototype.writeInt32LE = function(value, offset, noAssert) {
                    _writeInt32(this, value, offset, true, noAssert);
                };
                Buffer.prototype.writeInt32BE = function(value, offset, noAssert) {
                    _writeInt32(this, value, offset, false, noAssert);
                };
                function _writeFloat(buf, value, offset, littleEndian, noAssert) {
                    if (!noAssert) {
                        assert(value !== undefined && value !== null, "missing value");
                        assert(typeof littleEndian === "boolean", "missing or invalid endian");
                        assert(offset !== undefined && offset !== null, "missing offset");
                        assert(offset + 3 < buf.length, "Trying to write beyond buffer length");
                        verifIEEE754(value, 3.4028234663852886e38, -3.4028234663852886e38);
                    }
                    var len = buf.length;
                    if (offset >= len) return;
                    ieee754.write(buf, value, offset, littleEndian, 23, 4);
                }
                Buffer.prototype.writeFloatLE = function(value, offset, noAssert) {
                    _writeFloat(this, value, offset, true, noAssert);
                };
                Buffer.prototype.writeFloatBE = function(value, offset, noAssert) {
                    _writeFloat(this, value, offset, false, noAssert);
                };
                function _writeDouble(buf, value, offset, littleEndian, noAssert) {
                    if (!noAssert) {
                        assert(value !== undefined && value !== null, "missing value");
                        assert(typeof littleEndian === "boolean", "missing or invalid endian");
                        assert(offset !== undefined && offset !== null, "missing offset");
                        assert(offset + 7 < buf.length, "Trying to write beyond buffer length");
                        verifIEEE754(value, 1.7976931348623157e308, -1.7976931348623157e308);
                    }
                    var len = buf.length;
                    if (offset >= len) return;
                    ieee754.write(buf, value, offset, littleEndian, 52, 8);
                }
                Buffer.prototype.writeDoubleLE = function(value, offset, noAssert) {
                    _writeDouble(this, value, offset, true, noAssert);
                };
                Buffer.prototype.writeDoubleBE = function(value, offset, noAssert) {
                    _writeDouble(this, value, offset, false, noAssert);
                };
                Buffer.prototype.fill = function(value, start, end) {
                    if (!value) value = 0;
                    if (!start) start = 0;
                    if (!end) end = this.length;
                    if (typeof value === "string") {
                        value = value.charCodeAt(0);
                    }
                    assert(typeof value === "number" && !isNaN(value), "value is not a number");
                    assert(end >= start, "end < start");
                    if (end === start) return;
                    if (this.length === 0) return;
                    assert(start >= 0 && start < this.length, "start out of bounds");
                    assert(end >= 0 && end <= this.length, "end out of bounds");
                    for (var i = start; i < end; i++) {
                        this[i] = value;
                    }
                };
                Buffer.prototype.inspect = function() {
                    var out = [];
                    var len = this.length;
                    for (var i = 0; i < len; i++) {
                        out[i] = toHex(this[i]);
                        if (i === exports.INSPECT_MAX_BYTES) {
                            out[i + 1] = "...";
                            break;
                        }
                    }
                    return "<Buffer " + out.join(" ") + ">";
                };
                Buffer.prototype.toArrayBuffer = function() {
                    if (typeof Uint8Array === "function") {
                        if (Buffer._useTypedArrays) {
                            return new Buffer(this).buffer;
                        } else {
                            var buf = new Uint8Array(this.length);
                            for (var i = 0, len = buf.length; i < len; i += 1) buf[i] = this[i];
                            return buf.buffer;
                        }
                    } else {
                        throw new Error("Buffer.toArrayBuffer not supported in this browser");
                    }
                };
                function stringtrim(str) {
                    if (str.trim) return str.trim();
                    return str.replace(/^\s+|\s+$/g, "");
                }
                var BP = Buffer.prototype;
                function augment(arr) {
                    arr._isBuffer = true;
                    arr._get = arr.get;
                    arr._set = arr.set;
                    arr.get = BP.get;
                    arr.set = BP.set;
                    arr.write = BP.write;
                    arr.toString = BP.toString;
                    arr.toLocaleString = BP.toString;
                    arr.toJSON = BP.toJSON;
                    arr.copy = BP.copy;
                    arr.slice = BP.slice;
                    arr.readUInt8 = BP.readUInt8;
                    arr.readUInt16LE = BP.readUInt16LE;
                    arr.readUInt16BE = BP.readUInt16BE;
                    arr.readUInt32LE = BP.readUInt32LE;
                    arr.readUInt32BE = BP.readUInt32BE;
                    arr.readInt8 = BP.readInt8;
                    arr.readInt16LE = BP.readInt16LE;
                    arr.readInt16BE = BP.readInt16BE;
                    arr.readInt32LE = BP.readInt32LE;
                    arr.readInt32BE = BP.readInt32BE;
                    arr.readFloatLE = BP.readFloatLE;
                    arr.readFloatBE = BP.readFloatBE;
                    arr.readDoubleLE = BP.readDoubleLE;
                    arr.readDoubleBE = BP.readDoubleBE;
                    arr.writeUInt8 = BP.writeUInt8;
                    arr.writeUInt16LE = BP.writeUInt16LE;
                    arr.writeUInt16BE = BP.writeUInt16BE;
                    arr.writeUInt32LE = BP.writeUInt32LE;
                    arr.writeUInt32BE = BP.writeUInt32BE;
                    arr.writeInt8 = BP.writeInt8;
                    arr.writeInt16LE = BP.writeInt16LE;
                    arr.writeInt16BE = BP.writeInt16BE;
                    arr.writeInt32LE = BP.writeInt32LE;
                    arr.writeInt32BE = BP.writeInt32BE;
                    arr.writeFloatLE = BP.writeFloatLE;
                    arr.writeFloatBE = BP.writeFloatBE;
                    arr.writeDoubleLE = BP.writeDoubleLE;
                    arr.writeDoubleBE = BP.writeDoubleBE;
                    arr.fill = BP.fill;
                    arr.inspect = BP.inspect;
                    arr.toArrayBuffer = BP.toArrayBuffer;
                    return arr;
                }
                function clamp(index, len, defaultValue) {
                    if (typeof index !== "number") return defaultValue;
                    index = ~~index;
                    if (index >= len) return len;
                    if (index >= 0) return index;
                    index += len;
                    if (index >= 0) return index;
                    return 0;
                }
                function coerce(length) {
                    length = ~~Math.ceil(+length);
                    return length < 0 ? 0 : length;
                }
                function isArray(subject) {
                    return (Array.isArray || function(subject) {
                        return Object.prototype.toString.call(subject) === "[object Array]";
                    })(subject);
                }
                function isArrayish(subject) {
                    return isArray(subject) || Buffer.isBuffer(subject) || subject && typeof subject === "object" && typeof subject.length === "number";
                }
                function toHex(n) {
                    if (n < 16) return "0" + n.toString(16);
                    return n.toString(16);
                }
                function utf8ToBytes(str) {
                    var byteArray = [];
                    for (var i = 0; i < str.length; i++) {
                        var b = str.charCodeAt(i);
                        if (b <= 127) byteArray.push(str.charCodeAt(i)); else {
                            var start = i;
                            if (b >= 55296 && b <= 57343) i++;
                            var h = encodeURIComponent(str.slice(start, i + 1)).substr(1).split("%");
                            for (var j = 0; j < h.length; j++) byteArray.push(parseInt(h[j], 16));
                        }
                    }
                    return byteArray;
                }
                function asciiToBytes(str) {
                    var byteArray = [];
                    for (var i = 0; i < str.length; i++) {
                        byteArray.push(str.charCodeAt(i) & 255);
                    }
                    return byteArray;
                }
                function utf16leToBytes(str) {
                    var c, hi, lo;
                    var byteArray = [];
                    for (var i = 0; i < str.length; i++) {
                        c = str.charCodeAt(i);
                        hi = c >> 8;
                        lo = c % 256;
                        byteArray.push(lo);
                        byteArray.push(hi);
                    }
                    return byteArray;
                }
                function base64ToBytes(str) {
                    return base64.toByteArray(str);
                }
                function blitBuffer(src, dst, offset, length) {
                    var pos;
                    for (var i = 0; i < length; i++) {
                        if (i + offset >= dst.length || i >= src.length) break;
                        dst[i + offset] = src[i];
                    }
                    return i;
                }
                function decodeUtf8Char(str) {
                    try {
                        return decodeURIComponent(str);
                    } catch (err) {
                        return String.fromCharCode(65533);
                    }
                }
                function verifuint(value, max) {
                    assert(typeof value === "number", "cannot write a non-number as a number");
                    assert(value >= 0, "specified a negative value for writing an unsigned value");
                    assert(value <= max, "value is larger than maximum value for type");
                    assert(Math.floor(value) === value, "value has a fractional component");
                }
                function verifsint(value, max, min) {
                    assert(typeof value === "number", "cannot write a non-number as a number");
                    assert(value <= max, "value larger than maximum allowed value");
                    assert(value >= min, "value smaller than minimum allowed value");
                    assert(Math.floor(value) === value, "value has a fractional component");
                }
                function verifIEEE754(value, max, min) {
                    assert(typeof value === "number", "cannot write a non-number as a number");
                    assert(value <= max, "value larger than maximum allowed value");
                    assert(value >= min, "value smaller than minimum allowed value");
                }
                function assert(test, message) {
                    if (!test) throw new Error(message || "Failed assertion");
                }
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../node_modules/grunt-browserify/node_modules/browserify/node_modules/buffer/index.js", "/../node_modules/grunt-browserify/node_modules/browserify/node_modules/buffer");
        }, {
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            "base64-js": 2,
            buffer: 1,
            ieee754: 3
        } ],
        2: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                var lookup = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
                (function(exports) {
                    "use strict";
                    var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
                    var ZERO = "0".charCodeAt(0);
                    var PLUS = "+".charCodeAt(0);
                    var SLASH = "/".charCodeAt(0);
                    var NUMBER = "0".charCodeAt(0);
                    var LOWER = "a".charCodeAt(0);
                    var UPPER = "A".charCodeAt(0);
                    function decode(elt) {
                        var code = elt.charCodeAt(0);
                        if (code === PLUS) return 62;
                        if (code === SLASH) return 63;
                        if (code < NUMBER) return -1;
                        if (code < NUMBER + 10) return code - NUMBER + 26 + 26;
                        if (code < UPPER + 26) return code - UPPER;
                        if (code < LOWER + 26) return code - LOWER + 26;
                    }
                    function b64ToByteArray(b64) {
                        var i, j, l, tmp, placeHolders, arr;
                        if (b64.length % 4 > 0) {
                            throw new Error("Invalid string. Length must be a multiple of 4");
                        }
                        var len = b64.length;
                        placeHolders = "=" === b64.charAt(len - 2) ? 2 : "=" === b64.charAt(len - 1) ? 1 : 0;
                        arr = new Arr(b64.length * 3 / 4 - placeHolders);
                        l = placeHolders > 0 ? b64.length - 4 : b64.length;
                        var L = 0;
                        function push(v) {
                            arr[L++] = v;
                        }
                        for (i = 0, j = 0; i < l; i += 4, j += 3) {
                            tmp = decode(b64.charAt(i)) << 18 | decode(b64.charAt(i + 1)) << 12 | decode(b64.charAt(i + 2)) << 6 | decode(b64.charAt(i + 3));
                            push((tmp & 16711680) >> 16);
                            push((tmp & 65280) >> 8);
                            push(tmp & 255);
                        }
                        if (placeHolders === 2) {
                            tmp = decode(b64.charAt(i)) << 2 | decode(b64.charAt(i + 1)) >> 4;
                            push(tmp & 255);
                        } else if (placeHolders === 1) {
                            tmp = decode(b64.charAt(i)) << 10 | decode(b64.charAt(i + 1)) << 4 | decode(b64.charAt(i + 2)) >> 2;
                            push(tmp >> 8 & 255);
                            push(tmp & 255);
                        }
                        return arr;
                    }
                    function uint8ToBase64(uint8) {
                        var i, extraBytes = uint8.length % 3, output = "", temp, length;
                        function encode(num) {
                            return lookup.charAt(num);
                        }
                        function tripletToBase64(num) {
                            return encode(num >> 18 & 63) + encode(num >> 12 & 63) + encode(num >> 6 & 63) + encode(num & 63);
                        }
                        for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
                            temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
                            output += tripletToBase64(temp);
                        }
                        switch (extraBytes) {
                          case 1:
                            temp = uint8[uint8.length - 1];
                            output += encode(temp >> 2);
                            output += encode(temp << 4 & 63);
                            output += "==";
                            break;

                          case 2:
                            temp = (uint8[uint8.length - 2] << 8) + uint8[uint8.length - 1];
                            output += encode(temp >> 10);
                            output += encode(temp >> 4 & 63);
                            output += encode(temp << 2 & 63);
                            output += "=";
                            break;
                        }
                        return output;
                    }
                    module.exports.toByteArray = b64ToByteArray;
                    module.exports.fromByteArray = uint8ToBase64;
                })();
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../node_modules/grunt-browserify/node_modules/browserify/node_modules/buffer/node_modules/base64-js/lib/b64.js", "/../node_modules/grunt-browserify/node_modules/browserify/node_modules/buffer/node_modules/base64-js/lib");
        }, {
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1
        } ],
        3: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                exports.read = function(buffer, offset, isLE, mLen, nBytes) {
                    var e, m, eLen = nBytes * 8 - mLen - 1, eMax = (1 << eLen) - 1, eBias = eMax >> 1, nBits = -7, i = isLE ? nBytes - 1 : 0, d = isLE ? -1 : 1, s = buffer[offset + i];
                    i += d;
                    e = s & (1 << -nBits) - 1;
                    s >>= -nBits;
                    nBits += eLen;
                    for (;nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) ;
                    m = e & (1 << -nBits) - 1;
                    e >>= -nBits;
                    nBits += mLen;
                    for (;nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) ;
                    if (e === 0) {
                        e = 1 - eBias;
                    } else if (e === eMax) {
                        return m ? NaN : (s ? -1 : 1) * Infinity;
                    } else {
                        m = m + Math.pow(2, mLen);
                        e = e - eBias;
                    }
                    return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
                };
                exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
                    var e, m, c, eLen = nBytes * 8 - mLen - 1, eMax = (1 << eLen) - 1, eBias = eMax >> 1, rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, i = isLE ? 0 : nBytes - 1, d = isLE ? 1 : -1, s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
                    value = Math.abs(value);
                    if (isNaN(value) || value === Infinity) {
                        m = isNaN(value) ? 1 : 0;
                        e = eMax;
                    } else {
                        e = Math.floor(Math.log(value) / Math.LN2);
                        if (value * (c = Math.pow(2, -e)) < 1) {
                            e--;
                            c *= 2;
                        }
                        if (e + eBias >= 1) {
                            value += rt / c;
                        } else {
                            value += rt * Math.pow(2, 1 - eBias);
                        }
                        if (value * c >= 2) {
                            e++;
                            c /= 2;
                        }
                        if (e + eBias >= eMax) {
                            m = 0;
                            e = eMax;
                        } else if (e + eBias >= 1) {
                            m = (value * c - 1) * Math.pow(2, mLen);
                            e = e + eBias;
                        } else {
                            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
                            e = 0;
                        }
                    }
                    for (;mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) ;
                    e = e << mLen | m;
                    eLen += mLen;
                    for (;eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) ;
                    buffer[offset + i - d] |= s * 128;
                };
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../node_modules/grunt-browserify/node_modules/browserify/node_modules/buffer/node_modules/ieee754/index.js", "/../node_modules/grunt-browserify/node_modules/browserify/node_modules/buffer/node_modules/ieee754");
        }, {
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1
        } ],
        4: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                var process = module.exports = {};
                process.nextTick = function() {
                    var canSetImmediate = typeof window !== "undefined" && window.setImmediate;
                    var canPost = typeof window !== "undefined" && window.postMessage && window.addEventListener;
                    if (canSetImmediate) {
                        return function(f) {
                            return window.setImmediate(f);
                        };
                    }
                    if (canPost) {
                        var queue = [];
                        window.addEventListener("message", function(ev) {
                            var source = ev.source;
                            if ((source === window || source === null) && ev.data === "process-tick") {
                                ev.stopPropagation();
                                if (queue.length > 0) {
                                    var fn = queue.shift();
                                    fn();
                                }
                            }
                        }, true);
                        return function nextTick(fn) {
                            queue.push(fn);
                            window.postMessage("process-tick", "*");
                        };
                    }
                    return function nextTick(fn) {
                        setTimeout(fn, 0);
                    };
                }();
                process.title = "browser";
                process.browser = true;
                process.env = {};
                process.argv = [];
                function noop() {}
                process.on = noop;
                process.once = noop;
                process.off = noop;
                process.emit = noop;
                process.binding = function(name) {
                    throw new Error("process.binding is not supported");
                };
                process.cwd = function() {
                    return "/";
                };
                process.chdir = function(dir) {
                    throw new Error("process.chdir is not supported");
                };
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js", "/../node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process");
        }, {
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1
        } ],
        5: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                var Scalar = _dereq_("./Scalar");
                module.exports = Line;
                function Line() {}
                Line.lineInt = function(l1, l2, precision) {
                    precision = precision || 0;
                    var i = [ 0, 0 ];
                    var a1, b1, c1, a2, b2, c2, det;
                    a1 = l1[1][1] - l1[0][1];
                    b1 = l1[0][0] - l1[1][0];
                    c1 = a1 * l1[0][0] + b1 * l1[0][1];
                    a2 = l2[1][1] - l2[0][1];
                    b2 = l2[0][0] - l2[1][0];
                    c2 = a2 * l2[0][0] + b2 * l2[0][1];
                    det = a1 * b2 - a2 * b1;
                    if (!Scalar.eq(det, 0, precision)) {
                        i[0] = (b2 * c1 - b1 * c2) / det;
                        i[1] = (a1 * c2 - a2 * c1) / det;
                    }
                    return i;
                };
                Line.segmentsIntersect = function(p1, p2, q1, q2) {
                    var dx = p2[0] - p1[0];
                    var dy = p2[1] - p1[1];
                    var da = q2[0] - q1[0];
                    var db = q2[1] - q1[1];
                    if (da * dy - db * dx == 0) return false;
                    var s = (dx * (q1[1] - p1[1]) + dy * (p1[0] - q1[0])) / (da * dy - db * dx);
                    var t = (da * (p1[1] - q1[1]) + db * (q1[0] - p1[0])) / (db * dx - da * dy);
                    return s >= 0 && s <= 1 && t >= 0 && t <= 1;
                };
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../node_modules/poly-decomp/src/Line.js", "/../node_modules/poly-decomp/src");
        }, {
            "./Scalar": 8,
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1
        } ],
        6: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                module.exports = Point;
                function Point() {}
                Point.area = function(a, b, c) {
                    return (b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1]);
                };
                Point.left = function(a, b, c) {
                    return Point.area(a, b, c) > 0;
                };
                Point.leftOn = function(a, b, c) {
                    return Point.area(a, b, c) >= 0;
                };
                Point.right = function(a, b, c) {
                    return Point.area(a, b, c) < 0;
                };
                Point.rightOn = function(a, b, c) {
                    return Point.area(a, b, c) <= 0;
                };
                var tmpPoint1 = [], tmpPoint2 = [];
                Point.collinear = function(a, b, c, thresholdAngle) {
                    if (!thresholdAngle) return Point.area(a, b, c) == 0; else {
                        var ab = tmpPoint1, bc = tmpPoint2;
                        ab[0] = b[0] - a[0];
                        ab[1] = b[1] - a[1];
                        bc[0] = c[0] - b[0];
                        bc[1] = c[1] - b[1];
                        var dot = ab[0] * bc[0] + ab[1] * bc[1], magA = Math.sqrt(ab[0] * ab[0] + ab[1] * ab[1]), magB = Math.sqrt(bc[0] * bc[0] + bc[1] * bc[1]), angle = Math.acos(dot / (magA * magB));
                        return angle < thresholdAngle;
                    }
                };
                Point.sqdist = function(a, b) {
                    var dx = b[0] - a[0];
                    var dy = b[1] - a[1];
                    return dx * dx + dy * dy;
                };
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../node_modules/poly-decomp/src/Point.js", "/../node_modules/poly-decomp/src");
        }, {
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1
        } ],
        7: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                var Line = _dereq_("./Line"), Point = _dereq_("./Point"), Scalar = _dereq_("./Scalar");
                module.exports = Polygon;
                function Polygon() {
                    this.vertices = [];
                }
                Polygon.prototype.at = function(i) {
                    var v = this.vertices, s = v.length;
                    return v[i < 0 ? i % s + s : i % s];
                };
                Polygon.prototype.first = function() {
                    return this.vertices[0];
                };
                Polygon.prototype.last = function() {
                    return this.vertices[this.vertices.length - 1];
                };
                Polygon.prototype.clear = function() {
                    this.vertices.length = 0;
                };
                Polygon.prototype.append = function(poly, from, to) {
                    if (typeof from == "undefined") throw new Error("From is not given!");
                    if (typeof to == "undefined") throw new Error("To is not given!");
                    if (to - 1 < from) throw new Error("lol1");
                    if (to > poly.vertices.length) throw new Error("lol2");
                    if (from < 0) throw new Error("lol3");
                    for (var i = from; i < to; i++) {
                        this.vertices.push(poly.vertices[i]);
                    }
                };
                Polygon.prototype.makeCCW = function() {
                    var br = 0, v = this.vertices;
                    for (var i = 1; i < this.vertices.length; ++i) {
                        if (v[i][1] < v[br][1] || v[i][1] == v[br][1] && v[i][0] > v[br][0]) {
                            br = i;
                        }
                    }
                    if (!Point.left(this.at(br - 1), this.at(br), this.at(br + 1))) {
                        this.reverse();
                    }
                };
                Polygon.prototype.reverse = function() {
                    var tmp = [];
                    for (var i = 0, N = this.vertices.length; i !== N; i++) {
                        tmp.push(this.vertices.pop());
                    }
                    this.vertices = tmp;
                };
                Polygon.prototype.isReflex = function(i) {
                    return Point.right(this.at(i - 1), this.at(i), this.at(i + 1));
                };
                var tmpLine1 = [], tmpLine2 = [];
                Polygon.prototype.canSee = function(a, b) {
                    var p, dist, l1 = tmpLine1, l2 = tmpLine2;
                    if (Point.leftOn(this.at(a + 1), this.at(a), this.at(b)) && Point.rightOn(this.at(a - 1), this.at(a), this.at(b))) {
                        return false;
                    }
                    dist = Point.sqdist(this.at(a), this.at(b));
                    for (var i = 0; i !== this.vertices.length; ++i) {
                        if ((i + 1) % this.vertices.length === a || i === a) continue;
                        if (Point.leftOn(this.at(a), this.at(b), this.at(i + 1)) && Point.rightOn(this.at(a), this.at(b), this.at(i))) {
                            l1[0] = this.at(a);
                            l1[1] = this.at(b);
                            l2[0] = this.at(i);
                            l2[1] = this.at(i + 1);
                            p = Line.lineInt(l1, l2);
                            if (Point.sqdist(this.at(a), p) < dist) {
                                return false;
                            }
                        }
                    }
                    return true;
                };
                Polygon.prototype.copy = function(i, j, targetPoly) {
                    var p = targetPoly || new Polygon();
                    p.clear();
                    if (i < j) {
                        for (var k = i; k <= j; k++) p.vertices.push(this.vertices[k]);
                    } else {
                        for (var k = 0; k <= j; k++) p.vertices.push(this.vertices[k]);
                        for (var k = i; k < this.vertices.length; k++) p.vertices.push(this.vertices[k]);
                    }
                    return p;
                };
                Polygon.prototype.getCutEdges = function() {
                    var min = [], tmp1 = [], tmp2 = [], tmpPoly = new Polygon();
                    var nDiags = Number.MAX_VALUE;
                    for (var i = 0; i < this.vertices.length; ++i) {
                        if (this.isReflex(i)) {
                            for (var j = 0; j < this.vertices.length; ++j) {
                                if (this.canSee(i, j)) {
                                    tmp1 = this.copy(i, j, tmpPoly).getCutEdges();
                                    tmp2 = this.copy(j, i, tmpPoly).getCutEdges();
                                    for (var k = 0; k < tmp2.length; k++) tmp1.push(tmp2[k]);
                                    if (tmp1.length < nDiags) {
                                        min = tmp1;
                                        nDiags = tmp1.length;
                                        min.push([ this.at(i), this.at(j) ]);
                                    }
                                }
                            }
                        }
                    }
                    return min;
                };
                Polygon.prototype.decomp = function() {
                    var edges = this.getCutEdges();
                    if (edges.length > 0) return this.slice(edges); else return [ this ];
                };
                Polygon.prototype.slice = function(cutEdges) {
                    if (cutEdges.length == 0) return [ this ];
                    if (cutEdges instanceof Array && cutEdges.length && cutEdges[0] instanceof Array && cutEdges[0].length == 2 && cutEdges[0][0] instanceof Array) {
                        var polys = [ this ];
                        for (var i = 0; i < cutEdges.length; i++) {
                            var cutEdge = cutEdges[i];
                            for (var j = 0; j < polys.length; j++) {
                                var poly = polys[j];
                                var result = poly.slice(cutEdge);
                                if (result) {
                                    polys.splice(j, 1);
                                    polys.push(result[0], result[1]);
                                    break;
                                }
                            }
                        }
                        return polys;
                    } else {
                        var cutEdge = cutEdges;
                        var i = this.vertices.indexOf(cutEdge[0]);
                        var j = this.vertices.indexOf(cutEdge[1]);
                        if (i != -1 && j != -1) {
                            return [ this.copy(i, j), this.copy(j, i) ];
                        } else {
                            return false;
                        }
                    }
                };
                Polygon.prototype.isSimple = function() {
                    var path = this.vertices;
                    for (var i = 0; i < path.length - 1; i++) {
                        for (var j = 0; j < i - 1; j++) {
                            if (Line.segmentsIntersect(path[i], path[i + 1], path[j], path[j + 1])) {
                                return false;
                            }
                        }
                    }
                    for (var i = 1; i < path.length - 2; i++) {
                        if (Line.segmentsIntersect(path[0], path[path.length - 1], path[i], path[i + 1])) {
                            return false;
                        }
                    }
                    return true;
                };
                function getIntersectionPoint(p1, p2, q1, q2, delta) {
                    delta = delta || 0;
                    var a1 = p2[1] - p1[1];
                    var b1 = p1[0] - p2[0];
                    var c1 = a1 * p1[0] + b1 * p1[1];
                    var a2 = q2[1] - q1[1];
                    var b2 = q1[0] - q2[0];
                    var c2 = a2 * q1[0] + b2 * q1[1];
                    var det = a1 * b2 - a2 * b1;
                    if (!Scalar.eq(det, 0, delta)) return [ (b2 * c1 - b1 * c2) / det, (a1 * c2 - a2 * c1) / det ]; else return [ 0, 0 ];
                }
                Polygon.prototype.quickDecomp = function(result, reflexVertices, steinerPoints, delta, maxlevel, level) {
                    maxlevel = maxlevel || 100;
                    level = level || 0;
                    delta = delta || 25;
                    result = typeof result != "undefined" ? result : [];
                    reflexVertices = reflexVertices || [];
                    steinerPoints = steinerPoints || [];
                    var upperInt = [ 0, 0 ], lowerInt = [ 0, 0 ], p = [ 0, 0 ];
                    var upperDist = 0, lowerDist = 0, d = 0, closestDist = 0;
                    var upperIndex = 0, lowerIndex = 0, closestIndex = 0;
                    var lowerPoly = new Polygon(), upperPoly = new Polygon();
                    var poly = this, v = this.vertices;
                    if (v.length < 3) return result;
                    level++;
                    if (level > maxlevel) {
                        console.warn("quickDecomp: max level (" + maxlevel + ") reached.");
                        return result;
                    }
                    for (var i = 0; i < this.vertices.length; ++i) {
                        if (poly.isReflex(i)) {
                            reflexVertices.push(poly.vertices[i]);
                            upperDist = lowerDist = Number.MAX_VALUE;
                            for (var j = 0; j < this.vertices.length; ++j) {
                                if (Point.left(poly.at(i - 1), poly.at(i), poly.at(j)) && Point.rightOn(poly.at(i - 1), poly.at(i), poly.at(j - 1))) {
                                    p = getIntersectionPoint(poly.at(i - 1), poly.at(i), poly.at(j), poly.at(j - 1));
                                    if (Point.right(poly.at(i + 1), poly.at(i), p)) {
                                        d = Point.sqdist(poly.vertices[i], p);
                                        if (d < lowerDist) {
                                            lowerDist = d;
                                            lowerInt = p;
                                            lowerIndex = j;
                                        }
                                    }
                                }
                                if (Point.left(poly.at(i + 1), poly.at(i), poly.at(j + 1)) && Point.rightOn(poly.at(i + 1), poly.at(i), poly.at(j))) {
                                    p = getIntersectionPoint(poly.at(i + 1), poly.at(i), poly.at(j), poly.at(j + 1));
                                    if (Point.left(poly.at(i - 1), poly.at(i), p)) {
                                        d = Point.sqdist(poly.vertices[i], p);
                                        if (d < upperDist) {
                                            upperDist = d;
                                            upperInt = p;
                                            upperIndex = j;
                                        }
                                    }
                                }
                            }
                            if (lowerIndex == (upperIndex + 1) % this.vertices.length) {
                                p[0] = (lowerInt[0] + upperInt[0]) / 2;
                                p[1] = (lowerInt[1] + upperInt[1]) / 2;
                                steinerPoints.push(p);
                                if (i < upperIndex) {
                                    lowerPoly.append(poly, i, upperIndex + 1);
                                    lowerPoly.vertices.push(p);
                                    upperPoly.vertices.push(p);
                                    if (lowerIndex != 0) {
                                        upperPoly.append(poly, lowerIndex, poly.vertices.length);
                                    }
                                    upperPoly.append(poly, 0, i + 1);
                                } else {
                                    if (i != 0) {
                                        lowerPoly.append(poly, i, poly.vertices.length);
                                    }
                                    lowerPoly.append(poly, 0, upperIndex + 1);
                                    lowerPoly.vertices.push(p);
                                    upperPoly.vertices.push(p);
                                    upperPoly.append(poly, lowerIndex, i + 1);
                                }
                            } else {
                                if (lowerIndex > upperIndex) {
                                    upperIndex += this.vertices.length;
                                }
                                closestDist = Number.MAX_VALUE;
                                if (upperIndex < lowerIndex) {
                                    return result;
                                }
                                for (var j = lowerIndex; j <= upperIndex; ++j) {
                                    if (Point.leftOn(poly.at(i - 1), poly.at(i), poly.at(j)) && Point.rightOn(poly.at(i + 1), poly.at(i), poly.at(j))) {
                                        d = Point.sqdist(poly.at(i), poly.at(j));
                                        if (d < closestDist) {
                                            closestDist = d;
                                            closestIndex = j % this.vertices.length;
                                        }
                                    }
                                }
                                if (i < closestIndex) {
                                    lowerPoly.append(poly, i, closestIndex + 1);
                                    if (closestIndex != 0) {
                                        upperPoly.append(poly, closestIndex, v.length);
                                    }
                                    upperPoly.append(poly, 0, i + 1);
                                } else {
                                    if (i != 0) {
                                        lowerPoly.append(poly, i, v.length);
                                    }
                                    lowerPoly.append(poly, 0, closestIndex + 1);
                                    upperPoly.append(poly, closestIndex, i + 1);
                                }
                            }
                            if (lowerPoly.vertices.length < upperPoly.vertices.length) {
                                lowerPoly.quickDecomp(result, reflexVertices, steinerPoints, delta, maxlevel, level);
                                upperPoly.quickDecomp(result, reflexVertices, steinerPoints, delta, maxlevel, level);
                            } else {
                                upperPoly.quickDecomp(result, reflexVertices, steinerPoints, delta, maxlevel, level);
                                lowerPoly.quickDecomp(result, reflexVertices, steinerPoints, delta, maxlevel, level);
                            }
                            return result;
                        }
                    }
                    result.push(this);
                    return result;
                };
                Polygon.prototype.removeCollinearPoints = function(precision) {
                    var num = 0;
                    for (var i = this.vertices.length - 1; this.vertices.length > 3 && i >= 0; --i) {
                        if (Point.collinear(this.at(i - 1), this.at(i), this.at(i + 1), precision)) {
                            this.vertices.splice(i % this.vertices.length, 1);
                            i--;
                            num++;
                        }
                    }
                    return num;
                };
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../node_modules/poly-decomp/src/Polygon.js", "/../node_modules/poly-decomp/src");
        }, {
            "./Line": 5,
            "./Point": 6,
            "./Scalar": 8,
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1
        } ],
        8: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                module.exports = Scalar;
                function Scalar() {}
                Scalar.eq = function(a, b, precision) {
                    precision = precision || 0;
                    return Math.abs(a - b) < precision;
                };
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../node_modules/poly-decomp/src/Scalar.js", "/../node_modules/poly-decomp/src");
        }, {
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1
        } ],
        9: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                module.exports = {
                    Polygon: _dereq_("./Polygon"),
                    Point: _dereq_("./Point")
                };
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../node_modules/poly-decomp/src/index.js", "/../node_modules/poly-decomp/src");
        }, {
            "./Point": 6,
            "./Polygon": 7,
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1
        } ],
        10: [ function(_dereq_, module, exports) {
            module.exports = {
                name: "p2",
                version: "0.6.0",
                description: "A JavaScript 2D physics engine.",
                author: "Stefan Hedman <schteppe@gmail.com> (http://steffe.se)",
                keywords: [ "p2.js", "p2", "physics", "engine", "2d" ],
                main: "./src/p2.js",
                engines: {
                    node: "*"
                },
                repository: {
                    type: "git",
                    url: "https://github.com/schteppe/p2.js.git"
                },
                bugs: {
                    url: "https://github.com/schteppe/p2.js/issues"
                },
                licenses: [ {
                    type: "MIT"
                } ],
                devDependencies: {
                    grunt: "~0.4.0",
                    "grunt-contrib-jshint": "~0.9.2",
                    "grunt-contrib-nodeunit": "~0.1.2",
                    "grunt-contrib-uglify": "~0.4.0",
                    "grunt-contrib-watch": "~0.5.0",
                    "grunt-browserify": "~2.0.1",
                    "grunt-contrib-concat": "^0.4.0"
                },
                dependencies: {
                    "poly-decomp": "0.1.0"
                }
            };
        }, {} ],
        11: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                var vec2 = _dereq_("../math/vec2"), Utils = _dereq_("../utils/Utils");
                module.exports = AABB;
                function AABB(options) {
                    this.lowerBound = vec2.create();
                    if (options && options.lowerBound) {
                        vec2.copy(this.lowerBound, options.lowerBound);
                    }
                    this.upperBound = vec2.create();
                    if (options && options.upperBound) {
                        vec2.copy(this.upperBound, options.upperBound);
                    }
                }
                var tmp = vec2.create();
                AABB.prototype.setFromPoints = function(points, position, angle, skinSize) {
                    var l = this.lowerBound, u = this.upperBound;
                    if (typeof angle !== "number") {
                        angle = 0;
                    }
                    if (angle !== 0) {
                        vec2.rotate(l, points[0], angle);
                    } else {
                        vec2.copy(l, points[0]);
                    }
                    vec2.copy(u, l);
                    var cosAngle = Math.cos(angle), sinAngle = Math.sin(angle);
                    for (var i = 1; i < points.length; i++) {
                        var p = points[i];
                        if (angle !== 0) {
                            var x = p[0], y = p[1];
                            tmp[0] = cosAngle * x - sinAngle * y;
                            tmp[1] = sinAngle * x + cosAngle * y;
                            p = tmp;
                        }
                        for (var j = 0; j < 2; j++) {
                            if (p[j] > u[j]) {
                                u[j] = p[j];
                            }
                            if (p[j] < l[j]) {
                                l[j] = p[j];
                            }
                        }
                    }
                    if (position) {
                        vec2.add(this.lowerBound, this.lowerBound, position);
                        vec2.add(this.upperBound, this.upperBound, position);
                    }
                    if (skinSize) {
                        this.lowerBound[0] -= skinSize;
                        this.lowerBound[1] -= skinSize;
                        this.upperBound[0] += skinSize;
                        this.upperBound[1] += skinSize;
                    }
                };
                AABB.prototype.copy = function(aabb) {
                    vec2.copy(this.lowerBound, aabb.lowerBound);
                    vec2.copy(this.upperBound, aabb.upperBound);
                };
                AABB.prototype.extend = function(aabb) {
                    var i = 2;
                    while (i--) {
                        var l = aabb.lowerBound[i];
                        if (this.lowerBound[i] > l) {
                            this.lowerBound[i] = l;
                        }
                        var u = aabb.upperBound[i];
                        if (this.upperBound[i] < u) {
                            this.upperBound[i] = u;
                        }
                    }
                };
                AABB.prototype.overlaps = function(aabb) {
                    var l1 = this.lowerBound, u1 = this.upperBound, l2 = aabb.lowerBound, u2 = aabb.upperBound;
                    return (l2[0] <= u1[0] && u1[0] <= u2[0] || l1[0] <= u2[0] && u2[0] <= u1[0]) && (l2[1] <= u1[1] && u1[1] <= u2[1] || l1[1] <= u2[1] && u2[1] <= u1[1]);
                };
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/collision/AABB.js", "/collision");
        }, {
            "../math/vec2": 33,
            "../utils/Utils": 52,
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1
        } ],
        12: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                var vec2 = _dereq_("../math/vec2");
                var Body = _dereq_("../objects/Body");
                module.exports = Broadphase;
                function Broadphase(type) {
                    this.type = type;
                    this.result = [];
                    this.world = null;
                    this.boundingVolumeType = Broadphase.AABB;
                }
                Broadphase.AABB = 1;
                Broadphase.BOUNDING_CIRCLE = 2;
                Broadphase.prototype.setWorld = function(world) {
                    this.world = world;
                };
                Broadphase.prototype.getCollisionPairs = function(world) {
                    throw new Error("getCollisionPairs must be implemented in a subclass!");
                };
                var dist = vec2.create();
                Broadphase.boundingRadiusCheck = function(bodyA, bodyB) {
                    vec2.sub(dist, bodyA.position, bodyB.position);
                    var d2 = vec2.squaredLength(dist), r = bodyA.boundingRadius + bodyB.boundingRadius;
                    return d2 <= r * r;
                };
                Broadphase.aabbCheck = function(bodyA, bodyB) {
                    if (bodyA.aabbNeedsUpdate) {
                        bodyA.updateAABB();
                    }
                    if (bodyB.aabbNeedsUpdate) {
                        bodyB.updateAABB();
                    }
                    return bodyA.aabb.overlaps(bodyB.aabb);
                };
                Broadphase.prototype.boundingVolumeCheck = function(bodyA, bodyB) {
                    var result;
                    switch (this.boundingVolumeType) {
                      case Broadphase.BOUNDING_CIRCLE:
                        result = Broadphase.boundingRadiusCheck(bodyA, bodyB);
                        break;

                      case Broadphase.AABB:
                        result = Broadphase.aabbCheck(bodyA, bodyB);
                        break;

                      default:
                        throw new Error("Bounding volume type not recognized: " + this.boundingVolumeType);
                    }
                    return result;
                };
                Broadphase.canCollide = function(bodyA, bodyB) {
                    if (bodyA.type === Body.STATIC && bodyB.type === Body.STATIC) {
                        return false;
                    }
                    if (bodyA.type === Body.KINEMATIC && bodyB.type === Body.STATIC || bodyA.type === Body.STATIC && bodyB.type === Body.KINEMATIC) {
                        return false;
                    }
                    if (bodyA.type === Body.KINEMATIC && bodyB.type === Body.KINEMATIC) {
                        return false;
                    }
                    if (bodyA.sleepState === Body.SLEEPING && bodyB.sleepState === Body.SLEEPING) {
                        return false;
                    }
                    if (bodyA.sleepState === Body.SLEEPING && bodyB.type === Body.STATIC || bodyB.sleepState === Body.SLEEPING && bodyA.type === Body.STATIC) {
                        return false;
                    }
                    return true;
                };
                Broadphase.NAIVE = 1;
                Broadphase.SAP = 2;
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/collision/Broadphase.js", "/collision");
        }, {
            "../math/vec2": 33,
            "../objects/Body": 34,
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1
        } ],
        13: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                var Circle = _dereq_("../shapes/Circle"), Plane = _dereq_("../shapes/Plane"), Particle = _dereq_("../shapes/Particle"), Broadphase = _dereq_("../collision/Broadphase"), vec2 = _dereq_("../math/vec2"), Utils = _dereq_("../utils/Utils");
                module.exports = GridBroadphase;
                function GridBroadphase(options) {
                    Broadphase.apply(this);
                    options = Utils.defaults(options, {
                        xmin: -100,
                        xmax: 100,
                        ymin: -100,
                        ymax: 100,
                        nx: 10,
                        ny: 10
                    });
                    this.xmin = options.xmin;
                    this.ymin = options.ymin;
                    this.xmax = options.xmax;
                    this.ymax = options.ymax;
                    this.nx = options.nx;
                    this.ny = options.ny;
                    this.binsizeX = (this.xmax - this.xmin) / this.nx;
                    this.binsizeY = (this.ymax - this.ymin) / this.ny;
                }
                GridBroadphase.prototype = new Broadphase();
                GridBroadphase.prototype.getCollisionPairs = function(world) {
                    var result = [], bodies = world.bodies, Ncolliding = bodies.length, binsizeX = this.binsizeX, binsizeY = this.binsizeY, nx = this.nx, ny = this.ny, xmin = this.xmin, ymin = this.ymin, xmax = this.xmax, ymax = this.ymax;
                    var bins = [], Nbins = nx * ny;
                    for (var i = 0; i < Nbins; i++) {
                        bins.push([]);
                    }
                    var xmult = nx / (xmax - xmin);
                    var ymult = ny / (ymax - ymin);
                    for (var i = 0; i !== Ncolliding; i++) {
                        var bi = bodies[i];
                        var aabb = bi.aabb;
                        var lowerX = Math.max(aabb.lowerBound[0], xmin);
                        var lowerY = Math.max(aabb.lowerBound[1], ymin);
                        var upperX = Math.min(aabb.upperBound[0], xmax);
                        var upperY = Math.min(aabb.upperBound[1], ymax);
                        var xi1 = Math.floor(xmult * (lowerX - xmin));
                        var yi1 = Math.floor(ymult * (lowerY - ymin));
                        var xi2 = Math.floor(xmult * (upperX - xmin));
                        var yi2 = Math.floor(ymult * (upperY - ymin));
                        for (var j = xi1; j <= xi2; j++) {
                            for (var k = yi1; k <= yi2; k++) {
                                var xi = j;
                                var yi = k;
                                var idx = xi * (ny - 1) + yi;
                                if (idx >= 0 && idx < Nbins) {
                                    bins[idx].push(bi);
                                }
                            }
                        }
                    }
                    for (var i = 0; i !== Nbins; i++) {
                        var bin = bins[i];
                        for (var j = 0, NbodiesInBin = bin.length; j !== NbodiesInBin; j++) {
                            var bi = bin[j];
                            for (var k = 0; k !== j; k++) {
                                var bj = bin[k];
                                if (Broadphase.canCollide(bi, bj) && this.boundingVolumeCheck(bi, bj)) {
                                    result.push(bi, bj);
                                }
                            }
                        }
                    }
                    return result;
                };
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/collision/GridBroadphase.js", "/collision");
        }, {
            "../collision/Broadphase": 12,
            "../math/vec2": 33,
            "../shapes/Circle": 40,
            "../shapes/Particle": 44,
            "../shapes/Plane": 45,
            "../utils/Utils": 52,
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1
        } ],
        14: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                var Circle = _dereq_("../shapes/Circle"), Plane = _dereq_("../shapes/Plane"), Shape = _dereq_("../shapes/Shape"), Particle = _dereq_("../shapes/Particle"), Broadphase = _dereq_("../collision/Broadphase"), vec2 = _dereq_("../math/vec2");
                module.exports = NaiveBroadphase;
                function NaiveBroadphase() {
                    Broadphase.call(this, Broadphase.NAIVE);
                }
                NaiveBroadphase.prototype = new Broadphase();
                NaiveBroadphase.prototype.getCollisionPairs = function(world) {
                    var bodies = world.bodies, result = this.result;
                    result.length = 0;
                    for (var i = 0, Ncolliding = bodies.length; i !== Ncolliding; i++) {
                        var bi = bodies[i];
                        for (var j = 0; j < i; j++) {
                            var bj = bodies[j];
                            if (Broadphase.canCollide(bi, bj) && this.boundingVolumeCheck(bi, bj)) {
                                result.push(bi, bj);
                            }
                        }
                    }
                    return result;
                };
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/collision/NaiveBroadphase.js", "/collision");
        }, {
            "../collision/Broadphase": 12,
            "../math/vec2": 33,
            "../shapes/Circle": 40,
            "../shapes/Particle": 44,
            "../shapes/Plane": 45,
            "../shapes/Shape": 47,
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1
        } ],
        15: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                var vec2 = _dereq_("../math/vec2"), sub = vec2.sub, add = vec2.add, dot = vec2.dot, Utils = _dereq_("../utils/Utils"), TupleDictionary = _dereq_("../utils/TupleDictionary"), Equation = _dereq_("../equations/Equation"), ContactEquation = _dereq_("../equations/ContactEquation"), FrictionEquation = _dereq_("../equations/FrictionEquation"), Circle = _dereq_("../shapes/Circle"), Convex = _dereq_("../shapes/Convex"), Shape = _dereq_("../shapes/Shape"), Body = _dereq_("../objects/Body"), Rectangle = _dereq_("../shapes/Rectangle");
                module.exports = Narrowphase;
                var yAxis = vec2.fromValues(0, 1);
                var tmp1 = vec2.fromValues(0, 0), tmp2 = vec2.fromValues(0, 0), tmp3 = vec2.fromValues(0, 0), tmp4 = vec2.fromValues(0, 0), tmp5 = vec2.fromValues(0, 0), tmp6 = vec2.fromValues(0, 0), tmp7 = vec2.fromValues(0, 0), tmp8 = vec2.fromValues(0, 0), tmp9 = vec2.fromValues(0, 0), tmp10 = vec2.fromValues(0, 0), tmp11 = vec2.fromValues(0, 0), tmp12 = vec2.fromValues(0, 0), tmp13 = vec2.fromValues(0, 0), tmp14 = vec2.fromValues(0, 0), tmp15 = vec2.fromValues(0, 0), tmp16 = vec2.fromValues(0, 0), tmp17 = vec2.fromValues(0, 0), tmp18 = vec2.fromValues(0, 0), tmpArray = [];
                function Narrowphase() {
                    this.contactEquations = [];
                    this.frictionEquations = [];
                    this.enableFriction = true;
                    this.slipForce = 10;
                    this.frictionCoefficient = .3;
                    this.surfaceVelocity = 0;
                    this.reuseObjects = true;
                    this.reusableContactEquations = [];
                    this.reusableFrictionEquations = [];
                    this.restitution = 0;
                    this.stiffness = Equation.DEFAULT_STIFFNESS;
                    this.relaxation = Equation.DEFAULT_RELAXATION;
                    this.frictionStiffness = Equation.DEFAULT_STIFFNESS;
                    this.frictionRelaxation = Equation.DEFAULT_RELAXATION;
                    this.enableFrictionReduction = true;
                    this.collidingBodiesLastStep = new TupleDictionary();
                    this.contactSkinSize = .01;
                }
                Narrowphase.prototype.collidedLastStep = function(bodyA, bodyB) {
                    var id1 = bodyA.id | 0, id2 = bodyB.id | 0;
                    return !!this.collidingBodiesLastStep.get(id1, id2);
                };
                Narrowphase.prototype.reset = function() {
                    this.collidingBodiesLastStep.reset();
                    var eqs = this.contactEquations;
                    var l = eqs.length;
                    while (l--) {
                        var eq = eqs[l], id1 = eq.bodyA.id, id2 = eq.bodyB.id;
                        this.collidingBodiesLastStep.set(id1, id2, true);
                    }
                    if (this.reuseObjects) {
                        var ce = this.contactEquations, fe = this.frictionEquations, rfe = this.reusableFrictionEquations, rce = this.reusableContactEquations;
                        Utils.appendArray(rce, ce);
                        Utils.appendArray(rfe, fe);
                    }
                    this.contactEquations.length = this.frictionEquations.length = 0;
                };
                Narrowphase.prototype.createContactEquation = function(bodyA, bodyB, shapeA, shapeB) {
                    var c = this.reusableContactEquations.length ? this.reusableContactEquations.pop() : new ContactEquation(bodyA, bodyB);
                    c.bodyA = bodyA;
                    c.bodyB = bodyB;
                    c.shapeA = shapeA;
                    c.shapeB = shapeB;
                    c.restitution = this.restitution;
                    c.firstImpact = !this.collidedLastStep(bodyA, bodyB);
                    c.stiffness = this.stiffness;
                    c.relaxation = this.relaxation;
                    c.needsUpdate = true;
                    c.enabled = true;
                    c.offset = this.contactSkinSize;
                    return c;
                };
                Narrowphase.prototype.createFrictionEquation = function(bodyA, bodyB, shapeA, shapeB) {
                    var c = this.reusableFrictionEquations.length ? this.reusableFrictionEquations.pop() : new FrictionEquation(bodyA, bodyB);
                    c.bodyA = bodyA;
                    c.bodyB = bodyB;
                    c.shapeA = shapeA;
                    c.shapeB = shapeB;
                    c.setSlipForce(this.slipForce);
                    c.frictionCoefficient = this.frictionCoefficient;
                    c.relativeVelocity = this.surfaceVelocity;
                    c.enabled = true;
                    c.needsUpdate = true;
                    c.stiffness = this.frictionStiffness;
                    c.relaxation = this.frictionRelaxation;
                    c.contactEquations.length = 0;
                    return c;
                };
                Narrowphase.prototype.createFrictionFromContact = function(c) {
                    var eq = this.createFrictionEquation(c.bodyA, c.bodyB, c.shapeA, c.shapeB);
                    vec2.copy(eq.contactPointA, c.contactPointA);
                    vec2.copy(eq.contactPointB, c.contactPointB);
                    vec2.rotate90cw(eq.t, c.normalA);
                    eq.contactEquations.push(c);
                    return eq;
                };
                Narrowphase.prototype.createFrictionFromAverage = function(numContacts) {
                    if (!numContacts) {
                        throw new Error("numContacts == 0!");
                    }
                    var c = this.contactEquations[this.contactEquations.length - 1];
                    var eq = this.createFrictionEquation(c.bodyA, c.bodyB, c.shapeA, c.shapeB);
                    var bodyA = c.bodyA;
                    var bodyB = c.bodyB;
                    vec2.set(eq.contactPointA, 0, 0);
                    vec2.set(eq.contactPointB, 0, 0);
                    vec2.set(eq.t, 0, 0);
                    for (var i = 0; i !== numContacts; i++) {
                        c = this.contactEquations[this.contactEquations.length - 1 - i];
                        if (c.bodyA === bodyA) {
                            vec2.add(eq.t, eq.t, c.normalA);
                            vec2.add(eq.contactPointA, eq.contactPointA, c.contactPointA);
                            vec2.add(eq.contactPointB, eq.contactPointB, c.contactPointB);
                        } else {
                            vec2.sub(eq.t, eq.t, c.normalA);
                            vec2.add(eq.contactPointA, eq.contactPointA, c.contactPointB);
                            vec2.add(eq.contactPointB, eq.contactPointB, c.contactPointA);
                        }
                        eq.contactEquations.push(c);
                    }
                    var invNumContacts = 1 / numContacts;
                    vec2.scale(eq.contactPointA, eq.contactPointA, invNumContacts);
                    vec2.scale(eq.contactPointB, eq.contactPointB, invNumContacts);
                    vec2.normalize(eq.t, eq.t);
                    vec2.rotate90cw(eq.t, eq.t);
                    return eq;
                };
                Narrowphase.prototype[Shape.LINE | Shape.CONVEX] = Narrowphase.prototype.convexLine = function(convexBody, convexShape, convexOffset, convexAngle, lineBody, lineShape, lineOffset, lineAngle, justTest) {
                    if (justTest) {
                        return false;
                    } else {
                        return 0;
                    }
                };
                Narrowphase.prototype[Shape.LINE | Shape.RECTANGLE] = Narrowphase.prototype.lineRectangle = function(lineBody, lineShape, lineOffset, lineAngle, rectangleBody, rectangleShape, rectangleOffset, rectangleAngle, justTest) {
                    if (justTest) {
                        return false;
                    } else {
                        return 0;
                    }
                };
                function setConvexToCapsuleShapeMiddle(convexShape, capsuleShape) {
                    vec2.set(convexShape.vertices[0], -capsuleShape.length * .5, -capsuleShape.radius);
                    vec2.set(convexShape.vertices[1], capsuleShape.length * .5, -capsuleShape.radius);
                    vec2.set(convexShape.vertices[2], capsuleShape.length * .5, capsuleShape.radius);
                    vec2.set(convexShape.vertices[3], -capsuleShape.length * .5, capsuleShape.radius);
                }
                var convexCapsule_tempRect = new Rectangle(1, 1), convexCapsule_tempVec = vec2.create();
                Narrowphase.prototype[Shape.CAPSULE | Shape.CONVEX] = Narrowphase.prototype[Shape.CAPSULE | Shape.RECTANGLE] = Narrowphase.prototype.convexCapsule = function(convexBody, convexShape, convexPosition, convexAngle, capsuleBody, capsuleShape, capsulePosition, capsuleAngle, justTest) {
                    var circlePos = convexCapsule_tempVec;
                    vec2.set(circlePos, capsuleShape.length / 2, 0);
                    vec2.rotate(circlePos, circlePos, capsuleAngle);
                    vec2.add(circlePos, circlePos, capsulePosition);
                    var result1 = this.circleConvex(capsuleBody, capsuleShape, circlePos, capsuleAngle, convexBody, convexShape, convexPosition, convexAngle, justTest, capsuleShape.radius);
                    vec2.set(circlePos, -capsuleShape.length / 2, 0);
                    vec2.rotate(circlePos, circlePos, capsuleAngle);
                    vec2.add(circlePos, circlePos, capsulePosition);
                    var result2 = this.circleConvex(capsuleBody, capsuleShape, circlePos, capsuleAngle, convexBody, convexShape, convexPosition, convexAngle, justTest, capsuleShape.radius);
                    if (justTest && (result1 || result2)) {
                        return true;
                    }
                    var r = convexCapsule_tempRect;
                    setConvexToCapsuleShapeMiddle(r, capsuleShape);
                    var result = this.convexConvex(convexBody, convexShape, convexPosition, convexAngle, capsuleBody, r, capsulePosition, capsuleAngle, justTest);
                    return result + result1 + result2;
                };
                Narrowphase.prototype[Shape.CAPSULE | Shape.LINE] = Narrowphase.prototype.lineCapsule = function(lineBody, lineShape, linePosition, lineAngle, capsuleBody, capsuleShape, capsulePosition, capsuleAngle, justTest) {
                    if (justTest) {
                        return false;
                    } else {
                        return 0;
                    }
                };
                var capsuleCapsule_tempVec1 = vec2.create();
                var capsuleCapsule_tempVec2 = vec2.create();
                var capsuleCapsule_tempRect1 = new Rectangle(1, 1);
                Narrowphase.prototype[Shape.CAPSULE | Shape.CAPSULE] = Narrowphase.prototype.capsuleCapsule = function(bi, si, xi, ai, bj, sj, xj, aj, justTest) {
                    var enableFrictionBefore;
                    var circlePosi = capsuleCapsule_tempVec1, circlePosj = capsuleCapsule_tempVec2;
                    var numContacts = 0;
                    for (var i = 0; i < 2; i++) {
                        vec2.set(circlePosi, (i === 0 ? -1 : 1) * si.length / 2, 0);
                        vec2.rotate(circlePosi, circlePosi, ai);
                        vec2.add(circlePosi, circlePosi, xi);
                        for (var j = 0; j < 2; j++) {
                            vec2.set(circlePosj, (j === 0 ? -1 : 1) * sj.length / 2, 0);
                            vec2.rotate(circlePosj, circlePosj, aj);
                            vec2.add(circlePosj, circlePosj, xj);
                            if (this.enableFrictionReduction) {
                                enableFrictionBefore = this.enableFriction;
                                this.enableFriction = false;
                            }
                            var result = this.circleCircle(bi, si, circlePosi, ai, bj, sj, circlePosj, aj, justTest, si.radius, sj.radius);
                            if (this.enableFrictionReduction) {
                                this.enableFriction = enableFrictionBefore;
                            }
                            if (justTest && result) {
                                return true;
                            }
                            numContacts += result;
                        }
                    }
                    if (this.enableFrictionReduction) {
                        enableFrictionBefore = this.enableFriction;
                        this.enableFriction = false;
                    }
                    var rect = capsuleCapsule_tempRect1;
                    setConvexToCapsuleShapeMiddle(rect, si);
                    var result1 = this.convexCapsule(bi, rect, xi, ai, bj, sj, xj, aj, justTest);
                    if (this.enableFrictionReduction) {
                        this.enableFriction = enableFrictionBefore;
                    }
                    if (justTest && result1) {
                        return true;
                    }
                    numContacts += result1;
                    if (this.enableFrictionReduction) {
                        var enableFrictionBefore = this.enableFriction;
                        this.enableFriction = false;
                    }
                    setConvexToCapsuleShapeMiddle(rect, sj);
                    var result2 = this.convexCapsule(bj, rect, xj, aj, bi, si, xi, ai, justTest);
                    if (this.enableFrictionReduction) {
                        this.enableFriction = enableFrictionBefore;
                    }
                    if (justTest && result2) {
                        return true;
                    }
                    numContacts += result2;
                    if (this.enableFrictionReduction) {
                        if (numContacts && this.enableFriction) {
                            this.frictionEquations.push(this.createFrictionFromAverage(numContacts));
                        }
                    }
                    return numContacts;
                };
                Narrowphase.prototype[Shape.LINE | Shape.LINE] = Narrowphase.prototype.lineLine = function(bodyA, shapeA, positionA, angleA, bodyB, shapeB, positionB, angleB, justTest) {
                    if (justTest) {
                        return false;
                    } else {
                        return 0;
                    }
                };
                Narrowphase.prototype[Shape.PLANE | Shape.LINE] = Narrowphase.prototype.planeLine = function(planeBody, planeShape, planeOffset, planeAngle, lineBody, lineShape, lineOffset, lineAngle, justTest) {
                    var worldVertex0 = tmp1, worldVertex1 = tmp2, worldVertex01 = tmp3, worldVertex11 = tmp4, worldEdge = tmp5, worldEdgeUnit = tmp6, dist = tmp7, worldNormal = tmp8, worldTangent = tmp9, verts = tmpArray, numContacts = 0;
                    vec2.set(worldVertex0, -lineShape.length / 2, 0);
                    vec2.set(worldVertex1, lineShape.length / 2, 0);
                    vec2.rotate(worldVertex01, worldVertex0, lineAngle);
                    vec2.rotate(worldVertex11, worldVertex1, lineAngle);
                    add(worldVertex01, worldVertex01, lineOffset);
                    add(worldVertex11, worldVertex11, lineOffset);
                    vec2.copy(worldVertex0, worldVertex01);
                    vec2.copy(worldVertex1, worldVertex11);
                    sub(worldEdge, worldVertex1, worldVertex0);
                    vec2.normalize(worldEdgeUnit, worldEdge);
                    vec2.rotate90cw(worldTangent, worldEdgeUnit);
                    vec2.rotate(worldNormal, yAxis, planeAngle);
                    verts[0] = worldVertex0;
                    verts[1] = worldVertex1;
                    for (var i = 0; i < verts.length; i++) {
                        var v = verts[i];
                        sub(dist, v, planeOffset);
                        var d = dot(dist, worldNormal);
                        if (d < 0) {
                            if (justTest) {
                                return true;
                            }
                            var c = this.createContactEquation(planeBody, lineBody, planeShape, lineShape);
                            numContacts++;
                            vec2.copy(c.normalA, worldNormal);
                            vec2.normalize(c.normalA, c.normalA);
                            vec2.scale(dist, worldNormal, d);
                            sub(c.contactPointA, v, dist);
                            sub(c.contactPointA, c.contactPointA, planeBody.position);
                            sub(c.contactPointB, v, lineOffset);
                            add(c.contactPointB, c.contactPointB, lineOffset);
                            sub(c.contactPointB, c.contactPointB, lineBody.position);
                            this.contactEquations.push(c);
                            if (!this.enableFrictionReduction) {
                                if (this.enableFriction) {
                                    this.frictionEquations.push(this.createFrictionFromContact(c));
                                }
                            }
                        }
                    }
                    if (justTest) {
                        return false;
                    }
                    if (!this.enableFrictionReduction) {
                        if (numContacts && this.enableFriction) {
                            this.frictionEquations.push(this.createFrictionFromAverage(numContacts));
                        }
                    }
                    return numContacts;
                };
                Narrowphase.prototype[Shape.PARTICLE | Shape.CAPSULE] = Narrowphase.prototype.particleCapsule = function(particleBody, particleShape, particlePosition, particleAngle, capsuleBody, capsuleShape, capsulePosition, capsuleAngle, justTest) {
                    return this.circleLine(particleBody, particleShape, particlePosition, particleAngle, capsuleBody, capsuleShape, capsulePosition, capsuleAngle, justTest, capsuleShape.radius, 0);
                };
                Narrowphase.prototype[Shape.CIRCLE | Shape.LINE] = Narrowphase.prototype.circleLine = function(circleBody, circleShape, circleOffset, circleAngle, lineBody, lineShape, lineOffset, lineAngle, justTest, lineRadius, circleRadius) {
                    var lineRadius = lineRadius || 0, circleRadius = typeof circleRadius !== "undefined" ? circleRadius : circleShape.radius, orthoDist = tmp1, lineToCircleOrthoUnit = tmp2, projectedPoint = tmp3, centerDist = tmp4, worldTangent = tmp5, worldEdge = tmp6, worldEdgeUnit = tmp7, worldVertex0 = tmp8, worldVertex1 = tmp9, worldVertex01 = tmp10, worldVertex11 = tmp11, dist = tmp12, lineToCircle = tmp13, lineEndToLineRadius = tmp14, verts = tmpArray;
                    vec2.set(worldVertex0, -lineShape.length / 2, 0);
                    vec2.set(worldVertex1, lineShape.length / 2, 0);
                    vec2.rotate(worldVertex01, worldVertex0, lineAngle);
                    vec2.rotate(worldVertex11, worldVertex1, lineAngle);
                    add(worldVertex01, worldVertex01, lineOffset);
                    add(worldVertex11, worldVertex11, lineOffset);
                    vec2.copy(worldVertex0, worldVertex01);
                    vec2.copy(worldVertex1, worldVertex11);
                    sub(worldEdge, worldVertex1, worldVertex0);
                    vec2.normalize(worldEdgeUnit, worldEdge);
                    vec2.rotate90cw(worldTangent, worldEdgeUnit);
                    sub(dist, circleOffset, worldVertex0);
                    var d = dot(dist, worldTangent);
                    sub(centerDist, worldVertex0, lineOffset);
                    sub(lineToCircle, circleOffset, lineOffset);
                    var radiusSum = circleRadius + lineRadius;
                    if (Math.abs(d) < radiusSum) {
                        vec2.scale(orthoDist, worldTangent, d);
                        sub(projectedPoint, circleOffset, orthoDist);
                        vec2.scale(lineToCircleOrthoUnit, worldTangent, dot(worldTangent, lineToCircle));
                        vec2.normalize(lineToCircleOrthoUnit, lineToCircleOrthoUnit);
                        vec2.scale(lineToCircleOrthoUnit, lineToCircleOrthoUnit, lineRadius);
                        add(projectedPoint, projectedPoint, lineToCircleOrthoUnit);
                        var pos = dot(worldEdgeUnit, projectedPoint);
                        var pos0 = dot(worldEdgeUnit, worldVertex0);
                        var pos1 = dot(worldEdgeUnit, worldVertex1);
                        if (pos > pos0 && pos < pos1) {
                            if (justTest) {
                                return true;
                            }
                            var c = this.createContactEquation(circleBody, lineBody, circleShape, lineShape);
                            vec2.scale(c.normalA, orthoDist, -1);
                            vec2.normalize(c.normalA, c.normalA);
                            vec2.scale(c.contactPointA, c.normalA, circleRadius);
                            add(c.contactPointA, c.contactPointA, circleOffset);
                            sub(c.contactPointA, c.contactPointA, circleBody.position);
                            sub(c.contactPointB, projectedPoint, lineOffset);
                            add(c.contactPointB, c.contactPointB, lineOffset);
                            sub(c.contactPointB, c.contactPointB, lineBody.position);
                            this.contactEquations.push(c);
                            if (this.enableFriction) {
                                this.frictionEquations.push(this.createFrictionFromContact(c));
                            }
                            return 1;
                        }
                    }
                    verts[0] = worldVertex0;
                    verts[1] = worldVertex1;
                    for (var i = 0; i < verts.length; i++) {
                        var v = verts[i];
                        sub(dist, v, circleOffset);
                        if (vec2.squaredLength(dist) < Math.pow(radiusSum, 2)) {
                            if (justTest) {
                                return true;
                            }
                            var c = this.createContactEquation(circleBody, lineBody, circleShape, lineShape);
                            vec2.copy(c.normalA, dist);
                            vec2.normalize(c.normalA, c.normalA);
                            vec2.scale(c.contactPointA, c.normalA, circleRadius);
                            add(c.contactPointA, c.contactPointA, circleOffset);
                            sub(c.contactPointA, c.contactPointA, circleBody.position);
                            sub(c.contactPointB, v, lineOffset);
                            vec2.scale(lineEndToLineRadius, c.normalA, -lineRadius);
                            add(c.contactPointB, c.contactPointB, lineEndToLineRadius);
                            add(c.contactPointB, c.contactPointB, lineOffset);
                            sub(c.contactPointB, c.contactPointB, lineBody.position);
                            this.contactEquations.push(c);
                            if (this.enableFriction) {
                                this.frictionEquations.push(this.createFrictionFromContact(c));
                            }
                            return 1;
                        }
                    }
                    return 0;
                };
                Narrowphase.prototype[Shape.CIRCLE | Shape.CAPSULE] = Narrowphase.prototype.circleCapsule = function(bi, si, xi, ai, bj, sj, xj, aj, justTest) {
                    return this.circleLine(bi, si, xi, ai, bj, sj, xj, aj, justTest, sj.radius);
                };
                Narrowphase.prototype[Shape.CIRCLE | Shape.CONVEX] = Narrowphase.prototype[Shape.CIRCLE | Shape.RECTANGLE] = Narrowphase.prototype.circleConvex = function(circleBody, circleShape, circleOffset, circleAngle, convexBody, convexShape, convexOffset, convexAngle, justTest, circleRadius) {
                    var circleRadius = typeof circleRadius === "number" ? circleRadius : circleShape.radius;
                    var worldVertex0 = tmp1, worldVertex1 = tmp2, worldEdge = tmp3, worldEdgeUnit = tmp4, worldNormal = tmp5, centerDist = tmp6, convexToCircle = tmp7, orthoDist = tmp8, projectedPoint = tmp9, dist = tmp10, worldVertex = tmp11, closestEdge = -1, closestEdgeDistance = null, closestEdgeOrthoDist = tmp12, closestEdgeProjectedPoint = tmp13, candidate = tmp14, candidateDist = tmp15, minCandidate = tmp16, found = false, minCandidateDistance = Number.MAX_VALUE;
                    var numReported = 0;
                    var verts = convexShape.vertices;
                    for (var i = 0; i !== verts.length + 1; i++) {
                        var v0 = verts[i % verts.length], v1 = verts[(i + 1) % verts.length];
                        vec2.rotate(worldVertex0, v0, convexAngle);
                        vec2.rotate(worldVertex1, v1, convexAngle);
                        add(worldVertex0, worldVertex0, convexOffset);
                        add(worldVertex1, worldVertex1, convexOffset);
                        sub(worldEdge, worldVertex1, worldVertex0);
                        vec2.normalize(worldEdgeUnit, worldEdge);
                        vec2.rotate90cw(worldNormal, worldEdgeUnit);
                        vec2.scale(candidate, worldNormal, -circleShape.radius);
                        add(candidate, candidate, circleOffset);
                        if (pointInConvex(candidate, convexShape, convexOffset, convexAngle)) {
                            vec2.sub(candidateDist, worldVertex0, candidate);
                            var candidateDistance = Math.abs(vec2.dot(candidateDist, worldNormal));
                            if (candidateDistance < minCandidateDistance) {
                                vec2.copy(minCandidate, candidate);
                                minCandidateDistance = candidateDistance;
                                vec2.scale(closestEdgeProjectedPoint, worldNormal, candidateDistance);
                                vec2.add(closestEdgeProjectedPoint, closestEdgeProjectedPoint, candidate);
                                found = true;
                            }
                        }
                    }
                    if (found) {
                        if (justTest) {
                            return true;
                        }
                        var c = this.createContactEquation(circleBody, convexBody, circleShape, convexShape);
                        vec2.sub(c.normalA, minCandidate, circleOffset);
                        vec2.normalize(c.normalA, c.normalA);
                        vec2.scale(c.contactPointA, c.normalA, circleRadius);
                        add(c.contactPointA, c.contactPointA, circleOffset);
                        sub(c.contactPointA, c.contactPointA, circleBody.position);
                        sub(c.contactPointB, closestEdgeProjectedPoint, convexOffset);
                        add(c.contactPointB, c.contactPointB, convexOffset);
                        sub(c.contactPointB, c.contactPointB, convexBody.position);
                        this.contactEquations.push(c);
                        if (this.enableFriction) {
                            this.frictionEquations.push(this.createFrictionFromContact(c));
                        }
                        return 1;
                    }
                    if (circleRadius > 0) {
                        for (var i = 0; i < verts.length; i++) {
                            var localVertex = verts[i];
                            vec2.rotate(worldVertex, localVertex, convexAngle);
                            add(worldVertex, worldVertex, convexOffset);
                            sub(dist, worldVertex, circleOffset);
                            if (vec2.squaredLength(dist) < Math.pow(circleRadius, 2)) {
                                if (justTest) {
                                    return true;
                                }
                                var c = this.createContactEquation(circleBody, convexBody, circleShape, convexShape);
                                vec2.copy(c.normalA, dist);
                                vec2.normalize(c.normalA, c.normalA);
                                vec2.scale(c.contactPointA, c.normalA, circleRadius);
                                add(c.contactPointA, c.contactPointA, circleOffset);
                                sub(c.contactPointA, c.contactPointA, circleBody.position);
                                sub(c.contactPointB, worldVertex, convexOffset);
                                add(c.contactPointB, c.contactPointB, convexOffset);
                                sub(c.contactPointB, c.contactPointB, convexBody.position);
                                this.contactEquations.push(c);
                                if (this.enableFriction) {
                                    this.frictionEquations.push(this.createFrictionFromContact(c));
                                }
                                return 1;
                            }
                        }
                    }
                    return 0;
                };
                var pic_worldVertex0 = vec2.create(), pic_worldVertex1 = vec2.create(), pic_r0 = vec2.create(), pic_r1 = vec2.create();
                function pointInConvex(worldPoint, convexShape, convexOffset, convexAngle) {
                    var worldVertex0 = pic_worldVertex0, worldVertex1 = pic_worldVertex1, r0 = pic_r0, r1 = pic_r1, point = worldPoint, verts = convexShape.vertices, lastCross = null;
                    for (var i = 0; i !== verts.length + 1; i++) {
                        var v0 = verts[i % verts.length], v1 = verts[(i + 1) % verts.length];
                        vec2.rotate(worldVertex0, v0, convexAngle);
                        vec2.rotate(worldVertex1, v1, convexAngle);
                        add(worldVertex0, worldVertex0, convexOffset);
                        add(worldVertex1, worldVertex1, convexOffset);
                        sub(r0, worldVertex0, point);
                        sub(r1, worldVertex1, point);
                        var cross = vec2.crossLength(r0, r1);
                        if (lastCross === null) {
                            lastCross = cross;
                        }
                        if (cross * lastCross <= 0) {
                            return false;
                        }
                        lastCross = cross;
                    }
                    return true;
                }
                Narrowphase.prototype[Shape.PARTICLE | Shape.CONVEX] = Narrowphase.prototype[Shape.PARTICLE | Shape.RECTANGLE] = Narrowphase.prototype.particleConvex = function(particleBody, particleShape, particleOffset, particleAngle, convexBody, convexShape, convexOffset, convexAngle, justTest) {
                    var worldVertex0 = tmp1, worldVertex1 = tmp2, worldEdge = tmp3, worldEdgeUnit = tmp4, worldTangent = tmp5, centerDist = tmp6, convexToparticle = tmp7, orthoDist = tmp8, projectedPoint = tmp9, dist = tmp10, worldVertex = tmp11, closestEdge = -1, closestEdgeDistance = null, closestEdgeOrthoDist = tmp12, closestEdgeProjectedPoint = tmp13, r0 = tmp14, r1 = tmp15, localPoint = tmp16, candidateDist = tmp17, minEdgeNormal = tmp18, minCandidateDistance = Number.MAX_VALUE;
                    var numReported = 0, found = false, verts = convexShape.vertices;
                    if (!pointInConvex(particleOffset, convexShape, convexOffset, convexAngle)) {
                        return 0;
                    }
                    if (justTest) {
                        return true;
                    }
                    var lastCross = null;
                    for (var i = 0; i !== verts.length + 1; i++) {
                        var v0 = verts[i % verts.length], v1 = verts[(i + 1) % verts.length];
                        vec2.rotate(worldVertex0, v0, convexAngle);
                        vec2.rotate(worldVertex1, v1, convexAngle);
                        add(worldVertex0, worldVertex0, convexOffset);
                        add(worldVertex1, worldVertex1, convexOffset);
                        sub(worldEdge, worldVertex1, worldVertex0);
                        vec2.normalize(worldEdgeUnit, worldEdge);
                        vec2.rotate90cw(worldTangent, worldEdgeUnit);
                        sub(dist, particleOffset, worldVertex0);
                        var d = dot(dist, worldTangent);
                        sub(centerDist, worldVertex0, convexOffset);
                        sub(convexToparticle, particleOffset, convexOffset);
                        vec2.sub(candidateDist, worldVertex0, particleOffset);
                        var candidateDistance = Math.abs(vec2.dot(candidateDist, worldTangent));
                        if (candidateDistance < minCandidateDistance) {
                            minCandidateDistance = candidateDistance;
                            vec2.scale(closestEdgeProjectedPoint, worldTangent, candidateDistance);
                            vec2.add(closestEdgeProjectedPoint, closestEdgeProjectedPoint, particleOffset);
                            vec2.copy(minEdgeNormal, worldTangent);
                            found = true;
                        }
                    }
                    if (found) {
                        var c = this.createContactEquation(particleBody, convexBody, particleShape, convexShape);
                        vec2.scale(c.normalA, minEdgeNormal, -1);
                        vec2.normalize(c.normalA, c.normalA);
                        vec2.set(c.contactPointA, 0, 0);
                        add(c.contactPointA, c.contactPointA, particleOffset);
                        sub(c.contactPointA, c.contactPointA, particleBody.position);
                        sub(c.contactPointB, closestEdgeProjectedPoint, convexOffset);
                        add(c.contactPointB, c.contactPointB, convexOffset);
                        sub(c.contactPointB, c.contactPointB, convexBody.position);
                        this.contactEquations.push(c);
                        if (this.enableFriction) {
                            this.frictionEquations.push(this.createFrictionFromContact(c));
                        }
                        return 1;
                    }
                    return 0;
                };
                Narrowphase.prototype[Shape.CIRCLE] = Narrowphase.prototype.circleCircle = function(bodyA, shapeA, offsetA, angleA, bodyB, shapeB, offsetB, angleB, justTest, radiusA, radiusB) {
                    var dist = tmp1, radiusA = radiusA || shapeA.radius, radiusB = radiusB || shapeB.radius;
                    sub(dist, offsetA, offsetB);
                    var r = radiusA + radiusB;
                    if (vec2.squaredLength(dist) > Math.pow(r, 2)) {
                        return 0;
                    }
                    if (justTest) {
                        return true;
                    }
                    var c = this.createContactEquation(bodyA, bodyB, shapeA, shapeB);
                    sub(c.normalA, offsetB, offsetA);
                    vec2.normalize(c.normalA, c.normalA);
                    vec2.scale(c.contactPointA, c.normalA, radiusA);
                    vec2.scale(c.contactPointB, c.normalA, -radiusB);
                    add(c.contactPointA, c.contactPointA, offsetA);
                    sub(c.contactPointA, c.contactPointA, bodyA.position);
                    add(c.contactPointB, c.contactPointB, offsetB);
                    sub(c.contactPointB, c.contactPointB, bodyB.position);
                    this.contactEquations.push(c);
                    if (this.enableFriction) {
                        this.frictionEquations.push(this.createFrictionFromContact(c));
                    }
                    return 1;
                };
                Narrowphase.prototype[Shape.PLANE | Shape.CONVEX] = Narrowphase.prototype[Shape.PLANE | Shape.RECTANGLE] = Narrowphase.prototype.planeConvex = function(planeBody, planeShape, planeOffset, planeAngle, convexBody, convexShape, convexOffset, convexAngle, justTest) {
                    var worldVertex = tmp1, worldNormal = tmp2, dist = tmp3;
                    var numReported = 0;
                    vec2.rotate(worldNormal, yAxis, planeAngle);
                    for (var i = 0; i !== convexShape.vertices.length; i++) {
                        var v = convexShape.vertices[i];
                        vec2.rotate(worldVertex, v, convexAngle);
                        add(worldVertex, worldVertex, convexOffset);
                        sub(dist, worldVertex, planeOffset);
                        if (dot(dist, worldNormal) <= 0) {
                            if (justTest) {
                                return true;
                            }
                            numReported++;
                            var c = this.createContactEquation(planeBody, convexBody, planeShape, convexShape);
                            sub(dist, worldVertex, planeOffset);
                            vec2.copy(c.normalA, worldNormal);
                            var d = dot(dist, c.normalA);
                            vec2.scale(dist, c.normalA, d);
                            sub(c.contactPointB, worldVertex, convexBody.position);
                            sub(c.contactPointA, worldVertex, dist);
                            sub(c.contactPointA, c.contactPointA, planeBody.position);
                            this.contactEquations.push(c);
                            if (!this.enableFrictionReduction) {
                                if (this.enableFriction) {
                                    this.frictionEquations.push(this.createFrictionFromContact(c));
                                }
                            }
                        }
                    }
                    if (this.enableFrictionReduction) {
                        if (this.enableFriction && numReported) {
                            this.frictionEquations.push(this.createFrictionFromAverage(numReported));
                        }
                    }
                    return numReported;
                };
                Narrowphase.prototype[Shape.PARTICLE | Shape.PLANE] = Narrowphase.prototype.particlePlane = function(particleBody, particleShape, particleOffset, particleAngle, planeBody, planeShape, planeOffset, planeAngle, justTest) {
                    var dist = tmp1, worldNormal = tmp2;
                    planeAngle = planeAngle || 0;
                    sub(dist, particleOffset, planeOffset);
                    vec2.rotate(worldNormal, yAxis, planeAngle);
                    var d = dot(dist, worldNormal);
                    if (d > 0) {
                        return 0;
                    }
                    if (justTest) {
                        return true;
                    }
                    var c = this.createContactEquation(planeBody, particleBody, planeShape, particleShape);
                    vec2.copy(c.normalA, worldNormal);
                    vec2.scale(dist, c.normalA, d);
                    sub(c.contactPointA, particleOffset, dist);
                    sub(c.contactPointA, c.contactPointA, planeBody.position);
                    sub(c.contactPointB, particleOffset, particleBody.position);
                    this.contactEquations.push(c);
                    if (this.enableFriction) {
                        this.frictionEquations.push(this.createFrictionFromContact(c));
                    }
                    return 1;
                };
                Narrowphase.prototype[Shape.CIRCLE | Shape.PARTICLE] = Narrowphase.prototype.circleParticle = function(circleBody, circleShape, circleOffset, circleAngle, particleBody, particleShape, particleOffset, particleAngle, justTest) {
                    var dist = tmp1;
                    sub(dist, particleOffset, circleOffset);
                    if (vec2.squaredLength(dist) > Math.pow(circleShape.radius, 2)) {
                        return 0;
                    }
                    if (justTest) {
                        return true;
                    }
                    var c = this.createContactEquation(circleBody, particleBody, circleShape, particleShape);
                    vec2.copy(c.normalA, dist);
                    vec2.normalize(c.normalA, c.normalA);
                    vec2.scale(c.contactPointA, c.normalA, circleShape.radius);
                    add(c.contactPointA, c.contactPointA, circleOffset);
                    sub(c.contactPointA, c.contactPointA, circleBody.position);
                    sub(c.contactPointB, particleOffset, particleBody.position);
                    this.contactEquations.push(c);
                    if (this.enableFriction) {
                        this.frictionEquations.push(this.createFrictionFromContact(c));
                    }
                    return 1;
                };
                var planeCapsule_tmpCircle = new Circle(1), planeCapsule_tmp1 = vec2.create(), planeCapsule_tmp2 = vec2.create(), planeCapsule_tmp3 = vec2.create();
                Narrowphase.prototype[Shape.PLANE | Shape.CAPSULE] = Narrowphase.prototype.planeCapsule = function(planeBody, planeShape, planeOffset, planeAngle, capsuleBody, capsuleShape, capsuleOffset, capsuleAngle, justTest) {
                    var end1 = planeCapsule_tmp1, end2 = planeCapsule_tmp2, circle = planeCapsule_tmpCircle, dst = planeCapsule_tmp3;
                    vec2.set(end1, -capsuleShape.length / 2, 0);
                    vec2.rotate(end1, end1, capsuleAngle);
                    add(end1, end1, capsuleOffset);
                    vec2.set(end2, capsuleShape.length / 2, 0);
                    vec2.rotate(end2, end2, capsuleAngle);
                    add(end2, end2, capsuleOffset);
                    circle.radius = capsuleShape.radius;
                    var enableFrictionBefore;
                    if (this.enableFrictionReduction) {
                        enableFrictionBefore = this.enableFriction;
                        this.enableFriction = false;
                    }
                    var numContacts1 = this.circlePlane(capsuleBody, circle, end1, 0, planeBody, planeShape, planeOffset, planeAngle, justTest), numContacts2 = this.circlePlane(capsuleBody, circle, end2, 0, planeBody, planeShape, planeOffset, planeAngle, justTest);
                    if (this.enableFrictionReduction) {
                        this.enableFriction = enableFrictionBefore;
                    }
                    if (justTest) {
                        return numContacts1 || numContacts2;
                    } else {
                        var numTotal = numContacts1 + numContacts2;
                        if (this.enableFrictionReduction) {
                            if (numTotal) {
                                this.frictionEquations.push(this.createFrictionFromAverage(numTotal));
                            }
                        }
                        return numTotal;
                    }
                };
                Narrowphase.prototype[Shape.CIRCLE | Shape.PLANE] = Narrowphase.prototype.circlePlane = function(bi, si, xi, ai, bj, sj, xj, aj, justTest) {
                    var circleBody = bi, circleShape = si, circleOffset = xi, planeBody = bj, shapeB = sj, planeOffset = xj, planeAngle = aj;
                    planeAngle = planeAngle || 0;
                    var planeToCircle = tmp1, worldNormal = tmp2, temp = tmp3;
                    sub(planeToCircle, circleOffset, planeOffset);
                    vec2.rotate(worldNormal, yAxis, planeAngle);
                    var d = dot(worldNormal, planeToCircle);
                    if (d > circleShape.radius) {
                        return 0;
                    }
                    if (justTest) {
                        return true;
                    }
                    var contact = this.createContactEquation(planeBody, circleBody, sj, si);
                    vec2.copy(contact.normalA, worldNormal);
                    vec2.scale(contact.contactPointB, contact.normalA, -circleShape.radius);
                    add(contact.contactPointB, contact.contactPointB, circleOffset);
                    sub(contact.contactPointB, contact.contactPointB, circleBody.position);
                    vec2.scale(temp, contact.normalA, d);
                    sub(contact.contactPointA, planeToCircle, temp);
                    add(contact.contactPointA, contact.contactPointA, planeOffset);
                    sub(contact.contactPointA, contact.contactPointA, planeBody.position);
                    this.contactEquations.push(contact);
                    if (this.enableFriction) {
                        this.frictionEquations.push(this.createFrictionFromContact(contact));
                    }
                    return 1;
                };
                Narrowphase.prototype[Shape.CONVEX] = Narrowphase.prototype[Shape.CONVEX | Shape.RECTANGLE] = Narrowphase.prototype[Shape.RECTANGLE] = Narrowphase.prototype.convexConvex = function(bi, si, xi, ai, bj, sj, xj, aj, justTest, precision) {
                    var sepAxis = tmp1, worldPoint = tmp2, worldPoint0 = tmp3, worldPoint1 = tmp4, worldEdge = tmp5, projected = tmp6, penetrationVec = tmp7, dist = tmp8, worldNormal = tmp9, numContacts = 0, precision = typeof precision === "number" ? precision : 0;
                    var found = Narrowphase.findSeparatingAxis(si, xi, ai, sj, xj, aj, sepAxis);
                    if (!found) {
                        return 0;
                    }
                    sub(dist, xj, xi);
                    if (dot(sepAxis, dist) > 0) {
                        vec2.scale(sepAxis, sepAxis, -1);
                    }
                    var closestEdge1 = Narrowphase.getClosestEdge(si, ai, sepAxis, true), closestEdge2 = Narrowphase.getClosestEdge(sj, aj, sepAxis);
                    if (closestEdge1 === -1 || closestEdge2 === -1) {
                        return 0;
                    }
                    for (var k = 0; k < 2; k++) {
                        var closestEdgeA = closestEdge1, closestEdgeB = closestEdge2, shapeA = si, shapeB = sj, offsetA = xi, offsetB = xj, angleA = ai, angleB = aj, bodyA = bi, bodyB = bj;
                        if (k === 0) {
                            var tmp;
                            tmp = closestEdgeA;
                            closestEdgeA = closestEdgeB;
                            closestEdgeB = tmp;
                            tmp = shapeA;
                            shapeA = shapeB;
                            shapeB = tmp;
                            tmp = offsetA;
                            offsetA = offsetB;
                            offsetB = tmp;
                            tmp = angleA;
                            angleA = angleB;
                            angleB = tmp;
                            tmp = bodyA;
                            bodyA = bodyB;
                            bodyB = tmp;
                        }
                        for (var j = closestEdgeB; j < closestEdgeB + 2; j++) {
                            var v = shapeB.vertices[(j + shapeB.vertices.length) % shapeB.vertices.length];
                            vec2.rotate(worldPoint, v, angleB);
                            add(worldPoint, worldPoint, offsetB);
                            var insideNumEdges = 0;
                            for (var i = closestEdgeA - 1; i < closestEdgeA + 2; i++) {
                                var v0 = shapeA.vertices[(i + shapeA.vertices.length) % shapeA.vertices.length], v1 = shapeA.vertices[(i + 1 + shapeA.vertices.length) % shapeA.vertices.length];
                                vec2.rotate(worldPoint0, v0, angleA);
                                vec2.rotate(worldPoint1, v1, angleA);
                                add(worldPoint0, worldPoint0, offsetA);
                                add(worldPoint1, worldPoint1, offsetA);
                                sub(worldEdge, worldPoint1, worldPoint0);
                                vec2.rotate90cw(worldNormal, worldEdge);
                                vec2.normalize(worldNormal, worldNormal);
                                sub(dist, worldPoint, worldPoint0);
                                var d = dot(worldNormal, dist);
                                if (i === closestEdgeA && d <= precision || i !== closestEdgeA && d <= 0) {
                                    insideNumEdges++;
                                }
                            }
                            if (insideNumEdges >= 3) {
                                if (justTest) {
                                    return true;
                                }
                                var c = this.createContactEquation(bodyA, bodyB, shapeA, shapeB);
                                numContacts++;
                                var v0 = shapeA.vertices[closestEdgeA % shapeA.vertices.length], v1 = shapeA.vertices[(closestEdgeA + 1) % shapeA.vertices.length];
                                vec2.rotate(worldPoint0, v0, angleA);
                                vec2.rotate(worldPoint1, v1, angleA);
                                add(worldPoint0, worldPoint0, offsetA);
                                add(worldPoint1, worldPoint1, offsetA);
                                sub(worldEdge, worldPoint1, worldPoint0);
                                vec2.rotate90cw(c.normalA, worldEdge);
                                vec2.normalize(c.normalA, c.normalA);
                                sub(dist, worldPoint, worldPoint0);
                                var d = dot(c.normalA, dist);
                                vec2.scale(penetrationVec, c.normalA, d);
                                sub(c.contactPointA, worldPoint, offsetA);
                                sub(c.contactPointA, c.contactPointA, penetrationVec);
                                add(c.contactPointA, c.contactPointA, offsetA);
                                sub(c.contactPointA, c.contactPointA, bodyA.position);
                                sub(c.contactPointB, worldPoint, offsetB);
                                add(c.contactPointB, c.contactPointB, offsetB);
                                sub(c.contactPointB, c.contactPointB, bodyB.position);
                                this.contactEquations.push(c);
                                if (!this.enableFrictionReduction) {
                                    if (this.enableFriction) {
                                        this.frictionEquations.push(this.createFrictionFromContact(c));
                                    }
                                }
                            }
                        }
                    }
                    if (this.enableFrictionReduction) {
                        if (this.enableFriction && numContacts) {
                            this.frictionEquations.push(this.createFrictionFromAverage(numContacts));
                        }
                    }
                    return numContacts;
                };
                var pcoa_tmp1 = vec2.fromValues(0, 0);
                Narrowphase.projectConvexOntoAxis = function(convexShape, convexOffset, convexAngle, worldAxis, result) {
                    var max = null, min = null, v, value, localAxis = pcoa_tmp1;
                    vec2.rotate(localAxis, worldAxis, -convexAngle);
                    for (var i = 0; i < convexShape.vertices.length; i++) {
                        v = convexShape.vertices[i];
                        value = dot(v, localAxis);
                        if (max === null || value > max) {
                            max = value;
                        }
                        if (min === null || value < min) {
                            min = value;
                        }
                    }
                    if (min > max) {
                        var t = min;
                        min = max;
                        max = t;
                    }
                    var offset = dot(convexOffset, worldAxis);
                    vec2.set(result, min + offset, max + offset);
                };
                var fsa_tmp1 = vec2.fromValues(0, 0), fsa_tmp2 = vec2.fromValues(0, 0), fsa_tmp3 = vec2.fromValues(0, 0), fsa_tmp4 = vec2.fromValues(0, 0), fsa_tmp5 = vec2.fromValues(0, 0), fsa_tmp6 = vec2.fromValues(0, 0);
                Narrowphase.findSeparatingAxis = function(c1, offset1, angle1, c2, offset2, angle2, sepAxis) {
                    var maxDist = null, overlap = false, found = false, edge = fsa_tmp1, worldPoint0 = fsa_tmp2, worldPoint1 = fsa_tmp3, normal = fsa_tmp4, span1 = fsa_tmp5, span2 = fsa_tmp6;
                    if (c1 instanceof Rectangle && c2 instanceof Rectangle) {
                        for (var j = 0; j !== 2; j++) {
                            var c = c1, angle = angle1;
                            if (j === 1) {
                                c = c2;
                                angle = angle2;
                            }
                            for (var i = 0; i !== 2; i++) {
                                if (i === 0) {
                                    vec2.set(normal, 0, 1);
                                } else if (i === 1) {
                                    vec2.set(normal, 1, 0);
                                }
                                if (angle !== 0) {
                                    vec2.rotate(normal, normal, angle);
                                }
                                Narrowphase.projectConvexOntoAxis(c1, offset1, angle1, normal, span1);
                                Narrowphase.projectConvexOntoAxis(c2, offset2, angle2, normal, span2);
                                var a = span1, b = span2, swapped = false;
                                if (span1[0] > span2[0]) {
                                    b = span1;
                                    a = span2;
                                    swapped = true;
                                }
                                var dist = b[0] - a[1];
                                overlap = dist <= 0;
                                if (maxDist === null || dist > maxDist) {
                                    vec2.copy(sepAxis, normal);
                                    maxDist = dist;
                                    found = overlap;
                                }
                            }
                        }
                    } else {
                        for (var j = 0; j !== 2; j++) {
                            var c = c1, angle = angle1;
                            if (j === 1) {
                                c = c2;
                                angle = angle2;
                            }
                            for (var i = 0; i !== c.vertices.length; i++) {
                                vec2.rotate(worldPoint0, c.vertices[i], angle);
                                vec2.rotate(worldPoint1, c.vertices[(i + 1) % c.vertices.length], angle);
                                sub(edge, worldPoint1, worldPoint0);
                                vec2.rotate90cw(normal, edge);
                                vec2.normalize(normal, normal);
                                Narrowphase.projectConvexOntoAxis(c1, offset1, angle1, normal, span1);
                                Narrowphase.projectConvexOntoAxis(c2, offset2, angle2, normal, span2);
                                var a = span1, b = span2, swapped = false;
                                if (span1[0] > span2[0]) {
                                    b = span1;
                                    a = span2;
                                    swapped = true;
                                }
                                var dist = b[0] - a[1];
                                overlap = dist <= 0;
                                if (maxDist === null || dist > maxDist) {
                                    vec2.copy(sepAxis, normal);
                                    maxDist = dist;
                                    found = overlap;
                                }
                            }
                        }
                    }
                    return found;
                };
                var gce_tmp1 = vec2.fromValues(0, 0), gce_tmp2 = vec2.fromValues(0, 0), gce_tmp3 = vec2.fromValues(0, 0);
                Narrowphase.getClosestEdge = function(c, angle, axis, flip) {
                    var localAxis = gce_tmp1, edge = gce_tmp2, normal = gce_tmp3;
                    vec2.rotate(localAxis, axis, -angle);
                    if (flip) {
                        vec2.scale(localAxis, localAxis, -1);
                    }
                    var closestEdge = -1, N = c.vertices.length, maxDot = -1;
                    for (var i = 0; i !== N; i++) {
                        sub(edge, c.vertices[(i + 1) % N], c.vertices[i % N]);
                        vec2.rotate90cw(normal, edge);
                        vec2.normalize(normal, normal);
                        var d = dot(normal, localAxis);
                        if (closestEdge === -1 || d > maxDot) {
                            closestEdge = i % N;
                            maxDot = d;
                        }
                    }
                    return closestEdge;
                };
                var circleHeightfield_candidate = vec2.create(), circleHeightfield_dist = vec2.create(), circleHeightfield_v0 = vec2.create(), circleHeightfield_v1 = vec2.create(), circleHeightfield_minCandidate = vec2.create(), circleHeightfield_worldNormal = vec2.create(), circleHeightfield_minCandidateNormal = vec2.create();
                Narrowphase.prototype[Shape.CIRCLE | Shape.HEIGHTFIELD] = Narrowphase.prototype.circleHeightfield = function(circleBody, circleShape, circlePos, circleAngle, hfBody, hfShape, hfPos, hfAngle, justTest, radius) {
                    var data = hfShape.data, radius = radius || circleShape.radius, w = hfShape.elementWidth, dist = circleHeightfield_dist, candidate = circleHeightfield_candidate, minCandidate = circleHeightfield_minCandidate, minCandidateNormal = circleHeightfield_minCandidateNormal, worldNormal = circleHeightfield_worldNormal, v0 = circleHeightfield_v0, v1 = circleHeightfield_v1;
                    var idxA = Math.floor((circlePos[0] - radius - hfPos[0]) / w), idxB = Math.ceil((circlePos[0] + radius - hfPos[0]) / w);
                    if (idxA < 0) {
                        idxA = 0;
                    }
                    if (idxB >= data.length) {
                        idxB = data.length - 1;
                    }
                    var max = data[idxA], min = data[idxB];
                    for (var i = idxA; i < idxB; i++) {
                        if (data[i] < min) {
                            min = data[i];
                        }
                        if (data[i] > max) {
                            max = data[i];
                        }
                    }
                    if (circlePos[1] - radius > max) {
                        return justTest ? false : 0;
                    }
                    if (circlePos[1] + radius < min) {}
                    var found = false;
                    for (var i = idxA; i < idxB; i++) {
                        vec2.set(v0, i * w, data[i]);
                        vec2.set(v1, (i + 1) * w, data[i + 1]);
                        vec2.add(v0, v0, hfPos);
                        vec2.add(v1, v1, hfPos);
                        vec2.sub(worldNormal, v1, v0);
                        vec2.rotate(worldNormal, worldNormal, Math.PI / 2);
                        vec2.normalize(worldNormal, worldNormal);
                        vec2.scale(candidate, worldNormal, -radius);
                        vec2.add(candidate, candidate, circlePos);
                        vec2.sub(dist, candidate, v0);
                        var d = vec2.dot(dist, worldNormal);
                        if (candidate[0] >= v0[0] && candidate[0] < v1[0] && d <= 0) {
                            if (justTest) {
                                return true;
                            }
                            found = true;
                            vec2.scale(dist, worldNormal, -d);
                            vec2.add(minCandidate, candidate, dist);
                            vec2.copy(minCandidateNormal, worldNormal);
                            var c = this.createContactEquation(hfBody, circleBody, hfShape, circleShape);
                            vec2.copy(c.normalA, minCandidateNormal);
                            vec2.scale(c.contactPointB, c.normalA, -radius);
                            add(c.contactPointB, c.contactPointB, circlePos);
                            sub(c.contactPointB, c.contactPointB, circleBody.position);
                            vec2.copy(c.contactPointA, minCandidate);
                            vec2.sub(c.contactPointA, c.contactPointA, hfBody.position);
                            this.contactEquations.push(c);
                            if (this.enableFriction) {
                                this.frictionEquations.push(this.createFrictionFromContact(c));
                            }
                        }
                    }
                    found = false;
                    if (radius > 0) {
                        for (var i = idxA; i <= idxB; i++) {
                            vec2.set(v0, i * w, data[i]);
                            vec2.add(v0, v0, hfPos);
                            vec2.sub(dist, circlePos, v0);
                            if (vec2.squaredLength(dist) < Math.pow(radius, 2)) {
                                if (justTest) {
                                    return true;
                                }
                                found = true;
                                var c = this.createContactEquation(hfBody, circleBody, hfShape, circleShape);
                                vec2.copy(c.normalA, dist);
                                vec2.normalize(c.normalA, c.normalA);
                                vec2.scale(c.contactPointB, c.normalA, -radius);
                                add(c.contactPointB, c.contactPointB, circlePos);
                                sub(c.contactPointB, c.contactPointB, circleBody.position);
                                sub(c.contactPointA, v0, hfPos);
                                add(c.contactPointA, c.contactPointA, hfPos);
                                sub(c.contactPointA, c.contactPointA, hfBody.position);
                                this.contactEquations.push(c);
                                if (this.enableFriction) {
                                    this.frictionEquations.push(this.createFrictionFromContact(c));
                                }
                            }
                        }
                    }
                    if (found) {
                        return 1;
                    }
                    return 0;
                };
                var convexHeightfield_v0 = vec2.create(), convexHeightfield_v1 = vec2.create(), convexHeightfield_tilePos = vec2.create(), convexHeightfield_tempConvexShape = new Convex([ vec2.create(), vec2.create(), vec2.create(), vec2.create() ]);
                Narrowphase.prototype[Shape.RECTANGLE | Shape.HEIGHTFIELD] = Narrowphase.prototype[Shape.CONVEX | Shape.HEIGHTFIELD] = Narrowphase.prototype.convexHeightfield = function(convexBody, convexShape, convexPos, convexAngle, hfBody, hfShape, hfPos, hfAngle, justTest) {
                    var data = hfShape.data, w = hfShape.elementWidth, v0 = convexHeightfield_v0, v1 = convexHeightfield_v1, tilePos = convexHeightfield_tilePos, tileConvex = convexHeightfield_tempConvexShape;
                    var idxA = Math.floor((convexBody.aabb.lowerBound[0] - hfPos[0]) / w), idxB = Math.ceil((convexBody.aabb.upperBound[0] - hfPos[0]) / w);
                    if (idxA < 0) {
                        idxA = 0;
                    }
                    if (idxB >= data.length) {
                        idxB = data.length - 1;
                    }
                    var max = data[idxA], min = data[idxB];
                    for (var i = idxA; i < idxB; i++) {
                        if (data[i] < min) {
                            min = data[i];
                        }
                        if (data[i] > max) {
                            max = data[i];
                        }
                    }
                    if (convexBody.aabb.lowerBound[1] > max) {
                        return justTest ? false : 0;
                    }
                    var found = false;
                    var numContacts = 0;
                    for (var i = idxA; i < idxB; i++) {
                        vec2.set(v0, i * w, data[i]);
                        vec2.set(v1, (i + 1) * w, data[i + 1]);
                        vec2.add(v0, v0, hfPos);
                        vec2.add(v1, v1, hfPos);
                        var tileHeight = 100;
                        vec2.set(tilePos, (v1[0] + v0[0]) * .5, (v1[1] + v0[1] - tileHeight) * .5);
                        vec2.sub(tileConvex.vertices[0], v1, tilePos);
                        vec2.sub(tileConvex.vertices[1], v0, tilePos);
                        vec2.copy(tileConvex.vertices[2], tileConvex.vertices[1]);
                        vec2.copy(tileConvex.vertices[3], tileConvex.vertices[0]);
                        tileConvex.vertices[2][1] -= tileHeight;
                        tileConvex.vertices[3][1] -= tileHeight;
                        numContacts += this.convexConvex(convexBody, convexShape, convexPos, convexAngle, hfBody, tileConvex, tilePos, 0, justTest);
                    }
                    return numContacts;
                };
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/collision/Narrowphase.js", "/collision");
        }, {
            "../equations/ContactEquation": 24,
            "../equations/Equation": 25,
            "../equations/FrictionEquation": 26,
            "../math/vec2": 33,
            "../objects/Body": 34,
            "../shapes/Circle": 40,
            "../shapes/Convex": 41,
            "../shapes/Rectangle": 46,
            "../shapes/Shape": 47,
            "../utils/TupleDictionary": 51,
            "../utils/Utils": 52,
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1
        } ],
        16: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                var Utils = _dereq_("../utils/Utils"), Broadphase = _dereq_("../collision/Broadphase");
                module.exports = SAPBroadphase;
                function SAPBroadphase() {
                    Broadphase.call(this, Broadphase.SAP);
                    this.axisList = [];
                    this.world = null;
                    this.axisIndex = 0;
                    var axisList = this.axisList;
                    this._addBodyHandler = function(e) {
                        axisList.push(e.body);
                    };
                    this._removeBodyHandler = function(e) {
                        var idx = axisList.indexOf(e.body);
                        if (idx !== -1) {
                            axisList.splice(idx, 1);
                        }
                    };
                }
                SAPBroadphase.prototype = new Broadphase();
                SAPBroadphase.prototype.setWorld = function(world) {
                    this.axisList.length = 0;
                    Utils.appendArray(this.axisList, world.bodies);
                    world.off("addBody", this._addBodyHandler).off("removeBody", this._removeBodyHandler);
                    world.on("addBody", this._addBodyHandler).on("removeBody", this._removeBodyHandler);
                    this.world = world;
                };
                SAPBroadphase.sortAxisList = function(a, axisIndex) {
                    axisIndex = axisIndex | 0;
                    for (var i = 1, l = a.length; i < l; i++) {
                        var v = a[i];
                        for (var j = i - 1; j >= 0; j--) {
                            if (a[j].aabb.lowerBound[axisIndex] <= v.aabb.lowerBound[axisIndex]) {
                                break;
                            }
                            a[j + 1] = a[j];
                        }
                        a[j + 1] = v;
                    }
                    return a;
                };
                SAPBroadphase.prototype.getCollisionPairs = function(world) {
                    var bodies = this.axisList, result = this.result, axisIndex = this.axisIndex;
                    result.length = 0;
                    var l = bodies.length;
                    while (l--) {
                        var b = bodies[l];
                        if (b.aabbNeedsUpdate) {
                            b.updateAABB();
                        }
                    }
                    SAPBroadphase.sortAxisList(bodies, axisIndex);
                    for (var i = 0, N = bodies.length | 0; i !== N; i++) {
                        var bi = bodies[i];
                        for (var j = i + 1; j < N; j++) {
                            var bj = bodies[j];
                            var overlaps = bj.aabb.lowerBound[axisIndex] <= bi.aabb.upperBound[axisIndex];
                            if (!overlaps) {
                                break;
                            }
                            if (Broadphase.canCollide(bi, bj) && this.boundingVolumeCheck(bi, bj)) {
                                result.push(bi, bj);
                            }
                        }
                    }
                    return result;
                };
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/collision/SAPBroadphase.js", "/collision");
        }, {
            "../collision/Broadphase": 12,
            "../utils/Utils": 52,
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1
        } ],
        17: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                module.exports = Constraint;
                var Utils = _dereq_("../utils/Utils");
                function Constraint(bodyA, bodyB, type, options) {
                    this.type = type;
                    options = Utils.defaults(options, {
                        collideConnected: true,
                        wakeUpBodies: true
                    });
                    this.equations = [];
                    this.bodyA = bodyA;
                    this.bodyB = bodyB;
                    this.collideConnected = options.collideConnected;
                    if (options.wakeUpBodies) {
                        if (bodyA) {
                            bodyA.wakeUp();
                        }
                        if (bodyB) {
                            bodyB.wakeUp();
                        }
                    }
                }
                Constraint.prototype.update = function() {
                    throw new Error("method update() not implmemented in this Constraint subclass!");
                };
                Constraint.DISTANCE = 1;
                Constraint.GEAR = 2;
                Constraint.LOCK = 3;
                Constraint.PRISMATIC = 4;
                Constraint.REVOLUTE = 5;
                Constraint.prototype.setStiffness = function(stiffness) {
                    var eqs = this.equations;
                    for (var i = 0; i !== eqs.length; i++) {
                        var eq = eqs[i];
                        eq.stiffness = stiffness;
                        eq.needsUpdate = true;
                    }
                };
                Constraint.prototype.setRelaxation = function(relaxation) {
                    var eqs = this.equations;
                    for (var i = 0; i !== eqs.length; i++) {
                        var eq = eqs[i];
                        eq.relaxation = relaxation;
                        eq.needsUpdate = true;
                    }
                };
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/constraints/Constraint.js", "/constraints");
        }, {
            "../utils/Utils": 52,
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1
        } ],
        18: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                var Constraint = _dereq_("./Constraint"), Equation = _dereq_("../equations/Equation"), vec2 = _dereq_("../math/vec2"), Utils = _dereq_("../utils/Utils");
                module.exports = DistanceConstraint;
                function DistanceConstraint(bodyA, bodyB, options) {
                    options = Utils.defaults(options, {
                        localAnchorA: [ 0, 0 ],
                        localAnchorB: [ 0, 0 ]
                    });
                    Constraint.call(this, bodyA, bodyB, Constraint.DISTANCE, options);
                    this.localAnchorA = vec2.fromValues(options.localAnchorA[0], options.localAnchorA[1]);
                    this.localAnchorB = vec2.fromValues(options.localAnchorB[0], options.localAnchorB[1]);
                    var localAnchorA = this.localAnchorA;
                    var localAnchorB = this.localAnchorB;
                    this.distance = 0;
                    if (typeof options.distance === "number") {
                        this.distance = options.distance;
                    } else {
                        var worldAnchorA = vec2.create(), worldAnchorB = vec2.create(), r = vec2.create();
                        vec2.rotate(worldAnchorA, localAnchorA, bodyA.angle);
                        vec2.rotate(worldAnchorB, localAnchorB, bodyB.angle);
                        vec2.add(r, bodyB.position, worldAnchorB);
                        vec2.sub(r, r, worldAnchorA);
                        vec2.sub(r, r, bodyA.position);
                        this.distance = vec2.length(r);
                    }
                    var maxForce;
                    if (typeof options.maxForce === "undefined") {
                        maxForce = Number.MAX_VALUE;
                    } else {
                        maxForce = options.maxForce;
                    }
                    var normal = new Equation(bodyA, bodyB, -maxForce, maxForce);
                    this.equations = [ normal ];
                    this.maxForce = maxForce;
                    var r = vec2.create();
                    var ri = vec2.create();
                    var rj = vec2.create();
                    var that = this;
                    normal.computeGq = function() {
                        var bodyA = this.bodyA, bodyB = this.bodyB, xi = bodyA.position, xj = bodyB.position;
                        vec2.rotate(ri, localAnchorA, bodyA.angle);
                        vec2.rotate(rj, localAnchorB, bodyB.angle);
                        vec2.add(r, xj, rj);
                        vec2.sub(r, r, ri);
                        vec2.sub(r, r, xi);
                        return vec2.length(r) - that.distance;
                    };
                    this.setMaxForce(maxForce);
                    this.upperLimitEnabled = false;
                    this.upperLimit = 1;
                    this.lowerLimitEnabled = false;
                    this.lowerLimit = 0;
                    this.position = 0;
                }
                DistanceConstraint.prototype = new Constraint();
                var n = vec2.create();
                var ri = vec2.create();
                var rj = vec2.create();
                DistanceConstraint.prototype.update = function() {
                    var normal = this.equations[0], bodyA = this.bodyA, bodyB = this.bodyB, distance = this.distance, xi = bodyA.position, xj = bodyB.position, normalEquation = this.equations[0], G = normal.G;
                    vec2.rotate(ri, this.localAnchorA, bodyA.angle);
                    vec2.rotate(rj, this.localAnchorB, bodyB.angle);
                    vec2.add(n, xj, rj);
                    vec2.sub(n, n, ri);
                    vec2.sub(n, n, xi);
                    this.position = vec2.length(n);
                    var violating = false;
                    if (this.upperLimitEnabled) {
                        if (this.position > this.upperLimit) {
                            normalEquation.maxForce = 0;
                            normalEquation.minForce = -this.maxForce;
                            this.distance = this.upperLimit;
                            violating = true;
                        }
                    }
                    if (this.lowerLimitEnabled) {
                        if (this.position < this.lowerLimit) {
                            normalEquation.maxForce = this.maxForce;
                            normalEquation.minForce = 0;
                            this.distance = this.lowerLimit;
                            violating = true;
                        }
                    }
                    if ((this.lowerLimitEnabled || this.upperLimitEnabled) && !violating) {
                        normalEquation.enabled = false;
                        return;
                    }
                    normalEquation.enabled = true;
                    vec2.normalize(n, n);
                    var rixn = vec2.crossLength(ri, n), rjxn = vec2.crossLength(rj, n);
                    G[0] = -n[0];
                    G[1] = -n[1];
                    G[2] = -rixn;
                    G[3] = n[0];
                    G[4] = n[1];
                    G[5] = rjxn;
                };
                DistanceConstraint.prototype.setMaxForce = function(f) {
                    var normal = this.equations[0];
                    normal.minForce = -f;
                    normal.maxForce = f;
                };
                DistanceConstraint.prototype.getMaxForce = function(f) {
                    var normal = this.equations[0];
                    return normal.maxForce;
                };
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/constraints/DistanceConstraint.js", "/constraints");
        }, {
            "../equations/Equation": 25,
            "../math/vec2": 33,
            "../utils/Utils": 52,
            "./Constraint": 17,
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1
        } ],
        19: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                var Constraint = _dereq_("./Constraint"), Equation = _dereq_("../equations/Equation"), AngleLockEquation = _dereq_("../equations/AngleLockEquation"), vec2 = _dereq_("../math/vec2");
                module.exports = GearConstraint;
                function GearConstraint(bodyA, bodyB, options) {
                    options = options || {};
                    Constraint.call(this, bodyA, bodyB, Constraint.GEAR, options);
                    this.ratio = typeof options.ratio === "number" ? options.ratio : 1;
                    this.angle = typeof options.angle === "number" ? options.angle : bodyB.angle - this.ratio * bodyA.angle;
                    options.angle = this.angle;
                    options.ratio = this.ratio;
                    this.equations = [ new AngleLockEquation(bodyA, bodyB, options) ];
                    if (typeof options.maxTorque === "number") {
                        this.setMaxTorque(options.maxTorque);
                    }
                }
                GearConstraint.prototype = new Constraint();
                GearConstraint.prototype.update = function() {
                    var eq = this.equations[0];
                    if (eq.ratio !== this.ratio) {
                        eq.setRatio(this.ratio);
                    }
                    eq.angle = this.angle;
                };
                GearConstraint.prototype.setMaxTorque = function(torque) {
                    this.equations[0].setMaxTorque(torque);
                };
                GearConstraint.prototype.getMaxTorque = function(torque) {
                    return this.equations[0].maxForce;
                };
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/constraints/GearConstraint.js", "/constraints");
        }, {
            "../equations/AngleLockEquation": 23,
            "../equations/Equation": 25,
            "../math/vec2": 33,
            "./Constraint": 17,
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1
        } ],
        20: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                var Constraint = _dereq_("./Constraint"), vec2 = _dereq_("../math/vec2"), Equation = _dereq_("../equations/Equation");
                module.exports = LockConstraint;
                function LockConstraint(bodyA, bodyB, options) {
                    options = options || {};
                    Constraint.call(this, bodyA, bodyB, Constraint.LOCK, options);
                    var maxForce = typeof options.maxForce === "undefined" ? Number.MAX_VALUE : options.maxForce;
                    var localAngleB = options.localAngleB || 0;
                    var x = new Equation(bodyA, bodyB, -maxForce, maxForce), y = new Equation(bodyA, bodyB, -maxForce, maxForce), rot = new Equation(bodyA, bodyB, -maxForce, maxForce);
                    var l = vec2.create(), g = vec2.create(), that = this;
                    x.computeGq = function() {
                        vec2.rotate(l, that.localOffsetB, bodyA.angle);
                        vec2.sub(g, bodyB.position, bodyA.position);
                        vec2.sub(g, g, l);
                        return g[0];
                    };
                    y.computeGq = function() {
                        vec2.rotate(l, that.localOffsetB, bodyA.angle);
                        vec2.sub(g, bodyB.position, bodyA.position);
                        vec2.sub(g, g, l);
                        return g[1];
                    };
                    var r = vec2.create(), t = vec2.create();
                    rot.computeGq = function() {
                        vec2.rotate(r, that.localOffsetB, bodyB.angle - that.localAngleB);
                        vec2.scale(r, r, -1);
                        vec2.sub(g, bodyA.position, bodyB.position);
                        vec2.add(g, g, r);
                        vec2.rotate(t, r, -Math.PI / 2);
                        vec2.normalize(t, t);
                        return vec2.dot(g, t);
                    };
                    this.localOffsetB = vec2.create();
                    if (options.localOffsetB) {
                        vec2.copy(this.localOffsetB, options.localOffsetB);
                    } else {
                        vec2.sub(this.localOffsetB, bodyB.position, bodyA.position);
                        vec2.rotate(this.localOffsetB, this.localOffsetB, -bodyA.angle);
                    }
                    this.localAngleB = 0;
                    if (typeof options.localAngleB === "number") {
                        this.localAngleB = options.localAngleB;
                    } else {
                        this.localAngleB = bodyB.angle - bodyA.angle;
                    }
                    this.equations.push(x, y, rot);
                    this.setMaxForce(maxForce);
                }
                LockConstraint.prototype = new Constraint();
                LockConstraint.prototype.setMaxForce = function(force) {
                    var eqs = this.equations;
                    for (var i = 0; i < this.equations.length; i++) {
                        eqs[i].maxForce = force;
                        eqs[i].minForce = -force;
                    }
                };
                LockConstraint.prototype.getMaxForce = function() {
                    return this.equations[0].maxForce;
                };
                var l = vec2.create();
                var r = vec2.create();
                var t = vec2.create();
                var xAxis = vec2.fromValues(1, 0);
                var yAxis = vec2.fromValues(0, 1);
                LockConstraint.prototype.update = function() {
                    var x = this.equations[0], y = this.equations[1], rot = this.equations[2], bodyA = this.bodyA, bodyB = this.bodyB;
                    vec2.rotate(l, this.localOffsetB, bodyA.angle);
                    vec2.rotate(r, this.localOffsetB, bodyB.angle - this.localAngleB);
                    vec2.scale(r, r, -1);
                    vec2.rotate(t, r, Math.PI / 2);
                    vec2.normalize(t, t);
                    x.G[0] = -1;
                    x.G[1] = 0;
                    x.G[2] = -vec2.crossLength(l, xAxis);
                    x.G[3] = 1;
                    y.G[0] = 0;
                    y.G[1] = -1;
                    y.G[2] = -vec2.crossLength(l, yAxis);
                    y.G[4] = 1;
                    rot.G[0] = -t[0];
                    rot.G[1] = -t[1];
                    rot.G[3] = t[0];
                    rot.G[4] = t[1];
                    rot.G[5] = vec2.crossLength(r, t);
                };
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/constraints/LockConstraint.js", "/constraints");
        }, {
            "../equations/Equation": 25,
            "../math/vec2": 33,
            "./Constraint": 17,
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1
        } ],
        21: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                var Constraint = _dereq_("./Constraint"), ContactEquation = _dereq_("../equations/ContactEquation"), Equation = _dereq_("../equations/Equation"), vec2 = _dereq_("../math/vec2"), RotationalLockEquation = _dereq_("../equations/RotationalLockEquation");
                module.exports = PrismaticConstraint;
                function PrismaticConstraint(bodyA, bodyB, options) {
                    options = options || {};
                    Constraint.call(this, bodyA, bodyB, Constraint.PRISMATIC, options);
                    var localAnchorA = vec2.fromValues(0, 0), localAxisA = vec2.fromValues(1, 0), localAnchorB = vec2.fromValues(0, 0);
                    if (options.localAnchorA) {
                        vec2.copy(localAnchorA, options.localAnchorA);
                    }
                    if (options.localAxisA) {
                        vec2.copy(localAxisA, options.localAxisA);
                    }
                    if (options.localAnchorB) {
                        vec2.copy(localAnchorB, options.localAnchorB);
                    }
                    this.localAnchorA = localAnchorA;
                    this.localAnchorB = localAnchorB;
                    this.localAxisA = localAxisA;
                    var maxForce = this.maxForce = typeof options.maxForce !== "undefined" ? options.maxForce : Number.MAX_VALUE;
                    var trans = new Equation(bodyA, bodyB, -maxForce, maxForce);
                    var ri = new vec2.create(), rj = new vec2.create(), gg = new vec2.create(), t = new vec2.create();
                    trans.computeGq = function() {
                        return vec2.dot(gg, t);
                    };
                    trans.updateJacobian = function() {
                        var G = this.G, xi = bodyA.position, xj = bodyB.position;
                        vec2.rotate(ri, localAnchorA, bodyA.angle);
                        vec2.rotate(rj, localAnchorB, bodyB.angle);
                        vec2.add(gg, xj, rj);
                        vec2.sub(gg, gg, xi);
                        vec2.sub(gg, gg, ri);
                        vec2.rotate(t, localAxisA, bodyA.angle + Math.PI / 2);
                        G[0] = -t[0];
                        G[1] = -t[1];
                        G[2] = -vec2.crossLength(ri, t) + vec2.crossLength(t, gg);
                        G[3] = t[0];
                        G[4] = t[1];
                        G[5] = vec2.crossLength(rj, t);
                    };
                    this.equations.push(trans);
                    if (!options.disableRotationalLock) {
                        var rot = new RotationalLockEquation(bodyA, bodyB, -maxForce, maxForce);
                        this.equations.push(rot);
                    }
                    this.position = 0;
                    this.velocity = 0;
                    this.lowerLimitEnabled = typeof options.lowerLimit !== "undefined" ? true : false;
                    this.upperLimitEnabled = typeof options.upperLimit !== "undefined" ? true : false;
                    this.lowerLimit = typeof options.lowerLimit !== "undefined" ? options.lowerLimit : 0;
                    this.upperLimit = typeof options.upperLimit !== "undefined" ? options.upperLimit : 1;
                    this.upperLimitEquation = new ContactEquation(bodyA, bodyB);
                    this.lowerLimitEquation = new ContactEquation(bodyA, bodyB);
                    this.upperLimitEquation.minForce = this.lowerLimitEquation.minForce = 0;
                    this.upperLimitEquation.maxForce = this.lowerLimitEquation.maxForce = maxForce;
                    this.motorEquation = new Equation(bodyA, bodyB);
                    this.motorEnabled = false;
                    this.motorSpeed = 0;
                    var that = this;
                    var motorEquation = this.motorEquation;
                    var old = motorEquation.computeGW;
                    motorEquation.computeGq = function() {
                        return 0;
                    };
                    motorEquation.computeGW = function() {
                        var G = this.G, bi = this.bodyA, bj = this.bodyB, vi = bi.velocity, vj = bj.velocity, wi = bi.angularVelocity, wj = bj.angularVelocity;
                        return this.gmult(G, vi, wi, vj, wj) + that.motorSpeed;
                    };
                }
                PrismaticConstraint.prototype = new Constraint();
                var worldAxisA = vec2.create(), worldAnchorA = vec2.create(), worldAnchorB = vec2.create(), orientedAnchorA = vec2.create(), orientedAnchorB = vec2.create(), tmp = vec2.create();
                PrismaticConstraint.prototype.update = function() {
                    var eqs = this.equations, trans = eqs[0], upperLimit = this.upperLimit, lowerLimit = this.lowerLimit, upperLimitEquation = this.upperLimitEquation, lowerLimitEquation = this.lowerLimitEquation, bodyA = this.bodyA, bodyB = this.bodyB, localAxisA = this.localAxisA, localAnchorA = this.localAnchorA, localAnchorB = this.localAnchorB;
                    trans.updateJacobian();
                    vec2.rotate(worldAxisA, localAxisA, bodyA.angle);
                    vec2.rotate(orientedAnchorA, localAnchorA, bodyA.angle);
                    vec2.add(worldAnchorA, orientedAnchorA, bodyA.position);
                    vec2.rotate(orientedAnchorB, localAnchorB, bodyB.angle);
                    vec2.add(worldAnchorB, orientedAnchorB, bodyB.position);
                    var relPosition = this.position = vec2.dot(worldAnchorB, worldAxisA) - vec2.dot(worldAnchorA, worldAxisA);
                    if (this.motorEnabled) {
                        var G = this.motorEquation.G;
                        G[0] = worldAxisA[0];
                        G[1] = worldAxisA[1];
                        G[2] = vec2.crossLength(worldAxisA, orientedAnchorB);
                        G[3] = -worldAxisA[0];
                        G[4] = -worldAxisA[1];
                        G[5] = -vec2.crossLength(worldAxisA, orientedAnchorA);
                    }
                    if (this.upperLimitEnabled && relPosition > upperLimit) {
                        vec2.scale(upperLimitEquation.normalA, worldAxisA, -1);
                        vec2.sub(upperLimitEquation.contactPointA, worldAnchorA, bodyA.position);
                        vec2.sub(upperLimitEquation.contactPointB, worldAnchorB, bodyB.position);
                        vec2.scale(tmp, worldAxisA, upperLimit);
                        vec2.add(upperLimitEquation.contactPointA, upperLimitEquation.contactPointA, tmp);
                        if (eqs.indexOf(upperLimitEquation) === -1) {
                            eqs.push(upperLimitEquation);
                        }
                    } else {
                        var idx = eqs.indexOf(upperLimitEquation);
                        if (idx !== -1) {
                            eqs.splice(idx, 1);
                        }
                    }
                    if (this.lowerLimitEnabled && relPosition < lowerLimit) {
                        vec2.scale(lowerLimitEquation.normalA, worldAxisA, 1);
                        vec2.sub(lowerLimitEquation.contactPointA, worldAnchorA, bodyA.position);
                        vec2.sub(lowerLimitEquation.contactPointB, worldAnchorB, bodyB.position);
                        vec2.scale(tmp, worldAxisA, lowerLimit);
                        vec2.sub(lowerLimitEquation.contactPointB, lowerLimitEquation.contactPointB, tmp);
                        if (eqs.indexOf(lowerLimitEquation) === -1) {
                            eqs.push(lowerLimitEquation);
                        }
                    } else {
                        var idx = eqs.indexOf(lowerLimitEquation);
                        if (idx !== -1) {
                            eqs.splice(idx, 1);
                        }
                    }
                };
                PrismaticConstraint.prototype.enableMotor = function() {
                    if (this.motorEnabled) {
                        return;
                    }
                    this.equations.push(this.motorEquation);
                    this.motorEnabled = true;
                };
                PrismaticConstraint.prototype.disableMotor = function() {
                    if (!this.motorEnabled) {
                        return;
                    }
                    var i = this.equations.indexOf(this.motorEquation);
                    this.equations.splice(i, 1);
                    this.motorEnabled = false;
                };
                PrismaticConstraint.prototype.setLimits = function(lower, upper) {
                    if (typeof lower === "number") {
                        this.lowerLimit = lower;
                        this.lowerLimitEnabled = true;
                    } else {
                        this.lowerLimit = lower;
                        this.lowerLimitEnabled = false;
                    }
                    if (typeof upper === "number") {
                        this.upperLimit = upper;
                        this.upperLimitEnabled = true;
                    } else {
                        this.upperLimit = upper;
                        this.upperLimitEnabled = false;
                    }
                };
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/constraints/PrismaticConstraint.js", "/constraints");
        }, {
            "../equations/ContactEquation": 24,
            "../equations/Equation": 25,
            "../equations/RotationalLockEquation": 27,
            "../math/vec2": 33,
            "./Constraint": 17,
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1
        } ],
        22: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                var Constraint = _dereq_("./Constraint"), Equation = _dereq_("../equations/Equation"), RotationalVelocityEquation = _dereq_("../equations/RotationalVelocityEquation"), RotationalLockEquation = _dereq_("../equations/RotationalLockEquation"), vec2 = _dereq_("../math/vec2");
                module.exports = RevoluteConstraint;
                var worldPivotA = vec2.create(), worldPivotB = vec2.create(), xAxis = vec2.fromValues(1, 0), yAxis = vec2.fromValues(0, 1), g = vec2.create();
                function RevoluteConstraint(bodyA, bodyB, options) {
                    options = options || {};
                    Constraint.call(this, bodyA, bodyB, Constraint.REVOLUTE, options);
                    var maxForce = this.maxForce = typeof options.maxForce !== "undefined" ? options.maxForce : Number.MAX_VALUE;
                    this.pivotA = vec2.create();
                    this.pivotB = vec2.create();
                    if (options.worldPivot) {
                        vec2.sub(this.pivotA, options.worldPivot, bodyA.position);
                        vec2.sub(this.pivotB, options.worldPivot, bodyB.position);
                        vec2.rotate(this.pivotA, this.pivotA, -bodyA.angle);
                        vec2.rotate(this.pivotB, this.pivotB, -bodyB.angle);
                    } else {
                        vec2.copy(this.pivotA, options.localPivotA);
                        vec2.copy(this.pivotB, options.localPivotB);
                    }
                    var eqs = this.equations = [ new Equation(bodyA, bodyB, -maxForce, maxForce), new Equation(bodyA, bodyB, -maxForce, maxForce) ];
                    var x = eqs[0];
                    var y = eqs[1];
                    var that = this;
                    x.computeGq = function() {
                        vec2.rotate(worldPivotA, that.pivotA, bodyA.angle);
                        vec2.rotate(worldPivotB, that.pivotB, bodyB.angle);
                        vec2.add(g, bodyB.position, worldPivotB);
                        vec2.sub(g, g, bodyA.position);
                        vec2.sub(g, g, worldPivotA);
                        return vec2.dot(g, xAxis);
                    };
                    y.computeGq = function() {
                        vec2.rotate(worldPivotA, that.pivotA, bodyA.angle);
                        vec2.rotate(worldPivotB, that.pivotB, bodyB.angle);
                        vec2.add(g, bodyB.position, worldPivotB);
                        vec2.sub(g, g, bodyA.position);
                        vec2.sub(g, g, worldPivotA);
                        return vec2.dot(g, yAxis);
                    };
                    y.minForce = x.minForce = -maxForce;
                    y.maxForce = x.maxForce = maxForce;
                    this.motorEquation = new RotationalVelocityEquation(bodyA, bodyB);
                    this.motorEnabled = false;
                    this.angle = 0;
                    this.lowerLimitEnabled = false;
                    this.upperLimitEnabled = false;
                    this.lowerLimit = 0;
                    this.upperLimit = 0;
                    this.upperLimitEquation = new RotationalLockEquation(bodyA, bodyB);
                    this.lowerLimitEquation = new RotationalLockEquation(bodyA, bodyB);
                    this.upperLimitEquation.minForce = 0;
                    this.lowerLimitEquation.maxForce = 0;
                }
                RevoluteConstraint.prototype = new Constraint();
                RevoluteConstraint.prototype.setLimits = function(lower, upper) {
                    if (typeof lower === "number") {
                        this.lowerLimit = lower;
                        this.lowerLimitEnabled = true;
                    } else {
                        this.lowerLimit = lower;
                        this.lowerLimitEnabled = false;
                    }
                    if (typeof upper === "number") {
                        this.upperLimit = upper;
                        this.upperLimitEnabled = true;
                    } else {
                        this.upperLimit = upper;
                        this.upperLimitEnabled = false;
                    }
                };
                RevoluteConstraint.prototype.update = function() {
                    var bodyA = this.bodyA, bodyB = this.bodyB, pivotA = this.pivotA, pivotB = this.pivotB, eqs = this.equations, normal = eqs[0], tangent = eqs[1], x = eqs[0], y = eqs[1], upperLimit = this.upperLimit, lowerLimit = this.lowerLimit, upperLimitEquation = this.upperLimitEquation, lowerLimitEquation = this.lowerLimitEquation;
                    var relAngle = this.angle = bodyB.angle - bodyA.angle;
                    if (this.upperLimitEnabled && relAngle > upperLimit) {
                        upperLimitEquation.angle = upperLimit;
                        if (eqs.indexOf(upperLimitEquation) === -1) {
                            eqs.push(upperLimitEquation);
                        }
                    } else {
                        var idx = eqs.indexOf(upperLimitEquation);
                        if (idx !== -1) {
                            eqs.splice(idx, 1);
                        }
                    }
                    if (this.lowerLimitEnabled && relAngle < lowerLimit) {
                        lowerLimitEquation.angle = lowerLimit;
                        if (eqs.indexOf(lowerLimitEquation) === -1) {
                            eqs.push(lowerLimitEquation);
                        }
                    } else {
                        var idx = eqs.indexOf(lowerLimitEquation);
                        if (idx !== -1) {
                            eqs.splice(idx, 1);
                        }
                    }
                    vec2.rotate(worldPivotA, pivotA, bodyA.angle);
                    vec2.rotate(worldPivotB, pivotB, bodyB.angle);
                    x.G[0] = -1;
                    x.G[1] = 0;
                    x.G[2] = -vec2.crossLength(worldPivotA, xAxis);
                    x.G[3] = 1;
                    x.G[4] = 0;
                    x.G[5] = vec2.crossLength(worldPivotB, xAxis);
                    y.G[0] = 0;
                    y.G[1] = -1;
                    y.G[2] = -vec2.crossLength(worldPivotA, yAxis);
                    y.G[3] = 0;
                    y.G[4] = 1;
                    y.G[5] = vec2.crossLength(worldPivotB, yAxis);
                };
                RevoluteConstraint.prototype.enableMotor = function() {
                    if (this.motorEnabled) {
                        return;
                    }
                    this.equations.push(this.motorEquation);
                    this.motorEnabled = true;
                };
                RevoluteConstraint.prototype.disableMotor = function() {
                    if (!this.motorEnabled) {
                        return;
                    }
                    var i = this.equations.indexOf(this.motorEquation);
                    this.equations.splice(i, 1);
                    this.motorEnabled = false;
                };
                RevoluteConstraint.prototype.motorIsEnabled = function() {
                    return !!this.motorEnabled;
                };
                RevoluteConstraint.prototype.setMotorSpeed = function(speed) {
                    if (!this.motorEnabled) {
                        return;
                    }
                    var i = this.equations.indexOf(this.motorEquation);
                    this.equations[i].relativeVelocity = speed;
                };
                RevoluteConstraint.prototype.getMotorSpeed = function() {
                    if (!this.motorEnabled) {
                        return false;
                    }
                    return this.motorEquation.relativeVelocity;
                };
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/constraints/RevoluteConstraint.js", "/constraints");
        }, {
            "../equations/Equation": 25,
            "../equations/RotationalLockEquation": 27,
            "../equations/RotationalVelocityEquation": 28,
            "../math/vec2": 33,
            "./Constraint": 17,
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1
        } ],
        23: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                var Equation = _dereq_("./Equation"), vec2 = _dereq_("../math/vec2");
                module.exports = AngleLockEquation;
                function AngleLockEquation(bodyA, bodyB, options) {
                    options = options || {};
                    Equation.call(this, bodyA, bodyB, -Number.MAX_VALUE, Number.MAX_VALUE);
                    this.angle = options.angle || 0;
                    this.ratio = typeof options.ratio === "number" ? options.ratio : 1;
                    this.setRatio(this.ratio);
                }
                AngleLockEquation.prototype = new Equation();
                AngleLockEquation.prototype.constructor = AngleLockEquation;
                AngleLockEquation.prototype.computeGq = function() {
                    return this.ratio * this.bodyA.angle - this.bodyB.angle + this.angle;
                };
                AngleLockEquation.prototype.setRatio = function(ratio) {
                    var G = this.G;
                    G[2] = ratio;
                    G[5] = -1;
                    this.ratio = ratio;
                };
                AngleLockEquation.prototype.setMaxTorque = function(torque) {
                    this.maxForce = torque;
                    this.minForce = -torque;
                };
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/equations/AngleLockEquation.js", "/equations");
        }, {
            "../math/vec2": 33,
            "./Equation": 25,
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1
        } ],
        24: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                var Equation = _dereq_("./Equation"), vec2 = _dereq_("../math/vec2");
                module.exports = ContactEquation;
                function ContactEquation(bodyA, bodyB) {
                    Equation.call(this, bodyA, bodyB, 0, Number.MAX_VALUE);
                    this.contactPointA = vec2.create();
                    this.penetrationVec = vec2.create();
                    this.contactPointB = vec2.create();
                    this.normalA = vec2.create();
                    this.restitution = 0;
                    this.firstImpact = false;
                    this.shapeA = null;
                    this.shapeB = null;
                }
                ContactEquation.prototype = new Equation();
                ContactEquation.prototype.constructor = ContactEquation;
                ContactEquation.prototype.computeB = function(a, b, h) {
                    var bi = this.bodyA, bj = this.bodyB, ri = this.contactPointA, rj = this.contactPointB, xi = bi.position, xj = bj.position;
                    var penetrationVec = this.penetrationVec, n = this.normalA, G = this.G;
                    var rixn = vec2.crossLength(ri, n), rjxn = vec2.crossLength(rj, n);
                    G[0] = -n[0];
                    G[1] = -n[1];
                    G[2] = -rixn;
                    G[3] = n[0];
                    G[4] = n[1];
                    G[5] = rjxn;
                    vec2.add(penetrationVec, xj, rj);
                    vec2.sub(penetrationVec, penetrationVec, xi);
                    vec2.sub(penetrationVec, penetrationVec, ri);
                    var GW, Gq;
                    if (this.firstImpact && this.restitution !== 0) {
                        Gq = 0;
                        GW = 1 / b * (1 + this.restitution) * this.computeGW();
                    } else {
                        Gq = vec2.dot(n, penetrationVec) + this.offset;
                        GW = this.computeGW();
                    }
                    var GiMf = this.computeGiMf();
                    var B = -Gq * a - GW * b - h * GiMf;
                    return B;
                };
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/equations/ContactEquation.js", "/equations");
        }, {
            "../math/vec2": 33,
            "./Equation": 25,
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1
        } ],
        25: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                module.exports = Equation;
                var vec2 = _dereq_("../math/vec2"), Utils = _dereq_("../utils/Utils"), Body = _dereq_("../objects/Body");
                function Equation(bodyA, bodyB, minForce, maxForce) {
                    this.minForce = typeof minForce === "undefined" ? -Number.MAX_VALUE : minForce;
                    this.maxForce = typeof maxForce === "undefined" ? Number.MAX_VALUE : maxForce;
                    this.bodyA = bodyA;
                    this.bodyB = bodyB;
                    this.stiffness = Equation.DEFAULT_STIFFNESS;
                    this.relaxation = Equation.DEFAULT_RELAXATION;
                    this.G = new Utils.ARRAY_TYPE(6);
                    for (var i = 0; i < 6; i++) {
                        this.G[i] = 0;
                    }
                    this.offset = 0;
                    this.a = 0;
                    this.b = 0;
                    this.epsilon = 0;
                    this.timeStep = 1 / 60;
                    this.needsUpdate = true;
                    this.multiplier = 0;
                    this.relativeVelocity = 0;
                    this.enabled = true;
                }
                Equation.prototype.constructor = Equation;
                Equation.DEFAULT_STIFFNESS = 1e6;
                Equation.DEFAULT_RELAXATION = 4;
                Equation.prototype.update = function() {
                    var k = this.stiffness, d = this.relaxation, h = this.timeStep;
                    this.a = 4 / (h * (1 + 4 * d));
                    this.b = 4 * d / (1 + 4 * d);
                    this.epsilon = 4 / (h * h * k * (1 + 4 * d));
                    this.needsUpdate = false;
                };
                Equation.prototype.gmult = function(G, vi, wi, vj, wj) {
                    return G[0] * vi[0] + G[1] * vi[1] + G[2] * wi + G[3] * vj[0] + G[4] * vj[1] + G[5] * wj;
                };
                Equation.prototype.computeB = function(a, b, h) {
                    var GW = this.computeGW();
                    var Gq = this.computeGq();
                    var GiMf = this.computeGiMf();
                    return -Gq * a - GW * b - GiMf * h;
                };
                var qi = vec2.create(), qj = vec2.create();
                Equation.prototype.computeGq = function() {
                    var G = this.G, bi = this.bodyA, bj = this.bodyB, xi = bi.position, xj = bj.position, ai = bi.angle, aj = bj.angle;
                    return this.gmult(G, qi, ai, qj, aj) + this.offset;
                };
                Equation.prototype.computeGW = function() {
                    var G = this.G, bi = this.bodyA, bj = this.bodyB, vi = bi.velocity, vj = bj.velocity, wi = bi.angularVelocity, wj = bj.angularVelocity;
                    return this.gmult(G, vi, wi, vj, wj) + this.relativeVelocity;
                };
                Equation.prototype.computeGWlambda = function() {
                    var G = this.G, bi = this.bodyA, bj = this.bodyB, vi = bi.vlambda, vj = bj.vlambda, wi = bi.wlambda, wj = bj.wlambda;
                    return this.gmult(G, vi, wi, vj, wj);
                };
                var iMfi = vec2.create(), iMfj = vec2.create();
                Equation.prototype.computeGiMf = function() {
                    var bi = this.bodyA, bj = this.bodyB, fi = bi.force, ti = bi.angularForce, fj = bj.force, tj = bj.angularForce, invMassi = bi.invMassSolve, invMassj = bj.invMassSolve, invIi = bi.invInertiaSolve, invIj = bj.invInertiaSolve, G = this.G;
                    vec2.scale(iMfi, fi, invMassi);
                    vec2.scale(iMfj, fj, invMassj);
                    return this.gmult(G, iMfi, ti * invIi, iMfj, tj * invIj);
                };
                Equation.prototype.computeGiMGt = function() {
                    var bi = this.bodyA, bj = this.bodyB, invMassi = bi.invMassSolve, invMassj = bj.invMassSolve, invIi = bi.invInertiaSolve, invIj = bj.invInertiaSolve, G = this.G;
                    return G[0] * G[0] * invMassi + G[1] * G[1] * invMassi + G[2] * G[2] * invIi + G[3] * G[3] * invMassj + G[4] * G[4] * invMassj + G[5] * G[5] * invIj;
                };
                var addToWlambda_temp = vec2.create(), addToWlambda_Gi = vec2.create(), addToWlambda_Gj = vec2.create(), addToWlambda_ri = vec2.create(), addToWlambda_rj = vec2.create(), addToWlambda_Mdiag = vec2.create();
                Equation.prototype.addToWlambda = function(deltalambda) {
                    var bi = this.bodyA, bj = this.bodyB, temp = addToWlambda_temp, Gi = addToWlambda_Gi, Gj = addToWlambda_Gj, ri = addToWlambda_ri, rj = addToWlambda_rj, invMassi = bi.invMassSolve, invMassj = bj.invMassSolve, invIi = bi.invInertiaSolve, invIj = bj.invInertiaSolve, Mdiag = addToWlambda_Mdiag, G = this.G;
                    Gi[0] = G[0];
                    Gi[1] = G[1];
                    Gj[0] = G[3];
                    Gj[1] = G[4];
                    vec2.scale(temp, Gi, invMassi * deltalambda);
                    vec2.add(bi.vlambda, bi.vlambda, temp);
                    bi.wlambda += invIi * G[2] * deltalambda;
                    vec2.scale(temp, Gj, invMassj * deltalambda);
                    vec2.add(bj.vlambda, bj.vlambda, temp);
                    bj.wlambda += invIj * G[5] * deltalambda;
                };
                Equation.prototype.computeInvC = function(eps) {
                    return 1 / (this.computeGiMGt() + eps);
                };
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/equations/Equation.js", "/equations");
        }, {
            "../math/vec2": 33,
            "../objects/Body": 34,
            "../utils/Utils": 52,
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1
        } ],
        26: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                var vec2 = _dereq_("../math/vec2"), Equation = _dereq_("./Equation"), Utils = _dereq_("../utils/Utils");
                module.exports = FrictionEquation;
                function FrictionEquation(bodyA, bodyB, slipForce) {
                    Equation.call(this, bodyA, bodyB, -slipForce, slipForce);
                    this.contactPointA = vec2.create();
                    this.contactPointB = vec2.create();
                    this.t = vec2.create();
                    this.contactEquations = [];
                    this.shapeA = null;
                    this.shapeB = null;
                    this.frictionCoefficient = .3;
                }
                FrictionEquation.prototype = new Equation();
                FrictionEquation.prototype.constructor = FrictionEquation;
                FrictionEquation.prototype.setSlipForce = function(slipForce) {
                    this.maxForce = slipForce;
                    this.minForce = -slipForce;
                };
                FrictionEquation.prototype.getSlipForce = function() {
                    return this.maxForce;
                };
                FrictionEquation.prototype.computeB = function(a, b, h) {
                    var bi = this.bodyA, bj = this.bodyB, ri = this.contactPointA, rj = this.contactPointB, t = this.t, G = this.G;
                    G[0] = -t[0];
                    G[1] = -t[1];
                    G[2] = -vec2.crossLength(ri, t);
                    G[3] = t[0];
                    G[4] = t[1];
                    G[5] = vec2.crossLength(rj, t);
                    var GW = this.computeGW(), GiMf = this.computeGiMf();
                    var B = -GW * b - h * GiMf;
                    return B;
                };
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/equations/FrictionEquation.js", "/equations");
        }, {
            "../math/vec2": 33,
            "../utils/Utils": 52,
            "./Equation": 25,
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1
        } ],
        27: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                var Equation = _dereq_("./Equation"), vec2 = _dereq_("../math/vec2");
                module.exports = RotationalLockEquation;
                function RotationalLockEquation(bodyA, bodyB, options) {
                    options = options || {};
                    Equation.call(this, bodyA, bodyB, -Number.MAX_VALUE, Number.MAX_VALUE);
                    this.angle = options.angle || 0;
                    var G = this.G;
                    G[2] = 1;
                    G[5] = -1;
                }
                RotationalLockEquation.prototype = new Equation();
                RotationalLockEquation.prototype.constructor = RotationalLockEquation;
                var worldVectorA = vec2.create(), worldVectorB = vec2.create(), xAxis = vec2.fromValues(1, 0), yAxis = vec2.fromValues(0, 1);
                RotationalLockEquation.prototype.computeGq = function() {
                    vec2.rotate(worldVectorA, xAxis, this.bodyA.angle + this.angle);
                    vec2.rotate(worldVectorB, yAxis, this.bodyB.angle);
                    return vec2.dot(worldVectorA, worldVectorB);
                };
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/equations/RotationalLockEquation.js", "/equations");
        }, {
            "../math/vec2": 33,
            "./Equation": 25,
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1
        } ],
        28: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                var Equation = _dereq_("./Equation"), vec2 = _dereq_("../math/vec2");
                module.exports = RotationalVelocityEquation;
                function RotationalVelocityEquation(bodyA, bodyB) {
                    Equation.call(this, bodyA, bodyB, -Number.MAX_VALUE, Number.MAX_VALUE);
                    this.relativeVelocity = 1;
                    this.ratio = 1;
                }
                RotationalVelocityEquation.prototype = new Equation();
                RotationalVelocityEquation.prototype.constructor = RotationalVelocityEquation;
                RotationalVelocityEquation.prototype.computeB = function(a, b, h) {
                    var G = this.G;
                    G[2] = -1;
                    G[5] = this.ratio;
                    var GiMf = this.computeGiMf();
                    var GW = this.computeGW();
                    var B = -GW * b - h * GiMf;
                    return B;
                };
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/equations/RotationalVelocityEquation.js", "/equations");
        }, {
            "../math/vec2": 33,
            "./Equation": 25,
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1
        } ],
        29: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                var EventEmitter = function() {};
                module.exports = EventEmitter;
                EventEmitter.prototype = {
                    constructor: EventEmitter,
                    on: function(type, listener, context) {
                        listener.context = context || this;
                        if (this._listeners === undefined) {
                            this._listeners = {};
                        }
                        var listeners = this._listeners;
                        if (listeners[type] === undefined) {
                            listeners[type] = [];
                        }
                        if (listeners[type].indexOf(listener) === -1) {
                            listeners[type].push(listener);
                        }
                        return this;
                    },
                    has: function(type, listener) {
                        if (this._listeners === undefined) {
                            return false;
                        }
                        var listeners = this._listeners;
                        if (listener) {
                            if (listeners[type] !== undefined && listeners[type].indexOf(listener) !== -1) {
                                return true;
                            }
                        } else {
                            if (listeners[type] !== undefined) {
                                return true;
                            }
                        }
                        return false;
                    },
                    off: function(type, listener) {
                        if (this._listeners === undefined) {
                            return this;
                        }
                        var listeners = this._listeners;
                        var index = listeners[type].indexOf(listener);
                        if (index !== -1) {
                            listeners[type].splice(index, 1);
                        }
                        return this;
                    },
                    emit: function(event) {
                        if (this._listeners === undefined) {
                            return this;
                        }
                        var listeners = this._listeners;
                        var listenerArray = listeners[event.type];
                        if (listenerArray !== undefined) {
                            event.target = this;
                            for (var i = 0, l = listenerArray.length; i < l; i++) {
                                var listener = listenerArray[i];
                                listener.call(listener.context, event);
                            }
                        }
                        return this;
                    }
                };
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/events/EventEmitter.js", "/events");
        }, {
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1
        } ],
        30: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                var Material = _dereq_("./Material");
                var Equation = _dereq_("../equations/Equation");
                module.exports = ContactMaterial;
                function ContactMaterial(materialA, materialB, options) {
                    options = options || {};
                    if (!(materialA instanceof Material) || !(materialB instanceof Material)) {
                        throw new Error("First two arguments must be Material instances.");
                    }
                    this.id = ContactMaterial.idCounter++;
                    this.materialA = materialA;
                    this.materialB = materialB;
                    this.friction = typeof options.friction !== "undefined" ? Number(options.friction) : .3;
                    this.restitution = typeof options.restitution !== "undefined" ? Number(options.restitution) : 0;
                    this.stiffness = typeof options.stiffness !== "undefined" ? Number(options.stiffness) : Equation.DEFAULT_STIFFNESS;
                    this.relaxation = typeof options.relaxation !== "undefined" ? Number(options.relaxation) : Equation.DEFAULT_RELAXATION;
                    this.frictionStiffness = typeof options.frictionStiffness !== "undefined" ? Number(options.frictionStiffness) : Equation.DEFAULT_STIFFNESS;
                    this.frictionRelaxation = typeof options.frictionRelaxation !== "undefined" ? Number(options.frictionRelaxation) : Equation.DEFAULT_RELAXATION;
                    this.surfaceVelocity = typeof options.surfaceVelocity !== "undefined" ? Number(options.surfaceVelocity) : 0;
                    this.contactSkinSize = .005;
                }
                ContactMaterial.idCounter = 0;
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/material/ContactMaterial.js", "/material");
        }, {
            "../equations/Equation": 25,
            "./Material": 31,
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1
        } ],
        31: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                module.exports = Material;
                function Material(id) {
                    this.id = id || Material.idCounter++;
                }
                Material.idCounter = 0;
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/material/Material.js", "/material");
        }, {
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1
        } ],
        32: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                var PolyK = {};
                PolyK.GetArea = function(p) {
                    if (p.length < 6) return 0;
                    var l = p.length - 2;
                    var sum = 0;
                    for (var i = 0; i < l; i += 2) sum += (p[i + 2] - p[i]) * (p[i + 1] + p[i + 3]);
                    sum += (p[0] - p[l]) * (p[l + 1] + p[1]);
                    return -sum * .5;
                };
                PolyK.Triangulate = function(p) {
                    var n = p.length >> 1;
                    if (n < 3) return [];
                    var tgs = [];
                    var avl = [];
                    for (var i = 0; i < n; i++) avl.push(i);
                    var i = 0;
                    var al = n;
                    while (al > 3) {
                        var i0 = avl[(i + 0) % al];
                        var i1 = avl[(i + 1) % al];
                        var i2 = avl[(i + 2) % al];
                        var ax = p[2 * i0], ay = p[2 * i0 + 1];
                        var bx = p[2 * i1], by = p[2 * i1 + 1];
                        var cx = p[2 * i2], cy = p[2 * i2 + 1];
                        var earFound = false;
                        if (PolyK._convex(ax, ay, bx, by, cx, cy)) {
                            earFound = true;
                            for (var j = 0; j < al; j++) {
                                var vi = avl[j];
                                if (vi == i0 || vi == i1 || vi == i2) continue;
                                if (PolyK._PointInTriangle(p[2 * vi], p[2 * vi + 1], ax, ay, bx, by, cx, cy)) {
                                    earFound = false;
                                    break;
                                }
                            }
                        }
                        if (earFound) {
                            tgs.push(i0, i1, i2);
                            avl.splice((i + 1) % al, 1);
                            al--;
                            i = 0;
                        } else if (i++ > 3 * al) break;
                    }
                    tgs.push(avl[0], avl[1], avl[2]);
                    return tgs;
                };
                PolyK._PointInTriangle = function(px, py, ax, ay, bx, by, cx, cy) {
                    var v0x = cx - ax;
                    var v0y = cy - ay;
                    var v1x = bx - ax;
                    var v1y = by - ay;
                    var v2x = px - ax;
                    var v2y = py - ay;
                    var dot00 = v0x * v0x + v0y * v0y;
                    var dot01 = v0x * v1x + v0y * v1y;
                    var dot02 = v0x * v2x + v0y * v2y;
                    var dot11 = v1x * v1x + v1y * v1y;
                    var dot12 = v1x * v2x + v1y * v2y;
                    var invDenom = 1 / (dot00 * dot11 - dot01 * dot01);
                    var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
                    var v = (dot00 * dot12 - dot01 * dot02) * invDenom;
                    return u >= 0 && v >= 0 && u + v < 1;
                };
                PolyK._convex = function(ax, ay, bx, by, cx, cy) {
                    return (ay - by) * (cx - bx) + (bx - ax) * (cy - by) >= 0;
                };
                module.exports = PolyK;
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/math/polyk.js", "/math");
        }, {
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1
        } ],
        33: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                var vec2 = module.exports = {};
                var Utils = _dereq_("../utils/Utils");
                vec2.crossLength = function(a, b) {
                    return a[0] * b[1] - a[1] * b[0];
                };
                vec2.crossVZ = function(out, vec, zcomp) {
                    vec2.rotate(out, vec, -Math.PI / 2);
                    vec2.scale(out, out, zcomp);
                    return out;
                };
                vec2.crossZV = function(out, zcomp, vec) {
                    vec2.rotate(out, vec, Math.PI / 2);
                    vec2.scale(out, out, zcomp);
                    return out;
                };
                vec2.rotate = function(out, a, angle) {
                    if (angle !== 0) {
                        var c = Math.cos(angle), s = Math.sin(angle), x = a[0], y = a[1];
                        out[0] = c * x - s * y;
                        out[1] = s * x + c * y;
                    } else {
                        out[0] = a[0];
                        out[1] = a[1];
                    }
                };
                vec2.rotate90cw = function(out, a) {
                    var x = a[0];
                    var y = a[1];
                    out[0] = y;
                    out[1] = -x;
                };
                vec2.toLocalFrame = function(out, worldPoint, framePosition, frameAngle) {
                    vec2.copy(out, worldPoint);
                    vec2.sub(out, out, framePosition);
                    vec2.rotate(out, out, -frameAngle);
                };
                vec2.toGlobalFrame = function(out, localPoint, framePosition, frameAngle) {
                    vec2.copy(out, localPoint);
                    vec2.rotate(out, out, frameAngle);
                    vec2.add(out, out, framePosition);
                };
                vec2.centroid = function(out, a, b, c) {
                    vec2.add(out, a, b);
                    vec2.add(out, out, c);
                    vec2.scale(out, out, 1 / 3);
                    return out;
                };
                vec2.create = function() {
                    var out = new Utils.ARRAY_TYPE(2);
                    out[0] = 0;
                    out[1] = 0;
                    return out;
                };
                vec2.clone = function(a) {
                    var out = new Utils.ARRAY_TYPE(2);
                    out[0] = a[0];
                    out[1] = a[1];
                    return out;
                };
                vec2.fromValues = function(x, y) {
                    var out = new Utils.ARRAY_TYPE(2);
                    out[0] = x;
                    out[1] = y;
                    return out;
                };
                vec2.copy = function(out, a) {
                    out[0] = a[0];
                    out[1] = a[1];
                    return out;
                };
                vec2.set = function(out, x, y) {
                    out[0] = x;
                    out[1] = y;
                    return out;
                };
                vec2.add = function(out, a, b) {
                    out[0] = a[0] + b[0];
                    out[1] = a[1] + b[1];
                    return out;
                };
                vec2.subtract = function(out, a, b) {
                    out[0] = a[0] - b[0];
                    out[1] = a[1] - b[1];
                    return out;
                };
                vec2.sub = vec2.subtract;
                vec2.multiply = function(out, a, b) {
                    out[0] = a[0] * b[0];
                    out[1] = a[1] * b[1];
                    return out;
                };
                vec2.mul = vec2.multiply;
                vec2.divide = function(out, a, b) {
                    out[0] = a[0] / b[0];
                    out[1] = a[1] / b[1];
                    return out;
                };
                vec2.div = vec2.divide;
                vec2.scale = function(out, a, b) {
                    out[0] = a[0] * b;
                    out[1] = a[1] * b;
                    return out;
                };
                vec2.distance = function(a, b) {
                    var x = b[0] - a[0], y = b[1] - a[1];
                    return Math.sqrt(x * x + y * y);
                };
                vec2.dist = vec2.distance;
                vec2.squaredDistance = function(a, b) {
                    var x = b[0] - a[0], y = b[1] - a[1];
                    return x * x + y * y;
                };
                vec2.sqrDist = vec2.squaredDistance;
                vec2.length = function(a) {
                    var x = a[0], y = a[1];
                    return Math.sqrt(x * x + y * y);
                };
                vec2.len = vec2.length;
                vec2.squaredLength = function(a) {
                    var x = a[0], y = a[1];
                    return x * x + y * y;
                };
                vec2.sqrLen = vec2.squaredLength;
                vec2.negate = function(out, a) {
                    out[0] = -a[0];
                    out[1] = -a[1];
                    return out;
                };
                vec2.normalize = function(out, a) {
                    var x = a[0], y = a[1];
                    var len = x * x + y * y;
                    if (len > 0) {
                        len = 1 / Math.sqrt(len);
                        out[0] = a[0] * len;
                        out[1] = a[1] * len;
                    }
                    return out;
                };
                vec2.dot = function(a, b) {
                    return a[0] * b[0] + a[1] * b[1];
                };
                vec2.str = function(a) {
                    return "vec2(" + a[0] + ", " + a[1] + ")";
                };
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/math/vec2.js", "/math");
        }, {
            "../utils/Utils": 52,
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1
        } ],
        34: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                var vec2 = _dereq_("../math/vec2"), decomp = _dereq_("poly-decomp"), Convex = _dereq_("../shapes/Convex"), AABB = _dereq_("../collision/AABB"), EventEmitter = _dereq_("../events/EventEmitter");
                module.exports = Body;
                function Body(options) {
                    options = options || {};
                    EventEmitter.call(this);
                    this.id = ++Body._idCounter;
                    this.world = null;
                    this.shapes = [];
                    this.shapeOffsets = [];
                    this.shapeAngles = [];
                    this.mass = options.mass || 0;
                    this.invMass = 0;
                    this.inertia = 0;
                    this.invInertia = 0;
                    this.invMassSolve = 0;
                    this.invInertiaSolve = 0;
                    this.fixedRotation = !!options.fixedRotation || false;
                    this.position = vec2.fromValues(0, 0);
                    if (options.position) {
                        vec2.copy(this.position, options.position);
                    }
                    this.interpolatedPosition = vec2.fromValues(0, 0);
                    this.interpolatedAngle = 0;
                    this.previousPosition = vec2.fromValues(0, 0);
                    this.previousAngle = 0;
                    this.velocity = vec2.fromValues(0, 0);
                    if (options.velocity) {
                        vec2.copy(this.velocity, options.velocity);
                    }
                    this.vlambda = vec2.fromValues(0, 0);
                    this.wlambda = 0;
                    this.angle = options.angle || 0;
                    this.angularVelocity = options.angularVelocity || 0;
                    this.force = vec2.create();
                    if (options.force) {
                        vec2.copy(this.force, options.force);
                    }
                    this.angularForce = options.angularForce || 0;
                    this.damping = typeof options.damping === "number" ? options.damping : .1;
                    this.angularDamping = typeof options.angularDamping === "number" ? options.angularDamping : .1;
                    this.type = Body.STATIC;
                    if (typeof options.type !== "undefined") {
                        this.type = options.type;
                    } else if (!options.mass) {
                        this.type = Body.STATIC;
                    } else {
                        this.type = Body.DYNAMIC;
                    }
                    this.boundingRadius = 0;
                    this.aabb = new AABB();
                    this.aabbNeedsUpdate = true;
                    this.allowSleep = true;
                    this.wantsToSleep = false;
                    this.sleepState = Body.AWAKE;
                    this.sleepSpeedLimit = .2;
                    this.sleepTimeLimit = 1;
                    this.gravityScale = 1;
                    this.timeLastSleepy = 0;
                    this.concavePath = null;
                    this.lastDampingScale = 1;
                    this.lastAngularDampingScale = 1;
                    this.lastDampingTimeStep = -1;
                    this._wakeUpAfterNarrowphase = false;
                    this.updateMassProperties();
                }
                Body.prototype = new EventEmitter();
                Body._idCounter = 0;
                Body.prototype.updateSolveMassProperties = function() {
                    if (this.sleepState === Body.SLEEPING || this.type === Body.KINEMATIC) {
                        this.invMassSolve = 0;
                        this.invInertiaSolve = 0;
                    } else {
                        this.invMassSolve = this.invMass;
                        this.invInertiaSolve = this.invInertia;
                    }
                };
                Body.prototype.setDensity = function(density) {
                    var totalArea = this.getArea();
                    this.mass = totalArea * density;
                    this.updateMassProperties();
                };
                Body.prototype.getArea = function() {
                    var totalArea = 0;
                    for (var i = 0; i < this.shapes.length; i++) {
                        totalArea += this.shapes[i].area;
                    }
                    return totalArea;
                };
                Body.prototype.getAABB = function() {
                    if (this.aabbNeedsUpdate) {
                        this.updateAABB();
                    }
                    return this.aabb;
                };
                var shapeAABB = new AABB(), tmp = vec2.create();
                Body.prototype.updateAABB = function() {
                    var shapes = this.shapes, shapeOffsets = this.shapeOffsets, shapeAngles = this.shapeAngles, N = shapes.length, offset = tmp, bodyAngle = this.angle;
                    for (var i = 0; i !== N; i++) {
                        var shape = shapes[i], angle = shapeAngles[i] + bodyAngle;
                        vec2.rotate(offset, shapeOffsets[i], bodyAngle);
                        vec2.add(offset, offset, this.position);
                        shape.computeAABB(shapeAABB, offset, angle);
                        if (i === 0) {
                            this.aabb.copy(shapeAABB);
                        } else {
                            this.aabb.extend(shapeAABB);
                        }
                    }
                    this.aabbNeedsUpdate = false;
                };
                Body.prototype.updateBoundingRadius = function() {
                    var shapes = this.shapes, shapeOffsets = this.shapeOffsets, N = shapes.length, radius = 0;
                    for (var i = 0; i !== N; i++) {
                        var shape = shapes[i], offset = vec2.length(shapeOffsets[i]), r = shape.boundingRadius;
                        if (offset + r > radius) {
                            radius = offset + r;
                        }
                    }
                    this.boundingRadius = radius;
                };
                Body.prototype.addShape = function(shape, offset, angle) {
                    angle = angle || 0;
                    if (offset) {
                        offset = vec2.fromValues(offset[0], offset[1]);
                    } else {
                        offset = vec2.fromValues(0, 0);
                    }
                    this.shapes.push(shape);
                    this.shapeOffsets.push(offset);
                    this.shapeAngles.push(angle);
                    this.updateMassProperties();
                    this.updateBoundingRadius();
                    this.aabbNeedsUpdate = true;
                };
                Body.prototype.removeShape = function(shape) {
                    var idx = this.shapes.indexOf(shape);
                    if (idx !== -1) {
                        this.shapes.splice(idx, 1);
                        this.shapeOffsets.splice(idx, 1);
                        this.shapeAngles.splice(idx, 1);
                        this.aabbNeedsUpdate = true;
                        return true;
                    } else {
                        return false;
                    }
                };
                Body.prototype.updateMassProperties = function() {
                    if (this.type === Body.STATIC || this.type === Body.KINEMATIC) {
                        this.mass = Number.MAX_VALUE;
                        this.invMass = 0;
                        this.inertia = Number.MAX_VALUE;
                        this.invInertia = 0;
                    } else {
                        var shapes = this.shapes, N = shapes.length, m = this.mass / N, I = 0;
                        if (!this.fixedRotation) {
                            for (var i = 0; i < N; i++) {
                                var shape = shapes[i], r2 = vec2.squaredLength(this.shapeOffsets[i]), Icm = shape.computeMomentOfInertia(m);
                                I += Icm + m * r2;
                            }
                            this.inertia = I;
                            this.invInertia = I > 0 ? 1 / I : 0;
                        } else {
                            this.inertia = Number.MAX_VALUE;
                            this.invInertia = 0;
                        }
                        this.invMass = 1 / this.mass;
                    }
                };
                var Body_applyForce_r = vec2.create();
                Body.prototype.applyForce = function(force, worldPoint) {
                    var r = Body_applyForce_r;
                    vec2.sub(r, worldPoint, this.position);
                    vec2.add(this.force, this.force, force);
                    var rotForce = vec2.crossLength(r, force);
                    this.angularForce += rotForce;
                };
                Body.prototype.toLocalFrame = function(out, worldPoint) {
                    vec2.toLocalFrame(out, worldPoint, this.position, this.angle);
                };
                Body.prototype.toWorldFrame = function(out, localPoint) {
                    vec2.toGlobalFrame(out, localPoint, this.position, this.angle);
                };
                Body.prototype.fromPolygon = function(path, options) {
                    options = options || {};
                    for (var i = this.shapes.length; i >= 0; --i) {
                        this.removeShape(this.shapes[i]);
                    }
                    var p = new decomp.Polygon();
                    p.vertices = path;
                    p.makeCCW();
                    if (typeof options.removeCollinearPoints === "number") {
                        p.removeCollinearPoints(options.removeCollinearPoints);
                    }
                    if (typeof options.skipSimpleCheck === "undefined") {
                        if (!p.isSimple()) {
                            return false;
                        }
                    }
                    this.concavePath = p.vertices.slice(0);
                    for (var i = 0; i < this.concavePath.length; i++) {
                        var v = [ 0, 0 ];
                        vec2.copy(v, this.concavePath[i]);
                        this.concavePath[i] = v;
                    }
                    var convexes;
                    if (options.optimalDecomp) {
                        convexes = p.decomp();
                    } else {
                        convexes = p.quickDecomp();
                    }
                    var cm = vec2.create();
                    for (var i = 0; i !== convexes.length; i++) {
                        var c = new Convex(convexes[i].vertices);
                        for (var j = 0; j !== c.vertices.length; j++) {
                            var v = c.vertices[j];
                            vec2.sub(v, v, c.centerOfMass);
                        }
                        vec2.scale(cm, c.centerOfMass, 1);
                        c.updateTriangles();
                        c.updateCenterOfMass();
                        c.updateBoundingRadius();
                        this.addShape(c, cm);
                    }
                    this.adjustCenterOfMass();
                    this.aabbNeedsUpdate = true;
                    return true;
                };
                var adjustCenterOfMass_tmp1 = vec2.fromValues(0, 0), adjustCenterOfMass_tmp2 = vec2.fromValues(0, 0), adjustCenterOfMass_tmp3 = vec2.fromValues(0, 0), adjustCenterOfMass_tmp4 = vec2.fromValues(0, 0);
                Body.prototype.adjustCenterOfMass = function() {
                    var offset_times_area = adjustCenterOfMass_tmp2, sum = adjustCenterOfMass_tmp3, cm = adjustCenterOfMass_tmp4, totalArea = 0;
                    vec2.set(sum, 0, 0);
                    for (var i = 0; i !== this.shapes.length; i++) {
                        var s = this.shapes[i], offset = this.shapeOffsets[i];
                        vec2.scale(offset_times_area, offset, s.area);
                        vec2.add(sum, sum, offset_times_area);
                        totalArea += s.area;
                    }
                    vec2.scale(cm, sum, 1 / totalArea);
                    for (var i = 0; i !== this.shapes.length; i++) {
                        var s = this.shapes[i], offset = this.shapeOffsets[i];
                        if (!offset) {
                            offset = this.shapeOffsets[i] = vec2.create();
                        }
                        vec2.sub(offset, offset, cm);
                    }
                    vec2.add(this.position, this.position, cm);
                    for (var i = 0; this.concavePath && i < this.concavePath.length; i++) {
                        vec2.sub(this.concavePath[i], this.concavePath[i], cm);
                    }
                    this.updateMassProperties();
                    this.updateBoundingRadius();
                };
                Body.prototype.setZeroForce = function() {
                    vec2.set(this.force, 0, 0);
                    this.angularForce = 0;
                };
                Body.prototype.resetConstraintVelocity = function() {
                    var b = this, vlambda = b.vlambda;
                    vec2.set(vlambda, 0, 0);
                    b.wlambda = 0;
                };
                Body.prototype.addConstraintVelocity = function() {
                    var b = this, v = b.velocity;
                    vec2.add(v, v, b.vlambda);
                    b.angularVelocity += b.wlambda;
                };
                Body.prototype.applyDamping = function(dt) {
                    if (this.type === Body.DYNAMIC) {
                        if (dt !== this.lastDampingTimeStep) {
                            this.lastDampingScale = Math.pow(1 - this.damping, dt);
                            this.lastAngularDampingScale = Math.pow(1 - this.angularDamping, dt);
                            this.lastDampingTimeStep = dt;
                        }
                        var v = this.velocity;
                        vec2.scale(v, v, this.lastDampingScale);
                        this.angularVelocity *= this.lastAngularDampingScale;
                    }
                };
                Body.prototype.wakeUp = function() {
                    var s = this.sleepState;
                    this.sleepState = Body.AWAKE;
                    this.idleTime = 0;
                    if (s !== Body.AWAKE) {
                        this.emit(Body.wakeUpEvent);
                    }
                };
                Body.prototype.sleep = function() {
                    this.sleepState = Body.SLEEPING;
                    this.angularVelocity = 0;
                    this.angularForce = 0;
                    vec2.set(this.velocity, 0, 0);
                    vec2.set(this.force, 0, 0);
                    this.emit(Body.sleepEvent);
                };
                Body.prototype.sleepTick = function(time, dontSleep, dt) {
                    if (!this.allowSleep || this.type === Body.SLEEPING) {
                        return;
                    }
                    this.wantsToSleep = false;
                    var sleepState = this.sleepState, speedSquared = vec2.squaredLength(this.velocity) + Math.pow(this.angularVelocity, 2), speedLimitSquared = Math.pow(this.sleepSpeedLimit, 2);
                    if (speedSquared >= speedLimitSquared) {
                        this.idleTime = 0;
                        this.sleepState = Body.AWAKE;
                    } else {
                        this.idleTime += dt;
                        this.sleepState = Body.SLEEPY;
                    }
                    if (this.idleTime > this.sleepTimeLimit) {
                        if (!dontSleep) {
                            this.sleep();
                        } else {
                            this.wantsToSleep = true;
                        }
                    }
                };
                Body.prototype.getVelocityFromPosition = function(store, timeStep) {
                    store = store || vec2.create();
                    vec2.sub(store, this.position, this.previousPosition);
                    vec2.scale(store, store, 1 / timeStep);
                    return store;
                };
                Body.prototype.getAngularVelocityFromPosition = function(timeStep) {
                    return (this.angle - this.previousAngle) / timeStep;
                };
                Body.prototype.overlaps = function(body) {
                    return this.world.overlapKeeper.bodiesAreOverlapping(this, body);
                };
                Body.sleepyEvent = {
                    type: "sleepy"
                };
                Body.sleepEvent = {
                    type: "sleep"
                };
                Body.wakeUpEvent = {
                    type: "wakeup"
                };
                Body.DYNAMIC = 1;
                Body.STATIC = 2;
                Body.KINEMATIC = 4;
                Body.AWAKE = 0;
                Body.SLEEPY = 1;
                Body.SLEEPING = 2;
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/objects/Body.js", "/objects");
        }, {
            "../collision/AABB": 11,
            "../events/EventEmitter": 29,
            "../math/vec2": 33,
            "../shapes/Convex": 41,
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1,
            "poly-decomp": 9
        } ],
        35: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                var vec2 = _dereq_("../math/vec2");
                var Spring = _dereq_("./Spring");
                var Utils = _dereq_("../utils/Utils");
                module.exports = LinearSpring;
                function LinearSpring(bodyA, bodyB, options) {
                    options = options || {};
                    Spring.call(this, bodyA, bodyB, options);
                    this.localAnchorA = vec2.fromValues(0, 0);
                    this.localAnchorB = vec2.fromValues(0, 0);
                    if (options.localAnchorA) {
                        vec2.copy(this.localAnchorA, options.localAnchorA);
                    }
                    if (options.localAnchorB) {
                        vec2.copy(this.localAnchorB, options.localAnchorB);
                    }
                    if (options.worldAnchorA) {
                        this.setWorldAnchorA(options.worldAnchorA);
                    }
                    if (options.worldAnchorB) {
                        this.setWorldAnchorB(options.worldAnchorB);
                    }
                    var worldAnchorA = vec2.create();
                    var worldAnchorB = vec2.create();
                    this.getWorldAnchorA(worldAnchorA);
                    this.getWorldAnchorB(worldAnchorB);
                    var worldDistance = vec2.distance(worldAnchorA, worldAnchorB);
                    this.restLength = typeof options.restLength === "number" ? options.restLength : worldDistance;
                }
                LinearSpring.prototype = new Spring();
                LinearSpring.prototype.setWorldAnchorA = function(worldAnchorA) {
                    this.bodyA.toLocalFrame(this.localAnchorA, worldAnchorA);
                };
                LinearSpring.prototype.setWorldAnchorB = function(worldAnchorB) {
                    this.bodyB.toLocalFrame(this.localAnchorB, worldAnchorB);
                };
                LinearSpring.prototype.getWorldAnchorA = function(result) {
                    this.bodyA.toWorldFrame(result, this.localAnchorA);
                };
                LinearSpring.prototype.getWorldAnchorB = function(result) {
                    this.bodyB.toWorldFrame(result, this.localAnchorB);
                };
                var applyForce_r = vec2.create(), applyForce_r_unit = vec2.create(), applyForce_u = vec2.create(), applyForce_f = vec2.create(), applyForce_worldAnchorA = vec2.create(), applyForce_worldAnchorB = vec2.create(), applyForce_ri = vec2.create(), applyForce_rj = vec2.create(), applyForce_tmp = vec2.create();
                LinearSpring.prototype.applyForce = function() {
                    var k = this.stiffness, d = this.damping, l = this.restLength, bodyA = this.bodyA, bodyB = this.bodyB, r = applyForce_r, r_unit = applyForce_r_unit, u = applyForce_u, f = applyForce_f, tmp = applyForce_tmp;
                    var worldAnchorA = applyForce_worldAnchorA, worldAnchorB = applyForce_worldAnchorB, ri = applyForce_ri, rj = applyForce_rj;
                    this.getWorldAnchorA(worldAnchorA);
                    this.getWorldAnchorB(worldAnchorB);
                    vec2.sub(ri, worldAnchorA, bodyA.position);
                    vec2.sub(rj, worldAnchorB, bodyB.position);
                    vec2.sub(r, worldAnchorB, worldAnchorA);
                    var rlen = vec2.len(r);
                    vec2.normalize(r_unit, r);
                    vec2.sub(u, bodyB.velocity, bodyA.velocity);
                    vec2.crossZV(tmp, bodyB.angularVelocity, rj);
                    vec2.add(u, u, tmp);
                    vec2.crossZV(tmp, bodyA.angularVelocity, ri);
                    vec2.sub(u, u, tmp);
                    vec2.scale(f, r_unit, -k * (rlen - l) - d * vec2.dot(u, r_unit));
                    vec2.sub(bodyA.force, bodyA.force, f);
                    vec2.add(bodyB.force, bodyB.force, f);
                    var ri_x_f = vec2.crossLength(ri, f);
                    var rj_x_f = vec2.crossLength(rj, f);
                    bodyA.angularForce -= ri_x_f;
                    bodyB.angularForce += rj_x_f;
                };
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/objects/LinearSpring.js", "/objects");
        }, {
            "../math/vec2": 33,
            "../utils/Utils": 52,
            "./Spring": 37,
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1
        } ],
        36: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                var vec2 = _dereq_("../math/vec2");
                var Spring = _dereq_("./Spring");
                module.exports = RotationalSpring;
                function RotationalSpring(bodyA, bodyB, options) {
                    options = options || {};
                    Spring.call(this, bodyA, bodyB, options);
                    this.restAngle = typeof options.restAngle === "number" ? options.restAngle : bodyB.angle - bodyA.angle;
                }
                RotationalSpring.prototype = new Spring();
                RotationalSpring.prototype.applyForce = function() {
                    var k = this.stiffness, d = this.damping, l = this.restAngle, bodyA = this.bodyA, bodyB = this.bodyB, x = bodyB.angle - bodyA.angle, u = bodyB.angularVelocity - bodyA.angularVelocity;
                    var torque = -k * (x - l) - d * u * 0;
                    bodyA.angularForce -= torque;
                    bodyB.angularForce += torque;
                };
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/objects/RotationalSpring.js", "/objects");
        }, {
            "../math/vec2": 33,
            "./Spring": 37,
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1
        } ],
        37: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                var vec2 = _dereq_("../math/vec2");
                var Utils = _dereq_("../utils/Utils");
                module.exports = Spring;
                function Spring(bodyA, bodyB, options) {
                    options = Utils.defaults(options, {
                        stiffness: 100,
                        damping: 1
                    });
                    this.stiffness = options.stiffness;
                    this.damping = options.damping;
                    this.bodyA = bodyA;
                    this.bodyB = bodyB;
                }
                Spring.prototype.applyForce = function() {};
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/objects/Spring.js", "/objects");
        }, {
            "../math/vec2": 33,
            "../utils/Utils": 52,
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1
        } ],
        38: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                module.exports = {
                    AABB: _dereq_("./collision/AABB"),
                    AngleLockEquation: _dereq_("./equations/AngleLockEquation"),
                    Body: _dereq_("./objects/Body"),
                    Broadphase: _dereq_("./collision/Broadphase"),
                    Capsule: _dereq_("./shapes/Capsule"),
                    Circle: _dereq_("./shapes/Circle"),
                    Constraint: _dereq_("./constraints/Constraint"),
                    ContactEquation: _dereq_("./equations/ContactEquation"),
                    ContactMaterial: _dereq_("./material/ContactMaterial"),
                    Convex: _dereq_("./shapes/Convex"),
                    DistanceConstraint: _dereq_("./constraints/DistanceConstraint"),
                    Equation: _dereq_("./equations/Equation"),
                    EventEmitter: _dereq_("./events/EventEmitter"),
                    FrictionEquation: _dereq_("./equations/FrictionEquation"),
                    GearConstraint: _dereq_("./constraints/GearConstraint"),
                    GridBroadphase: _dereq_("./collision/GridBroadphase"),
                    GSSolver: _dereq_("./solver/GSSolver"),
                    Heightfield: _dereq_("./shapes/Heightfield"),
                    Line: _dereq_("./shapes/Line"),
                    LockConstraint: _dereq_("./constraints/LockConstraint"),
                    Material: _dereq_("./material/Material"),
                    Narrowphase: _dereq_("./collision/Narrowphase"),
                    NaiveBroadphase: _dereq_("./collision/NaiveBroadphase"),
                    Particle: _dereq_("./shapes/Particle"),
                    Plane: _dereq_("./shapes/Plane"),
                    RevoluteConstraint: _dereq_("./constraints/RevoluteConstraint"),
                    PrismaticConstraint: _dereq_("./constraints/PrismaticConstraint"),
                    Rectangle: _dereq_("./shapes/Rectangle"),
                    RotationalVelocityEquation: _dereq_("./equations/RotationalVelocityEquation"),
                    SAPBroadphase: _dereq_("./collision/SAPBroadphase"),
                    Shape: _dereq_("./shapes/Shape"),
                    Solver: _dereq_("./solver/Solver"),
                    Spring: _dereq_("./objects/Spring"),
                    LinearSpring: _dereq_("./objects/LinearSpring"),
                    RotationalSpring: _dereq_("./objects/RotationalSpring"),
                    Utils: _dereq_("./utils/Utils"),
                    World: _dereq_("./world/World"),
                    vec2: _dereq_("./math/vec2"),
                    version: _dereq_("../package.json").version
                };
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/p2.js", "/");
        }, {
            "../package.json": 10,
            "./collision/AABB": 11,
            "./collision/Broadphase": 12,
            "./collision/GridBroadphase": 13,
            "./collision/NaiveBroadphase": 14,
            "./collision/Narrowphase": 15,
            "./collision/SAPBroadphase": 16,
            "./constraints/Constraint": 17,
            "./constraints/DistanceConstraint": 18,
            "./constraints/GearConstraint": 19,
            "./constraints/LockConstraint": 20,
            "./constraints/PrismaticConstraint": 21,
            "./constraints/RevoluteConstraint": 22,
            "./equations/AngleLockEquation": 23,
            "./equations/ContactEquation": 24,
            "./equations/Equation": 25,
            "./equations/FrictionEquation": 26,
            "./equations/RotationalVelocityEquation": 28,
            "./events/EventEmitter": 29,
            "./material/ContactMaterial": 30,
            "./material/Material": 31,
            "./math/vec2": 33,
            "./objects/Body": 34,
            "./objects/LinearSpring": 35,
            "./objects/RotationalSpring": 36,
            "./objects/Spring": 37,
            "./shapes/Capsule": 39,
            "./shapes/Circle": 40,
            "./shapes/Convex": 41,
            "./shapes/Heightfield": 42,
            "./shapes/Line": 43,
            "./shapes/Particle": 44,
            "./shapes/Plane": 45,
            "./shapes/Rectangle": 46,
            "./shapes/Shape": 47,
            "./solver/GSSolver": 48,
            "./solver/Solver": 49,
            "./utils/Utils": 52,
            "./world/World": 56,
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1
        } ],
        39: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                var Shape = _dereq_("./Shape"), vec2 = _dereq_("../math/vec2");
                module.exports = Capsule;
                function Capsule(length, radius) {
                    this.length = length || 1;
                    this.radius = radius || 1;
                    Shape.call(this, Shape.CAPSULE);
                }
                Capsule.prototype = new Shape();
                Capsule.prototype.computeMomentOfInertia = function(mass) {
                    var r = this.radius, w = this.length + r, h = r * 2;
                    return mass * (h * h + w * w) / 12;
                };
                Capsule.prototype.updateBoundingRadius = function() {
                    this.boundingRadius = this.radius + this.length / 2;
                };
                Capsule.prototype.updateArea = function() {
                    this.area = Math.PI * this.radius * this.radius + this.radius * 2 * this.length;
                };
                var r = vec2.create();
                Capsule.prototype.computeAABB = function(out, position, angle) {
                    var radius = this.radius;
                    vec2.set(r, this.length / 2, 0);
                    if (angle !== 0) {
                        vec2.rotate(r, r, angle);
                    }
                    vec2.set(out.upperBound, Math.max(r[0] + radius, -r[0] + radius), Math.max(r[1] + radius, -r[1] + radius));
                    vec2.set(out.lowerBound, Math.min(r[0] - radius, -r[0] - radius), Math.min(r[1] - radius, -r[1] - radius));
                    vec2.add(out.lowerBound, out.lowerBound, position);
                    vec2.add(out.upperBound, out.upperBound, position);
                };
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/shapes/Capsule.js", "/shapes");
        }, {
            "../math/vec2": 33,
            "./Shape": 47,
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1
        } ],
        40: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                var Shape = _dereq_("./Shape"), vec2 = _dereq_("../math/vec2");
                module.exports = Circle;
                function Circle(radius) {
                    this.radius = radius || 1;
                    Shape.call(this, Shape.CIRCLE);
                }
                Circle.prototype = new Shape();
                Circle.prototype.computeMomentOfInertia = function(mass) {
                    var r = this.radius;
                    return mass * r * r / 2;
                };
                Circle.prototype.updateBoundingRadius = function() {
                    this.boundingRadius = this.radius;
                };
                Circle.prototype.updateArea = function() {
                    this.area = Math.PI * this.radius * this.radius;
                };
                Circle.prototype.computeAABB = function(out, position, angle) {
                    var r = this.radius;
                    vec2.set(out.upperBound, r, r);
                    vec2.set(out.lowerBound, -r, -r);
                    if (position) {
                        vec2.add(out.lowerBound, out.lowerBound, position);
                        vec2.add(out.upperBound, out.upperBound, position);
                    }
                };
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/shapes/Circle.js", "/shapes");
        }, {
            "../math/vec2": 33,
            "./Shape": 47,
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1
        } ],
        41: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                var Shape = _dereq_("./Shape"), vec2 = _dereq_("../math/vec2"), polyk = _dereq_("../math/polyk"), decomp = _dereq_("poly-decomp");
                module.exports = Convex;
                function Convex(vertices, axes) {
                    this.vertices = [];
                    this.axes = [];
                    for (var i = 0; i < vertices.length; i++) {
                        var v = vec2.create();
                        vec2.copy(v, vertices[i]);
                        this.vertices.push(v);
                    }
                    if (axes) {
                        for (var i = 0; i < axes.length; i++) {
                            var axis = vec2.create();
                            vec2.copy(axis, axes[i]);
                            this.axes.push(axis);
                        }
                    } else {
                        for (var i = 0; i < vertices.length; i++) {
                            var worldPoint0 = vertices[i];
                            var worldPoint1 = vertices[(i + 1) % vertices.length];
                            var normal = vec2.create();
                            vec2.sub(normal, worldPoint1, worldPoint0);
                            vec2.rotate90cw(normal, normal);
                            vec2.normalize(normal, normal);
                            this.axes.push(normal);
                        }
                    }
                    this.centerOfMass = vec2.fromValues(0, 0);
                    this.triangles = [];
                    if (this.vertices.length) {
                        this.updateTriangles();
                        this.updateCenterOfMass();
                    }
                    this.boundingRadius = 0;
                    Shape.call(this, Shape.CONVEX);
                    this.updateBoundingRadius();
                    this.updateArea();
                    if (this.area < 0) {
                        throw new Error("Convex vertices must be given in conter-clockwise winding.");
                    }
                }
                Convex.prototype = new Shape();
                var tmpVec1 = vec2.create();
                var tmpVec2 = vec2.create();
                Convex.prototype.projectOntoLocalAxis = function(localAxis, result) {
                    var max = null, min = null, v, value, localAxis = tmpVec1;
                    for (var i = 0; i < this.vertices.length; i++) {
                        v = this.vertices[i];
                        value = vec2.dot(v, localAxis);
                        if (max === null || value > max) {
                            max = value;
                        }
                        if (min === null || value < min) {
                            min = value;
                        }
                    }
                    if (min > max) {
                        var t = min;
                        min = max;
                        max = t;
                    }
                    vec2.set(result, min, max);
                };
                Convex.prototype.projectOntoWorldAxis = function(localAxis, shapeOffset, shapeAngle, result) {
                    var worldAxis = tmpVec2;
                    this.projectOntoLocalAxis(localAxis, result);
                    if (shapeAngle !== 0) {
                        vec2.rotate(worldAxis, localAxis, shapeAngle);
                    } else {
                        worldAxis = localAxis;
                    }
                    var offset = vec2.dot(shapeOffset, worldAxis);
                    vec2.set(result, result[0] + offset, result[1] + offset);
                };
                Convex.prototype.updateTriangles = function() {
                    this.triangles.length = 0;
                    var polykVerts = [];
                    for (var i = 0; i < this.vertices.length; i++) {
                        var v = this.vertices[i];
                        polykVerts.push(v[0], v[1]);
                    }
                    var triangles = polyk.Triangulate(polykVerts);
                    for (var i = 0; i < triangles.length; i += 3) {
                        var id1 = triangles[i], id2 = triangles[i + 1], id3 = triangles[i + 2];
                        this.triangles.push([ id1, id2, id3 ]);
                    }
                };
                var updateCenterOfMass_centroid = vec2.create(), updateCenterOfMass_centroid_times_mass = vec2.create(), updateCenterOfMass_a = vec2.create(), updateCenterOfMass_b = vec2.create(), updateCenterOfMass_c = vec2.create(), updateCenterOfMass_ac = vec2.create(), updateCenterOfMass_ca = vec2.create(), updateCenterOfMass_cb = vec2.create(), updateCenterOfMass_n = vec2.create();
                Convex.prototype.updateCenterOfMass = function() {
                    var triangles = this.triangles, verts = this.vertices, cm = this.centerOfMass, centroid = updateCenterOfMass_centroid, n = updateCenterOfMass_n, a = updateCenterOfMass_a, b = updateCenterOfMass_b, c = updateCenterOfMass_c, ac = updateCenterOfMass_ac, ca = updateCenterOfMass_ca, cb = updateCenterOfMass_cb, centroid_times_mass = updateCenterOfMass_centroid_times_mass;
                    vec2.set(cm, 0, 0);
                    var totalArea = 0;
                    for (var i = 0; i !== triangles.length; i++) {
                        var t = triangles[i], a = verts[t[0]], b = verts[t[1]], c = verts[t[2]];
                        vec2.centroid(centroid, a, b, c);
                        var m = Convex.triangleArea(a, b, c);
                        totalArea += m;
                        vec2.scale(centroid_times_mass, centroid, m);
                        vec2.add(cm, cm, centroid_times_mass);
                    }
                    vec2.scale(cm, cm, 1 / totalArea);
                };
                Convex.prototype.computeMomentOfInertia = function(mass) {
                    var denom = 0, numer = 0, N = this.vertices.length;
                    for (var j = N - 1, i = 0; i < N; j = i, i++) {
                        var p0 = this.vertices[j];
                        var p1 = this.vertices[i];
                        var a = Math.abs(vec2.crossLength(p0, p1));
                        var b = vec2.dot(p1, p1) + vec2.dot(p1, p0) + vec2.dot(p0, p0);
                        denom += a * b;
                        numer += a;
                    }
                    return mass / 6 * (denom / numer);
                };
                Convex.prototype.updateBoundingRadius = function() {
                    var verts = this.vertices, r2 = 0;
                    for (var i = 0; i !== verts.length; i++) {
                        var l2 = vec2.squaredLength(verts[i]);
                        if (l2 > r2) {
                            r2 = l2;
                        }
                    }
                    this.boundingRadius = Math.sqrt(r2);
                };
                Convex.triangleArea = function(a, b, c) {
                    return ((b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1])) * .5;
                };
                Convex.prototype.updateArea = function() {
                    this.updateTriangles();
                    this.area = 0;
                    var triangles = this.triangles, verts = this.vertices;
                    for (var i = 0; i !== triangles.length; i++) {
                        var t = triangles[i], a = verts[t[0]], b = verts[t[1]], c = verts[t[2]];
                        var m = Convex.triangleArea(a, b, c);
                        this.area += m;
                    }
                };
                Convex.prototype.computeAABB = function(out, position, angle) {
                    out.setFromPoints(this.vertices, position, angle, 0);
                };
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/shapes/Convex.js", "/shapes");
        }, {
            "../math/polyk": 32,
            "../math/vec2": 33,
            "./Shape": 47,
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1,
            "poly-decomp": 9
        } ],
        42: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                var Shape = _dereq_("./Shape"), vec2 = _dereq_("../math/vec2"), Utils = _dereq_("../utils/Utils");
                module.exports = Heightfield;
                function Heightfield(data, options) {
                    options = Utils.defaults(options, {
                        maxValue: null,
                        minValue: null,
                        elementWidth: .1
                    });
                    if (options.minValue === null || options.maxValue === null) {
                        options.maxValue = data[0];
                        options.minValue = data[0];
                        for (var i = 0; i !== data.length; i++) {
                            var v = data[i];
                            if (v > options.maxValue) {
                                options.maxValue = v;
                            }
                            if (v < options.minValue) {
                                options.minValue = v;
                            }
                        }
                    }
                    this.data = data;
                    this.maxValue = options.maxValue;
                    this.minValue = options.minValue;
                    this.elementWidth = options.elementWidth;
                    Shape.call(this, Shape.HEIGHTFIELD);
                }
                Heightfield.prototype = new Shape();
                Heightfield.prototype.computeMomentOfInertia = function(mass) {
                    return Number.MAX_VALUE;
                };
                Heightfield.prototype.updateBoundingRadius = function() {
                    this.boundingRadius = Number.MAX_VALUE;
                };
                Heightfield.prototype.updateArea = function() {
                    var data = this.data, area = 0;
                    for (var i = 0; i < data.length - 1; i++) {
                        area += (data[i] + data[i + 1]) / 2 * this.elementWidth;
                    }
                    this.area = area;
                };
                Heightfield.prototype.computeAABB = function(out, position, angle) {
                    out.upperBound[0] = this.elementWidth * this.data.length + position[0];
                    out.upperBound[1] = this.maxValue + position[1];
                    out.lowerBound[0] = position[0];
                    out.lowerBound[1] = -Number.MAX_VALUE;
                };
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/shapes/Heightfield.js", "/shapes");
        }, {
            "../math/vec2": 33,
            "../utils/Utils": 52,
            "./Shape": 47,
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1
        } ],
        43: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                var Shape = _dereq_("./Shape"), vec2 = _dereq_("../math/vec2");
                module.exports = Line;
                function Line(length) {
                    this.length = length || 1;
                    Shape.call(this, Shape.LINE);
                }
                Line.prototype = new Shape();
                Line.prototype.computeMomentOfInertia = function(mass) {
                    return mass * Math.pow(this.length, 2) / 12;
                };
                Line.prototype.updateBoundingRadius = function() {
                    this.boundingRadius = this.length / 2;
                };
                var points = [ vec2.create(), vec2.create() ];
                Line.prototype.computeAABB = function(out, position, angle) {
                    var l2 = this.length / 2;
                    vec2.set(points[0], -l2, 0);
                    vec2.set(points[1], l2, 0);
                    out.setFromPoints(points, position, angle, 0);
                };
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/shapes/Line.js", "/shapes");
        }, {
            "../math/vec2": 33,
            "./Shape": 47,
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1
        } ],
        44: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                var Shape = _dereq_("./Shape"), vec2 = _dereq_("../math/vec2");
                module.exports = Particle;
                function Particle() {
                    Shape.call(this, Shape.PARTICLE);
                }
                Particle.prototype = new Shape();
                Particle.prototype.computeMomentOfInertia = function(mass) {
                    return 0;
                };
                Particle.prototype.updateBoundingRadius = function() {
                    this.boundingRadius = 0;
                };
                Particle.prototype.computeAABB = function(out, position, angle) {
                    vec2.copy(out.lowerBound, position);
                    vec2.copy(out.upperBound, position);
                };
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/shapes/Particle.js", "/shapes");
        }, {
            "../math/vec2": 33,
            "./Shape": 47,
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1
        } ],
        45: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                var Shape = _dereq_("./Shape"), vec2 = _dereq_("../math/vec2"), Utils = _dereq_("../utils/Utils");
                module.exports = Plane;
                function Plane() {
                    Shape.call(this, Shape.PLANE);
                }
                Plane.prototype = new Shape();
                Plane.prototype.computeMomentOfInertia = function(mass) {
                    return 0;
                };
                Plane.prototype.updateBoundingRadius = function() {
                    this.boundingRadius = Number.MAX_VALUE;
                };
                Plane.prototype.computeAABB = function(out, position, angle) {
                    var a = 0, set = vec2.set;
                    if (typeof angle === "number") {
                        a = angle % (2 * Math.PI);
                    }
                    if (a === 0) {
                        set(out.lowerBound, -Number.MAX_VALUE, -Number.MAX_VALUE);
                        set(out.upperBound, Number.MAX_VALUE, 0);
                    } else if (a === Math.PI / 2) {
                        set(out.lowerBound, 0, -Number.MAX_VALUE);
                        set(out.upperBound, Number.MAX_VALUE, Number.MAX_VALUE);
                    } else if (a === Math.PI) {
                        set(out.lowerBound, -Number.MAX_VALUE, 0);
                        set(out.upperBound, Number.MAX_VALUE, Number.MAX_VALUE);
                    } else if (a === 3 * Math.PI / 2) {
                        set(out.lowerBound, -Number.MAX_VALUE, -Number.MAX_VALUE);
                        set(out.upperBound, 0, Number.MAX_VALUE);
                    } else {
                        set(out.lowerBound, -Number.MAX_VALUE, -Number.MAX_VALUE);
                        set(out.upperBound, Number.MAX_VALUE, Number.MAX_VALUE);
                    }
                    vec2.add(out.lowerBound, out.lowerBound, position);
                    vec2.add(out.upperBound, out.upperBound, position);
                };
                Plane.prototype.updateArea = function() {
                    this.area = Number.MAX_VALUE;
                };
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/shapes/Plane.js", "/shapes");
        }, {
            "../math/vec2": 33,
            "../utils/Utils": 52,
            "./Shape": 47,
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1
        } ],
        46: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                var vec2 = _dereq_("../math/vec2"), Shape = _dereq_("./Shape"), Convex = _dereq_("./Convex");
                module.exports = Rectangle;
                function Rectangle(width, height) {
                    this.width = width || 1;
                    this.height = height || 1;
                    var verts = [ vec2.fromValues(-width / 2, -height / 2), vec2.fromValues(width / 2, -height / 2), vec2.fromValues(width / 2, height / 2), vec2.fromValues(-width / 2, height / 2) ];
                    var axes = [ vec2.fromValues(1, 0), vec2.fromValues(0, 1) ];
                    Convex.call(this, verts, axes);
                    this.type = Shape.RECTANGLE;
                }
                Rectangle.prototype = new Convex([]);
                Rectangle.prototype.computeMomentOfInertia = function(mass) {
                    var w = this.width, h = this.height;
                    return mass * (h * h + w * w) / 12;
                };
                Rectangle.prototype.updateBoundingRadius = function() {
                    var w = this.width, h = this.height;
                    this.boundingRadius = Math.sqrt(w * w + h * h) / 2;
                };
                var corner1 = vec2.create(), corner2 = vec2.create(), corner3 = vec2.create(), corner4 = vec2.create();
                Rectangle.prototype.computeAABB = function(out, position, angle) {
                    out.setFromPoints(this.vertices, position, angle, 0);
                };
                Rectangle.prototype.updateArea = function() {
                    this.area = this.width * this.height;
                };
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/shapes/Rectangle.js", "/shapes");
        }, {
            "../math/vec2": 33,
            "./Convex": 41,
            "./Shape": 47,
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1
        } ],
        47: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                module.exports = Shape;
                function Shape(type) {
                    this.type = type;
                    this.id = Shape.idCounter++;
                    this.boundingRadius = 0;
                    this.collisionGroup = 1;
                    this.collisionMask = 1;
                    if (type) {
                        this.updateBoundingRadius();
                    }
                    this.material = null;
                    this.area = 0;
                    this.sensor = false;
                    this.updateArea();
                }
                Shape.idCounter = 0;
                Shape.CIRCLE = 1;
                Shape.PARTICLE = 2;
                Shape.PLANE = 4;
                Shape.CONVEX = 8;
                Shape.LINE = 16;
                Shape.RECTANGLE = 32;
                Shape.CAPSULE = 64;
                Shape.HEIGHTFIELD = 128;
                Shape.prototype.computeMomentOfInertia = function(mass) {
                    throw new Error("Shape.computeMomentOfInertia is not implemented in this Shape...");
                };
                Shape.prototype.updateBoundingRadius = function() {
                    throw new Error("Shape.updateBoundingRadius is not implemented in this Shape...");
                };
                Shape.prototype.updateArea = function() {};
                Shape.prototype.computeAABB = function(out, position, angle) {};
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/shapes/Shape.js", "/shapes");
        }, {
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1
        } ],
        48: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                var vec2 = _dereq_("../math/vec2"), Solver = _dereq_("./Solver"), Utils = _dereq_("../utils/Utils"), FrictionEquation = _dereq_("../equations/FrictionEquation");
                module.exports = GSSolver;
                function GSSolver(options) {
                    Solver.call(this, options, Solver.GS);
                    options = options || {};
                    this.iterations = options.iterations || 10;
                    this.tolerance = options.tolerance || 1e-10;
                    this.arrayStep = 30;
                    this.lambda = new Utils.ARRAY_TYPE(this.arrayStep);
                    this.Bs = new Utils.ARRAY_TYPE(this.arrayStep);
                    this.invCs = new Utils.ARRAY_TYPE(this.arrayStep);
                    this.useZeroRHS = false;
                    this.frictionIterations = 0;
                    this.usedIterations = 0;
                }
                GSSolver.prototype = new Solver();
                function setArrayZero(array) {
                    var l = array.length;
                    while (l--) {
                        array[l] = +0;
                    }
                }
                GSSolver.prototype.solve = function(h, world) {
                    this.sortEquations();
                    var iter = 0, maxIter = this.iterations, maxFrictionIter = this.frictionIterations, equations = this.equations, Neq = equations.length, tolSquared = Math.pow(this.tolerance * Neq, 2), bodies = world.bodies, Nbodies = world.bodies.length, add = vec2.add, set = vec2.set, useZeroRHS = this.useZeroRHS, lambda = this.lambda;
                    this.usedIterations = 0;
                    if (Neq) {
                        for (var i = 0; i !== Nbodies; i++) {
                            var b = bodies[i];
                            b.updateSolveMassProperties();
                        }
                    }
                    if (lambda.length < Neq) {
                        lambda = this.lambda = new Utils.ARRAY_TYPE(Neq + this.arrayStep);
                        this.Bs = new Utils.ARRAY_TYPE(Neq + this.arrayStep);
                        this.invCs = new Utils.ARRAY_TYPE(Neq + this.arrayStep);
                    }
                    setArrayZero(lambda);
                    var invCs = this.invCs, Bs = this.Bs, lambda = this.lambda;
                    for (var i = 0; i !== equations.length; i++) {
                        var c = equations[i];
                        if (c.timeStep !== h || c.needsUpdate) {
                            c.timeStep = h;
                            c.update();
                        }
                        Bs[i] = c.computeB(c.a, c.b, h);
                        invCs[i] = c.computeInvC(c.epsilon);
                    }
                    var q, B, c, deltalambdaTot, i, j;
                    if (Neq !== 0) {
                        for (i = 0; i !== Nbodies; i++) {
                            var b = bodies[i];
                            b.resetConstraintVelocity();
                        }
                        if (maxFrictionIter) {
                            for (iter = 0; iter !== maxFrictionIter; iter++) {
                                deltalambdaTot = 0;
                                for (j = 0; j !== Neq; j++) {
                                    c = equations[j];
                                    var deltalambda = GSSolver.iterateEquation(j, c, c.epsilon, Bs, invCs, lambda, useZeroRHS, h, iter);
                                    deltalambdaTot += Math.abs(deltalambda);
                                }
                                this.usedIterations++;
                                if (deltalambdaTot * deltalambdaTot <= tolSquared) {
                                    break;
                                }
                            }
                            GSSolver.updateMultipliers(equations, lambda, 1 / h);
                            for (j = 0; j !== Neq; j++) {
                                var eq = equations[j];
                                if (eq instanceof FrictionEquation) {
                                    var f = 0;
                                    for (var k = 0; k !== eq.contactEquations.length; k++) {
                                        f += eq.contactEquations[k].multiplier;
                                    }
                                    f *= eq.frictionCoefficient / eq.contactEquations.length;
                                    eq.maxForce = f;
                                    eq.minForce = -f;
                                }
                            }
                        }
                        for (iter = 0; iter !== maxIter; iter++) {
                            deltalambdaTot = 0;
                            for (j = 0; j !== Neq; j++) {
                                c = equations[j];
                                var deltalambda = GSSolver.iterateEquation(j, c, c.epsilon, Bs, invCs, lambda, useZeroRHS, h, iter);
                                deltalambdaTot += Math.abs(deltalambda);
                            }
                            this.usedIterations++;
                            if (deltalambdaTot * deltalambdaTot <= tolSquared) {
                                break;
                            }
                        }
                        for (i = 0; i !== Nbodies; i++) {
                            bodies[i].addConstraintVelocity();
                        }
                        GSSolver.updateMultipliers(equations, lambda, 1 / h);
                    }
                };
                GSSolver.updateMultipliers = function(equations, lambda, invDt) {
                    var l = equations.length;
                    while (l--) {
                        equations[l].multiplier = lambda[l] * invDt;
                    }
                };
                GSSolver.iterateEquation = function(j, eq, eps, Bs, invCs, lambda, useZeroRHS, dt, iter) {
                    var B = Bs[j], invC = invCs[j], lambdaj = lambda[j], GWlambda = eq.computeGWlambda();
                    var maxForce = eq.maxForce, minForce = eq.minForce;
                    if (useZeroRHS) {
                        B = 0;
                    }
                    var deltalambda = invC * (B - GWlambda - eps * lambdaj);
                    var lambdaj_plus_deltalambda = lambdaj + deltalambda;
                    if (lambdaj_plus_deltalambda < minForce * dt) {
                        deltalambda = minForce * dt - lambdaj;
                    } else if (lambdaj_plus_deltalambda > maxForce * dt) {
                        deltalambda = maxForce * dt - lambdaj;
                    }
                    lambda[j] += deltalambda;
                    eq.addToWlambda(deltalambda);
                    return deltalambda;
                };
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/solver/GSSolver.js", "/solver");
        }, {
            "../equations/FrictionEquation": 26,
            "../math/vec2": 33,
            "../utils/Utils": 52,
            "./Solver": 49,
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1
        } ],
        49: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                var Utils = _dereq_("../utils/Utils"), EventEmitter = _dereq_("../events/EventEmitter");
                module.exports = Solver;
                function Solver(options, type) {
                    options = options || {};
                    EventEmitter.call(this);
                    this.type = type;
                    this.equations = [];
                    this.equationSortFunction = options.equationSortFunction || false;
                }
                Solver.prototype = new EventEmitter();
                Solver.prototype.solve = function(dt, world) {
                    throw new Error("Solver.solve should be implemented by subclasses!");
                };
                var mockWorld = {
                    bodies: []
                };
                Solver.prototype.solveIsland = function(dt, island) {
                    this.removeAllEquations();
                    if (island.equations.length) {
                        this.addEquations(island.equations);
                        mockWorld.bodies.length = 0;
                        island.getBodies(mockWorld.bodies);
                        if (mockWorld.bodies.length) {
                            this.solve(dt, mockWorld);
                        }
                    }
                };
                Solver.prototype.sortEquations = function() {
                    if (this.equationSortFunction) {
                        this.equations.sort(this.equationSortFunction);
                    }
                };
                Solver.prototype.addEquation = function(eq) {
                    if (eq.enabled) {
                        this.equations.push(eq);
                    }
                };
                Solver.prototype.addEquations = function(eqs) {
                    for (var i = 0, N = eqs.length; i !== N; i++) {
                        var eq = eqs[i];
                        if (eq.enabled) {
                            this.equations.push(eq);
                        }
                    }
                };
                Solver.prototype.removeEquation = function(eq) {
                    var i = this.equations.indexOf(eq);
                    if (i !== -1) {
                        this.equations.splice(i, 1);
                    }
                };
                Solver.prototype.removeAllEquations = function() {
                    this.equations.length = 0;
                };
                Solver.GS = 1;
                Solver.ISLAND = 2;
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/solver/Solver.js", "/solver");
        }, {
            "../events/EventEmitter": 29,
            "../utils/Utils": 52,
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1
        } ],
        50: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                var TupleDictionary = _dereq_("./TupleDictionary");
                var Utils = _dereq_("./Utils");
                module.exports = OverlapKeeper;
                function OverlapKeeper() {
                    this.overlappingShapesLastState = new TupleDictionary();
                    this.overlappingShapesCurrentState = new TupleDictionary();
                    this.recordPool = [];
                    this.tmpDict = new TupleDictionary();
                    this.tmpArray1 = [];
                }
                OverlapKeeper.prototype.tick = function() {
                    var last = this.overlappingShapesLastState;
                    var current = this.overlappingShapesCurrentState;
                    var l = last.keys.length;
                    while (l--) {
                        var key = last.keys[l];
                        var lastObject = last.getByKey(key);
                        var currentObject = current.getByKey(key);
                        if (lastObject && !currentObject) {
                            this.recordPool.push(lastObject);
                        }
                    }
                    last.reset();
                    last.copy(current);
                    current.reset();
                };
                OverlapKeeper.prototype.setOverlapping = function(bodyA, shapeA, bodyB, shapeB) {
                    var last = this.overlappingShapesLastState;
                    var current = this.overlappingShapesCurrentState;
                    if (!current.get(shapeA.id, shapeB.id)) {
                        var data;
                        if (this.recordPool.length) {
                            data = this.recordPool.pop();
                            data.set(bodyA, shapeA, bodyB, shapeB);
                        } else {
                            data = new OverlapKeeperRecord(bodyA, shapeA, bodyB, shapeB);
                        }
                        current.set(shapeA.id, shapeB.id, data);
                    }
                };
                OverlapKeeper.prototype.getNewOverlaps = function(result) {
                    return this.getDiff(this.overlappingShapesLastState, this.overlappingShapesCurrentState, result);
                };
                OverlapKeeper.prototype.getEndOverlaps = function(result) {
                    return this.getDiff(this.overlappingShapesCurrentState, this.overlappingShapesLastState, result);
                };
                OverlapKeeper.prototype.bodiesAreOverlapping = function(bodyA, bodyB) {
                    var current = this.overlappingShapesCurrentState;
                    var l = current.keys.length;
                    while (l--) {
                        var key = current.keys[l];
                        var data = current.data[key];
                        if (data.bodyA === bodyA && data.bodyB === bodyB || data.bodyA === bodyB && data.bodyB === bodyA) {
                            return true;
                        }
                    }
                    return false;
                };
                OverlapKeeper.prototype.getDiff = function(dictA, dictB, result) {
                    var result = result || [];
                    var last = dictA;
                    var current = dictB;
                    result.length = 0;
                    var l = current.keys.length;
                    while (l--) {
                        var key = current.keys[l];
                        var data = current.data[key];
                        if (!data) {
                            throw new Error("Key " + key + " had no data!");
                        }
                        var lastData = last.data[key];
                        if (!lastData) {
                            result.push(data);
                        }
                    }
                    return result;
                };
                OverlapKeeper.prototype.isNewOverlap = function(shapeA, shapeB) {
                    var idA = shapeA.id | 0, idB = shapeB.id | 0;
                    var last = this.overlappingShapesLastState;
                    var current = this.overlappingShapesCurrentState;
                    return !!!last.get(idA, idB) && !!current.get(idA, idB);
                };
                OverlapKeeper.prototype.getNewBodyOverlaps = function(result) {
                    this.tmpArray1.length = 0;
                    var overlaps = this.getNewOverlaps(this.tmpArray1);
                    return this.getBodyDiff(overlaps, result);
                };
                OverlapKeeper.prototype.getEndBodyOverlaps = function(result) {
                    this.tmpArray1.length = 0;
                    var overlaps = this.getEndOverlaps(this.tmpArray1);
                    return this.getBodyDiff(overlaps, result);
                };
                OverlapKeeper.prototype.getBodyDiff = function(overlaps, result) {
                    result = result || [];
                    var accumulator = this.tmpDict;
                    var l = overlaps.length;
                    while (l--) {
                        var data = overlaps[l];
                        accumulator.set(data.bodyA.id | 0, data.bodyB.id | 0, data);
                    }
                    l = accumulator.keys.length;
                    while (l--) {
                        var data = accumulator.getByKey(accumulator.keys[l]);
                        if (data) {
                            result.push(data.bodyA, data.bodyB);
                        }
                    }
                    accumulator.reset();
                    return result;
                };
                function OverlapKeeperRecord(bodyA, shapeA, bodyB, shapeB) {
                    this.shapeA = shapeA;
                    this.shapeB = shapeB;
                    this.bodyA = bodyA;
                    this.bodyB = bodyB;
                }
                OverlapKeeperRecord.prototype.set = function(bodyA, shapeA, bodyB, shapeB) {
                    OverlapKeeperRecord.call(this, bodyA, shapeA, bodyB, shapeB);
                };
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/utils/OverlapKeeper.js", "/utils");
        }, {
            "./TupleDictionary": 51,
            "./Utils": 52,
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1
        } ],
        51: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                var Utils = _dereq_("./Utils");
                module.exports = TupleDictionary;
                function TupleDictionary() {
                    this.data = {};
                    this.keys = [];
                }
                TupleDictionary.prototype.getKey = function(id1, id2) {
                    id1 = id1 | 0;
                    id2 = id2 | 0;
                    if ((id1 | 0) === (id2 | 0)) {
                        return -1;
                    }
                    return ((id1 | 0) > (id2 | 0) ? id1 << 16 | id2 & 65535 : id2 << 16 | id1 & 65535) | 0;
                };
                TupleDictionary.prototype.getByKey = function(key) {
                    key = key | 0;
                    return this.data[key];
                };
                TupleDictionary.prototype.get = function(i, j) {
                    return this.data[this.getKey(i, j)];
                };
                TupleDictionary.prototype.set = function(i, j, value) {
                    if (!value) {
                        throw new Error("No data!");
                    }
                    var key = this.getKey(i, j);
                    if (!this.data[key]) {
                        this.keys.push(key);
                    }
                    this.data[key] = value;
                    return key;
                };
                TupleDictionary.prototype.reset = function() {
                    var data = this.data, keys = this.keys;
                    var l = keys.length;
                    while (l--) {
                        delete data[keys[l]];
                    }
                    keys.length = 0;
                };
                TupleDictionary.prototype.copy = function(dict) {
                    this.reset();
                    Utils.appendArray(this.keys, dict.keys);
                    var l = dict.keys.length;
                    while (l--) {
                        var key = dict.keys[l];
                        this.data[key] = dict.data[key];
                    }
                };
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/utils/TupleDictionary.js", "/utils");
        }, {
            "./Utils": 52,
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1
        } ],
        52: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                module.exports = Utils;
                function Utils() {}
                Utils.appendArray = function(a, b) {
                    if (b.length < 15e4) {
                        a.push.apply(a, b);
                    } else {
                        for (var i = 0, len = b.length; i !== len; ++i) {
                            a.push(b[i]);
                        }
                    }
                };
                Utils.splice = function(array, index, howmany) {
                    howmany = howmany || 1;
                    for (var i = index, len = array.length - howmany; i < len; i++) {
                        array[i] = array[i + howmany];
                    }
                    array.length = len;
                };
                if (typeof P2_ARRAY_TYPE !== "undefined") {
                    Utils.ARRAY_TYPE = P2_ARRAY_TYPE;
                } else if (typeof Float32Array !== "undefined") {
                    Utils.ARRAY_TYPE = Float32Array;
                } else {
                    Utils.ARRAY_TYPE = Array;
                }
                Utils.extend = function(a, b) {
                    for (var key in b) {
                        a[key] = b[key];
                    }
                };
                Utils.defaults = function(options, defaults) {
                    options = options || {};
                    for (var key in defaults) {
                        if (!(key in options)) {
                            options[key] = defaults[key];
                        }
                    }
                    return options;
                };
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/utils/Utils.js", "/utils");
        }, {
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1
        } ],
        53: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                var Body = _dereq_("../objects/Body");
                module.exports = Island;
                function Island() {
                    this.equations = [];
                    this.bodies = [];
                }
                Island.prototype.reset = function() {
                    this.equations.length = this.bodies.length = 0;
                };
                var bodyIds = [];
                Island.prototype.getBodies = function(result) {
                    var bodies = result || [], eqs = this.equations;
                    bodyIds.length = 0;
                    for (var i = 0; i !== eqs.length; i++) {
                        var eq = eqs[i];
                        if (bodyIds.indexOf(eq.bodyA.id) === -1) {
                            bodies.push(eq.bodyA);
                            bodyIds.push(eq.bodyA.id);
                        }
                        if (bodyIds.indexOf(eq.bodyB.id) === -1) {
                            bodies.push(eq.bodyB);
                            bodyIds.push(eq.bodyB.id);
                        }
                    }
                    return bodies;
                };
                Island.prototype.wantsToSleep = function() {
                    for (var i = 0; i < this.bodies.length; i++) {
                        var b = this.bodies[i];
                        if (b.type === Body.DYNAMIC && !b.wantsToSleep) {
                            return false;
                        }
                    }
                    return true;
                };
                Island.prototype.sleep = function() {
                    for (var i = 0; i < this.bodies.length; i++) {
                        var b = this.bodies[i];
                        b.sleep();
                    }
                    return true;
                };
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/world/Island.js", "/world");
        }, {
            "../objects/Body": 34,
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1
        } ],
        54: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                var vec2 = _dereq_("../math/vec2"), Island = _dereq_("./Island"), IslandNode = _dereq_("./IslandNode"), Body = _dereq_("../objects/Body");
                module.exports = IslandManager;
                function IslandManager(options) {
                    this._nodePool = [];
                    this._islandPool = [];
                    this.equations = [];
                    this.islands = [];
                    this.nodes = [];
                    this.queue = [];
                }
                IslandManager.getUnvisitedNode = function(nodes) {
                    var Nnodes = nodes.length;
                    for (var i = 0; i !== Nnodes; i++) {
                        var node = nodes[i];
                        if (!node.visited && node.body.type === Body.DYNAMIC) {
                            return node;
                        }
                    }
                    return false;
                };
                IslandManager.prototype.visit = function(node, bds, eqs) {
                    bds.push(node.body);
                    var Neqs = node.equations.length;
                    for (var i = 0; i !== Neqs; i++) {
                        var eq = node.equations[i];
                        if (eqs.indexOf(eq) === -1) {
                            eqs.push(eq);
                        }
                    }
                };
                IslandManager.prototype.bfs = function(root, bds, eqs) {
                    var queue = this.queue;
                    queue.length = 0;
                    queue.push(root);
                    root.visited = true;
                    this.visit(root, bds, eqs);
                    while (queue.length) {
                        var node = queue.pop();
                        var child;
                        while (child = IslandManager.getUnvisitedNode(node.neighbors)) {
                            child.visited = true;
                            this.visit(child, bds, eqs);
                            if (child.body.type === Body.DYNAMIC) {
                                queue.push(child);
                            }
                        }
                    }
                };
                IslandManager.prototype.split = function(world) {
                    var bodies = world.bodies, nodes = this.nodes, equations = this.equations;
                    while (nodes.length) {
                        this._nodePool.push(nodes.pop());
                    }
                    for (var i = 0; i !== bodies.length; i++) {
                        if (this._nodePool.length) {
                            var node = this._nodePool.pop();
                            node.reset();
                            node.body = bodies[i];
                            nodes.push(node);
                        } else {
                            nodes.push(new IslandNode(bodies[i]));
                        }
                    }
                    for (var k = 0; k !== equations.length; k++) {
                        var eq = equations[k], i = bodies.indexOf(eq.bodyA), j = bodies.indexOf(eq.bodyB), ni = nodes[i], nj = nodes[j];
                        ni.neighbors.push(nj);
                        nj.neighbors.push(ni);
                        ni.equations.push(eq);
                        nj.equations.push(eq);
                    }
                    var islands = this.islands;
                    while (islands.length) {
                        var island = islands.pop();
                        island.reset();
                        this._islandPool.push(island);
                    }
                    var child;
                    while (child = IslandManager.getUnvisitedNode(nodes)) {
                        var island = this._islandPool.length ? this._islandPool.pop() : new Island();
                        this.bfs(child, island.bodies, island.equations);
                        islands.push(island);
                    }
                    return islands;
                };
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/world/IslandManager.js", "/world");
        }, {
            "../math/vec2": 33,
            "../objects/Body": 34,
            "./Island": 53,
            "./IslandNode": 55,
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1
        } ],
        55: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                module.exports = IslandNode;
                function IslandNode(body) {
                    this.body = body;
                    this.neighbors = [];
                    this.equations = [];
                    this.visited = false;
                }
                IslandNode.prototype.reset = function() {
                    this.equations.length = 0;
                    this.neighbors.length = 0;
                    this.visited = false;
                    this.body = null;
                };
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/world/IslandNode.js", "/world");
        }, {
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1
        } ],
        56: [ function(_dereq_, module, exports) {
            (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
                var GSSolver = _dereq_("../solver/GSSolver"), Solver = _dereq_("../solver/Solver"), NaiveBroadphase = _dereq_("../collision/NaiveBroadphase"), vec2 = _dereq_("../math/vec2"), Circle = _dereq_("../shapes/Circle"), Rectangle = _dereq_("../shapes/Rectangle"), Convex = _dereq_("../shapes/Convex"), Line = _dereq_("../shapes/Line"), Plane = _dereq_("../shapes/Plane"), Capsule = _dereq_("../shapes/Capsule"), Particle = _dereq_("../shapes/Particle"), EventEmitter = _dereq_("../events/EventEmitter"), Body = _dereq_("../objects/Body"), Shape = _dereq_("../shapes/Shape"), LinearSpring = _dereq_("../objects/LinearSpring"), Material = _dereq_("../material/Material"), ContactMaterial = _dereq_("../material/ContactMaterial"), DistanceConstraint = _dereq_("../constraints/DistanceConstraint"), Constraint = _dereq_("../constraints/Constraint"), LockConstraint = _dereq_("../constraints/LockConstraint"), RevoluteConstraint = _dereq_("../constraints/RevoluteConstraint"), PrismaticConstraint = _dereq_("../constraints/PrismaticConstraint"), GearConstraint = _dereq_("../constraints/GearConstraint"), pkg = _dereq_("../../package.json"), Broadphase = _dereq_("../collision/Broadphase"), SAPBroadphase = _dereq_("../collision/SAPBroadphase"), Narrowphase = _dereq_("../collision/Narrowphase"), Utils = _dereq_("../utils/Utils"), OverlapKeeper = _dereq_("../utils/OverlapKeeper"), IslandManager = _dereq_("./IslandManager"), RotationalSpring = _dereq_("../objects/RotationalSpring");
                module.exports = World;
                if (typeof performance === "undefined") {
                    performance = {};
                }
                if (!performance.now) {
                    var nowOffset = Date.now();
                    if (performance.timing && performance.timing.navigationStart) {
                        nowOffset = performance.timing.navigationStart;
                    }
                    performance.now = function() {
                        return Date.now() - nowOffset;
                    };
                }
                function World(options) {
                    EventEmitter.apply(this);
                    options = options || {};
                    this.springs = [];
                    this.bodies = [];
                    this.disabledBodyCollisionPairs = [];
                    this.solver = options.solver || new GSSolver();
                    this.narrowphase = new Narrowphase(this);
                    this.islandManager = new IslandManager();
                    this.gravity = vec2.fromValues(0, -9.78);
                    if (options.gravity) {
                        vec2.copy(this.gravity, options.gravity);
                    }
                    this.frictionGravity = vec2.length(this.gravity) || 10;
                    this.useWorldGravityAsFrictionGravity = true;
                    this.useFrictionGravityOnZeroGravity = true;
                    this.doProfiling = options.doProfiling || false;
                    this.lastStepTime = 0;
                    this.broadphase = options.broadphase || new NaiveBroadphase();
                    this.broadphase.setWorld(this);
                    this.constraints = [];
                    this.defaultMaterial = new Material();
                    this.defaultContactMaterial = new ContactMaterial(this.defaultMaterial, this.defaultMaterial);
                    this.lastTimeStep = 1 / 60;
                    this.applySpringForces = true;
                    this.applyDamping = true;
                    this.applyGravity = true;
                    this.solveConstraints = true;
                    this.contactMaterials = [];
                    this.time = 0;
                    this.stepping = false;
                    this.bodiesToBeRemoved = [];
                    this.fixedStepTime = 0;
                    this.islandSplit = typeof options.islandSplit !== "undefined" ? !!options.islandSplit : false;
                    this.emitImpactEvent = true;
                    this._constraintIdCounter = 0;
                    this._bodyIdCounter = 0;
                    this.postStepEvent = {
                        type: "postStep"
                    };
                    this.addBodyEvent = {
                        type: "addBody",
                        body: null
                    };
                    this.removeBodyEvent = {
                        type: "removeBody",
                        body: null
                    };
                    this.addSpringEvent = {
                        type: "addSpring",
                        spring: null
                    };
                    this.impactEvent = {
                        type: "impact",
                        bodyA: null,
                        bodyB: null,
                        shapeA: null,
                        shapeB: null,
                        contactEquation: null
                    };
                    this.postBroadphaseEvent = {
                        type: "postBroadphase",
                        pairs: null
                    };
                    this.sleepMode = World.NO_SLEEPING;
                    this.beginContactEvent = {
                        type: "beginContact",
                        shapeA: null,
                        shapeB: null,
                        bodyA: null,
                        bodyB: null,
                        contactEquations: []
                    };
                    this.endContactEvent = {
                        type: "endContact",
                        shapeA: null,
                        shapeB: null,
                        bodyA: null,
                        bodyB: null
                    };
                    this.preSolveEvent = {
                        type: "preSolve",
                        contactEquations: null,
                        frictionEquations: null
                    };
                    this.overlappingShapesLastState = {
                        keys: []
                    };
                    this.overlappingShapesCurrentState = {
                        keys: []
                    };
                    this.overlapKeeper = new OverlapKeeper();
                }
                World.prototype = new Object(EventEmitter.prototype);
                World.NO_SLEEPING = 1;
                World.BODY_SLEEPING = 2;
                World.ISLAND_SLEEPING = 4;
                World.prototype.addConstraint = function(c) {
                    this.constraints.push(c);
                };
                World.prototype.addContactMaterial = function(contactMaterial) {
                    this.contactMaterials.push(contactMaterial);
                };
                World.prototype.removeContactMaterial = function(cm) {
                    var idx = this.contactMaterials.indexOf(cm);
                    if (idx !== -1) {
                        Utils.splice(this.contactMaterials, idx, 1);
                    }
                };
                World.prototype.getContactMaterial = function(materialA, materialB) {
                    var cmats = this.contactMaterials;
                    for (var i = 0, N = cmats.length; i !== N; i++) {
                        var cm = cmats[i];
                        if (cm.materialA.id === materialA.id && cm.materialB.id === materialB.id || cm.materialA.id === materialB.id && cm.materialB.id === materialA.id) {
                            return cm;
                        }
                    }
                    return false;
                };
                World.prototype.removeConstraint = function(c) {
                    var idx = this.constraints.indexOf(c);
                    if (idx !== -1) {
                        Utils.splice(this.constraints, idx, 1);
                    }
                };
                var step_r = vec2.create(), step_runit = vec2.create(), step_u = vec2.create(), step_f = vec2.create(), step_fhMinv = vec2.create(), step_velodt = vec2.create(), step_mg = vec2.create(), xiw = vec2.fromValues(0, 0), xjw = vec2.fromValues(0, 0), zero = vec2.fromValues(0, 0), interpvelo = vec2.fromValues(0, 0);
                World.prototype.step = function(dt, timeSinceLastCalled, maxSubSteps) {
                    maxSubSteps = maxSubSteps || 10;
                    timeSinceLastCalled = timeSinceLastCalled || 0;
                    if (timeSinceLastCalled === 0) {
                        this.internalStep(dt);
                        this.time += dt;
                    } else {
                        var internalSteps = Math.floor((this.time + timeSinceLastCalled) / dt) - Math.floor(this.time / dt);
                        internalSteps = Math.min(internalSteps, maxSubSteps);
                        var t0 = performance.now();
                        for (var i = 0; i !== internalSteps; i++) {
                            this.internalStep(dt);
                            if (performance.now() - t0 > dt * 1e3) {
                                break;
                            }
                        }
                        this.time += timeSinceLastCalled;
                        var h = this.time % dt;
                        var h_div_dt = h / dt;
                        for (var j = 0; j !== this.bodies.length; j++) {
                            var b = this.bodies[j];
                            if (b.type !== Body.STATIC && b.sleepState !== Body.SLEEPING) {
                                vec2.sub(interpvelo, b.position, b.previousPosition);
                                vec2.scale(interpvelo, interpvelo, h_div_dt);
                                vec2.add(b.interpolatedPosition, b.position, interpvelo);
                                b.interpolatedAngle = b.angle + (b.angle - b.previousAngle) * h_div_dt;
                            } else {
                                vec2.copy(b.interpolatedPosition, b.position);
                                b.interpolatedAngle = b.angle;
                            }
                        }
                    }
                };
                var endOverlaps = [];
                World.prototype.internalStep = function(dt) {
                    this.stepping = true;
                    var that = this, doProfiling = this.doProfiling, Nsprings = this.springs.length, springs = this.springs, bodies = this.bodies, g = this.gravity, solver = this.solver, Nbodies = this.bodies.length, broadphase = this.broadphase, np = this.narrowphase, constraints = this.constraints, t0, t1, fhMinv = step_fhMinv, velodt = step_velodt, mg = step_mg, scale = vec2.scale, add = vec2.add, rotate = vec2.rotate, islandManager = this.islandManager;
                    this.overlapKeeper.tick();
                    this.lastTimeStep = dt;
                    if (doProfiling) {
                        t0 = performance.now();
                    }
                    if (this.useWorldGravityAsFrictionGravity) {
                        var gravityLen = vec2.length(this.gravity);
                        if (gravityLen === 0 && this.useFrictionGravityOnZeroGravity) {} else {
                            this.frictionGravity = gravityLen;
                        }
                    }
                    if (this.applyGravity) {
                        for (var i = 0; i !== Nbodies; i++) {
                            var b = bodies[i], fi = b.force;
                            if (b.type !== Body.DYNAMIC || b.sleepState === Body.SLEEPING) {
                                continue;
                            }
                            vec2.scale(mg, g, b.mass * b.gravityScale);
                            add(fi, fi, mg);
                        }
                    }
                    if (this.applySpringForces) {
                        for (var i = 0; i !== Nsprings; i++) {
                            var s = springs[i];
                            s.applyForce();
                        }
                    }
                    if (this.applyDamping) {
                        for (var i = 0; i !== Nbodies; i++) {
                            var b = bodies[i];
                            if (b.type === Body.DYNAMIC) {
                                b.applyDamping(dt);
                            }
                        }
                    }
                    var result = broadphase.getCollisionPairs(this);
                    var ignoredPairs = this.disabledBodyCollisionPairs;
                    for (var i = ignoredPairs.length - 2; i >= 0; i -= 2) {
                        for (var j = result.length - 2; j >= 0; j -= 2) {
                            if (ignoredPairs[i] === result[j] && ignoredPairs[i + 1] === result[j + 1] || ignoredPairs[i + 1] === result[j] && ignoredPairs[i] === result[j + 1]) {
                                result.splice(j, 2);
                            }
                        }
                    }
                    var Nconstraints = constraints.length;
                    for (i = 0; i !== Nconstraints; i++) {
                        var c = constraints[i];
                        if (!c.collideConnected) {
                            for (var j = result.length - 2; j >= 0; j -= 2) {
                                if (c.bodyA === result[j] && c.bodyB === result[j + 1] || c.bodyB === result[j] && c.bodyA === result[j + 1]) {
                                    result.splice(j, 2);
                                }
                            }
                        }
                    }
                    this.postBroadphaseEvent.pairs = result;
                    this.emit(this.postBroadphaseEvent);
                    np.reset(this);
                    for (var i = 0, Nresults = result.length; i !== Nresults; i += 2) {
                        var bi = result[i], bj = result[i + 1];
                        for (var k = 0, Nshapesi = bi.shapes.length; k !== Nshapesi; k++) {
                            var si = bi.shapes[k], xi = bi.shapeOffsets[k], ai = bi.shapeAngles[k];
                            for (var l = 0, Nshapesj = bj.shapes.length; l !== Nshapesj; l++) {
                                var sj = bj.shapes[l], xj = bj.shapeOffsets[l], aj = bj.shapeAngles[l];
                                var cm = this.defaultContactMaterial;
                                if (si.material && sj.material) {
                                    var tmp = this.getContactMaterial(si.material, sj.material);
                                    if (tmp) {
                                        cm = tmp;
                                    }
                                }
                                this.runNarrowphase(np, bi, si, xi, ai, bj, sj, xj, aj, cm, this.frictionGravity);
                            }
                        }
                    }
                    for (var i = 0; i !== Nbodies; i++) {
                        var body = bodies[i];
                        if (body._wakeUpAfterNarrowphase) {
                            body.wakeUp();
                            body._wakeUpAfterNarrowphase = false;
                        }
                    }
                    if (this.has("endContact")) {
                        this.overlapKeeper.getEndOverlaps(endOverlaps);
                        var e = this.endContactEvent;
                        var l = endOverlaps.length;
                        while (l--) {
                            var data = endOverlaps[l];
                            e.shapeA = data.shapeA;
                            e.shapeB = data.shapeB;
                            e.bodyA = data.bodyA;
                            e.bodyB = data.bodyA;
                            this.emit(e);
                        }
                    }
                    var preSolveEvent = this.preSolveEvent;
                    preSolveEvent.contactEquations = np.contactEquations;
                    preSolveEvent.frictionEquations = np.frictionEquations;
                    this.emit(preSolveEvent);
                    var Nconstraints = constraints.length;
                    for (i = 0; i !== Nconstraints; i++) {
                        constraints[i].update();
                    }
                    if (np.contactEquations.length || np.frictionEquations.length || constraints.length) {
                        if (this.islandSplit) {
                            islandManager.equations.length = 0;
                            Utils.appendArray(islandManager.equations, np.contactEquations);
                            Utils.appendArray(islandManager.equations, np.frictionEquations);
                            for (i = 0; i !== Nconstraints; i++) {
                                Utils.appendArray(islandManager.equations, constraints[i].equations);
                            }
                            islandManager.split(this);
                            for (var i = 0; i !== islandManager.islands.length; i++) {
                                var island = islandManager.islands[i];
                                if (island.equations.length) {
                                    solver.solveIsland(dt, island);
                                }
                            }
                        } else {
                            solver.addEquations(np.contactEquations);
                            solver.addEquations(np.frictionEquations);
                            for (i = 0; i !== Nconstraints; i++) {
                                solver.addEquations(constraints[i].equations);
                            }
                            if (this.solveConstraints) {
                                solver.solve(dt, this);
                            }
                            solver.removeAllEquations();
                        }
                    }
                    for (var i = 0; i !== Nbodies; i++) {
                        var body = bodies[i];
                        if (body.sleepState !== Body.SLEEPING && body.type !== Body.STATIC) {
                            World.integrateBody(body, dt);
                        }
                    }
                    for (var i = 0; i !== Nbodies; i++) {
                        bodies[i].setZeroForce();
                    }
                    if (doProfiling) {
                        t1 = performance.now();
                        that.lastStepTime = t1 - t0;
                    }
                    if (this.emitImpactEvent && this.has("impact")) {
                        var ev = this.impactEvent;
                        for (var i = 0; i !== np.contactEquations.length; i++) {
                            var eq = np.contactEquations[i];
                            if (eq.firstImpact) {
                                ev.bodyA = eq.bodyA;
                                ev.bodyB = eq.bodyB;
                                ev.shapeA = eq.shapeA;
                                ev.shapeB = eq.shapeB;
                                ev.contactEquation = eq;
                                this.emit(ev);
                            }
                        }
                    }
                    if (this.sleepMode === World.BODY_SLEEPING) {
                        for (i = 0; i !== Nbodies; i++) {
                            bodies[i].sleepTick(this.time, false, dt);
                        }
                    } else if (this.sleepMode === World.ISLAND_SLEEPING && this.islandSplit) {
                        for (i = 0; i !== Nbodies; i++) {
                            bodies[i].sleepTick(this.time, true, dt);
                        }
                        for (var i = 0; i < this.islandManager.islands.length; i++) {
                            var island = this.islandManager.islands[i];
                            if (island.wantsToSleep()) {
                                island.sleep();
                            }
                        }
                    }
                    this.stepping = false;
                    if (this.bodiesToBeRemoved.length) {
                        for (var i = 0; i !== this.bodiesToBeRemoved.length; i++) {
                            this.removeBody(this.bodiesToBeRemoved[i]);
                        }
                        this.bodiesToBeRemoved.length = 0;
                    }
                    this.emit(this.postStepEvent);
                };
                var ib_fhMinv = vec2.create();
                var ib_velodt = vec2.create();
                World.integrateBody = function(body, dt) {
                    var minv = body.invMass, f = body.force, pos = body.position, velo = body.velocity;
                    vec2.copy(body.previousPosition, body.position);
                    body.previousAngle = body.angle;
                    if (!body.fixedRotation) {
                        body.angularVelocity += body.angularForce * body.invInertia * dt;
                        body.angle += body.angularVelocity * dt;
                    }
                    vec2.scale(ib_fhMinv, f, dt * minv);
                    vec2.add(velo, ib_fhMinv, velo);
                    vec2.scale(ib_velodt, velo, dt);
                    vec2.add(pos, pos, ib_velodt);
                    body.aabbNeedsUpdate = true;
                };
                World.prototype.runNarrowphase = function(np, bi, si, xi, ai, bj, sj, xj, aj, cm, glen) {
                    if (!((si.collisionGroup & sj.collisionMask) !== 0 && (sj.collisionGroup & si.collisionMask) !== 0)) {
                        return;
                    }
                    vec2.rotate(xiw, xi, bi.angle);
                    vec2.rotate(xjw, xj, bj.angle);
                    vec2.add(xiw, xiw, bi.position);
                    vec2.add(xjw, xjw, bj.position);
                    var aiw = ai + bi.angle;
                    var ajw = aj + bj.angle;
                    np.enableFriction = cm.friction > 0;
                    np.frictionCoefficient = cm.friction;
                    var reducedMass;
                    if (bi.type === Body.STATIC || bi.type === Body.KINEMATIC) {
                        reducedMass = bj.mass;
                    } else if (bj.type === Body.STATIC || bj.type === Body.KINEMATIC) {
                        reducedMass = bi.mass;
                    } else {
                        reducedMass = bi.mass * bj.mass / (bi.mass + bj.mass);
                    }
                    np.slipForce = cm.friction * glen * reducedMass;
                    np.restitution = cm.restitution;
                    np.surfaceVelocity = cm.surfaceVelocity;
                    np.frictionStiffness = cm.frictionStiffness;
                    np.frictionRelaxation = cm.frictionRelaxation;
                    np.stiffness = cm.stiffness;
                    np.relaxation = cm.relaxation;
                    np.contactSkinSize = cm.contactSkinSize;
                    var resolver = np[si.type | sj.type], numContacts = 0;
                    if (resolver) {
                        var sensor = si.sensor || sj.sensor;
                        var numFrictionBefore = np.frictionEquations.length;
                        if (si.type < sj.type) {
                            numContacts = resolver.call(np, bi, si, xiw, aiw, bj, sj, xjw, ajw, sensor);
                        } else {
                            numContacts = resolver.call(np, bj, sj, xjw, ajw, bi, si, xiw, aiw, sensor);
                        }
                        var numFrictionEquations = np.frictionEquations.length - numFrictionBefore;
                        if (numContacts) {
                            if (bi.allowSleep && bi.type === Body.DYNAMIC && bi.sleepState === Body.SLEEPING && bj.sleepState === Body.AWAKE && bj.type !== Body.STATIC) {
                                var speedSquaredB = vec2.squaredLength(bj.velocity) + Math.pow(bj.angularVelocity, 2);
                                var speedLimitSquaredB = Math.pow(bj.sleepSpeedLimit, 2);
                                if (speedSquaredB >= speedLimitSquaredB * 2) {
                                    bi._wakeUpAfterNarrowphase = true;
                                }
                            }
                            if (bj.allowSleep && bj.type === Body.DYNAMIC && bj.sleepState === Body.SLEEPING && bi.sleepState === Body.AWAKE && bi.type !== Body.STATIC) {
                                var speedSquaredA = vec2.squaredLength(bi.velocity) + Math.pow(bi.angularVelocity, 2);
                                var speedLimitSquaredA = Math.pow(bi.sleepSpeedLimit, 2);
                                if (speedSquaredA >= speedLimitSquaredA * 2) {
                                    bj._wakeUpAfterNarrowphase = true;
                                }
                            }
                            this.overlapKeeper.setOverlapping(bi, si, bj, sj);
                            if (this.has("beginContact") && this.overlapKeeper.isNewOverlap(si, sj)) {
                                var e = this.beginContactEvent;
                                e.shapeA = si;
                                e.shapeB = sj;
                                e.bodyA = bi;
                                e.bodyB = bj;
                                e.contactEquations.length = 0;
                                if (typeof numContacts === "number") {
                                    for (var i = np.contactEquations.length - numContacts; i < np.contactEquations.length; i++) {
                                        e.contactEquations.push(np.contactEquations[i]);
                                    }
                                }
                                this.emit(e);
                            }
                            if (typeof numContacts === "number" && numFrictionEquations > 1) {
                                for (var i = np.frictionEquations.length - numFrictionEquations; i < np.frictionEquations.length; i++) {
                                    var f = np.frictionEquations[i];
                                    f.setSlipForce(f.getSlipForce() / numFrictionEquations);
                                }
                            }
                        }
                    }
                };
                World.prototype.addSpring = function(s) {
                    this.springs.push(s);
                    this.addSpringEvent.spring = s;
                    this.emit(this.addSpringEvent);
                };
                World.prototype.removeSpring = function(s) {
                    var idx = this.springs.indexOf(s);
                    if (idx !== -1) {
                        Utils.splice(this.springs, idx, 1);
                    }
                };
                World.prototype.addBody = function(body) {
                    if (this.bodies.indexOf(body) === -1) {
                        this.bodies.push(body);
                        body.world = this;
                        this.addBodyEvent.body = body;
                        this.emit(this.addBodyEvent);
                    }
                };
                World.prototype.removeBody = function(body) {
                    if (this.stepping) {
                        this.bodiesToBeRemoved.push(body);
                    } else {
                        body.world = null;
                        var idx = this.bodies.indexOf(body);
                        if (idx !== -1) {
                            Utils.splice(this.bodies, idx, 1);
                            this.removeBodyEvent.body = body;
                            body.resetConstraintVelocity();
                            this.emit(this.removeBodyEvent);
                        }
                    }
                };
                World.prototype.getBodyById = function(id) {
                    var bodies = this.bodies;
                    for (var i = 0; i < bodies.length; i++) {
                        var b = bodies[i];
                        if (b.id === id) {
                            return b;
                        }
                    }
                    return false;
                };
                World.prototype.disableBodyCollision = function(bodyA, bodyB) {
                    this.disabledBodyCollisionPairs.push(bodyA, bodyB);
                };
                World.prototype.enableBodyCollision = function(bodyA, bodyB) {
                    var pairs = this.disabledBodyCollisionPairs;
                    for (var i = 0; i < pairs.length; i += 2) {
                        if (pairs[i] === bodyA && pairs[i + 1] === bodyB || pairs[i + 1] === bodyA && pairs[i] === bodyB) {
                            pairs.splice(i, 2);
                            return;
                        }
                    }
                };
                function v2a(v) {
                    if (!v) {
                        return v;
                    }
                    return [ v[0], v[1] ];
                }
                function extend(a, b) {
                    for (var key in b) {
                        a[key] = b[key];
                    }
                }
                function contactMaterialToJSON(cm) {
                    return {
                        id: cm.id,
                        materialA: cm.materialA.id,
                        materialB: cm.materialB.id,
                        friction: cm.friction,
                        restitution: cm.restitution,
                        stiffness: cm.stiffness,
                        relaxation: cm.relaxation,
                        frictionStiffness: cm.frictionStiffness,
                        frictionRelaxation: cm.frictionRelaxation
                    };
                }
                World.prototype.clear = function() {
                    this.time = 0;
                    this.fixedStepTime = 0;
                    if (this.solver && this.solver.equations.length) {
                        this.solver.removeAllEquations();
                    }
                    var cs = this.constraints;
                    for (var i = cs.length - 1; i >= 0; i--) {
                        this.removeConstraint(cs[i]);
                    }
                    var bodies = this.bodies;
                    for (var i = bodies.length - 1; i >= 0; i--) {
                        this.removeBody(bodies[i]);
                    }
                    var springs = this.springs;
                    for (var i = springs.length - 1; i >= 0; i--) {
                        this.removeSpring(springs[i]);
                    }
                    var cms = this.contactMaterials;
                    for (var i = cms.length - 1; i >= 0; i--) {
                        this.removeContactMaterial(cms[i]);
                    }
                    World.apply(this);
                };
                World.prototype.clone = function() {
                    var world = new World();
                    world.fromJSON(this.toJSON());
                    return world;
                };
                var hitTest_tmp1 = vec2.create(), hitTest_zero = vec2.fromValues(0, 0), hitTest_tmp2 = vec2.fromValues(0, 0);
                World.prototype.hitTest = function(worldPoint, bodies, precision) {
                    precision = precision || 0;
                    var pb = new Body({
                        position: worldPoint
                    }), ps = new Particle(), px = worldPoint, pa = 0, x = hitTest_tmp1, zero = hitTest_zero, tmp = hitTest_tmp2;
                    pb.addShape(ps);
                    var n = this.narrowphase, result = [];
                    for (var i = 0, N = bodies.length; i !== N; i++) {
                        var b = bodies[i];
                        for (var j = 0, NS = b.shapes.length; j !== NS; j++) {
                            var s = b.shapes[j], offset = b.shapeOffsets[j] || zero, angle = b.shapeAngles[j] || 0;
                            vec2.rotate(x, offset, b.angle);
                            vec2.add(x, x, b.position);
                            var a = angle + b.angle;
                            if (s instanceof Circle && n.circleParticle(b, s, x, a, pb, ps, px, pa, true) || s instanceof Convex && n.particleConvex(pb, ps, px, pa, b, s, x, a, true) || s instanceof Plane && n.particlePlane(pb, ps, px, pa, b, s, x, a, true) || s instanceof Capsule && n.particleCapsule(pb, ps, px, pa, b, s, x, a, true) || s instanceof Particle && vec2.squaredLength(vec2.sub(tmp, x, worldPoint)) < precision * precision) {
                                result.push(b);
                            }
                        }
                    }
                    return result;
                };
                World.prototype.setGlobalEquationParameters = function(parameters) {
                    parameters = parameters || {};
                    for (var i = 0; i !== this.constraints.length; i++) {
                        var c = this.constraints[i];
                        for (var j = 0; j !== c.equations.length; j++) {
                            var eq = c.equations[j];
                            if (typeof parameters.stiffness !== "undefined") {
                                eq.stiffness = parameters.stiffness;
                            }
                            if (typeof parameters.relaxation !== "undefined") {
                                eq.relaxation = parameters.relaxation;
                            }
                            eq.needsUpdate = true;
                        }
                    }
                    for (var i = 0; i !== this.contactMaterials.length; i++) {
                        var c = this.contactMaterials[i];
                        if (typeof parameters.stiffness !== "undefined") {
                            c.stiffness = parameters.stiffness;
                            c.frictionStiffness = parameters.stiffness;
                        }
                        if (typeof parameters.relaxation !== "undefined") {
                            c.relaxation = parameters.relaxation;
                            c.frictionRelaxation = parameters.relaxation;
                        }
                    }
                    var c = this.defaultContactMaterial;
                    if (typeof parameters.stiffness !== "undefined") {
                        c.stiffness = parameters.stiffness;
                        c.frictionStiffness = parameters.stiffness;
                    }
                    if (typeof parameters.relaxation !== "undefined") {
                        c.relaxation = parameters.relaxation;
                        c.frictionRelaxation = parameters.relaxation;
                    }
                };
                World.prototype.setGlobalStiffness = function(stiffness) {
                    this.setGlobalEquationParameters({
                        stiffness: stiffness
                    });
                };
                World.prototype.setGlobalRelaxation = function(relaxation) {
                    this.setGlobalEquationParameters({
                        relaxation: relaxation
                    });
                };
            }).call(this, _dereq_("/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _dereq_("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/world/World.js", "/world");
        }, {
            "../../package.json": 10,
            "../collision/Broadphase": 12,
            "../collision/NaiveBroadphase": 14,
            "../collision/Narrowphase": 15,
            "../collision/SAPBroadphase": 16,
            "../constraints/Constraint": 17,
            "../constraints/DistanceConstraint": 18,
            "../constraints/GearConstraint": 19,
            "../constraints/LockConstraint": 20,
            "../constraints/PrismaticConstraint": 21,
            "../constraints/RevoluteConstraint": 22,
            "../events/EventEmitter": 29,
            "../material/ContactMaterial": 30,
            "../material/Material": 31,
            "../math/vec2": 33,
            "../objects/Body": 34,
            "../objects/LinearSpring": 35,
            "../objects/RotationalSpring": 36,
            "../shapes/Capsule": 39,
            "../shapes/Circle": 40,
            "../shapes/Convex": 41,
            "../shapes/Line": 43,
            "../shapes/Particle": 44,
            "../shapes/Plane": 45,
            "../shapes/Rectangle": 46,
            "../shapes/Shape": 47,
            "../solver/GSSolver": 48,
            "../solver/Solver": 49,
            "../utils/OverlapKeeper": 50,
            "../utils/Utils": 52,
            "./IslandManager": 54,
            "/Users/schteppe/git/p2.js/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 4,
            buffer: 1
        } ]
    }, {}, [ 38 ])(38);
});

(function(a, b) {
    function bf(a, b, c, d) {
        bf._super_.call(this), this.reset(a, b, c, d);
    }
    function be(a, b, c, d) {
        be._super_.call(this), this.x = a, this.y = b, this.width = c, this.height = d;
    }
    function bd(a, b) {
        bd._super_.call(this), this.x = a, this.y = b;
    }
    function bc(a, b, c) {
        bc._super_.call(this), this.x = a, this.y = b, this.radius = c, this.angle = 0,
        this.center = {
            x: this.x,
            y: this.y
        };
    }
    function bb(a, b, d, e, f) {
        bb._super_.call(this), d - a >= 0 ? (this.x1 = a, this.y1 = b, this.x2 = d, this.y2 = e) : (this.x1 = d,
        this.y1 = e, this.x2 = a, this.y2 = b), this.dx = this.x2 - this.x1, this.dy = this.y2 - this.y1,
        this.minx = Math.min(this.x1, this.x2), this.miny = Math.min(this.y1, this.y2),
        this.maxx = Math.max(this.x1, this.x2), this.maxy = Math.max(this.y1, this.y2),
        this.dot = this.x2 * this.y1 - this.x1 * this.y2, this.xxyy = this.dx * this.dx + this.dy * this.dy,
        this.gradient = this.getGradient(), this.length = this.getLength(), this.direction = c.Util.initValue(f, ">");
    }
    function ba() {
        this.vector = new c.Vector2D(0, 0), this.random = 0, this.crossType = "dead", this.alert = !0;
    }
    function _(a, b) {
        _._super_.call(this, a, b), this.gl = this.element.getContext("experimental-webgl", {
            antialias: !0,
            stencil: !1,
            depth: !1
        }), this.gl || alert("Sorry your browser do not suppest WebGL!"), this.initVar(),
        this.setMaxRadius(), this.initShaders(), this.initBuffers(), this.gl.blendEquation(this.gl.FUNC_ADD),
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA), this.gl.enable(this.gl.BLEND);
    }
    function $(a, b, c) {
        $._super_.call(this, a, b), this.context = this.element.getContext("2d"), this.imageData = null,
        this.rectangle = null, this.rectangle = c, this.createImageData(c);
    }
    function Z(a, b) {
        Z._super_.call(this, a, b), this.stroke = null, this.context = this.element.getContext("2d"),
        this.bufferCache = {};
    }
    function Y(a, b, c) {
        Y._super_.call(this, a, b), this.stroke = c;
    }
    function X(a, b) {
        X._super_.call(this, a, b), this.stroke = null;
    }
    function W(a, b, c) {
        this.proton = a, this.element = b, this.stroke = c;
    }
    function V(a, b, d) {
        this.element = d, this.type = c.Util.initValue(a, "canvas"), this.proton = b, this.renderer = this.getRenderer();
    }
    function T(b, d, e) {
        this.mouseTarget = c.Util.initValue(b, a), this.ease = c.Util.initValue(d, .7),
        this._allowEmitting = !1, this.initEventHandler(), T._super_.call(this, e);
    }
    function S(a) {
        this.selfBehaviours = [], S._super_.call(this, a);
    }
    function R(a) {
        this.initializes = [], this.particles = [], this.behaviours = [], this.emitTime = 0,
        this.emitTotalTimes = -1, this.damping = .006, this.bindEmitter = !0, this.rate = new c.Rate(1, .1),
        R._super_.call(this, a), this.id = "emitter_" + R.ID++;
    }
    function Q(a, b, d, e) {
        Q._super_.call(this, d, e), this.distanceVec = new c.Vector2D(), this.centerPoint = c.Util.initValue(a, new c.Vector2D()),
        this.force = c.Util.initValue(this.normalizeValue(b), 100), this.name = "GravityWell";
    }
    function P(a, b, c, d) {
        P._super_.call(this, c, d), this.reset(a, b), this.name = "Color";
    }
    function O(a, b, c, d, e) {
        O._super_.call(this, d, e), this.reset(a, b, c), this.name = "Rotate";
    }
    function N(a, b, c, d) {
        N._super_.call(this, c, d), this.reset(a, b), this.name = "Scale";
    }
    function M(a, b, c, d) {
        M._super_.call(this, c, d), this.reset(a, b), this.name = "Alpha";
    }
    function L(a, b, c, d) {
        L._super_.call(this, c, d), this.reset(a, b), this.name = "CrossZone";
    }
    function K(a, b, c, d, e) {
        K._super_.call(this, d, e), this.reset(a, b, c), this.name = "Collision";
    }
    function J(a, b, c) {
        J._super_.call(this, 0, a, b, c), this.name = "Gravity";
    }
    function I(a, b, c, d, e) {
        I._super_.call(this, a, b, c, d, e), this.force *= -1, this.name = "Repulsion";
    }
    function H(a, b, c, d, e) {
        H._super_.call(this, d, e), this.reset(a, b, c), this.time = 0, this.name = "RandomDrift";
    }
    function G(a, b, d, e, f) {
        G._super_.call(this, e, f), this.targetPosition = c.Util.initValue(a, new c.Vector2D()),
        this.radius = c.Util.initValue(d, 1e3), this.force = c.Util.initValue(this.normalizeValue(b), 100),
        this.radiusSq = this.radius * this.radius, this.attractionForce = new c.Vector2D(),
        this.lengthSq = 0, this.name = "Attraction";
    }
    function F(a, b, d, e) {
        F._super_.call(this, d, e), this.force = this.normalizeForce(new c.Vector2D(a, b)),
        this.name = "Force";
    }
    function E(a, b, d) {
        E._super_.call(this), this.image = this.setSpanValue(a), this.w = c.Util.initValue(b, 20),
        this.h = c.Util.initValue(d, this.w);
    }
    function D(a, b, d) {
        D._super_.call(this), this.radius = c.Util.setSpanValue(a, b, d);
    }
    function C(a, b, d) {
        C._super_.call(this), this.massPan = c.Util.setSpanValue(a, b, d);
    }
    function B(a, b, d) {
        B._super_.call(this), this.rPan = c.Util.setSpanValue(a), this.thaPan = c.Util.setSpanValue(b),
        this.type = c.Util.initValue(d, "vector");
    }
    function A(a) {
        A._super_.call(this), this.zone = c.Util.initValue(a, new c.PointZone());
    }
    function z(a, b, d) {
        z._super_.call(this), this.lifePan = c.Util.setSpanValue(a, b, d);
    }
    function x() {}
    function w(a, b) {
        this.numPan = c.Util.initValue(a, 1), this.timePan = c.Util.initValue(b, 1), this.numPan = c.Util.setSpanValue(this.numPan),
        this.timePan = c.Util.setSpanValue(this.timePan), this.startTime = 0, this.nextTime = 0,
        this.init();
    }
    function v(a, b) {
        this.id = "Behaviour_" + v.id++, this.life = c.Util.initValue(a, Infinity), this.easing = c.ease.setEasingByName(b),
        this.age = 0, this.energy = 1, this.dead = !1, this.parents = [], this.name = "Behaviour";
    }
    function t(a, b, c, d) {
        this.x = a, this.y = b, this.width = c, this.height = d, this.bottom = this.y + this.height,
        this.right = this.x + this.width;
    }
    function s(a) {
        c.Util.isArray(a) ? this.colorArr = a : this.colorArr = [ a ];
    }
    function r(a, b, d) {
        this.isArray = !1, c.Util.isArray(a) ? (this.isArray = !0, this.a = a) : (this.a = c.Util.initValue(a, 1),
        this.b = c.Util.initValue(b, this.a), this.center = c.Util.initValue(d, !1));
    }
    function l(a, b) {
        this.proParticleCount = c.Util.initValue(a, 0), this.releaseTime = c.Util.initValue(b, -1),
        this.poolList = [], this.timeoutID = 0;
        for (var d = 0; d < this.proParticleCount; d++) this.add();
        this.releaseTime > 0 && (this.timeoutID = setTimeout(this.release, this.releaseTime / 1e3));
    }
    function k(a) {
        this.id = "particle_" + k.ID++, this.reset(!0), c.Util.setPrototypeByObject(this, a);
    }
    function j() {
        this.mats = [], this.size = 0;
        for (var a = 0; a < 20; a++) this.mats.push(c.Mat3.create([ 0, 0, 0, 0, 0, 0, 0, 0, 0 ]));
    }
    function f(a) {
        this.type = a.type, this.particle = a.particle, this.emitter = a.emitter;
    }
    function d() {
        this.initialize();
    }
    function c(a, b) {
        this.proParticleCount = c.Util.initValue(a, c.POOL_MAX), this.integrationType = c.Util.initValue(b, c.EULER),
        this.emitters = [], this.renderers = [], this.time = 0, this.oldTime = 0, c.pool = new c.ParticlePool(this.proParticleCount),
        c.integrator = new c.NumericalIntegration(this.integrationType);
    }
    c.POOL_MAX = 1e3, c.TIME_STEP = 60, c.MEASURE = 100, c.EULER = "euler", c.RK2 = "runge-kutta2",
    c.RK4 = "runge-kutta4", c.VERLET = "verlet", c.PARTICLE_CREATED = "partilcleCreated",
    c.PARTICLE_UPDATE = "partilcleUpdate", c.PARTICLE_SLEEP = "particleSleep", c.PARTICLE_DEAD = "partilcleDead",
    c.PROTON_UPDATE = "protonUpdate", c.PROTON_UPDATE_AFTER = "protonUpdateAfter", c.EMITTER_ADDED = "emitterAdded",
    c.EMITTER_REMOVED = "emitterRemoved", c.amendChangeTabsBug = !0, c.TextureBuffer = {},
    c.TextureCanvasBuffer = {}, c.prototype = {
        addRender: function(a) {
            a.proton = this, this.renderers.push(a.proton);
        },
        addEmitter: function(a) {
            this.emitters.push(a), a.parent = this, this.dispatchEvent(new c.Event({
                type: c.EMITTER_ADDED,
                emitter: a
            }));
        },
        removeEmitter: function(a) {
            var b = this.emitters.indexOf(a);
            this.emitters.splice(b, 1), a.parent = null, this.dispatchEvent(new c.Event({
                type: c.EMITTER_REMOVED,
                emitter: a
            }));
        },
        update: function() {
            this.dispatchEvent(new c.Event({
                type: c.PROTON_UPDATE
            })), this.oldTime || (this.oldTime = new Date().getTime());
            var a = new Date().getTime();
            this.elapsed = (a - this.oldTime) / 1e3, c.amendChangeTabsBug && this.amendChangeTabsBug(),
            this.oldTime = a;
            if (this.elapsed > 0) for (var b = 0; b < this.emitters.length; b++) this.emitters[b].update(this.elapsed);
            this.dispatchEvent(new c.Event({
                type: c.PROTON_UPDATE_AFTER
            }));
        },
        amendChangeTabsBug: function() {
            this.elapsed > .5 && (this.oldTime = new Date().getTime(), this.elapsed = 0);
        },
        getCount: function() {
            var a = 0, b = this.emitters.length;
            for (var c = 0; c < b; c++) a += this.emitters[c].particles.length;
            return a;
        },
        destory: function() {
            var a = this.emitters.length;
            for (var b = 0; b < a; b++) this.emitters[b].destory(), delete this.emitters[b];
            this.emitters = [], this.time = 0, this.oldTime = 0, c.pool.release();
        }
    }, a.Proton = c;
    var e = d.prototype;
    d.initialize = function(a) {
        a.addEventListener = e.addEventListener, a.removeEventListener = e.removeEventListener,
        a.removeAllEventListeners = e.removeAllEventListeners, a.hasEventListener = e.hasEventListener,
        a.dispatchEvent = e.dispatchEvent;
    }, e._listeners = null, e.initialize = function() {}, e.addEventListener = function(a, b) {
        var c = this._listeners;
        c ? this.removeEventListener(a, b) : c = this._listeners = {};
        var d = c[a];
        d || (d = c[a] = []), d.push(b);
        return b;
    }, e.removeEventListener = function(a, b) {
        var c = this._listeners;
        if (!!c) {
            var d = c[a];
            if (!d) return;
            for (var e = 0, f = d.length; e < f; e++) if (d[e] == b) {
                f == 1 ? delete c[a] : d.splice(e, 1);
                break;
            }
        }
    }, e.removeAllEventListeners = function(a) {
        a ? this._listeners && delete this._listeners[a] : this._listeners = null;
    }, e.dispatchEvent = function(a) {
        var b = !1, c = this._listeners;
        if (a && c) {
            var d = c[a.type];
            if (!d) return b;
            d = d.slice();
            for (var e = 0, f = d.length; e < f; e++) {
                var g = d[e];
                b = b || g(a);
            }
        }
        return !!b;
    }, e.hasEventListener = function(a) {
        var b = this._listeners;
        return !!b && !!b[a];
    }, c.EventDispatcher = d, c.EventDispatcher.initialize(c.prototype), c.Event = f;
    var g = g || {
        initValue: function(a, c) {
            var a = a != null && a != b ? a : c;
            return a;
        },
        isArray: function(a) {
            return typeof a == "object" && a.hasOwnProperty("length");
        },
        destroyArray: function(a) {
            a.length = 0;
        },
        destroyObject: function(a) {
            for (var b in a) delete a[b];
        },
        getVector2D: function(a, b) {
            if (typeof a == "object") return a;
            var d = new c.Vector2D(a, b);
            return d;
        },
        judgeVector2D: function(a) {
            var b = "";
            if (a.hasOwnProperty("x") || a.hasOwnProperty("y") || a.hasOwnProperty("p") || a.hasOwnProperty("position")) b += "p";
            if (a.hasOwnProperty("vx") || a.hasOwnProperty("vx") || a.hasOwnProperty("v") || a.hasOwnProperty("velocity")) b += "v";
            if (a.hasOwnProperty("ax") || a.hasOwnProperty("ax") || a.hasOwnProperty("a") || a.hasOwnProperty("accelerate")) b += "a";
            return b;
        },
        setVector2DByObject: function(a, b) {
            b.hasOwnProperty("x") && (a.p.x = b.x), b.hasOwnProperty("y") && (a.p.y = b.y),
            b.hasOwnProperty("vx") && (a.v.x = b.vx), b.hasOwnProperty("vy") && (a.v.y = b.vy),
            b.hasOwnProperty("ax") && (a.a.x = b.ax), b.hasOwnProperty("ay") && (a.a.y = b.ay),
            b.hasOwnProperty("p") && particle.p.copy(b.p), b.hasOwnProperty("v") && particle.v.copy(b.v),
            b.hasOwnProperty("a") && particle.a.copy(b.a), b.hasOwnProperty("position") && particle.p.copy(b.position),
            b.hasOwnProperty("velocity") && particle.v.copy(b.velocity), b.hasOwnProperty("accelerate") && particle.a.copy(b.accelerate);
        },
        addPrototypeByObject: function(a, b, d) {
            for (var e in b) d ? d.indexOf(e) < 0 && (a[e] = c.Util.getSpanValue(b[e])) : a[e] = c.Util.getSpanValue(b[e]);
            return a;
        },
        setPrototypeByObject: function(a, b, d) {
            for (var e in b) a.hasOwnProperty(e) && (d ? d.indexOf(e) < 0 && (a[e] = c.Util.getSpanValue(b[e])) : a[e] = c.Util.getSpanValue(b[e]));
            return a;
        },
        setSpanValue: function(a, b, d) {
            return a instanceof c.Span ? a : b ? d ? new c.Span(a, b, d) : new c.Span(a, b) : new c.Span(a);
        },
        getSpanValue: function(a) {
            return a instanceof c.Span ? a.getValue() : a;
        },
        inherits: function(a, b) {
            a._super_ = b;
            if (Object.create) a.prototype = Object.create(b.prototype, {
                constructor: {
                    value: b
                }
            }); else {
                var c = function() {};
                c.prototype = b.prototype, a.prototype = new c(), a.prototype.constructor = a;
            }
        },
        getImageData: function(a, b, c) {
            a.drawImage(b, c.x, c.y);
            var d = a.getImageData(c.x, c.y, c.width, c.height);
            a.clearRect(c.x, c.y, c.width, c.height);
            return d;
        },
        getImage: function(a, b, c, d) {
            typeof a == "string" ? this.loadAndSetImage(a, b, c, d) : typeof a == "object" ? this.loadAndSetImage(a.src, b, c, d) : a instanceof Image && this.loadedImage(a.src, b, c, d, a);
        },
        loadedImage: function(a, b, d, e, f) {
            b.target = f, b.transform.src = a, c.TextureBuffer[a] || (c.TextureBuffer[a] = b.target);
            if (d) if (c.TextureCanvasBuffer[a]) b.transform.canvas = c.TextureCanvasBuffer[a]; else {
                var g = c.WebGLUtil.nhpot(b.target.width), h = c.WebGLUtil.nhpot(b.target.height);
                b.transform.canvas = c.DomUtil.createCanvas("canvas" + a, g, h);
                var i = b.transform.canvas.getContext("2d");
                i.drawImage(b.target, 0, 0, b.target.width, b.target.height), c.TextureCanvasBuffer[a] = b.transform.canvas;
            }
            e && e(b);
        },
        loadAndSetImage: function(a, b, d, e) {
            if (c.TextureBuffer[a]) this.loadedImage(a, b, d, e, c.TextureBuffer[a]); else {
                var f = this, g = new Image();
                g.onload = function(c) {
                    f.loadedImage(a, b, d, e, c.target);
                }, g.src = a;
            }
        },
        hexToRGB: function(a) {
            var b = a.charAt(0) == "#" ? a.substring(1, 7) : a, c = parseInt(b.substring(0, 2), 16), d = parseInt(b.substring(2, 4), 16), e = parseInt(b.substring(4, 6), 16);
            return {
                r: c,
                g: d,
                b: e
            };
        },
        rgbToHex: function(a) {
            return "rgb(" + a.r + ", " + a.g + ", " + a.b + ")";
        }
    };
    c.Util = g;
    var h = h || {
        ipot: function(a) {
            return (a & a - 1) == 0;
        },
        nhpot: function(a) {
            --a;
            for (var b = 1; b < 32; b <<= 1) a = a | a >> b;
            return a + 1;
        },
        makeTranslation: function(a, b) {
            return [ 1, 0, 0, 0, 1, 0, a, b, 1 ];
        },
        makeRotation: function(a) {
            var b = Math.cos(a), c = Math.sin(a);
            return [ b, -c, 0, c, b, 0, 0, 0, 1 ];
        },
        makeScale: function(a, b) {
            return [ a, 0, 0, 0, b, 0, 0, 0, 1 ];
        },
        matrixMultiply: function(a, b) {
            var c = a[0], d = a[1], e = a[2], f = a[3], g = a[4], h = a[5], i = a[6], j = a[7], k = a[8], l = b[0], m = b[1], n = b[2], o = b[3], p = b[4], q = b[5], r = b[6], s = b[7], t = b[8];
            return [ c * l + d * o + e * r, c * m + d * p + e * s, c * n + d * q + e * t, f * l + g * o + h * r, f * m + g * p + h * s, f * n + g * q + h * t, i * l + j * o + k * r, i * m + j * p + k * s, i * n + j * q + k * t ];
        }
    };
    c.WebGLUtil = h;
    var i = i || {
        createCanvas: function(a, b, c, d) {
            var e = document.createElement("canvas"), f = d ? d : "absolute";
            e.id = a, e.width = b, e.height = c, e.style.position = f, e.style.opacity = 0,
            this.transformDom(e, -500, -500, 0, 0);
            return e;
        },
        transformDom: function(a, b, c, d, e) {
            a.style.WebkitTransform = "translate(" + b + "px, " + c + "px) " + "scale(" + d + ") " + "rotate(" + e + "deg)",
            a.style.MozTransform = "translate(" + b + "px, " + c + "px) " + "scale(" + d + ") " + "rotate(" + e + "deg)",
            a.style.OTransform = "translate(" + b + "px, " + c + "px) " + "scale(" + d + ") " + "rotate(" + e + "deg)",
            a.style.msTransform = "translate(" + b + "px, " + c + "px) " + "scale(" + d + ") " + "rotate(" + e + "deg)",
            a.style.transform = "translate(" + b + "px, " + c + "px) " + "scale(" + d + ") " + "rotate(" + e + "deg)";
        }
    };
    c.DomUtil = i, j.prototype.set = function(a, b) {
        b == 0 ? c.Mat3.set(a, this.mats[0]) : c.Mat3.multiply(this.mats[b - 1], a, this.mats[b]),
        this.size = Math.max(this.size, b + 1);
    }, j.prototype.push = function(a) {
        this.size == 0 ? c.Mat3.set(a, this.mats[0]) : c.Mat3.multiply(this.mats[this.size - 1], a, this.mats[this.size]),
        this.size++;
    }, j.prototype.pop = function() {
        this.size > 0 && this.size--;
    }, j.prototype.top = function() {
        return this.mats[this.size - 1];
    }, c.MStack = j, k.ID = 0, k.prototype = {
        getDirection: function() {
            return Math.atan2(this.v.x, -this.v.y) * (180 / Math.PI);
        },
        reset: function(a) {
            this.life = Infinity, this.age = 0, this.energy = 1, this.dead = !1, this.sleep = !1,
            this.target = null, this.sprite = null, this.parent = null, this.mass = 1, this.radius = 10,
            this.alpha = 1, this.scale = 1, this.rotation = 0, this.color = null, this.easing = c.ease.setEasingByName(c.easeLinear),
            a ? (this.transform = {}, this.p = new c.Vector2D(), this.v = new c.Vector2D(),
            this.a = new c.Vector2D(), this.old = {
                p: new c.Vector2D(),
                v: new c.Vector2D(),
                a: new c.Vector2D()
            }, this.behaviours = []) : (c.Util.destroyObject(this.transform), this.p.set(0, 0),
            this.v.set(0, 0), this.a.set(0, 0), this.old.p.set(0, 0), this.old.v.set(0, 0),
            this.old.a.set(0, 0), this.removeAllBehaviours()), this.transform.rgb = {
                r: 255,
                g: 255,
                b: 255
            };
            return this;
        },
        update: function(a, b) {
            if (!this.sleep) {
                this.age += a;
                var c = this.behaviours.length, d;
                for (d = 0; d < c; d++) this.behaviours[d] && this.behaviours[d].applyBehaviour(this, a, b);
            }
            if (this.age >= this.life) this.destory(); else {
                var e = this.easing(this.age / this.life);
                this.energy = Math.max(1 - e, 0);
            }
        },
        addBehaviour: function(a) {
            this.behaviours.push(a), a.hasOwnProperty("parents") && a.parents.push(this), a.initialize(this);
        },
        addBehaviours: function(a) {
            var b = a.length, c;
            for (c = 0; c < b; c++) this.addBehaviour(a[c]);
        },
        removeBehaviour: function(a) {
            var b = this.behaviours.indexOf(a);
            if (b > -1) {
                var a = this.behaviours.splice(b, 1);
                a.parents = null;
            }
        },
        removeAllBehaviours: function() {
            c.Util.destroyArray(this.behaviours);
        },
        destory: function() {
            this.removeAllBehaviours(), this.energy = 0, this.dead = !0, this.parent = null;
        }
    }, c.Particle = k, l.prototype = {
        create: function(a) {
            return a ? new newTypeParticle() : new c.Particle();
        },
        getCount: function() {
            return this.poolList.length;
        },
        add: function() {
            return this.poolList.push(this.create());
        },
        get: function() {
            return this.poolList.length === 0 ? this.create() : this.poolList.pop().reset();
        },
        set: function(a) {
            if (this.poolList.length < c.POOL_MAX) return this.poolList.push(a);
        },
        release: function() {
            for (var a = 0; a < this.poolList.length; a++) this.poolList[a].destory && this.poolList[a].destory(),
            delete this.poolList[a];
            this.poolList = [];
        }
    }, c.ParticlePool = l;
    var m = {
        randomAToB: function(a, b, c) {
            return c ? Math.floor(Math.random() * (b - a)) + a : a + Math.random() * (b - a);
        },
        randomFloating: function(a, b, c) {
            return m.randomAToB(a - b, a + b, c);
        },
        randomZone: function(a) {},
        degreeTransform: function(a) {
            return a * Math.PI / 180;
        },
        toColor16: function(a) {
            return "#" + a.toString(16);
        },
        randomColor: function() {
            return "#" + ("00000" + (Math.random() * 16777216 << 0).toString(16)).slice(-6);
        }
    };
    c.MathUtils = m;
    var o = function(a) {
        this.type = c.Util.initValue(a, c.EULER);
    };
    o.prototype = {
        integrate: function(a, b, c) {
            this.eulerIntegrate(a, b, c);
        },
        eulerIntegrate: function(a, b, c) {
            a.sleep || (a.old.p.copy(a.p), a.old.v.copy(a.v), a.a.multiplyScalar(1 / a.mass),
            a.v.add(a.a.multiplyScalar(b)), a.p.add(a.old.v.multiplyScalar(b)), c && a.v.multiplyScalar(c),
            a.a.clear());
        }
    }, c.NumericalIntegration = o;
    var p = function(a, b) {
        this.x = a || 0, this.y = b || 0;
    };
    p.prototype = {
        set: function(a, b) {
            this.x = a, this.y = b;
            return this;
        },
        setX: function(a) {
            this.x = a;
            return this;
        },
        setY: function(a) {
            this.y = a;
            return this;
        },
        setComponent: function(a, b) {
            switch (a) {
              case 0:
                this.x = b;
                break;

              case 1:
                this.y = b;
                break;

              default:
                throw new Error("index is out of range: " + a);
            }
        },
        getGradient: function() {
            if (this.x != 0) return Math.atan2(this.y, this.x);
            if (this.y > 0) return Math.PI / 2;
            if (this.y < 0) return -Math.PI / 2;
        },
        getComponent: function(a) {
            switch (a) {
              case 0:
                return this.x;

              case 1:
                return this.y;

              default:
                throw new Error("index is out of range: " + a);
            }
        },
        copy: function(a) {
            this.x = a.x, this.y = a.y;
            return this;
        },
        add: function(a, c) {
            if (c !== b) return this.addVectors(a, c);
            this.x += a.x, this.y += a.y;
            return this;
        },
        addXY: function(a, b) {
            this.x += a, this.y += b;
            return this;
        },
        addVectors: function(a, b) {
            this.x = a.x + b.x, this.y = a.y + b.y;
            return this;
        },
        addScalar: function(a) {
            this.x += a, this.y += a;
            return this;
        },
        sub: function(a, c) {
            if (c !== b) return this.subVectors(a, c);
            this.x -= a.x, this.y -= a.y;
            return this;
        },
        subVectors: function(a, b) {
            this.x = a.x - b.x, this.y = a.y - b.y;
            return this;
        },
        multiplyScalar: function(a) {
            this.x *= a, this.y *= a;
            return this;
        },
        divideScalar: function(a) {
            a !== 0 ? (this.x /= a, this.y /= a) : this.set(0, 0);
            return this;
        },
        min: function(a) {
            this.x > a.x && (this.x = a.x), this.y > a.y && (this.y = a.y);
            return this;
        },
        max: function(a) {
            this.x < a.x && (this.x = a.x), this.y < a.y && (this.y = a.y);
            return this;
        },
        clamp: function(a, b) {
            this.x < a.x ? this.x = a.x : this.x > b.x && (this.x = b.x), this.y < a.y ? this.y = a.y : this.y > b.y && (this.y = b.y);
            return this;
        },
        negate: function() {
            return this.multiplyScalar(-1);
        },
        dot: function(a) {
            return this.x * a.x + this.y * a.y;
        },
        lengthSq: function() {
            return this.x * this.x + this.y * this.y;
        },
        length: function() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        },
        normalize: function() {
            return this.divideScalar(this.length());
        },
        distanceTo: function(a) {
            return Math.sqrt(this.distanceToSquared(a));
        },
        rotate: function(a) {
            var b = this.x, c = this.y;
            this.x = b * Math.cos(a) + c * Math.sin(a), this.y = -b * Math.sin(a) + c * Math.cos(a);
            return this;
        },
        distanceToSquared: function(a) {
            var b = this.x - a.x, c = this.y - a.y;
            return b * b + c * c;
        },
        setLength: function(a) {
            var b = this.length();
            b !== 0 && a !== b && this.multiplyScalar(a / b);
            return this;
        },
        lerp: function(a, b) {
            this.x += (a.x - this.x) * b, this.y += (a.y - this.y) * b;
            return this;
        },
        equals: function(a) {
            return a.x === this.x && a.y === this.y;
        },
        toArray: function() {
            return [ this.x, this.y ];
        },
        clear: function() {
            this.x = 0, this.y = 0;
            return this;
        },
        clone: function() {
            return new c.Vector2D(this.x, this.y);
        }
    }, c.Vector2D = p;
    var q = function(a, b) {
        this.r = Math.abs(a) || 0, this.tha = b || 0;
    };
    q.prototype = {
        set: function(a, b) {
            this.r = a, this.tha = b;
            return this;
        },
        setR: function(a) {
            this.r = a;
            return this;
        },
        setTha: function(a) {
            this.tha = a;
            return this;
        },
        copy: function(a) {
            this.r = a.r, this.tha = a.tha;
            return this;
        },
        toVector: function() {
            return new c.Vector2D(this.getX(), this.getY());
        },
        getX: function() {
            return this.r * Math.sin(this.tha);
        },
        getY: function() {
            return -this.r * Math.cos(this.tha);
        },
        normalize: function() {
            this.r = 1;
            return this;
        },
        equals: function(a) {
            return a.r === this.r && a.tha === this.tha;
        },
        toArray: function() {
            return [ this.r, this.tha ];
        },
        clear: function() {
            this.r = 0, this.tha = 0;
            return this;
        },
        clone: function() {
            return new c.Polar2D(this.r, this.tha);
        }
    }, c.Polar2D = q, r.prototype = {
        getValue: function(a) {
            return this.isArray ? this.a[Math.floor(this.a.length * Math.random())] : this.center ? c.MathUtils.randomFloating(this.a, this.b, a) : c.MathUtils.randomAToB(this.a, this.b, a);
        }
    }, c.Span = r, c.getSpan = function(a, b, d) {
        return new c.Span(a, b, d);
    }, c.Util.inherits(s, c.Span), s.prototype.getValue = function() {
        var a = this.colorArr[Math.floor(this.colorArr.length * Math.random())];
        return a == "random" || a == "Random" ? c.MathUtils.randomColor() : a;
    }, c.ColorSpan = s, t.prototype = {
        contains: function(a, b) {
            return a <= this.right && a >= this.x && b <= this.bottom && b >= this.y ? !0 : !1;
        }
    }, c.Rectangle = t;
    var u = u || {
        create: function(a) {
            var b = new Float32Array(9);
            a && this.set(a, b);
            return b;
        },
        set: function(a, b) {
            for (var c = 0; c < 9; c++) b[c] = a[c];
            return b;
        },
        multiply: function(a, b, c) {
            var d = a[0], e = a[1], f = a[2], g = a[3], h = a[4], i = a[6], j = a[7], k = b[0], l = b[1], m = b[2], n = b[3], o = b[4], p = b[6], q = b[7];
            c[0] = k * d + l * g, c[1] = k * e + l * h, c[2] = f * m, c[3] = n * d + o * g,
            c[4] = n * e + o * h, c[6] = p * d + q * g + i, c[7] = p * e + q * h + j;
            return c;
        },
        inverse: function(a, b) {
            var c = a[0], d = a[1], e = a[3], f = a[4], g = a[6], h = a[7], i = f, j = -e, k = h * e - f * g, l = c * i + d * j, m;
            m = 1 / l, b[0] = i * m, b[1] = -d * m, b[3] = j * m, b[4] = c * m, b[6] = k * m,
            b[7] = (-h * c + d * g) * m;
            return b;
        },
        multiplyVec2: function(a, b, c) {
            var d = b[0], e = b[1];
            c[0] = d * a[0] + e * a[3] + a[6], c[1] = d * a[1] + e * a[4] + a[7];
            return c;
        }
    };
    c.Mat3 = u, v.id = 0, v.prototype = {
        reset: function(a, b) {
            this.life = c.Util.initValue(a, Infinity), this.easing = c.Util.initValue(b, c.ease.setEasingByName(c.easeLinear));
        },
        normalizeForce: function(a) {
            return a.multiplyScalar(c.MEASURE);
        },
        normalizeValue: function(a) {
            return a * c.MEASURE;
        },
        initialize: function(a) {},
        applyBehaviour: function(a, b, c) {
            this.age += b;
            if (this.age >= this.life || this.dead) this.energy = 0, this.dead = !0, this.destory(); else {
                var d = this.easing(a.age / a.life);
                this.energy = Math.max(1 - d, 0);
            }
        },
        destory: function() {
            var a, b = this.parents.length, c;
            for (c = 0; c < b; c++) this.parents[c].removeBehaviour(this);
            this.parents = [];
        }
    }, c.Behaviour = v, w.prototype = {
        init: function() {
            this.startTime = 0, this.nextTime = this.timePan.getValue();
        },
        getValue: function(a) {
            this.startTime += a;
            if (this.startTime >= this.nextTime) {
                this.startTime = 0, this.nextTime = this.timePan.getValue();
                return this.numPan.b == 1 ? this.numPan.getValue(!1) > .5 ? 1 : 0 : this.numPan.getValue(!0);
            }
            return 0;
        }
    }, c.Rate = w, x.prototype.reset = function() {}, x.prototype.init = function(a, b) {
        b ? this.initialize(b) : this.initialize(a);
    }, x.prototype.initialize = function(a) {}, c.Initialize = x;
    var y = {
        initialize: function(a, b, d) {
            var e = d.length, f;
            for (f = 0; f < e; f++) d[f] instanceof c.Initialize ? d[f].init(a, b) : c.InitializeUtil.init(a, b, d[f]);
            c.InitializeUtil.bindEmitter(a, b);
        },
        init: function(a, b, d) {
            c.Util.setPrototypeByObject(b, d), c.Util.setVector2DByObject(b, d);
        },
        bindEmitter: function(a, b) {
            a.bindEmitter && (b.p.add(a.p), b.v.add(a.v), b.a.add(a.a), b.v.rotate(c.MathUtils.degreeTransform(a.rotation)));
        }
    };
    c.InitializeUtil = y, c.Util.inherits(z, c.Initialize), z.prototype.initialize = function(a) {
        this.lifePan.a == Infinity ? a.life = Infinity : a.life = this.lifePan.getValue();
    }, c.Life = z, c.Util.inherits(A, c.Initialize), A.prototype.reset = function(a) {
        this.zone = c.Util.initValue(a, new c.PointZone());
    }, A.prototype.initialize = function(a) {
        this.zone.getPosition(), a.p.x = this.zone.vector.x, a.p.y = this.zone.vector.y;
    }, c.Position = A, c.P = A, c.Util.inherits(B, c.Initialize), B.prototype.reset = function(a, b, d) {
        this.rPan = c.Util.setSpanValue(a), this.thaPan = c.Util.setSpanValue(b), this.type = c.Util.initValue(d, "vector");
    }, B.prototype.normalizeVelocity = function(a) {
        return a * c.MEASURE;
    }, B.prototype.initialize = function(a) {
        if (this.type == "p" || this.type == "P" || this.type == "polar") {
            var b = new c.Polar2D(this.normalizeVelocity(this.rPan.getValue()), this.thaPan.getValue() * Math.PI / 180);
            a.v.x = b.getX(), a.v.y = b.getY();
        } else a.v.x = this.normalizeVelocity(this.rPan.getValue()), a.v.y = this.normalizeVelocity(this.thaPan.getValue());
    }, c.Velocity = B, c.V = B, c.Util.inherits(C, c.Initialize), C.prototype.initialize = function(a) {
        a.mass = this.massPan.getValue();
    }, c.Mass = C, c.Util.inherits(D, c.Initialize), D.prototype.reset = function(a, b, d) {
        this.radius = c.Util.setSpanValue(a, b, d);
    }, D.prototype.initialize = function(a) {
        a.radius = this.radius.getValue(), a.transform.oldRadius = a.radius;
    }, c.Radius = D, c.Util.inherits(E, c.Initialize), E.prototype.initialize = function(a) {
        var b = this.image.getValue();
        typeof b == "string" ? a.target = {
            width: this.w,
            height: this.h,
            src: b
        } : a.target = b;
    }, E.prototype.setSpanValue = function(a) {
        return a instanceof c.ColorSpan ? a : new c.ColorSpan(a);
    }, c.ImageTarget = E, c.Util.inherits(F, c.Behaviour), F.prototype.reset = function(a, b, d, e) {
        this.force = this.normalizeForce(new c.Vector2D(a, b)), d && F._super_.prototype.reset.call(this, d, e);
    }, F.prototype.applyBehaviour = function(a, b, c) {
        F._super_.prototype.applyBehaviour.call(this, a, b, c), a.a.add(this.force);
    }, c.Force = F, c.F = F, c.Util.inherits(G, c.Behaviour), G.prototype.reset = function(a, b, d, e, f) {
        this.targetPosition = c.Util.initValue(a, new c.Vector2D()), this.radius = c.Util.initValue(d, 1e3),
        this.force = c.Util.initValue(this.normalizeValue(b), 100), this.radiusSq = this.radius * this.radius,
        this.attractionForce = new c.Vector2D(), this.lengthSq = 0, e && G._super_.prototype.reset.call(this, e, f);
    }, G.prototype.applyBehaviour = function(a, b, c) {
        G._super_.prototype.applyBehaviour.call(this, a, b, c), this.attractionForce.copy(this.targetPosition),
        this.attractionForce.sub(a.p), this.lengthSq = this.attractionForce.lengthSq(),
        this.lengthSq > 4e-6 && this.lengthSq < this.radiusSq && (this.attractionForce.normalize(),
        this.attractionForce.multiplyScalar(1 - this.lengthSq / this.radiusSq), this.attractionForce.multiplyScalar(this.force),
        a.a.add(this.attractionForce));
    }, c.Attraction = G, c.Util.inherits(H, c.Behaviour), H.prototype.reset = function(a, b, d, e, f) {
        this.panFoce = new c.Vector2D(a, b), this.panFoce = this.normalizeForce(this.panFoce),
        this.delay = d, e && H._super_.prototype.reset.call(this, e, f);
    }, H.prototype.applyBehaviour = function(a, b, d) {
        H._super_.prototype.applyBehaviour.call(this, a, b, d), this.time += b, this.time >= this.delay && (a.a.addXY(c.MathUtils.randomAToB(-this.panFoce.x, this.panFoce.x), c.MathUtils.randomAToB(-this.panFoce.y, this.panFoce.y)),
        this.time = 0);
    }, c.RandomDrift = H, c.Util.inherits(I, c.Attraction), I.prototype.reset = function(a, b, c, d, e) {
        I._super_.prototype.reset.call(this, a, b, c, d, e), this.force *= -1;
    }, c.Repulsion = I, c.Util.inherits(J, c.Force), J.prototype.reset = function(a, b, c) {
        J._super_.prototype.reset.call(this, 0, a, b, c);
    }, c.Gravity = J, c.G = J, c.Util.inherits(K, c.Behaviour), K.prototype.reset = function(a, b, d, e, f) {
        this.emitter = c.Util.initValue(a, null), this.mass = c.Util.initValue(b, !0), this.callback = c.Util.initValue(d, null),
        this.collisionPool = [], this.delta = new c.Vector2D(), e && K._super_.prototype.reset.call(this, e, f);
    }, K.prototype.applyBehaviour = function(a, b, c) {
        var d = this.emitter ? this.emitter.particles.slice(c) : this.pool.slice(c), e, f, g, h, i, j = d.length;
        for (var k = 0; k < j; k++) e = d[k], e !== a && (this.delta.copy(e.p), this.delta.sub(a.p),
        f = this.delta.lengthSq(), distance = a.radius + e.radius, f <= distance * distance && (g = distance - Math.sqrt(f),
        g += .5, totalMass = a.mass + e.mass, h = this.mass ? e.mass / totalMass : .5, i = this.mass ? a.mass / totalMass : .5,
        a.p.add(this.delta.clone().normalize().multiplyScalar(g * -h)), e.p.add(this.delta.normalize().multiplyScalar(g * i)),
        this.callback && this.callback(a, e)));
    }, c.Collision = K, c.Util.inherits(L, c.Behaviour), L.prototype.reset = function(a, b, d, e) {
        this.zone = a, this.zone.crossType = c.Util.initValue(b, "dead"), d && L._super_.prototype.reset.call(this, d, e);
    }, L.prototype.applyBehaviour = function(a, b, c) {
        L._super_.prototype.applyBehaviour.call(this, a, b, c), this.zone.crossing(a);
    }, c.CrossZone = L, c.Util.inherits(M, c.Behaviour), M.prototype.reset = function(a, d, e, f) {
        d == null || d == b ? this.same = !0 : this.same = !1, this.a = c.Util.setSpanValue(c.Util.initValue(a, 1)),
        this.b = c.Util.setSpanValue(d), e && M._super_.prototype.reset.call(this, e, f);
    }, M.prototype.initialize = function(a) {
        a.transform.alphaA = this.a.getValue(), this.same ? a.transform.alphaB = a.transform.alphaA : a.transform.alphaB = this.b.getValue();
    }, M.prototype.applyBehaviour = function(a, b, c) {
        M._super_.prototype.applyBehaviour.call(this, a, b, c), a.alpha = a.transform.alphaB + (a.transform.alphaA - a.transform.alphaB) * this.energy,
        a.alpha < .001 && (a.alpha = 0);
    }, c.Alpha = M, c.Util.inherits(N, c.Behaviour), N.prototype.reset = function(a, d, e, f) {
        d == null || d == b ? this.same = !0 : this.same = !1, this.a = c.Util.setSpanValue(c.Util.initValue(a, 1)),
        this.b = c.Util.setSpanValue(d), e && N._super_.prototype.reset.call(this, e, f);
    }, N.prototype.initialize = function(a) {
        a.transform.scaleA = this.a.getValue(), a.transform.oldRadius = a.radius, this.same ? a.transform.scaleB = a.transform.scaleA : a.transform.scaleB = this.b.getValue();
    }, N.prototype.applyBehaviour = function(a, b, c) {
        N._super_.prototype.applyBehaviour.call(this, a, b, c), a.scale = a.transform.scaleB + (a.transform.scaleA - a.transform.scaleB) * this.energy,
        a.scale < 1e-4 && (a.scale = 0), a.radius = a.transform.oldRadius * a.scale;
    }, c.Scale = N, c.Util.inherits(O, c.Behaviour), O.prototype.reset = function(a, d, e, f, g) {
        d == null || d == b ? this.same = !0 : this.same = !1, this.a = c.Util.setSpanValue(c.Util.initValue(a, "Velocity")),
        this.b = c.Util.setSpanValue(c.Util.initValue(d, 0)), this.style = c.Util.initValue(e, "to"),
        f && O._super_.prototype.reset.call(this, f, g);
    }, O.prototype.initialize = function(a) {
        a.rotation = this.a.getValue(), a.transform.rotationA = this.a.getValue(), this.same || (a.transform.rotationB = this.b.getValue());
    }, O.prototype.applyBehaviour = function(a, b, c) {
        O._super_.prototype.applyBehaviour.call(this, a, b, c);
        if (!this.same) this.style == "to" || this.style == "TO" || this.style == "_" ? a.rotation += a.transform.rotationB + (a.transform.rotationA - a.transform.rotationB) * this.energy : a.rotation += a.transform.rotationB; else if (this.a.a == "V" || this.a.a == "Velocity" || this.a.a == "v") a.rotation = a.getDirection();
    }, c.Rotate = O, c.Util.inherits(P, c.Behaviour), P.prototype.reset = function(a, b, c, d) {
        this.color1 = this.setSpanValue(a), this.color2 = this.setSpanValue(b), c && P._super_.prototype.reset.call(this, c, d);
    }, P.prototype.initialize = function(a) {
        a.color = this.color1.getValue(), a.transform.beginRGB = c.Util.hexToRGB(a.color),
        this.color2 && (a.transform.endRGB = c.Util.hexToRGB(this.color2.getValue()));
    }, P.prototype.applyBehaviour = function(a, b, c) {
        this.color2 ? (P._super_.prototype.applyBehaviour.call(this, a, b, c), a.transform.rgb.r = a.transform.endRGB.r + (a.transform.beginRGB.r - a.transform.endRGB.r) * this.energy,
        a.transform.rgb.g = a.transform.endRGB.g + (a.transform.beginRGB.g - a.transform.endRGB.g) * this.energy,
        a.transform.rgb.b = a.transform.endRGB.b + (a.transform.beginRGB.b - a.transform.endRGB.b) * this.energy,
        a.transform.rgb.r = parseInt(a.transform.rgb.r, 10), a.transform.rgb.g = parseInt(a.transform.rgb.g, 10),
        a.transform.rgb.b = parseInt(a.transform.rgb.b, 10)) : (a.transform.rgb.r = a.transform.beginRGB.r,
        a.transform.rgb.g = a.transform.beginRGB.g, a.transform.rgb.b = a.transform.beginRGB.b);
    }, P.prototype.setSpanValue = function(a) {
        return a ? a instanceof c.ColorSpan ? a : new c.ColorSpan(a) : null;
    }, c.Color = P, c.Util.inherits(Q, c.Behaviour), Q.prototype.reset = function(a, b, d, e) {
        this.distanceVec = new c.Vector2D(), this.centerPoint = c.Util.initValue(a, new c.Vector2D()),
        this.force = c.Util.initValue(this.normalizeValue(b), 100), d && Q._super_.prototype.reset.call(this, d, e);
    }, Q.prototype.initialize = function(a) {}, Q.prototype.applyBehaviour = function(a, b, c) {
        this.distanceVec.set(this.centerPoint.x - a.p.x, this.centerPoint.y - a.p.y);
        var d = this.distanceVec.lengthSq();
        if (d != 0) {
            var e = this.distanceVec.length(), f = this.force * b / (d * e);
            a.v.x += f * this.distanceVec.x, a.v.y += f * this.distanceVec.y;
        }
    }, c.GravityWell = Q, R.ID = 0, c.Util.inherits(R, c.Particle), c.EventDispatcher.initialize(R.prototype),
    R.prototype.emit = function(a, b) {
        this.emitTime = 0, this.emitTotalTimes = c.Util.initValue(a, Infinity), b == !0 || b == "life" || b == "destroy" ? a == "once" ? this.life = 1 : this.life = this.emitTotalTimes : isNaN(b) || (this.life = b),
        this.rate.init();
    }, R.prototype.stopEmit = function() {
        this.emitTotalTimes = -1, this.emitTime = 0;
    }, R.prototype.removeAllParticles = function() {
        for (var a = 0; a < this.particles.length; a++) this.particles[a].dead = !0;
    }, R.prototype.createParticle = function(a, b) {
        var d = c.pool.get();
        this.setupParticle(d, a, b), this.dispatchEvent(new c.Event({
            type: c.PARTICLE_CREATED,
            particle: d
        }));
        return d;
    }, R.prototype.addSelfInitialize = function(a) {
        a.init ? a.init(this) : this.initAll();
    }, R.prototype.addInitialize = function() {
        var a = arguments.length, b;
        for (b = 0; b < a; b++) this.initializes.push(arguments[b]);
    }, R.prototype.removeInitialize = function(a) {
        var b = this.initializes.indexOf(a);
        b > -1 && this.initializes.splice(b, 1);
    }, R.prototype.removeInitializers = function() {
        c.Util.destroyArray(this.initializes);
    }, R.prototype.addBehaviour = function() {
        var a = arguments.length, b;
        for (b = 0; b < a; b++) this.behaviours.push(arguments[b]), arguments[b].hasOwnProperty("parents") && arguments[b].parents.push(this);
    }, R.prototype.removeBehaviour = function(a) {
        var b = this.behaviours.indexOf(a);
        b > -1 && this.behaviours.splice(b, 1);
    }, R.prototype.removeAllBehaviours = function() {
        c.Util.destroyArray(this.behaviours);
    }, R.prototype.integrate = function(a) {
        var b = 1 - this.damping;
        c.integrator.integrate(this, a, b);
        var d = this.particles.length, e;
        for (e = 0; e < d; e++) {
            var f = this.particles[e];
            f.update(a, e), c.integrator.integrate(f, a, b), this.dispatchEvent(new c.Event({
                type: c.PARTICLE_UPDATE,
                particle: f
            }));
        }
    }, R.prototype.emitting = function(a) {
        if (this.emitTotalTimes == "once") {
            var b = this.rate.getValue(99999), c;
            for (c = 0; c < b; c++) this.createParticle();
            this.emitTotalTimes = "none";
        } else if (!isNaN(this.emitTotalTimes)) {
            this.emitTime += a;
            if (this.emitTime < this.emitTotalTimes) {
                var b = this.rate.getValue(a), c;
                for (c = 0; c < b; c++) this.createParticle();
            }
        }
    }, R.prototype.update = function(a) {
        this.age += a, (this.age >= this.life || this.dead) && this.destroy(), this.emitting(a),
        this.integrate(a);
        var b, d = this.particles.length, e;
        for (e = d - 1; e >= 0; e--) b = this.particles[e], b.dead && (c.pool.set(b), this.particles.splice(e, 1),
        this.dispatchEvent(new c.Event({
            type: c.PARTICLE_DEAD,
            particle: b
        })));
    }, R.prototype.setupParticle = function(a, b, d) {
        var e = this.initializes, f = this.behaviours;
        b && (b instanceof Array ? e = b : e = [ b ]), d && (d instanceof Array ? f = d : f = [ d ]),
        c.InitializeUtil.initialize(this, a, e), a.addBehaviours(f), a.parent = this, this.particles.push(a);
    }, R.prototype.destroy = function() {
        this.dead = !0, this.emitTotalTimes = -1, this.particles.length == 0 && (this.removeInitializers(),
        this.removeAllBehaviours(), this.parent && this.parent.removeEmitter(this));
    }, c.Emitter = R, c.Util.inherits(S, c.Emitter), S.prototype.addSelfBehaviour = function() {
        var a = arguments.length, b;
        for (b = 0; b < a; b++) this.selfBehaviours.push(arguments[b]);
    }, S.prototype.removeSelfBehaviour = function(a) {
        var b = this.selfBehaviours.indexOf(a);
        b > -1 && this.selfBehaviours.splice(b, 1);
    }, S.prototype.update = function(a) {
        S._super_.prototype.update.call(this, a);
        if (!this.sleep) {
            var b = this.selfBehaviours.length, c;
            for (c = 0; c < b; c++) this.selfBehaviours[c].applyBehaviour(this, a, c);
        }
    }, c.BehaviourEmitter = S, c.Util.inherits(T, c.Emitter), T.prototype.initEventHandler = function() {
        var a = this;
        this.mousemoveHandler = function(b) {
            a.mousemove.call(a, b);
        }, this.mousedownHandler = function(b) {
            a.mousedown.call(a, b);
        }, this.mouseupHandler = function(b) {
            a.mouseup.call(a, b);
        }, this.mouseTarget.addEventListener("mousemove", this.mousemoveHandler, !1);
    }, T.prototype.emit = function() {
        this._allowEmitting = !0;
    }, T.prototype.stopEmit = function() {
        this._allowEmitting = !1;
    }, T.prototype.mousemove = function(a) {
        if (a.layerX || a.layerX == 0) this.p.x += (a.layerX - this.p.x) * this.ease, this.p.y += (a.layerY - this.p.y) * this.ease; else if (a.offsetX || a.offsetX == 0) this.p.x += (a.offsetX - this.p.x) * this.ease,
        this.p.y += (a.offsetY - this.p.y) * this.ease;
        this._allowEmitting && T._super_.prototype.emit.call(this, "once");
    }, T.prototype.destroy = function() {
        T._super_.prototype.destroy.call(this), this.mouseTarget.removeEventListener("mousemove", this.mousemoveHandler, !1);
    }, c.FollowEmitter = T;
    var U = U || {
        easeLinear: function(a) {
            return a;
        },
        easeInQuad: function(a) {
            return Math.pow(a, 2);
        },
        easeOutQuad: function(a) {
            return -(Math.pow(a - 1, 2) - 1);
        },
        easeInOutQuad: function(a) {
            if ((a /= .5) < 1) return .5 * Math.pow(a, 2);
            return -.5 * ((a -= 2) * a - 2);
        },
        easeInCubic: function(a) {
            return Math.pow(a, 3);
        },
        easeOutCubic: function(a) {
            return Math.pow(a - 1, 3) + 1;
        },
        easeInOutCubic: function(a) {
            if ((a /= .5) < 1) return .5 * Math.pow(a, 3);
            return .5 * (Math.pow(a - 2, 3) + 2);
        },
        easeInQuart: function(a) {
            return Math.pow(a, 4);
        },
        easeOutQuart: function(a) {
            return -(Math.pow(a - 1, 4) - 1);
        },
        easeInOutQuart: function(a) {
            if ((a /= .5) < 1) return .5 * Math.pow(a, 4);
            return -.5 * ((a -= 2) * Math.pow(a, 3) - 2);
        },
        easeInSine: function(a) {
            return -Math.cos(a * (Math.PI / 2)) + 1;
        },
        easeOutSine: function(a) {
            return Math.sin(a * (Math.PI / 2));
        },
        easeInOutSine: function(a) {
            return -.5 * (Math.cos(Math.PI * a) - 1);
        },
        easeInExpo: function(a) {
            return a === 0 ? 0 : Math.pow(2, 10 * (a - 1));
        },
        easeOutExpo: function(a) {
            return a === 1 ? 1 : -Math.pow(2, -10 * a) + 1;
        },
        easeInOutExpo: function(a) {
            if (a === 0) return 0;
            if (a === 1) return 1;
            if ((a /= .5) < 1) return .5 * Math.pow(2, 10 * (a - 1));
            return .5 * (-Math.pow(2, -10 * --a) + 2);
        },
        easeInCirc: function(a) {
            return -(Math.sqrt(1 - a * a) - 1);
        },
        easeOutCirc: function(a) {
            return Math.sqrt(1 - Math.pow(a - 1, 2));
        },
        easeInOutCirc: function(a) {
            if ((a /= .5) < 1) return -.5 * (Math.sqrt(1 - a * a) - 1);
            return .5 * (Math.sqrt(1 - (a -= 2) * a) + 1);
        },
        easeInBack: function(a) {
            var b = 1.70158;
            return a * a * ((b + 1) * a - b);
        },
        easeOutBack: function(a) {
            var b = 1.70158;
            return (a = a - 1) * a * ((b + 1) * a + b) + 1;
        },
        easeInOutBack: function(a) {
            var b = 1.70158;
            if ((a /= .5) < 1) return .5 * a * a * (((b *= 1.525) + 1) * a - b);
            return .5 * ((a -= 2) * a * (((b *= 1.525) + 1) * a + b) + 2);
        },
        setEasingByName: function(a) {
            switch (a) {
              case "easeLinear":
                return c.ease.easeLinear;

              case "easeInQuad":
                return c.ease.easeInQuad;

              case "easeOutQuad":
                return c.ease.easeOutQuad;

              case "easeInOutQuad":
                return c.ease.easeInOutQuad;

              case "easeInCubic":
                return c.ease.easeInCubic;

              case "easeOutCubic":
                return c.ease.easeOutCubic;

              case "easeInOutCubic":
                return c.ease.easeInOutCubic;

              case "easeInQuart":
                return c.ease.easeInQuart;

              case "easeOutQuart":
                return c.ease.easeOutQuart;

              case "easeInOutQuart":
                return c.ease.easeInOutQuart;

              case "easeInSine":
                return c.ease.easeInSine;

              case "easeOutSine":
                return c.ease.easeOutSine;

              case "easeInOutSine":
                return c.ease.easeInOutSine;

              case "easeInExpo":
                return c.ease.easeInExpo;

              case "easeOutExpo":
                return c.ease.easeOutExpo;

              case "easeInOutExpo":
                return c.ease.easeInOutExpo;

              case "easeInCirc":
                return c.ease.easeInCirc;

              case "easeOutCirc":
                return c.ease.easeOutCirc;

              case "easeInOutCirc":
                return c.ease.easeInOutCirc;

              case "easeInBack":
                return c.ease.easeInBack;

              case "easeOutBack":
                return c.ease.easeOutBack;

              case "easeInOutBack":
                return c.ease.easeInOutBack;

              default:
                return c.ease.easeLinear;
            }
        }
    };
    c.ease = U, c.easeLinear = "easeLinear", c.easeInQuad = "easeInQuad", c.easeOutQuad = "easeOutQuad",
    c.easeInOutQuad = "easeInOutQuad", c.easeInCubic = "easeInCubic", c.easeOutCubic = "easeOutCubic",
    c.easeInOutCubic = "easeInOutCubic", c.easeInQuart = "easeInQuart", c.easeOutQuart = "easeOutQuart",
    c.easeInOutQuart = "easeInOutQuart", c.easeInSine = "easeInSine", c.easeOutSine = "easeOutSine",
    c.easeInOutSine = "easeInOutSine", c.easeInExpo = "easeInExpo", c.easeOutExpo = "easeOutExpo",
    c.easeInOutExpo = "easeInOutExpo", c.easeInCirc = "easeInCirc", c.easeOutCirc = "easeOutCirc",
    c.easeInOutCirc = "easeInOutCirc", c.easeInBack = "easeInBack", c.easeOutBack = "easeOutBack",
    c.easeInOutBack = "easeInOutBack", V.prototype = {
        start: function() {
            this.addEventHandler(), this.renderer.start();
        },
        stop: function() {
            this.renderer.stop();
        },
        resize: function(a, b) {
            this.renderer.resize(a, b);
        },
        setStroke: function(a, b) {
            this.renderer.hasOwnProperty("stroke") ? this.renderer.setStroke(a, b) : alert("Sorry this renderer do not suppest stroke method!");
        },
        createImageData: function(a) {
            this.renderer instanceof c.PixelRender && this.renderer.createImageData(a);
        },
        setMaxRadius: function(a) {
            this.renderer instanceof c.WebGLRender && this.renderer.setMaxRadius(a);
        },
        blendEquation: function(a) {
            this.renderer instanceof c.WebGLRender && this.renderer.blendEquation(a);
        },
        blendFunc: function(a, b) {
            this.renderer instanceof c.WebGLRender && this.renderer.blendFunc(a, b);
        },
        setType: function(a) {
            this.type = a, this.renderer = this.getRenderer();
        },
        getRenderer: function() {
            switch (this.type) {
              case "dom":
                return new c.DomRender(this.proton, this.element);

              case "canvas":
                return new c.CanvasRender(this.proton, this.element);

              case "webgl":
                return new c.WebGLRender(this.proton, this.element);

              case "easel":
                return new c.EaselRender(this.proton, this.element);

              case "easeljs":
                return new c.EaselRender(this.proton, this.element);

              case "pixel":
                return new c.PixelRender(this.proton, this.element);

              default:
                return new c.BaseRender(this.proton, this.element);
            }
        },
        render: function(a) {
            this.renderer.render(a);
        },
        addEventHandler: function() {
            this.onProtonUpdate && (this.renderer.onProtonUpdate = this.onProtonUpdate), this.onParticleCreated && (this.renderer.onParticleCreated = this.onParticleCreated),
            this.onParticleUpdate && (this.renderer.onParticleUpdate = this.onParticleUpdate),
            this.onParticleDead && (this.renderer.onParticleDead = this.onParticleDead);
        }
    }, c.Renderer = V, W.prototype = {
        start: function() {
            var a = this;
            this.proton.addEventListener(c.PROTON_UPDATE, function(b) {
                a.onProtonUpdate.call(a);
            }), this.proton.addEventListener(c.PROTON_UPDATE_AFTER, function(b) {
                a.onProtonUpdateAfter.call(a);
            }), this.proton.addEventListener(c.EMITTER_ADDED, function(b) {
                a.onEmitterAdded.call(a, b.emitter);
            }), this.proton.addEventListener(c.EMITTER_REMOVED, function(b) {
                a.onEmitterRemoved.call(a, b.emitter);
            });
            var b = this.proton.emitters.length, d;
            for (d = 0; d < b; d++) {
                var e = this.proton.emitters[d];
                this.addEmitterListener(e);
            }
        },
        resize: function(a, b) {},
        addEmitterListener: function(a) {
            var b = this;
            a.addEventListener(c.PARTICLE_CREATED, function(a) {
                b.onParticleCreated.call(b, a.particle);
            }), a.addEventListener(c.PARTICLE_UPDATE, function(a) {
                b.onParticleUpdate.call(b, a.particle);
            }), a.addEventListener(c.PARTICLE_DEAD, function(a) {
                b.onParticleDead.call(b, a.particle);
            });
        },
        stop: function() {
            var a = this.proton.emitters.length, b;
            this.proton.removeAllEventListeners();
            for (b = 0; b < a; b++) {
                var c = this.proton.emitters[b];
                c.removeAllEventListeners();
            }
        },
        onEmitterAdded: function(a) {
            this.addEmitterListener(a);
        },
        onEmitterRemoved: function(a) {
            a.removeAllEventListeners();
        },
        onProtonUpdate: function() {},
        onProtonUpdateAfter: function() {},
        onParticleCreated: function(a) {},
        onParticleUpdate: function(a) {},
        onParticleDead: function(a) {}
    }, c.BaseRender = W, c.Util.inherits(X, c.BaseRender), X.prototype.start = function() {
        X._super_.prototype.start.call(this);
    }, X.prototype.setStroke = function(a, b) {
        a = c.Util.initValue(a, "#000000"), b = c.Util.initValue(b, 1), this.stroke = {
            color: a,
            thinkness: b
        };
    }, X.prototype.onProtonUpdate = function() {}, X.prototype.onParticleCreated = function(a) {
        if (a.target) {
            var b = this;
            c.Util.getImage(a.target, a, !1, function(a) {
                b.setImgInDIV.call(b, a);
            });
        } else a.transform.canvas = c.DomUtil.createCanvas(a.id + "_canvas", a.radius + 1, a.radius + 1, "absolute"),
        a.transform.bakOldRadius = a.radius, this.stroke ? (a.transform.canvas.width = 2 * a.radius + this.stroke.thinkness * 2,
        a.transform.canvas.height = 2 * a.radius + this.stroke.thinkness * 2) : (a.transform.canvas.width = 2 * a.radius + 1,
        a.transform.canvas.height = 2 * a.radius + 1), a.transform.context = a.transform.canvas.getContext("2d"),
        a.transform.context.fillStyle = a.color, a.transform.context.beginPath(), a.transform.context.arc(a.radius, a.radius, a.radius, 0, Math.PI * 2, !0),
        this.stroke && (a.transform.context.strokeStyle = this.stroke.color, a.transform.context.lineWidth = this.stroke.thinkness,
        a.transform.context.stroke()), a.transform.context.closePath(), a.transform.context.fill(),
        this.element.appendChild(a.transform.canvas);
    }, X.prototype.onParticleUpdate = function(a) {
        a.target ? a.target instanceof Image && (a.transform.canvas.style.opacity = a.alpha,
        c.DomUtil.transformDom(a.transform.canvas, a.p.x - a.target.width / 2, a.p.y - a.target.height / 2, a.scale, a.rotation)) : (a.transform.canvas.style.opacity = a.alpha,
        a.transform.oldRadius ? c.DomUtil.transformDom(a.transform.canvas, a.p.x - a.transform.oldRadius, a.p.y - a.transform.oldRadius, a.scale, a.rotation) : c.DomUtil.transformDom(a.transform.canvas, a.p.x - a.transform.bakOldRadius, a.p.y - a.transform.bakOldRadius, a.scale, a.rotation));
    }, X.prototype.onParticleDead = function(a) {
        a.transform.canvas && this.element.removeChild(a.transform.canvas);
    }, X.prototype.setImgInDIV = function(a) {
        a.transform.canvas = c.DomUtil.createCanvas(a.id + "_canvas", a.target.width + 1, a.target.height + 1, "absolute", a.p.x - a.radius, a.p.y - a.radius),
        a.transform.context = a.transform.canvas.getContext("2d"), a.transform.context.drawImage(a.target, 0, 0, a.target.width, a.target.height),
        this.element.appendChild(a.transform.canvas);
    }, c.DomRender = X, c.Util.inherits(Y, c.BaseRender), Y.prototype.resize = function(a, b) {},
    Y.prototype.start = function() {
        Y._super_.prototype.start.call(this);
    }, Y.prototype.onProtonUpdate = function() {}, Y.prototype.onParticleCreated = function(a) {
        if (a.target) a.target = a.target.clone(), a.target.parent || (!a.target.image || (a.target.regX = a.target.image.width / 2,
        a.target.regY = a.target.image.height / 2), this.element.addChild(a.target)); else {
            var b = new createjs.Graphics();
            this.stroke && (this.stroke == !0 ? b.beginStroke("#000000") : this.stroke instanceof String && b.beginStroke(this.stroke)),
            b.beginFill(a.color).drawCircle(0, 0, a.radius);
            var c = new createjs.Shape(b);
            a.target = c, this.element.addChild(a.target);
        }
    }, Y.prototype.onParticleUpdate = function(a) {
        a.target && (a.target.x = a.p.x, a.target.y = a.p.y, a.target.alpha = a.alpha, a.target.scaleX = a.target.scaleY = a.scale,
        a.target.rotation = a.rotation);
    }, Y.prototype.onParticleDead = function(a) {
        a.target && a.target.parent && a.target.parent.removeChild(a.target);
    }, c.EaselRender = Y, c.Util.inherits(Z, c.BaseRender), Z.prototype.resize = function(a, b) {
        this.element.width = a, this.element.height = b;
    }, Z.prototype.start = function() {
        Z._super_.prototype.start.call(this);
    }, Z.prototype.setStroke = function(a, b) {
        a = c.Util.initValue(a, "#000000"), b = c.Util.initValue(b, 1), this.stroke = {
            color: a,
            thinkness: b
        };
    }, Z.prototype.onProtonUpdate = function() {
        this.context.clearRect(0, 0, this.element.width, this.element.height);
    }, Z.prototype.onParticleCreated = function(a) {
        a.target ? c.Util.getImage(a.target, a, !1) : a.color = a.color ? a.color : "#ff0000";
    }, Z.prototype.onParticleUpdate = function(a) {
        if (a.target) {
            if (a.target instanceof Image) {
                var b = a.target.width * a.scale | 0, d = a.target.height * a.scale | 0, e = a.p.x - b / 2, f = a.p.y - d / 2;
                if (!a.color) this.context.save(), this.context.globalAlpha = a.alpha, this.context.translate(a.p.x, a.p.y),
                this.context.rotate(c.MathUtils.degreeTransform(a.rotation)), this.context.translate(-a.p.x, -a.p.y),
                this.context.drawImage(a.target, 0, 0, a.target.width, a.target.height, e, f, b, d),
                this.context.globalAlpha = 1, this.context.restore(); else {
                    a.transform.buffer || (a.transform.buffer = this.getBuffer(a.target));
                    var g = a.transform.buffer.getContext("2d");
                    g.clearRect(0, 0, a.transform.buffer.width, a.transform.buffer.height), g.globalAlpha = a.alpha,
                    g.drawImage(a.target, 0, 0), g.globalCompositeOperation = "source-atop", g.fillStyle = c.Util.rgbToHex(a.transform.rgb),
                    g.fillRect(0, 0, a.transform.buffer.width, a.transform.buffer.height), g.globalCompositeOperation = "source-over",
                    g.globalAlpha = 1, this.context.drawImage(a.transform.buffer, 0, 0, a.transform.buffer.width, a.transform.buffer.height, e, f, b, d);
                }
            }
        } else a.transform.rgb ? this.context.fillStyle = "rgba(" + a.transform.rgb.r + "," + a.transform.rgb.g + "," + a.transform.rgb.b + "," + a.alpha + ")" : this.context.fillStyle = a.color,
        this.context.beginPath(), this.context.arc(a.p.x, a.p.y, a.radius, 0, Math.PI * 2, !0),
        this.stroke && (this.context.strokeStyle = this.stroke.color, this.context.lineWidth = this.stroke.thinkness,
        this.context.stroke()), this.context.closePath(), this.context.fill();
    }, Z.prototype.onParticleDead = function(a) {}, Z.prototype.getBuffer = function(a) {
        if (a instanceof Image) {
            var b = a.width + "_" + a.height, c = this.bufferCache[b];
            c || (c = document.createElement("canvas"), c.width = a.width, c.height = a.height,
            this.bufferCache[b] = c);
            return c;
        }
    }, c.CanvasRender = Z, c.Util.inherits($, c.BaseRender), $.prototype.resize = function(a, b) {
        this.element.width = a, this.element.height = b;
    }, $.prototype.createImageData = function(a) {
        a ? this.rectangle = a : this.rectangle = new c.Rectangle(0, 0, this.element.width, this.element.height),
        this.imageData = this.context.createImageData(this.rectangle.width, this.rectangle.height),
        this.context.putImageData(this.imageData, this.rectangle.x, this.rectangle.y);
    }, $.prototype.start = function() {
        $._super_.prototype.start.call(this);
    }, $.prototype.onProtonUpdate = function() {
        this.context.clearRect(this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height),
        this.imageData = this.context.getImageData(this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);
    }, $.prototype.onProtonUpdateAfter = function() {
        this.context.putImageData(this.imageData, this.rectangle.x, this.rectangle.y);
    }, $.prototype.onParticleCreated = function(a) {}, $.prototype.onParticleUpdate = function(a) {
        this.imageData && this.setPixel(this.imageData, Math.floor(a.p.x - this.rectangle.x), Math.floor(a.p.y - this.rectangle.y), a);
    }, $.prototype.setPixel = function(a, b, c, d) {
        var e = d.transform.rgb;
        if (!(b < 0 || b > this.element.width || c < 0 || c > this.elementwidth)) {
            var f = ((c >> 0) * a.width + (b >> 0)) * 4;
            a.data[f] = e.r, a.data[f + 1] = e.g, a.data[f + 2] = e.b, a.data[f + 3] = d.alpha * 255;
        }
    }, $.prototype.onParticleDead = function(a) {}, c.PixelRender = $, c.Util.inherits(_, c.BaseRender),
    _.prototype.resize = function(a, b) {
        this.umat[4] = -2, this.umat[7] = 1, this.smat[0] = 1 / a, this.smat[4] = 1 / b,
        this.mstack.set(this.umat, 0), this.mstack.set(this.smat, 1), this.gl.viewport(0, 0, a, b),
        this.element.width = a, this.element.height = b;
    }, _.prototype.setMaxRadius = function(a) {
        this.circleCanvasURL = this.createCircle(a);
    }, _.prototype.getVertexShader = function() {
        var a = [ "uniform vec2 viewport;", "attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "uniform mat3 tMat;", "varying vec2 vTextureCoord;", "varying float alpha;", "void main() {", "vec3 v = tMat * vec3(aVertexPosition, 1.0);", "gl_Position = vec4(v.x, v.y, 0, 1);", "vTextureCoord = aTextureCoord;", "alpha = tMat[0][2];", "}" ].join("\n");
        return a;
    }, _.prototype.getFragmentShader = function() {
        var a = [ "precision mediump float;", "varying vec2 vTextureCoord;", "varying float alpha;", "uniform sampler2D uSampler;", "uniform vec4 color;", "uniform bool useTexture;", "uniform vec3 uColor;", "void main() {", "vec4 textureColor = texture2D(uSampler, vTextureCoord);", "gl_FragColor = textureColor * vec4(uColor, 1.0);", "gl_FragColor.w *= alpha;", "}" ].join("\n");
        return a;
    }, _.prototype.initVar = function() {
        this.mstack = new c.MStack(), this.umat = c.Mat3.create([ 2, 0, 1, 0, -2, 0, -1, 1, 1 ]),
        this.smat = c.Mat3.create([ .01, 0, 1, 0, .01, 0, 0, 0, 1 ]), this.texturebuffers = {};
    }, _.prototype.start = function() {
        _._super_.prototype.start.call(this), this.resize(this.element.width, this.element.height);
    }, _.prototype.blendEquation = function(a) {
        this.gl.blendEquation(this.gl[a]);
    }, _.prototype.blendFunc = function(a, b) {
        this.gl.blendFunc(this.gl[a], this.gl[b]);
    }, _.prototype.getShader = function(a, b, c) {
        var d;
        c ? d = a.createShader(a.FRAGMENT_SHADER) : d = a.createShader(a.VERTEX_SHADER),
        a.shaderSource(d, b), a.compileShader(d);
        if (!a.getShaderParameter(d, a.COMPILE_STATUS)) {
            alert(a.getShaderInfoLog(d));
            return null;
        }
        return d;
    }, _.prototype.initShaders = function() {
        var a = this.getShader(this.gl, this.getFragmentShader(), !0), b = this.getShader(this.gl, this.getVertexShader(), !1);
        this.sprogram = this.gl.createProgram(), this.gl.attachShader(this.sprogram, b),
        this.gl.attachShader(this.sprogram, a), this.gl.linkProgram(this.sprogram), this.gl.getProgramParameter(this.sprogram, this.gl.LINK_STATUS) || alert("Could not initialise shaders"),
        this.gl.useProgram(this.sprogram), this.sprogram.vpa = this.gl.getAttribLocation(this.sprogram, "aVertexPosition"),
        this.sprogram.tca = this.gl.getAttribLocation(this.sprogram, "aTextureCoord"), this.gl.enableVertexAttribArray(this.sprogram.tca),
        this.gl.enableVertexAttribArray(this.sprogram.vpa), this.sprogram.tMatUniform = this.gl.getUniformLocation(this.sprogram, "tMat"),
        this.sprogram.samplerUniform = this.gl.getUniformLocation(this.sprogram, "uSampler"),
        this.sprogram.useTex = this.gl.getUniformLocation(this.sprogram, "useTexture"),
        this.sprogram.color = this.gl.getUniformLocation(this.sprogram, "uColor"), this.gl.uniform1i(this.sprogram.useTex, 1);
    }, _.prototype.initBuffers = function() {
        this.unitIBuffer = this.gl.createBuffer(), this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.unitIBuffer);
        var a = [ 0, 3, 1, 0, 2, 3 ];
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(a), this.gl.STATIC_DRAW);
        var b = [];
        for (var c = 0; c < 100; c++) b.push(c);
        idx = new Uint16Array(b), this.unitI33 = this.gl.createBuffer(), this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.unitI33),
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, idx, this.gl.STATIC_DRAW), b = [];
        for (c = 0; c < 100; c++) b.push(c, c + 1, c + 2);
        idx = new Uint16Array(b), this.stripBuffer = this.gl.createBuffer(), this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.stripBuffer),
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, idx, this.gl.STATIC_DRAW);
    }, _.prototype.createCircle = function(a) {
        this.circleCanvasRadius = c.WebGLUtil.nhpot(c.Util.initValue(a, 32));
        var b = c.DomUtil.createCanvas("circle_canvas", this.circleCanvasRadius * 2, this.circleCanvasRadius * 2), d = b.getContext("2d");
        d.beginPath(), d.arc(this.circleCanvasRadius, this.circleCanvasRadius, this.circleCanvasRadius, 0, Math.PI * 2, !0),
        d.closePath(), d.fillStyle = "#FFF", d.fill();
        return b.toDataURL();
    }, _.prototype.setImgInCanvas = function(a) {
        var b = a.target.width, d = a.target.height, e = c.WebGLUtil.nhpot(a.target.width), f = c.WebGLUtil.nhpot(a.target.height), g = a.target.width / e, h = a.target.height / f;
        this.texturebuffers[a.transform.src] || (this.texturebuffers[a.transform.src] = [ this.gl.createTexture(), this.gl.createBuffer(), this.gl.createBuffer() ]),
        a.transform.texture = this.texturebuffers[a.transform.src][0], a.transform.vcBuffer = this.texturebuffers[a.transform.src][1],
        a.transform.tcBuffer = this.texturebuffers[a.transform.src][2], this.gl.bindBuffer(this.gl.ARRAY_BUFFER, a.transform.tcBuffer),
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([ 0, 0, g, 0, 0, h, h, h ]), this.gl.STATIC_DRAW),
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, a.transform.vcBuffer), this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([ 0, 0, b, 0, 0, d, b, d ]), this.gl.STATIC_DRAW);
        var i = a.transform.canvas.getContext("2d"), j = i.getImageData(0, 0, e, f);
        this.gl.bindTexture(this.gl.TEXTURE_2D, a.transform.texture), this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, j),
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR),
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_NEAREST),
        this.gl.generateMipmap(this.gl.TEXTURE_2D), a.transform.textureLoaded = !0, a.transform.textureWidth = b,
        a.transform.textureHeight = d;
    }, _.prototype.setStroke = function(a, b) {}, _.prototype.onProtonUpdate = function() {},
    _.prototype.onParticleCreated = function(a) {
        var b = this;
        a.transform.textureLoaded = !1, a.transform.tmat = c.Mat3.create(), a.transform.tmat[8] = 1,
        a.transform.imat = c.Mat3.create(), a.transform.imat[8] = 1, a.target ? c.Util.getImage(a.target, a, !0, function(a) {
            b.setImgInCanvas.call(b, a), a.transform.oldScale = 1;
        }) : c.Util.getImage(this.circleCanvasURL, a, !0, function(a) {
            b.setImgInCanvas.call(b, a), a.transform.oldScale = a.radius / b.circleCanvasRadius;
        });
    }, _.prototype.onParticleUpdate = function(a) {
        a.transform.textureLoaded && (this.updateMatrix(a), this.gl.uniform3f(this.sprogram.color, a.transform.rgb.r / 255, a.transform.rgb.g / 255, a.transform.rgb.b / 255),
        this.gl.uniformMatrix3fv(this.sprogram.tMatUniform, !1, this.mstack.top()), this.gl.bindBuffer(this.gl.ARRAY_BUFFER, a.transform.vcBuffer),
        this.gl.vertexAttribPointer(this.sprogram.vpa, 2, this.gl.FLOAT, !1, 0, 0), this.gl.bindBuffer(this.gl.ARRAY_BUFFER, a.transform.tcBuffer),
        this.gl.vertexAttribPointer(this.sprogram.tca, 2, this.gl.FLOAT, !1, 0, 0), this.gl.bindTexture(this.gl.TEXTURE_2D, a.transform.texture),
        this.gl.uniform1i(this.sprogram.samplerUniform, 0), this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.unitIBuffer),
        this.gl.drawElements(this.gl.TRIANGLES, 6, this.gl.UNSIGNED_SHORT, 0), this.mstack.pop());
    }, _.prototype.onParticleDead = function(a) {}, _.prototype.updateMatrix = function(a) {
        var b = c.WebGLUtil.makeTranslation(-a.transform.textureWidth / 2, -a.transform.textureHeight / 2), d = c.WebGLUtil.makeTranslation(a.p.x, a.p.y), e = a.rotation * (Math.PI / 180), f = c.WebGLUtil.makeRotation(e), g = a.scale * a.transform.oldScale, h = c.WebGLUtil.makeScale(g, g), i = c.WebGLUtil.matrixMultiply(b, h);
        i = c.WebGLUtil.matrixMultiply(i, f), i = c.WebGLUtil.matrixMultiply(i, d), c.Mat3.inverse(i, a.transform.imat),
        i[2] = a.alpha, this.mstack.push(i);
    }, c.WebGLRender = _, ba.prototype = {
        getPosition: function() {},
        crossing: function(a) {}
    }, c.Zone = ba, c.Util.inherits(bb, c.Zone), bb.prototype.getPosition = function() {
        this.random = Math.random(), this.vector.x = this.x1 + this.random * this.length * Math.cos(this.gradient),
        this.vector.y = this.y1 + this.random * this.length * Math.sin(this.gradient);
        return this.vector;
    }, bb.prototype.getDirection = function(a, b) {
        var c = this.dy, d = -this.dx, e = this.dot, f = d == 0 ? 1 : d;
        return (c * a + d * b + e) * f > 0 ? !0 : !1;
    }, bb.prototype.getDistance = function(a, b) {
        var c = this.dy, d = -this.dx, e = this.dot, f = c * a + d * b + e;
        return f / Math.sqrt(this.xxyy);
    }, bb.prototype.getSymmetric = function(a) {
        var b = a.getGradient(), c = this.getGradient(), d = 2 * (c - b), e = a.x, f = a.y;
        a.x = e * Math.cos(d) - f * Math.sin(d), a.y = e * Math.sin(d) + f * Math.cos(d);
        return a;
    }, bb.prototype.getGradient = function() {
        return Math.atan2(this.dy, this.dx);
    }, bb.prototype.getRange = function(a, b) {
        var c = Math.abs(this.getGradient());
        c <= Math.PI / 4 ? a.p.x < this.maxx && a.p.x > this.minx && b() : a.p.y < this.maxy && a.p.y > this.miny && b();
    }, bb.prototype.getLength = function() {
        return Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    }, bb.prototype.crossing = function(a) {
        var b = this;
        this.crossType == "dead" ? this.direction == ">" || this.direction == "R" || this.direction == "right" || this.direction == "down" ? this.getRange(a, function() {
            b.getDirection(a.p.x, a.p.y) && (a.dead = !0);
        }) : this.getRange(a, function() {
            b.getDirection(a.p.x, a.p.y) || (a.dead = !0);
        }) : this.crossType == "bound" ? this.getRange(a, function() {
            b.getDistance(a.p.x, a.p.y) <= a.radius && (b.dx == 0 ? a.v.x *= -1 : b.dy == 0 ? a.v.y *= -1 : b.getSymmetric(a.v));
        }) : this.crossType == "cross" && this.alert && (alert("Sorry lineZone does not support cross method"),
        this.alert = !1);
    }, c.LineZone = bb, c.Util.inherits(bc, c.Zone), bc.prototype.getPosition = function() {
        this.random = Math.random(), this.angle = Math.PI * 2 * Math.random(), this.vector.x = this.x + this.random * this.radius * Math.cos(this.angle),
        this.vector.y = this.y + this.random * this.radius * Math.sin(this.angle);
        return this.vector;
    }, bc.prototype.setCenter = function(a, b) {
        this.center.x = a, this.center.y = b;
    }, bc.prototype.crossing = function(a) {
        var b = a.p.distanceTo(this.center);
        this.crossType == "dead" ? b - a.radius > this.radius && (a.dead = !0) : this.crossType == "bound" ? b + a.radius >= this.radius && this.getSymmetric(a) : this.crossType == "cross" && this.alert && (alert("Sorry CircleZone does not support cross method"),
        this.alert = !1);
    }, bc.prototype.getSymmetric = function(a) {
        var b = a.v.getGradient(), c = this.getGradient(a), d = 2 * (c - b), e = a.v.x, f = a.v.y;
        a.v.x = e * Math.cos(d) - f * Math.sin(d), a.v.y = e * Math.sin(d) + f * Math.cos(d);
    }, bc.prototype.getGradient = function(a) {
        return -Math.PI / 2 + Math.atan2(a.p.y - this.center.y, a.p.x - this.center.x);
    }, c.CircleZone = bc, c.Util.inherits(bd, c.Zone), bd.prototype.getPosition = function() {
        this.vector.x = this.x, this.vector.y = this.y;
        return this.vector;
    }, bd.prototype.crossing = function(a) {
        this.alert && (alert("Sorry PointZone does not support crossing method"), this.alert = !1);
    }, c.PointZone = bd, c.Util.inherits(be, c.Zone), be.prototype.getPosition = function() {
        this.vector.x = this.x + Math.random() * this.width, this.vector.y = this.y + Math.random() * this.height;
        return this.vector;
    }, be.prototype.crossing = function(a) {
        this.crossType == "dead" ? (a.p.x + a.radius < this.x ? a.dead = !0 : a.p.x - a.radius > this.x + this.width && (a.dead = !0),
        a.p.y + a.radius < this.y ? a.dead = !0 : a.p.y - a.radius > this.y + this.height && (a.dead = !0)) : this.crossType == "bound" ? (a.p.x - a.radius < this.x ? (a.p.x = this.x + a.radius,
        a.v.x *= -1) : a.p.x + a.radius > this.x + this.width && (a.p.x = this.x + this.width - a.radius,
        a.v.x *= -1), a.p.y - a.radius < this.y ? (a.p.y = this.y + a.radius, a.v.y *= -1) : a.p.y + a.radius > this.y + this.height && (a.p.y = this.y + this.height - a.radius,
        a.v.y *= -1)) : this.crossType == "cross" && (a.p.x + a.radius < this.x && a.v.x <= 0 ? a.p.x = this.x + this.width + a.radius : a.p.x - a.radius > this.x + this.width && a.v.x >= 0 && (a.p.x = this.x - a.radius),
        a.p.y + a.radius < this.y && a.v.y <= 0 ? a.p.y = this.y + this.height + a.radius : a.p.y - a.radius > this.y + this.height && a.v.y >= 0 && (a.p.y = this.y - a.radius));
    }, c.RectZone = be, c.Util.inherits(bf, c.Zone), bf.prototype.reset = function(a, b, d, e) {
        this.imageData = a, this.x = c.Util.initValue(b, 0), this.y = c.Util.initValue(d, 0),
        this.d = c.Util.initValue(e, 2), this.vectors = [], this.setVectors();
    }, bf.prototype.setVectors = function() {
        var a, b, c = this.imageData.width, d = this.imageData.height;
        for (a = 0; a < c; a += this.d) for (b = 0; b < d; b += this.d) {
            var e = ((b >> 0) * c + (a >> 0)) * 4;
            this.imageData.data[e + 3] > 0 && this.vectors.push({
                x: a + this.x,
                y: b + this.y
            });
        }
        return this.vector;
    }, bf.prototype.getBound = function(a, b) {
        var c = ((b >> 0) * this.imageData.width + (a >> 0)) * 4;
        return this.imageData.data[c + 3] > 0 ? !0 : !1;
    }, bf.prototype.getPosition = function() {
        return this.vector.copy(this.vectors[Math.floor(Math.random() * this.vectors.length)]);
    }, bf.prototype.getColor = function(a, b) {
        a -= this.x, b -= this.y;
        var c = ((b >> 0) * this.imageData.width + (a >> 0)) * 4;
        return {
            r: this.imageData.data[c],
            g: this.imageData.data[c + 1],
            b: this.imageData.data[c + 2],
            a: this.imageData.data[c + 3]
        };
    }, bf.prototype.crossing = function(a) {
        this.crossType == "dead" ? this.getBound(a.p.x - this.x, a.p.y - this.y) ? a.dead = !0 : a.dead = !1 : this.crossType == "bound" && (this.getBound(a.p.x - this.x, a.p.y - this.y) || a.v.negate());
    }, c.ImageZone = bf;
    var bg = function() {
        if (a.console && a.console.log) {
            var b = arguments;
            if (typeof arguments[0] == "string") if (arguments[0].indexOf("+") == 0) {
                var c = parseInt(arguments[0]);
                bg.once < c && (delete b[0], console.log(b), bg.once++);
            } else console.log(b); else console.log(b);
        }
    };
    bg.once = 0, c.log = bg;
    var bh = bh || {
        addEventListener: function(a, b) {
            a.addEventListener(c.PROTON_UPDATE, function(a) {
                b();
            });
        },
        setStyle: function(a) {
            var b = a || "#ff0000", d = c.Util.hexToRGB(b), e = "rgba(" + d.r + "," + d.g + "," + d.b + "," + .5 + ")";
            return e;
        },
        drawZone: function(a, b, d, e) {
            var f = b.getContext("2d"), g = this.setStyle();
            this.addEventListener(a, function() {
                e && f.clearRect(0, 0, b.width, b.height), d instanceof c.PointZone ? (f.beginPath(),
                f.fillStyle = g, f.arc(d.x, d.y, 10, 0, Math.PI * 2, !0), f.fill(), f.closePath()) : d instanceof c.LineZone ? (f.beginPath(),
                f.strokeStyle = g, f.moveTo(d.x1, d.y1), f.lineTo(d.x2, d.y2), f.stroke(), f.closePath()) : d instanceof c.RectZone ? (f.beginPath(),
                f.strokeStyle = g, f.drawRect(d.x, d.y, d.width, d.height), f.stroke(), f.closePath()) : d instanceof c.CircleZone && (f.beginPath(),
                f.strokeStyle = g, f.arc(d.x, d.y, d.radius, 0, Math.PI * 2, !0), f.stroke(), f.closePath());
            });
        },
        drawEmitter: function(a, b, c, d) {
            var e = b.getContext("2d"), f = this.setStyle();
            this.addEventListener(a, function() {
                d && e.clearRect(0, 0, b.width, b.height), e.beginPath(), e.fillStyle = f, e.arc(c.p.x, c.p.y, 10, 0, Math.PI * 2, !0),
                e.fill(), e.closePath();
            });
        },
        test: {},
        setTest: function(a, b) {
            this.test[a] = b;
        },
        getTest: function(a) {
            return this.test.hasOwnProperty(a) ? this.test[a] : !1;
        }
    };
    c.Debug = bh;
})(window), function() {
    var a = 0, b = [ "ms", "moz", "webkit", "o" ];
    for (var c = 0; c < b.length && !window.requestAnimationFrame; ++c) window.requestAnimationFrame = window[b[c] + "RequestAnimationFrame"],
    window.cancelAnimationFrame = window[b[c] + "CancelAnimationFrame"] || window[b[c] + "CancelRequestAnimationFrame"];
    window.requestAnimationFrame || (window.requestAnimationFrame = function(b, c) {
        var d = new Date().getTime(), e = Math.max(0, 16 - (d - a)), f = window.setTimeout(function() {
            b(d + e);
        }, e);
        a = d + e;
        return f;
    }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(a) {
        clearTimeout(a);
    });
}();

(function() {
    var cache = {};
    var ctx = null, usingWebAudio = true, noAudio = false;
    try {
        if (typeof AudioContext !== "undefined") {
            ctx = new AudioContext();
        } else if (typeof webkitAudioContext !== "undefined") {
            ctx = new webkitAudioContext();
        } else {
            usingWebAudio = false;
        }
    } catch (e) {
        usingWebAudio = false;
    }
    if (!usingWebAudio) {
        if (typeof Audio !== "undefined") {
            try {
                new Audio();
            } catch (e) {
                noAudio = true;
            }
        } else {
            noAudio = true;
        }
    }
    if (usingWebAudio) {
        var masterGain = typeof ctx.createGain === "undefined" ? ctx.createGainNode() : ctx.createGain();
        masterGain.gain.value = 1;
        masterGain.connect(ctx.destination);
    }
    var HowlerGlobal = function(codecs) {
        this._volume = 1;
        this._muted = false;
        this.usingWebAudio = usingWebAudio;
        this.ctx = ctx;
        this.noAudio = noAudio;
        this._howls = [];
        this._codecs = codecs;
        this.iOSAutoEnable = true;
    };
    HowlerGlobal.prototype = {
        volume: function(vol) {
            var self = this;
            vol = parseFloat(vol);
            if (vol >= 0 && vol <= 1) {
                self._volume = vol;
                if (usingWebAudio) {
                    masterGain.gain.value = vol;
                }
                for (var key in self._howls) {
                    if (self._howls.hasOwnProperty(key) && self._howls[key]._webAudio === false) {
                        for (var i = 0; i < self._howls[key]._audioNode.length; i++) {
                            self._howls[key]._audioNode[i].volume = self._howls[key]._volume * self._volume;
                        }
                    }
                }
                return self;
            }
            return usingWebAudio ? masterGain.gain.value : self._volume;
        },
        mute: function() {
            this._setMuted(true);
            return this;
        },
        unmute: function() {
            this._setMuted(false);
            return this;
        },
        _setMuted: function(muted) {
            var self = this;
            self._muted = muted;
            if (usingWebAudio) {
                masterGain.gain.value = muted ? 0 : self._volume;
            }
            for (var key in self._howls) {
                if (self._howls.hasOwnProperty(key) && self._howls[key]._webAudio === false) {
                    for (var i = 0; i < self._howls[key]._audioNode.length; i++) {
                        self._howls[key]._audioNode[i].muted = muted;
                    }
                }
            }
        },
        codecs: function(ext) {
            return this._codecs[ext];
        },
        _enableiOSAudio: function() {
            var self = this;
            if (ctx && (self._iOSEnabled || !/iPhone|iPad|iPod/i.test(navigator.userAgent))) {
                return;
            }
            self._iOSEnabled = false;
            var unlock = function() {
                var buffer = ctx.createBuffer(1, 1, 22050);
                var source = ctx.createBufferSource();
                source.buffer = buffer;
                source.connect(ctx.destination);
                if (typeof source.start === "undefined") {
                    source.noteOn(0);
                } else {
                    source.start(0);
                }
                setTimeout(function() {
                    if (source.playbackState === source.PLAYING_STATE || source.playbackState === source.FINISHED_STATE) {
                        self._iOSEnabled = true;
                        self.iOSAutoEnable = false;
                        window.removeEventListener("touchstart", unlock, false);
                    }
                }, 0);
            };
            window.addEventListener("touchstart", unlock, false);
            return self;
        }
    };
    var audioTest = null;
    var codecs = {};
    if (!noAudio) {
        audioTest = new Audio();
        codecs = {
            mp3: !!audioTest.canPlayType("audio/mpeg;").replace(/^no$/, ""),
            opus: !!audioTest.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""),
            ogg: !!audioTest.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
            wav: !!audioTest.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""),
            aac: !!audioTest.canPlayType("audio/aac;").replace(/^no$/, ""),
            m4a: !!(audioTest.canPlayType("audio/x-m4a;") || audioTest.canPlayType("audio/m4a;") || audioTest.canPlayType("audio/aac;")).replace(/^no$/, ""),
            mp4: !!(audioTest.canPlayType("audio/x-mp4;") || audioTest.canPlayType("audio/mp4;") || audioTest.canPlayType("audio/aac;")).replace(/^no$/, ""),
            weba: !!audioTest.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")
        };
    }
    var Howler = new HowlerGlobal(codecs);
    var Howl = function(o) {
        var self = this;
        self._autoplay = o.autoplay || false;
        self._buffer = o.buffer || false;
        self._duration = o.duration || 0;
        self._format = o.format || null;
        self._loop = o.loop || false;
        self._loaded = false;
        self._sprite = o.sprite || {};
        self._src = o.src || "";
        self._pos3d = o.pos3d || [ 0, 0, -.5 ];
        self._volume = o.volume !== undefined ? o.volume : 1;
        self._urls = o.urls || [];
        self._rate = o.rate || 1;
        self._model = o.model || null;
        self._onload = [ o.onload || function() {} ];
        self._onloaderror = [ o.onloaderror || function() {} ];
        self._onend = [ o.onend || function() {} ];
        self._onpause = [ o.onpause || function() {} ];
        self._onplay = [ o.onplay || function() {} ];
        self._onendTimer = [];
        self._webAudio = usingWebAudio && !self._buffer;
        self._audioNode = [];
        if (self._webAudio) {
            self._setupAudioNode();
        }
        if (typeof ctx !== "undefined" && ctx && Howler.iOSAutoEnable) {
            Howler._enableiOSAudio();
        }
        Howler._howls.push(self);
        self.load();
    };
    Howl.prototype = {
        load: function() {
            var self = this, url = null;
            if (noAudio) {
                self.on("loaderror");
                return;
            }
            for (var i = 0; i < self._urls.length; i++) {
                var ext, urlItem;
                if (self._format) {
                    ext = self._format;
                } else {
                    urlItem = self._urls[i];
                    ext = /^data:audio\/([^;,]+);/i.exec(urlItem);
                    if (!ext) {
                        ext = /\.([^.]+)$/.exec(urlItem.split("?", 1)[0]);
                    }
                    if (ext) {
                        ext = ext[1].toLowerCase();
                    } else {
                        self.on("loaderror");
                        return;
                    }
                }
                if (codecs[ext]) {
                    url = self._urls[i];
                    break;
                }
            }
            if (!url) {
                self.on("loaderror");
                return;
            }
            self._src = url;
            if (self._webAudio) {
                loadBuffer(self, url);
            } else {
                var newNode = new Audio();
                newNode.addEventListener("error", function() {
                    if (newNode.error && newNode.error.code === 4) {
                        HowlerGlobal.noAudio = true;
                    }
                    self.on("loaderror", {
                        type: newNode.error ? newNode.error.code : 0
                    });
                }, false);
                self._audioNode.push(newNode);
                newNode.src = url;
                newNode._pos = 0;
                newNode.preload = "auto";
                newNode.volume = Howler._muted ? 0 : self._volume * Howler.volume();
                var listener = function() {
                    self._duration = Math.ceil(newNode.duration * 10) / 10;
                    if (Object.getOwnPropertyNames(self._sprite).length === 0) {
                        self._sprite = {
                            _default: [ 0, self._duration * 1e3 ]
                        };
                    }
                    if (!self._loaded) {
                        self._loaded = true;
                        self.on("load");
                    }
                    if (self._autoplay) {
                        self.play();
                    }
                    newNode.removeEventListener("canplaythrough", listener, false);
                };
                newNode.addEventListener("canplaythrough", listener, false);
                newNode.load();
            }
            return self;
        },
        urls: function(urls) {
            var self = this;
            if (urls) {
                self.stop();
                self._urls = typeof urls === "string" ? [ urls ] : urls;
                self._loaded = false;
                self.load();
                return self;
            } else {
                return self._urls;
            }
        },
        play: function(sprite, callback) {
            var self = this;
            if (typeof sprite === "function") {
                callback = sprite;
            }
            if (!sprite || typeof sprite === "function") {
                sprite = "_default";
            }
            if (!self._loaded) {
                self.on("load", function() {
                    self.play(sprite, callback);
                });
                return self;
            }
            if (!self._sprite[sprite]) {
                if (typeof callback === "function") callback();
                return self;
            }
            self._inactiveNode(function(node) {
                node._sprite = sprite;
                var pos = node._pos > 0 ? node._pos : self._sprite[sprite][0] / 1e3;
                var duration = 0;
                if (self._webAudio) {
                    duration = self._sprite[sprite][1] / 1e3 - node._pos;
                    if (node._pos > 0) {
                        pos = self._sprite[sprite][0] / 1e3 + pos;
                    }
                } else {
                    duration = self._sprite[sprite][1] / 1e3 - (pos - self._sprite[sprite][0] / 1e3);
                }
                var loop = !!(self._loop || self._sprite[sprite][2]);
                var soundId = typeof callback === "string" ? callback : Math.round(Date.now() * Math.random()) + "", timerId;
                (function() {
                    var data = {
                        id: soundId,
                        sprite: sprite,
                        loop: loop
                    };
                    timerId = setTimeout(function() {
                        if (!self._webAudio && loop) {
                            self.stop(data.id).play(sprite, data.id);
                        }
                        if (self._webAudio && !loop) {
                            self._nodeById(data.id).paused = true;
                            self._nodeById(data.id)._pos = 0;
                            self._clearEndTimer(data.id);
                        }
                        if (!self._webAudio && !loop) {
                            self.stop(data.id);
                        }
                        self.on("end", soundId);
                    }, duration * 1e3);
                    self._onendTimer.push({
                        timer: timerId,
                        id: data.id
                    });
                })();
                if (self._webAudio) {
                    var loopStart = self._sprite[sprite][0] / 1e3, loopEnd = self._sprite[sprite][1] / 1e3;
                    node.id = soundId;
                    node.paused = false;
                    refreshBuffer(self, [ loop, loopStart, loopEnd ], soundId);
                    self._playStart = ctx.currentTime;
                    node.gain.value = self._volume;
                    if (typeof node.bufferSource.start === "undefined") {
                        node.bufferSource.noteGrainOn(0, pos, duration);
                    } else {
                        node.bufferSource.start(0, pos, duration);
                    }
                } else {
                    if (node.readyState === 4 || !node.readyState && navigator.isCocoonJS) {
                        node.readyState = 4;
                        node.id = soundId;
                        node.currentTime = pos;
                        node.muted = Howler._muted || node.muted;
                        node.volume = self._volume * Howler.volume();
                        setTimeout(function() {
                            node.play();
                        }, 0);
                    } else {
                        self._clearEndTimer(soundId);
                        (function() {
                            var sound = self, playSprite = sprite, fn = callback, newNode = node;
                            var listener = function() {
                                sound.play(playSprite, fn);
                                newNode.removeEventListener("canplaythrough", listener, false);
                            };
                            newNode.addEventListener("canplaythrough", listener, false);
                        })();
                        return self;
                    }
                }
                self.on("play");
                if (typeof callback === "function") callback(soundId);
                return self;
            });
            return self;
        },
        pause: function(id) {
            var self = this;
            if (!self._loaded) {
                self.on("play", function() {
                    self.pause(id);
                });
                return self;
            }
            self._clearEndTimer(id);
            var activeNode = id ? self._nodeById(id) : self._activeNode();
            if (activeNode) {
                activeNode._pos = self.pos(null, id);
                if (self._webAudio) {
                    if (!activeNode.bufferSource || activeNode.paused) {
                        return self;
                    }
                    activeNode.paused = true;
                    if (typeof activeNode.bufferSource.stop === "undefined") {
                        activeNode.bufferSource.noteOff(0);
                    } else {
                        activeNode.bufferSource.stop(0);
                    }
                } else {
                    activeNode.pause();
                }
            }
            self.on("pause");
            return self;
        },
        stop: function(id) {
            var self = this;
            if (!self._loaded) {
                self.on("play", function() {
                    self.stop(id);
                });
                return self;
            }
            self._clearEndTimer(id);
            var activeNode = id ? self._nodeById(id) : self._activeNode();
            if (activeNode) {
                activeNode._pos = 0;
                if (self._webAudio) {
                    if (!activeNode.bufferSource || activeNode.paused) {
                        return self;
                    }
                    activeNode.paused = true;
                    if (typeof activeNode.bufferSource.stop === "undefined") {
                        activeNode.bufferSource.noteOff(0);
                    } else {
                        activeNode.bufferSource.stop(0);
                    }
                } else if (!isNaN(activeNode.duration)) {
                    activeNode.pause();
                    activeNode.currentTime = 0;
                }
            }
            return self;
        },
        mute: function(id) {
            var self = this;
            if (!self._loaded) {
                self.on("play", function() {
                    self.mute(id);
                });
                return self;
            }
            var activeNode = id ? self._nodeById(id) : self._activeNode();
            if (activeNode) {
                if (self._webAudio) {
                    activeNode.gain.value = 0;
                } else {
                    activeNode.muted = true;
                }
            }
            return self;
        },
        unmute: function(id) {
            var self = this;
            if (!self._loaded) {
                self.on("play", function() {
                    self.unmute(id);
                });
                return self;
            }
            var activeNode = id ? self._nodeById(id) : self._activeNode();
            if (activeNode) {
                if (self._webAudio) {
                    activeNode.gain.value = self._volume;
                } else {
                    activeNode.muted = false;
                }
            }
            return self;
        },
        volume: function(vol, id) {
            var self = this;
            vol = parseFloat(vol);
            if (vol >= 0 && vol <= 1) {
                self._volume = vol;
                if (!self._loaded) {
                    self.on("play", function() {
                        self.volume(vol, id);
                    });
                    return self;
                }
                var activeNode = id ? self._nodeById(id) : self._activeNode();
                if (activeNode) {
                    if (self._webAudio) {
                        activeNode.gain.value = vol;
                    } else {
                        activeNode.volume = vol * Howler.volume();
                    }
                }
                return self;
            } else {
                return self._volume;
            }
        },
        loop: function(loop) {
            var self = this;
            if (typeof loop === "boolean") {
                self._loop = loop;
                return self;
            } else {
                return self._loop;
            }
        },
        sprite: function(sprite) {
            var self = this;
            if (typeof sprite === "object") {
                self._sprite = sprite;
                return self;
            } else {
                return self._sprite;
            }
        },
        pos: function(pos, id) {
            var self = this;
            if (!self._loaded) {
                self.on("load", function() {
                    self.pos(pos);
                });
                return typeof pos === "number" ? self : self._pos || 0;
            }
            pos = parseFloat(pos);
            var activeNode = id ? self._nodeById(id) : self._activeNode();
            if (activeNode) {
                if (pos >= 0) {
                    self.pause(id);
                    activeNode._pos = pos;
                    self.play(activeNode._sprite, id);
                    return self;
                } else {
                    return self._webAudio ? activeNode._pos + (ctx.currentTime - self._playStart) : activeNode.currentTime;
                }
            } else if (pos >= 0) {
                return self;
            } else {
                for (var i = 0; i < self._audioNode.length; i++) {
                    if (self._audioNode[i].paused && self._audioNode[i].readyState === 4) {
                        return self._webAudio ? self._audioNode[i]._pos : self._audioNode[i].currentTime;
                    }
                }
            }
        },
        pos3d: function(x, y, z, id) {
            var self = this;
            y = typeof y === "undefined" || !y ? 0 : y;
            z = typeof z === "undefined" || !z ? -.5 : z;
            if (!self._loaded) {
                self.on("play", function() {
                    self.pos3d(x, y, z, id);
                });
                return self;
            }
            if (x >= 0 || x < 0) {
                if (self._webAudio) {
                    var activeNode = id ? self._nodeById(id) : self._activeNode();
                    if (activeNode) {
                        self._pos3d = [ x, y, z ];
                        activeNode.panner.setPosition(x, y, z);
                        activeNode.panner.panningModel = self._model || "HRTF";
                    }
                }
            } else {
                return self._pos3d;
            }
            return self;
        },
        fade: function(from, to, len, callback, id) {
            var self = this, diff = Math.abs(from - to), dir = from > to ? "down" : "up", steps = diff / .01, stepTime = len / steps;
            if (!self._loaded) {
                self.on("load", function() {
                    self.fade(from, to, len, callback, id);
                });
                return self;
            }
            self.volume(from, id);
            for (var i = 1; i <= steps; i++) {
                (function() {
                    var change = self._volume + (dir === "up" ? .01 : -.01) * i, vol = Math.round(1e3 * change) / 1e3, toVol = to;
                    setTimeout(function() {
                        self.volume(vol, id);
                        if (vol === toVol) {
                            if (callback) callback();
                        }
                    }, stepTime * i);
                })();
            }
        },
        fadeIn: function(to, len, callback) {
            return this.volume(0).play().fade(0, to, len, callback);
        },
        fadeOut: function(to, len, callback, id) {
            var self = this;
            return self.fade(self._volume, to, len, function() {
                if (callback) callback();
                self.pause(id);
                self.on("end");
            }, id);
        },
        _nodeById: function(id) {
            var self = this, node = self._audioNode[0];
            for (var i = 0; i < self._audioNode.length; i++) {
                if (self._audioNode[i].id === id) {
                    node = self._audioNode[i];
                    break;
                }
            }
            return node;
        },
        _activeNode: function() {
            var self = this, node = null;
            for (var i = 0; i < self._audioNode.length; i++) {
                if (!self._audioNode[i].paused) {
                    node = self._audioNode[i];
                    break;
                }
            }
            self._drainPool();
            return node;
        },
        _inactiveNode: function(callback) {
            var self = this, node = null;
            for (var i = 0; i < self._audioNode.length; i++) {
                if (self._audioNode[i].paused && self._audioNode[i].readyState === 4) {
                    callback(self._audioNode[i]);
                    node = true;
                    break;
                }
            }
            self._drainPool();
            if (node) {
                return;
            }
            var newNode;
            if (self._webAudio) {
                newNode = self._setupAudioNode();
                callback(newNode);
            } else {
                self.load();
                newNode = self._audioNode[self._audioNode.length - 1];
                var listenerEvent = navigator.isCocoonJS ? "canplaythrough" : "loadedmetadata";
                var listener = function() {
                    newNode.removeEventListener(listenerEvent, listener, false);
                    callback(newNode);
                };
                newNode.addEventListener(listenerEvent, listener, false);
            }
        },
        _drainPool: function() {
            var self = this, inactive = 0, i;
            for (i = 0; i < self._audioNode.length; i++) {
                if (self._audioNode[i].paused) {
                    inactive++;
                }
            }
            for (i = self._audioNode.length - 1; i >= 0; i--) {
                if (inactive <= 5) {
                    break;
                }
                if (self._audioNode[i].paused) {
                    if (self._webAudio) {
                        self._audioNode[i].disconnect(0);
                    }
                    inactive--;
                    self._audioNode.splice(i, 1);
                }
            }
        },
        _clearEndTimer: function(soundId) {
            var self = this, index = 0;
            for (var i = 0; i < self._onendTimer.length; i++) {
                if (self._onendTimer[i].id === soundId) {
                    index = i;
                    break;
                }
            }
            var timer = self._onendTimer[index];
            if (timer) {
                clearTimeout(timer.timer);
                self._onendTimer.splice(index, 1);
            }
        },
        _setupAudioNode: function() {
            var self = this, node = self._audioNode, index = self._audioNode.length;
            node[index] = typeof ctx.createGain === "undefined" ? ctx.createGainNode() : ctx.createGain();
            node[index].gain.value = self._volume;
            node[index].paused = true;
            node[index]._pos = 0;
            node[index].readyState = 4;
            node[index].connect(masterGain);
            node[index].panner = ctx.createPanner();
            node[index].panner.panningModel = self._model || "equalpower";
            node[index].panner.setPosition(self._pos3d[0], self._pos3d[1], self._pos3d[2]);
            node[index].panner.connect(node[index]);
            return node[index];
        },
        on: function(event, fn) {
            var self = this, events = self["_on" + event];
            if (typeof fn === "function") {
                events.push(fn);
            } else {
                for (var i = 0; i < events.length; i++) {
                    if (fn) {
                        events[i].call(self, fn);
                    } else {
                        events[i].call(self);
                    }
                }
            }
            return self;
        },
        off: function(event, fn) {
            var self = this, events = self["_on" + event], fnString = fn ? fn.toString() : null;
            if (fnString) {
                for (var i = 0; i < events.length; i++) {
                    if (fnString === events[i].toString()) {
                        events.splice(i, 1);
                        break;
                    }
                }
            } else {
                self["_on" + event] = [];
            }
            return self;
        },
        unload: function() {
            var self = this;
            var nodes = self._audioNode;
            for (var i = 0; i < self._audioNode.length; i++) {
                if (!nodes[i].paused) {
                    self.stop(nodes[i].id);
                    self.on("end", nodes[i].id);
                }
                if (!self._webAudio) {
                    nodes[i].src = "";
                } else {
                    nodes[i].disconnect(0);
                }
            }
            for (i = 0; i < self._onendTimer.length; i++) {
                clearTimeout(self._onendTimer[i].timer);
            }
            var index = Howler._howls.indexOf(self);
            if (index !== null && index >= 0) {
                Howler._howls.splice(index, 1);
            }
            delete cache[self._src];
            self = null;
        }
    };
    if (usingWebAudio) {
        var loadBuffer = function(obj, url) {
            if (url in cache) {
                obj._duration = cache[url].duration;
                loadSound(obj);
                return;
            }
            if (/^data:[^;]+;base64,/.test(url)) {
                var data = atob(url.split(",")[1]);
                var dataView = new Uint8Array(data.length);
                for (var i = 0; i < data.length; ++i) {
                    dataView[i] = data.charCodeAt(i);
                }
                decodeAudioData(dataView.buffer, obj, url);
            } else {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", url, true);
                xhr.responseType = "arraybuffer";
                xhr.onload = function() {
                    decodeAudioData(xhr.response, obj, url);
                };
                xhr.onerror = function() {
                    if (obj._webAudio) {
                        obj._buffer = true;
                        obj._webAudio = false;
                        obj._audioNode = [];
                        delete obj._gainNode;
                        delete cache[url];
                        obj.load();
                    }
                };
                try {
                    xhr.send();
                } catch (e) {
                    xhr.onerror();
                }
            }
        };
        var decodeAudioData = function(arraybuffer, obj, url) {
            ctx.decodeAudioData(arraybuffer, function(buffer) {
                if (buffer) {
                    cache[url] = buffer;
                    loadSound(obj, buffer);
                }
            }, function(err) {
                obj.on("loaderror");
            });
        };
        var loadSound = function(obj, buffer) {
            obj._duration = buffer ? buffer.duration : obj._duration;
            if (Object.getOwnPropertyNames(obj._sprite).length === 0) {
                obj._sprite = {
                    _default: [ 0, obj._duration * 1e3 ]
                };
            }
            if (!obj._loaded) {
                obj._loaded = true;
                obj.on("load");
            }
            if (obj._autoplay) {
                obj.play();
            }
        };
        var refreshBuffer = function(obj, loop, id) {
            var node = obj._nodeById(id);
            node.bufferSource = ctx.createBufferSource();
            node.bufferSource.buffer = cache[obj._src];
            node.bufferSource.connect(node.panner);
            node.bufferSource.loop = loop[0];
            if (loop[0]) {
                node.bufferSource.loopStart = loop[1];
                node.bufferSource.loopEnd = loop[1] + loop[2];
            }
            node.bufferSource.playbackRate.value = obj._rate;
        };
    }
    if (typeof define === "function" && define.amd) {
        define(function() {
            return {
                Howler: Howler,
                Howl: Howl
            };
        });
    }
    if (typeof exports !== "undefined") {
        exports.Howler = Howler;
        exports.Howl = Howl;
    }
    if (typeof window !== "undefined") {
        window.Howler = Howler;
        window.Howl = Howl;
    }
})();

var DUST = function(DUST) {
    "use strict";
    return DUST;
}(DUST || {});

DUST.persist = function() {
    "use strict";
    var externalResource = null;
    var memory = {};
    function setExternalResource(resource) {
        externalResource = resource;
    }
    function save(key, value, afterSave) {
        if (window.localStorage) {
            window.localStorage.setItem(key, value);
        } else {
            memory[key] = value;
        }
        if (externalResource) {
            externalResource.save(key, value, afterSave);
        } else {
            afterSave(value);
        }
    }
    function read(key, afterRead) {
        var result = null;
        if (window.localStorage) {
            result = window.localStorage.getItem(key);
        } else {
            result = memory[key];
        }
        if (externalResource) {
            externalResource.read(key, function(value) {
                if (value) {
                    if (window.localStorage) {
                        window.localStorage.setItem(key, value);
                    } else {
                        memory[key] = value;
                    }
                    afterRead(value);
                    return value;
                } else {
                    afterRead(result);
                    return result;
                }
            });
        } else {
            afterRead(result);
            return result;
        }
    }
    return {
        save: save,
        read: read,
        setExternalResource: setExternalResource
    };
}();

DUST.event = function() {
    "use strict";
    var events = {};
    function on(event, action) {
        if (!events[event]) {
            events[event] = [];
        }
        events[event].push(action);
    }
    function broadcast(event, data) {
        if (events[event]) {
            var length = events[event].length;
            while (length--) {
                events[event][length](data);
            }
        }
    }
    return {
        on: on,
        broadcast: broadcast
    };
}();

DUST.scenes = function() {
    "use strict";
    var scenes = {}, previousScene, currentScene, nextScene;
    return {
        add: function(scene) {
            scenes[scene.name] = scene;
        },
        "switch": function(newScene, clear, futureScene) {
            var targetScene = null;
            previousScene = null;
            if (futureScene) {
                nextScene = futureScene;
            }
            for (var scene in scenes) {
                if (scenes.hasOwnProperty(scene)) {
                    if (newScene !== scene && scenes[scene].isActive && (!scenes[scene].authoritative || clear)) {
                        previousScene = scene;
                        currentScene = newScene;
                        scenes[scene].hide(function() {
                            scenes[newScene].show();
                        });
                    }
                    if (newScene !== scene && scenes[scene].isActive && scenes[scene].authoritative) {
                        previousScene = scene;
                        currentScene = newScene;
                        scenes[newScene].show();
                    }
                    if (clear) {
                        scenes[scene].clear();
                    }
                }
            }
        },
        back: function() {
            if (previousScene) {
                this.switch(previousScene, false, currentScene);
            }
        },
        forward: function() {
            if (nextScene) {
                this.switch(nextScene);
            }
        },
        toggle: function(newScene) {
            if (scenes[newScene].isActive) {
                scenes[newScene].hide();
            } else {
                scenes[newScene].show();
            }
        }
    };
}();

DUST.Scene = function(scenes) {
    "use strict";
    var Scene = function(options) {
        this.isLoaded = false;
        this.wasStarted = false;
        this.children = [];
        this.physics = [];
        this.objects = options.objects;
        this.onFinishedLoading = options.onFinishedLoading;
        this.onShow = options.onShow;
        this.onHide = options.onHide;
        this.onClear = options.onClear;
        this.name = options.name;
        this.authoritative = options.authoritative;
        scenes.add(this);
    };
    Scene.prototype = {
        onFinishedLoading: null,
        onHide: null,
        onShow: null,
        onClear: null,
        authoritative: false,
        selfAttach: function(child) {
            if (child && child.selfAttach) {
                child.selfAttach();
            } else if (child && child.container && child.container.selfAttach) {
                child.container.selfAttach();
            }
        },
        selfRemove: function(child) {
            if (child && child.selfRemove) {
                child.selfRemove();
            } else if (child && child.container && child.container.selfRemove) {
                child.container.selfRemove();
            }
        },
        show: function() {
            var self = this;
            if (!self.isLoaded) {
                self.objects.forEach(function(object) {
                    if (object && object.length && object.forEach) {
                        object.forEach(function(objectEntity) {
                            self.children.push(objectEntity());
                        });
                    } else {
                        self.children.push(object());
                    }
                });
            }
            self.children.forEach(function(child) {
                if (child.entity) {
                    child = child.entity;
                }
                if (child && child.length && child.forEach) {
                    child.forEach(function(childEntity) {
                        if (childEntity.entity) {
                            childEntity = childEntity.entity;
                        }
                        self.selfAttach(childEntity);
                    });
                } else {
                    self.selfAttach(child);
                }
            });
            if (self.onFinishedLoading && !self.wasStarted) {
                self.onFinishedLoading();
            }
            self.isLoaded = true;
            self.wasStarted = true;
            self.isActive = true;
            if (self.onShow) {
                self.onShow();
            }
        },
        hide: function(nextScene) {
            var self = this;
            if (self.onHide) {
                self.onHide(function() {
                    self.children.forEach(function(child) {
                        if (child.entity) {
                            child = child.entity;
                        }
                        if (child && child.length && child.forEach) {
                            child.forEach(function(childEntity) {
                                if (childEntity.entity) {
                                    childEntity = childEntity.entity;
                                }
                                self.selfRemove(childEntity);
                            });
                        } else {
                            self.selfRemove(child);
                        }
                    });
                    if (nextScene) {
                        nextScene();
                    }
                });
            }
            self.isActive = false;
        },
        clear: function() {
            var self = this;
            if (self.onClear) {
                self.onClear();
            }
        }
    };
    return Scene;
}(DUST.scenes);

DUST.particle = function() {
    "use strict";
    var engine = {
        update: function() {}
    };
    var renderer = null;
    return function(container) {
        if (!renderer && container) {
            engine = new Proton(30);
            renderer = new Proton.Renderer("other", engine);
            renderer.onParticleCreated = function(particle) {
                particle.sprite = new PIXI.Sprite(particle.target);
                particle.sprite.anchor.x = .5;
                particle.sprite.anchor.y = .5;
                container.addChild(particle.sprite);
            };
            renderer.onParticleUpdate = function(particle) {
                particle.sprite.x = particle.p.x;
                particle.sprite.y = particle.p.y;
                particle.sprite.scale.x = particle.scale;
                particle.sprite.scale.y = particle.scale;
                particle.sprite.alpha = particle.alpha;
                particle.sprite.tint = parseInt("0x" + particle.color, 16);
            };
            renderer.onParticleDead = function(particle) {
                particle.sprite.parent.removeChild(particle.sprite);
                particle.sprite = null;
                particle = null;
            };
            renderer.start();
        }
        return {
            renderer: renderer,
            engine: engine
        };
    };
}();

DUST.ASSETS = {};

DUST.ASSETS.baseUrl = function() {
    "use strict";
    var baseUrl = "";
    var update = function(url) {
        baseUrl = url;
        return baseUrl;
    };
    var current = function() {
        return baseUrl;
    };
    return {
        current: current,
        update: update
    };
}();

DUST.GRAPHIC = {};

DUST.GRAPHIC.clock = function() {
    "use strict";
    var instance = null;
    function Clock() {
        this.startTime = Date.now();
        this.ms = this.startTime;
        this.last = this.startTime;
        this.time = 0;
        this.dt = 0;
        this.delta = 0;
        this.fps = 60;
        this.frameCount = 0;
        this.frameCounter = true;
        var timeToUpdate = 0;
        var framesToUpdate = 0;
        this.tick = function() {
            if (this.frameCounter) this.frameCount++;
            this.ms = Date.now();
            this.dt = this.ms - this.last;
            this.last = this.ms;
            this.delta = .001 * this.dt;
            this.time += this.delta;
            if (this.frameCounter) {
                timeToUpdate += this.dt;
                framesToUpdate++;
                if (timeToUpdate > 1e3) {
                    this.fps = Math.round(framesToUpdate * 1e3 / timeToUpdate);
                    framesToUpdate = 0;
                    timeToUpdate = 0;
                }
            }
        };
    }
    return function() {
        if (!instance) {
            instance = new Clock();
        }
        return instance;
    };
}();

DUST.GRAPHIC.renderer = function(PIXI) {
    "use strict";
    var scale = 1;
    if (!window.devicePixelRatio) {
        window.devicePixelRatio = 1;
    }
    if (window.devicePixelRatio > 1 && window.devicePixelRatio <= 1.5) {
        scale = 1.25;
    }
    if (window.devicePixelRatio > 1.5) {
        scale = 1.5;
    }
    var canvas = document.getElementById("canvas");
    var options = {
        antialiasing: false,
        transparent: false,
        view: canvas,
        resolution: scale,
        clearBeforeRender: false
    };
    var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, options);
    return {
        renderer: renderer,
        canvas: canvas
    };
}(PIXI);

DUST.GRAPHIC.scene = function(PIXI) {
    "use strict";
    var scene = new PIXI.DisplayObjectContainer();
    scene.scale.x = 1;
    scene.scale.y = 1;
    return scene;
}(PIXI);

DUST.GRAPHIC.resize = function(renderer, scene) {
    "use strict";
    var canvas = renderer.canvas, rendererInstance = renderer.renderer;
    var targetViewPort = {
        width: 1024,
        height: 696,
        scaleLarge: 1,
        scaleSmall: 1,
        tipPoint: 1.2
    };
    var listening = false;
    var rendererResize = function() {
        var width = window.innerWidth, height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        rendererInstance.resize(width, height);
        if (width / height < targetViewPort.tipPoint) {
            if (targetViewPort.screenToSmall) {
                targetViewPort.screenToSmall();
            }
            scene.scale.y = height / targetViewPort.height / targetViewPort.scaleLarge;
            scene.scale.x = height / targetViewPort.height / targetViewPort.scaleLarge;
        } else {
            if (targetViewPort.screenOk) {
                targetViewPort.screenOk();
            }
            scene.scale.y = height / targetViewPort.height * targetViewPort.scaleSmall;
            scene.scale.x = height / targetViewPort.height * targetViewPort.scaleSmall;
        }
        scene.pivot.x = -(width * (1 / scene.scale.y) / 2);
        if (window.scrollTo) {
            window.scrollTo(0, 0);
        }
    };
    var resize = function() {
        if (!listening) {
            window.addEventListener("resize", rendererResize);
            window.addEventListener("deviceOrientation", rendererResize);
            listening = true;
        }
    };
    return function(viewPort) {
        if (viewPort) {
            targetViewPort = viewPort;
        }
        resize();
        rendererResize();
    };
}(DUST.GRAPHIC.renderer, DUST.GRAPHIC.scene);

DUST.GRAPHIC.stage = function(renderer, clock, PIXI, requestAnimationFrame) {
    "use strict";
    renderer = renderer.renderer;
    if (DUST.debug) {
        var stats = new Stats();
        stats.domElement.style.position = "absolute";
        stats.domElement.style.left = "0px";
        stats.domElement.style.top = "0px";
        document.body.appendChild(stats.domElement);
    }
    var gameLoops = [];
    var stage = new PIXI.Stage();
    var loop;
    if (DUST.debug) {
        loop = function() {
            requestAnimationFrame(loop);
            stats.begin();
            renderer.render(stage);
            var length = gameLoops.length;
            while (length--) {
                if (gameLoops[length]) {
                    gameLoops[length].loop();
                }
            }
            clock().tick();
            stats.end();
        };
    } else {
        loop = function() {
            requestAnimationFrame(loop);
            renderer.render(stage);
            var length = gameLoops.length;
            while (length--) {
                if (gameLoops[length]) {
                    gameLoops[length].loop();
                }
            }
            clock().tick();
        };
    }
    var addToLoop = function(extraLoop, name) {
        gameLoops.push({
            loop: extraLoop,
            name: name
        });
    };
    var removeFromLoop = function(name) {
        var length = gameLoops.length;
        while (length--) {
            if (gameLoops[length].name === name) {
                gameLoops.splice(length, 1);
            }
        }
    };
    requestAnimationFrame(loop);
    return {
        instance: stage,
        addToLoop: addToLoop,
        removeFromLoop: removeFromLoop
    };
}(DUST.GRAPHIC.renderer, DUST.GRAPHIC.clock, PIXI, requestAnimationFrame);

DUST.GRAPHIC.HELPERS = {};

DUST.GRAPHIC.HELPERS.setPosition = function(scene) {
    "use strict";
    var isFunction = function(item) {
        return typeof item === "function";
    };
    return function(settings) {
        var targetPosition = {}, options = settings.options, item = settings.item, resizeHandler = function() {
            item.x = options.x() / scene.scale.x;
        };
        if (isFunction(options.x)) {
            targetPosition.x = options.x();
        } else {
            targetPosition.x = options.x;
        }
        if (isFunction(options.y)) {
            targetPosition.y = options.y();
        } else {
            targetPosition.y = options.y;
        }
        if (options.pinned) {
            targetPosition.x *= 1 / scene.scale.x;
            window.addEventListener("resize", resizeHandler);
            window.addEventListener("orientationChange", resizeHandler);
        }
        return targetPosition;
    };
}(DUST.GRAPHIC.scene);

DUST.GRAPHIC.HELPERS.addToCanvas = function(scene) {
    "use strict";
    return function(options) {
        var container = options.container, object = options.object, at = options.at;
        if (container) {
            if (!isNaN(at)) {
                container.addChildAt(object, at);
            } else {
                container.addChild(object);
            }
        } else {
            scene.addChild(object);
        }
    };
}(DUST.GRAPHIC.scene);

DUST.GRAPHIC.HELPERS.textureFromFrame = function(PIXI) {
    "use strict";
    return function(texture) {
        return PIXI.Texture.fromFrame(texture);
    };
}(PIXI);

DUST.GRAPHIC.HELPERS.textureFromFile = function(baseUrl, PIXI) {
    "use strict";
    return function(texture) {
        return PIXI.Texture.fromImage(baseUrl.current() + texture);
    };
}(DUST.ASSETS.baseUrl, PIXI);

DUST.GRAPHIC.HELPERS.animatable = function(clock) {
    "use strict";
    var animate = function(object) {
        return {
            zoom: function(zoomLevel, callback) {
                object.queue.push(function() {
                    if (object.type === "container") {
                        object.targetScale = zoomLevel;
                    } else {
                        object.targetScale = zoomLevel;
                    }
                    object.callback = callback;
                });
            },
            move: function(x, y, callback) {
                object.queue.push(function() {
                    object.targetPosition = {
                        x: x,
                        y: y
                    };
                    object.callback = callback;
                });
            },
            fade: function(alpha, callback) {
                object.targetAlpha = alpha;
                object.callback = callback;
            }
        };
    };
    var update = function(object) {
        return function() {
            var speed = 1;
            var acceleration = 1;
            if (object.speed) {
                speed = object.speed;
            }
            if (object.acceleration) {
                object.acceleration += object.acceleration / 10;
                acceleration = 1 + object.acceleration;
            }
            if (object.targetAlpha || object.targetAlpha === 0) {
                if (object.targetAlpha < object.alpha) {
                    object.alpha -= .03 * speed * 60 / clock().fps;
                    if (object.targetAlpha > object.alpha) {
                        object.alpha = object.targetAlpha;
                    }
                }
                if (object.targetAlpha > object.alpha) {
                    object.alpha += .03 * speed * 60 / clock().fps;
                    if (object.targetAlpha < object.alpha) {
                        object.alpha = object.targetAlpha;
                    }
                }
                if (object.targetAlpha === object.alpha) {
                    if (object.callback) {
                        object.callback();
                    }
                    object.targetAlpha = null;
                }
            }
            if (object.queue && object.queue.length) {
                if (!object.queueRunning) {
                    object.queueRunning = true;
                    object.queue[0]();
                }
                if (object.targetScale && object.targetScale !== object.scale.x) {
                    if (object.targetScale < object.scale.x) {
                        object.scale.x -= .04 * scale * speed * acceleration * 60 / clock().fps;
                        object.scale.y = object.scale.x;
                        if (object.targetScale >= object.scale.x) {
                            object.scale.x = object.targetScale;
                            object.queueRunning = false;
                            object.queue.shift();
                            if (object.callback) {
                                object.callback();
                                object.callback = null;
                                object.targetScale = null;
                            }
                        }
                    } else {
                        object.scale.x += .04 * speed * acceleration * scale * 60 / clock().fps;
                        object.scale.y = object.scale.x;
                        if (object.targetScale <= object.scale.x) {
                            object.scale.x = object.targetScale;
                            object.queueRunning = false;
                            object.queue.shift();
                            if (object.callback) {
                                object.callback();
                                object.callback = null;
                                object.targetScale = null;
                            }
                        }
                    }
                }
                if (object.targetPosition) {
                    if (object.targetPosition.x && object.targetPosition.y) {
                        if (object.targetPosition.x < object.x) {
                            if (Math.abs(object.x - object.targetPosition.x) / Math.abs(object.y - object.targetPosition.y) <= .5) {
                                object.x -= 5 * speed * acceleration * 60 / clock().fps * (Math.abs(object.x - object.targetPosition.x) / Math.abs(object.y - object.targetPosition.y));
                            } else {
                                object.x -= 5 * speed * acceleration * 60 / clock().fps;
                            }
                            if (object.targetPosition.x > object.x) {
                                object.x = object.targetPosition.x;
                            }
                        } else if (object.targetPosition.x > object.x) {
                            if (Math.abs(object.x - object.targetPosition.x) / Math.abs(object.y - object.targetPosition.y) <= .5) {
                                object.x += 5 * speed * acceleration * 60 / clock().fps * (Math.abs(object.x - object.targetPosition.x) / Math.abs(object.y - object.targetPosition.y));
                            } else {
                                object.x += 5 * speed * acceleration * 60 / clock().fps;
                            }
                            if (object.targetPosition.x < object.x) {
                                object.x = object.targetPosition.x;
                            }
                        }
                        if (object.targetPosition.y < object.y) {
                            if (Math.abs(object.x - object.targetPosition.x) / Math.abs(object.y - object.targetPosition.y) > .5) {
                                object.y -= 5 * speed * acceleration * 60 / clock().fps / (Math.abs(object.x - object.targetPosition.x) / Math.abs(object.y - object.targetPosition.y));
                            } else {
                                object.y -= 5 * speed * acceleration * 60 / clock().fps;
                            }
                            if (object.targetPosition.y > object.y) {
                                object.y = object.targetPosition.y;
                            }
                        } else if (object.targetPosition.y > object.y) {
                            if (Math.abs(object.x - object.targetPosition.x) / Math.abs(object.y - object.targetPosition.y) > .5) {
                                object.y += 5 * speed * acceleration * 60 / clock().fps / (Math.abs(object.x - object.targetPosition.x) / Math.abs(object.y - object.targetPosition.y));
                            } else {
                                object.y += 5 * speed * acceleration * 60 / clock().fps;
                            }
                            if (object.targetPosition.y < object.y) {
                                object.y = object.targetPosition.y;
                            }
                        }
                        if (object.targetPosition.x === object.x && object.targetPosition.y === object.y) {
                            object.queueRunning = false;
                            object.queue.shift();
                            if (object.callback) {
                                object.callback();
                                object.callback = null;
                                object.targetPosition = null;
                            }
                        }
                    } else if (object.targetPosition.x) {
                        if (object.targetPosition.x < object.x) {
                            object.x -= 5 * speed * acceleration * 60 / clock().fps;
                            if (object.targetPosition.x >= object.x) {
                                object.x = object.targetPosition.x;
                                object.queueRunning = false;
                                object.queue.shift();
                                if (object.callback) {
                                    object.callback();
                                    object.callback = null;
                                    object.targetPosition = null;
                                }
                            }
                        } else {
                            object.x += 5 * speed * acceleration * 60 / clock().fps;
                            if (object.targetPosition.x <= object.x) {
                                object.x = object.targetPosition.x;
                                object.queueRunning = false;
                                object.queue.shift();
                                if (object.callback) {
                                    object.callback();
                                    object.callback = null;
                                    object.targetPosition = null;
                                }
                            }
                        }
                    } else if (object.targetPosition.y) {
                        if (object.targetPosition.y !== object.y) {
                            if (object.targetPosition.y < object.y) {
                                object.y -= 5 * speed * acceleration * 60 / clock().fps;
                                if (object.targetPosition.y >= object.y) {
                                    object.y = object.targetPosition.y;
                                    object.queueRunning = false;
                                    object.queue.shift();
                                    if (object.callback) {
                                        object.callback();
                                        object.callback = null;
                                        object.targetPosition = null;
                                    }
                                }
                            } else {
                                object.y += 5 * speed * acceleration * 60 / clock().fps;
                                if (object.targetPosition.y <= object.y) {
                                    object.y = object.targetPosition.y;
                                    object.queueRunning = false;
                                    object.queue.shift();
                                    if (object.callback) {
                                        object.callback();
                                        object.callback = null;
                                        object.targetPosition = null;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };
    };
    return function(object) {
        object.animate = animate(object);
        object.update = update(object);
        object.queue = [];
        return object;
    };
}(DUST.GRAPHIC.clock);

DUST.GRAPHIC.init = function(stage, resize, scene) {
    "use strict";
    var isGraphicOn = false;
    return function(viewPort) {
        if (!isGraphicOn) {
            isGraphicOn = true;
            stage.instance.addChild(scene);
            resize(viewPort);
        }
        return isGraphicOn;
    };
}(DUST.GRAPHIC.stage, DUST.GRAPHIC.resize, DUST.GRAPHIC.scene);

DUST.PHYSICS = {};

DUST.PHYSICS.world = function() {
    "use strict";
    var world = new p2.World({
        doProfiling: false,
        solveConstraints: false,
        gravity: [ 0, 0 ]
    });
    world.solver.frictionIterations = 1;
    world.solver.tolerance = 10;
    world.solver.iterations = 1;
    return world;
}();

DUST.PHYSICS.simulation = function() {
    "use strict";
    var simulation = new p2.World({
        doProfiling: false,
        solveConstraints: false,
        gravity: [ 0, 0 ]
    });
    simulation.solver.frictionIterations = 1;
    simulation.solver.tolerance = 10;
    simulation.solver.iterations = 1;
    return simulation;
}();

DUST.PHYSICS.bodies = function() {
    "use strict";
    var bodies = [];
    var scale = 128;
    var add = function(body) {
        bodies.push(body);
    };
    var remove = function(body) {
        var index = bodies.indexOf(body);
        if (index >= 0) {
            bodies.splice(index, 1);
        }
    };
    var update = function() {
        bodies.forEach(function(body) {
            if (body.update) {
                body.update(scale);
            }
        });
    };
    return {
        add: add,
        remove: remove,
        update: update
    };
}();

DUST.PHYSICS.circle = function(bodies, world, simulation) {
    "use strict";
    return function(settings) {
        var circleBody = new p2.Body({
            mass: settings.mass,
            position: [ settings.sprite.x / 128, settings.sprite.y / 128 ],
            fixedRotation: settings.fixedRotation
        }), radius = settings.radius / 128 / 2, circleShape;
        if (settings.kinematic) {
            circleShape.type = p2.Body.KINEMATIC;
        }
        circleShape = new p2.Circle(radius);
        circleShape.collisionGroup = settings.collisionGroup || Math.pow(2, 0);
        circleShape.collisionMask = settings.collisionMask || Math.pow(2, 0);
        circleBody.simulation = settings.simulation;
        circleBody.addShape(circleShape);
        circleBody.sprite = settings.sprite;
        circleBody.enable = function() {
            if (!circleBody.physicsEnabled) {
                if (circleBody.simulation) {
                    simulation.addBody(circleBody);
                } else {
                    world.addBody(circleBody);
                    if (settings.mass || settings.kinematic) {
                        bodies.add(circleBody);
                    }
                }
                circleBody.physicsEnabled = true;
            }
        };
        circleBody.disable = function() {
            if (circleBody.physicsEnabled) {
                if (circleBody.simulation) {
                    simulation.removeBody(circleBody);
                } else {
                    world.removeBody(circleBody);
                    if (settings.mass || settings.kinematic) {
                        bodies.remove(circleBody);
                    }
                }
                circleBody.physicsEnabled = false;
            }
        };
        if (settings.enable) {
            circleBody.enable();
        }
        return circleBody;
    };
}(DUST.PHYSICS.bodies, DUST.PHYSICS.world, DUST.PHYSICS.simulation);

DUST.PHYSICS.rectangle = function(bodies, world) {
    "use strict";
    return function(settings) {
        var rectangleBody = new p2.Body({
            mass: settings.mass,
            position: [ settings.x / 128, settings.y / 128 ],
            fixedRotation: settings.fixedRotation
        }), rectangleShape;
        if (settings.kinematic) {
            rectangleBody.type = p2.Body.KINEMATIC;
        }
        rectangleShape = new p2.Rectangle(settings.width / 128, settings.height / 128);
        rectangleShape.collisionGroup = settings.collisionGroup || Math.pow(2, 0);
        rectangleShape.collisionMask = settings.collisionMask || Math.pow(2, 0);
        rectangleBody.addShape(rectangleShape);
        rectangleBody.sprite = settings.sprite;
        rectangleBody.enable = function() {
            if (!rectangleBody.physicsEnabled) {
                world.addBody(rectangleBody);
                rectangleBody.physicsEnabled = true;
                if (settings.mass || settings.kinematic) {
                    bodies.add(rectangleBody);
                }
            }
        };
        rectangleBody.disable = function() {
            if (rectangleBody.physicsEnabled) {
                world.removeBody(rectangleBody);
                rectangleBody.physicsEnabled = false;
                if (settings.mass || settings.kinematic) {
                    bodies.remove(rectangleBody);
                }
            }
        };
        if (settings.enable) {
            rectangleBody.enable();
        }
        return rectangleBody;
    };
}(DUST.PHYSICS.bodies, DUST.PHYSICS.world);

DUST.PHYSICS.plane = function(bodies, world) {
    "use strict";
    return function(settings) {
        var planeBody = new p2.Body({
            mass: settings.mass,
            position: [ settings.x / 128, settings.y / 128 ]
        }), planeShape;
        if (settings.kinematic) {
            planeBody.type = p2.Body.KINEMATIC;
        }
        planeShape = new p2.Plane();
        planeShape.collisionGroup = settings.collisionGroup || Math.pow(2, 0);
        planeShape.collisionMask = settings.collisionMask || Math.pow(2, 0);
        planeBody.addShape(planeShape);
        planeBody.enable = function() {
            if (!planeBody.physicsEnabled) {
                world.addBody(planeBody);
                planeBody.physicsEnabled = true;
                if (settings.mass || settings.kinematic) {
                    bodies.add(planeBody);
                }
            }
        };
        planeBody.disable = function() {
            if (planeBody.physicsEnabled) {
                world.removeBody(planeBody);
                planeBody.physicsEnabled = false;
                if (settings.mass || settings.kinematic) {
                    bodies.remove(planeBody);
                }
            }
        };
        planeBody.collisionGroup = 2;
        if (settings.enable) {
            planeBody.enable();
        }
        return planeBody;
    };
}(DUST.PHYSICS.bodies, DUST.PHYSICS.world);

(function(GRAPHIC, circle, rectangle, plane) {
    "use strict";
    var Entity = function(properties) {
        var self = this;
        if (properties.name) {
            this.name = properties.name;
        } else {
            throw "Entities must have unique names";
        }
        if (!properties.invisible) {
            if (this.types[properties.type]) {
                this.properties = properties;
                this.sprite = this.types[properties.type](properties);
                this.sprite.type = properties.type;
            } else {
                throw "Not a valid entity type: " + properties.type;
            }
        }
        if (properties.physics) {
            if (properties.physics.radius) {
                this.physics = circle({
                    sprite: this.sprite,
                    mass: properties.physics.mass,
                    collisionGroup: properties.physics.collisionGroup,
                    collisionMask: properties.physics.collisionMask,
                    kinematic: properties.physics.kinematic,
                    radius: properties.physics.radius,
                    enable: properties.physics.enable,
                    fixedRotation: properties.physics.fixedRotation
                });
            } else if (properties.physics.isPlane) {
                this.physics = plane({
                    mass: properties.physics.mass,
                    collisionGroup: properties.physics.collisionGroup,
                    collisionMask: properties.physics.collisionMask,
                    kinematic: properties.physics.kinematic,
                    enable: properties.physics.enable,
                    x: properties.x,
                    y: properties.y
                });
            } else {
                this.physics = rectangle({
                    sprite: this.sprite,
                    collisionGroup: properties.physics.collisionGroup,
                    collisionMask: properties.physics.collisionMask,
                    kinematic: properties.physics.kinematic,
                    mass: properties.physics.mass,
                    enable: properties.physics.enable,
                    width: properties.physics.width,
                    height: properties.physics.height,
                    x: properties.x,
                    y: properties.y,
                    fixedRotation: properties.physics.fixedRotation
                });
            }
            if (!properties.invisible) {
                this.physics.update = function() {
                    self.sprite.y = self.physics.position[1] * 128;
                    self.sprite.x = self.physics.position[0] * 128;
                    if (!self.physics.fixedRotation) {
                        self.sprite.rotation = self.physics.angle;
                    }
                };
                this.updateBody = function() {
                    self.physics.position[0] = self.sprite.x / 128;
                    self.physics.position[1] = self.sprite.y / 128;
                    self.physics.updateAABB();
                };
            }
        }
    };
    Entity.prototype = {
        onBeforeAttach: function() {},
        onAfterAttach: function() {},
        onBeforeRemove: function() {},
        onAfterRemove: function() {}
    };
    GRAPHIC.Entity = Entity;
    return GRAPHIC;
})(DUST.GRAPHIC, DUST.PHYSICS.circle, DUST.PHYSICS.rectangle, DUST.PHYSICS.plane);

(function(Entity) {
    "use strict";
    function selfAttach() {
        if (!this.sprite.parent) {
            this.onBeforeAttach();
            if (this.sprite.container.sprite) {
                this.sprite.container.sprite.addChild(this.sprite);
            } else {
                this.sprite.container.addChild(this.sprite);
            }
            this.onAfterAttach();
        }
        if (this.physics) {
            this.physics.enable();
        }
    }
    Entity.prototype.selfAttach = selfAttach;
    return Entity;
})(DUST.GRAPHIC.Entity);

(function(Entity) {
    "use strict";
    function selfRemove() {
        if (this.sprite.parent) {
            this.onBeforeRemove();
            this.sprite.parent.removeChild(this.sprite);
            this.onAfterRemove();
        }
        if (this.physics) {
            this.physics.disable();
        }
    }
    Entity.prototype.selfRemove = selfRemove;
    return Entity;
})(DUST.GRAPHIC.Entity);

(function(Entity, animatable, stage) {
    "use strict";
    function enable() {
        this.sprite = animatable(this.sprite);
        stage.addToLoop(this.sprite.update, this.name);
    }
    function disable() {
        stage.removeFromLoop(this.name);
        this.sprite.animationIndex = null;
        this.sprite.update = null;
        this.sprite.animate = null;
        this.sprite.queue = null;
        this.sprite.speed = null;
        this.sprite.acceleration = null;
        this.sprite.targetPosition = null;
        this.sprite.targetScale = null;
        this.sprite.targetAlpha = null;
    }
    Entity.prototype.animationEnable = enable;
    Entity.prototype.animationDisable = disable;
    return Entity;
})(DUST.GRAPHIC.Entity, DUST.GRAPHIC.HELPERS.animatable, DUST.GRAPHIC.stage);

DUST.GRAPHIC.Entity.prototype.types = {};

(function(Entity, addToCanvas, setPosition, PIXI) {
    "use strict";
    function bitmapText(options) {
        var textOptions = {
            font: options.font.size + "px" + " " + options.font.family,
            align: options.align
        };
        if (options.wordWrap) {
            textOptions.wordWrap = true;
            textOptions.wordWrapWidth = options.wordWrap;
        }
        var object = new PIXI.BitmapText(options.text, textOptions), bitmapTextCall = function() {
            addToCanvas({
                object: object,
                container: options.container.sprite || options.container,
                at: options.at
            });
        };
        object.position = setPosition({
            options: options,
            item: object
        });
        object.container = options.container;
        if (!options.disabled) {
            bitmapTextCall();
        } else {
            object.render = bitmapTextCall;
        }
        return object;
    }
    Entity.prototype.types.bitmapText = bitmapText;
    return Entity;
})(DUST.GRAPHIC.Entity, DUST.GRAPHIC.HELPERS.addToCanvas, DUST.GRAPHIC.HELPERS.setPosition, PIXI);

(function(Entity, addToCanvas, setPosition, PIXI) {
    "use strict";
    function container(options) {
        var object;
        if (options.batch) {
            object = new PIXI.SpriteBatch();
        } else {
            object = new PIXI.DisplayObjectContainer();
        }
        object.container = options.container;
        object.position = setPosition({
            options: options,
            item: object
        });
        addToCanvas({
            object: object,
            container: options.container.sprite || options.container,
            at: options.at
        });
        return object;
    }
    Entity.prototype.types.container = container;
    return Entity;
})(DUST.GRAPHIC.Entity, DUST.GRAPHIC.HELPERS.addToCanvas, DUST.GRAPHIC.HELPERS.setPosition, PIXI);

(function(Entity, addToCanvas, setPosition, PIXI) {
    "use strict";
    function movieClip(options) {
        var object, textures = [], objectCall;
        options.asset.forEach(function(asset) {
            textures.push(PIXI.Texture.fromFrame(asset));
        });
        object = new PIXI.MovieClip(textures);
        objectCall = function() {
            addToCanvas({
                object: object,
                container: options.container.sprite || options.container,
                at: options.at
            });
        };
        object.loop = options.loop;
        if (options.onComplete) {
            object.onComplete = options.onComplete;
        } else {
            object.onComplete = function() {
                if (!object.loop) {
                    window.setTimeout(function() {
                        object.gotoAndStop(0);
                    }, 0);
                }
            };
        }
        object.animationSpeed = options.speed || 1;
        object.container = options.container;
        object.position = setPosition({
            options: options,
            item: object
        });
        if (options.anchor) {
            object.anchor.x = options.anchor.x;
            object.anchor.y = options.anchor.y;
        } else {
            object.anchor.x = .5;
            object.anchor.y = .5;
        }
        if (options.scale) {
            object.scale.x = options.scale.x;
            object.scale.y = options.scale.y;
        }
        object.rotation = options.rotation;
        if (!options.disabled) {
            objectCall();
        } else {
            object.render = objectCall;
        }
        object.play();
        return object;
    }
    Entity.prototype.types.movieClip = movieClip;
    return Entity;
})(DUST.GRAPHIC.Entity, DUST.GRAPHIC.HELPERS.addToCanvas, DUST.GRAPHIC.HELPERS.setPosition, PIXI);

(function(Entity, addToCanvas, setPosition, baseUrl, PIXI) {
    "use strict";
    function spine(options) {
        var object = new PIXI.Spine(baseUrl.current() + options.asset);
        addToCanvas({
            object: object,
            container: options.container.sprite || options.container,
            at: options.at
        });
        if (options.scale) {
            object.scale.x = options.scale.x;
            object.scale.y = options.scale.y;
        }
        if (options.skin) {
            object.skeleton.setSkinByName(options.skin);
            object.type = options.skin;
            object.skeleton.setSlotsToSetupPose();
        }
        object.container = options.container;
        object.position = setPosition({
            options: options,
            item: object
        });
        object.rotation = options.rotation;
        object.pivot.x = .5;
        object.pivot.y = .5;
        if (options.animation) {
            options.animation(object);
        }
        return object;
    }
    Entity.prototype.types.spine = spine;
    return Entity;
})(DUST.GRAPHIC.Entity, DUST.GRAPHIC.HELPERS.addToCanvas, DUST.GRAPHIC.HELPERS.setPosition, DUST.ASSETS.baseUrl, PIXI);

(function(Entity, addToCanvas, setPosition, textureFromFile, PIXI) {
    "use strict";
    function spriteFromFile(options) {
        var texture, object, objectCall;
        texture = textureFromFile(options.asset);
        object = new PIXI.Sprite(texture);
        objectCall = function() {
            addToCanvas({
                object: object,
                container: options.container.sprite || options.container,
                at: options.at
            });
        };
        object.position = setPosition({
            options: options,
            item: object
        });
        object.container = options.container;
        if (options.anchor) {
            object.anchor.x = options.anchor.x;
            object.anchor.y = options.anchor.y;
        } else {
            object.anchor.x = .5;
            object.anchor.y = .5;
        }
        if (options.scale) {
            object.scale.x = options.scale.x;
            object.scale.y = options.scale.y;
        }
        object.rotation = options.rotation;
        if (!options.disabled) {
            objectCall();
        } else {
            object.render = objectCall;
        }
        return object;
    }
    Entity.prototype.types.spriteFromFile = spriteFromFile;
    return Entity;
})(DUST.GRAPHIC.Entity, DUST.GRAPHIC.HELPERS.addToCanvas, DUST.GRAPHIC.HELPERS.setPosition, DUST.GRAPHIC.HELPERS.textureFromFile, PIXI);

(function(Entity, addToCanvas, setPosition, PIXI, requestAnimationFrame) {
    "use strict";
    function spriteFromFrame(options) {
        var object, objectCall;
        object = new PIXI.Sprite.fromFrame(options.asset);
        objectCall = function(extra) {
            addToCanvas({
                object: object,
                container: options.container.sprite || options.container,
                at: options.at
            });
            if (object.delayed) {
                requestAnimationFrame(function() {
                    if (extra) {
                        extra();
                    }
                    object.visible = true;
                    object.renderable = true;
                });
            } else {
                if (extra) {
                    extra();
                }
                object.visible = true;
                object.renderable = true;
            }
        };
        object.position = setPosition({
            options: options,
            item: object
        });
        object.delayed = options.delayed;
        object.container = options.container;
        if (options.anchor) {
            object.anchor.x = options.anchor.x;
            object.anchor.y = options.anchor.y;
        } else {
            object.anchor.x = .5;
            object.anchor.y = .5;
        }
        if (options.scale) {
            object.scale.x = options.scale.x;
            object.scale.y = options.scale.y;
        }
        object.rotation = options.rotation;
        if (!options.disabled) {
            objectCall();
        } else {
            object.renderable = false;
            object.visible = false;
            object.render = objectCall;
        }
        return object;
    }
    Entity.prototype.types.spriteFromFrame = spriteFromFrame;
    return Entity;
})(DUST.GRAPHIC.Entity, DUST.GRAPHIC.HELPERS.addToCanvas, DUST.GRAPHIC.HELPERS.setPosition, PIXI, requestAnimationFrame);

DUST.ASSETS.PROGRESS = {};

DUST.ASSETS.PROGRESS.completed = function() {
    "use strict";
    var handler = function() {
        console.log("All assets loaded");
    };
    var setHandler = function(loadHandler) {
        handler = loadHandler;
    };
    var runHandler = function() {
        handler();
    };
    return {
        runHandler: runHandler,
        setHandler: setHandler
    };
}();

DUST.ASSETS.PROGRESS.counter = function() {
    "use strict";
    var total = 0;
    var completed = 0;
    var onCounterChange = function(completed, total) {};
    var setTotal = function(list) {
        total = list.graphic.length + list.audio.length + list.audioSprite.length;
    };
    var complete = function() {
        completed += 1;
        onCounterChange(completed, total);
    };
    var allDone = function() {
        if (total === completed) {
            return true;
        }
    };
    var setCounterChange = function(counterChange) {
        onCounterChange = counterChange;
    };
    return {
        complete: complete,
        allDone: allDone,
        setTotal: setTotal,
        setCounterChange: setCounterChange
    };
}();

DUST.ASSETS.PROGRESS.next = function(counter, completed) {
    "use strict";
    return function() {
        counter.complete();
        if (counter.allDone()) {
            completed.runHandler();
        }
    };
}(DUST.ASSETS.PROGRESS.counter, DUST.ASSETS.PROGRESS.completed);

DUST.ASSETS.AUDIO = {};

DUST.ASSETS.AUDIO.load = function(next) {
    "use strict";
    return function(asset) {
        var sfx, supported = [];
        supported.push(asset);
        sfx = new Howl({
            urls: supported,
            onload: function() {
                next();
            }
        });
        sfx._muted = false;
        return {
            play: function(loop) {
                sfx.volume(1);
                sfx.loop(loop);
                sfx.play();
            },
            stop: function() {
                sfx.volume(0);
            }
        };
    };
}(DUST.ASSETS.PROGRESS.next);

DUST.ASSETS.AUDIO.loadSprite = function(next, Howl) {
    "use strict";
    return function(sprite) {
        var sfx;
        sprite.onload = function() {
            next();
        };
        sfx = new Howl(sprite);
        return {
            play: function(name) {
                sfx.play(name);
            },
            stop: function() {
                sfx.stop();
            },
            sprite: sfx._sprite
        };
    };
}(DUST.ASSETS.PROGRESS.next, Howl);

DUST.ASSETS.AUDIO.init = function(loadAudio, loadAudioSprite, baseUrl, Howler) {
    "use strict";
    var cachedSounds = {};
    var cachedSprites = [];
    var getName = function(asset) {
        return asset.split(".")[0].match(".*/(.*)")[1];
    };
    var load = function(sounds) {
        sounds.forEach(function(sound) {
            var name = getName(sound);
            cachedSounds[name] = loadAudio(baseUrl.current() + sound);
        });
    };
    var loadSprite = function(sprites) {
        sprites.forEach(function(sprite) {
            sprite.urls.forEach(function(url, key) {
                sprite.urls[key] = baseUrl.current() + url;
            });
            cachedSprites.push(loadAudioSprite(sprite));
        });
    };
    var play = function(name, loop) {
        if (cachedSounds[name]) {
            cachedSounds[name].play(loop);
        } else {
            cachedSprites.forEach(function(cachedSprite) {
                if (cachedSprite.sprite[name]) {
                    cachedSprite.play(name);
                }
            });
        }
    };
    var stop = function(name) {
        if (cachedSounds[name]) {
            cachedSounds[name].stop();
        } else {
            cachedSprites.forEach(function(cachedSprite) {
                if (cachedSprite.sprite[name]) {
                    cachedSprite.stop();
                }
            });
        }
    };
    var toggle = function() {
        var HowlerLocal = Howler || {};
        if (HowlerLocal._muted) {
            HowlerLocal.unmute();
        } else {
            HowlerLocal.mute();
        }
    };
    var mute = function() {
        var HowlerLocal = Howler || {
            mute: function() {},
            unmute: function() {}
        };
        HowlerLocal.mute();
    };
    var unmute = function() {
        var HowlerLocal = Howler || {
            mute: function() {},
            unmute: function() {}
        };
        HowlerLocal.unmute();
    };
    return {
        load: load,
        loadSprite: loadSprite,
        play: play,
        toggle: toggle,
        stop: stop,
        mute: mute,
        unmute: unmute
    };
}(DUST.ASSETS.AUDIO.load, DUST.ASSETS.AUDIO.loadSprite, DUST.ASSETS.baseUrl, Howler);

DUST.ASSETS.graphic = function(next, baseUrl, PIXI) {
    "use strict";
    return function(graphics) {
        var loader;
        graphics.forEach(function(graphic, key) {
            graphics[key] = baseUrl.current() + graphic;
        });
        loader = new PIXI.AssetLoader(graphics, true);
        loader.onProgress = next;
        loader.load();
    };
}(DUST.ASSETS.PROGRESS.next, DUST.ASSETS.baseUrl, PIXI);

DUST.ASSETS.init = function(graphic, audio, counter, baseUrl) {
    "use strict";
    var setCounter = function(list) {
        counter.setTotal(list);
    };
    var loadGraphic = function(list) {
        graphic(list);
    };
    var loadAudio = function(list) {
        audio.load(list);
    };
    var loadAudioSprite = function(list) {
        audio.loadSprite(list);
    };
    return function(settings) {
        var assetList = settings.assetList, url = settings.baseUrl;
        baseUrl.update(url);
        setCounter(assetList);
        loadAudio(assetList.audio);
        loadAudioSprite(assetList.audioSprite);
        loadGraphic(assetList.graphic);
    };
}(DUST.ASSETS.graphic, DUST.ASSETS.AUDIO.init, DUST.ASSETS.PROGRESS.counter, DUST.ASSETS.baseUrl);

DUST.init = function(graphic, resize, assets, completed) {
    "use strict";
    var gameStarted = false;
    return function(settings) {
        var viewPort = settings.viewPort, rotate = settings.rotate, game = settings.game, baseUrl = settings.baseUrl || "", assetList = settings.assetList;
        viewPort.screenToSmall = function() {
            if (gameStarted) {
                rotate.show();
            }
        };
        viewPort.screenOk = function() {
            if (gameStarted) {
                rotate.hide();
            }
        };
        var startGame = function() {
            gameStarted = true;
            game();
            resize(viewPort);
        };
        var initializeStage = function() {
            return graphic(viewPort);
        };
        var loadAssets = function() {
            assets({
                assetList: assetList,
                baseUrl: baseUrl
            });
        };
        initializeStage();
        loadAssets();
        completed.setHandler(startGame);
    };
}(DUST.GRAPHIC.init, DUST.GRAPHIC.resize, DUST.ASSETS.init, DUST.ASSETS.PROGRESS.completed);

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
