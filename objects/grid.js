Grid.prototype = new Object();

function Grid()
{
	this.tileSize = new Point(48, 48);
	
	this.tilesWide = 16;
	this.tilesTall = 16;
	
	this.tiles = [];
}

Grid.prototype.onCreated = function()
{
	this.setSize(new Point(this.tilesWide * this.tileSize.x, this.tilesTall * this.tileSize.y));
	
	for (var x = 0; x < this.tilesWide; x++)
	{
		this.tiles[x] = [];
		
		for (var y = 0; y < this.tilesTall; y++)
		{
			var tile = this.renderer.create('Tile', this);
			
			tile.setSize(this.tileSize);
			tile.setPosition(new Point(x * this.tileSize.x, y * this.tileSize.y));
			
			tile.active = random(0, 10) > 2;
			
			//if(tile.active)
			//{
			//	if (random(0, 10) > 5)
			//	{
			//		tile.walkValue = 5;
			//		tile.color = '#333';
			//	}
			//}
			
			tile.gridX = x;
			tile.gridY = y;
			
			this.tiles[x][y] = tile;
			
			tile.checkTilesSurrounding();
		}
	}
	
	// Put some random people on the grid
	
	for (var i = 5000; i--;)
	{
		var person = this.renderer.create('Person', this);
		person.speed = random(20, 40);
		
		var randomTile = this.getRandomTile();
		//randomTile.color = '#FF6600';
		
		person.setTile(randomTile);
		person.setRandomDestination();
		
		//person.getTile().tileAbove().color = 'red';
		//person.getTile().tileBelow().color = 'green';
		//person.getTile().tileRight().color = 'blue';
		//person.getTile().tileLeft().color = 'yellow';
		
		/*
		//console.log(randomTile.isSameAs(person.getTile()));
		
		//person.getTile().color = '#0000FF';
		
		var randomDestinationTile = this.getRandomTile();
		
		var pathTiles = person.getPathToTile(randomDestinationTile), l = pathTiles.length;
		
		while (l-- >= 0)
		{
			pathTiles[l].color = '#00FF00';
		}
		
		randomDestinationTile.color = '#FF0000';
		
		//console.log('a', person.getTile().distanceTo(this.getRandomTile()));
		*/
	}
}

Grid.prototype.getRandomTile = function()
{
	var tile = null, active = false;
	
	while (!active)
	{
		tile = this.tiles[random(0, this.tilesTall)][random(0, this.tilesWide)];
		active = tile.active;
	}
	
	return tile;
}

Grid.prototype.getFurthestTile = function(tile)
{
	var canMove = true, furthestTile = tile;
	
	while (canMove)
	{
		
	}
	
	return furthestTile;
}

Grid.prototype.tileAtPosition = function(point)
{
	point = point.subtract(this.getPosition()).add(new Point(5, 5));
	
	var x = clamp(Math.floor(point.x / this.tileSize.x), 0, this.tilesWide * this.tileSize.x);
	var y = clamp(Math.floor(point.y / this.tileSize.y), 0, this.tilesTall * this.tileSize.y);
	
	var tile = this.tileAt(x, y);
	
	if (!tile)
	{
		console.log(point.x, point.y);
	}
	
	return tile;
}

Grid.prototype.tileAt = function(x, y)
{
	return (this.tiles[x] && this.tiles[x][y]) ? this.tiles[x][y] : null;
}

Grid.prototype.tileAbove = function(x, y)
{
	return this.tileAt(x, y - 1);
}

Grid.prototype.tileBelow = function(x, y)
{
	return this.tileAt(x, y + 1);
}

Grid.prototype.tileLeft = function(x, y)
{
	return this.tileAt(x - 1, y);
}

Grid.prototype.tileRight = function(x, y)
{
	return this.tileAt(x + 1, y);
}

Grid.prototype.tilesAround = function(x, y, onlyActive)
{
	var tiles = [];
	
	var tile = this.tileAbove(x, y);
	
	if (tile && (!onlyActive || onlyActive && tile.active))
	{
		tiles.push(tile);
	}
	
	var tile = this.tileRight(x, y);
	
	if (tile && (!onlyActive || onlyActive && tile.active))
	{
		tiles.push(tile);
	}
	
	var tile = this.tileBelow(x, y);
	
	if (tile && (!onlyActive || onlyActive && tile.active))
	{
		tiles.push(tile);
	}
	
	var tile = this.tileLeft(x, y);
	
	if (tile && (!onlyActive || onlyActive && tile.active))
	{
		tiles.push(tile);
	}
	
	return tiles;
}

Grid.prototype.onUpdate = function(delta)
{
	//this.center();
}

Grid.prototype.onDraw = function(_2d)
{
	
}

Grid.prototype.onDrawIsometric = function(_2d)
{
	//_2d.fillStyle = 'orange';
	//_2d.fillRect(this.getX(), this.getY(), this.getWidth(), this.getHeight());
	
	var mouseIso = this.renderer.screenToIso(this.renderer.mouse);
	
	_2d.fillStyle = 'red';
	_2d.fillRect(mouseIso.x - 2, mouseIso.y - 2, 4, 4);
}