function Object()
{
	this.parent;
	this.state;
	
	this.position = new Point(0, 0);
	this.dimensions = new Point(0, 0);
	
	this.speed = 0;
	
	this.isometric = true;
	this.renderedManually = false;
	this.zIndex = 0;
}

Object.prototype.add = function(child)
{
	child.parent = this;
	child.state = this.state;
}

Object.prototype.isInParentBounds = function()
{
	if (!this.parent) { return true; }
	
	var position = this.position;
	var parentPosition = this.parent.position;
	var parentDimensions = this.parent.dimensions;
	
	return position.x >= parentPosition.x && position.x <= parentPosition.x + parentDimensions.x && position.y >= parentPosition.y && position.y <= parentPosition.y + parentDimensions.y;
}

Object.prototype.setPosition = function(point)
{
	this.position = point;
	
	return this;
}

Object.prototype.getPosition = function()
{
	var object = this, parent = object.parent, x = this.position.x, y = this.position.y;
	
	while (parent)
	{
		x += parent.position.x;
		y += parent.position.y;
		
		object = parent.parent;
		parent = object;
	}
	
	return new Point(x, y);
}

Object.prototype.getLocalPosition = function()
{
	return this.position; // Offset from parent, really
}

Object.prototype.moveTowards = function(point, speed)
{
	if (this.getPosition().distance(point) < 2)
	{
		return false;
	}
	
	var direction = point.subtract(this.getPosition());
	
	var norm = direction.normalize().multiply(speed);
	
	this.position.x += norm.x;
	this.position.y += norm.y;
	
	return true;
}

Object.prototype.setSize = function(point)
{
	this.dimensions = point;
	this.resize();
	
	return this;
}

Object.prototype.getSize = function(point)
{
	return this.dimensions;
}

// Utils

Object.prototype.setX = function(x)
{
	this.position.x = x;
	
	return this;
}

Object.prototype.setY = function(y)
{
	this.position.y = y;
	
	return this;
}

Object.prototype.getX = function()
{
	return this.getPosition().x;
}

Object.prototype.getY = function()
{
	return this.getPosition().y;
}

Object.prototype.setWidth = function(width)
{
	this.dimensions.x = width;
	
	return this;
}

Object.prototype.setHeight = function(height)
{
	this.dimensions.y = height;
	
	return this;
}

Object.prototype.getWidth = function()
{
	return this.dimensions.x;
}

Object.prototype.getHeight = function()
{
	return this.dimensions.y;
}

//

Object.prototype.getMouseOffset = function()
{
	var mouse = this.state.statemanager.gamemanager.renderer.mouse;
	
	return new Point(mouse.x - this.getX(), mouse.Y - this.getY());
}

Object.prototype.dropToFloor = function()
{
	if (this.parent)
	{
		this.setY(this.parent.dimensions.y - this.dimensions.y);
	}
}

Object.prototype.getCenter = function()
{
	return new Point(this.getX() + (this.dimensions.x / 2), this.getY() + (this.dimensions.y / 2));
}

Object.prototype.getLocalCenter = function()
{
	return new Point(this.dimensions.x / 2, this.dimensions.y / 2);
}

Object.prototype.center = function()
{
	this.centerX();
	this.centerY();
}

Object.prototype.centerX = function()
{
	var center = this.getLocalCenter();
	var parentCenter = this.parent.getLocalCenter();
	
	this.position.x = parentCenter.x - center.x;
}

Object.prototype.centerY = function()
{
	var center = this.getLocalCenter();
	var parentCenter = this.parent.getLocalCenter();
	
	this.position.y = parentCenter.y - center.y;
}

Object.prototype.centerIso = function()
{
	var center = isoToScreen(this.getCenter());
	var parentCenter = this.parent.getCenter();
	
	this.position = new Point(parentCenter.x - center.x, parentCenter.y - center.y).toIso();
}

Object.prototype.screenToIso = function()
{
	return screenToIso(this.getPosition()).subtract(this.getPosition());
}

Object.prototype.isoToScreen = function()
{
	return isoToScreen(this.getPosition());
}

Object.prototype.is = function(object)
{
	return this.entityIndex == object.entityIndex;
}

// Internals

Object.prototype.update = function()
{
	this.onUpdate();
}

Object.prototype.draw = function(_2d)
{
	if (this.renderedManually) { return; }
	
	this.onDraw(_2d);
}

Object.prototype.drawIsometric = function(_2d)
{
	if (this.renderedManually) { return; }
	
	this.onDrawIsometric(_2d);
}

Object.prototype.resize = function()
{
	this.onResize();
}

Object.prototype.resized = function()
{
	this.onResized();
}

// To override

Object.prototype.onCreated = function()
{
	
}

Object.prototype.onUpdate = function()
{
	
}

Object.prototype.onDraw = function(_2d, delta)
{
	
}

Object.prototype.onDrawIsometric = function(_2d, delta)
{
	
}

Object.prototype.onResize = function() // When the objects dimensions are changed
{
	
}

Object.prototype.onResized = function() // When the renderers dimensions are changed
{
	
}