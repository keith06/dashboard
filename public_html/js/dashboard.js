function Dashboard($aOptions)
{
    var $this = this;
    var $mUrl = "http://dashboard/ajax/";
    var $mStreamUrl = "http://dashboard/stream/";
    var $mSvgNs = "http://www.w3.org/2000/svg";
    var $mLastUpdateId = 0;
    var $mDashboardCode;

    var $mSvgDashboard;
    var $mChatInput;
    var $mChatList;
    var $mSectionControls;

    var $mActiveControl;
    var $mTemporaryObject;
    var $mColorFill = '#0000ff';
    var $mColorBorder = '#000000';
    var $mBorder = '0';

    var $mMouseDown = false;
    var $mMouseX = 0;
    var $mMouseY = 0;
    var $mOffsetX = 0;
    var $mOffsetY = 0;


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
            parameters: { dashboard: $mDashboardCode, last_update: $mLastUpdateId },
            onComplete: function(r) { console.log('before parse'); parseResponse(r); console.log('attempt create connection'); createConnection(); }
        });
    }


    addChatMessage = function($aMessage)
    {
        $mChatList.update($mChatList.innerHTML + "<br>" + $aMessage);
    }


    sendMessage = function()
    {
        $lMessage = $mChatInput.value;
        $mChatInput.value = "";

        addChatMessage($lMessage);

        new Ajax.Request($mUrl, {
            method: 'post',
            parameters: { message: $lMessage, dashboard: $mDashboardCode }
        });
    }


    setActiveControl = function($aControl)
    {
        $mActiveControl = $aControl;

        console.log($mActiveControl);
    }


    attachEventsControls = function()
    {
        Event.observe($mSectionControls.select('#control-line')[0], 'click', function() { setActiveControl('line') });
        Event.observe($mSectionControls.select('#control-rect')[0], 'click', function() { setActiveControl('rect') });
        Event.observe($mSectionControls.select('#control-ellipse')[0], 'click', function() { setActiveControl('ellipse') });
    }


    attachEventsChat = function()
    {
        Event.observe($mChatInput, 'keypress', function(e) { if(e.keyCode == 13) sendMessage() });
    }


    attachEventsDashboard = function()
    {
        Event.observe($mSvgDashboard, 'mousedown', dashboardMouseDown);
        Event.observe($mSvgDashboard, 'mousemove', dashboardMouseMove);
        Event.observe($mSvgDashboard, 'mouseup', dashboardMouseUp);
    }


    attachEvents = function()
    {
        attachEventsChat();
        attachEventsControls();
        attachEventsDashboard();
    }


    dashboardMouseDown = function(e)
    {
        if($mActiveControl == 'rect') {
            $mMouseDown = true;
            $mMouseX = e.clientX + $mOffsetX;
            $mMouseY = e.clientY + $mOffsetY;

            $mTemporaryObject = document.createElementNS($mSvgNs, 'rect');
            $mTemporaryObject.setAttribute('x', $mMouseX);
            $mTemporaryObject.setAttribute('y', $mMouseY);
            $mTemporaryObject.setAttribute('height', '10');
            $mTemporaryObject.setAttribute('width', '10');
            $mTemporaryObject.setAttribute('fill', $mColorFill);
            $mTemporaryObject.setAttribute('stroke', $mColorBorder);
            $mTemporaryObject.setAttribute('stroke-width', $mBorder);
            $mSvgDashboard.appendChild($mTemporaryObject);
        }
    }


    dashboardMouseMove = function(e)
    {
        if($mMouseDown) {
            $lX = e.clientX + $mOffsetX;
            $lY = e.clientY + $mOffsetY;

            $mTemporaryObject.setAttribute('width', $lX - $mMouseX);
            $mTemporaryObject.setAttribute('height', $lY - $mMouseY);
        }
    }


    dashboardMouseUp = function(e)
    {
        $mMouseDown = false;
    }


    __construct = function($aOptions)
    {
        if(!$aOptions.dashboard_code) {
            return;
        }

        $mDashboardCode = $aOptions.dashboard_code;
        $mChatInput = $($aOptions.chat_input || 'chat-input');
        $mChatList = $($aOptions.chat_list || 'chat-list');
        $mSectionControls = $($aOptions.controls || 'controls');
        $mSvgDashboard = $($aOptions.dashboard || 'dashboard');

        console.log($('dashboard'));
        $mOffsetX = $($aOptions.dashboard || 'dashboard').positionedOffset()[0];
        $mOffsetY = $($aOptions.dashboard || 'dashboard').positionedOffset()[1];

        attachEvents();
        createConnection();
    }


    __construct($aOptions || {});
}