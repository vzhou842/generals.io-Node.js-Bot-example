var io = require('socket.io-client');

var socket = io('http://localhost:8080');

socket.on('disconnect', function() {
	console.error('Disconnected from server.');
	process.exit(1);
});

socket.on('connect', function() {
	console.log('Connected to server.');

	/* Don't lose this user_id or let other people see it!
	 * Anyone with your user_id can play on your bot's account and pretend to be your bot.
	 * If you plan on open sourcing your bot's code (which we strongly support), we recommend
	 * replacing this line with something that instead supplies the user_id via an environment
	 * variable, e.g.
	 * var user_id = process.env.BOT_USER_ID;
	 */
	var user_id = 'my_example_bot_id';
	var username = 'Example Bot';

	// Set the username for the bot.
	socket.emit('set_username', user_id, username);

	// Join a custom game and force start immediately.
	// Custom games are a great way to test your bot while you develop it because you can play against your bot!
	var custom_game_id = 'my_private_game';
	socket.emit('join_private', custom_game_id, username, user_id);
	socket.emit('set_force_start', custom_game_id, true);
	console.log('Joined custom game at http://bot.generals.io/games/' + encodeURIComponent(custom_game_id));

	// When you're ready, you can have your bot join other game modes.
	// Here are some examples of how you'd do that:

	// Join the 1v1 queue.
	// socket.emit('join_1v1', username, user_id);

	// Join the FFA queue.
	// socket.emit('play', username, user_id);

	// Join a 2v2 team.
	// socket.emit('join_team', 'team_name', username, user_id);
});