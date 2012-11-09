var diff = require('..');

describe('diff', function() {
	var left = '鹅鹅鹅\n曲项向天歌\n白毛浮绿水\n红枣拨清波.\n';
	var right = '鹅,鹅,鹅\n曲项向天歌\n白毛浮绿水\n红掌拨清波.\n';

	it('should pass the test', function() {
		diff(left, right, {max:40, ret:0}).should.eql([[1,2,4],[1,2,4]]);
		diff(left, right, {max:40, ret:1}).should.eql([[0,3],[0,3]]);
		diff(left, right, {max:40, ret:2})[0].should.eql('<span class="diff diff-remove">鹅鹅鹅</span>\n曲项向天歌\n白毛浮绿水\n<span class="diff diff-remove">红枣拨清波.</span>\n');
	});
});
