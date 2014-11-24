function Point(x, y)
{
	//this.x = Math.round(x);
	//this.y = Math.round(y);
	
	this.x = x;
	this.y = y;
}

Point.prototype.setX = function(x)
{
	//this.x = Math.round(x);
	
	this.x = x
}

Point.prototype.setY = function(y)
{
	//this.y = Math.round(y);
	
	this.y = y;
}

Point.prototype.add = function(point)
{
	return new Point(this.x + point.x, this.y + point.y);
}

Point.prototype.subtract = function(point)
{
	return new Point(this.x - point.x, this.y - point.y);
}

Point.prototype.multiply = function(multiplier)
{
	return new Point(this.x * multiplier, this.y * multiplier);
}

Point.prototype.divide = function(divisor)
{
	return new Point(this.x / divisor, this.y / divisor);
}

Point.prototype.equals = function(point)
{
	return Math.ceil(this.x, 2) == Math.ceil(point.x, 2) && Math.ceil(this.y, 2) == Math.ceil(point.y, 2);
}

Point.prototype.toScreen = function()
{
	return isoToScreen(this);
}

Point.prototype.toIso = function()
{
	return screenToIso(this);
}

Point.prototype.normalize = function()
{
	var hyp = Math.sqrt(this.x * this.x + this.y * this.y);
	
	return new Point(this.x /= hyp, this.y /= hyp);
}

Point.prototype.distance = function(point)
{
	var deltaX = Math.abs(point.x - this.x);
	var deltaY = Math.abs(point.y - this.y);
	
	return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}