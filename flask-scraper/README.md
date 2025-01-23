# Flask Scraper

This project is a simple Flask API that scrapes the address from a Yelp webpage given a URL as a parameter. It utilizes BeautifulSoup and Requests for web scraping.

## Project Structure

```
flask-scraper
├── app
│   ├── __init__.py
│   ├── routes.py
│   └── scraper.py
├── requirements.txt
├── config.py
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd flask-scraper
   ```

2. Install the required packages:
   ```
   pip install -r requirements.txt
   ```

## Configuration

You can configure the application settings in `config.py`. By default, the application runs in debug mode.

## Usage

1. Start the Flask application:
   ```
   flask run
   ```

2. Make a GET request to the `/scrape` endpoint with the Yelp URL as a query parameter:
   ```
   GET /scrape?url=<yelp-url>
   ```

3. The response will contain the address extracted from the provided Yelp webpage.

## Example

To scrape the address from a Yelp page, you can use the following curl command:
```
curl "http://127.0.0.1:5000/scrape?url=https://www.yelp.com/biz/example-restaurant"
```

## License

This project is licensed under the MIT License.