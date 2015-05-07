# jquery.omnifice.noteez

## Description
jQuery widget for drop-down display of notifications from external events.

## Synopsis
```javascript
var notes = $('#noteezContainer').noteez({debug: true, id: 'niftyMessages', showClose: true});

// Add a message
notes.noteez('appendMessage', 'success', 'Initialized!', 'This message added right after initializing the element.');

// Delete a message from outside the GUI actions.
notes.noteez('removeMessage', msgId);

// Clear all messages from outside the GUI actions.
notes.noteez('clearMessages');

// Get a list of messages.
var messages = notes.noteez('getMessages');

// Get a specific message.
var message = notes.noteez('getMessage', msgId);

//** Instance direct access...
// Gets direct access to an instance of the widget:
var direct = $('#noteezContainer').data('omnifice-noteez');

// Add a message directly calling the method:
direct.appendMessage('success', 'This message added directly.');

// ...and so on...
```

## Methods
### appendMessage
####Parameters:
**type:** one of 'warning', 'error', 'info', 'success' (required)
**message:** The message that you want displayed.
**extra:** Addition information that you want displayed in the "title" HTML property for mouseover.

####Returns: 
The ID of the newly created message.

###clearMessages
**No parameters**

####Returns
Currently, an empty object.

###getMessage
####Parameters
**id:** The ID of the message that you want returned.

####Returns
An object: {type: type, message: msg, extra: extra}

###getMessages
####Parameters
**No parameters**

####Returns
A hash of message objects.

i.e.:
```javascript
var msgs = notes.noteez('getMessages');
var foo = msgs[id]; // id from somewhere else
console.log(foo.type);
console.log(foo.message);
console.log(foo.extra);

// ...or...

var output = 'Messages:\n';
$.each(msgs, function(key, val) {
  output += key + ':\n';
  $.each(val, function(key2, val2) {
    output += '\t' + key2 + ': ' + val2 + '\n';
  });
});

console.log(output);
```

###removeMessage
####Parameters
**id:** The ID of the message that you want removed.

###Returns
The ID of the object removed, or 'undefined' if not found.

## Properties
**id:** The element id for the wrapper element. Default = 'aNoteez'

**debug:** Default = false

**defaultElement:** Default = '&lt;div&gt;'

**showClose:** Whether or not to display the 'close' link in the bottom bar. Default = true

**wrapClass:** CSS class for the object wrapper. Default = 'noteez'

**headerClass:** CSS class for the header. Default = 'noteezHeader'

**headerLabel:** Label to display for the header (clicked to display/hide the body). Default = 'Notifications: '

**counterClass:** CSS class for the message count. Default = 'noteezCount'

**bodyClass:** CSS class for the body container. Default = 'noteezBody'

**msgClass:** CSS class for message containers. Default = 'noteezMsg'

**textClass:** CSS class for the message text. Default = 'noteezText'

**clearAllClass:** CSS class for the "Clear All" element. Default = 'noteezClearAll'

**clearAllLabel:** Label to display for the "Clear All" element. Default = 'Clear All Messages'

**closeClass:** CSS class for the "Close" element. Default = 'noteezClose'

**closeLabel:** Label to display for the "Close" element. Default = 'Close'

**removeIcon:** Path to the remove icon on each message. Default = 'images/icon_close.png'

**removeIconClass:** CSS class for the remove icon. Default = 'noteezRemoveIconClass'

**iconClass:** CSS class for the message icon if needed. Default = 'noteezIcon' (not in supplied CSS)

**icon_error:** Path to the icon to use for error messages. Default = 'images/msg_error.png'

**icon_info:** Path to the icon to use for info messages. Default = 'images/msg_info.png'

**icon_success:** Path to the icon to use for success messages. Default = 'images/msg_success.png'

**icon_warning:** Path to the icon to use for warning messages. Default = 'images/msg_warning.png'

##Other Stuff
This is my first attempt at a jQuery plugin. I realize there are better and/or more efficient ways of doing things. Future mods to come... :)

## Author
Blake Anderson <omnifice@gmail.com>

## Copyright and License
Copyright (c) 2015 by Blake Anderson

MIT License




