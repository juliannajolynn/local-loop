from playwright.sync_api import sync_playwright
from datetime import datetime, timezone

# grassroots org I'm using for prototype purposes: East Bay Housing Associations

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)
    page = browser.new_page()
    page.goto("https://ebho.org/events/", timeout=60000, wait_until="domcontentloaded")
    
    rows = page.query_selector_all(".tribe-events-calendar-list__event-row")
    i = 0
    for row in rows:
        title = row.query_selector("a").inner_text()
        # date = row.query_selector("time").get_attribute("datetime")        
        
        start = row.query_selector(".tribe-event-date-start").inner_text()
        end = row.query_selector(".tribe-event-time").inner_text()
        time = start + " - " + end

        description = row.query_selector("p").inner_text()
        url = row.query_selector("a").get_attribute("href") 
        i = i + 1

        print("Title: " + str(title))
        # print("Date: " + str(date))
        print("Time: " + str(time))
        print("Description: " + str(description))
        print("URL: " + str(url))
        print("------------------")

    print("Events:" + str(i))
   
    browser.close()