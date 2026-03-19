use axum::response::Html;
use axum::extract::State;
use crate::state::app_state::AppState;

use crate::services::counter::increment_counter;

pub async fn home_handler(State(state): State<AppState>) -> Html<String> {

    let count = increment_counter(State(state)); //TO DO increment not on refresh but on new unique visitor

    let template = std::fs::read_to_string("templates/index.html")
        .expect("template not found");

    let page = template.replace("{{counter}}", &count.to_string());

    Html(page)
}