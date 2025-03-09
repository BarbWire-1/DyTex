```md
# DyTex.js

## Overview

`DyTex.js` is a lightweight, minimalistic JavaScript utility that enables simple reactive data binding in textNodes within the DOM. It allows developers to define variables and automatically update corresponding elements when their values change. This makes it easy to create dynamic user interfaces without relying on complex frameworks.

## Features

- **Two-way binding**: Updates DOM elements whenever associated variables change.
- **Template placeholders**: Automatically replaces `{{variable}}` placeholders with reactive spans.
- **Dynamic element handling**: Allows new elements to be added dynamically while maintaining reactivity.
- **Minimal and framework-independent**: A pure JavaScript solution without dependencies.

## Installation

Simply include `DyTex.js` in your project:

```html
<script src="path/to/DyTex.js"></script>
```

Or, if using ES6 modules:

```js
import DyTex from './DyTex.js';
```

## Usage

### Initialization

Create an instance of `DyTex` by specifying a parent container:

```js
const reactive = new Reactive(document.querySelector("#content"));
```

If no parent is provided, it defaults to `document.body`.

### Defining Reactive Variables

Define variables that should be reactive:

```js
reactive.defineVariables({
    color: "black",
    size: "medium",
    message: "Hello World",
});
```

### Using Template Placeholders

Now, any element using `{{color}}`, `{{size}}`, or `{{message}}` will update when these values change - and ONLY that part.

### Binding Variables to the DOM

Internally these placeholders get replaced by spans with a data-attribute of class "dytex"

When `reactive.message = "New Message";` is executed, the span's content updates automatically.


```js
<p>Hello, {{message}}!</p>
```

`DyTex.js` will convert this to:

```js
<p>Hello, <span class="dytex" data-dytex-message>Hello World</span>!</p>
```

And any updates to `message` will reflect in real-time.

### Updating Variables Dynamically

Variables can be updated dynamically, triggering automatic UI updates:

```js
setTimeout(() => {
    reactive.message = "Goodbye!";
}, 3000);
```

### Adding Dynamic Elements

You can also add new elements to the DOM while keeping them reactive:

```js
const newElement = document.createElement("div");
reactive.defineVariables({ dynamicText: "I'm dynamically added text" });
newElement.innerHTML = "Dynamic content: {{dynamicText}}";
reactive.addDynamicElement(newElement);
```

## Philosophy

- **Simplicity**: A minimal, declarative approach to UI reactivity.
- **Lightweight**: No dependencies, small footprint.
- **Flexibility**: Works alongside existing JavaScript frameworks or standalone.

## License

MIT License

## Contributing

Contributions and improvements are welcome! The idea is to expand it handling variables with the same syntax in not only textNodes.
Feel free to submit issues or pull requests on GitHub.
