export const ENV = {
    NODE_ENV: import.meta.env.VITE_NODE_ENV,
    APP_API_ENDPOINT: import.meta.env.VITE_APP_API_ENDPOINT,
} as const;
