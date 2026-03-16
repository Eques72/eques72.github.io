use axum::{
    routing::get,
    Router,
};
use tower_http::services::ServeDir;

use crate::handlers::home::home_handler;

pub fn create_router() -> Router {
    Router::new()
        .route("/", get(home_handler))
        .nest_service("/static", ServeDir::new("static"))
}