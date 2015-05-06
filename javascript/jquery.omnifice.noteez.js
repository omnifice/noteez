/*
 * jQuery Noteez Widget 1.0.0
 * 
 * Creates a message notification area indicated by a label and message count,
 * which, when clicked, opens a body to reveal messages sent to it via methods.
 * 
 * http://github.com/omnifice/noteez
 *
 * Copyright (c) 2015 Blake Anderson (omnifice)
 * Released under the MIT license.
 * http://opensource.org/licenses/MIT
 *
 */
(function ($) {

  $.widget( 'omnifice.noteez', {
    
    messages: {},
    
    options: {  
      id: 'aNoteez',
      debug: false,
      defaultElement: '<div>',
      showClose: true,
      wrapClass: 'noteez',
      headerClass: 'noteezHeader',
      headerLabel: 'Notifications: ',
      counterClass: 'noteezCount',
      bodyClass: 'noteezBody',
      msgClass: 'noteezMsg',
      textClass: 'noteezText',
      clearAllClass: 'noteezClearAll',
      clearAllLabel: 'Clear All Messages',
      closeClass: 'noteezClose',
      closeLabel: 'Close',
      removeIcon: 'images/icon_close.png',
      removeIconClass: 'noteezRemoveIconClass',
      iconClass: 'noteezIcon',
      icon_error: 'images/msg_error.png',
      icon_info: 'images/msg_info.png',
      icon_success: 'images/msg_success.png',
      icon_warning: 'images/msg_warning.png'
    },
    
    debug: function(info) {
      if (this.options.debug === true && window.console && window.console.log) {
        window.console.log(this.widgetName + '::id:' + this.options.id + ': ' + info);
      }
    },
    
    // Build the 'physical' object.
    _create: function() {
      this.debug('_create called.');
      
      // Disable selection
      this.element.disableSelection();
      
      // Build the object elements
      this.debug('building elements');
      this.noteez = $('<div>', {
        'class': this.options.wrapClass,
        'id': this.options.id
      });
      
      this.headerWrapper = $('<div>', {
        'class': 'noteezHeaderWrap'
      });
  
      this.headerLabel = $('<div>', {
        'class': this.options.headerClass,
        text: this.options.headerLabel
      });
      
      this.headerCount = $('<span>', {
        'class': this.options.counterClass,
        text: '0'
      });
      
      this.bodyWrapper = $('<div>', {
        'class': 'noteezBodyWrap'
      });
      
      this.body = $('<div>', {
        'class': this.options.bodyClass
      });
      
      this.bottomBarWrapper = $('<div>', {
        'class': 'noteezBottomBarWrap',
      });
  
      this.clearAll = $('<div>', {
        'class': this.options.clearAllClass,
        text: this.options.clearAllLabel
      });
  
      this.close = $('<div>', {
        'class': this.options.closeClass,
        text: this.options.closeLabel
      });
      
      // Put it together
      this.debug('Gluing it all together');
      this.headerCount.appendTo(this.headerWrapper);
      this.headerLabel.appendTo(this.headerWrapper);
      this.headerWrapper.appendTo(this.noteez);
      this.body.appendTo(this.bodyWrapper);
      this.clearAll.appendTo(this.bottomBarWrapper);
      this.close.appendTo(this.bottomBarWrapper);
      this.bottomBarWrapper.appendTo(this.bodyWrapper);
      this.bodyWrapper.appendTo(this.noteez);
      this.noteez.appendTo(this.element);
      
      // See if the close button should be shown
      this.debug('Setting close button state');
      if (this.options.showClose === false) {
        this.close.hide();
      }
      
      // Events
      this.debug('Wiring events');
      this._on(this.headerWrapper, {
        click: "_bodyToggle"
      });
      
      this._on(this.clearAll, {
        click: "clearMessages"
      });
  
      this._on(this.close, {
        click: "_bodyToggle"
      });
      
      this.debug('_create complete');
    },
    
    
    // Private methods
    _bodyToggle: function() {
      this.debug('_bodyToggle called.');
      this.bodyWrapper.toggle();
    },
    
    
    // Public methods
    appendMessage: function(type, msg, extra) {
      this.debug('appendMessage called for type: ' + type + ', message: ' + msg + ', extra: ' + extra);
      var types = /^(warning|error|info|success)$/i;
      
      if (! types.test(type)) {
        throw new Error(this.name + '::error creating new message. Invalid or no type specified.');
        return;
      }
      
      var msgClass = this.options.msgClass + '_' + type.toLowerCase();
      var dateNow = new Date();
      var id = this.options.id + '_' + dateNow.getTime();
      var localTS = dateNow.toLocaleString();
      var title = localTS;
      
      this.debug('New message id: ' + id);
      
      if (typeof extra != 'undefined' && extra != '') {
        title += ': ' + extra;
      }
      
      var count = parseInt(this.headerCount.html());
      this.headerCount.html(++count);
      
      var newMsg = $('<div>', {
        'id': id,
        'class': this.options.msgClass
      });
      
      var imgType = $('<img>', {
        'class': this.options.iconClass,
        'src': this.options['icon_' + type.toLowerCase()]
      });
      
      var msgText = $('<span>', {
        'class': this.options.textClass,
        'data-id': id,
        'title': title,
        text: msg
      });
      
      var removeImg = $('<img>', {
        'class': this.options.removeIconClass,
        'src': this.options.removeIcon,
        'data-id': id
      });
      
      newMsg.append(imgType);
      newMsg.append(msgText);
      newMsg.append(removeImg);
      this.body.append(newMsg);
      
      this._on(newMsg.find(removeImg), {
        click: function() { this.removeMessage(id); }
      });
      
      this.messages[id] = {type: type, message: msg, extra: extra};
      
      this.debug('appendMessage complete');
      return id;
    },
  
    clearMessages: function() {
      this.debug('clearMessages called.');
      this.messages = {};
      this.body.empty();
      this.headerCount.html('0');
      return {};
    },
    
    getMessage: function(id) {
      this.debug('getMessage called for message id: ' + id);
      return this.messages[id];
    },
    
    getMessages: function() {
      this.debug('getMessages called');
      return this.messages;
    },
    
    removeMessage: function(id) {
      this.debug('removeMessage called for message id: ' + id);
      if (typeof this.messages[id] !== 'undefined') {
        var count = parseInt(this.headerCount.html());
        this.headerCount.html(--count);
        var found = $('#' + id);
        if (typeof found === 'object') {
          found.remove();
          delete this.messages[id];
          return id;
        }
        else {
          return undefined;
        }
      }
      else {
        return undefined;
      }
    }
    
  });
  
}(jQuery));

