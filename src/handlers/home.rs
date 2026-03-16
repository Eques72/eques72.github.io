use axum::response::Html;

use crate::services::counter::increment_counter;

pub async fn home_handler() -> Html<String> {

    let count = increment_counter();

    let template = std::fs::read_to_string("templates/index.html")
        .expect("template not found");

    let page = template.replace("{{counter}}", &count.to_string());

    Html(page)
}