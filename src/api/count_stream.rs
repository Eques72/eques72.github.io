use axum::{routing::get, Json};
use axum::response::sse::{Sse, Event};
use futures_util::stream::{Stream};
use axum::extract::State;
use tokio_stream::wrappers::BroadcastStream;
use std::convert::Infallible;
use futures_util::StreamExt;
use crate::services::counter::get_visitor_count;
use crate::state::app_state::AppState;

pub async fn get_count_stream(
    State(state): State<AppState>,
) -> Sse<impl Stream<Item = Result<Event, Infallible>>> {

    let rx = state.tx.subscribe();

    let stream = BroadcastStream::new(rx).filter_map(|msg: Result<_, _>| async move {
        match msg {
            Ok(count) => Some(Ok(Event::default().data(count.to_string()))),
            Err(_) => None,
        }
    });

    Sse::new(stream)
}