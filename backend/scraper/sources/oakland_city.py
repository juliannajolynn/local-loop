from playwright.sync_api import sync_playwright
from datetime import datetime, date, time

with sync_playwright() as p:
    id = "city_meeting"
    now = datetime.now()
    
    browser = p.chromium.launch(headless=False)
    page = browser.new_page()

    source = "https://oakland.legistar.com/calendar.aspx"
    print("Source: " + source)
    page.goto(source, timeout=60000, wait_until="domcontentloaded")
    
    rows = rows = page.query_selector_all("tr.rgRow, tr.rgAltRow")
    for row in rows:
        tds = row.query_selector_all("td")
        date = datetime.strptime(tds[1].inner_text(), "%m/%d/%Y")
        

        if date >= now:
            title = tds[0].inner_text()
            if "cancellation" in title.lower():
                continue

            location = tds[4].inner_text()
            
            time = datetime.strptime(tds[3].inner_text(), "%I:%M %p")
            combined = datetime.combine(date.date(), time.time())
            url = "https://oakland.legistar.com/" + tds[5].query_selector("a").get_attribute("href")

            description = "https://oakland.legistar.com/" + str(tds[6].query_selector("a").get_attribute("href"))

            # proof:
            print("Title: " + title)
            print("Date/Time: " + str(combined))
            print("Location: " + location)
            print("URL: " + str(url))
            print("Description:  " + str(description))
            print("--------------")

    browser.close()
