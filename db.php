<?php

$db_config = [
    'host' => 'MariaDB-11.2',
    'user' => 'root',
    'password' => '',
    'db_name' => 'test',
];

$db_options = [
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

$dsn = "mysql:dbname={$db_config['db_name']};host={$db_config['host']};charset=utf8";

$db = new PDO($dsn, $db_config['user'], $db_config['password'], $db_options);
