# RandomQuote
Display random quotes in HTML div


## Usage

You just have to import random-quotes javascript file and include a div with specific class inside your
HTML code.

```html
<!DOCTYPE html>
<html>
	<head>
		<title>Random Quotes</title>
	</head>
</html>
<body>
	<div class="random-citation">
	</div>
</body>
<script type="text/javascript" src="./random-quotes.min.js"></script>
</html>
```

## Parameters

You can change some parameters to customize the quotes display.

### Parameters list

|                     Parameter | Type          | Description                                   |
|------------------------------:|---------------|:----------------------------------------------|
| quotes                        | JSON          | List of quotes to display                     |
| containerClass                | string        | CSS class of the quotes block container       |
| textBlockClass                | string        | CSS class of the quotes text block            |
| fadeInTimeout                 | number        | Time to display (fade) the text               |
| fadeOutTimeout                | number        | Time to hide (fade) the text                  |
| switchInterval                | number        | Time before to switch to next quote           |

### Change parameters

The configuration is made by global variable `globalRandonQuotesConfig`. This variable is a JSON
containing previously listed parameters. The variable does'nt need to contain all parameters (if a
parameters is misssing the default value will be used).

You can specify parameters by attributes:
```js
globalRandonQuotesConfig.quotes = {'Quote1':'title 1','Quote2':'title 2','Quote3':'title 3'};
globalRandonQuotesConfig.switchInterval = 3000;
globalRandonQuotesConfig.fadeInTimeout = 100;
globalRandonQuotesConfig.fadeOutTimeout = 200;
globalRandonQuotesConfig.containerClass = 'my-container-class';
globalRandonQuotesConfig.textBlockClass = 'my-text-class';
```

Or by JSON declaration:
```js
globalRandonQuotesConfig = {
	"quotes": {'Quote1':'title 1','Quote2':'title 2','Quote3':'title 3'},
	"switchInterval": 3000
};
```


