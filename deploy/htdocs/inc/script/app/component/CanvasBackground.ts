import ReferenceDefinitions = require('lib/ReferenceDefinitions');

import ITriangle = require('app/data/interface/ITriangle');
import ISize = require('app/data/interface/ISize');

class CanvasBackground
{
	static RETINA_MULTIPLIER:number = 1;
	static ITEM_SIZE:number = 60 * CanvasBackground.RETINA_MULTIPLIER; // * 2 for Retina
	static TRIANGLES:Array<Array<number>> = [
		[0, 0, 1, 0, 0, 1],
		[1, 0, 0, 1, 1, 1],
		[0, 0, 0, 1, 1, 1],
		[0, 0, 1, 0, 1, 1]
	];

	private _progress:number = 0;
	private _extraWidth:number;

	private _canvas:HTMLCanvasElement;
	private _context:CanvasRenderingContext2D;

	private _cachedBackgroundCanvas:HTMLCanvasElement;
	private _cachedBackgroundContext:CanvasRenderingContext2D;

	private _backgroundImage:ImageData;
	private _initialSize:ISize = <ISize>{};

	private _triangles:ITriangle[] = [];

	constructor(public element:HTMLElement)
	{
		this._extraWidth = Math.round((window.innerWidth * 0.25) / CanvasBackground.ITEM_SIZE) * CanvasBackground.ITEM_SIZE;

		this._canvas = <HTMLCanvasElement>this.element.getElementsByTagName('canvas')[0];
		this._cachedBackgroundCanvas = document.createElement('canvas');

		this.setCanvasSize();

		this._cachedBackgroundCanvas.width = this._canvas.width + this._extraWidth;
		this._cachedBackgroundCanvas.height = this._canvas.height;

		this._context = this._canvas.getContext('2d');
		this._cachedBackgroundContext = this._cachedBackgroundCanvas.getContext('2d');

		this._initialSize = this.getItemCount();

		window.addEventListener('resize', () =>
		{
			this.handleWindowResize();
		});

		this.createBackground();
	}

	private handleWindowResize():void
	{
		this.setCanvasSize();
		this.setBackground();
	}

	private createBackground():void
	{
		var itemsX:number = Math.ceil(this._cachedBackgroundCanvas.width / CanvasBackground.ITEM_SIZE);
		var itemsY:number = Math.ceil(this._cachedBackgroundCanvas.height / CanvasBackground.ITEM_SIZE);

		for (var i = 0; i < itemsX; i++)
		{
			for (var j = 0; j < itemsY; j++)
			{
				this.drawTriangles(i, j);
			}
		}

		this._backgroundImage = this._cachedBackgroundContext.getImageData(0, 0, this._cachedBackgroundCanvas.width, this._cachedBackgroundCanvas.height);
		this.setBackground();
	}

	public setProgress(progress:number):void
	{
		this._progress = progress;
		this.setBackground();
	}

	public setBackground():void
	{
		this._context.clearRect(0, 0, this._cachedBackgroundCanvas.width, this._cachedBackgroundCanvas.height);
		this._context.putImageData(this._backgroundImage, (this._extraWidth - (this._extraWidth * this._progress)) * -1, 0);
	}

	private drawTriangles(xPos:number, yPos:number):void
	{
		var startX = xPos * CanvasBackground.ITEM_SIZE;
		var startY = yPos * CanvasBackground.ITEM_SIZE;

		if ((xPos % 2 == 0 && yPos % 2 == 0) || (xPos % 2 !== 0 && yPos % 2 !== 0))
		{
			this._triangles.push(this.drawTriangle(startX, startY, CanvasBackground.TRIANGLES[0]));
			this._triangles.push(this.drawTriangle(startX, startY, CanvasBackground.TRIANGLES[1]));
		}
		else
		{
			this._triangles.push(this.drawTriangle(startX, startY, CanvasBackground.TRIANGLES[2]));
			this._triangles.push(this.drawTriangle(startX, startY, CanvasBackground.TRIANGLES[3]));
		}
	}

