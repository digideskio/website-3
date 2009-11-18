<?php

/**
 * BasePermission
 * 
 * This class has been auto-generated by the Doctrine ORM Framework
 * 
 * @property integer $id
 * @property string $code
 * @property Doctrine_Collection $Users
 * @property Doctrine_Collection $Roles
 * @property Doctrine_Collection $PermissionAndRole
 * @property Doctrine_Collection $PermissionAndUser
 * 
 * @package    ##PACKAGE##
 * @subpackage ##SUBPACKAGE##
 * @author     ##NAME## <##EMAIL##>
 * @version    SVN: $Id: Builder.php 6508 2009-10-14 06:28:49Z jwage $
 */
abstract class BasePermission extends Doctrine_Record
{
    public function setTableDefinition()
    {
        $this->setTableName('permission');
        $this->hasColumn('id', 'integer', 2, array(
             'type' => 'integer',
             'primary' => true,
             'unsigned' => true,
             'autoincrement' => true,
             'length' => '2',
             ));
        $this->hasColumn('code', 'string', 50, array(
             'type' => 'string',
             'notblank' => true,
             'unique' => true,
             'length' => '50',
             ));
    }

    public function setUp()
    {
        parent::setUp();
        $this->hasMany('User as Users', array(
             'refClass' => 'PermissionAndUser',
             'local' => 'permission_id',
             'foreign' => 'user_id'));

        $this->hasMany('Role as Roles', array(
             'refClass' => 'PermissionAndRole',
             'local' => 'permission_id',
             'foreign' => 'role_id'));

        $this->hasMany('PermissionAndRole', array(
             'local' => 'id',
             'foreign' => 'permission_id'));

        $this->hasMany('PermissionAndUser', array(
             'local' => 'id',
             'foreign' => 'permission_id'));
    }
}