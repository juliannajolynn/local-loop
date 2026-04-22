from playwright.sync_api import sync_playwright
from datetime import datetime, timezone

data = {}

def helper(title, id, source, date_time, url, description):
    data[url] = [title, id, source, date_time, url, description]

with sync_playwright() as p:

    id = "city_meeting"
    now = datetime.now(timezone.utc)

    browser = p.chromium.launch(headless=False)
    page = browser.new_page()

    source = "https://berkeleyca.gov/your-government/city-council/city-council-agendas"
    page.goto(source, timeout=60000, wait_until="domcontentloaded")
    
    rows = page.query_selector_all("tr")
    for row in rows:
        name = row.query_selector(".council-meeting-name")
        if not name:
            continue

        title = name.query_selector("a").inner_text()

        rawdate = row.query_selector(".council-meeting-date time").get_attribute("datetime")
        date_time = datetime.fromisoformat(rawdate.replace("Z", "+00:00"))
        
        description = row.query_selector(".council-meeting-agenda").query_selector("a").get_attribute("href")

        if date_time >= now: # we only care if its upcoming
            url = "https://berkeleyca.gov" + name.query_selector("a").get_attribute("href")
            
            helper(title, id, source, date_time, url, description)

    for url in data.keys():
        page.goto(url)
        location = page.query_selector("[class*='field-location']").inner_text()

        print("Title: " + title)
        print("Url: " + url)
        print("Date: " + str(date_time))
        print("Location: " + str(location))
        print("Description: " + str(description))
        print("---------")

    browser.close()
