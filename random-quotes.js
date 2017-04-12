/**
 * Author: Brian GOHIER
 */

function randomQuote(quotes,
					 containerClass,
					 textBlockClass,
					 fadeInTimeout,
					 fadeOutTimeout) {
	
	this.quotesInterval = null;

	// console.log('Config:',
				// '\n	quotes:', quotes,
				// '\n	containerClass:', containerClass,
				// '\n	textBlockClass:', textBlockClass,
				// '\n	fadeInTimeout:', fadeInTimeout,
				// '\n	fadeOutTimeout:', fadeOutTimeout);

	function fadeIn(element, time) {
		time = time || fadeInTimeout;
		element.style.animation = "fadeIn " + time/1000 + "s ease-in 1 forwards";
		element.style.opacity = 0;
	}

	function fadeOut(element, time) {
		time = time || fadeOutTimeout;
		element.style.animation = "fadeOut " + time/1000 + "s ease-out 1 forwards";
		element.style.opacity = 1;
	}
	
	this.startSwitch = function(interval) {
		if (this.quotesInterval) {
			clearInterval(quotesInterval);
			this.quotesInterval = null;
		}
		changeQuote(interval);
		// console.log('	Interval:',interval);
		this.quotesInterval = setInterval(function() {changeQuote(interval);}, interval + fadeInTimeout + fadeOutTimeout);
	}
	
	this.stopSwitch = function() {
		clearInterval(this.quotesInterval);
		this.quotesInterval = null;
	}

	function changeQuote(interval) {
		var blockText = document.querySelector('.' + containerClass + '> .' + textBlockClass);
		
		fadeOut(blockText);
		// console.log('	fadeOut:',fadeOutTimeout);
		
		setTimeout(function() {
			
			var idx = Math.floor(Math.random() * Object.keys(quotes).length);
			var i = 0;
			var text = null;
			var title = null;
			var classes;
			for (var k in quotes) {
				if (i === idx) {
					text = k;
					title = quotes[k];
				}
				i++;
			}
			// console.log('	changed:',fadeInTimeout);
			setTimeout(function() {
				if(text && title) {
					blockText.innerHTML = text;
					blockText.title = title;
				}
				fadeIn(blockText);
				// console.log('	fadeIn:',interval);
			}, fadeInTimeout);
		}, fadeOutTimeout);
		
	}
}

var globalRandonQuotes;
var globalRandonQuotesConfig = {};

