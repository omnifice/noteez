
// Init
$(function() {
  console.log('Init...');
  
  var notes = $('#noteezContainer').noteez({debug: true, id: 'niftyMessages', showClose: true});
  
  // Add a message
  notes.noteez('appendMessage', 'success', 'Initialized!', 'This message added right after initializing the element.');
  
  // Gets direct access to an instance of the widget:
  var direct = $('#noteezContainer').data('omnifice-noteez');
  
  // Add a message directly calling the method:
  direct.appendMessage('success', 'This message added directly.');
  
  // logMessages generates a LOT of noise in the console log...uncomment as you like.
  //logMessages(direct.messages);
  
  $('#msgAdder').on('click', function() { 
    console.log('msgAdder::click');
    var msgId = notes.noteez('appendMessage', 'info', 'This is an info message.', 'This is the extras info...');
    console.log('New message id: ' + msgId);
    //logMessages(direct.messages);
  });

  $('#msgDeleter').on('click', function() { 
    var msgId = $('#msgIdInput').val();
    console.log('msgDeleter::click for id: ' + msgId);
    var rc = direct.removeMessage(msgId);
    console.log('Deleted id: ' + rc);
    //logMessages(direct.messages);
  });
  
  $('#msgGetter').on('click', function() {
    var msgId = $('#msgIdInput').val();
    console.log('msgGetter::click for id: ' + msgId);
    var msg = direct.getMessage(msgId);
    alert('Message received: ' + JSON.stringify(msg));
  });

  $('#msgGetAll').on('click', function() {
    console.log('msgGetAll::click');
    var msgs = direct.getMessages();
    var output = 'Messages:\n';
    $.each(msgs, function(key, val) {
      output += key + ':\n';
      $.each(val, function(key2, val2) {
        output += '\t' + key2 + ': ' + val2 + '\n';
      });
    });
    alert(output);
  });
  
  console.log('Init complete.');
});


function logMessages(msgs) {
  $.each(msgs, function(key, val) {
    console.log('message::id: ' + key);
    if ( typeof val === 'object' ) {
      $.each(val, function(key2, val2) {
        console.log('\tObject::key: ' + key2 + ', value: ' + val2);
      });
    }
    else {
      console.log('\tvalue: ' + val);
    }
  });
}


