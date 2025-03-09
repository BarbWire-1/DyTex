class DyTex {
	constructor (parent = document.body) {
		this.parent = parent;
	}

	defineVariables(variables) {
		Object.entries(variables).forEach(([ prop, value ]) => {
			this.defineReactive(prop, value);
		});
		this.scanForPlaceholders();
	}
	// create getter/setter for the reactive variables
	defineReactive(prop, value) {
		Object.defineProperty(this, prop, {
			get: () => value,
			set: (newValue) => {
				value = newValue;
				this.updateElements(prop, newValue);
			}
		});
	}
	// replaces textContent in spans with corresponding data-attribute
	updateElements(prop, newValue) {
		const elements = this.parent.querySelectorAll(`[data-dytex-${prop}]`);
		elements.forEach((element) => {
			element.textContent = newValue;
		});
	}
	// on init scan the parent container for text holding variables in {{varName}}
	scanForPlaceholders() {
		const elements = this.parent.querySelectorAll("*");
		elements.forEach((element) => {
			this.wrapPlaceholders(element);
		});
	}
	// easier than using fragments as modifies in place
	// replacing variableNames with spans holding a data-attribute
	wrapPlaceholders(element) {
		let updatedText = element.innerHTML;
		const regex = /{{(\w+)}}/g;
		let match;
		while ((match = regex.exec(updatedText))) {
			const propName = match[ 1 ];
			if (this[ propName ]) {
				updatedText = updatedText.replace(
					match[ 0 ],
					`<span class="dytex" data-dytex-${propName}="">${this[ propName ]}</span>`
				);
			}
		}
		element.innerHTML = updatedText;
	}

	addDynamicElement(element) {
		this.parent.appendChild(element);
		this.wrapPlaceholders(element);
	}
}

export default DyTex;