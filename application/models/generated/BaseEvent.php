<?php

/**
 * BaseEvent
 * 
 * This class has been auto-generated by the Doctrine ORM Framework
 * 
 * @property timestamp $start_at
 * @property timestamp $finish_at
 * 
 * @package    ##PACKAGE##
 * @subpackage ##SUBPACKAGE##
 * @author     ##NAME## <##EMAIL##>
 * @version    SVN: $Id: Builder.php 6508 2009-10-14 06:28:49Z jwage $
 */
abstract class BaseEvent extends Doctrine_Record
{
    public function setTableDefinition()
    {
        $this->setTableName('event');
        $this->hasColumn('start_at', 'timestamp', null, array(
             'type' => 'timestamp',
             ));
        $this->hasColumn('finish_at', 'timestamp', null, array(
             'type' => 'timestamp',
             ));
    }

    public function setUp()
    {
        parent::setUp();
        $softdelete0 = new Doctrine_Template_SoftDelete();
        $balcontentextension0 = new BalContentExtension();
        $this->actAs($softdelete0);
        $this->actAs($balcontentextension0);
    }
}