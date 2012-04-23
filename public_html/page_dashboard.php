<?php
$code = $dashboard_code[1];

// Does this dashboard exists?
if(($dashboard = dashboardExists($db, $code)) == false) {
    header('Location: '. $CONFIG['host'] . '/');
    exit;
}

$user = getCurrentUser($db, true);

// Are we already in this dashboard?
$q = $db->prepare("SELECT user_id FROM dashboard_user WHERE user_id = ? AND dashboard_id = ?");
$param = array($user['id'], $dashboard['id']);
$result = $q->execute($param);

if(sizeof($result) == 0) {
    // No, so add current user to the dashboard
    $q = $db->prepare("INSERT INTO dashboard_user (user_id, dashboard_id, last_activity) VALUES (?, ?, datetime('now'))");
    $q->execute($param);
} else {
    // Update last activity
    $q = $db->prepare("UPDATE dashboard_user SET last_activity = datetime('now') WHERE user_id = ? AND dashboard_id = ?");
    $q->execute($param);
}

$template = array('dashboard_code' => $code);

$smarty->assign('template', $template);
$smarty->assign('page', 'dashboard');
$smarty->display('page.tpl');