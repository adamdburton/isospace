var skinColors = [
	'#BB876F',
	'#74453D',
	'#5C3937',
	'#DDB7A0',
	'#A67358',
	'#AD6453',
	'#F2D6CB',
	'#CE967D',
	'#AA816F',
];

Person.prototype = new Object();

function Person()
{
	this.isometric = false;
	
	this.scale = 5;
	this.speed = 1;
	
	this.setWidth(this.scale);
	this.setHeight(this.scale * 3);
	
	this.colors = [
		skinColors[random(1, skinColors.length - 1)],
		rgbToHex(random(0, 255), random(0, 255), random(0, 255)),
		rgbToHex(random(0, 255), random(0, 255), random(0, 255))
	];
	
	this.destinationTiles = [];
	this.destinationTile = null;
}

Person.prototype.getTile = function()
{
	var tile = this.parent.tileAtPosition(this.getPosition());
	
	if (!tile.active)
	{
		console.log(this.entityIndex + ' reporting inactive tile position: ' + tile.gridX + ', ' + tile.gridY);
	}
	
	return tile;
}

Person.prototype.setTile = function(tile)
{
	this.setPosition(tile.getPosition().subtract(this.parent.getPosition()));
}

Person.prototype.getPathToTile = function(tile)
{
	return this.getTile().pathTo(tile);
}

Person.prototype.setRandomDestination = function()
{
	var tile = this.getTile(), destinationTile = this.parent.getRandomTile(), currentTries = 0, maxTries = 10;
	
	while (!tile.pathExistsTo(destinationTile) && ++currentTries < maxTries)
	{
		destinationTile = this.parent.getRandomTile();
	}
	
	if (!tile.pathExistsTo(destinationTile))
	{
		//this.setTile(this.parent.getRandomTile());
		
		return false;
	}
	
	//destinationTile.color = this.colors[2];
	this.destinationTiles = this.getPathToTile(destinationTile);
	//console.log(this.destinationTiles);
	
	//for (var i = this.destinationTiles.length; i--;)
	//{
		//this.destinationTiles[i].color = ColorLuminance(this.destinationTiles[i].color, -0.01);
	//}
}

Person.prototype.onUpdate = function()
{
	if (!this.destinationTiles.length)
	{
		this.setRandomDestination();
	}
	
	if (!this.destinationTile && this.destinationTiles.length)
	{
		this.destinationTile = this.destinationTiles.shift();
	}
	
	if (this.destinationTile)
	{
		if (!this.moveTowards(this.destinationTile.getPosition(), this.speed))
		{
			return this.destinationTile = null;
		}
	}
}

Person.prototype.onDraw = function(_2d, delta)
{
	var pos = this.isoToScreen();
	
	for (var i = 0; i < 3; i++)
	{
		_2d.fillStyle = this.colors[i];
		//_2d.fillRect(pos.x, pos.y + (i * this.scale) + Math.cos(this.renderer.timer.currentTime / 500) * 2, this.scale, this.scale);
		_2d.fillRect(pos.x - (this.dimensions.x / 2), pos.y + (i * this.scale) + 10, this.scale, this.scale);
	}
}