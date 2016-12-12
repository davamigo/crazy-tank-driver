/* global module */
module.exports = function (map) {
	'use strict';

	var wallAt = function (point) {
		return map.walls.find(function (wall) {
			return wall.x === point.x
				&& wall.y === point.y;
		});
	};

	var clearTop = function (pos) {
		return pos.y > 0 &&
			!wallAt({
				x: pos.x,
				y: pos.y - 1
			});
	};

	var clearBottom = function (pos) {
		return pos.y < map.mapHeight - 1 &&
			!wallAt({
				x: pos.x,
				y: pos.y + 1
			});
	};

	var clearLeft = function (pos) {
		return pos.x > 0 &&
			!wallAt({
				x: pos.x - 1,
				y: pos.y
			});
	};

	var clearRight = function (pos) {
		return pos.x < map.mapWidth - 1 &&
			!wallAt({
				x: pos.x + 1,
				y: pos.y
			});
	};

	var clearForward = function (pos, dir) {
		return ((dir == 'top'   && clearTop(pos))
			|| (dir == 'bottom' && clearBottom(pos))
			|| (dir == 'left'   && clearLeft(pos))
			|| (dir == 'right'  && clearRight(pos)));
	};

	var clearTurnRight = function (pos, dir) {
		if (dir == 'top') {
			dir = 'right';
		} else if (dir == 'right') {
			dir = 'bottom';
		} else if (dir == 'bottom') {
			dir = 'left';
		} else  if (dir == 'left') {
			dir = 'top';
		}
		return clearForward(pos, dir);
	};

	var clearTurnLeft = function (pos, dir) {
		if (dir == 'top') {
			dir = 'left';
		} else if (dir == 'left') {
			dir = 'bottom';
		} else if (dir == 'bottom') {
			dir = 'right';
		} else  if (dir == 'right') {
			dir = 'top';
		}
		return clearForward(pos, dir);
	};

	var dir = map.you.direction,
		pos = {
			x: map.you.x,
			y: map.you.y
		},
		turn = (Math.round(Math.random() * 10) > 8),
		turnRight = Math.round(Math.random()) > 0,
		enemy = map.enemies[0];

	if (typeof enemy.direction !== 'undefined') {
		if (enemy.y < pos.y) {
			if (dir == 'bottom' || dir == 'right') {
				return 'turn-left';
			} else if (dir == 'left') {
				return 'turn-right';
			} else if (!clearForward(pos, dir) || (enemy.x == pos.x && Math.abs(pos.y - enemy.y) < map.weaponRange)) {
				return 'fire';
			} else {
				turn = false;
			}
		} else if (enemy.y > pos.y) {
			if (dir == 'top' || dir == 'left') {
				return 'turn-left';
			} else if (dir == 'right') {
				return 'turn-right';
			} else if (!clearForward(pos, dir) || (enemy.x == pos.x && Math.abs(pos.y - enemy.y) < map.weaponRange)) {
				return 'fire';
			} else {
				turn = false;
			}
		} else if (enemy.x < pos.x) {
			if (dir == 'bottom' || dir == 'right') {
				return 'turn-right';
			} else if (dir == 'top') {
				return 'turn-left';
			} else if (!clearForward(pos, dir) || (enemy.y == pos.y && Math.abs(pos.x - enemy.x) < map.weaponRange)) {
				return 'fire';
			} else {
				turn = false;
			}
		} else if (enemy.x > pos.x) {
			if (dir == 'top' || dir == 'left') {
				return 'turn-right';
			} else if (dir == 'bottom') {
				return 'turn-left';
			} else if (!clearForward(pos, dir) || (enemy.y == pos.y && Math.abs(pos.x - enemy.x) < map.weaponRange)) {
				return 'fire';
			} else {
				turn = false;
			}
		}
	} 

	if (!turn && clearForward(pos, dir)) {
		return 'forward';
	}

	if (turnRight) {
		if (clearTurnRight(pos, dir) || !clearTurnLeft(pos, dir)) {
			return 'turn-right';
		} else {
			return 'turn-left';
		}
	} else {
		if (clearTurnLeft(pos, dir) || !clearTurnRight(pos, dir)) {
			return 'turn-left';
		} else {
			return 'turn-right';
		}
	}

	return 'fire';
};