	private drawTriangle(startX:number, startY:number, triangle:number[]):ITriangle
	{
		var returnData = <ITriangle>{};
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
	}

	private highlightRandom():void
	{
		var triangle = this.getRandomTriangle();
		this.animateTriangle(triangle);

		setTimeout(this.highlightRandom.bind(this), Math.max(2200, Math.random() * 4000));
	}

	private animateTriangle(triangle:ITriangle):void
	{
		this._context.beginPath();
		this._context.moveTo(triangle.x + (triangle.triangle[0] * CanvasBackground.ITEM_SIZE), triangle.y + (triangle.triangle[1] * CanvasBackground.ITEM_SIZE));
		this._context.lineTo(triangle.x + (triangle.triangle[2] * CanvasBackground.ITEM_SIZE), triangle.y + (triangle.triangle[3] * CanvasBackground.ITEM_SIZE));
		this._context.lineTo(triangle.x + (triangle.triangle[4] * CanvasBackground.ITEM_SIZE), triangle.y + (triangle.triangle[5] * CanvasBackground.ITEM_SIZE));
		this._context.fillStyle = '#314049';
		this._context.fill();

		var opacity = parseFloat(triangle.color.replace(/^.*,(.+)\)/, '$1'));
		var animObj:{ x:number } = {x: opacity};

		TweenLite.to(animObj, 0.2, {
			x: opacity + 0.05,
			ease: Power3.easeOut,
			onUpdate: () =>
			{
				this.drawHighlightedTriangle(triangle, animObj.x);
			}
		});

		TweenLite.to(animObj, 0.6, {
			x: opacity,
			delay: 0.2,
			ease: Power3.easeIn,
			onUpdate: () =>
			{
				this.drawHighlightedTriangle(triangle, animObj.x);
			},
			onComplete: () =>
			{
				this.setBackground();
			}
		});
	}

	private drawHighlightedTriangle(triangle:ITriangle, opacity:number):void
	{
		this.setBackground();

		this._context.beginPath();
		this._context.moveTo(triangle.x + (triangle.triangle[0] * CanvasBackground.ITEM_SIZE), triangle.y + (triangle.triangle[1] * CanvasBackground.ITEM_SIZE));
		this._context.lineTo(triangle.x + (triangle.triangle[2] * CanvasBackground.ITEM_SIZE), triangle.y + (triangle.triangle[3] * CanvasBackground.ITEM_SIZE));
		this._context.lineTo(triangle.x + (triangle.triangle[4] * CanvasBackground.ITEM_SIZE), triangle.y + (triangle.triangle[5] * CanvasBackground.ITEM_SIZE));
		this._context.fillStyle = triangle.color.replace(/[\d\.]+\)$/g, opacity.toString() + ')');
		this._context.fill();
	}

	private getRandomTriangle():ITriangle
	{
		return this._triangles[Math.floor(Math.random() * this._triangles.length)];
	}

	private getRandomColor():string
	{
		var opacity:number = Math.random() / 55;
		return Math.random() > 0.5 ? 'rgba(0,0,0,' + opacity + ')' : 'rgba(255,255,255,' + opacity + ')';
	}

	private getItemCount():ISize
	{
		return <ISize>{
			x: Math.ceil(window.innerWidth / CanvasBackground.ITEM_SIZE),
			y: Math.ceil(window.innerHeight / CanvasBackground.ITEM_SIZE)
		};
	}

	private setCanvasSize():void
	{
		this._canvas.width = window.innerWidth * CanvasBackground.RETINA_MULTIPLIER;
		this._canvas.height = window.innerHeight * CanvasBackground.RETINA_MULTIPLIER;

		this._canvas.style.width = window.innerWidth + 'px';
		this._canvas.style.height = window.innerHeight + 'px';
	}

	destruct()
	{

	}
}

export = CanvasBackground;