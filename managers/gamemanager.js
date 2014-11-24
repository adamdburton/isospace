function GameManager()
{
	this.timer = new Timer();
	this.renderer = new Renderer(this);
	this.statemanager = new StateManager(this);
	
	this.shouldRun = true;
	
	this.nextEntityIndex = 1;
	this.nextGameWorldUpdateTime = 0;
}

GameManager.prototype.createObject = function(object, parent, state)
{
	if (!window[object])
	{
		console.log('Attempt to create unknown entity type ' + object + '!');
		return;
	}
	
	var obj = new window[object]();
	obj.entityIndex = ++this.nextEntityIndex;
	obj.parent = parent;
	obj.state = state;
	
	obj.onCreated();
	
	return obj;
}

// Internals

GameManager.prototype.run = function()
{
	if (!this.shouldRun) { return; }
	
	window.requestAnimFrame(this.run.bind(this));
	
	this.timer.update();
	
	var currentTime = this.timer.currentTime;
	
	if (currentTime >= this.nextGameWorldUpdateTime)
	{
		this.nextGameWorldUpdateTime = currentTime + (1 / 30);
		
		this.update();
	}
	
	this.draw();
}

GameManager.prototype.start = function()
{
	this.shouldRun = true;
	
	this.timer.reset();
	this.run();
}

GameManager.prototype.stop = function()
{
	this.shouldRun = false;
}

GameManager.prototype.update = function()
{
	if (!this.shouldRun) { return; }
	
	this.statemanager.update();
}

GameManager.prototype.draw = function()
{
	if (!this.shouldRun) { return; }
	
	this.statemanager.draw(this.renderer._2d, this.timer.deltaTime);
}