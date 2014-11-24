Space.prototype = new Object();

function Space()
{
	this.isometric = true;
	this.starsCount = 60;
	this.stars = [];
	
	this.zIndex = -10;
}

Space.prototype.onCreated = function()
{
	this.setWidth(2000);
	this.setHeight(2000);
	
	this.centerIso();
	
	for (var i = this.starsCount; i--;)
	{
		this.stars.push({
			Distance: random(200, this.getHeight() / 2),
			Angle: random(0, 360) * Math.PI / 180,
			Speed: random(1, 10) >= 5 ? random(10000, 15000) : random(-10000, -15000),
			Opacity: 'rgba(255, 255, 255, ' + random(0, 0.5) + ')',
			Size: random(2, 12)
		});
	}
	
	this.grid = this.state.createObject('Grid', this);
	this.grid.center();
}

Space.prototype.onUpdate = function()
{
	
}

Space.prototype.onDrawIsometric = function(_2d, delta)
{
	_2d.fillStyle = 'black';
	_2d.fillRect(this.getX(), this.getY(), this.getWidth(), this.getHeight());
	
	var center = this.getCenter(), timer = this.state.statemanager.gamemanager.timer;
	
	for (var i = this.starsCount; i--;)
	{
		var star = this.stars[i];
		
		_2d.fillStyle = star.Opacity;
		_2d.fillRect(center.x + Math.sin(timer.currentTime / star.Speed + star.Angle) * star.Distance, center.y + Math.cos(timer.currentTime / star.Speed + star.Angle) * star.Distance, star.Size, star.Size);
	}
}

Space.prototype.onResized = function()
{
	this.grid.center();
}