use axum::{routing::get, Json};

use crate::services::counter::get_visitor_count;

pub async fn get_count() -> Json<u64> {
    let count = get_visitor_count();
    Json(count as u64)
}

