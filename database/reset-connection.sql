
SHOW PROCESSLIST;

show variables like "max_connections";

set global max_connections = 500;

SELECT 
CONCAT('KILL ', id, ';') 
FROM INFORMATION_SCHEMA.PROCESSLIST 
WHERE `User` = 'root' 
AND `Host` like '142.93.77.117:%'
AND `db` = 'farbisdb';
