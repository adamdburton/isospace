Tile.prototype = new Object();

Tile.pathCache = [];
Tile.accessibilityCache = [];

function Tile()
{
	this.color = '#33A9C0';
	this.gapColor = '#298c9e';
	this.gap = 2;
	
	this.gridX = 0;
	this.gridY = 0;
	
	this.active = true;
	this.walkValue = 1;
}

Tile.prototype.onCreated = function()
{
	this.activeSides = {
		tl: false,
		tr: false,
		bl: false,
		br: false
	}
}

Tile.prototype.checkTilesSurrounding = function()
{
	// Top left (left)
	
	if (tile = this.parent.tileAt(this.gridX - 1, this.gridY))
	{
		if (this.active && tile.active)
		{
			this.activeSides.tl = true;
			tile.activeSides.br = true;
		}
		else
		{
			this.activeSides.tl = false;
			tile.activeSides.br = false;
		}
	}
	
	// Top right (top)
	
	if (tile = this.parent.tileAt(this.gridX, this.gridY - 1))
	{
		if (this.active && tile.active)
		{
			this.activeSides.tr = true;
			tile.activeSides.bl = true;
		}
		else
		{
			this.activeSides.tr = false;
			tile.activeSides.bl = false;
		}
	}
	
	// Bottom right (right)
	
	if (tile = this.parent.tileAt(this.gridX + 1, this.gridY))
	{
		if (this.active && tile.active)
		{
			this.activeSides.br = true;
			tile.activeSides.tl = true;
		}
		else
		{
			this.activeSides.br = false;
			tile.activeSides.tl = false;
		}
	}
	
	// Bottom left (bottom)
	
	if (tile = this.parent.tileAt(this.gridX, this.gridY + 1))
	{
		if (this.active && tile.active)
		{
			this.activeSides.bl = true;
			tile.activeSides.tr = true;
		}
		else
		{
			this.activeSides.bl = false;
			tile.activeSides.tr = false;
		}
	}
	
	return this;
}

Tile.prototype.tileAbove = function()
{
	return this.parent.tileAbove(this.gridX, this.gridY);
}

Tile.prototype.tileBelow = function()
{
	return this.parent.tileBelow(this.gridX, this.gridY);
}

Tile.prototype.tileLeft = function()
{
	return this.parent.tileLeft(this.gridX, this.gridY);
}

Tile.prototype.tileRight = function()
{
	return this.parent.tileRight(this.gridX, this.gridY);
}

Tile.prototype.tilesAround = function()
{
	return this.parent.tilesAround(this.gridX, this.gridY, true);
}

Tile.prototype.pathTo = function(targetTile)
{
	/*
	if (Tile.pathCache[this.entityIndex] && Tile.pathCache[this.entityIndex][targetTile.entityIndex])
	{
		return Tile.pathCache[this.entityIndex][targetTile.entityIndex];
	}
	
	if (Tile.pathCache[targetTile.entityIndex] && Tile.pathCache[targetTile.entityIndex][this.entityIndex])
	{
		return Tile.pathCache[targetTile.entityIndex][this.entityIndex].reverse();
	}
	*/
	
	var openList = [], closedList = [], distanceList = [], parentsList = [];
	
	openList.push(this);
	distanceList[this.entityIndex] = Math.abs(this.gridX - targetTile.gridX) + Math.abs(this.gridY - targetTile.gridY);
	
	while (openList.length)
	{
		// Sort the openList to get the closest (manhattan) tile
		openList.sort(function(a, b) { return (distanceList[a.entityIndex] || 0) - (distanceList[b.entityIndex] || 0) });
		
		// Get the first (closest) tile out
		var currentTile = openList.shift();
		
		// If the currentTile is the targetTile
		
		if (currentTile == targetTile)
		{
			var pathTiles = [currentTile];
			
			while (parentsList[currentTile.entityIndex])
			{
				pathTiles.push(parentsList[currentTile.entityIndex]);
				currentTile = parentsList[currentTile.entityIndex];
			}
			
			/*
			if (!Tile.pathCache[targetTile.entityIndex])
			{
				Tile.pathCache[targetTile.entityIndex] = [];
			}
			
			if (!Tile.pathCache[this.entityIndex])
			{
				Tile.pathCache[this.entityIndex] = [];
			}
			
			Tile.pathCache[targetTile.entityIndex][this.entityIndex] = pathTiles;
			Tile.pathCache[this.entityIndex][targetTile.entityIndex] = Tile.pathCache[targetTile.entityIndex][this.entityIndex].reverse();
			*/
			
			//console.log(distanceList);
			//return Tile.pathCache[this.entityIndex][targetTile.entityIndex];
			
			return pathTiles.reverse();
		}
		
		// currentTile is not the targetTile
		
		// Add to the closedList
		closedList[currentTile.entityIndex] = true;
		//currentTile.color = '#FF0000';
		
		// Add the tilesAround
		
		var tilesAround = currentTile.tilesAround();
		
		for (var i = tilesAround.length; i--;)
		{
			var nextTile = tilesAround[i], nextDistance = distanceList[currentTile.entityIndex] + 1, bestDistance = false;
			
			if (!closedList[nextTile.entityIndex])
			{
				// If the nextTile is not already in the openList
			
				if (openList.indexOf(nextTile) == -1)
				{
					bestDistance = true;
					openList.push(nextTile);
					distanceList[nextTile.entityIndex] = currentTile + nextTile.walkValue;
				}
				else if (distanceList[nextTile.entityIndex] && nextDistance < distanceList[nextTile.entityIndex])
				{
					bestDistance = true;
				}
				
				if (bestDistance)
				{
					parentsList[nextTile.entityIndex] = currentTile;
					distanceList[nextTile.entityIndex] = nextDistance + nextTile.walkValue;
				}
			}
		}
	}
	
	return [];
}

