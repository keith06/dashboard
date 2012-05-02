<?php

function generateRandomString($length = 7)
{
	$characters = '01234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	$string = '';

	while($length-- > 0) {
		$string .= $characters[rand() % strlen($characters)];
	}

	return $string;
}


function removeOldUsers($db)
{
	$db->exec("DELETE FROM user WHERE last_activity < date('now', '-2 hour')");
}


function getCurrentUser($db, $create = false)
{
	$session_id = session_id();

	$q = $db->prepare("SELECT * FROM user WHERE session_id = ?");
	$q->execute(array($session_id));

	$user = $q->fetchAll();

	// User doesn't exists? Create one
	if(sizeof($user) == 0) {
		if($create) {
			$q_new_user = $db->prepare("INSERT INTO user (date_joined, last_activity, ip, session_id) VALUES (datetime('now'), datetime('now'), ?, ?)");
			$q_new_user->execute(array($_SERVER['REMOTE_ADDR'], $session_id));

			$user[0]['id'] = $db->lastInsertId();
		}
	} else {
		$q_update_activity = $db->prepare("UPDATE user SET last_activity = datetime('now') WHERE id = ?");
		$q_update_activity->execute(array($user[0]['id']));
	}

	return sizeof($user) == 0 ? false : $user[0];
}


function whiteboardExists($db, $code)
{
	$q = $db->prepare("SELECT id FROM whiteboard WHERE code = ?");
	$q->execute(array($code));
	$whiteboard = $q->fetchAll();

	return sizeof($whiteboard) == 0 ? false : $whiteboard[0];
}


function checkNewEvents($db, $whiteboard_id, $user_id, $last_update_id)
{
	$q = $db->prepare("SELECT * FROM event WHERE whiteboard_id = ? AND user_id != ? AND id > ? ORDER BY date_received ASC");
	$q->execute(array($whiteboard_id, $user_id, $last_update_id));

	$result = $q->fetchAll();

	if(sizeof($result) == 0) {
		return false;
	} else {
		return $result;
	}
}