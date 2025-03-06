#!/bin/sh
echo "Replacing placeholders in built files..."
# Replace placeholders in JS files
find /usr/share/nginx/html -type f -name '*.js' -exec sed -i "s|__API_PORT__|${REACT_APP_API_PORT}|g" {} +
find /usr/share/nginx/html -type f -name '*.js' -exec sed -i "s|__API_HOST__|${REACT_APP_API_HOST}|g" {} +
find /usr/share/nginx/html -type f -name '*.js' -exec sed -i "s|__SELF_URL__|${REACT_APP_SELF_URL}|g" {} +
echo "Placeholders replaced. Starting Nginx."
exec "$@"
