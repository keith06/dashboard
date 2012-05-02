function Whiteboard($aOptions)
{
    var $this = this;
    var $mUrl = "http://whiteboard/ajax/";
    var $mStreamUrl = "http://whiteboard/stream/";
    var $mSvgNs = "http://www.w3.org/2000/svg";
    var $mLastUpdateId = 0;
    var $mWhiteboardCode;

    var $mSvgWhiteboard;
    var $mChatInput;
    var $mChatList;
    var $mSectionControls;

    var $mActiveControl;
    var $mActiveObject;
    var $mTemporaryObject;
    var $mColorFill = '#0000ff';
    var $mColorBorder = '#000000';
    var $mBorder = '0';

    var $mMouseDown = false;
    var $mObjectMouseDown = false;
    var $mMouseX = 0;
    var $mMouseY = 0;
    var $mOffsetX = 0;
    var $mOffsetY = 0;
    var $mOriginalMouseX = 0;
    var $mOriginalMouseY = 0;
    var $mOriginalObjectX = 0;
    var $mOriginalObjectY = 0;


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
            parameters: { whiteboard: $mWhiteboardCode, last_update: $mLastUpdateId },
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
            parameters: { message: $lMessage, whiteboard: $mWhiteboardCode }
        });
    }


    setActiveControl = function($aControl)
    {
        $mActiveControl = $aControl;

        console.log($mActiveControl);
    }


    attachEventsControls = function()
    {
        Event.observe($mSectionControls.select('#control-pointer')[0], 'click', function() { setActiveControl('pointer') });
        Event.observe($mSectionControls.select('#control-line')[0], 'click', function() { setActiveControl('line') });
        Event.observe($mSectionControls.select('#control-rect')[0], 'click', function() { setActiveControl('rect') });
        Event.observe($mSectionControls.select('#control-ellipse')[0], 'click', function() { setActiveControl('ellipse') });
    }


    attachEventsChat = function()
    {
        Event.observe($mChatInput, 'keypress', function(e) { if(e.keyCode == 13) sendMessage() });
    }


    attachEventsWhiteboard = function()
    {
        Event.observe($mSvgWhiteboard, 'mousedown', whiteboardMouseDown);
        Event.observe($mSvgWhiteboard, 'mousemove', whiteboardMouseMove);
        Event.observe($mSvgWhiteboard, 'mouseup', whiteboardMouseUp);
    }


    attachEvents = function()
    {
        attachEventsChat();
        attachEventsControls();
        attachEventsWhiteboard();
    }


    objectMouseDown = function(e)
    {
        if(!$mMouseDown) {
            $mObjectMouseDown = true;
            $mActiveObject = this;

            $mOriginalMouseX = e.clientX - $mOffsetX;
            $mOriginalMouseY = e.clientY - $mOffsetY;

            $mOriginalObjectX = $mActiveObject.getAttribute('x');
            $mOriginalObjectY = $mActiveObject.getAttribute('y');
        }
    }


    objectMouseUp = function(e)
    {
        $mObjectMouseDown = false;
    }


    whiteboardMouseDown = function(e)
    {
        if($mActiveControl == 'rect') {
            $mMouseDown = true;
            $mMouseX = e.clientX - $mOffsetX;
            $mMouseY = e.clientY - $mOffsetY;

            $mTemporaryObject = document.createElementNS($mSvgNs, 'rect');
            $mTemporaryObject.setAttribute('x', $mMouseX);
            $mTemporaryObject.setAttribute('y', $mMouseY);
            $mTemporaryObject.setAttribute('height', '1');
            $mTemporaryObject.setAttribute('width', '1');
            $mTemporaryObject.setAttribute('fill', $mColorFill);
            $mTemporaryObject.setAttribute('stroke', $mColorBorder);
            $mTemporaryObject.setAttribute('stroke-width', $mBorder);
            //$mTemporaryObject.setAttribute('shape-rendering', "crispEdges");

            Event.observe($mTemporaryObject, 'mousedown', objectMouseDown);
            Event.observe($mTemporaryObject, 'mouseup', objectMouseUp);

            $mSvgWhiteboard.appendChild($mTemporaryObject);

            setActiveControl('pointer');
        }
    }


    whiteboardMouseMove = function(e)
    {
        if($mMouseDown) {
            $lX = e.clientX - $mOffsetX;
            $lY = e.clientY - $mOffsetY;

            if($mMouseX > $lX) {
                $mTemporaryObject.setAttribute('x', $lX);
                $mTemporaryObject.setAttribute('width', $mMouseX - $lX);
            } else {
                $mTemporaryObject.setAttribute('x', $mMouseX);
                $mTemporaryObject.setAttribute('width', $lX - $mMouseX);
            }

            if($mMouseY > $lY) {
                $mTemporaryObject.setAttribute('y', $lY);
                $mTemporaryObject.setAttribute('height', $mMouseY - $lY);
            } else {
                $mTemporaryObject.setAttribute('y', $mMouseY);
                $mTemporaryObject.setAttribute('height', $lY - $mMouseY);
            }
        } else if($mObjectMouseDown) {
            $mMouseX = e.clientX - $mOffsetX;
            $mMouseY = e.clientY - $mOffsetY;

            $mActiveObject.setAttribute('x', parseInt($mOriginalObjectX) + $mMouseX - $mOriginalMouseX);
            $mActiveObject.setAttribute('y', parseInt($mOriginalObjectY) + $mMouseY - $mOriginalMouseY);
        }
    }


    whiteboardMouseUp = function(e)
    {
        $mMouseDown = false;
    }


    __construct = function($aOptions)
    {
        if(!$aOptions.whiteboard_code) {
            return;
        }

        $mWhiteboardCode = $aOptions.whiteboard_code;
        $mChatInput = $($aOptions.chat_input || 'chat-input');
        $mChatList = $($aOptions.chat_list || 'chat-list');
        $mSectionControls = $($aOptions.controls || 'controls');
        $mSvgWhiteboard = $($aOptions.whiteboard || 'whiteboard');

        console.log($('whiteboard'));
        $mOffsetX = $($aOptions.whiteboard || 'whiteboard').offsetLeft + 3;
        $mOffsetY = $($aOptions.whiteboard || 'whiteboard').offsetTop + 3;

        attachEvents();
        createConnection();
    }


    __construct($aOptions || {});
}
