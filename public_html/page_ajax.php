<?php
/**
 * Event types:
 *
 * 1 - chat
 */

session_write_close();

if(($whiteboard = whiteboardExists($db, $_POST['whiteboard'])) != false) {
	error_log('test1');
	if(($user = getCurrentUser($db)) != false) {
		error_log('test2');
		$q = $db->prepare("INSERT INTO event (whiteboard_id, user_id, date_received, event_type, content) VALUES (?, ?, datetime('now'), 1, ?)");
		$q->execute(array($whiteboard['id'], $user['id'], $_POST['message']));
	}
}