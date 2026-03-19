use axum::{
    routing::get,
    Router,
};
use tower_http::services::ServeDir;

use crate::handlers::home::home_handler;
use crate::api::count::get_count;
use crate::api::count_stream::get_count_stream;

use crate::state::app_state::AppState;

pub fn create_router(state: AppState) -> Router {
    Router::new()
        .route("/", get(home_handler))
        .route("/api/count_stream", get(get_count_stream))
        .route("/api/count", get(get_count))
        .nest_service("/static", ServeDir::new("static"))
        .with_state(state)
}