<?php
session_write_close();

error_log('stream start');
if($whiteboard = whiteboardExists($db, $_POST['whiteboard'])) {
	if($user = getCurrentUser($db)) {
		$last_update_id = $_POST['last_update'];

		do {
			if($events = checkNewEvents($db, $whiteboard['id'], $user['id'], $_POST['last_update'])) {
				foreach($events as $event) {
					$json_array = array(
						'id' => $event['id'],
						'event_type' => $event['event_type'],
						'content' => $event['content']
					);

					error_log(var_export($json_array, true));
					echo json_encode($json_array)."\n";
				}

				exit;
			}

			sleep(1);
		} while(true);
	}
}