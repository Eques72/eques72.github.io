use crate::repository::counter_repo::{get_counter, update_counter};

pub fn increment_counter() -> i64 {

    let current = get_counter();
    let new = current + 1;

    update_counter(new);

    new
}