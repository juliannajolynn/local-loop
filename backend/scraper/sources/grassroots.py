from playwright.sync_api import sync_playwright
from datetime import datetime
from dateutil import parser

# grassroots org I'm using for prototype purposes: East Bay Housing Associations

def scrape():

    events = {}
    id = "grassroots_event"

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        source = "https://ebho.org/events/"
        print("Source: " + source)

        page.goto(source, timeout=60000, wait_until="domcontentloaded")
        
        rows = page.query_selector_all(".tribe-events-calendar-list__event-row")
        i = 0
        for row in rows:
            title = row.query_selector("a").inner_text()
            date = row.query_selector("time").get_attribute("datetime")        

            start = row.query_selector(".tribe-event-date-start").inner_text()
            start_clean = start.replace("@", "").replace("rd", "").replace("th", "").replace("st", "").replace("nd", "")
            date_time = parser.parse(start_clean + " 2026")

            try:
                venue = row.query_selector(".tribe-events-calendar-list__event-venue-title").inner_text()
                address = row.query_selector(".tribe-events-calendar-list__event-venue-address").inner_text()
                location = venue + ", " + address
            except:
                location = "See event link for location!"

            description = row.query_selector("p").inner_text()
            url = row.query_selector("a").get_attribute("href") 
            i = i + 1

            events[title] = [source, id, url, str(date_time), location, description, None]
            print(events[title])
            print("--------------")

        #print("Events:" + str(i))
    
        browser.close()
        
        if len(events.keys()) == i:
            print("Success!")

        return events

#scrape()