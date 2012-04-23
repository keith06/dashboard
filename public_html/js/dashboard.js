function Dashboard($aOptions)
{
    $this = this;
    $mUrl = "http://dashboard/ajax/";
    $mStreamUrl = "http://dashboard/stream/";
    $mLastUpdateId = 0;
    var $mDashboard;
    var $mMessageInput;
    var $mMessageList;


    parseResponse = function(r)
    {console.log('inside parse 1');
        $lEvents = r.responseText.split("\n");
        console.log('inside parse 2 - length: ' + $lEvents.length);
        for($lI = 0; $lI < $lEvents.length; $lI++) {
            if($lEvents[$lI] == "") continue;
            console.log($lEvents[$lI]);
            $lEvent = $lEvents[$lI].evalJSON();

            if($lEvent.event_type == 1) {
                $mLastUpdateId = $lEvent.id;
                addChatMessage($lEvent.content);
            }
        }
        console.log('end parse');
    }


    createConnection = function()
    {
        console.log('create connection');
        new Ajax.Request($mStreamUrl, {
            method: 'post',
            parameters: { dashboard: $mDashboard, last_update: $mLastUpdateId },
            onComplete: function(r) { console.log('before parse'); parseResponse(r); console.log('attempt create connection'); createConnection(); }
        });
    }


    addChatMessage = function($aMessage)
    {
        $($mMessageList).update($($mMessageList).innerHTML + "<br>" + $aMessage);
    }


    sendMessage = function()
    {
        $lMessage = $($mMessageInput).value;
        $($mMessageInput).value = "";

        addChatMessage($lMessage);

        new Ajax.Request($mUrl, {
            method: 'post',
            parameters: { message: $lMessage, dashboard: $mDashboard }
        });
    }


    attachEvents = function()
    {
        Event.observe($mMessageInput, 'keypress', function(e) { if(e.keyCode == 13) sendMessage() });
    }


    __construct = function($aOptions)
    {
        if(!$aOptions.dashboard) {
            return;
        }

        $mDashboard = $aOptions.dashboard;
        $mMessageInput = $aOptions.message_input || 'message';
        $mMessageList = $aOptions.message_list || 'message-list';

        attachEvents();
        createConnection();
    }


    __construct($aOptions || {});
}