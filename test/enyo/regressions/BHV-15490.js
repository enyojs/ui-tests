enyo.kind({
	name: 'BHV15490',
	components: [
		{ classes: 'normal-wrapper', components: [
			{ name: 'a1', classes: 'normal-element' },
			{ name: 'a2', classes: 'translate-x-element', style: 'left: 10px; top: 10px;' },
			{ name: 'a3', classes: 'translate-y-element', style: 'left: 30px; top: 30px;' },
			{ name: 'a4', classes: 'matrix-x-element', style: 'left: 50px; top: 20px;' },
			{ name: 'a5', classes: 'matrix-y-element', style: 'left: 10px; top: 20px;' },
			{ name: 'a6', classes: 'matrix3d-x-element', style: 'left: 30px; top: 00px;' },
			{ name: 'a7', classes: 'matrix3d-y-element', style: 'top: 50px;' }
		]},
		{ classes: 'translate-x-wrapper', style: 'left: 200px; top: 0px;', components: [
			{ classes: 'relative', components: [
				{ name: 'b1', classes: 'normal-element' },
				{ name: 'b2', classes: 'translate-x-element', style: 'left: 10px; top: 10px;' },
				{ name: 'b3', classes: 'translate-y-element', style: 'left: 30px; top: 30px;' },
				{ name: 'b4', classes: 'matrix-x-element', style: 'left: 50px; top: 20px;' },
				{ name: 'b5', classes: 'matrix-y-element', style: 'left: 10px; top: 20px;' },
				{ name: 'b6', classes: 'matrix3d-x-element', style: 'left: 30px; top: 00px;' },
				{ name: 'b7', classes: 'matrix3d-y-element', style: 'top: 50px;' }
			]}
		]},
		{ classes: 'translate-y-wrapper', style: 'left: 300px; top: 20px;', components: [
			{ classes: 'relative', components: [
				{ name: 'c1', classes: 'normal-element' },
				{ name: 'c2', classes: 'translate-x-element', style: 'left: 10px; top: 10px;' },
				{ name: 'c3', classes: 'translate-y-element', style: 'left: 30px; top: 30px;' },
				{ name: 'c4', classes: 'matrix-x-element', style: 'left: 50px; top: 20px;' },
				{ name: 'c5', classes: 'matrix-y-element', style: 'left: 10px; top: 20px;' },
				{ name: 'c6', classes: 'matrix3d-x-element', style: 'left: 30px; top: 00px;' },
				{ name: 'c7', classes: 'matrix3d-y-element', style: 'top: 50px;' }
			]}
		]},
		{ classes: 'matrix-x-wrapper', style: 'left: 200px; top: 100px;', components: [
			{ classes: 'relative', components: [
				{ name: 'd1', classes: 'normal-element' },
				{ name: 'd2', classes: 'translate-x-element', style: 'left: 10px; top: 10px;' },
				{ name: 'd3', classes: 'translate-y-element', style: 'left: 30px; top: 30px;' },
				{ name: 'd4', classes: 'matrix-x-element', style: 'left: 50px; top: 20px;' },
				{ name: 'd5', classes: 'matrix-y-element', style: 'left: 10px; top: 20px;' },
				{ name: 'd6', classes: 'matrix3d-x-element', style: 'left: 30px; top: 00px;' },
				{ name: 'd7', classes: 'matrix3d-y-element', style: 'top: 50px;' }
			]}
		]},
		{ classes: 'matrix-y-wrapper', style: 'left: 300px; top: 100px;', components: [
			{ classes: 'relative', components: [
				{ name: 'e1', classes: 'normal-element' },
				{ name: 'e2', classes: 'translate-x-element', style: 'left: 10px; top: 10px;' },
				{ name: 'e3', classes: 'translate-y-element', style: 'left: 30px; top: 30px;' },
				{ name: 'e4', classes: 'matrix-x-element', style: 'left: 50px; top: 20px;' },
				{ name: 'e5', classes: 'matrix-y-element', style: 'left: 10px; top: 20px;' },
				{ name: 'e6', classes: 'matrix3d-x-element', style: 'left: 30px; top: 00px;' },
				{ name: 'e7', classes: 'matrix3d-y-element', style: 'top: 50px;' }
			]}
		]},
		{ classes: 'matrix3d-x-wrapper', style: 'left: 200px; top: 200px;', components: [
			{ classes: 'relative', components: [
				{ name: 'f1', classes: 'normal-element' },
				{ name: 'f2', classes: 'translate-x-element', style: 'left: 10px; top: 10px;' },
				{ name: 'f3', classes: 'translate-y-element', style: 'left: 30px; top: 30px;' },
				{ name: 'f4', classes: 'matrix-x-element', style: 'left: 50px; top: 20px;' },
				{ name: 'f5', classes: 'matrix-y-element', style: 'left: 10px; top: 20px;' },
				{ name: 'f6', classes: 'matrix3d-x-element', style: 'left: 30px; top: 00px;' },
				{ name: 'f7', classes: 'matrix3d-y-element', style: 'top: 50px;' }
			]}
		]},
		{ classes: 'matrix3d-y-wrapper', style: 'left: 300px; top: 200px;', components: [
			{ classes: 'relative', components: [
				{ name: 'g1', classes: 'normal-element' },
				{ name: 'g2', classes: 'translate-x-element', style: 'left: 10px; top: 10px;' },
				{ name: 'g3', classes: 'translate-y-element', style: 'left: 30px; top: 30px;' },
				{ name: 'g4', classes: 'matrix-x-element', style: 'left: 50px; top: 20px;' },
				{ name: 'g5', classes: 'matrix-y-element', style: 'left: 10px; top: 20px;' },
				{ name: 'g6', classes: 'matrix3d-x-element', style: 'left: 30px; top: 00px;' },
				{ name: 'g7', classes: 'matrix3d-y-element', style: 'top: 50px;' }
			]}
		]}
	]
});

function test() {
	var result = true,
		base = 'bHV15490_';
	
	['a','b','c','d','e','f','g'].forEach(function(l) {
		for(var n = 1; n < 8; n++) {
			var id = base+l+n,
			en = enyo.$[id],
			nat = en.hasNode(),
			tmp;
	
			tmp = compareBounds(en, nat);
			if(!tmp) {
				console.log(id + " failed");
			}
			result = result && tmp;
		}
	});
	return result;
}

// TODO: Fix for IE8 compatibility.
function compareBounds(en, nat) {
	var bodyBounds = document.body.getBoundingClientRect(),
		a = en.getAbsoluteBounds(),
		b = nat.getBoundingClientRect();

	return (a.top == b.top)
		&& (a.left == b.left)
		&& (a.width == b.width)
		&& (a.height == b.height)
		&& (a.bottom == (bodyBounds.bottom - b.bottom))
		&& (a.right == (bodyBounds.right - b.right));
}
