<?php
$code = $whiteboard_code[1];

// Does this dashboard exists?
if(($dashboard = whiteboardExists($db, $code)) == false) {
	header('Location: '. $CONFIG['host']);
	exit;
}

$user = getCurrentUser($db, true);

// Are we already in this dashboard?
$q = $db->prepare("SELECT user_id FROM whiteboard_user WHERE user_id = ? AND whiteboard_id = ?");
$param = array($user['id'], $whiteboard['id']);
$result = $q->execute($param);

if(sizeof($result) == 0) {
	// No, so add current user to the whiteboard
	$q = $db->prepare("INSERT INTO whiteboard_user (user_id, whiteboard_id, last_activity) VALUES (?, ?, datetime('now'))");
	$q->execute($param);
} else {
	// Update last activity
	$q = $db->prepare("UPDATE whiteboard_user SET last_activity = datetime('now') WHERE user_id = ? AND whiteboard_id = ?");
	$q->execute($param);
}

$template = array('whiteboard_code' => $code);

$smarty->assign('template', $template);
$smarty->assign('page', 'whiteboard');
$smarty->display('page.tpl');