let db = undefined;

const Sqlite_Extension = require( "nativescript-sqlite" );
new Sqlite_Extension('TODO', init);

function CreateDatabase()
{
    db.execSQL(
        'CREATE TABLE Task(' +
        'id             INTEGER PRIMARY KEY AUTOINCREMENT,' +
        'title          TEXT,' +
        'description    TEXT,' +
        'is_completed   INTEGER DEFAULT 0 CHECK(is_completed IN (0,1)));'
    );
}

function IsDbExist()
{
    let result = false;
    db.get('SELECT 1 FROM Task', (err, res) =>
    {
        result = res[0] === 1;
    });
    return result;
}

function init(err, database)
{
    db = database;
    if (!IsDbExist())
    {
        CreateDatabase();
    }
}

export function DatabaseGet()
{
    return db;
}
