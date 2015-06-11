enyo.kind({
	name: "test.GT-11155-DirectPopupHide",
	classes: "moon enyo-unselectable enyo-fit",
	components: [
		{kind: "moon.Divider", content: "Popups"},
		{classes: "moon-hspacing moon-vspacing-s", components: [
			{kind: "moon.Button", content: "Direct Popup", ontap: "showPopup", popup: "directPopup", direct: true},
		]},
		// The directPopup only works when we programmatically call "showDirect" or "hideDirect". So, we set autoDismiss as false here.
		{name: "directPopup", kind: "moon.Popup", autoDismiss: false, components: [
			{content: "Direct Popup"},
			{kind: "moon.Button", content: "Hide Direct", ontap: "hidePopup", popup: "directPopup", direct: true}
		]}
	],
	popupActivator: null,
	showPopup: function(inSender) {
		var p = this.$[inSender.popup];
		if (p) {
			if(inSender.direct) {
				p.showDirect();
			} else {
				p.show();
			}
		}
	},
	hidePopup: function(inSender) {
		var p = this.$[inSender.popup];
		if(p) {
			if(inSender.direct) {
				p.hideDirect();
			} else {
				p.hide();
			}
		}
	}
});
