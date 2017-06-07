if(this.mg == undefined) {
	mg = {};
}

(function() {
	var TEST_VERSION = "v0.2.0";
	var TEST_LUNCHER_TITLE = "Magica TEST LUNCHER " + TEST_VERSION;
	var TEST_RUNNER_TITLE = "Magica UNITTEST " + TEST_VERSION;
	
	var isSetted = function(value)
	{
		return value != null && value != undefined;
	};
	
	var getOrDefault = function(value, defaultValue) 
	{
		if(isSetted(value))
			return value;
		else
			return defaultValue;
	};

	var dom_removeChildren = function(element) 
	{
		var parent = element.parentNode;
		var nextSibling = element.nextSibling;
	
		parent.removeChild(element);
		
		while(element.lastChild != null)
			element.removeChild(element.lastChild);

		parent.insertBefore(element, nextSibling);
	};

	var dom_replace = function(currentElement, newElement) 
	{
		var parent = currentElement.parentNode;
		var nextSibling = currentElement.nextSibling;
	
		parent.removeChild(currentElement);

		parent.insertBefore(newElement, nextSibling);
	};
	
	var _text = function(message) {
		if(message instanceof Node) {
			return message;
		}
		if(message instanceof Array) {
			var f = document.createDocumentFragment();
			for(var i in message) {
				f.appendChild(_text(message[i]));
			}
			return f;
		}
		
		return document.createTextNode(message.toString());
	};
	
	var _element = function(name, attrs, bodies) {
		var e = document.createElement(name);
		if(isSetted(attrs)) {
			if(typeof attrs == "string") {
				e.className = attrs;
			} else {
				for(var i in attrs) {
					e.setAttribute(i, attrs[i].toString());
				}
			}
		}
		if(isSetted(bodies)) {
			e.appendChild(_text(bodies));
		}
		
		return e;
	};
	
	var _span = function(attrs, bodies) {
		return _element("span", attrs, bodies);
	};
	var _div = function(attrs, bodies) {
		return _element("div", attrs, bodies);
	};
	var _a = function(attrs, bodies) {
		return _element("a", attrs, bodies);
	};
	var _br = function(attrs) {
		return _element("br", attrs, null);
	};
	var _pre = function(attrs, bodies) {
		return _element("pre", attrs, bodies);
	};
	var _dl = function(attrs, bodies) {
		return _element("dl", attrs, bodies);
	};
	var _dt = function(attrs, bodies) {
		return _element("dt", attrs, bodies);
	};
	var _dd = function(attrs, bodies) {
		return _element("dd", attrs, bodies);
	};
	var _iframe = function(attrs, bodies) {
		return _element("iframe", attrs, bodies);
	};
	var _h1 = function(attrs, bodies) {
		return _element("h1", attrs, bodies);
	};
	var _h2 = function(attrs, bodies) {
		return _element("h2", attrs, bodies);
	};
	var _h3 = function(attrs, bodies) {
		return _element("h3", attrs, bodies);
	};
	var _table = function(attrs, bodies) {
		return _element("table", attrs, bodies);
	};
	var _tr = function(attrs, bodies) {
		return _element("tr", attrs, bodies);
	};
	var _td = function(attrs, bodies) {
		return _element("td", attrs, bodies);
	};
	
	var _equals = function(a, b) 
	{
		return a === b;
	};
	
	mg.AssertException = function(message)
	{
		this.message = message;
		
		if(this.stack != null) {
			this.stack = new Error().stack;
		}
	};
	mg.AssertException.prototype = new Error("AssertException");

	mg.assertEquals = function(actual, excepted) 
	{
		mg.testRunner._result.assert++;
		if(!(_equals(actual, excepted))) {
			throw new mg.AssertException("assertEquals [actual: " + actual.toString() + ", excepted: " + excepted.toString() +  "]");
		}
	};
	mg.assertNotEquals = function(actual, excepted) 
	{
		mg.testRunner._result.assert++;
		if(!(!_equals(actual, excepted))) {
			throw new mg.AssertException("assertNotEquals [actual: " + actual.toString() + ", excepted: " + excepted.toString() +  "]");
		}
	};
	mg.assertSame = function(actual, excepted) 
	{
		mg.testRunner._result.assert++;
		if(!(actual === excepted)) {
			throw new mg.AssertException("assertSame [actual: " + actual.toString() + ", excepted: " + excepted.toString() +  "]");
		}
	};
	mg.assertNotSame = function(actual, excepted) 
	{
		mg.testRunner._result.assert++;
		if(!(actual !== excepted)) {
			throw new mg.AssertException("assertNotSame [actual: " + actual.toString() + ", excepted: " + excepted.toString() +  "]");
		}
	};
	mg.assertNull = function(value) 
	{
		mg.testRunner._result.assert++;
		if(!(value === null)) {
			throw new mg.AssertException("assertNull [value:" + value.toString() + "]");
		}
	};
	mg.assertNotNull = function(value) 
	{
		mg.testRunner._result.assert++;
		if(!(value !== null)) {
			throw new mg.AssertException("assertNotNull [value: null]");
		}
	};
	mg.assertTrue = function(value) 
	{
		mg.testRunner._result.assert++;
		if(!(value === true)) {
			throw new mg.AssertException("assertTrue [value:" + value.toString() + "]");
		}
	};
	mg.assertFalse = function(value) 
	{
		mg.testRunner._result.assert++;
		if(!(value === false)) {
			throw new mg.AssertException("assertFalse [value:" + value.toString() + "]");
		}
	};
	mg.assertUndefined = function(value) 
	{
		mg.testRunner._result.assert++;
		if(!(value === undefined)) {
			throw new mg.AssertException("assertUndefined [value:" + value.toString() + "]");
		}
	};
	mg.assertArrayEquals = function(actual, excepted)
	{
		mg.testRunner._result.assert++;
		if(actual.length != excepted.length) {
			throw new mg.AssertException("assertArrayEquals unmatch length [actual: " + actual.toString() + ", excepted: " + excepted.toString() + "]");
		}
		for(var i = 0; i < actual.length; i++) {
			if(!(_equals(actual[i], excepted[i]))) {
				throw new mg.AssertException("assertArrayEquals [actual: " + actual[i].toString() + ", excepted: " + excepted[i].toString() + "]");
			}
		}
	};
	mg.assertArrayNotEquals = function(actual, excepted)
	{
		mg.testRunner._result.assert++;
		if(actual.length != excepted.length) {
			return;
		}
		var unmatch = false;
		for(var i = 0; i < actual.length; i++) {
			if(!(_equals(actual[i], excepted[i]))) {
				unmatch = true;
			}
		}
		if(!unmatch) {
			throw new mg.AssertException("assertArrayNotEquals [actual: " + actual.toString() + ", excepted: " + excepted.toString() + "]");
		}
	};
	mg.fail = function(message) {
		mg.testRunner._result.assert++;
		throw new mg.AssertException(getOrDefault(message, "fail"));
	};
	mg.ok = function() {
		mg.testRunner._result.assert++;
	};
	
	mg.TestRunner = function()
	{
		this._testCases = [];
		this._result = {pass: 0, error: 0, assert: 0, userAgent: window.navigator.userAgent, testCases: []};
		this._resultBlock = null;
		this._statusContext = null;
		this._block = null;
		this._showButton = null;
		this.onTestEnd = null;
	};
	
	var TestRunner_call = function(thisObj, result, testCase, name, test)
	{
		try {
			test.call(testCase);
			
			result.tests.push({name: name, result: "OK"});
			TestRunner_reportStatus(thisObj);
			TestRunner_ok(thisObj, name);
		} catch(ex) {
			result.tests.push({name: name, result: "ERROR", message: ex.message, stack: ex.stack});
			TestRunner_reportStatus(thisObj);
			TestRunner_error(thisObj, name, ex);
		}
	};
	
	var TestRunner_ok = function(thisObj, name)
	{
		thisObj._result.pass++;
		
		var row = _tr(null, [
			_td("button", [_span("mgAnchorButtonDisable", "▼")]),
			_td("status", [_span("mgOK", "OK")]),
			_td("name", [name]),
			_td("message", null)
		]);
		thisObj._testCaseTable.appendChild(row);
		
		TestRunner_reportStatus(thisObj);
	};

	var TestRunner_error = function(thisObj, name, ex)
	{
		thisObj._result.error++;
		
		var id = "stacktrace" + stacktraceId++;
		var anchorButton = _a({"class": "mgAnchorButton", href: "javascript:void(0)"}, "▼");
		anchorButton.addEventListener("click", function() {
			var e = document.getElementById(id);
			if(e.style.display == "none") {
				e.style.display = "table-row";
			} else {
				e.style.display = "none";
			}
		});
		
		var row = _tr(null, [
			_td("button", [anchorButton]),
			_td("status", [_span("mgNG", "NG")]),
			_td("name", [name]),
			_td("message", [ex.message])
		]);
		thisObj._testCaseTable.appendChild(row);
		
		var row = _tr({"id": id, style: "display: none;"}, [
			_td({colspan: "4", "class": "stacktrace"}, [_pre(null, [ex.stack])]),
		]);
		thisObj._testCaseTable.appendChild(row);
		
		TestRunner_reportStatus(thisObj);
	};
	var stacktraceId = 0;
	
	var TestRunner_reportStatus = function(thisObj)
	{
		var status;
		var error;
		if(thisObj._result.error > 0) {
			status = _span("mgError", "FAULURE");
			error = _span("mgError", "ERROR: " + thisObj._result.error);
		} else {
			status = _span("mgSuccess", "SUCCESS");
			error = _span("mgPass", "ERROR: " + thisObj._result.error);
		}
		
		var block = _div(null, [
			_span("mgStatus", "STATUS: "), " ", status, ", ",
			_span("mgPass", "PASS: " + thisObj._result.pass), ", ",
			error, ", ",
			_span("mgAsserts", "Asserts: " + thisObj._result.assert), _br(),
			_span("mgUserAgent", "User Agent: " + thisObj._result.userAgent)
		]);
		
		dom_removeChildren(thisObj._statusContext);
		thisObj._statusContext.appendChild(block);
	};

	var TestRunner_log = function(thisObj, type, message)
	{
		thisObj._console.appendChild(_span(type, message));
	};

	mg.out = function(message)
	{
		TestRunner_log(mg.testRunner, "mgText", message + "\r\n");
	};
	mg.error = function(message)
	{
		TestRunner_log(mg.testRunner, "mgError", message + "\r\n");
	};
	mg.warn = function(message)
	{
		TestRunner_log(mg.testRunner, "mgWarn", message + "\r\n");
	};
	mg.info = function(message)
	{
		TestRunner_log(mg.testRunner, "mgInfo", message + "\r\n");
	};

	mg.TestRunner.prototype.init = function()
	{
		this._resultBlock = _div("mgResultContext");
		this._statusContext = _div("mgStatusContext");
		this._console = _pre("mgConsole");
		
		var block = _div("mgTestRunner", [
			_div("mgTitle", TEST_RUNNER_TITLE),
			this._statusContext,
			this._console,
			this._resultBlock
		]);
		this._block = block;

		var showButton = _div("mgTestRunnerShowButton");
		showButton.style.display = "none";
		this._showButton = showButton;
		
		var blockClicked = false;
		block.addEventListener("click", function() {
			blockClicked = true;
		});
		showButton.addEventListener("click", function() {
			blockClicked = true;
			mg.testRunner.show();
		});
		window.addEventListener("click", function(e) {
			if(e.button == 0) {
				if(blockClicked == false) {
					mg.testRunner.hide();
				}
			}
			blockClicked = false;
		});
		
		document.body.appendChild(block);
		document.body.appendChild(showButton);
	};
	
	mg.TestRunner.prototype.add = function(testCase)
	{
		this._testCases.push(testCase);
	};
	
	var TestRunner_processOnTestEnd = function(thisObj)
	{
		try {
			if(thisObj.onTestEnd != null)
				thisObj.onTestEnd({ result: thisObj._result, });
		} catch(ex) {
			console.log(ex);
			alert(ex.message);
		}
		
		TestLuncher_notifyEndToParent(thisObj._result);
	};
	
	mg.TestRunner.prototype.run = function()
	{
		var index = 0;
		var thisObj = this;
		var loop = function() {
			if(index >= thisObj._testCases.length) {
				TestRunner_processOnTestEnd(thisObj);
				return;
			}
			var testCase = thisObj._testCases[index];
			var testCaseName = getOrDefault(testCase.name, "UNDEFINED");

			var testCaseTable = _table(null, []);
			var testCaseBlock = _div("testCase", [
				_h2("caption", testCaseName), 
				testCaseTable]);
			thisObj._testCaseTable = testCaseTable;
			thisObj._resultBlock.appendChild(testCaseBlock);
			
			var setUp = getOrDefault(testCase.setUp, null);
			var tearDown = getOrDefault(testCase.tearDown, null);
			var testFuncs = [];
			for(var i in testCase) {
				if(i.indexOf("test") == 0) {
					testFuncs.push({name: i, test: testCase[i]});
				}
			}
			
			var testCaseResult = new Object();
			testCaseResult.name = testCaseName;
			testCaseResult.tests = [];
			
			try {
				if(setUp != null) {
					TestRunner_call(thisObj, testCaseResult, testCase, "setUp", setUp);
				}
			
				for(var i = 0; i < testFuncs.length; i++) {
					var name = testFuncs[i].name;
					var test = testFuncs[i].test;
					
					TestRunner_call(thisObj, testCaseResult, testCase, name, test);
				}
			
				if(tearDown != null) {
					TestRunner_call(thisObj, testCaseResult, testCase, "tearDown", tearDown);
				}
			} catch(ex) {
				console.error(ex);
				TestRunner_error(thisObj, testCaseName, ex);
			}
			thisObj._result.testCases.push(testCaseResult);
			
			thisObj._testCaseTable = null;

			index++;
			setTimeout(loop, 0);
		};
		setTimeout(loop, 0);
	};
	
	mg.TestRunner.prototype.hide = function()
	{
		this._block.style.display = "none";
		this._showButton.style.display = "";
	};
	
	mg.TestRunner.prototype.show = function()
	{
		this._block.style.display = "";
		this._showButton.style.display = "none";
	};
	
	var escapeCsv = function(text)
	{
		return text.replace("\"", "\"\"");
	};
	
	mg.TestRunner.prototype.createCsv = function()
	{
		var file = [];
		
		var testCases = this._result.testCases;
		for(var i = 0; i < testCases.length; i++) {
			var testCase = testCases[i];
			for(var j = 0; j < testCase.tests.length; j++) {
				var test = testCase.tests[j];
				file.push("\"");
				file.push(escapeCsv(testCase.name));
				file.push("\"");
				file.push(",");
				file.push("\"");
				file.push(escapeCsv(test.name));
				file.push("\"");
				file.push(",");
				file.push("\"");
				file.push(escapeCsv(test.result));
				file.push("\"");
				file.push(",");
				file.push("\"");
				file.push(escapeCsv(getOrDefault(test.message, "")));
				file.push("\"");
				file.push(",");
				file.push("\"");
				file.push(escapeCsv(getOrDefault(test.stack, "")));
				file.push("\"");
				file.push("\r\n");
			}
		}
		return file.join("");
	};
	
	mg.testRunner = new mg.TestRunner();
	
	var TestLuncher_hasTestCase;
	var TestLuncher_run;
	var TestLuncher_notifyEndToParent;
	(function() {
		var bodyGenerated = false;
		var statusBody = null;
		var resultBody = null;
		var testCaseFrame = null;
		var index = 0;
		var testCases = [];
		var results = {};
		var target = null;
		
		TestLuncher_hasTestCase = function()
		{
			return testCases.length > 0;
		};
	
		var TestLuncher_add = function(testCase)
		{
			testCases.push(testCase);
		};
		
		TestLuncher_run = function()
		{
			TestLuncher_generate();
			
			index = 0;
			TestLuncher_runNext();
		};

		var TestLuncher_notifyEnd = function(result)
		{
			var r = {testCase: target, result: result};
			results[target] = r;
			
			TestLuncher_showResult(r);
			TestLuncher_showStatus();
			
			TestLuncher_runNext();
		};
		
		TestLuncher_notifyEndToParent = function(result)
		{
			if(window.parent == undefined || window.parent == null || window.parent == window)
				return;

			window.parent.mg.TestLuncher._notifyEnd_(result);
		};

		var TestLuncher_generate = function()
		{
			if(bodyGenerated)
				return;
			
			statusBody = _div("mgStatus");
			resultBody = _div("mgTestResult", [
					_h2(null, "TEST RESULTS"),
				]);
			testCaseFrame = _iframe({class: "mgTestCase", name: "testCase"});
			
			var body = _div("mgTestLuncher", [
					_h1(null, TEST_LUNCHER_TITLE),
					statusBody,
					resultBody,
					testCaseFrame
				]);
			
			document.body.appendChild(body);
			
			bodyGenerated = true;
		};

		var TestLuncher_showResult = function(result)
		{
			var id = "__mg_id_" + result.testCase;
			var status;
			if(result.result.error > 0) {
				status = _span("mgError", "[ERROR]");
			} else {
				status = _span("mgOK", "[OK]");
			}
			
			var a = _a({href: "javascript:void(0)"}, result.testCase);
			a.addEventListener("click", function() {
				TestLuncher_runTarget(result.testCase);
			});
			
			var resultItem = _div({id: id, class: "mgResultItem"}, [
					status, " ", a,
				]);
			
			var current = document.getElementById(id);
			if(current == null) {
				resultBody.appendChild(resultItem);
			} else {
				dom_replace(current, resultItem);
			}
		};
		
		var TestLuncher_showStatus = function()
		{
			var passCount = 0;
			var errorCount = 0;
			var assertCount = 0;
			
			for(var i in results) {
				var o = results[i];
				
				passCount += o.result.pass;
				errorCount += o.result.error;
				assertCount += o.result.assert;
			}
			
			var status;
			var error;
			if(errorCount > 0) {
				status = _span("mgError", "FAULURE");
				error = _span("mgError", "ERROR: " + errorCount);
			} else {
				status = _span("mgOK", "SUCCESS");
				error = _span("mgPass", "ERROR: " + errorCount);
			}
			
			var block = _div(null, [
				"STATUS: ", status, ", ",
				"PASS: " + passCount, ", ",
				error, ", ",
				"Asserts: " + assertCount, ", ",
				"Date Time: " + new Date().toString(), _br(),
				"User Agent: " + window.navigator.userAgent
			]);
			dom_removeChildren(statusBody);
			statusBody.appendChild(block);
		};

		var TestLuncher_runNext = function()
		{
			if(index >= testCases.length)
				return false;

			TestLuncher_runTarget(testCases[index++]);
			
			return true;
		};

		var TestLuncher_runTarget = function(testCase)
		{
			setTimeout(function() {
				target = testCase;
				testCaseFrame.src = testCase;
			}, 0);
		};
		
		mg.TestLuncher = {
			add: TestLuncher_add, 
			_notifyEnd_: TestLuncher_notifyEnd, 
		};
	})();
	
	window.addEventListener("load", function() {
		if(mg.testRunner._testCases.length > 0) {
			mg.testRunner.init();
			mg.testRunner.run();
			return;
		}
		if(TestLuncher_hasTestCase()) {
			TestLuncher_run();
			return;
		}
	});
})();
