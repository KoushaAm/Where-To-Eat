def scrape_address(url):
    import requests
    from bs4 import BeautifulSoup

    response = requests.get(url)
    if response.status_code != 200:
        return None

    soup = BeautifulSoup(response.text, 'html.parser')
    address = soup.find('p', class_='y-css-jbomhy')
    
    if address:
        return address.get_text(strip=True)
    return None

scrape_address('https://www.yelp.com/biz/tera-v-burger-vancouver?osq=Vegan+restaurants')