import ReferenceDefinitions = require('lib/ReferenceDefinitions');

import CanvasBackground = require('app/component/CanvasBackground');
import Homepage = require('app/component/Homepage');

class Main
{

	static SINGLE_PAGE_DURATION:number = 4;

	private _background:CanvasBackground;
	private _homepage:Homepage;

	private _mainTl:TimelineLite;
	private _slides:HTMLElement[];
	private _progress:number = 0;
	private _scrolling:boolean = false;
	private _currentY:number = 0;
	private _targetY:number = 0;
	private _lastY:number = 0;

	constructor()
	{
		this.setMailtoLink();

		this._background = new CanvasBackground(<HTMLElement>document.querySelector('.canvas-background'));
		this._homepage = new Homepage(<HTMLElement>document.querySelector('.page-home'));

		this._slides = Array.prototype.slice.call(document.querySelectorAll('.page'));

		this.createMainTimeline();
		this.addScrollEvent();
	}

	private setMailtoLink():void
	{
		var link = <HTMLElement>document.querySelector('.mailto');
		link.innerHTML = link.innerHTML.split('').reverse().join('');
		link.setAttribute('href', link.getAttribute('href').split('').reverse().join(''));
	}

	private addScrollEvent():void
	{
		/*
		 var draggable:Draggable = Draggable.create(document.body, {
		 type: 'scroll',
		 edgeResistance: 0.98,
		 throwProps: true,
		 onDrag: () =>
		 {
		 // TODO: See if drag is over the end
		 }
		 })[0];

		 draggable.scrollProxy.content.style.height = '100%';
		 */

		window.addEventListener('scroll', () =>
		{
			this.handleScroll();
		}, false);
	}

	private handleScroll():void
	{
		this._targetY = document.body.scrollTop;

		if (!this._scrolling)
		{
			this._scrolling = true;
			requestAnimationFrame((time) =>
			{
				this.easeToScroll(time);
			});
		}
	}

	private easeToScroll(time:number):void
	{
		var diff = (this._targetY - this._currentY);
		this._currentY += diff / 6;

		this.setProgress();

		this._lastY = this._currentY;

		if (Math.abs(diff) > 0.0001)
		{
			requestAnimationFrame((time) =>
			{
				this.easeToScroll(time);
			});
		}
		else
		{
			console.log(' >> STOP', this._currentY, this._targetY);
			this._scrolling = false;
		}
	}

	private setProgress():void
	{
		//console.log(' >> SCROLL', this._currentY, this._targetY);
		var scrollHeight = document.body.scrollHeight - window.innerHeight;
		var progress = Math.max(0, Math.min(1, this._currentY / scrollHeight));
		if (progress !== this._progress)
		{
			this._mainTl.seek(this._mainTl.duration() * progress, false);
			this._progress = progress;

			this._background.setProgress(progress);
			this._homepage.update(progress);
		}
		/*
		var progress = Math.max(0, Math.min(1, document.body.scrollTop / scrollHeight));
		if (progress !== this._progress)
		{
			this._mainTl.seek(this._mainTl.duration() * progress, false);
			this._progress = progress;

			this._background.setProgress(progress);
			this._homepage.update(progress);
		}
		*/
	}

	private createMainTimeline():void
	{
		this._mainTl = new TimelineLite({
			paused: true
		});

		var delay:number = 0;

		this._slides.forEach((element, i) =>
		{
			var duration = i == 0 || i == this._slides.length - 1 ? Main.SINGLE_PAGE_DURATION / 2 : Main.SINGLE_PAGE_DURATION;

			this._mainTl.to(element, duration, {
				left: i == this._slides.length - 1 ? '0%' : '80%',
				ease: Linear.easeNone,
				onUpdateParams: ['{self}'],
				onUpdate: (timelineItem:TimelineLite) =>
				{
					element.style.visibility = 'visible';
				},
				onComplete: () =>
				{
					if (i !== this._slides.length - 1)
					{
						element.style.visibility = 'hidden';
					}
				}
			}, delay);

			// Fade in From Left
			if (i !== 0)
			{
				this._mainTl.from(element, Main.SINGLE_PAGE_DURATION * 0.25, { opacity: 0, ease: Linear.easeNone }, delay);
			}

			// Fade out to Right
			if (i !== this._slides.length - 1)
			{
				var extraDuration = i == 0 ? 0.25 : 0.75;
				this._mainTl.to(element, Main.SINGLE_PAGE_DURATION * 0.25, { opacity: 0, ease: Linear.easeNone }, delay + (Main.SINGLE_PAGE_DURATION * extraDuration));
			}

			delay += duration - (Main.SINGLE_PAGE_DURATION / 2);
		});
	}

}

export = Main;