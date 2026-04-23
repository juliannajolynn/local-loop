from playwright.sync_api import sync_playwright
from datetime import datetime, date, time

def scrape():

    events = {}
    id = "city_meeting"
    now = datetime.now()

    with sync_playwright() as p:
        
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        source = "https://oakland.legistar.com/calendar.aspx"
        #print("Source: " + source)
        page.goto(source, timeout=60000, wait_until="domcontentloaded")
        
        i = 0

        rows = rows = page.query_selector_all("tr.rgRow, tr.rgAltRow")
        for row in rows:
            tds = row.query_selector_all("td")
            date = datetime.strptime(tds[1].inner_text(), "%m/%d/%Y")
            

            if date >= now:
                title = tds[0].inner_text()
                if "cancellation" in title.lower():
                    continue

                location = tds[4].inner_text().strip()
                
                time = datetime.strptime(tds[3].inner_text(), "%I:%M %p")
                combined = datetime.combine(date.date(), time.time())
                url = "https://oakland.legistar.com/" + tds[5].query_selector("a").get_attribute("href")

                description = "https://oakland.legistar.com/" + str(tds[6].query_selector("a").get_attribute("href"))
                i = i + 1

                events[title] = [source, id, url, str(combined), location, description, None]
                print(events[title])
                print("--------------")

        browser.close()

        if len(events.keys()) == i:
            print("Success!")

    return events

#scrape()

