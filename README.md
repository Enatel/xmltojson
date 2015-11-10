# Basic Usage

Below are examples of converting to and from XML and JSON respectively.

### JSON to XML

```javascript
// Create x2js instance with default config
var x2js = new X2JS();
var jsonObj = { 
     MyRoot : {
                test: 'success',
                test2 : { 
                    item : [ 'val1', 'val2' ]
                }
      }
};
var xmlAsStr = x2js.json2xml_str( jsonObj );
```

### XML to JSON

```javascript
// Create x2js instance with default config
var x2js = new X2JS();
var xmlString = "<MyRoot><test>Success</test><test2><item>val1</item><item>val2</item></test2></MyRoot>";
var jsonObj = x2js.xml_str2json( xmlString );
```