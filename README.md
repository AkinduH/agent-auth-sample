# Agent Auth Sample

## Getting Agent Token

To get the agent token, configure the `.env` file and run the following curl command:

```bash
curl --location 'http://localhost:3009/auth/token' \
--header 'Content-Type: application/json' \
--data '{
    "scopes": "openid"
}'
```
