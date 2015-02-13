define(["require", "exports"], function (require, exports) {
    var CanvasBackground = (function () {
        function CanvasBackground(element) {
            this.element = element;
            this._progress = 0;
            this._triangles = [];
            this._extraWidth = Math.round((window.innerWidth * 0.25) / CanvasBackground.ITEM_SIZE) * CanvasBackground.ITEM_SIZE;
            this._canvas = this.element.getElementsByTagName('canvas')[0];
            this._cachedBackgroundCanvas = document.createElement('canvas');
            this._canvas.width = window.innerWidth * CanvasBackground.RETINA_MULTIPLIER;
            this._canvas.height = window.innerHeight * CanvasBackground.RETINA_MULTIPLIER;
            this._cachedBackgroundCanvas.width = this._canvas.width + this._extraWidth;
            this._cachedBackgroundCanvas.height = this._canvas.height;
            this._canvas.style.width = window.innerWidth + 'px';
            this._canvas.style.height = window.innerHeight + 'px';
            this._context = this._canvas.getContext('2d');
            this._cachedBackgroundContext = this._cachedBackgroundCanvas.getContext('2d');
            this.handleWindowResize();
        }
        CanvasBackground.prototype.handleWindowResize = function () {
            var xItems = Math.ceil(this._cachedBackgroundCanvas.width / CanvasBackground.ITEM_SIZE);
            var yItems = Math.ceil(this._cachedBackgroundCanvas.height / CanvasBackground.ITEM_SIZE);
            for (var i = 0; i < xItems; i++) {
                for (var j = 0; j < yItems; j++) {
                    this.drawTriangles(i, j);
                }
            }
            this.setBackground();
        };
        CanvasBackground.prototype.setProgress = function (progress) {
            this._progress = progress;
            this.setBackground();
        };
        CanvasBackground.prototype.setBackground = function () {
            var imageData = this._cachedBackgroundContext.getImageData(this._extraWidth - (this._extraWidth * this._progress), 0, this._canvas.width, this._cachedBackgroundCanvas.height);
            this._context.clearRect(0, 0, this._cachedBackgroundCanvas.width, this._cachedBackgroundCanvas.height);
            this._context.putImageData(imageData, 0, 0);
        };
        CanvasBackground.prototype.drawTriangles = function (xPos, yPos) {
            var startX = xPos * CanvasBackground.ITEM_SIZE;
            var startY = yPos * CanvasBackground.ITEM_SIZE;
            if ((xPos % 2 == 0 && yPos % 2 == 0) || (xPos % 2 !== 0 && yPos % 2 !== 0)) {
                this._triangles.push(this.drawTriangle(startX, startY, CanvasBackground.TRIANGLES[0]));
                this._triangles.push(this.drawTriangle(startX, startY, CanvasBackground.TRIANGLES[1]));
            }
            else {
                this._triangles.push(this.drawTriangle(startX, startY, CanvasBackground.TRIANGLES[2]));
                this._triangles.push(this.drawTriangle(startX, startY, CanvasBackground.TRIANGLES[3]));
            }
        };
        CanvasBackground.prototype.drawTriangle = function (startX, startY, triangle) {
            var returnData = {};
            returnData.x = startX;
            returnData.y = startY;
            returnData.color = this.getRandomColor();
            returnData.triangle = triangle;
            this._cachedBackgroundContext.beginPath();
            this._cachedBackgroundContext.moveTo(startX + (triangle[0] * CanvasBackground.ITEM_SIZE), startY + (triangle[1] * CanvasBackground.ITEM_SIZE));
            this._cachedBackgroundContext.lineTo(startX + (triangle[2] * CanvasBackground.ITEM_SIZE), startY + (triangle[3] * CanvasBackground.ITEM_SIZE));
            this._cachedBackgroundContext.lineTo(startX + (triangle[4] * CanvasBackground.ITEM_SIZE), startY + (triangle[5] * CanvasBackground.ITEM_SIZE));
            this._cachedBackgroundContext.fillStyle = returnData.color;
            this._cachedBackgroundContext.fill();
            return returnData;
        };
        CanvasBackground.prototype.highlightRandom = function () {
            var triangle = this.getRandomTriangle();
            this.animateTriangle(triangle);
            setTimeout(this.highlightRandom.bind(this), Math.max(2200, Math.random() * 4000));
        };
        CanvasBackground.prototype.animateTriangle = function (triangle) {
            var _this = this;
            this._context.beginPath();
            this._context.moveTo(triangle.x + (triangle.triangle[0] * CanvasBackground.ITEM_SIZE), triangle.y + (triangle.triangle[1] * CanvasBackground.ITEM_SIZE));
            this._context.lineTo(triangle.x + (triangle.triangle[2] * CanvasBackground.ITEM_SIZE), triangle.y + (triangle.triangle[3] * CanvasBackground.ITEM_SIZE));
            this._context.lineTo(triangle.x + (triangle.triangle[4] * CanvasBackground.ITEM_SIZE), triangle.y + (triangle.triangle[5] * CanvasBackground.ITEM_SIZE));
            this._context.fillStyle = '#314049';
            this._context.fill();
            var opacity = parseFloat(triangle.color.replace(/^.*,(.+)\)/, '$1'));
            var animObj = { x: opacity };
            TweenLite.to(animObj, 0.2, {
                x: opacity + 0.05,
                ease: Power3.easeOut,
                onUpdate: function () {
                    _this.drawHighlightedTriangle(triangle, animObj.x);
                }
            });
            TweenLite.to(animObj, 0.6, {
                x: opacity,
                delay: 0.2,
                ease: Power3.easeIn,
                onUpdate: function () {
                    _this.drawHighlightedTriangle(triangle, animObj.x);
                },
                onComplete: function () {
                    _this.setBackground();
                }
            });
        };
        CanvasBackground.prototype.drawHighlightedTriangle = function (triangle, opacity) {
            this.setBackground();
            this._context.beginPath();
            this._context.moveTo(triangle.x + (triangle.triangle[0] * CanvasBackground.ITEM_SIZE), triangle.y + (triangle.triangle[1] * CanvasBackground.ITEM_SIZE));
            this._context.lineTo(triangle.x + (triangle.triangle[2] * CanvasBackground.ITEM_SIZE), triangle.y + (triangle.triangle[3] * CanvasBackground.ITEM_SIZE));
            this._context.lineTo(triangle.x + (triangle.triangle[4] * CanvasBackground.ITEM_SIZE), triangle.y + (triangle.triangle[5] * CanvasBackground.ITEM_SIZE));
            this._context.fillStyle = triangle.color.replace(/[\d\.]+\)$/g, opacity.toString() + ')');
            this._context.fill();
        };
        CanvasBackground.prototype.getRandomTriangle = function () {
            return this._triangles[Math.floor(Math.random() * this._triangles.length)];
        };
        CanvasBackground.prototype.getRandomColor = function () {
            var opacity = Math.random() / 55;
            return Math.random() > 0.5 ? 'rgba(0,0,0,' + opacity + ')' : 'rgba(255,255,255,' + opacity + ')';
        };
        CanvasBackground.prototype.destruct = function () {
        };
        CanvasBackground.RETINA_MULTIPLIER = 1;
        CanvasBackground.ITEM_SIZE = 60 * CanvasBackground.RETINA_MULTIPLIER; // * 2 for Retina
        CanvasBackground.TRIANGLES = [
            [0, 0, 1, 0, 0, 1],
            [1, 0, 0, 1, 1, 1],
            [0, 0, 0, 1, 1, 1],
            [0, 0, 1, 0, 1, 1]
        ];
        return CanvasBackground;
    })();
    return CanvasBackground;
});