Tile.prototype.pathExistsTo = function(tile)
{
	if (!Tile.accessibilityCache[this.entityIndex])
	{
		Tile.accessibilityCache[this.entityIndex] = [];
	}
	
	if (!Tile.accessibilityCache[tile.entityIndex])
	{
		Tile.accessibilityCache[tile.entityIndex] = [];
	}
	
	if (Tile.accessibilityCache[this.entityIndex][tile.entityIndex] != undefined)
	{
		return Tile.accessibilityCache[this.entityIndex][tile.entityIndex];
	}
	
	if (Tile.accessibilityCache[tile.entityIndex][this.entityIndex] != undefined)
	{
		return Tile.accessibilityCache[tile.entityIndex][this.entityIndex];
	}
	
	Tile.accessibilityCache[this.entityIndex][tile.entityIndex] = this.pathTo(tile).length > 0;
	Tile.accessibilityCache[tile.entityIndex][this.entityIndex] = Tile.accessibilityCache[this.entityIndex][tile.entityIndex];
	
	return Tile.accessibilityCache[this.entityIndex][tile.entityIndex];
}

Tile.prototype.pathToOld = function(tile)
{
	var nextTile = this, pathTiles = [], loops = 0, maxLoops = this.parent.tileSize.x + this.parent.tileSize.y;
	
	while (!nextTile == tile && ++loops <= maxLoops)
	{
		nextTile.color = '#FF6600';
		
		var tilesAround = nextTile.tilesAround(), l = tilesAround.length, nearestDistance = nextTile.distanceTo(tile);
		//console.log(tilesAround);
		for (var i = tilesAround.length; i--;)
		{
			var t = tilesAround[i];
			
			if (t.distanceTo(tile) < nearestDistance)
			{
				nextTile = t;
				nearestDistance = nextTile.distanceTo(tile);
			}
		}
		
		pathTiles.push(nextTile);
	}
	
	return pathTiles.length ? pathTiles : null;
}

Tile.prototype.distanceTo = function(tile)
{
	var xD = tile.gridX - this.gridX, yD = tile.gridY - this.gridY;
	
	return Math.sqrt((xD * xD) + (yD * yD));
}

Tile.prototype.onUpdate = function()
{
	
}

Tile.prototype.onDraw = function(_2d, delta)
{
	
}

Tile.prototype.onDrawIsometric = function(_2d, delta)
{
	if (this.active)
	{
		_2d.fillStyle = this.color;
		_2d.fillRect(this.getX() + this.gap, this.getY() + this.gap, this.getWidth() - (this.gap * 2), this.getHeight() - (this.gap * 2));
	}
	
	_2d.fillStyle = this.gapColor;
	
	if (this.activeSides.tl)
	{
		//_2d.fillStyle = 'red';
		_2d.fillRect(this.getX(), this.getY() + (this.gap * 2), this.gap + 1, this.getHeight() - ((this.gap * 4)));
	}

	if (this.activeSides.tr)
	{
		//_2d.fillStyle = 'blue';
		_2d.fillRect(this.getX() + (this.gap * 2), this.getY(), this.getWidth() - (this.gap * 4), this.gap + 1);
	}

	if (this.activeSides.br)
	{
		//_2d.fillStyle = 'green';
		_2d.fillRect(this.getX() + (this.getWidth() - (this.gap + 1)), this.getY() + (this.gap * 2), this.gap + 1, this.getHeight() - ((this.gap * 4)));
	}

	if (this.activeSides.bl)
	{
		//_2d.fillStyle = 'yellow';
		_2d.fillRect(this.getX() + (this.gap * 2), this.getY() + (this.getHeight() - (this.gap + 1)), this.getWidth() - (this.gap * 4), this.gap + 1);
	}
	
	//_2d.translate(-this.position.x, -this.position.y);
	
	//_2d.translate(this.position.x, this.position.y);
}