document.addEventListener("DOMContentLoaded", function(event) {
	
	var QUOTES = {
		'Two wrongs don\'t make a right.': 'When someone has done something bad to you, trying to get revenge will only make things worse.',
		'The pen is mightier than the sword.': 'Trying to convince people with ideas and words is more effective than trying to force people to do what you want',
		'When in Rome, do as the Romans.': 'Act the way that the people around you are acting. This phrase might come in handy when you\'re traveling abroad notice that people do things differently than you\'re used to.',
		'The squeaky wheel gets the grease.': 'You can get better service if you complain about something. If you wait patiently, no one\'s going to help you.',
		'When the going gets tough, the tough get going.': 'Strong people don\'t give up when they come across challenges. They just work harder.',
		'No man is an island.': 'You can\'t live completely independently. Everyone needs help from other people.',
		'Fortune favors the bold.': 'People who bravely go after what they want are more successful than people who try to live safely.',
		'People who live in glass houses should not throw stones.': 'Don\'t criticize other people if you\'re not perfect yourself.',
		'Hope for the best, but prepare for the worst.': 'Bad things might happen, so be prepared.',
		'Better late than never.': 'It\'s best to do something on time. But if you can\'t do it on time, do it late.',
		'Birds of a feather flock together.': 'People like to spend time with others who are similar to them.',
		'Keep your friends close and your enemies closer.': 'If you have an enemy, pretend to be friends with them instead of openly fighting with them. That way you can watch them carefully and figure out what they\'re planning.',
		'A picture is worth a thousand words.': 'Pictures convey emotions and messages better than written or spoken explanations.',
		'There\'s no such thing as a free lunch.': 'Things that are offered for free always have a hidden cost.',
		'There\'s no place like home.': 'Your own home is the most comfortable place to be.',
		'Discretion is the greater part of valor.': 'Sometimes it\'s important to know when to give up and run away, instead of always acting brave and maybe getting hurt.',
		'The early bird catches the worm.': 'You should wake up and start work early if you want to succeed.',
		'Never look a gift horse in the mouth.': 'If someone offers you a gift, don\'t question it.',
		'You can\'t make an omelet without breaking a few eggs.': 'When you try to do something great, you\'ll probably make a few people annoyed or angry. Don\'t worry about those people; just focus on the good results.',
		'God helps those who help themselves.': 'Don\'t just wait for good things to happen to you. Work hard to achieve your goals.',
		'You can\'t always get what you want.': 'Don\'t whine and complain if you don\'t get what you wanted.',
		'Cleanliness is next to godliness.': 'Be clean. God likes that.',
		'A watched pot never boils.': 'If something takes time to finish, don\'t watch it too closely because it will seem like it\'s taking forever.',
		'Beggars can\'t be choosers.': 'If you\'re asking for a favor from someone else, you have to take whatever they give you.',
		'Actions speak louder than words.': 'Just saying that you\'ll do something doesn\'t mean much. Actually doing it is harder and more meaningful.',
		'If it ain\'t broke, don\'t fix it.': 'Don\'t try to improve something that already works fairly well. You\'ll probably end up causing new problems.',
		'Practice makes perfect.': 'You have to practice a skill a lot to become good at it.',
		'Too many cooks spoil the broth.': 'When there are too many people trying to lead and give their opinions, it\'s confusing and leads to bad results. Jobs and projects should have one or two strong leaders.',
		'Easy come, easy go.': 'When you get money quickly, like by winning it, it\'s easy to spend it or lose it quickly as well.',
		'Don\'t bite the hand that feeds you.': 'If someone\'s paying you or helping you out, you have to be careful not to make them angry or say bad things about them.',
		'All good things must come to an end.': 'You can\'t keep having good luck or fun forever; eventually it will stop.',
		'If you can\'t beat \'em, join \'em.': 'When you try to change someone\'s behavior and it doesn\'t work, you might have to change instead. For example, if you\'re trying to get your classmates to focus on studying but they want to party, maybe you should just party with them.',
		'One man\'s trash is another man\'s treasure.': 'Different people have different ideas about what\'s valuable.',
		'There\'s no time like the present.': 'If you need to do something, don\'t wait until later. Do it now.',
		'Beauty is in the eye of the beholder.': 'Different people have different ideas about what\'s beautiful.',
		'Necessity is the mother of invention.': 'When you\'re really in need, you think of creative solutions to your problems.',
		'A penny saved is a penny earned.': 'Save your money. Saving money is just like making money.',
		'Familiarity breeds contempt.': 'When you\'re around someone for too long, you get tired of them and annoyed by them.',
		'You can\'t judge a book by its cover.': 'Things sometimes look different than they really are. A restaurant that looks old and small might have amazing food, for example.',
		'Good things come to those who wait.': 'Be patient. Eventually something good will happen to you.',
		'Don\'t put all your eggs in one basket.': 'Have a backup plan. Don\'t risk all of your money or time in one plan.',
		'Two heads are better than one.': 'When two people cooperate with each other, they come up with better ideas.',
		'The grass is always greener on the other side of the hill.': 'People tend to want whatever they don\'t have.',
		'Do unto others as you would have them do unto you.': 'Don\'t do mean things to people.',
		'A chain is only as strong as its weakest link.': 'If one member of a team doesn\'t perform well, the whole team will fail.',
		'Honesty is the best policy.': 'Don\'t lie.',
		'Absence makes the heart grow fonder.': 'Sometimes it\'s good to be away from your partner, because it makes you want to see each other again.',
		'You can lead a horse to water, but you can\'t make him drink.': 'If you try to help someone, but they don\'t take your advice or offers, give up. You can\'t force someone to accept your help.',
		'Don\'t count your chickens before they hatch.': 'Your plans might not work out, so don\'t start thinking about what you\'ll do after you succeed. Wait until you\'ve already succeeded, and then you can think about what to do next.',
		'If you want something done right, you have to do it yourself.': 'Don\'t trust other people to do important things for you. You have to do things yourself to control the quality of the results.'
	};

	var CSS_ANIMATIONS = '@-webkit-keyframes fadeIn { to { opacity: 1; } } @keyframes fadeIn { to { opacity: 1; } } @-webkit-keyframes fadeOut { to { opacity: 0; } } @keyframes fadeOut { to { opacity: 0; } }';

	var QUOTES_CONTAINER_CLASS = 'random-citation';
	var QUOTES_TEXT_CLASS = 'citation-text';

	var FADE_IN_TIMEOUT = 500;
	var FADE_OUT_TIMEOUT = 400;

	var SWITCH_INTERVAL = 5000;
	
	var DEFAULT_RANDON_QUOTE_CONFIG = {
		"quotes" : QUOTES,
		"containerClass" : QUOTES_CONTAINER_CLASS,
		"textBlockClass" : QUOTES_TEXT_CLASS,
		"fadeInTimeout" : FADE_IN_TIMEOUT,
		"fadeOutTimeout" : FADE_OUT_TIMEOUT,
		"switchInterval" : SWITCH_INTERVAL
	};
	
	function merge(obj) {
		for (var i = 1; i < arguments.length; i++) {
			var def = arguments[i];
			for (var n in def) {
				if (obj[n] === undefined) {
					obj[n] = def[n];
				}
			}
		}
		return obj;
	}
	
	var config = merge(globalRandonQuotesConfig || {}, DEFAULT_RANDON_QUOTE_CONFIG);
	
	var style = document.createElement('style');
	style.type='text/css';
	style.innerHTML = CSS_ANIMATIONS;
	document.getElementsByTagName('head')[0].appendChild(style);
	
	var text = document.createElement('div');
	text.className = config['textBlockClass'];
	text.innerHTML = '&nbsp';
	var container = document.querySelector('.' + config['containerClass']);
	container.appendChild(text);
	
	globalRandonQuotes = new randomQuote(config['quotes'], config['containerClass'], config['textBlockClass'],
				config['fadeInTimeout'], config['fadeOutTimeout']);
	globalRandonQuotes.startSwitch(config['switchInterval']);
});
