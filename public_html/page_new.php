<?php

$session_id = session_id();

removeOldUsers($db);
$user = getCurrentUser($db, true);

do {
	// Create random unique string for a dashboard
	$random_string = generateRandomString();
} while(whiteboardExists($db, $random_string) !== false);

$q = $db->prepare("INSERT INTO whiteboard (date_created, last_activity, code) VALUES (datetime('now'), datetime('now'), ?)");
$q->execute(array($random_string));
$whiteboard_id = $db->lastInsertId();

$q = $db->prepare("INSERT INTO whiteboard_user (user_id, whiteboard_id, last_activity) VALUES (?, ?, datetime('now'))");
$q->execute(array($user['id'], $whiteboard_id));

// Redirect user
header('Location: ' . $CONFIG['host'] . 'wb/' . $random_string);
exit;
