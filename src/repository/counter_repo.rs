use rusqlite::{Connection}; //, Result};

fn get_connection() -> Connection {
    println!("{:?}", std::env::current_dir());
    Connection::open("site.db").unwrap()
}

pub fn get_counter() -> i64 {

    let conn = get_connection();

    let mut stmt = conn
        .prepare("SELECT counter FROM visitors WHERE id = 1")
        .unwrap();

    stmt.query_row([], |row| row.get(0)).unwrap_or(0)
}

pub fn update_counter(counter: i64) {

    let conn = get_connection();

    conn.execute(
        "UPDATE visitors SET counter = ?1 WHERE id = 1",
        [counter],
    ).unwrap();
}