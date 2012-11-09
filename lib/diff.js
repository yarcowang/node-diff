/**
 * @file diff.js
 * @author yarco <yarco.wang@gmail.com>
 * @date 2012/11/09
 */

/**
 * simple diff
 *
 * @param string original text
 * @param string text to be compared with
 * @param object {max: <integer>, ret: <[0-2]>}, 0 for return equal lineno, 1 for return not equal lineno, 2 for html version
 * @return array
 */
module.exports = function diff(left, right, options) {
	var opts = options || {max: 40, ret: 1};

	var data = [left.split('\n'), right.split('\n')];
	var length = [data[0].length, data[1].length];
	var pos = [0, 0];
	var pos1 = [0, 0];
	var diff = [[], []];
	var p = (length[0] > length[1]) + 0;
	var i, found;

	while (pos[p] < length[p]) {
		if (data[1 - p][pos[1 - p]] === data[p][pos[p]]) {
			diff[p].push(pos[p]);
			diff[1 - p].push(pos[1 - p]);
			pos[p]++;
			pos[1 - p]++;
			pos1 = pos.concat();
		} else {
			found =  false;
			i = 0;

			while (pos1[1 - p] < length[1 - p] && i < opts.max) {
				if (data[1 - p][pos1[1 - p]] === data[p][pos1[p]]) {
					diff[p].push(pos1[p]);
					diff[1 - p].push(pos1[1 - p]);
					pos1[p]++;
					pos1[1 - p]++;
					pos = pos1.concat();
					found = true;
					break;
				} else {
					pos1[1 - p]++;
					i++;
				}
			}

			if (!found) {
				i = 0;
				pos1 = pos.concat();
				while (pos1[p] < length[p] && i < opts.max) {
					if (data[p][pos1[p]] === data[1 - p][pos1[1 - p]]) {
						diff[p].push(pos1[p]);
						diff[1 - p].push(pos1[1 - p]);
						pos1[p]++;
						pos1[1 - p]++;
						pos = pos1.concat();
						found = true;
						break;
					} else {
						pos1[p]++;
						i++;
					}
				}
			}

			if (!found) {
				pos[p]++;
				pos[1 - p]++;
				pos1 = pos.concat();
			} else {
				pos = pos1.concat();
			}
		}

		p = (length[0] - pos[0] > length[1] - pos[1]) + 0;
	}

	opts.ret = opts.ret % 3
	if (opts.ret < 1) {
		return diff;
	}

	pos = [];
	for(i = 0; i < length[0]; i++) {
		if (diff[0].indexOf(i) === -1) {
			pos.push(i);
		}
	}
	pos1 = [];
	for(i = 0; i < length[1]; i++) {
		if (diff[1].indexOf(i) === -1) {
			pos1.push(i);
		}
	}
	diff = [pos, pos1];
	if (opts.ret < 2) {
		return diff;
	}
			
	diff[0].forEach(function(lineno) {
		if (data[0][lineno] === '') {
			data[0][lineno] = '&nbsp;';
		}
		data[0][lineno] = '<span class="diff diff-remove">' + data[0][lineno] + '</span>';
	});
	diff[1].forEach(function(lineno) {
		if (data[1][lineno] === '') {
			data[1][lineno] = '&nbsp;';
		}
		data[1][lineno] = '<span class="diff diff-add">' + data[1][lineno] + '</span>';
	});

	return [data[0].join('\n'), data[1].join('\n')];
}

/* vim: set tabstop=2 shiftwidth=2 ai si noet: */

