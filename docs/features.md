## v0.1

- default route shows introduction text rendered using `en/bubbles.json`
- the user has the ability to load in more data using `en/actions.json`
- if route starts with `/at` the content of `at/*` is used
- next prerenders the content on the server side to load all of the content into html (hidden) for search indexing
- `meta.json` - required for loading metadata
- starts with /at -> renders with `at` as locale
- / -> renders with `en` as locale
