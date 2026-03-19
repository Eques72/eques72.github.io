mod router;
mod handlers;
mod services;
mod repository;
mod api;
mod state;

use router::create_router;
use tokio::sync::broadcast;
use crate::state::app_state::AppState;

#[tokio::main]
async fn main() {
    let (tx, _rx) = broadcast::channel(100);
    let state = AppState { tx };

    let app = create_router(state);

    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000")
        .await
        .unwrap();

    println!("Server running on http://127.0.0.1:3000");

    axum::serve(listener, app).await.unwrap();
}