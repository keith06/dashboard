<?php
require_once('common/DBObject.php');

class User extends DBObject
{
    public function __construct($aDBHandler, $aId = 0)
    {
        parent::__construct($aDBHandler, 'user', 'id', array(
            'id'            => $aId,
            'date_joined'   => '0000-00-00 00:00:00',
            'last_activity' => '0000-00-00 00:00:00',
            'ip'            => ''
        ));
    }
}
