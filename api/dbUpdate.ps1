$dir = "F:\GitHub\Allotment\"
$database = "Allotment2"
$sqlDirectory = "F:\GitHub\Allotment\allotment.database\bin"
$connectionString = "server=127.0.0.1,1433;Initial Catalog=Allotment2;user id=sa;password=D3v3l0p3r@SQL"

rh -d $database -f $sqlDirectory -cs $connectionString
