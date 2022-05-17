### Objective

Using Node and Express, your task is to build a currency conversion service that includes FIAT and cryptocurrencies.

### Brief

In this challenge, your assignment is to build a service that makes conversions between different currencies. You will connect to an external API to request currency data, log & store requests of your users, and rate limit requests based on specific criteria. Your service must support at least the following currency pairs:

USD
EUR
BTC
ETH

### Tasks

-   Implement assignment using:

    -   Language: **Node**
    -   Framework: **Express** / **NestJS** (or other)

-   We recommend using the Coinbase API for exchange rates:

    https://developers.coinbase.com/api/v2#get-exchange-rates

-   Your service should be able to identify users. You may use any form of authentication that you think is suitable for the task (e.g., API keys, Username/Password)
-   Your service needs to store each request, the date/time it was performed, its parameters and the response body
-   Each user may perform 100 requests per workday (Monday-Friday) and 200 requests per day on weekends. After the quota is used up, you need to return an error message
-   The service must accept the following parameters:
    -   The source currency, the amount to be converted, and the final currency
    -   e.g. `?from=BTC&to=USD&amount=999.20`
-   Your service must return JSON in a structure you deem fit for the task
-   BONUS: find a clever strategy to cache responses from the external currency API

