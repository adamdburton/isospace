State.prototype = new Object();

function State(statemanager)
{
	this.statemanager = statemanager;
	
	this.isometricChildren = [];
	this.nonIsometricChildren = [];
}

State.prototype.createObject = function(type, parent)
{
	if (!parent)
	{
		parent = this.statemanager.gamemanager.renderer;
	}
	
	var object = this.statemanager.gamemanager.createObject(type, parent, this);
	
	if (object.isometric)
	{
		this.isometricChildren.push(object);
	}
	else
	{
		this.nonIsometricChildren.push(object);
	}
	
	this.sortChildrenByZIndex();
	
	return object;
}

State.prototype.sortChildrenByZIndex = function()
{
	this.isometricChildren.sort(function(a, b) { return b.zIndex - a.zIndex; } );
	this.nonIsometricChildren.sort(function(a, b) { return b.zIndex - a.zIndex; } );
}

State.prototype.update = function()
{
	for (var i = this.isometricChildren.length; i--;)
	{
		this.isometricChildren[i].update();
	}
	
	for (var i = this.nonIsometricChildren.length; i--;)
	{
		this.nonIsometricChildren[i].update();
	}
}

State.prototype.draw = function(_2d, delta)
{
	var renderer = this.statemanager.gamemanager.renderer;
	
	// Remove everything
	_2d.clearRect(0, 0, renderer.width, renderer.height);
	
	// Ismetric mode
	
	_2d.save();
		
		_2d.setTransform(1, 0.5, -1, 0.5, 0, 0);
		//_2d.scale(1, 0.5);
		//_2d.rotate(45 * Math.PI / 180);
		
		//for (var i in this.children)
		for (var i = this.isometricChildren.length; i--;)
		{
			this.isometricChildren[i].drawIsometric(_2d, delta);
		}
		
	_2d.restore();
	
	// Screen mode
	
	for (var i = this.nonIsometricChildren.length; i--;)
	{
		this.nonIsometricChildren[i].draw(_2d, delta);
	}
}