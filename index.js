import DyTex from "./Dytex.js";

// USAGE EXAMPLES UPDATING THE VARIABLE PARTS OF TEXT
// would scan all document.body
// const reactive = new DyNodes();

// this now only scans and handles variables inside the parent container
const reactive = new DyTex(document.querySelector("#container"));

reactive.defineVariables({
	color: "black",
	size: "medium",
	message: "Hello",
	anotherMessage: "I should continue this..."
});

// change values and updates
setTimeout(() => {
	reactive.color = "blue";
}, 2000);

setTimeout(() => {
	reactive.size = "large";
}, 3000);

setTimeout(() => {
	reactive.message = "Goodbye";
}, 4000);


// add a new variable and a new textElement dynamically
setTimeout(() => {
	const dynamicTextElement = document.createElement("div");
	const variables = { dynamicText: "I'm dynamically added text" };
	dynamicTextElement.textContent = "Dynamically added element of color {{color}}: {{dynamicText}}";

	reactive.addDynamicElement(dynamicTextElement, variables);
}, 5000);

// update the newly added el and some old
setTimeout(() => {
	reactive.color = "orange";
	reactive.dynamicText += "...and now my text got changed.";
}, 7000);
