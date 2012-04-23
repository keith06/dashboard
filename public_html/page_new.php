<?php

$session_id = session_id();

removeOldUsers($db);
$user = getCurrentUser($db, true);

do {
    // Create random unique string for a dashboard
    $random_string = generateRandomString();
} while(dashboardExists($db, $random_string) !== false);

$q = $db->prepare("INSERT INTO dashboard (date_created, last_activity, code) VALUES (datetime('now'), datetime('now'), ?)");
$q->execute(array($random_string));
$dashboard_id = $db->lastInsertId();

$q = $db->prepare("INSERT INTO dashboard_user (user_id, dashboard_id, last_activity) VALUES (?, ?, datetime('now'))");
$q->execute(array($user['id'], $dashboard_id));

// Redirect user
header('Location: ' . $CONFIG['host'] . '/db/' . $random_string);
exit;