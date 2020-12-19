// Notif
class Notif {
	defaults = {
		timeout: 5000,
		buttons: ["OK"],
		error: false,
		success: false,
		classNames: "",
	};
	close() {
		this.elem.remove();
	}
	constructor(text = "Hello", options = {}) {
		this.options = {
			...this.defaults,
			...options,
		};
		var elem = document.createElement("div");
		elem.classList.add("notif");
		elem.className += " " + this.options.classNames;
		if (this.options.error) elem.className += " notif-error";
		if (this.options.success) elem.className += " notif-success";
		elem.innerHTML = `<div class="notif-content">` + text + `</div>`;

		var buttons = `<div class="notif-buttons">`;
		for (var i in this.options.buttons) {
			buttons += `<button class="notif-button">`;
			buttons += this.options.buttons[i].toString();
			buttons += `</button>`;
		}
		buttons += `</div>`;
		elem.innerHTML += buttons;

		var elems = elem.querySelectorAll("button.notif-button");
		for (var i = elems.length - 1; i >= 0; i--) {
			elems[i].notif = this;
		}

		buttons = elem.querySelectorAll("button.notif-button");
		for (var i = buttons.length - 1; i >= 0; i--) {
			buttons[i].onclick = (e) => e.target.notif.close();
		}

		this.elem = elem;

		/* Use Notif space instead */
		var notifspace = document.querySelector(".notif-space");
		if (!(notifspace instanceof HTMLElement)) {
			var notifspace = document.createElement("div");
			notifspace.classList.add("notif-space");
			document.body.appendChild(notifspace);
		}

		notifspace.appendChild(elem);

		var _this = this;
		setTimeout(() => {
			_this.close();
		}, this.options.timeout);

		return this;
	}
}

export default Notif;
