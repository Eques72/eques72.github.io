use crate::repository::counter_repo::{get_counter, update_counter};
use axum::{extract::State, Json};
use crate::state::app_state::AppState;

pub fn increment_counter(State(state): State<AppState>) -> i64 {

    let current = get_counter();
    let new = current + 1;

    update_counter(new);
    let _ = state.tx.send(new as u64);

    new
}

pub fn get_visitor_count() -> i64 {
    get_counter()
}