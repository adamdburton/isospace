Renderer.prototype = new Object();

function Renderer(gamemanager)
{
	this.gamemanager = gamemanager;
	this.mouse = new Point(0, 0);
	
	this.element = document.createElement('canvas');
	
	this.element.setAttribute('width', this.element.width = this.dimensions.x = window.innerWidth);
	this.element.setAttribute('height', this.element.height = this.dimensions.y = window.innerHeight);
	
	document.body.appendChild(this.element); 
	
	this._2d = this.element.getContext('2d');
	
	var t = this;
	
	window.onresize = function()
	{
		t.resized();
	}
	
	window.onfocus = function()
	{
		t.focus();
	}

	window.onblur = function()
	{
		t.blur();
	}
	
	window.onmousemove = function(e)
	{
		t.mousemove(e.clientX, e.clientY);
	}
	
	this.width = this.element.width;
	this.height = this.element.height;
}

Renderer.prototype.focus = function()
{
	this.gamemanager.start();
}

Renderer.prototype.blur = function()
{
	this.gamemanager.stop();
}

Renderer.prototype.resized = function()
{
	this.element.width = this.dimensions.x = window.innerWidth;
	this.element.height = this.dimensions.y = window.innerHeight;
	
	this.width = this.element.width;
	this.height = this.element.height;
	
	this.gamemanager.statemanager.resized(this.width, this.height);
}

Renderer.prototype.mousemove = function(x, y)
{
	this.mouse.x = x;
	this.mouse.y = y;
}