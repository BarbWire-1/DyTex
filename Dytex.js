class DyTex {
	constructor (parent = document.body) {
		this.parent = parent;
		this.initialized = false;
	}

	// Define reactive variables
	defineVariables(variables) {
		Object.entries(variables).forEach(([ prop, value ]) => {
			this.#createAccessors(prop, value);
		});

		if (!this.initialized) {
			this.#scanForPlaceholders();
			this.initialized = true;
		}
	}

	// Create getter/setter for the reactive variables
	#createAccessors(prop, value) {
		Object.defineProperty(this, prop, {
			get: () => value,
			set: (newValue) => {
				value = newValue;
				this.#updateElements(prop, newValue);
			}
		});
	}

	// Update elements when reactive variables change
	#updateElements(prop, newValue) {
		const elements = this.parent.querySelectorAll(`[data-dytex-${prop}]`);
		elements.forEach((element) => {
			element.textContent = newValue;
		});
	}

	// Scan the entire parent once at initialization
	#scanForPlaceholders() {
		const elements = this.parent.querySelectorAll("*");
		elements.forEach((element) => {
			this.#wrapPlaceholders(element);
		});
	}

	// Replace placeholders with spans containing the reactive values
	// having a data-attribute to relate to
	#wrapPlaceholders(element) {
		let updatedText = element.innerHTML;
		const regex = /{{(\w+)}}/g;
		let match;
		while ((match = regex.exec(updatedText))) {
			const propName = match[ 1 ];
			if (this[ propName ]) {
				updatedText = updatedText.replace(
					match[ 0 ],
					`<span class="dytex" data-dytex-${propName}>${this[ propName ]}</span>`
				);
			}
		}
		element.innerHTML = updatedText;
	}

	// Add a dynamic element, define its variables and scan and replace the placeHolders inside
	addDynamicElement(element, variables = undefined) {
		this.parent.appendChild(element);
		variables && this.defineVariables(variables)

		// create the span for variable text
		this.#wrapPlaceholders(element);
	}
}






export default DyTex;