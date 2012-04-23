<?php
/**
 * Event types:
 *
 * 1 - chat
 */

session_write_close();

if(($dashboard = dashboardExists($db, $_POST['dashboard'])) != false) {
    error_log('test1');
    if(($user = getCurrentUser($db)) != false) {
        error_log('test2');
        $q = $db->prepare("INSERT INTO event (dashboard_id, user_id, date_received, event_type, content) VALUES (?, ?, datetime('now'), 1, ?)");
        $q->execute(array($dashboard['id'], $user['id'], $_POST['message']));
    }
}