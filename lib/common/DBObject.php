<?php

abstract class DBObject
{
    private $mTableName;
    private $mPrimaryKey;
    private $mAttributes;
    private $mColumns;
    private $mDefaultValues;

    private $mIsRead = false;

    private $mDBHandler;

    public function __construct($aDBHandler, $aTableName, $aPrimaryKey, $aStructure)
    {
        $this->mDBHandler = $aDBHandler;
        $this->mTableName = $aTableName;
        $this->mPrimaryKey = $aPrimaryKey;

        $this->mColumns = array_keys($aStructure);
        $this->mValues = $aStructure;
    }
}